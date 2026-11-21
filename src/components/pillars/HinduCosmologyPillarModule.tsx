'use client';

import React, { useState } from 'react';
import { Compass, BookOpen, Layers, Sparkles, Scale, Zap, Atom } from 'lucide-react';
import { KalachakraModule } from '../modules/KalachakraModule';
import { ScripturesModule } from '../modules/ScripturesModule';
import { soundManager } from '../../utils/audio';
import { usePresentationMode } from '../../context/PresentationModeContext';
import { PresentationMode } from '../../types/sixPillars';

interface HinduCosmologyPillarModuleProps {
  isLightMode?: boolean;
}

export function HinduCosmologyPillarModule({ isLightMode }: HinduCosmologyPillarModuleProps) {
  const { mode: presentationMode, setMode: setPresentationMode, isCinematic, isResearch, isReading } = usePresentationMode();
  const [activeTab, setActiveTab] = useState<'kalachakra' | 'scriptures' | 'comparative'>('kalachakra');

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Pillar Hero Header */}
      <div className="text-center space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>तृतीय स्तम्भ • PILLAR 03: HINDU COSMOLOGY (सनातन ब्रह्माण्ड)</span>
          </div>

          {/* Quick-switch Presentation Mode Bar */}
          <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-lg">
            {(['cinematic', 'research', 'reading'] as PresentationMode[]).map((m) => {
              const active = presentationMode === m;
              return (
                <button
                  key={m}
                  onClick={() => { soundManager.playClick(); setPresentationMode(m); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    active
                      ? m === 'cinematic' 
                        ? 'bg-amber-500 text-black shadow-md'
                        : m === 'research'
                        ? 'bg-cyan-500 text-black shadow-md'
                        : 'bg-emerald-500 text-black shadow-md'
                      : 'text-[#9ca3af] hover:text-[#efe6d6]'
                  }`}
                >
                  <span>{m === 'cinematic' ? '⚡' : m === 'research' ? '🔬' : '📖'}</span>
                  <span className="capitalize">{m}</span>
                </button>
              );
            })}
          </div>
        </div>

        {isCinematic && (
          <div className="space-y-1.5">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-[#fde047] tracking-tight">
              4.32 BILLION YEARS: THE DAY OF BRAHMA
            </h1>
            <p className="max-w-2xl mx-auto text-base text-[#38bdf8] font-mono">
              ⚡ Key Fact: The ancient Kalpa cycle identically matches Earth&apos;s 4.5 billion-year geological age.
            </p>
          </div>
        )}

        {isResearch && (
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
              सनातन काल एवं ब्रह्माण्ड • QUANTITATIVE TIME MATRICES
            </h1>
            <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
              Mathematical formulation of Chaturyuga ratios (4:3:2:1 = 4.32 × 10⁶ years), Kalpas of 4.32 × 10⁹ years, and exact verses from Surya Siddhanta and Vishnu Purana.
            </p>
          </div>
        )}

        {isReading && (
          <div className="space-y-2 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-serif font-medium text-[#fde047] tracking-tight">
              The Breath of Eternity
            </h1>
            <p className="text-base sm:text-lg text-[#d1d5db] font-serif leading-relaxed">
              A peaceful, easy-to-understand journey through ancient India&apos;s colossal vision of time: where universes are born, live, and dissolve like gentle breaths on a cool morning.
            </p>
          </div>
        )}
      </div>

      {/* Switcher Bar */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl overflow-x-auto max-w-full">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('kalachakra'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'kalachakra'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            कालचक्र एवं १४ लोक • TIME CYCLES & 14 LOKAS
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scriptures'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'scriptures'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            ज्ञानकोश • SACRED SCRIPTURES & SCIENCE
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('comparative'); }}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'comparative'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            तुलनात्मक ब्रह्माण्ड विज्ञान • COMPARATIVE COSMOLOGY
          </button>
        </div>
      </div>

      {/* Active View */}
      {activeTab === 'kalachakra' && (
        <KalachakraModule isLightMode={Boolean(isLightMode)} />
      )}

      {activeTab === 'scriptures' && (
        <ScripturesModule isLightMode={Boolean(isLightMode)} />
      )}

      {activeTab === 'comparative' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#fde047]">
              Comparative Ancient & Modern Cosmologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
              {[
                { tradition: 'Hindu Sanātana Cosmology', timeScale: 'Billion-year cycles (4.32B yr Kalpa)', model: 'Infinite cyclic universes (Brahmandas) continually created, maintained, and dissolved by Vishnu/Shiva; aligns quantitatively with modern radiometric ages.' },
                { tradition: 'Modern Big Bang & Inflation', timeScale: '13.8 Billion Years (Linear with potential multiverse)', model: 'Spacetime metric expansion from high-density singularity, quantum fluctuations, nucleosynthesis, dark energy accelerating expansion.' },
                { tradition: 'Buddhist Cosmology (Kalpas)', timeScale: 'Infinite Incalculable Asankhyeya Kalpas', model: 'Cyclic dissolution via fire, water, and wind; realms of form (Rupa), formless (Arupa), and desire (Kama) dependent on collective karma.' },
                { tradition: 'Jain Cosmology (Avasarpini)', timeScale: 'Time wheel of Utsarpini & Avasarpini (Aras)', model: 'Uncreated universe (Lokakasa) without a creator deity; eternal cyclic ascent and descent of human virtue and lifespan.' },
                { tradition: 'Ancient Greek (Aristotle & Ptolemy)', timeScale: 'Eternal or short historical horizon', model: 'Geocentric concentric crystalline spheres with stationary Earth at the center; circular uniform planetary epicycles.' },
                { tradition: 'Egyptian Cosmology', timeScale: 'Eternal cyclical renewal (Neheh & Djet)', model: 'Primordial chaotic waters (Nun) out of which the primordial mound (Benben) arose; daily cosmic journey of Ra across the sky.' }
              ].map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#fde047] text-sm">{c.tradition}</span>
                    <span className="text-[10px] font-mono text-[#e8913a] px-2 py-0.5 rounded bg-white/5">{c.timeScale}</span>
                  </div>
                  <p className="text-[#efe6d6] leading-relaxed">{c.model}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
