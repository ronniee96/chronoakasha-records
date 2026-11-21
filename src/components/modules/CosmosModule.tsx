'use client';

import React, { useState } from 'react';
import { Sparkles, Compass, Eye, Layers, Orbit, Globe2, Radio, Info } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface CosmosModuleProps {
  isLightMode?: boolean;
}

interface CosmicTier {
  id: string;
  name: string;
  sanskrit: string;
  scaleMeters: string;
  lightDistance: string;
  description: string;
  celestialObjects: string[];
  keyPhysics: string;
  vedicAnalogy: string;
}

const COSMIC_TIERS: CosmicTier[] = [
  {
    id: 'solar-system',
    name: 'Solar System & Heliosphere',
    sanskrit: 'सौर मण्डल एवं हेलियोस्फीयर',
    scaleMeters: '10¹³ — 10¹⁶ m',
    lightDistance: '0.0005 — 1.5 Light Years',
    description: 'The gravitational domain of the Sun, comprising eight major planets, asteroid belt, Kuiper belt, and the spherical Oort cloud extending out to ~100,000 AU.',
    celestialObjects: ['Sun', 'Earth-Moon', 'Jupiter', 'Voyager 1 Probe', 'Sedna', 'Oort Cloud'],
    keyPhysics: 'Solar wind dynamic pressure, Keplerian planetary orbits, heliopause magnetic boundary.',
    vedicAnalogy: 'Surya Mandala as the visual eye and life-giver of the cosmic Purusha (सविता वै देवानामधिपतिः).'
  },
  {
    id: 'interstellar',
    name: 'Interstellar Neighborhood',
    sanskrit: 'तारकीय पर्यावरण (समीपवर्ती नक्षत्र)',
    scaleMeters: '10¹⁶ — 10¹⁸ m',
    lightDistance: '4 — 100 Light Years',
    description: 'The local interstellar chimney in the Orion Arm containing Alpha Centauri, Sirius, Vega, and the nearest stellar systems.',
    celestialObjects: ['Proxima Centauri', 'Sirius (Mrigavyadha)', 'Vega (Abhijit)', 'Arcturus (Swati)', 'Betelgeuse (Ardra)'],
    keyPhysics: 'Stellar parallax measurements, thermonuclear hydrogen fusion, local interstellar bubble density.',
    vedicAnalogy: 'The 27 Nakshatras forming the celestial lunar zodiac and cosmic stellar matrix.'
  },
  {
    id: 'milky-way',
    name: 'Milky Way Galaxy',
    sanskrit: 'क्षीरमार्ग / मन्दाकिनी आकाशगंगा',
    scaleMeters: '10²¹ m',
    lightDistance: '100,000 Light Years',
    description: 'A barred spiral galaxy containing 100–400 billion stars. The solar system orbits the galactic center at ~220 km/s, completing one cosmic galactic year every ~230 million years.',
    celestialObjects: ['Sagittarius A* (Central Supermassive Black Hole)', 'Orion Spiral Arm', 'Crab Nebula', 'Carina Nebula'],
    keyPhysics: 'Differential galactic rotation, spiral density wave theory, dark matter halo gravitational well.',
    vedicAnalogy: 'The heavenly Akashganga descending through the matted locks of Lord Shiva to sustain cosmic balance.'
  },
  {
    id: 'local-group',
    name: 'Local Group & Andromeda',
    sanskrit: 'स्थानिक आकाशगंगा समूह',
    scaleMeters: '10²² — 10²³ m',
    lightDistance: '10 Million Light Years',
    description: 'A gravitationally bound cluster of more than 50 galaxies dominated by the Milky Way and Andromeda (M31), currently approaching each other at ~110 km/s.',
    celestialObjects: ['Andromeda Galaxy (M31)', 'Triangulum Galaxy (M33)', 'Large & Small Magellanic Clouds'],
    keyPhysics: 'Gravitational mutual capture, galactic cannibalism and collision dynamics across millions of years.',
    vedicAnalogy: 'The interconnected cluster of lokas moving in cosmic harmony under universal Rta.'
  },
  {
    id: 'laniakea',
    name: 'Laniakea Supercluster',
    sanskrit: 'लानियाकेया महापुंज (विशाल आकाशगंगा संजाल)',
    scaleMeters: '10²⁴ m',
    lightDistance: '520 Million Light Years',
    description: 'The immense basin of attraction containing over 100,000 galaxies flowing along cosmic filaments towards the Great Attractor.',
    celestialObjects: ['Virgo Cluster', 'Great Attractor', 'Hydra-Centaurus Supercluster', 'Shapley Supercluster'],
    keyPhysics: 'Cosmic velocity vector fields, gravitational potential contours, cosmic web filamentation.',
    vedicAnalogy: 'The infinite cosmic web described in the Atharvaveda: "The net of Indra extends through all directions of space."'
  },
  {
    id: 'observable-universe',
    name: 'Observable Universe & CMB Horizon',
    sanskrit: 'दृश्य ब्रह्माण्ड एवं विश्व-क्षितिज',
    scaleMeters: '8.8 × 10²⁶ m',
    lightDistance: '93 Billion Light Years (Co-moving Diameter)',
    description: 'The spherical volume of the universe observable from Earth, bounded by the surface of last scattering and Cosmic Microwave Background (2.725 K).',
    celestialObjects: ['Cosmic Microwave Background (CMB)', 'Hubble Ultra Deep Field', 'James Webb Deep Space Field', 'Dark Energy Horizon'],
    keyPhysics: 'Hubble-Lemaître cosmic expansion, cosmological redshift $z \\approx 1100$, accelerating dark energy ($H_0 \\approx 70$ km/s/Mpc).',
    vedicAnalogy: 'Brahma-Anda (ब्रह्माण्ड)—the cosmic egg continually expanding and dissolving through the inhalation and exhalation of Maha-Vishnu.'
  }
];

export function CosmosModule({ isLightMode }: CosmosModuleProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>('observable-universe');

  const activeTier: CosmicTier = COSMIC_TIERS.find(t => t.id === selectedTierId) || COSMIC_TIERS[5];

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>दृश्य ब्रह्माण्ड दर्शन • Scales of the Observable Universe</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          ब्रह्माण्ड दर्शन • THE COSMIC WEB ATLAS
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Journey from the solar heliosphere through stellar constellations and the Milky Way to the 93-billion-light-year Cosmic Microwave Background horizon.
        </p>
      </div>

      {/* Cosmic Scale Progression Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#b5a990] px-1">
          <span>Scale Progression: Planetary → Galactic → Cosmological</span>
          <span className="text-[#e8913a]">6 Cosmic Tiers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {COSMIC_TIERS.map((tier, idx) => {
            const isSelected = tier.id === activeTier.id;
            return (
              <button
                key={tier.id}
                onClick={() => { soundManager.playClick(); setSelectedTierId(tier.id); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#2a1a10] to-[#18110b] border-[#e8913a] shadow-lg shadow-[#e8913a]/20 scale-[1.02]'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-[10px] font-mono text-[#e8913a] block uppercase font-bold">
                  Tier 0{idx + 1}
                </span>
                <h4 className="text-xs font-serif font-bold text-[#efe6d6] truncate mt-0.5">
                  {tier.name.split('&')[0]}
                </h4>
                <span className="text-[10px] font-mono text-[#b5a990] block truncate mt-1">
                  {tier.lightDistance}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* In-depth Tier Dossier */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] via-[#140e08] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
              {activeTier.sanskrit}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#fde047]">
              {activeTier.name}
            </h2>
          </div>
          <div className="text-right p-3 rounded-xl bg-black/50 border border-white/10">
            <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Metric Scale</span>
            <span className="text-sm font-mono font-bold text-[#e8913a]">
              {activeTier.scaleMeters}
            </span>
            <span className="text-[11px] font-mono text-[#b5a990] block mt-0.5">
              ~{activeTier.lightDistance}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-sm md:text-base text-[#efe6d6] font-serif leading-relaxed">
          {activeTier.description}
        </p>

        {/* Grid: Exemplary Objects, Key Physics & Vedic Resonance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif">
          {/* Objects */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#e8913a] flex items-center gap-1.5 font-bold">
              <Compass className="w-3.5 h-3.5" />
              Benchmark Celestial Objects
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeTier.celestialObjects.map((obj, i) => (
                <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-[#efe6d6]">
                  {obj}
                </span>
              ))}
            </div>
          </div>

          {/* Physics */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#527FAE] flex items-center gap-1.5 font-bold">
              <Radio className="w-3.5 h-3.5" />
              Astrophysics & Dynamics
            </span>
            <p className="text-xs text-[#efe6d6] leading-relaxed">
              {activeTier.keyPhysics}
            </p>
          </div>

          {/* Vedic Cosmology Analogy */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#22150c] to-[#160e08] border border-[rgba(232,145,58,0.3)] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#fde047] flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#e8913a]" />
              Vedic & Philosophical Analogy
            </span>
            <p className="text-xs text-[#efe6d6] leading-relaxed italic">
              {activeTier.vedicAnalogy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
