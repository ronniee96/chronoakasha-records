'use client';

import React, { useState } from 'react';
import { TodayHistoricalEvent } from '../../types/today';
import { Calendar, ShieldCheck, Compass, ExternalLink, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface TodayInHistoryProps {
  events: TodayHistoricalEvent[];
  onJumpToChakraEra: (eraIndex: number) => void;
  isLightMode: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  space: '#06b6d4',
  astronomy: '#a855f7',
  archaeology: '#a8876a',
  ancient: '#e3b55b',
  science: '#10b981',
  culture: '#e8913a',
  geology: '#ef4444'
};

export function TodayInHistory({
  events,
  onJumpToChakraEra,
  isLightMode
}: TodayInHistoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = events.filter((ev) => {
    if (selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.civilization.toLowerCase().includes(q) ||
        ev.period.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className={`p-4 md:p-6 space-y-4 ${
      isLightMode ? 'text-[#1d130a]' : 'text-[#efe6d6]'
    }`}>
      {/* 1. Header with Sacred Copperplate Styling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#e8913a] text-lg">📜</span>
            <h2 className="text-xl font-serif font-bold text-[#fde047]">
              On This Day — Events that Changed History
            </h2>
          </div>
          <p className="text-xs font-serif text-[#b5a990] mt-0.5">
            Connecting today&apos;s date with ancient civilizations, space missions, scientific breakthroughs, and the Kalachakra timeline
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-black/40 border border-[#e8913a]/30 text-[10.5px] font-mono text-[#d4af37]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#e8913a]" />
          <span>NASA &bull; ESA &bull; ASI &bull; Epigraphia Indica &bull; UNESCO</span>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'space', label: '🚀 Space & Astronautics' },
            { id: 'astronomy', label: '🔭 Astronomy' },
            { id: 'archaeology', label: '🏛️ Archaeology' },
            { id: 'ancient', label: '🕉️ Ancient Bhārata' },
            { id: 'science', label: '⚛️ Science & Physics' },
            { id: 'culture', label: '👑 Sovereign History' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1 rounded-[6px] text-xs font-serif font-bold transition-all border whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#e8913a] text-black border-[#fde047] shadow-md'
                  : 'bg-black/30 text-[#b5a990] border-white/10 hover:text-white hover:border-[#e8913a]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by era, dynasty, or discovery..."
          className="px-3 py-1 rounded-[6px] bg-black/40 border border-white/15 text-xs text-white placeholder:text-[#8a7f6c] focus:outline-none focus:border-[#e8913a]"
        />
      </div>

      {/* 3. Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {filtered.map((item) => {
          const color = CATEGORY_COLORS[item.category] || '#e8913a';
          return (
            <div
              key={item.id}
              className="p-4 rounded-[12px] bg-gradient-to-b from-[#18110b] via-[#120d08] to-[#1a120c] border border-[rgba(232,145,58,0.3)] hover:border-[#fde047] transition-all shadow-xl space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-mono font-bold text-[#fde047] px-2 py-0.5 rounded bg-[#e8913a]/15 border border-[#e8913a]/30">
                    {item.yearFormatted}
                  </span>
                  <span 
                    className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}40` }}
                  >
                    {item.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#efe6d6] group-hover:text-white transition-colors leading-snug">
                  {item.title}
                </h3>

                <div className="text-[11px] font-mono text-[#6fb0b2] flex items-center gap-2">
                  <span>🏛️ {item.civilization}</span>
                  <span className="opacity-40">&bull;</span>
                  <span>⏳ {item.period}</span>
                </div>

                <p className="text-xs font-serif text-[#b5a990] leading-relaxed">
                  {item.description}
                </p>

                <div className="p-2.5 rounded-[8px] bg-black/40 border border-white/5 space-y-1 text-[11px] font-serif">
                  <span className="text-[#e8913a] font-bold block text-[10.5px] uppercase tracking-wide">
                    Historical & Civilizational Significance
                  </span>
                  <p className="text-[#efe6d6] leading-relaxed">
                    {item.historicalSignificance}
                  </p>
                </div>
              </div>

              {/* Bottom Citations & Jump to Chakra Button */}
              <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-[#8a7f6c] truncate max-w-xs">
                  Ref: {item.primaryReferences[0]}
                </div>

                {item.chakraEraIndex !== undefined && (
                  <button
                    onClick={() => {
                      soundManager.bell(880, 0.2, 1.8);
                      onJumpToChakraEra(item.chakraEraIndex!);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-serif font-bold text-[#0d0a08] bg-gradient-to-r from-[#e8913a] to-[#d4af37] hover:brightness-110 transition-all shadow-md shrink-0 self-end sm:self-auto"
                    aria-label={`Jump to Kalachakra Timeline Era ${item.chakraEraIndex}`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>View in Kalachakra Wheel</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
