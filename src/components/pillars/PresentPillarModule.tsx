'use client';

import React, { useState } from 'react';
import { Radio, Satellite, Rocket, Calendar, Sparkles, Globe } from 'lucide-react';
import { TodayLivingTimeline } from '../today/TodayLivingTimeline';
import { SpaceMissionsModule } from '../modules/SpaceMissionsModule';
import { soundManager } from '../../utils/audio';

interface PresentPillarModuleProps {
  isLightMode?: boolean;
  onJumpToChakraEra: (eraId: string | number) => void;
}

export function PresentPillarModule({ isLightMode, onJumpToChakraEra }: PresentPillarModuleProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'missions'>('today');

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Pillar Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 text-[#fde047]" />
          <span>द्वितीय स्तम्भ • PILLAR 02: THE PRESENT (वर्तमान)</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          वर्तमान ब्रह्माण्ड • THE LIVING OBSERVATORY
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          What is happening in the universe right now? Real-time satellite propagation, overhead passes, active space missions, and historical connections to today.
        </p>
      </div>

      {/* Switcher Bar */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('today'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            जीवन्त कालक्रम • TODAY LIVING TIMELINE & SATELLITES
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('missions'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all ${
              activeTab === 'missions'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            अन्तरिक्ष अभियान • SPACE MISSIONS & LAUNCHES
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'today' ? (
        <TodayLivingTimeline
          onJumpToChakraEra={onJumpToChakraEra}
          isLightMode={Boolean(isLightMode)}
        />
      ) : (
        <SpaceMissionsModule
          isLightMode={Boolean(isLightMode)}
          onOpenSatelliteTracker={() => setActiveTab('today')}
        />
      )}
    </div>
  );
}
