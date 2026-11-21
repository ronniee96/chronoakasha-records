'use client';

import React from 'react';
import { soundManager } from '../utils/audio';
import tryambakData from '../data/tryambakEvents.json';

interface FooterErasProps {
  selectedEraId: string | null;
  onSelectEra: (eraId: string) => void;
  isLightMode: boolean;
}

export function FooterEras({ selectedEraId, onSelectEra, isLightMode }: FooterErasProps) {
  const eras = tryambakData.eras as [number, string, string][];

  return (
    <footer 
      className={`w-full z-30 h-[46px] min-h-[46px] max-h-[46px] shrink-0 flex items-center overflow-x-auto no-scrollbar border-t select-none transition-colors duration-200 ${
        isLightMode 
          ? 'bg-[#f4ebd9]/98 border-[#c59b27]/40 text-[#1d130a]' 
          : 'bg-gradient-to-r from-[#140e09] via-[#0d0905] to-[#140e09] border-[rgba(212,175,55,0.25)] text-[#b5a990]'
      } backdrop-blur-xl px-2 md:px-4 shadow-xl`}
    >
      <div className="flex items-center min-w-max gap-1 md:gap-1.5 h-full py-1">
        <span className="text-[11px] font-serif font-extrabold uppercase tracking-widest px-2.5 text-[#d4af37] flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8913a] animate-pulse" />
          कालखण्ड • ERAS:
        </span>
        {eras.map((era, idx) => {
          const isActive = selectedEraId === String(idx);
          const name = era[1];
          const desc = era[2];
          return (
            <button
              key={`era-${idx}`}
              onClick={() => {
                soundManager.playTempleBell(220 + idx * 12);
                onSelectEra(String(idx));
              }}
              className={`h-[30px] px-3 rounded-[6px] text-[11px] font-serif font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-gradient-to-b from-[#e8913a] via-[#c57922] to-[#994710] text-[#0d0a08] border-[#fde047] shadow-[0_0_12px_rgba(232,145,58,0.45)] scale-102 font-extrabold'
                  : isLightMode
                  ? 'bg-transparent text-[#5c4a38] border-transparent hover:bg-[#d4af37]/20 hover:text-[#1d130a]'
                  : 'bg-gradient-to-b from-[#1c140d]/60 to-[#0d0905]/60 text-[#b5a990] border-[rgba(212,175,55,0.2)] hover:border-[#d4af37] hover:text-[#efe6d6] hover:bg-white/5'
              }`}
              aria-label={name}
            >
              <span className="text-[#d4af37] text-[9px] opacity-70">❖</span>
              <span>{name}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
