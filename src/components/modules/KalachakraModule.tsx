'use client';

import React, { useState } from 'react';
import { 
  Compass, Clock, Layers, Sparkles, ShieldCheck, 
  ChevronRight, ArrowRight, Eye, RefreshCw, Info 
} from 'lucide-react';
import { KALACHAKRA_COSMOLOGY, YugaDefinition } from '../../data/kalachakraCosmologyData';
import { soundManager } from '../../utils/audio';

export function KalachakraModule({ isLightMode }: { isLightMode: boolean }) {
  const [selectedYugaIdx, setSelectedYugaIdx] = useState<number>(3); // Defaults to Kali Yuga
  const [activeTab, setActiveTab] = useState<'yugas' | 'cycles' | 'lokas' | 'pralaya'>('yugas');

  const selectedYuga: YugaDefinition = KALACHAKRA_COSMOLOGY.yugas[selectedYugaIdx];
  const currentPos = KALACHAKRA_COSMOLOGY.currentDateEstimate;

  return (
    <div className={`w-full h-full flex flex-col overflow-y-auto ${
      isLightMode ? 'bg-[#fcf8f0] text-[#1d130a]' : 'bg-[#090B18] text-[#efe6d6]'
    }`}>
      {/* Top Banner */}
      <div className="shrink-0 px-4 sm:px-8 py-5 border-b border-[#C9A45C]/25 bg-gradient-to-r from-[#15132B]/80 via-[#090B18] to-[#15132B]/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/40">
              MODULE 07 • कालचक्र
            </span>
            <span className="text-xs text-[#527FAE] font-serif">Vedic Cosmic Deep Time & Multiverse Cycles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F1E9D8] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            KALACHAKRA — The Wheel of Cosmic Deep Time
          </h1>
          <p className="text-xs text-[#B8C4D5] max-w-3xl mt-0.5">
            Explore the four Yugas, Mahayugas, Manvantaras, Kalpas (Brahma’s day), the 14 Lokas, and the fourfold orders of universal dissolution (Pralaya).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-[10px] bg-black/40 border border-[#C9A45C]/30">
          {(['yugas', 'cycles', 'lokas', 'pralaya'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { soundManager.playClick(); setActiveTab(tab); }}
              className={`px-3 py-1.5 rounded-[7px] text-xs font-serif font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#B86F4E] text-[#090B18] shadow-md'
                  : 'text-[#B8C4D5] hover:text-[#F1E9D8] hover:bg-white/5'
              }`}
            >
              {tab === 'yugas' ? 'Four Yugas (चतुर्युग)' : tab === 'cycles' ? 'Cosmic Scales (कल्प)' : tab === 'lokas' ? '14 Lokas (लोक)' : 'Pralaya (प्रलय)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* CURRENT COSMIC POSITION HERO PLAQUE */}
        <div className="p-5 rounded-[16px] bg-gradient-to-r from-[#1c183b] via-[#101018] to-[#15132B] border border-[#C9A45C]/40 shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-2">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C9A45C] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C9A45C]" />
              Present Cosmic Coordinates in the 51st Year of Brahma
            </span>
            <span className="text-xs font-mono text-[#527FAE]">Universal Epoch Calibration</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
              <span className="text-[10px] text-[#B8C4D5] block">Current Kalpa (Brahma Day)</span>
              <span className="font-serif font-bold text-[#F1E9D8]">{currentPos.currentKalpa}</span>
              <span className="text-[10px] text-[#C9A45C] block">1st Kalpa of 51st Divine Year</span>
            </div>
            <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
              <span className="text-[10px] text-[#B8C4D5] block">Current Manvantara</span>
              <span className="font-serif font-bold text-[#F1E9D8]">{currentPos.currentManvantara}</span>
              <span className="text-[10px] text-[#527FAE] block">7th of 14 Manvantaras</span>
            </div>
            <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
              <span className="text-[10px] text-[#B8C4D5] block">Current Mahayuga</span>
              <span className="font-serif font-bold text-[#f59e0b]">{currentPos.currentMahayuga}th Mahayuga</span>
              <span className="text-[10px] text-[#B8C4D5] block">Out of 71 in this Manvantara</span>
            </div>
            <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
              <span className="text-[10px] text-[#B8C4D5] block">Current Yuga Status</span>
              <span className="font-serif font-bold text-[#ef4444]">{currentPos.currentYuga}</span>
              <span className="text-[10px] font-mono text-[#F1E9D8] block">{currentPos.kaliYugaElapsedYears} yrs elapsed</span>
            </div>
          </div>
        </div>

        {/* TAB 1: THE FOUR YUGAS */}
        {activeTab === 'yugas' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {KALACHAKRA_COSMOLOGY.yugas.map((yuga, idx) => (
                <button
                  key={idx}
                  onClick={() => { soundManager.tick(); setSelectedYugaIdx(idx); }}
                  className={`p-3.5 rounded-[12px] text-left border transition-all ${
                    selectedYugaIdx === idx
                      ? 'bg-gradient-to-b from-[#C9A45C]/25 to-[#1c183b] border-[#C9A45C] ring-1 ring-[#C9A45C]/50 shadow-lg'
                      : 'bg-[#15132B]/60 border-white/10 hover:border-[#C9A45C]/30'
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#C9A45C] block">Ratio {4 - idx}:4</span>
                  <h4 className="text-sm font-serif font-bold text-[#F1E9D8] mt-0.5">{yuga.sanskrit}</h4>
                  <span className="text-[11px] font-serif text-[#B8C4D5] block">{yuga.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono text-[#527FAE] block mt-1">
                    {(yuga.durationYears / 1000).toLocaleString()}k Yrs
                  </span>
                </button>
              ))}
            </div>

            {/* Active Yuga Dossier */}
            <div className="p-6 rounded-[16px] bg-[#15132B]/80 border border-[#C9A45C]/30 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F1E9D8]">
                    {selectedYuga.sanskrit} • {selectedYuga.name}
                  </h3>
                  <span className="text-xs text-[#C9A45C] font-mono">
                    Duration: {selectedYuga.durationYears.toLocaleString()} Solar Years ({selectedYuga.divineYears} Divine Years)
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-[#C9A45C]">
                  {selectedYuga.dharmaRatio}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                  <span className="text-[10px] text-[#B8C4D5] uppercase block">Prevalent Virtue</span>
                  <span className="font-serif font-bold text-[#F1E9D8]">{selectedYuga.virtuePrevalent}</span>
                </div>
                <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                  <span className="text-[10px] text-[#B8C4D5] uppercase block">Avataras Manifested</span>
                  <span className="font-serif font-bold text-[#527FAE]">{selectedYuga.primaryAvatara}</span>
                </div>
                <div className="p-3 rounded-[8px] bg-black/40 border border-white/5">
                  <span className="text-[10px] text-[#B8C4D5] uppercase block">Human Lifespan Tradition</span>
                  <span className="font-serif font-bold text-[#C9A45C]">{selectedYuga.humanLifespanTradition}</span>
                </div>
              </div>

              <p className="text-xs text-[#F1E9D8] leading-relaxed font-serif">
                {selectedYuga.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-serif font-bold text-[#C9A45C] uppercase tracking-wider block">
                  Epoch Characteristics:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedYuga.characteristics.map((char, cIdx) => (
                    <div key={cIdx} className="p-2.5 rounded bg-black/40 border border-white/5 flex items-start gap-2">
                      <span className="text-[#C9A45C]">✦</span>
                      <span className="text-[#B8C4D5] font-serif">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LARGER COSMIC SCALES (MANVANTARA, KALPA, MAHAKALPA) */}
        {activeTab === 'cycles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KALACHAKRA_COSMOLOGY.largerCycles.map((cycle, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[14px] bg-[#15132B]/80 border border-[#C9A45C]/30 space-y-3 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-base font-serif font-bold text-[#F1E9D8]">{cycle.sanskrit} ({cycle.name})</h4>
                  <span className="text-xs font-mono font-bold text-[#C9A45C]">{cycle.durationYears}</span>
                </div>
                <p className="text-xs text-[#F1E9D8] font-serif leading-relaxed">
                  {cycle.description}
                </p>
                <div className="p-3 rounded-[8px] bg-black/40 border border-[#527FAE]/30 text-xs font-serif space-y-1">
                  <span className="text-[10px] font-mono text-[#527FAE] uppercase block">Modern Scientific Correspondence:</span>
                  <p className="text-[#B8C4D5]">{cycle.scientificAnalogy}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: FOURTEEN LOKAS (14 REALMS) */}
        {activeTab === 'lokas' && (
          <div className="space-y-4">
            <span className="text-xs font-serif font-bold text-[#C9A45C] uppercase tracking-wider block">
              The 14 Dimensional Planes of Vedic Cosmology (१४ भुवन / लोक)
            </span>
            <div className="space-y-2">
              {KALACHAKRA_COSMOLOGY.fourteenLokas.map((loka) => (
                <div
                  key={loka.level}
                  className={`p-3.5 rounded-[10px] border flex flex-wrap items-center justify-between gap-3 text-xs ${
                    loka.level > 0
                      ? 'bg-[#15132B]/70 border-[#527FAE]/40'
                      : loka.level === 0 || loka.level === 1
                      ? 'bg-gradient-to-r from-[#1c183b] to-[#101018] border-[#C9A45C]'
                      : 'bg-black/60 border-red-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                      loka.level > 0 ? 'bg-[#527FAE]/30 text-[#a5f3fc]' : loka.level === 1 ? 'bg-[#C9A45C] text-[#090B18]' : 'bg-red-950 text-red-300'
                    }`}>
                      {loka.level > 0 ? `+${loka.level}` : loka.level}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-[#F1E9D8]">{loka.sanskrit} • {loka.name}</h4>
                      <span className="text-[10px] text-[#B8C4D5]">{loka.type}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-serif text-[#C9A45C] block">Inhabitants: {loka.inhabitants}</span>
                    <span className="text-[10px] text-gray-400 block">{loka.significance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRALAYA (FOUR ORDERS OF DISSOLUTION) */}
        {activeTab === 'pralaya' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[14px] bg-[#15132B]/70 border border-[#C9A45C]/30 space-y-2">
              <span className="text-xs font-mono text-[#C9A45C] uppercase">1. Nitya Pralaya (नित्य प्रलय)</span>
              <h4 className="text-base font-serif font-bold text-[#F1E9D8]">Perpetual Atomic & Biological Decay</h4>
              <p className="text-xs text-[#B8C4D5] leading-relaxed font-serif">
                The continuous, unbroken entropy occurring every microsecond across all material forms. Cells divide and die, stars consume nuclear fuel, and matter slowly experiences atomic transitions.
              </p>
            </div>

            <div className="p-5 rounded-[14px] bg-[#15132B]/70 border border-[#C9A45C]/30 space-y-2">
              <span className="text-xs font-mono text-[#C9A45C] uppercase">2. Naimittika Pralaya (नैमित्तिक प्रलय)</span>
              <h4 className="text-base font-serif font-bold text-[#F1E9D8]">Occasional / Diurnal Dissolution of Brahma</h4>
              <p className="text-xs text-[#B8C4D5] leading-relaxed font-serif">
                Occurs at the end of each 4.32 billion year day of Brahma. The three lower worlds (Bhur, Bhuvar, Svar) are consumed by solar fire and submerged in cosmic waters while higher souls ascend to Janaloka and Tapoloka.
              </p>
            </div>

            <div className="p-5 rounded-[14px] bg-[#15132B]/70 border border-[#C9A45C]/30 space-y-2">
              <span className="text-xs font-mono text-[#C9A45C] uppercase">3. Prakritika Pralaya (प्राकृतिक प्रलय)</span>
              <h4 className="text-base font-serif font-bold text-[#F1E9D8]">Universal Elemental Maha-Pralaya</h4>
              <p className="text-xs text-[#B8C4D5] leading-relaxed font-serif">
                Occurs at the end of Brahma’s 100 divine years (311.04 trillion solar years). All elemental tattvas dissolve in reverse order: earth into water, water into fire, fire into air, air into akasha (space), and space into unmanifest Prakriti.
              </p>
            </div>

            <div className="p-5 rounded-[14px] bg-[#15132B]/70 border border-[#C9A45C]/30 space-y-2">
              <span className="text-xs font-mono text-[#C9A45C] uppercase">4. Atyantika Pralaya (आत्यन्तिक प्रलय)</span>
              <h4 className="text-base font-serif font-bold text-[#F1E9D8]">Absolute Spiritual Liberation (Moksha)</h4>
              <p className="text-xs text-[#B8C4D5] leading-relaxed font-serif">
                The dissolution of individual avidya (ignorance) through direct cognitive realization of non-dual consciousness (Brahman). The soul transcends all cyclic time and rebirth permanently.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
