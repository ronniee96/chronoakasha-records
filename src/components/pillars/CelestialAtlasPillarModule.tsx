'use client';

import React, { useState } from 'react';
import { Orbit, Sparkles, Compass, Globe2, Telescope } from 'lucide-react';
import { GrahaModule } from '../modules/GrahaModule';
import { NakshatraModule } from '../modules/NakshatraModule';
import { CosmosModule } from '../modules/CosmosModule';
import { JplHorizonsModal } from '../today/JplHorizonsModal';
import { soundManager } from '../../utils/audio';

interface CelestialAtlasPillarModuleProps {
  isLightMode?: boolean;
}

export function CelestialAtlasPillarModule({ isLightMode }: CelestialAtlasPillarModuleProps) {
  const [activeTab, setActiveTab] = useState<'graha' | 'nakshatra' | 'cosmos'>('graha');
  const [isHorizonsOpen, setIsHorizonsOpen] = useState<boolean>(false);

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Pillar Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Orbit className="w-3.5 h-3.5" />
          <span>चतुर्थ स्तम्भ • PILLAR 04: THE CELESTIAL ATLAS (ब्रह्माण्ड दर्शन)</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          खगोलीय मानचित्र • THE CELESTIAL ATLAS
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Where are the planets, stars and constellations? High-precision Keplerian ephemeris, Chitrapaksha Lahiri Ayanamsa, the 27 Nakshatras, and deep space cosmos.
        </p>
      </div>

      {/* Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl overflow-x-auto max-w-full">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('graha'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'graha'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            ग्रह मण्डल • PLANETARY EPHEMERIS & SOLAR SYSTEM
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('nakshatra'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'nakshatra'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            २७ नक्षत्र वेधशाला • 27 NAKSHATRAS & STARS
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('cosmos'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'cosmos'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            गभीर अन्तरिक्ष • DEEP COSMOS & 93B LY HORIZON
          </button>
        </div>

        {/* NASA JPL Horizons Live System Button */}
        <button
          onClick={() => { soundManager.bell(880, 0.2, 1.5); setIsHorizonsOpen(true); }}
          className="px-4 py-2 rounded-2xl bg-[#0284c7]/20 hover:bg-[#0284c7]/35 border border-[#38bdf8]/50 text-[#a5f3fc] text-xs md:text-sm font-mono font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] shrink-0"
          title="Open NASA JPL Horizons Live Ephemeris & 3D Vector System"
        >
          <Orbit className="w-4 h-4 text-[#38bdf8] animate-spin-slow" />
          <span>NASA JPL HORIZONS v1.3</span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'graha' && (
        <GrahaModule isLightMode={Boolean(isLightMode)} />
      )}

      {activeTab === 'nakshatra' && (
        <NakshatraModule isLightMode={Boolean(isLightMode)} />
      )}

      {activeTab === 'cosmos' && (
        <CosmosModule isLightMode={Boolean(isLightMode)} />
      )}

      {/* NASA JPL Horizons Live Ephemeris Modal */}
      <JplHorizonsModal
        isOpen={isHorizonsOpen}
        onClose={() => setIsHorizonsOpen(false)}
        isLightMode={Boolean(isLightMode)}
      />
    </div>
  );
}
