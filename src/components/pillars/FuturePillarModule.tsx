'use client';

import React, { useState } from 'react';
import { Eye, Rocket, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
import { FutureModule } from '../modules/FutureModule';
import { ProphecyModule } from '../modules/ProphecyModule';
import { soundManager } from '../../utils/audio';

interface FuturePillarModuleProps {
  isLightMode?: boolean;
}

export function FuturePillarModule({ isLightMode }: FuturePillarModuleProps) {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'prophecy'>('scenarios');

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Pillar Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5 text-[#a78bfa]" />
          <span>पञ्चम स्तम्भ • PILLAR 05: THE FUTURE (भविष्य)</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          भविष्य दर्शन • FORECASTING & POSSIBILITIES
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          What might happen in the future? Quantitative technological horizons from 2030 to 100,000 CE, ecological transitions, and critical examination of historical prophecy traditions.
        </p>
      </div>

      {/* Switcher Bar */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scenarios'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all ${
              activeTab === 'scenarios'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            काल क्षितिज • SCENARIO HORIZONS (2030 – 100,000 CE)
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('prophecy'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all ${
              activeTab === 'prophecy'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            भविष्यवाणी अभिलेख • HISTORICAL PROPHECY ARCHIVE
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'scenarios' ? (
        <FutureModule isLightMode={isLightMode} />
      ) : (
        <ProphecyModule isLightMode={isLightMode} />
      )}
    </div>
  );
}
