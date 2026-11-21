'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Orbit, Zap, Sun, ShieldAlert, Sparkles, Layers, Sliders, Globe, 
  Eye, Compass, RotateCcw, Play, Pause, ChevronRight, X, Rocket, 
  Telescope, Atom, BookOpen, Flame, Dna, CheckCircle2, ExternalLink, Video,
  Minimize2, Maximize2, Radio, Info, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { 
  KardashevType, 
  SatelliteNode, 
  STAGE_DETAILS, 
  SATELLITE_DATABASE, 
  formatMathEquation 
} from '../data/dysonClusterData';
import { MathEquation } from './MathEquation';

interface DysonSimulation3DProps {
  isLightMode: boolean;
  onExploreObserver?: () => void;
}

export function DysonSimulation3D({ isLightMode, onExploreObserver }: DysonSimulation3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Group references
  const stagesGroupRef = useRef<Map<string, THREE.Group>>(new Map());
  const interactiveMeshesRef = useRef<THREE.Mesh[]>([]);
  const targetCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);

  // State
  const [currentStage, setCurrentStage] = useState<string>('2');
  const [selectedNode, setSelectedNode] = useState<SatelliteNode | null>(null);
  const [activeTab, setActiveTab] = useState<'earth' | 'space' | 'colonization' | 'dyson' | 'fluids' | 'physics' | 'chemistry' | 'biology' | 'dimensions' | 'requirements' | 'vedic'>('colonization');
  const [isDrawerMinimized, setIsDrawerMinimized] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [copiedEq, setCopiedEq] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SatelliteNode | null>(null);
  const [webglError, setWebglError] = useState<boolean>(false);

  // Current stage details
  const stageInfo = STAGE_DETAILS[currentStage] || STAGE_DETAILS['2'];
  const clusterSatellites = useMemo(() => {
    return SATELLITE_DATABASE[currentStage] || [];
  }, [currentStage]);

  const toHexColor = (col: number) => `#${col.toString(16).padStart(6, '0')}`;

  // Set default selected node when switching stages
  useEffect(() => {
    if (clusterSatellites.length > 0) {
      // Find central star or first object
      const star = clusterSatellites.find(s => s.category === 'star') || clusterSatellites[0];
      setSelectedNode(star);
    } else {
      setSelectedNode(null);
    }
  }, [currentStage, clusterSatellites]);

  // Handle equation copy
  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedEq(text);
    soundManager.tick();
    setTimeout(() => setCopiedEq(null), 2000);
  };

  // Smoothly move camera towards a satellite
  const focusOnNode = (node: SatelliteNode) => {
    setSelectedNode(node);
    soundManager.bell(node.category === 'star' ? 432 : 880, 0.2, 1.6);

    const [x, y, z] = node.pos;
    const targetLookAt = new THREE.Vector3(x, y, z);
    
    // Position camera offset from node depending on size
    const distanceOffset = Math.max(node.size * 5, 24);
    const targetCamPos = new THREE.Vector3(
      x + distanceOffset * 0.7, 
      y + distanceOffset * 0.4, 
      z + distanceOffset * 0.8
    );

    targetCameraPosRef.current = targetCamPos;
    targetLookAtRef.current = targetLookAt;
  };

  // -------------------------------------------------------------
  // THREE.JS SCENE INITIALIZATION & SATELLITE MESH GENERATION
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (window.innerHeight - 68);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isLightMode ? 0x070c14 : 0x030508);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 4000);
    camera.position.set(50, 40, 75);
    cameraRef.current = camera;

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.replaceChildren(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn("WebGL initialization failed:", e);
      setWebglError(true);
      return;
    }

    // OrbitControls
    let controls: OrbitControls | null = null;
    try {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 600;
      controls.minDistance = 5;
      controls.autoRotate = isAutoRotate;
      controls.autoRotateSpeed = 0.5;
      controlsRef.current = controls;
    } catch (e) {
      console.warn("OrbitControls initialization failed:", e);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunPointLight = new THREE.PointLight(0xffeedd, 4.0, 500);
    sunPointLight.position.set(0, 0, 0);
    scene.add(sunPointLight);

    const rimLight = new THREE.DirectionalLight(0x6fb0b2, 1.8);
    rimLight.position.set(-60, 50, -40);
    scene.add(rimLight);

    // Cosmic Starfield
    const starCount = 5000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 1600;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const r = Math.random();
      if (r < 0.4) {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 0.85; starColors[i * 3 + 2] = 0.4; // Gold
      } else if (r < 0.75) {
        starColors[i * 3] = 0.45; starColors[i * 3 + 1] = 0.8; starColors[i * 3 + 2] = 1.0; // Cyan
      } else {
        starColors[i * 3] = 0.85; starColors[i * 3 + 1] = 0.55; starColors[i * 3 + 2] = 1.0; // Violet
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.2, vertexColors: true, transparent: true, opacity: 0.85 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Build stage groups & 3D objects
    const stageKeys = Object.keys(SATELLITE_DATABASE);
    const stageGroups = new Map<string, THREE.Group>();
    const interactiveMeshes: THREE.Mesh[] = [];

    stageKeys.forEach((key) => {
      const group = new THREE.Group();
      group.name = `stage-${key}`;
      const nodes = SATELLITE_DATABASE[key] || [];

      nodes.forEach((node) => {
        const [x, y, z] = node.pos;
        let mesh: THREE.Mesh;

        // Visual distinction by category
        if (node.category === 'star') {
          const starGeo = new THREE.SphereGeometry(node.size, 48, 48);
          const starMat = new THREE.MeshStandardMaterial({
            color: node.color,
            emissive: node.color,
            emissiveIntensity: 1.8,
            roughness: 0.1,
            metalness: 0.2
          });
          mesh = new THREE.Mesh(starGeo, starMat);
          mesh.position.set(x, y, z);

          // Corona Halo
          const coronaGeo = new THREE.SphereGeometry(node.size * 1.35, 32, 32);
          const coronaMat = new THREE.MeshBasicMaterial({
            color: node.color,
            transparent: true,
            opacity: 0.25,
            wireframe: true
          });
          const corona = new THREE.Mesh(coronaGeo, coronaMat);
          mesh.add(corona);

        } else if (node.category === 'planet') {
          const planetGeo = new THREE.SphereGeometry(node.size, 32, 32);
          const planetMat = new THREE.MeshStandardMaterial({
            color: node.color,
            roughness: 0.6,
            metalness: 0.1
          });
          mesh = new THREE.Mesh(planetGeo, planetMat);
          mesh.position.set(x, y, z);

          // Atmospheric Glow Shell
          const atmoGeo = new THREE.SphereGeometry(node.size * 1.08, 32, 32);
          const atmoMat = new THREE.MeshBasicMaterial({
            color: node.id.includes('mars') ? 0xf87171 : 0x67e8f9,
            transparent: true,
            opacity: 0.28,
            blending: THREE.AdditiveBlending
          });
          const atmo = new THREE.Mesh(atmoGeo, atmoMat);
          mesh.add(atmo);

          // If Earth: add Moon and Magnetosphere Bow Shock Shield
          if (node.id.includes('earth')) {
            // Earth Moon (Chandra)
            const moonGeo = new THREE.SphereGeometry(node.size * 0.27, 16, 16);
            const moonMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.9 });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);
            moonMesh.position.set(node.size * 2.4, 0.8, 0);
            mesh.add(moonMesh);

            // Moon orbit path line
            const moonOrbitCurve = new THREE.EllipseCurve(0, 0, node.size * 2.4, node.size * 2.4, 0, Math.PI * 2, false, 0);
            const moonPoints = moonOrbitCurve.getPoints(48);
            const moonOrbitGeo = new THREE.BufferGeometry().setFromPoints(moonPoints.map(p => new THREE.Vector3(p.x, 0, p.y)));
            const moonOrbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
            const moonOrbitLine = new THREE.Line(moonOrbitGeo, moonOrbitMat);
            moonOrbitLine.rotation.x = Math.PI / 2.3;
            mesh.add(moonOrbitLine);

            // Magnetosphere Bow Shock Deflection Arc
            const shockGeo = new THREE.RingGeometry(node.size * 1.6, node.size * 1.7, 32, 1, -Math.PI / 3, (2 * Math.PI) / 3);
            const shockMat = new THREE.MeshBasicMaterial({
              color: 0x38bdf8,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.5,
              blending: THREE.AdditiveBlending
            });
            const shock = new THREE.Mesh(shockGeo, shockMat);
            shock.rotation.y = Math.PI / 2;
            mesh.add(shock);
          }

          // If Mars: add Terraforming Polar Ice Cap & Orbital Mirror
          if (node.id.includes('mars')) {
            const iceGeo = new THREE.SphereGeometry(node.size * 0.45, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.3);
            const iceMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
            const ice = new THREE.Mesh(iceGeo, iceMat);
            ice.position.y = node.size * 0.85;
            mesh.add(ice);
          }

        } else if (node.category === 'megastructure') {
          // Torus or geometric ring
          const torusGeo = new THREE.TorusGeometry(node.size * 1.5, node.size * 0.35, 16, 64);
          const torusMat = new THREE.MeshStandardMaterial({
            color: node.color,
            metalness: 0.85,
            roughness: 0.25,
            emissive: node.color,
            emissiveIntensity: 0.35
          });
          mesh = new THREE.Mesh(torusGeo, torusMat);
          mesh.position.set(x, y, z);
          mesh.rotation.x = Math.PI / 3;

        } else if (node.category === 'habitat') {
          // O'Neill Cylinder or Bernal Sphere
          const cylGeo = new THREE.CylinderGeometry(node.size * 0.6, node.size * 0.6, node.size * 2.2, 16);
          const cylMat = new THREE.MeshStandardMaterial({
            color: node.color,
            metalness: 0.8,
            roughness: 0.3
          });
          mesh = new THREE.Mesh(cylGeo, cylMat);
          mesh.position.set(x, y, z);
          mesh.rotation.z = Math.PI / 4;

        } else if (node.category === 'anomaly') {
          // Singular hyper-structure
          const icoGeo = new THREE.IcosahedronGeometry(node.size, 2);
          const icoMat = new THREE.MeshStandardMaterial({
            color: node.color,
            wireframe: true,
            emissive: node.color,
            emissiveIntensity: 0.9
          });
          mesh = new THREE.Mesh(icoGeo, icoMat);
          mesh.position.set(x, y, z);

        } else {
          // Standard Satellite / Thruster (Octahedron with solar wings)
          const satGeo = new THREE.OctahedronGeometry(node.size, 1);
          const satMat = new THREE.MeshStandardMaterial({
            color: node.color,
            metalness: 0.9,
            roughness: 0.2,
            emissive: node.color,
            emissiveIntensity: 0.5
          });
          mesh = new THREE.Mesh(satGeo, satMat);
          mesh.position.set(x, y, z);

          // Solar array wings
          const wingGeo = new THREE.BoxGeometry(node.size * 3.0, node.size * 0.08, node.size * 0.7);
          const wingMat = new THREE.MeshStandardMaterial({
            color: 0x1e3a8a,
            metalness: 0.95,
            roughness: 0.1
          });
          const wings = new THREE.Mesh(wingGeo, wingMat);
          mesh.add(wings);
        }

        // Add Pulsing Beacon Halo (Click Target Beacon)
        const beaconGeo = new THREE.SphereGeometry(node.size * 1.6, 16, 16);
        const beaconMat = new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.22,
          wireframe: true
        });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        mesh.add(beacon);

        // Orbital line around origin if distance > 0
        const dist = Math.sqrt(x * x + z * z);
        if (dist > 3) {
          const orbitCurve = new THREE.EllipseCurve(
            0, 0,
            dist, dist,
            0, 2 * Math.PI,
            false,
            0
          );
          const points = orbitCurve.getPoints(96);
          const orbitGeo = new THREE.BufferGeometry().setFromPoints(
            points.map(p => new THREE.Vector3(p.x, y * 0.15, p.y))
          );
          const orbitMat = new THREE.LineBasicMaterial({
            color: node.color,
            transparent: true,
            opacity: 0.18
          });
          const orbitLine = new THREE.Line(orbitGeo, orbitMat);
          group.add(orbitLine);
        }

        // Store reference to node
        mesh.userData = { node };
        interactiveMeshes.push(mesh);
        group.add(mesh);
      });

      // Particle Dyson Swarm Cloud for Stage 2 & 3
      if (key === '2' || key === '3') {
        const pCount = key === '2' ? 2500 : 4500;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        const pCols = new Float32Array(pCount * 3);
        const radius = key === '2' ? 28 : 55;

        for (let i = 0; i < pCount; i++) {
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const r = radius + (Math.random() - 0.5) * 6;

          pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * (key === '2' ? 0.35 : 0.8);
          pPos[i * 3 + 2] = r * Math.cos(phi);

          pCols[i * 3] = 0.95; pCols[i * 3 + 1] = 0.75; pCols[i * 3 + 2] = 0.25;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));
        const pMat = new THREE.PointsMaterial({
          size: 0.7,
          vertexColors: true,
          transparent: true,
          opacity: 0.65
        });
        const swarm = new THREE.Points(pGeo, pMat);
        swarm.name = 'dyson-swarm-particles';
        group.add(swarm);
      }

      // Solar Wind Plasma Stream (Fluid Mechanics Simulation)
      const swCount = 1200;
      const swGeo = new THREE.BufferGeometry();
      const swPos = new Float32Array(swCount * 3);
      for (let i = 0; i < swCount; i++) {
        const u = Math.random();
        const r = 6 + u * 85;
        const angle = u * 7.0 + (i % 6) * ((Math.PI * 2) / 6);
        swPos[i * 3] = r * Math.cos(angle);
        swPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
        swPos[i * 3 + 2] = r * Math.sin(angle);
      }
      swGeo.setAttribute('position', new THREE.BufferAttribute(swPos, 3));
      const swMat = new THREE.PointsMaterial({
        color: 0xfef08a,
        size: 0.85,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      });
      const swParticles = new THREE.Points(swGeo, swMat);
      swParticles.name = 'solar-wind-plasma';
      group.add(swParticles);

      // Add stage group to scene (initially hide unless matches currentStage)
      group.visible = (key === currentStage);
      scene.add(group);
      stageGroups.set(key, group);
    });

    stagesGroupRef.current = stageGroups;
    interactiveMeshesRef.current = interactiveMeshes;

    // -------------------------------------------------------------
    // RAYCASTING FOR MOUSE CLICKS & HOVERS
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const activeStageGroup = stageGroups.get(currentStage);
      if (!activeStageGroup) return;

      const visibleInteractive = interactiveMeshes.filter(m => activeStageGroup.children.includes(m));
      const intersects = raycaster.intersectObjects(visibleInteractive, true);

      if (intersects.length > 0) {
        let hitMesh: THREE.Object3D | null = intersects[0].object;
        while (hitMesh && !hitMesh.userData?.node && hitMesh.parent) {
          hitMesh = hitMesh.parent;
        }

        if (hitMesh && hitMesh.userData?.node) {
          const node = hitMesh.userData.node as SatelliteNode;
          focusOnNode(node);
        }
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const activeStageGroup = stageGroups.get(currentStage);
      if (!activeStageGroup) return;

      const visibleInteractive = interactiveMeshes.filter(m => activeStageGroup.children.includes(m));
      const intersects = raycaster.intersectObjects(visibleInteractive, true);

      if (intersects.length > 0) {
        let hitMesh: THREE.Object3D | null = intersects[0].object;
        while (hitMesh && !hitMesh.userData?.node && hitMesh.parent) {
          hitMesh = hitMesh.parent;
        }
        if (hitMesh && hitMesh.userData?.node) {
          container.style.cursor = 'pointer';
          setHoveredNode(hitMesh.userData.node as SatelliteNode);
          return;
        }
      }
      container.style.cursor = 'grab';
      setHoveredNode(null);
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);

    // -------------------------------------------------------------
    // ANIMATION & CAMERA TWEEN LOOP
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation towards target
      if (targetCameraPosRef.current && targetLookAtRef.current) {
        camera.position.lerp(targetCameraPosRef.current, 0.05);
        if (controls) controls.target.lerp(targetLookAtRef.current, 0.05);

        if (camera.position.distanceTo(targetCameraPosRef.current) < 0.2) {
          targetCameraPosRef.current = null;
          targetLookAtRef.current = null;
        }
      }

      // Rotate Swarms and Meshes in active group
      const activeGroup = stageGroups.get(currentStage);
      if (activeGroup) {
        const swarmParticles = activeGroup.getObjectByName('dyson-swarm-particles');
        if (swarmParticles) {
          swarmParticles.rotation.y = time * 0.08;
        }

        const swParticles = activeGroup.getObjectByName('solar-wind-plasma');
        if (swParticles) {
          swParticles.rotation.y = time * 0.14;
        }

        activeGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.userData?.node) {
            child.rotation.y += delta * 0.4;
          }
        });
      }

      if (controls) controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      window.removeEventListener('resize', handleResize);
      if (renderer?.domElement) {
        renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
        renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      }
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer) {
        try { renderer.dispose(); } catch {}
      }
    };
  }, [isLightMode]);

  // Update visible group on stage change
  useEffect(() => {
    stagesGroupRef.current.forEach((group, key) => {
      group.visible = (key === currentStage);
    });

    if (controlsRef.current && cameraRef.current) {
      // Reset view to wide view for the new stage
      targetCameraPosRef.current = new THREE.Vector3(50, 40, 75);
      targetLookAtRef.current = new THREE.Vector3(0, 0, 0);
    }
  }, [currentStage]);

  // Toggle auto rotate in controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  return (
    <div className="relative w-full h-[calc(100vh-68px)] overflow-hidden bg-[#05070a] select-none font-serif text-[#efe6d6]">
      {/* 1. THREE.JS 3D VIEWPORT CANVAS */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. TOP STAGE SELECTOR RAIL */}
      <div className="absolute top-3 left-3 right-3 sm:left-6 sm:right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-[12px] bg-[#0c0906]/90 border border-[rgba(232,145,58,0.35)] backdrop-blur-xl shadow-2xl overflow-x-auto max-w-[90vw] no-scrollbar">
          {Object.entries(STAGE_DETAILS).map(([key, stg]) => {
            const isSelected = key === currentStage;
            return (
              <button
                key={key}
                onClick={() => {
                  soundManager.bell(isSelected ? 1046.5 : 880, 0.18, 1.4);
                  setCurrentStage(key);
                }}
                className={`h-9 px-3 rounded-[8px] flex items-center gap-2 text-xs font-serif font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] border-[#fde047] shadow-[0_0_12px_rgba(232,145,58,0.5)] scale-102'
                    : 'border-transparent text-[#b5a990] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stg.color }} />
                <span>{stg.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Control Toggles */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 p-1.5 rounded-[10px] bg-[#0c0906]/90 border border-[rgba(232,145,58,0.3)] backdrop-blur-xl">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            aria-label={isAutoRotate ? "Pause camera orbit" : "Resume camera orbit"}
            className={`p-1.5 rounded-[6px] transition-all ${
              isAutoRotate ? 'text-[#fde047] bg-white/10' : 'text-[#b5a990] hover:text-white'
            }`}
          >
            {isAutoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              targetCameraPosRef.current = new THREE.Vector3(50, 40, 75);
              targetLookAtRef.current = new THREE.Vector3(0, 0, 0);
              soundManager.playClick();
            }}
            aria-label="Reset Camera Target"
            className="p-1.5 rounded-[6px] text-[#b5a990] hover:text-[#e8913a] hover:bg-white/10 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {onExploreObserver && (
            <button
              onClick={() => {
                soundManager.bell(1046.5, 0.2, 1.8);
                onExploreObserver();
              }}
              className="h-7 px-2.5 rounded-[6px] text-[10.5px] font-bold uppercase tracking-wider bg-[#a855f7]/20 border border-[#a855f7]/40 text-[#d8b4fe] hover:bg-[#a855f7]/40 hover:text-white transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
              <span>Odyssey</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. HOVERED NODE TOOLTIP PILL */}
      {hoveredNode && !selectedNode && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3.5 py-1.5 rounded-full bg-black/80 border border-[#e8913a]/50 text-xs text-[#efe6d6] backdrop-blur-md shadow-lg flex items-center gap-2 animate-in fade-in duration-150">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: toHexColor(hoveredNode.color) }} />
          <span>{hoveredNode.name}</span>
          <span className="text-[10px] text-[#e8913a] uppercase font-mono">({hoveredNode.category})</span>
        </div>
      )}

      {/* 4. FLOATING CLUSTER OBJECTS SELECTOR BAR (BOTTOM CENTER) */}
      <div className="absolute bottom-4 left-3 right-3 sm:left-6 sm:right-6 z-20 pointer-events-none flex flex-col items-center gap-2">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-[14px] bg-[#0c0906]/95 border border-[rgba(232,145,58,0.4)] backdrop-blur-2xl shadow-2xl max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 pr-2 border-r border-[rgba(232,145,58,0.2)] shrink-0">
            <Radio className="w-3.5 h-3.5 text-[#e8913a] animate-pulse" />
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#d4af37]">
              Objects in System ({clusterSatellites.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {clusterSatellites.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => focusOnNode(node)}
                  className={`h-7 px-2.5 rounded-[6px] flex items-center gap-1.5 text-xs whitespace-nowrap transition-all border shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] font-bold border-[#fde047] shadow-[0_0_10px_rgba(232,145,58,0.4)]'
                      : 'bg-white/5 border-white/10 text-[#cfe0d8] hover:bg-white/15 hover:border-[rgba(232,145,58,0.3)]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: toHexColor(node.color) }} />
                  <span>{node.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. COMPREHENSIVE TELEMETRY & SCIENCE DRAWER (TOP-RIGHT / SLIDE-IN) */}
      {selectedNode && (
        <aside 
          className={`absolute top-20 right-3 sm:right-6 z-30 flex flex-col rounded-[16px] bg-[#0d0a07]/95 border border-[rgba(232,145,58,0.35)] backdrop-blur-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
            isDrawerMinimized 
              ? 'w-72 h-14' 
              : 'w-[92vw] sm:w-[460px] md:w-[500px] max-h-[78vh]'
          }`}
        >
          {/* DRAWER TOP BAR */}
          <div className="flex items-center justify-between p-3.5 border-b border-[rgba(232,145,58,0.2)] bg-[#140e09]/90 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-3 h-3 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: toHexColor(selectedNode.color) }} />
              <div className="truncate">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#e8913a] block">
                  {selectedNode.category.toUpperCase()} • {selectedNode.sanskritName}
                </span>
                <h3 className="text-sm font-serif font-bold text-white truncate">
                  {selectedNode.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsDrawerMinimized(!isDrawerMinimized)}
                aria-label={isDrawerMinimized ? "Expand Drawer" : "Minimize Drawer"}
                className="p-1 rounded-[6px] text-[#b5a990] hover:text-[#e8913a] hover:bg-white/10 transition-all"
              >
                {isDrawerMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setSelectedNode(null)}
                aria-label="Close Telemetry"
                className="p-1 rounded-[6px] text-[#b5a990] hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isDrawerMinimized && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* SPECIFICATION PILL GRID */}
              <div className="p-3 border-b border-[rgba(232,145,58,0.15)] bg-black/40 grid grid-cols-2 gap-2 text-[10.5px] font-mono shrink-0">
                <div className="p-1.5 rounded bg-white/5 border border-white/5 truncate">
                  <span className="text-[#e8913a] block text-[9px] uppercase">Orbit / Zone</span>
                  <span className="text-[#efe6d6]">{selectedNode.specs.orbit}</span>
                </div>
                <div className="p-1.5 rounded bg-white/5 border border-white/5 truncate">
                  <span className="text-[#fde047] block text-[9px] uppercase">Power Flux</span>
                  <span className="text-[#efe6d6]">{selectedNode.specs.power}</span>
                </div>
                <div className="p-1.5 rounded bg-white/5 border border-white/5 truncate">
                  <span className="text-[#6fb0b2] block text-[9px] uppercase">Propulsion</span>
                  <span className="text-[#efe6d6]">{selectedNode.specs.propulsion}</span>
                </div>
                <div className="p-1.5 rounded bg-white/5 border border-white/5 truncate">
                  <span className="text-[#a855f7] block text-[9px] uppercase">Scale / Dim</span>
                  <span className="text-[#efe6d6]">{selectedNode.specs.dimensions}</span>
                </div>
              </div>

              {/* NAVIGATION TABS */}
              <div className="flex items-center gap-1 p-2 border-b border-[rgba(232,145,58,0.18)] bg-[#0d0905] overflow-x-auto no-scrollbar shrink-0">
                {[
                  { id: 'colonization', label: 'Mars, Moon & Colonization', icon: Rocket },
                  { id: 'dyson', label: 'Dyson Watts & Power', icon: Zap },
                  { id: 'fluids', label: 'Fluid & Plasma Flows', icon: Sparkles },
                  { id: 'earth', label: 'Earth Status', icon: Globe },
                  { id: 'space', label: 'Space Outcomes', icon: Telescope },
                  { id: 'physics', label: 'Physics & Equations', icon: Atom },
                  { id: 'chemistry', label: 'Reactions', icon: Flame },
                  { id: 'biology', label: 'Evolution', icon: Dna },
                  { id: 'dimensions', label: 'Spacetime Topology', icon: Layers },
                  { id: 'requirements', label: 'Requirements', icon: CheckCircle2 },
                  { id: 'vedic', label: 'Vedic Synthesis', icon: BookOpen },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        soundManager.tick();
                        setActiveTab(tab.id as any);
                      }}
                      className={`h-7 px-2.5 rounded-[6px] text-[11px] font-serif font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                        isActive 
                          ? 'bg-[#e8913a] text-[#0d0a08] font-bold shadow' 
                          : 'text-[#b5a990] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT (SCROLLABLE) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-serif text-xs leading-relaxed no-scrollbar">
                
                {/* 0A. COLONIZATION & POST-PLANETARY SOCIETY */}
                {activeTab === 'colonization' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#18110b] to-[#140e09] border border-[rgba(232,145,58,0.3)] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8913a] flex items-center gap-1.5">
                        <Rocket className="w-3.5 h-3.5 text-[#e8913a]" />
                        Planetary Colonization & Off-World Development
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {selectedNode.colonizationSocialization?.offworldStatus || selectedNode.spaceOutcomes.colonization}
                      </h4>
                      <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-black/40 border border-white/5">
                          <span className="text-[#fde047] font-bold block mb-0.5">Demographics / Population:</span>
                          <p className="text-[#efe6d6] leading-tight">
                            {selectedNode.colonizationSocialization?.population || 'Uninhabited automated installation'}
                          </p>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/5">
                          <span className="text-[#6fb0b2] font-bold block mb-0.5">Planetary Governance:</span>
                          <p className="text-[#efe6d6] leading-tight">
                            {selectedNode.colonizationSocialization?.governance || 'Autonomous algorithmic control'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d8b4fe] block">
                        Interplanetary Culture, Arts & Socialization
                      </span>
                      <p className="text-[#efe6d6] leading-relaxed">
                        {selectedNode.colonizationSocialization?.cultureSocial || 'Interconnected cybernetic nodes sharing quantum cryptographic consciousness.'}
                      </p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86a86c] block">
                        Terrestrial & Orbital Infrastructure Status
                      </span>
                      <p className="text-[#cfe0d8] leading-relaxed">
                        {selectedNode.earthChanges.civilization}
                      </p>
                    </div>
                  </div>
                )}

                {/* 0B. DYSON WATTS & ENERGETIC METRICS */}
                {activeTab === 'dyson' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#18110b] to-[#120d09] border border-[rgba(232,145,58,0.3)] space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#fde047] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#fde047]" />
                        Dyson Energetics & Consumption per Watt
                      </span>
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2.5 rounded bg-black/60 border border-white/10">
                          <span className="text-[#e8913a] block text-[9.5px] uppercase">Power Consumed</span>
                          <span className="text-white font-bold text-xs">
                            {selectedNode.dysonPerWattMetrics?.wattsConsumed || selectedNode.specs.power}
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-black/60 border border-white/10">
                          <span className="text-[#fde047] block text-[9.5px] uppercase">Dyson Fraction</span>
                          <span className="text-white font-bold text-xs">
                            {selectedNode.dysonPerWattMetrics?.dysonPercentage || 'Direct Stellar Source'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-black/60 border border-white/10">
                          <span className="text-[#6fb0b2] block text-[9.5px] uppercase">Watts Per Capita</span>
                          <span className="text-[#a5f3fc] font-bold text-xs">
                            {selectedNode.dysonPerWattMetrics?.wattsPerCapita || 'System-wide allocation'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-black/60 border border-white/10">
                          <span className="text-[#a855f7] block text-[9.5px] uppercase">Energy Harness Mechanism</span>
                          <span className="text-[#efe6d6] text-[10px]">
                            {selectedNode.dysonPerWattMetrics?.energySource || selectedNode.specs.propulsion}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8913a] block">
                        Thermodynamic Energy Flow & Heat Dissipation
                      </span>
                      <p className="text-[#efe6d6] leading-relaxed">
                        Radiative equilibrium maintained via blackbody infrared radiators: $P = \epsilon \sigma A T^4$. All intercepted energy is utilized and radiated at thermodynamic cold sinks.
                      </p>
                    </div>
                  </div>
                )}

                {/* 0C. FLUID & PLASMA DYNAMICS */}
                {activeTab === 'fluids' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#111923] to-[#0a1017] border border-[#6fb0b2]/40 space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#a5f3fc] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#a5f3fc]" />
                        Fluid Mechanics & Magnetohydrodynamics
                      </span>
                      
                      <div className="space-y-2 text-[11.5px]">
                        <div className="p-2.5 rounded bg-black/60 border border-white/10 space-y-0.5">
                          <span className="text-[#fde047] font-bold block text-[10px] uppercase">Atmospheric Navier-Stokes Dynamics:</span>
                          <p className="text-[#cfe8e8] leading-relaxed">
                            {selectedNode.fluidMechanics?.atmosphericFlow || 'Compressible relativistic Navier-Stokes equations governing atmospheric gas envelope and pressure gradients.'}
                          </p>
                        </div>
                        <div className="p-2.5 rounded bg-black/60 border border-white/10 space-y-0.5">
                          <span className="text-[#e8913a] font-bold block text-[10px] uppercase">Solar Wind Plasma Deflection:</span>
                          <p className="text-[#efe6d6] leading-relaxed">
                            {selectedNode.fluidMechanics?.plasmaDynamics || 'Alfvén wave propagation and Parker spiral magnetic reconnection steering high-energy coronal mass ejections.'}
                          </p>
                        </div>
                        <div className="p-2.5 rounded bg-black/60 border border-white/10 space-y-0.5">
                          <span className="text-[#86a86c] font-bold block text-[10px] uppercase">Oceanic & Terraforming Hydrosphere:</span>
                          <p className="text-[#cfe0d8] leading-relaxed">
                            {selectedNode.fluidMechanics?.oceanicTerraforming || 'Hydrothermal circulation cells distributing thermal buoyancy across artificial and planetary water basins.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 1. EARTH CHANGES */}
                {activeTab === 'earth' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#18110b] to-[#140e09] border border-[rgba(232,145,58,0.3)]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8913a] block mb-1">
                        Terrestrial Status & Biosphere
                      </span>
                      <h4 className="text-sm font-bold text-white mb-2">{selectedNode.earthChanges.title}</h4>
                      <p className="text-[#efe6d6] leading-relaxed">{selectedNode.earthChanges.civilization}</p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86a86c] block">
                        Climate & Environmental Dynamics
                      </span>
                      <p className="text-[#cfe0d8] leading-relaxed">{selectedNode.earthChanges.climate}</p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#fde047] block">
                        Planetary Energy & Consumption
                      </span>
                      <p className="text-[#efe6d6] leading-relaxed">{selectedNode.earthChanges.energy}</p>
                    </div>
                  </div>
                )}

                {/* 2. SPACE OUTCOMES */}
                {activeTab === 'space' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6fb0b2] block">
                        Exoplanet Discovery & Astrophysical Horizons
                      </span>
                      <p className="text-[#cfe8e8] leading-relaxed">{selectedNode.spaceOutcomes.exoplanets}</p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8913a] block">
                        Rocketry, Propulsion & Megastructure Fleet
                      </span>
                      <p className="text-[#efe6d6] leading-relaxed">{selectedNode.spaceOutcomes.rockets}</p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#a855f7] block">
                        Interstellar Colonization & Orbital Habitats
                      </span>
                      <p className="text-[#efe6d6] leading-relaxed">{selectedNode.spaceOutcomes.colonization}</p>
                    </div>
                  </div>
                )}

                {/* 3. GOVERNING PHYSICAL EQUATIONS, CHEMICAL REACTIONS & BIOLOGICAL EVOLUTION */}
                {activeTab === 'physics' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    {/* A. Governing Physical Equations */}
                    <div className="p-3.5 rounded-[10px] bg-gradient-to-r from-[#18110b] to-[#120d09] border border-[rgba(232,145,58,0.3)] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#fde047] flex items-center gap-1.5">
                          <Atom className="w-3.5 h-3.5 text-[#fde047]" />
                          Governing Physical Equations
                        </span>
                        <span className="text-[9px] font-mono text-[#b5a990]">KaTeX Math & Metric Tensors</span>
                      </div>
                      
                      <div className="space-y-2">
                        {selectedNode.scienceDetails.physicsEquations.map((rawEq, idx) => {
                          const formatted = formatMathEquation(rawEq);
                          return (
                            <div 
                              key={idx} 
                              className="p-2.5 rounded-[6px] bg-black/80 border border-white/10 hover:border-[#e8913a]/50 transition-colors flex items-center justify-between group"
                            >
                              <div className="text-xs text-[#a5f3fc] leading-relaxed overflow-x-auto pr-2">
                                <MathEquation equation={rawEq} />
                              </div>
                              <button
                                onClick={() => handleCopy(formatted)}
                                aria-label="Copy clean equation"
                                className="p-1 rounded text-[#b5a990] hover:text-[#fde047] hover:bg-white/10 opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                              >
                                {copiedEq === formatted ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* B. Chemical & Nuclear Reactions */}
                    {selectedNode.scienceDetails.chemistryReactions && selectedNode.scienceDetails.chemistryReactions.length > 0 && (
                      <div className="p-3.5 rounded-[10px] bg-gradient-to-r from-[#18110b] to-[#120d09] border border-[rgba(232,145,58,0.3)] space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-[#f87171]" />
                            Chemical & Nuclear Reactions
                          </span>
                          <span className="text-[9px] font-mono text-[#b5a990]">Nucleosynthesis & Smelting</span>
                        </div>

                        <div className="space-y-2">
                          {selectedNode.scienceDetails.chemistryReactions.map((rawRxn, idx) => {
                            const formatted = formatMathEquation(rawRxn);
                            return (
                              <div 
                                key={idx} 
                                className="p-2.5 rounded-[6px] bg-black/80 border border-white/10 flex items-center justify-between group"
                              >
                                <div className="text-xs text-[#fca5a5] leading-relaxed overflow-x-auto pr-2">
                                  <MathEquation equation={rawRxn} />
                                </div>
                                <button
                                  onClick={() => handleCopy(formatted)}
                                  className="p-1 rounded text-[#b5a990] hover:text-[#f87171] opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                                >
                                  {copiedEq === formatted ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* C. Biological & Evolutionary Progression */}
                    {selectedNode.scienceDetails.biologyEvolution && selectedNode.scienceDetails.biologyEvolution.length > 0 && (
                      <div className="p-3.5 rounded-[10px] bg-white/5 border border-white/5 space-y-2">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#86a86c] flex items-center gap-1.5">
                          <Dna className="w-3.5 h-3.5 text-[#86a86c]" />
                          Biological & Evolutionary Progression
                        </span>
                        <ul className="list-disc list-inside space-y-1.5 text-[#cfe0d8]">
                          {selectedNode.scienceDetails.biologyEvolution.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* D. Astrophysical Propulsion & Orbit Mechanics */}
                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8913a] block">
                        Astrophysical Propulsion & Orbit Mechanics
                      </span>
                      <p className="text-[#efe6d6] leading-relaxed">
                        Stationed in {selectedNode.specs.orbit}, generating {selectedNode.specs.power} via {selectedNode.specs.propulsion}.
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. CHEMICAL & NUCLEAR REACTIONS */}
                {activeTab === 'chemistry' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#18110b] to-[#120d09] border border-[rgba(232,145,58,0.3)] space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#f87171] flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#f87171]" />
                        Chemical & Nuclear Reactions
                      </span>

                      <div className="space-y-2">
                        {selectedNode.scienceDetails.chemistryReactions.map((rawRxn, idx) => {
                          const formatted = formatMathEquation(rawRxn);
                          return (
                            <div 
                              key={idx} 
                              className="p-2.5 rounded-[6px] bg-black/80 border border-white/10 flex items-center justify-between group"
                            >
                              <div className="text-xs text-[#fca5a5] leading-relaxed overflow-x-auto pr-2">
                                <MathEquation equation={rawRxn} />
                              </div>
                              <button
                                onClick={() => handleCopy(formatted)}
                                className="p-1 rounded text-[#b5a990] hover:text-[#f87171] opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                              >
                                {copiedEq === formatted ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. BIOLOGICAL EVOLUTION */}
                {activeTab === 'biology' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86a86c] flex items-center gap-1.5">
                        <Dna className="w-3.5 h-3.5 text-[#86a86c]" />
                        Biological & Evolutionary Progression
                      </span>
                      <ul className="list-disc list-inside space-y-1.5 text-[#cfe0d8]">
                        {selectedNode.scienceDetails.biologyEvolution.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 6. SPACETIME TOPOLOGY (4D/5D/11D) */}
                {activeTab === 'dimensions' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#17121d] to-[#120d18] border border-[#a855f7]/40 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d8b4fe] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#a855f7]" />
                        {selectedNode.dimensionalTopology.dimensionsCount}D Manifold Geometry
                      </span>
                      <p className="text-white font-medium">{selectedNode.dimensionalTopology.description}</p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-black/80 border border-white/10 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#fde047] block">
                        Invariant Spacetime Metric Tensor $ds^2$
                      </span>
                      <div className="text-xs text-[#a5f3fc] overflow-x-auto p-2 rounded bg-black/90">
                        <MathEquation equation={selectedNode.dimensionalTopology.metricEquation} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. TRANSITION REQUIREMENTS */}
                {activeTab === 'requirements' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#fde047] block">
                        Energy Requirement Threshold
                      </span>
                      <p className="text-white font-mono">{selectedNode.transitionRequirements.energyThreshold}</p>
                    </div>

                    <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8913a] block">
                        Critical Technical Milestones
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-[#efe6d6]">
                        {selectedNode.transitionRequirements.milestones.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-[8px] bg-[#1a120c] border border-[rgba(232,145,58,0.25)] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6fb0b2] block">
                        Next Civilization Frontier
                      </span>
                      <p className="text-[#efe6d6]">{selectedNode.transitionRequirements.nextStage}</p>
                    </div>
                  </div>
                )}

                {/* 8. VEDIC PHILOSOPHY & BHAGAVAD GITA */}
                {activeTab === 'vedic' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="p-3.5 rounded-[10px] bg-gradient-to-b from-[#26170d] to-[#170e08] border border-[rgba(232,145,58,0.4)] shadow-lg space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-serif font-bold text-[#e8913a] uppercase tracking-wider border-b border-[rgba(232,145,58,0.2)] pb-1">
                        <span>{selectedNode.vedicPhilosophy.source}</span>
                        <span>॥ श्रीः ॥</span>
                      </div>
                      <p className="text-xs font-semibold text-[#fde047] text-center" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                        {selectedNode.vedicPhilosophy.verse}
                      </p>
                      <p className="text-[11px] text-[#efe6d6] italic text-center leading-relaxed">
                        &quot;{selectedNode.vedicPhilosophy.translation}&quot;
                      </p>
                      <div className="pt-2 border-t border-[rgba(232,145,58,0.18)]">
                        <span className="text-[9.5px] uppercase font-bold text-[#e8913a] block mb-0.5">Cosmological Synthesis:</span>
                        <p className="text-[11px] text-[#cfe0d8] leading-relaxed">
                          {selectedNode.vedicPhilosophy.meaning}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
