'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Compass, Star, Eye, BookOpen, Layers, Info, Filter, Search, ChevronRight } from 'lucide-react';
import { ALL_NAKSHATRAS, NakshatraDetail } from '../../data/nakshatraData';
import { soundManager } from '../../utils/audio';

export function NakshatraModule({ isLightMode }: { isLightMode: boolean }) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [filterGana, setFilterGana] = useState<'All' | 'Deva' | 'Manushya' | 'Rakshasa'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNakshatras = useMemo(() => {
    return ALL_NAKSHATRAS.filter((nak) => {
      if (filterGana !== 'All' && nak.gana !== filterGana) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = nak.name.toLowerCase().includes(q);
        const inSanskrit = nak.sanskrit.includes(q);
        const inStars = nak.astronomicalStars.toLowerCase().includes(q);
        const inDeity = nak.rulingDeity.toLowerCase().includes(q);
        const inSymbol = nak.symbol.toLowerCase().includes(q);
        return inName || inSanskrit || inStars || inDeity || inSymbol;
      }
      return true;
    });
  }, [filterGana, searchQuery]);

  const activeNak: NakshatraDetail = ALL_NAKSHATRAS[selectedIdx];

  return (
    <div className={`w-full h-full flex flex-col overflow-y-auto ${
      isLightMode ? 'bg-[#fcf8f0] text-[#1d130a]' : 'bg-[#090B18] text-[#efe6d6]'
    }`}>
      {/* Top Banner */}
      <div className="shrink-0 px-4 sm:px-8 py-5 border-b border-[#C9A45C]/25 bg-gradient-to-r from-[#15132B]/80 via-[#090B18] to-[#15132B]/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/40">
              MODULE 05 • नक्षत्र दर्शन
            </span>
            <span className="text-xs text-[#527FAE] font-serif">27 Lunar Mansions of the Ecliptic Belt</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F1E9D8] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            THE NAKSHATRA OBSERVATORY — 27 Lunar Constellations
          </h1>
          <p className="text-xs text-[#B8C4D5] max-w-3xl mt-0.5">
            Explore the traditional 13°20’ divisions of the Moon’s sidereal path, astronomical junction stars (Yogataras), sacred symbols, ruling deities, and the 108 Pada harmonic vibrations.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#C9A45C]" />
            <input
              type="text"
              placeholder="Search star, deity, symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-[8px] bg-black/50 border border-white/10 text-xs font-serif text-[#F1E9D8] focus:border-[#C9A45C] outline-none w-48 sm:w-60"
            />
          </div>

          <div className="flex items-center p-0.5 rounded-[8px] bg-black/40 border border-[#C9A45C]/20">
            {(['All', 'Deva', 'Manushya', 'Rakshasa'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setFilterGana(g)}
                className={`px-2.5 py-1 rounded-[6px] text-[10.5px] font-serif transition-all ${
                  filterGana === g
                    ? 'bg-[#C9A45C] text-[#090B18] font-bold'
                    : 'text-[#B8C4D5] hover:text-[#F1E9D8]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Explorer */}
      <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

        {/* LEFT COLUMN: 27 Nakshatras Scrollable Roster */}
        <div className="space-y-1.5 max-h-[78vh] overflow-y-auto pr-1 no-scrollbar">
          {filteredNakshatras.map((nak) => {
            const isSelected = nak.index === activeNak.index;
            return (
              <button
                key={nak.index}
                onClick={() => {
                  soundManager.tick();
                  setSelectedIdx(nak.index);
                }}
                className={`w-full p-3 rounded-[10px] text-left border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1c183b] to-[#120f26] border-[#C9A45C] shadow-lg ring-1 ring-[#C9A45C]/40'
                    : 'bg-[#101018]/80 border-white/5 hover:bg-white/5 hover:border-[#C9A45C]/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                    isSelected ? 'bg-[#C9A45C] text-[#090B18]' : 'bg-white/10 text-[#B8C4D5]'
                  }`}>
                    {nak.index + 1}
                  </span>
                  <div className="truncate">
                    <span className="text-xs font-serif font-bold text-[#F1E9D8] block truncate">
                      {nak.sanskrit} • {nak.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#B8C4D5] block truncate">
                      {nak.degreesRange}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-serif text-[#C9A45C] block">
                    {nak.rulingPlanet}
                  </span>
                  <span className="text-[9px] text-[#527FAE] block">
                    {nak.gana} Gana
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Active Nakshatra Deep Observatory Dossier */}
        <div className="space-y-4">
          <div className="p-6 rounded-[16px] bg-gradient-to-b from-[#15132B]/90 via-[#101018] to-[#090B18] border border-[#C9A45C]/40 shadow-2xl space-y-4">
            
            {/* Header Plaque */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#C9A45C]/20 pb-3 gap-3">
              <div>
                <span className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider block">
                  Nakshatra #{activeNak.index + 1} of 27 • Ecliptic Sector {activeNak.startDegree.toFixed(1)}° to {activeNak.endDegree.toFixed(1)}°
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F1E9D8] mt-0.5" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  {activeNak.sanskrit} • {activeNak.name} ({activeNak.iast})
                </h2>
                <span className="text-xs text-[#527FAE] font-serif">
                  Astronomical Identifier: {activeNak.astronomicalStars} ({activeNak.modernConstellation})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-[#C9A45C]/15 border border-[#C9A45C]/40 text-[#C9A45C]">
                  Lord: {activeNak.rulingPlanet}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-[#527FAE]/15 border border-[#527FAE]/40 text-[#a5f3fc]">
                  Deity: {activeNak.rulingDeity.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
                <span className="text-[10px] text-[#B8C4D5] block uppercase font-mono">Sacred Symbol</span>
                <span className="font-serif font-bold text-[#F1E9D8]">{activeNak.symbol}</span>
              </div>
              <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
                <span className="text-[10px] text-[#B8C4D5] block uppercase font-mono">Animal Totem</span>
                <span className="font-serif font-bold text-[#F1E9D8]">{activeNak.animalSymbol}</span>
              </div>
              <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
                <span className="text-[10px] text-[#B8C4D5] block uppercase font-mono">Temperament Gana</span>
                <span className="font-serif font-bold text-[#C9A45C]">{activeNak.gana} Gana</span>
              </div>
              <div className="p-3 rounded-[10px] bg-black/40 border border-white/10">
                <span className="text-[10px] text-[#B8C4D5] block uppercase font-mono">Zodiac Span</span>
                <span className="font-serif font-bold text-[#f59e0b]">{activeNak.degreesRange}</span>
              </div>
            </div>

            {/* Educational & Cosmological Synthesis */}
            <div className="p-4 rounded-[12px] bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C9A45C] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" />
                Cosmological Significance & Modern Astronomy
              </span>
              <p className="text-xs text-[#F1E9D8] leading-relaxed font-serif">
                {activeNak.educationalExplanation}
              </p>
            </div>

            {/* Mythology & Lore */}
            <div className="p-4 rounded-[12px] bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#527FAE] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#527FAE]" />
                Puranic Mythology & Deva Lore
              </span>
              <p className="text-xs text-[#B8C4D5] leading-relaxed font-serif">
                {activeNak.mythology}
              </p>
            </div>

            {/* The 4 Padas (Quarters / 108 Harmonics) */}
            <div className="space-y-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C9A45C] block">
                The Four Padas (पाद — Navamsa Quarters & Sound Syllables)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {activeNak.padas.map((pada) => (
                  <div
                    key={pada.pada}
                    className="p-3 rounded-[10px] bg-[#101018] border border-white/10 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif font-bold text-[#C9A45C]">Pada {pada.pada}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#C9A45C]/15 text-[#C9A45C]">
                        {pada.soundSyllable}
                      </span>
                    </div>
                    <span className="text-[11px] font-serif text-[#F1E9D8] block">
                      Navamsa: {pada.navamsaRashi}
                    </span>
                    <p className="text-[10px] text-[#B8C4D5] font-serif">
                      {pada.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
