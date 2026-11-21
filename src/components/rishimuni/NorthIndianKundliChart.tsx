'use client';

import React from 'react';
import { KundliHouse } from '../../utils/jyotishEngine';
import { soundManager } from '../../utils/audio';

interface NorthIndianKundliChartProps {
  houses: KundliHouse[];
  selectedHouse: number;
  onSelectHouse: (houseNumber: number) => void;
  className?: string;
}

export function NorthIndianKundliChart({
  houses,
  selectedHouse,
  onSelectHouse,
  className = ''
}: NorthIndianKundliChartProps) {
  // Planet shorthand abbreviations & Vedic energetic colors
  const PLANET_COLORS: Record<string, string> = {
    sun: '#f59e0b',     // Gold
    moon: '#f8fafc',    // Silver/Chandra
    mars: '#f87171',    // Scarlet/Mangala
    mercury: '#34d399', // Emerald/Budha
    jupiter: '#fde047', // Radiant Guru
    venus: '#f472b6',   // Diamond Shukra
    saturn: '#38bdf8',  // Sapphire Shani
    rahu: '#c084fc',    // Cosmic Rahu
    ketu: '#fb923c'     // Smokey Ketu
  };

  const handleHouseClick = (hNum: number) => {
    soundManager.playClick();
    onSelectHouse(hNum);
  };

  // House coordinates for text positioning in 400x400 SVG
  const houseLabels: Record<number, { cx: number; cy: number; title: string }> = {
    1: { cx: 200, cy: 110, title: 'H1: Lagna (तनू)' },
    2: { cx: 100, cy: 55, title: 'H2: Dhana (धन)' },
    3: { cx: 55, cy: 100, title: 'H3: Sahaja (सहज)' },
    4: { cx: 110, cy: 200, title: 'H4: Sukha (सुख)' },
    5: { cx: 55, cy: 300, title: 'H5: Putra (पुत्र)' },
    6: { cx: 100, cy: 345, title: 'H6: Ari (अरि)' },
    7: { cx: 200, cy: 290, title: 'H7: Yuvati (युवति)' },
    8: { cx: 300, cy: 345, title: 'H8: Randhra (रन्ध्र)' },
    9: { cx: 345, cy: 300, title: 'H9: Dharma (धर्म)' },
    10: { cx: 290, cy: 200, title: 'H10: Karma (कर्म)' },
    11: { cx: 345, cy: 100, title: 'H11: Labha (लाभ)' },
    12: { cx: 300, cy: 55, title: 'H12: Vyaya (व्यय)' }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <div className="w-full max-w-[380px] sm:max-w-[420px] aspect-square relative rounded-2xl bg-[#0c0906] border-2 border-amber-600/50 p-2 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Outer Border */}
          <rect x="10" y="10" width="380" height="380" fill="#140e08" stroke="#d97706" strokeWidth="2.5" />

          {/* Diagonals */}
          <line x1="10" y1="10" x2="390" y2="390" stroke="#b45309" strokeWidth="2" />
          <line x1="390" y1="10" x2="10" y2="390" stroke="#b45309" strokeWidth="2" />

          {/* Center Diamond (connecting midpoints of the 4 outer sides) */}
          <polygon points="200,10 390,200 200,390 10,200" fill="#1b120a" stroke="#d97706" strokeWidth="2" />

          {/* House Hitboxes & Rendered Content */}
          {houses.map(h => {
            const isSelected = selectedHouse === h.houseNumber;
            const pos = houseLabels[h.houseNumber];
            if (!pos) return null;

            return (
              <g 
                key={h.houseNumber} 
                className="cursor-pointer transition-all duration-150 group"
                onClick={() => handleHouseClick(h.houseNumber)}
              >
                {/* Active Indicator Halo */}
                {isSelected && (
                  <circle cx={pos.cx} cy={pos.cy} r="32" fill="#e8913a" opacity="0.25" className="animate-pulse" />
                )}

                {/* House Sign Number (1 to 12) */}
                <text 
                  x={pos.cx} 
                  y={pos.cy - 14} 
                  textAnchor="middle" 
                  fontSize="11" 
                  fontFamily="monospace" 
                  fontWeight="bold" 
                  fill={isSelected ? '#fde047' : '#e8913a'}
                >
                  {h.rashiIndex + 1} • {h.rashiSanskrit.split(' ')[0]}
                </text>

                {/* House Title (H1, H10, etc.) */}
                <text 
                  x={pos.cx} 
                  y={pos.cy} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fontFamily="serif" 
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  fill={isSelected ? '#ffffff' : '#b5a990'}
                >
                  H{h.houseNumber}
                </text>

                {/* Occupying Planets — Color coded and wrapped for clean multi-planet display */}
                {h.planets.length > 0 ? (
                  <g>
                    {h.planets.length <= 2 ? (
                      <text 
                        x={pos.cx} 
                        y={pos.cy + 16} 
                        textAnchor="middle" 
                        fontSize="9.5" 
                        fontFamily="monospace" 
                        fontWeight="bold"
                      >
                        {h.planets.map((p, pIdx) => (
                          <tspan key={p.id} fill={PLANET_COLORS[p.id.toLowerCase()] || '#38bdf8'}>
                            {pIdx > 0 ? ' ' : ''}{p.id.slice(0, 2).toUpperCase()}
                          </tspan>
                        ))}
                      </text>
                    ) : (
                      <>
                        <text 
                          x={pos.cx} 
                          y={pos.cy + 13} 
                          textAnchor="middle" 
                          fontSize="8.5" 
                          fontFamily="monospace" 
                          fontWeight="bold"
                        >
                          {h.planets.slice(0, 2).map((p, pIdx) => (
                            <tspan key={p.id} fill={PLANET_COLORS[p.id.toLowerCase()] || '#38bdf8'}>
                              {pIdx > 0 ? ' ' : ''}{p.id.slice(0, 2).toUpperCase()}
                            </tspan>
                          ))}
                        </text>
                        <text 
                          x={pos.cx} 
                          y={pos.cy + 24} 
                          textAnchor="middle" 
                          fontSize="8.5" 
                          fontFamily="monospace" 
                          fontWeight="bold"
                        >
                          {h.planets.slice(2).map((p, pIdx) => (
                            <tspan key={p.id} fill={PLANET_COLORS[p.id.toLowerCase()] || '#38bdf8'}>
                              {pIdx > 0 ? ' ' : ''}{p.id.slice(0, 2).toUpperCase()}
                            </tspan>
                          ))}
                        </text>
                      </>
                    )}
                  </g>
                ) : (
                  <text 
                    x={pos.cx} 
                    y={pos.cy + 14} 
                    textAnchor="middle" 
                    fontSize="8.5" 
                    fontFamily="serif" 
                    fill="#6b7280" 
                    opacity="0.6"
                  >
                    —
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected House Quick Inspector Legend */}
      <div className="w-full mt-2.5 p-3 rounded-xl bg-black/60 border border-amber-500/30 text-xs font-mono flex items-center justify-between">
        <div>
          <span className="text-amber-400 font-bold block">
            Selected: House {selectedHouse} ({houses[selectedHouse - 1]?.significance.split('•')[0]})
          </span>
          <span className="text-gray-300 text-[11px]">
            Sign: {houses[selectedHouse - 1]?.rashiName} ({houses[selectedHouse - 1]?.rashiSanskrit}) • Lord: {houses[selectedHouse - 1]?.signLord}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
          Click Chart Houses
        </span>
      </div>
    </div>
  );
}
