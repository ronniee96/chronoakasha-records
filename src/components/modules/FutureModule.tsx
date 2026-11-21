'use client';

import React, { useState } from 'react';
import { Rocket, Zap, Shield, Globe2, AlertOctagon, TrendingUp, Cpu, Compass, Sparkles } from 'lucide-react';
import { KARDASHEV_SCALE, FUTURE_SCENARIOS, KardashevType, ScenarioHorizon } from '../../data/futureCivilizationsData';
import { soundManager } from '../../utils/audio';

interface FutureModuleProps {
  isLightMode?: boolean;
}

export function FutureModule({ isLightMode }: FutureModuleProps) {
  const [activeTab, setActiveTab] = useState<'kardashev' | 'scenarios'>('kardashev');
  const [selectedKardashevType, setSelectedKardashevType] = useState<string>('Type I');
  const [selectedHorizonYear, setSelectedHorizonYear] = useState<number>(2050);

  const activeKType: KardashevType = KARDASHEV_SCALE.find(k => k.type === selectedKardashevType) || KARDASHEV_SCALE[0];
  const activeHorizon: ScenarioHorizon = FUTURE_SCENARIOS.find((h: ScenarioHorizon) => h.yearCE === selectedHorizonYear) || FUTURE_SCENARIOS[0];

  const getRiskBadge = (level: ScenarioHorizon['existentialRiskLevel']) => {
    switch (level) {
      case 'Critical':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'Elevated':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Low':
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Rocket className="w-3.5 h-3.5" />
          <span>अनागत कालचक्र • Kardashev Energetics & Scenario Horizons</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          भविष्य सभ्यता दर्शन • CIVILIZATIONS OF TOMORROW
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Quantitative astrophysics and scenario modeling from the immediate 2030 horizon to 100,000 CE, mapping planetary colonization, Dyson megastructures, and cosmic consciousness.
        </p>
      </div>

      {/* Primary Switcher: Kardashev Scale vs. Scenario Horizons */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('kardashev'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all ${
              activeTab === 'kardashev'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            कार्दाशेव सोपान • KARDASHEV SCALE (TYPE 0 – III & IX)
          </button>
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
        </div>
      </div>

      {/* TAB 1: KARDASHEV SCALE VIEW */}
      {activeTab === 'kardashev' && (
        <div className="space-y-6">
          {/* Kardashev Types Selector Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {KARDASHEV_SCALE.map(k => {
              const isSelected = k.type === activeKType.type;
              return (
                <button
                  key={k.type}
                  onClick={() => { soundManager.playClick(); setSelectedKardashevType(k.type); }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#2a1a10] to-[#18110b] border-[#e8913a] shadow-lg shadow-[#e8913a]/15 scale-[1.02]'
                      : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60'
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#e8913a] block uppercase font-bold">
                    {k.type}
                  </span>
                  <h3 className="text-sm md:text-base font-serif font-bold text-[#efe6d6] truncate">
                    {k.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#b5a990] block truncate mt-1">
                    {k.sanskrit}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Kardashev Analysis Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] via-[#140e08] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
                  {activeKType.sanskrit}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#fde047]">
                  {activeKType.name}
                </h2>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-right">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Power Consumption Metric</span>
                <span className="text-xs md:text-sm font-mono font-bold text-[#fde047]">
                  {activeKType.powerWatts}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#527FAE] flex items-center gap-1.5 font-bold">
                  <Zap className="w-3.5 h-3.5 text-[#fde047]" />
                  Energy Harnessing Infrastructure
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] leading-relaxed">
                  {activeKType.energyHarnessScale}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#e8913a] flex items-center gap-1.5 font-bold">
                  <Globe2 className="w-3.5 h-3.5" />
                  Astrophysical Detectability
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] leading-relaxed">
                  {activeKType.astrophysicalFootprint}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#C9A45C] flex items-center gap-1.5 font-bold">
                  <Rocket className="w-3.5 h-3.5" />
                  Propulsion & Space Travel
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] leading-relaxed">
                  {activeKType.propulsionMechanism}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] flex items-center gap-1.5 font-bold">
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  Sociology & Extinction Vulnerability
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] leading-relaxed">
                  {activeKType.limitationsAndPhysics}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCENARIOS HORIZON VIEW */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          {/* Horizon Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {FUTURE_SCENARIOS.map((h: ScenarioHorizon) => {
              const isSelected = h.yearCE === activeHorizon.yearCE;
              return (
                <button
                  key={h.yearCE}
                  onClick={() => { soundManager.playClick(); setSelectedHorizonYear(h.yearCE); }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#2a1a10] to-[#18110b] border-[#e8913a] shadow-lg shadow-[#e8913a]/20 scale-[1.02]'
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-sm font-mono font-bold text-[#fde047] block">
                    {h.yearCE} CE
                  </span>
                  <span className="text-[10px] font-mono text-[#b5a990] block truncate mt-0.5">
                    +{h.timeFromPresent}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Horizon Plaque */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] via-[#140e08] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
                  {activeHorizon.sanskritLabel}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#efe6d6]">
                  {activeHorizon.label} ({activeHorizon.yearCE} CE)
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getRiskBadge(activeHorizon.existentialRiskLevel)}`}>
                  Risk: {activeHorizon.existentialRiskLevel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                  Confidence: {activeHorizon.confidenceRating}%
                </span>
              </div>
            </div>

            {/* Technological Milestones & Space Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-[#e8913a] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Key Technological Transitions
                </span>
                <ul className="space-y-1 text-xs text-[#efe6d6] font-serif list-disc list-inside">
                  {activeHorizon.technologicalAdvancements.map((tech, idx) => (
                    <li key={idx} className="leading-relaxed">{tech}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-[#527FAE] flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5" />
                  Interplanetary & Off-World Status
                </span>
                <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                  {activeHorizon.spaceExplorationStatus}
                </p>
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Earth & Planetary Biosphere</span>
                  <p className="text-xs text-[#b5a990] font-serif mt-0.5">
                    {activeHorizon.environmentalAndEarthChanges}
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Way Scenario Matrix */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block">
                Branching Evolutionary Pathways
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
                    Optimistic Horizon
                  </span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                    {activeHorizon.scenarios.optimistic}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-yellow-500/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-yellow-400 block">
                    Baseline Trajectory
                  </span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                    {activeHorizon.scenarios.baseline}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-rose-500/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-400 block">
                    Pessimistic / Degenerative
                  </span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                    {activeHorizon.scenarios.pessimistic}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/20 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block">
                    High-Disruption Wildcard
                  </span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                    {activeHorizon.scenarios.disruptive}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
