'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Compass, Eye, ShieldCheck, Zap, Maximize2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Chapter {
  id: string;
  stage: string;
  title: string;
  sanskritTitle?: string;
  timeframe: string;
  narration: string;
  energyScale?: string;
  philosophicalNote: string;
  color: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'gateway',
    stage: 'Scene 01',
    title: 'The Cosmic Gateway & Brahmā’s Dawn',
    sanskritTitle: 'ब्रह्म सृष्टि, हिरण्यगर्भ एवं कालचक्र',
    timeframe: '1.9729 Billion Years Ago',
    narration: 'From the unmanifest Brahman arises the golden egg of creation (Hiraṇyagarbha). Brahmā’s 51st cosmic year dawns—the Śveta-Vārāha Kalpa begins, commencing a 4.32-billion-year daytime cycle.',
    philosophicalNote: 'Time is cyclical and non-linear. Every cosmic morning unfolds the sacred potential of conscious existence.',
    color: '#e8913a',
  },
  {
    id: 'civilization',
    stage: 'Scene 02',
    title: 'The Sacred Rivers & The Golden Ages',
    sanskritTitle: 'सिन्धु-सरस्वती, उपनिषद् एवं ज्ञान परम्परा',
    timeframe: '7000 BCE – 1500 CE',
    narration: 'From the banks of the sacred Sarasvati to Harappan brick grid-cities, Vedic seers chant the Nasadiya Sukta. Aryabhata computes the Earth’s axial rotation; Brahmagupta establishes Zero and Universal Gravity.',
    philosophicalNote: 'Inner contemplative wisdom (Atman is Brahman) developed hand-in-hand with mathematics, linguistics, and astronomy.',
    color: '#6fb0b2',
  },
  {
    id: 'present',
    stage: 'Scene 03',
    title: 'The Anthropocene Threshold (Today)',
    sanskritTitle: 'वर्तमान युग: कार्दाशेव ०.७३',
    timeframe: '2026 CE (Present Day)',
    narration: 'Humanity reaches planetary AI integration, lunar South Pole touch-downs, and quantum computing. Consuming 2 × 10¹³ Watts, civilization stands on the brink of escaping its planetary cradle.',
    energyScale: '2.0 × 10¹³ W (Type 0.73)',
    philosophicalNote: 'The pivot moment where ancient archaeological history meets prospective astrophysical destiny.',
    color: '#f2c47a',
  },
  {
    id: 'type1',
    stage: 'Scene 04',
    title: 'Kardashev Type I: Planetary Mastery',
    sanskritTitle: 'कार्दाशेव स्तर १: भूमण्डलीय ऊर्जा जालक',
    timeframe: '~2200 CE',
    narration: 'Humanity harnesses the complete energetic budget of Earth (10¹⁶ Watts). Orbital ring elevators, weather regulation, and geothermal/fusion arrays turn the planet into a unified homeostatic superorganism.',
    energyScale: '1.0 × 10¹⁶ W (Type 1.0)',
    philosophicalNote: 'Complete ecological stewardship replaces exploitative consumption; Prithvi is respected as a living mother.',
    color: '#86a86c',
  },
  {
    id: 'type2',
    stage: 'Scene 05',
    title: 'Kardashev Type II: Sol Dyson Swarm',
    sanskritTitle: 'कार्दाशेव स्तर २: सौर्य डायसन झुण्ड',
    timeframe: '~2800 CE',
    narration: 'A million thin-film collector satellites enclose the Sun in Keplerian orbits. Intercepting Sol’s full luminosity (3.83 × 10²⁶ W), stellar lifting fuels interstellar travel and Matrioshka megacomputers.',
    energyScale: '3.828 × 10²⁶ W (Type 2.0)',
    philosophicalNote: 'The Sun (Surya) becomes the physical and technological dynamo of post-planetary civilization.',
    color: '#e8913a',
  },
  {
    id: 'type3',
    stage: 'Scene 06',
    title: 'Kardashev Type III: The Galactic Web',
    sanskritTitle: 'कार्दाशेव स्तर ३: आकाशगङ्गा साम्राज्य',
    timeframe: '~100,000 CE',
    narration: 'Civilization spans 400 billion star systems across the Milky Way. Power is harvested from supermassive black holes via Penrose processes, linked by relativistic gravitational wave beacons.',
    energyScale: '1.0 × 10³⁶ W (Type 3.0)',
    philosophicalNote: 'A single species blossoms into billions of distinct planetary cultures, united by universal digital akashic archives.',
    color: '#80B9E8',
  },
  {
    id: 'type9',
    stage: 'Scene 07',
    title: 'The Final Observer (Type IX Intelligence)',
    sanskritTitle: 'अन्तिम द्रष्टा: सर्वज्ञ चेतना',
    timeframe: '~10¹⁰⁰ CE (Thermodynamic Horizon)',
    narration: 'After all stellar fuels burn low and black holes evaporate, the ultimate intelligence operates at the Bekenstein bound. Simulating every particle, memory, and love that ever occurred, it realizes universal omniscience.',
    energyScale: 'Informational Omniscience',
    philosophicalNote: 'The scientific Final Observer converges with Sakshi Chaitanya—the unattached eternal witness of all realities.',
    color: '#9d93c9',
  },
  {
    id: 'return',
    stage: 'Scene 08',
    title: 'Mahāpralaya: Return to Viṣṇu in Yoganidrā',
    sanskritTitle: 'महाप्रलय: अनन्तशेष एवं योगनिद्रा',
    timeframe: 'Cyclic Cosmic Renewal',
    narration: 'Entropy dissolves the manifest universe into the primordial causal waters (Kāraṇa Samudra). Sri Vishnu rests upon the coils of the thousand-headed serpent Ananta Shesha in Yoganidra. The breath exhales, and a new Kalpa dawns.',
    philosophicalNote: 'The eternal ouroboros of Vedic cosmology: Creation, Preservation, Dissolution, and Re-manifestation.',
    color: '#e8913a',
  },
];

export function CosmicVoyage3D({ isLightMode }: { isLightMode: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneGroupsRef = useRef<THREE.Group[]>([]);
  const eggAuraRef = useRef<THREE.Mesh | null>(null);
  const pranaParticlesRef = useRef<THREE.Points | null>(null);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [webglError, setWebglError] = useState<boolean>(false);

  const currentIdxRef = useRef<number>(currentIdx);
  currentIdxRef.current = currentIdx;

  const chapter = CHAPTERS[currentIdx];

  // -------------------------------------------------------------
  // 1. ONE-TIME WebGL ENGINE INITIALIZATION WITH FULL LIGHTING
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (window.innerHeight - 114);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isLightMode ? 0x0a0f16 : 0x05070a);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 20, 55);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed in CosmicVoyage3D:", e);
      setWebglError(true);
      return;
    }

    // OrbitControls
    let controls: OrbitControls | null = null;
    try {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = 10;
      controls.maxDistance = 350;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.75;
      controlsRef.current = controls;
    } catch (e) {
      console.warn("OrbitControls failed:", e);
    }

    // --- PROPER THREE-POINT DYNAMIC LIGHTING ---
    // 1. Ambient Light (Cool Cosmic Fill)
    const ambientLight = new THREE.AmbientLight(0x2a384c, 1.2);
    scene.add(ambientLight);

    // 2. Key Light (Warm Golden Sun)
    const keyLight = new THREE.DirectionalLight(0xfff0cc, 3.2);
    keyLight.position.set(50, 70, 60);
    scene.add(keyLight);

    // 3. Rim/Back Light (Cyan/Vedic Accent)
    const rimLight = new THREE.DirectionalLight(0x6fb0b2, 2.0);
    rimLight.position.set(-60, -30, -50);
    scene.add(rimLight);

    // 4. Center Radiant Glow Point
    const centerPoint = new THREE.PointLight(0xffb74d, 3.5, 120);
    centerPoint.position.set(0, 0, 0);
    scene.add(centerPoint);

    // --- BACKGROUND COSMIC STARFIELD ---
    const starCount = 4000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 800;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 800;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 800;

      const r = Math.random();
      if (r < 0.4) {
        starCols[i * 3] = 0.95; starCols[i * 3 + 1] = 0.75; starCols[i * 3 + 2] = 0.35; // Golden
      } else if (r < 0.7) {
        starCols[i * 3] = 0.45; starCols[i * 3 + 1] = 0.75; starCols[i * 3 + 2] = 0.95; // Cyan
      } else {
        starCols[i * 3] = 0.85; starCols[i * 3 + 1] = 0.55; starCols[i * 3 + 2] = 0.95; // Violet
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.9, vertexColors: true, transparent: true, opacity: 0.75 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // =============================================================
    // 8 RICH, BEAUTIFULLY SHADED SCENE GROUPS
    // =============================================================
    const sceneGroups: THREE.Group[] = [];

    // -------------------------------------------------------------
    // SCENE 01: HIRANYAGARBHA (GOLDEN COSMIC EGG OF CREATION)
    // -------------------------------------------------------------
    const g0 = new THREE.Group();

    // 1. Shimmering Golden Egg Core with Deep Radiant Emissive Glow
    const eggGeo = new THREE.SphereGeometry(9, 64, 64);
    eggGeo.scale(1, 1.35, 1);
    const eggMat = new THREE.MeshStandardMaterial({
      color: 0xffd54f,
      roughness: 0.25,
      metalness: 0.15,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.35
    });
    const eggMesh = new THREE.Mesh(eggGeo, eggMat);
    g0.add(eggMesh);

    // 1b. Internal Sacred Core Point Light
    const eggCoreLight = new THREE.PointLight(0xffe082, 4.0, 50);
    g0.add(eggCoreLight);

    // 2. Radiant Pranic Aura Shell (Ethereal Golden Halo)
    const auraGeo = new THREE.SphereGeometry(9.8, 48, 48);
    auraGeo.scale(1, 1.35, 1);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xfff59d,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    g0.add(auraMesh);
    eggAuraRef.current = auraMesh;

    // 2b. Outer Sacred Filigree Mesh
    const filigreeGeo = new THREE.SphereGeometry(10.2, 32, 32);
    filigreeGeo.scale(1, 1.35, 1);
    const filigreeMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const filigree = new THREE.Mesh(filigreeGeo, filigreeMat);
    g0.add(filigree);

    // 3. Swirling Prāṇa Sparks (Ascending Fibonacci Vortex)
    const pranaCount = 1200;
    const pranaGeo = new THREE.BufferGeometry();
    const pranaPos = new Float32Array(pranaCount * 3);
    for (let i = 0; i < pranaCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const h = (Math.random() - 0.5) * 36;
      const radius = 10 + Math.random() * 10 + Math.cos(h * 0.15) * 4;
      pranaPos[i * 3] = radius * Math.cos(theta);
      pranaPos[i * 3 + 1] = h;
      pranaPos[i * 3 + 2] = radius * Math.sin(theta);
    }
    pranaGeo.setAttribute('position', new THREE.BufferAttribute(pranaPos, 3));
    const pranaMat = new THREE.PointsMaterial({ color: 0xfff59d, size: 0.85, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    const pranaPoints = new THREE.Points(pranaGeo, pranaMat);
    g0.add(pranaPoints);
    pranaParticlesRef.current = pranaPoints;

    // 4. Concentric Sacred Geometry Rings (Luminous Golden Glyphs)
    [13, 19, 26].forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.35, r + 0.35, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0xf59e0b : 0xfde047,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + idx * 0.35;
      ring.rotation.y = idx * 0.2;
      g0.add(ring);
    });

    sceneGroups.push(g0);

    // -------------------------------------------------------------
    // SCENE 02: SACRED RIVERS & ANCIENT EARTH (INDUS-SARASVATI)
    // -------------------------------------------------------------
    const g1 = new THREE.Group();
    const earthGeo1 = new THREE.SphereGeometry(8.5, 64, 64);
    const earthMat1 = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.35,
      metalness: 0.15,
      emissive: 0x0f172a,
      emissiveIntensity: 0.2
    });
    g1.add(new THREE.Mesh(earthGeo1, earthMat1));

    // Atmosphere Glow
    const atmoGeo = new THREE.SphereGeometry(9.2, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide
    });
    g1.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Luminous Sarasvati & Sindhu River Ribbons
    [8.65, 8.75].forEach((r, idx) => {
      const riverGeo = new THREE.TorusGeometry(r, 0.12, 16, 120);
      const riverMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x2dd4bf : 0x67e8f9,
        transparent: true,
        opacity: 0.85
      });
      const riverMesh = new THREE.Mesh(riverGeo, riverMat);
      riverMesh.rotation.x = Math.PI / 2.3 + idx * 0.3;
      riverMesh.rotation.y = Math.PI / 6;
      g1.add(riverMesh);
    });

    // Harappan Civilizational Beacon Nodes
    const beaconCount = 30;
    const beaconGeo = new THREE.BufferGeometry();
    const beaconPos = new Float32Array(beaconCount * 3);
    for (let i = 0; i < beaconCount; i++) {
      const theta = 0.3 + (Math.random() - 0.5) * 0.7;
      const phi = 1.2 + (Math.random() - 0.5) * 0.6;
      const r = 8.7;
      beaconPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      beaconPos[i * 3 + 1] = r * Math.cos(phi);
      beaconPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    beaconGeo.setAttribute('position', new THREE.BufferAttribute(beaconPos, 3));
    g1.add(new THREE.Points(beaconGeo, new THREE.PointsMaterial({ color: 0xfde047, size: 0.8 })));

    sceneGroups.push(g1);

    // -------------------------------------------------------------
    // SCENE 03: ANTHROPOCENE MODERN EARTH (2026 CE)
    // -------------------------------------------------------------
    const g2 = new THREE.Group();
    const earthGeo2 = new THREE.SphereGeometry(8.5, 64, 64);
    const earthMat2 = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.3,
      metalness: 0.2
    });
    g2.add(new THREE.Mesh(earthGeo2, earthMat2));

    // Global Megaconstellation Satellites
    const satCount = 600;
    const satGeo = new THREE.BufferGeometry();
    const satPos = new Float32Array(satCount * 3);
    for (let i = 0; i < satCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      const r = 10.2 + Math.random() * 2.2;
      satPos[i * 3] = r * Math.cos(b) * Math.cos(a);
      satPos[i * 3 + 1] = r * Math.sin(b);
      satPos[i * 3 + 2] = r * Math.cos(b) * Math.sin(a);
    }
    satGeo.setAttribute('position', new THREE.BufferAttribute(satPos, 3));
    g2.add(new THREE.Points(satGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })));

    sceneGroups.push(g2);

    // -------------------------------------------------------------
    // SCENE 04: KARDASHEV TYPE I: PLANETARY MASTERY (EARTH, MOON & MARS)
    // -------------------------------------------------------------
    const g3 = new THREE.Group();
    // 1. Terraformed Earth with Atmospheric Glow
    const earth1Mesh = new THREE.Mesh(earthGeo2, earthMat2);
    g3.add(earth1Mesh);

    // 2. Orbital Climate Regulation Rings & Elevators
    [11.5, 14.5, 17.5].forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.25, r + 0.25, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0x86a86c : 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + idx * 0.4;
      g3.add(ring);
    });

    // 3. Colonized Moon in Orbit
    const moonGeo4 = new THREE.SphereGeometry(2.0, 24, 24);
    const moonMat4 = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.8 });
    const moonMesh4 = new THREE.Mesh(moonGeo4, moonMat4);
    moonMesh4.position.set(22, 4, -8);
    g3.add(moonMesh4);

    // 4. Colonized & Terraformed Mars
    const marsGeo4 = new THREE.SphereGeometry(3.5, 32, 32);
    const marsMat4 = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.6 });
    const marsMesh4 = new THREE.Mesh(marsGeo4, marsMat4);
    marsMesh4.position.set(-38, 6, 25);
    g3.add(marsMesh4);

    // Mars Atmospheric Terraforming Shell
    const marsAtmoGeo = new THREE.SphereGeometry(3.8, 32, 32);
    const marsAtmoMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending });
    const marsAtmo = new THREE.Mesh(marsAtmoGeo, marsAtmoMat);
    marsMesh4.add(marsAtmo);

    // 5. Interplanetary Transit Energy Highway (Earth <-> Mars)
    const transitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-18, 12, 10),
      new THREE.Vector3(-38, 6, 25)
    ]);
    const transitPoints = transitCurve.getPoints(50);
    const transitGeo = new THREE.BufferGeometry().setFromPoints(transitPoints);
    const transitMat = new THREE.LineDashedMaterial({ color: 0x67e8f9, dashSize: 1.5, gapSize: 1, transparent: true, opacity: 0.85 });
    const transitLine = new THREE.Line(transitGeo, transitMat);
    transitLine.computeLineDistances();
    g3.add(transitLine);

    sceneGroups.push(g3);

    // -------------------------------------------------------------
    // SCENE 05: KARDASHEV TYPE II: SOL DYSON SWARM & STELLAR THRUSTERS
    // -------------------------------------------------------------
    const g4 = new THREE.Group();
    // 1. Central Luminous Sun with Emissive Photosphere
    const solGeo = new THREE.SphereGeometry(8.5, 64, 64);
    const solMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.6,
      roughness: 0.1
    });
    g4.add(new THREE.Mesh(solGeo, solMat));

    // Internal Point Light
    const solLight = new THREE.PointLight(0xffedd5, 3.5, 80);
    g4.add(solLight);

    // 2. Coronal Flare Halo
    const coronaGeo = new THREE.SphereGeometry(11.0, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    g4.add(new THREE.Mesh(coronaGeo, coronaMat));

    // 3. Shkadov Stellar Thruster Parabolic Reflector on North Pole
    const thrusterGeo = new THREE.CylinderGeometry(14, 1, 6, 32, 1, true);
    const thrusterMat = new THREE.MeshStandardMaterial({
      color: 0xe8913a,
      metalness: 0.95,
      roughness: 0.1,
      side: THREE.DoubleSide
    });
    const thruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    thruster.position.set(0, 10, 0);
    thruster.rotation.x = Math.PI;
    g4.add(thruster);

    // 4. Dense Dyson Collector Swarm Cloud
    const swarmCount = 3500;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(swarmCount * 3);
    for (let i = 0; i < swarmCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * Math.PI * 0.75;
      const r = 13 + Math.random() * 18;
      swarmPos[i * 3] = r * Math.cos(a);
      swarmPos[i * 3 + 1] = r * Math.sin(tilt) * Math.sin(a);
      swarmPos[i * 3 + 2] = r * Math.sin(a);
    }
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPos, 3));
    g4.add(new THREE.Points(swarmGeo, new THREE.PointsMaterial({ color: 0xfde047, size: 0.85, blending: THREE.AdditiveBlending })));

    // 5. Microwave Power Beams to Distant Habitats
    [-35, 38].forEach((targetX, idx) => {
      const beamGeo = new THREE.CylinderGeometry(0.12, 0.25, 42, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x38bdf8 : 0xfde047,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(targetX * 0.5, 0, (idx === 0 ? -15 : 15));
      beam.rotation.z = Math.PI / 2.3 * (idx === 0 ? 1 : -1);
      g4.add(beam);
    });

    sceneGroups.push(g4);

    // -------------------------------------------------------------
    // SCENE 06: KARDASHEV TYPE III: MILKY WAY GALAXY
    // -------------------------------------------------------------
    const g5 = new THREE.Group();
    const galCount = 4500;
    const galGeo = new THREE.BufferGeometry();
    const galPos = new Float32Array(galCount * 3);
    const galCol = new Float32Array(galCount * 3);
    for (let i = 0; i < galCount; i++) {
      const r = Math.pow(Math.random(), 2) * 45 + 2;
      const armAngle = (i % 2) * Math.PI;
      const angle = armAngle + r * 0.2 + (Math.random() - 0.5) * 0.4;
      galPos[i * 3] = r * Math.cos(angle);
      galPos[i * 3 + 1] = (Math.random() - 0.5) * (10 / (r * 0.2 + 1));
      galPos[i * 3 + 2] = r * Math.sin(angle);

      if (r < 8) {
        galCol[i * 3] = 1; galCol[i * 3 + 1] = 0.85; galCol[i * 3 + 2] = 0.4;
      } else {
        galCol[i * 3] = 0.5; galCol[i * 3 + 1] = 0.75; galCol[i * 3 + 2] = 0.95;
      }
    }
    galGeo.setAttribute('position', new THREE.BufferAttribute(galPos, 3));
    galGeo.setAttribute('color', new THREE.BufferAttribute(galCol, 3));
    g5.add(new THREE.Points(galGeo, new THREE.PointsMaterial({ size: 0.75, vertexColors: true, transparent: true, opacity: 0.85 })));

    // Black Hole Core & Accretion Disk
    const bhCore = new THREE.Mesh(new THREE.SphereGeometry(2.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    g5.add(bhCore);
    const bhDisk = new THREE.Mesh(new THREE.RingGeometry(2.8, 6.5, 48), new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide }));
    bhDisk.rotation.x = Math.PI / 2;
    g5.add(bhDisk);
    sceneGroups.push(g5);

    // -------------------------------------------------------------
    // SCENE 07: KARDASHEV TYPE IX: THE FINAL OBSERVER MANDALA
    // -------------------------------------------------------------
    const g6 = new THREE.Group();
    [10, 16, 22, 28].forEach((radius, idx) => {
      const rGeo = new THREE.RingGeometry(radius - 0.25, radius + 0.25, 72);
      const rMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0xf59e0b : 0xa855f7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 3;
      ring.rotation.y = idx * 0.35;
      g6.add(ring);
    });
    const eyeCore = new THREE.Mesh(
      new THREE.SphereGeometry(4.5, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xfde047,
        emissiveIntensity: 0.8,
        wireframe: true
      })
    );
    g6.add(eyeCore);
    sceneGroups.push(g6);

    // -------------------------------------------------------------
    // SCENE 08: MAHĀPRALAYA & RETURN TO VIṢṆU IN YOGANIDRĀ
    // -------------------------------------------------------------
    const g7 = new THREE.Group();
    for (let s = 0; s < 7; s++) {
      const sheshaRingGeo = new THREE.TorusGeometry(8 + s * 2.4, 0.45, 16, 100);
      const sheshaRingMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.2,
        metalness: 0.9,
        emissive: 0xb45309,
        emissiveIntensity: 0.3
      });
      const sRing = new THREE.Mesh(sheshaRingGeo, sheshaRingMat);
      sRing.rotation.x = Math.PI / 2.5;
      sRing.rotation.z = s * 0.25;
      g7.add(sRing);
    }
    const oceanGeo = new THREE.SphereGeometry(6, 32, 32);
    const oceanMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, wireframe: true, transparent: true, opacity: 0.55 });
    g7.add(new THREE.Mesh(oceanGeo, oceanMat));
    sceneGroups.push(g7);

    // Add all groups to scene and set initial visibility
    sceneGroups.forEach((g, idx) => {
      g.visible = idx === 0;
      scene.add(g);
    });
    sceneGroupsRef.current = sceneGroups;

    // --- 60 FPS CONTINUOUS ANIMATION LOOP ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (controls) controls.update();
      stars.rotation.y += 0.0003;

      const activeIdx = currentIdxRef.current;
      const activeGroup = sceneGroups[activeIdx];

      if (activeGroup && activeGroup.visible) {
        activeGroup.rotation.y += 0.003;
      }

      // Special Scene 01 Aura Pulsing
      if (activeIdx === 0 && eggAuraRef.current) {
        const s = 1 + Math.sin(time * 2.0) * 0.035;
        eggAuraRef.current.scale.set(s, s * 1.35, s);

        if (pranaParticlesRef.current) {
          pranaParticlesRef.current.rotation.y += 0.005;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || (window.innerHeight - 114);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer?.domElement?.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) {
        try { renderer.dispose(); } catch {}
      }
    };
  }, [isLightMode]); // Initialized once!

  // -------------------------------------------------------------
  // 2. SMOOTH SCENE SWITCHING (TOGGLE GROUP VISIBILITY ONLY)
  // -------------------------------------------------------------
  useEffect(() => {
    const sceneGroups = sceneGroupsRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!sceneGroups.length || !camera || !controls) return;

    sceneGroups.forEach((g, idx) => {
      g.visible = idx === currentIdx;
    });

    if (currentIdx === 0) camera.position.set(0, 20, 55);
    else if (currentIdx === 1) camera.position.set(0, 16, 45);
    else if (currentIdx === 2) camera.position.set(0, 16, 45);
    else if (currentIdx === 3) camera.position.set(0, 22, 55);
    else if (currentIdx === 4) camera.position.set(0, 35, 75);
    else if (currentIdx === 5) camera.position.set(0, 45, 95);
    else if (currentIdx === 6) camera.position.set(0, 30, 65);
    else if (currentIdx === 7) camera.position.set(0, 28, 60);

    controls.target.set(0, 0, 0);
    controls.update();
  }, [currentIdx]);

  // Autoplay progression timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CHAPTERS.length);
    }, 11000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-[calc(100vh-114px)] overflow-hidden select-none bg-[#05070a]">
      {/* 3D WebGL Canvas Mount - explicitly touch-none and interactive */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none" 
      />

      {/* Floating Cinematic Narrative Card (Positioned comfortably top-left in Traditional Indian Temple Style) */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 max-w-lg p-6 rounded-[14px] bg-gradient-to-b from-[#1c140d]/95 via-[#130d08]/95 to-[#0b0805]/95 backdrop-blur-xl border border-[rgba(212,175,55,0.35)] shadow-[0_8px_32px_rgba(0,0,0,0.8)] text-[#efe6d6] space-y-3.5 pointer-events-auto">
        <span className="absolute top-2 left-2 text-[9px] text-[#d4af37] opacity-60">❖</span>
        <span className="absolute top-2 right-2 text-[9px] text-[#d4af37] opacity-60">❖</span>

        {/* Scene Indicator & Timeframe */}
        <div className="flex items-center justify-between border-b border-[rgba(212,175,55,0.2)] pb-2.5">
          <div className="flex items-center gap-2">
            <span 
              className="px-2.5 py-0.5 rounded-[4px] text-[10px] font-serif font-extrabold uppercase tracking-wider text-[#08090D] shadow-sm"
              style={{ backgroundColor: chapter.color }}
            >
              {chapter.stage}
            </span>
            <span className="text-xs font-mono text-[#fde047] font-semibold">{chapter.timeframe}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="p-1.5 rounded-[6px] border border-[rgba(212,175,55,0.25)] hover:border-[#d4af37] text-[#d4af37] hover:text-[#ffffff] bg-[#16100a] transition-colors"
              title={isPlaying ? 'Pause Odyssey' : 'Resume Odyssey'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                soundManager.playTempleBell(272);
                setCurrentIdx(0);
              }}
              className="p-1.5 rounded-[6px] border border-[rgba(212,175,55,0.25)] hover:border-[#d4af37] text-[#d4af37] hover:text-[#ffffff] bg-[#16100a] transition-colors"
              title="Restart Odyssey from Scene 01"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sanskrit & Title */}
        <div>
          {chapter.sanskritTitle && (
            <p className="text-xs font-serif font-bold text-[#d4af37] mb-1" style={{ fontFamily: 'Noto Serif Devanagari, sans-serif' }}>
              {chapter.sanskritTitle}
            </p>
          )}
          <h2 className="text-2xl font-display text-[#efe6d6] leading-tight" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            {chapter.title}
          </h2>
        </div>

        {/* Narration */}
        <p className="text-xs md:text-sm text-[#e9dfcc] leading-relaxed font-serif">
          {chapter.narration}
        </p>

        {/* Energetics & Philosophy */}
        <div className="pt-2 border-t border-[rgba(212,175,55,0.2)] space-y-1 text-xs font-serif">
          {chapter.energyScale && (
            <div className="flex items-center gap-1.5 text-[#80B9E8]">
              <Zap className="w-3.5 h-3.5 text-[#6fb0b2]" />
              <span>ऊर्जा परिमाण Energy: <strong className="text-[#efe6d6]">{chapter.energyScale}</strong></span>
            </div>
          )}
          <div className="flex items-start gap-1.5 text-[#fde047]">
            <Sparkles className="w-3.5 h-3.5 text-[#e8913a] mt-0.5 shrink-0" />
            <span><strong className="text-[#efe6d6]">दार्शनिक समानान्तर Philosophy: </strong>{chapter.philosophicalNote}</span>
          </div>
        </div>

        {/* Bottom Scene Step Carousel Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(212,175,55,0.2)]">
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  soundManager.playTempleBell(220 + i * 20);
                  setCurrentIdx(i);
                }}
                className={`w-3 h-3 rounded-[3px] transition-all border ${
                  i === currentIdx ? 'bg-[#e8913a] border-[#fde047] scale-125 shadow-[0_0_8px_rgba(232,145,58,0.5)]' : 'bg-[#1b140d] border-[rgba(212,175,55,0.2)] hover:border-[#d4af37]'
                }`}
                title={`Jump to Scene 0${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playTempleBell(272);
                setCurrentIdx((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
              }}
              className="px-2 py-1 rounded-[6px] border border-[rgba(212,175,55,0.3)] bg-[#1a120b] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0a08] font-serif text-xs flex items-center gap-1 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>पूर्व Prev</span>
            </button>
            <span className="text-xs font-mono text-[#d4af37] font-bold px-1.5">{currentIdx + 1} / {CHAPTERS.length}</span>
            <button
              onClick={() => {
                soundManager.playTempleBell(320);
                setCurrentIdx((prev) => (prev + 1) % CHAPTERS.length);
              }}
              className="px-2 py-1 rounded-[6px] border border-[#fde047] bg-gradient-to-b from-[#e8913a] to-[#b8621b] text-[#0d0a08] font-serif font-bold text-xs flex items-center gap-1 shadow-md hover:brightness-110 transition-all"
            >
              <span>उत्तर Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Prompt for OrbitControls Navigation */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-10 pointer-events-none hidden sm:block">
        <p className="px-4 py-1.5 rounded-full bg-[#0d0a08cc] backdrop-blur-md border border-[rgba(232,214,180,0.12)] text-[11px] text-[#b5a990]">
          Drag to orbit • Scroll wheel or pinch to zoom • Controls auto-rotate continuously
        </p>
      </div>
    </div>
  );
}
