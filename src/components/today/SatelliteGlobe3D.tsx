'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SatelliteLivePosition, ObserverLocation, SatelliteCategory } from '../../types/today';
import { getSunPositionECI } from '../../utils/satelliteTracker';
import { 
  Compass, 
  RotateCcw, 
  Target, 
  Eye, 
  Layers, 
  Sun, 
  Moon, 
  Cloud, 
  Activity, 
  Radio, 
  Maximize2,
  Navigation,
  Globe,
  SlidersHorizontal,
  Plus,
  Minus
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface SatelliteGlobe3DProps {
  satellites: SatelliteLivePosition[];
  selectedNoradId: number | null;
  onSelectSatellite: (noradId: number) => void;
  observer: ObserverLocation;
  isLightMode: boolean;
}

export type EarthRenderMode = 'google-earth' | 'night' | 'weather' | 'vegetation' | 'radar';

const CATEGORY_HEX: Record<SatelliteCategory, number> = {
  'space-stations': 0xf59e0b,    // Amber
  'earth-observation': 0x06b6d4, // Cyan
  'scientific': 0xa855f7,        // Purple
  'navigation-comms': 0x10b981,  // Emerald
  'weather': 0xef4444            // Red
};

export function SatelliteGlobe3D({
  satellites,
  selectedNoradId,
  onSelectSatellite,
  observer,
  isLightMode
}: SatelliteGlobe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosMeshRef = useRef<THREE.Mesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const satelliteMeshesRef = useRef<Map<number, THREE.Mesh>>(new Map());
  const orbitLineMeshRef = useRef<THREE.Line | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseVecRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Earth rendering mode state
  const [renderMode, setRenderMode] = useState<EarthRenderMode>('google-earth');
  const [isFollowMode, setIsFollowMode] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [cameraAltitudeKm, setCameraAltitudeKm] = useState<number>(20000);

  // Textures store
  const texturesRef = useRef<{
    day: THREE.Texture | null;
    night: THREE.Texture | null;
    clouds: THREE.Texture | null;
  }>({ day: null, night: null, clouds: null });

  // Google Earth Physics & Inertial Momentum State
  const isDraggingRef = useRef<boolean>(false);
  const isRightClickDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ theta: number; phi: number }>({ theta: 0, phi: 0 });
  
  // Camera spherical coordinates (Radius, Theta Azimuth, Phi Polar Angle, Tilt/Pitch)
  const cameraAngleRef = useRef<{ theta: number; phi: number; radius: number; tilt: number }>({
    theta: 1.2,
    phi: 1.1,
    radius: 30,
    tilt: 0.0
  });

  // Google Earth "Fly-To" Animation State
  const flyToStateRef = useRef<{
    isFlying: boolean;
    startTheta: number;
    startPhi: number;
    startRadius: number;
    targetTheta: number;
    targetPhi: number;
    targetRadius: number;
    startTime: number;
    duration: number;
  }>({
    isFlying: false,
    startTheta: 0,
    startPhi: 0,
    startRadius: 30,
    targetTheta: 0,
    targetPhi: 0,
    targetRadius: 30,
    startTime: 0,
    duration: 1800
  });

  const EARTH_RADIUS = 10;

  // Spherical Coordinates to 3D Cartesian Vector
  const latLonToVector3 = (latDeg: number, lonDeg: number, altKm: number): THREE.Vector3 => {
    const scaledR = EARTH_RADIUS + (altKm / 6371) * (EARTH_RADIUS * 1.8);
    const phi = (90 - latDeg) * (Math.PI / 180);
    const theta = (lonDeg + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -(scaledR * Math.sin(phi) * Math.cos(theta)),
      scaledR * Math.cos(phi),
      scaledR * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Google Earth Fly-To Trigger
  const flyToLatLon = useCallback((latDeg: number, lonDeg: number, zoomRadius = 22) => {
    soundManager.bell(880, 0.2, 1.4);
    const targetTheta = (lonDeg + 180) * (Math.PI / 180);
    const targetPhi = Math.max(0.2, Math.min(Math.PI - 0.2, (90 - latDeg) * (Math.PI / 180)));

    let currentTheta = cameraAngleRef.current.theta;
    // Normalize angle difference to avoid spinning the long way around
    let diffTheta = targetTheta - currentTheta;
    while (diffTheta > Math.PI) diffTheta -= 2 * Math.PI;
    while (diffTheta < -Math.PI) diffTheta += 2 * Math.PI;

    flyToStateRef.current = {
      isFlying: true,
      startTheta: currentTheta,
      startPhi: cameraAngleRef.current.phi,
      startRadius: cameraAngleRef.current.radius,
      targetTheta: currentTheta + diffTheta,
      targetPhi: targetPhi,
      targetRadius: zoomRadius,
      startTime: performance.now(),
      duration: 1600
    };
  }, []);

  // 1. Three.js Scene Setup with Google Earth Lighting & Atmosphere Shaders
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load High-Res NASA Textures
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load('/assets/earth/earth_day_2k.jpg');
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    texturesRef.current.day = dayTexture;

    const nightTexture = textureLoader.load('/assets/earth/earth_night_2k.jpg');
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    texturesRef.current.night = nightTexture;

    const cloudsTexture = textureLoader.load('/assets/earth/earth_clouds_2k.jpg');
    cloudsTexture.colorSpace = THREE.SRGBColorSpace;
    texturesRef.current.clouds = cloudsTexture;

    // Earth Sphere Mesh
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTexture,
      roughness: 0.62,
      metalness: 0.12
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Atmospheric Clouds Layer (Floating sphere with jet-stream motion)
    const cloudsGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.015, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    scene.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // Google Earth Style Rayleigh Limb Scattering Glow
    const atmosGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.045, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);
    atmosMeshRef.current = atmosMesh;

    // Observer Station Marker
    const obsPos = latLonToVector3(observer.latitude, observer.longitude, 0);
    const obsGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const obsMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
    const obsMesh = new THREE.Mesh(obsGeo, obsMat);
    obsMesh.position.copy(obsPos);
    scene.add(obsMesh);

    // Ground Radar Ripple Ring
    const ringGeo = new THREE.RingGeometry(0.4, 0.55, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe8913a, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(obsPos);
    ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(ringMesh);

    // Dynamic Solar Illuminator from Astronomical Ephemeris
    const sunPosEci = getSunPositionECI(new Date());
    const sunDist = Math.sqrt(sunPosEci.x * sunPosEci.x + sunPosEci.y * sunPosEci.y + sunPosEci.z * sunPosEci.z) || 1;
    const sunDirection = new THREE.Vector3(
      (sunPosEci.x / sunDist) * 100,
      (sunPosEci.z / sunDist) * 100,
      (sunPosEci.y / sunDist) * 100
    );

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.4);
    sunLight.position.copy(sunDirection);
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const ambientLight = new THREE.AmbientLight(0x1e293b, 0.45);
    scene.add(ambientLight);

    // Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 500;
      starPositions[i + 1] = (Math.random() - 0.5) * 500;
      starPositions[i + 2] = (Math.random() - 0.5) * 500;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.65 });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Main Animation Loop with Google Earth Kinetic Physics
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // 1. Handle Smooth "Fly-To" Slerp Animation
      if (flyToStateRef.current.isFlying) {
        const now = performance.now();
        const elapsed = now - flyToStateRef.current.startTime;
        const progress = Math.min(1.0, elapsed / flyToStateRef.current.duration);

        // Smooth cubic ease-in-out curve
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        cameraAngleRef.current.theta = THREE.MathUtils.lerp(
          flyToStateRef.current.startTheta,
          flyToStateRef.current.targetTheta,
          ease
        );
        cameraAngleRef.current.phi = THREE.MathUtils.lerp(
          flyToStateRef.current.startPhi,
          flyToStateRef.current.targetPhi,
          ease
        );

        // Flight arc: zoom out slightly during mid-transit then zoom into destination
        const midArcRadius = Math.max(flyToStateRef.current.startRadius, flyToStateRef.current.targetRadius) + 4;
        const arcRadius = THREE.MathUtils.lerp(
          flyToStateRef.current.startRadius,
          flyToStateRef.current.targetRadius,
          ease
        ) + Math.sin(progress * Math.PI) * 3;

        cameraAngleRef.current.radius = arcRadius;

        if (progress >= 1.0) {
          flyToStateRef.current.isFlying = false;
        }
      } else {
        // 2. Google Earth Inertial Momentum Decay
        if (!isDraggingRef.current && !isRightClickDraggingRef.current) {
          const v = velocityRef.current;
          if (Math.abs(v.theta) > 0.00005 || Math.abs(v.phi) > 0.00005) {
            cameraAngleRef.current.theta += v.theta;
            cameraAngleRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngleRef.current.phi + v.phi));
            v.theta *= 0.94; // Exponential friction decay
            v.phi *= 0.94;
          } else if (isRotating && earthMeshRef.current) {
            // Gentle ambient planetary drift
            cameraAngleRef.current.theta += 0.0004;
          }
        }
      }

      // Clouds independent atmospheric jet-stream drift
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.00035;
      }

      // Update Camera Position & Altitude readout
      const { theta, phi, radius } = cameraAngleRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      // Convert Three.js radius to approximate Earth altitude in kilometers
      const altKm = Math.round(((radius - EARTH_RADIUS) / EARTH_RADIUS) * 6371);
      setCameraAltitudeKm(Math.max(300, altKm));

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [observer]);

  // Update Earth Material on Render Mode Change
  useEffect(() => {
    if (!earthMeshRef.current || !texturesRef.current.day) return;
    const mat = earthMeshRef.current.material as THREE.MeshStandardMaterial;

    if (renderMode === 'google-earth') {
      mat.map = texturesRef.current.day;
      mat.color.setHex(0xffffff);
      mat.roughness = 0.62;
      mat.wireframe = false;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = true;
      if (atmosMeshRef.current) atmosMeshRef.current.visible = true;
    } else if (renderMode === 'night') {
      mat.map = texturesRef.current.night || texturesRef.current.day;
      mat.color.setHex(0xffffff);
      mat.roughness = 0.9;
      mat.wireframe = false;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = false;
    } else if (renderMode === 'weather') {
      mat.map = texturesRef.current.day;
      mat.color.setHex(0xffffff);
      mat.wireframe = false;
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.visible = true;
        (cloudsMeshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.85;
      }
    } else if (renderMode === 'vegetation') {
      mat.map = texturesRef.current.day;
      mat.color.setHex(0x4ade80); // Enhanced NDVI chlorophyll green
      mat.wireframe = false;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = false;
    } else if (renderMode === 'radar') {
      mat.map = null;
      mat.color.setHex(0x06b6d4);
      mat.wireframe = true;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = false;
    }
    mat.needsUpdate = true;
  }, [renderMode]);

  // Update satellite meshes and trajectory lines
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const currentMeshes = satelliteMeshesRef.current;
    const activeNoradIds = new Set(satellites.map(s => s.noradId));

    for (const [noradId, mesh] of currentMeshes.entries()) {
      if (!activeNoradIds.has(noradId)) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        currentMeshes.delete(noradId);
      }
    }

    satellites.forEach(sat => {
      const pos = latLonToVector3(sat.latitude, sat.longitude, sat.altitudeKm);
      const isSelected = sat.noradId === selectedNoradId;

      let mesh = currentMeshes.get(sat.noradId);
      if (!mesh) {
        const radius = isSelected ? 0.38 : (sat.orbitType === 'GEO' ? 0.30 : 0.22);
        const geo = new THREE.SphereGeometry(radius, 16, 16);
        const color = isSelected ? 0xffffff : (CATEGORY_HEX[sat.category] || 0x06b6d4);
        const mat = new THREE.MeshBasicMaterial({ color });
        mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        currentMeshes.set(sat.noradId, mesh);
      }

      mesh.position.copy(pos);

      // Follow camera
      if (isSelected && isFollowMode && !flyToStateRef.current.isFlying) {
        cameraAngleRef.current.theta = (sat.longitude + 180) * (Math.PI / 180);
        cameraAngleRef.current.phi = Math.max(0.2, Math.min(Math.PI - 0.2, (90 - sat.latitude) * (Math.PI / 180)));
      }
    });

    // Orbit trail line for selected satellite
    if (selectedNoradId && satellites.length > 0) {
      const target = satellites.find(s => s.noradId === selectedNoradId);
      if (target) {
        if (orbitLineMeshRef.current) {
          scene.remove(orbitLineMeshRef.current);
          orbitLineMeshRef.current.geometry.dispose();
        }

        const points: THREE.Vector3[] = [];
        const orbitPoints = 64;
        const incRad = (51.6 * Math.PI) / 180;
        const r = EARTH_RADIUS + (target.altitudeKm / 6371) * (EARTH_RADIUS * 1.8);

        for (let i = 0; i <= orbitPoints; i++) {
          const u = (i / orbitPoints) * Math.PI * 2;
          const x = r * Math.cos(u);
          const y = r * Math.sin(u) * Math.sin(incRad);
          const z = r * Math.sin(u) * Math.cos(incRad);
          points.push(new THREE.Vector3(x, y, z));
        }

        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: CATEGORY_HEX[target.category] || 0xf59e0b,
          transparent: true,
          opacity: 0.7
        });

        const lineMesh = new THREE.Line(lineGeo, lineMat);
        scene.add(lineMesh);
        orbitLineMeshRef.current = lineMesh;
      }
    }
  }, [satellites, selectedNoradId, isFollowMode]);

  // Google Earth Mouse Interactions: Left-drag rotates, Right-drag tilts, Wheel zooms
  const handleMouseDown = (e: React.MouseEvent) => {
    flyToStateRef.current.isFlying = false; // Cancel any active fly-to on manual drag
    if (e.button === 2 || e.shiftKey) {
      isRightClickDraggingRef.current = true;
    } else {
      isDraggingRef.current = true;
    }
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { theta: 0, phi: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current && !isRightClickDraggingRef.current) return;
    const deltaX = e.clientX - prevMouseRef.current.x;
    const deltaY = e.clientY - prevMouseRef.current.y;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };

    if (isDraggingRef.current) {
      const dTheta = -deltaX * 0.006;
      const dPhi = -deltaY * 0.006;
      cameraAngleRef.current.theta += dTheta;
      cameraAngleRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngleRef.current.phi + dPhi));
      // Store velocity for Google Earth kinetic momentum
      velocityRef.current = { theta: dTheta, phi: dPhi };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    isRightClickDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    flyToStateRef.current.isFlying = false;
    // Logarithmic smooth zoom
    const zoomFactor = e.deltaY * 0.025;
    cameraAngleRef.current.radius = Math.max(
      13.5,
      Math.min(80, cameraAngleRef.current.radius + zoomFactor)
    );
  };

  // Double Click: Google Earth Smooth Fly-In
  const handleDoubleClick = (e: React.MouseEvent) => {
    const container = mountRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!container || !camera || !scene) return;

    const rect = container.getBoundingClientRect();
    mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseVecRef.current, camera);
    if (earthMeshRef.current) {
      const intersects = raycasterRef.current.intersectObject(earthMeshRef.current);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        const r = point.length();
        const lat = 90 - (Math.acos(point.y / r) * 180) / Math.PI;
        const lon = (Math.atan2(point.z, -point.x) * 180) / Math.PI - 180;
        flyToLatLon(lat, lon, Math.max(16, cameraAngleRef.current.radius * 0.75));
      }
    }
  };

  const selectedSat = satellites.find(s => s.noradId === selectedNoradId);

  return (
    <div 
      className="relative w-full h-[540px] sm:h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Left: Google Earth Rendering Modes */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-xs font-mono shadow-xl flex-wrap">
        <button
          onClick={() => { soundManager.playClick(); setRenderMode('google-earth'); }}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
            renderMode === 'google-earth'
              ? 'bg-[#0284c7] text-white font-bold shadow-md shadow-sky-500/20'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          title="Authentic Google Earth / NASA Blue Marble Satellite Mode"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Google Earth</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setRenderMode('night'); }}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
            renderMode === 'night'
              ? 'bg-[#e8913a] text-black font-bold shadow-md'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          title="NASA Black Marble Nighttime City Lights"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Night Lights</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setRenderMode('weather'); }}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
            renderMode === 'weather'
              ? 'bg-[#38bdf8] text-black font-bold shadow-md'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          title="Atmospheric Clouds & Jet Stream Weather"
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>Clouds</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); setRenderMode('radar'); }}
          className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
            renderMode === 'radar'
              ? 'bg-[#06b6d4] text-black font-bold shadow-md'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          title="Synthetic Aperture Radar (SAR) Wireframe"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Radar SAR</span>
        </button>
      </div>

      {/* Top Right: Google Earth Style Nav Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-center gap-2">
        {/* Interactive Compass (Click resets North up) */}
        <button
          onClick={() => {
            soundManager.playClick();
            cameraAngleRef.current.theta = 0;
            cameraAngleRef.current.phi = 1.1;
          }}
          className="w-9 h-9 rounded-full bg-black/80 border border-white/20 hover:border-white/40 flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
          title="Reset to North Orientation"
        >
          <Compass className="w-5 h-5 text-[#38bdf8]" />
        </button>

        {/* Fly to Observer Ground Station */}
        <button
          onClick={() => flyToLatLon(observer.latitude, observer.longitude, 20)}
          className="w-9 h-9 rounded-full bg-black/80 border border-white/20 hover:border-[#fde047]/60 flex items-center justify-center text-[#fde047] shadow-xl transition-transform hover:scale-105"
          title={`Fly to ${observer.name}`}
        >
          <Navigation className="w-4 h-4 text-[#fde047]" />
        </button>

        {/* Zoom In (+) */}
        <button
          onClick={() => {
            soundManager.playClick();
            cameraAngleRef.current.radius = Math.max(14, cameraAngleRef.current.radius - 3.5);
          }}
          className="w-8 h-8 rounded-lg bg-black/80 border border-white/20 hover:border-white/40 flex items-center justify-center text-white shadow-xl text-sm"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out (-) */}
        <button
          onClick={() => {
            soundManager.playClick();
            cameraAngleRef.current.radius = Math.min(80, cameraAngleRef.current.radius + 3.5);
          }}
          className="w-8 h-8 rounded-lg bg-black/80 border border-white/20 hover:border-white/40 flex items-center justify-center text-white shadow-xl text-sm"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Center: Selected Satellite Target Reticle & Telemetry */}
      {selectedSat && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/85 border border-white/20 backdrop-blur-md shadow-2xl text-xs font-mono">
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: CATEGORY_HEX[selectedSat.category] ? `#${CATEGORY_HEX[selectedSat.category].toString(16)}` : '#06b6d4' }}
            />
            <span className="font-bold text-white text-sm">{selectedSat.name}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[#94a3b8] border-l border-white/10 pl-3">
            <span>ALT: <b className="text-white">{selectedSat.altitudeKm} km</b></span>
            <span>VEL: <b className="text-white">{selectedSat.velocityKmS} km/s</b></span>
            <span>ILLUM: <b className={selectedSat.isSunlit ? 'text-amber-300' : 'text-blue-300'}>{selectedSat.isSunlit ? 'Sunlit' : 'Umbra'}</b></span>
          </div>

          <button
            onClick={() => flyToLatLon(selectedSat.latitude, selectedSat.longitude, 20)}
            className="px-2.5 py-1 rounded-lg bg-[#38bdf8]/20 hover:bg-[#38bdf8]/35 border border-[#38bdf8]/40 text-[#a5f3fc] text-[11px] font-bold transition-colors flex items-center gap-1"
          >
            <span>Fly to Sat</span>
            <Target className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Bottom Right: Altitude HUD & Kinetic Interaction Hint */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-1 text-[10px] font-mono text-[#94a3b8] select-none pointer-events-none bg-black/50 p-2 rounded-xl backdrop-blur-sm border border-white/5">
        <span className="text-white font-bold">Orbital Altitude: ~{cameraAltitudeKm.toLocaleString()} km</span>
        <span>Drag to rotate • Kinetic momentum active</span>
        <span>Double click to fly into coordinate</span>
      </div>
    </div>
  );
}
