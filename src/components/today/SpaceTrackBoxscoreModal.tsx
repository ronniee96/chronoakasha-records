'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  X, 
  Orbit, 
  Trash2, 
  Rocket, 
  Globe2, 
  ArrowUpDown, 
  Flame, 
  ExternalLink,
  Info,
  Radio
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

export interface BoxscoreRecord {
  COUNTRY: string;
  SPADOC_CD: string;
  ORBITAL_TBA: number;
  ORBITAL_PAYLOAD_COUNT: number;
  ORBITAL_ROCKET_BODY_COUNT: number;
  ORBITAL_DEBRIS_COUNT: number;
  ORBITAL_TOTAL_COUNT: number;
  DECAYED_PAYLOAD_COUNT: number;
  DECAYED_ROCKET_BODY_COUNT: number;
  DECAYED_DEBRIS_COUNT: number;
  DECAYED_TOTAL_COUNT: number;
  COUNTRY_TOTAL: number;
}

interface SpaceTrackBoxscoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export function SpaceTrackBoxscoreModal({
  isOpen,
  onClose,
  isLightMode = false
}: SpaceTrackBoxscoreModalProps) {
  const [records, setRecords] = useState<BoxscoreRecord[]>([]);
  const [globalSummary, setGlobalSummary] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'ORBITAL_TOTAL_COUNT' | 'ORBITAL_PAYLOAD_COUNT' | 'ORBITAL_DEBRIS_COUNT' | 'COUNTRY_TOTAL'>('ORBITAL_TOTAL_COUNT');
  const [selectedRecord, setSelectedRecord] = useState<BoxscoreRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/spacetrack/boxscore')
        .then(res => res.json())
        .then(data => {
          if (data.records) {
            setRecords(data.records);
            setGlobalSummary(data.globalSummary);
            // Default select India or US
            const ind = data.records.find((r: BoxscoreRecord) => r.SPADOC_CD === 'IND');
            if (ind) setSelectedRecord(ind);
          }
        })
        .catch(err => console.error('Failed to load boxscore:', err));
    }
  }, [isOpen]);

  const filteredRecords = useMemo(() => {
    let result = [...records];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r => 
        r.COUNTRY.toLowerCase().includes(q) || 
        r.SPADOC_CD.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => b[sortBy] - a[sortBy]);
    return result;
  }, [records, searchQuery, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isLightMode 
            ? 'bg-[#f7f2e8] border-[#c59b27]/40 text-[#1d130a]' 
            : 'bg-[#0a0d14] border-[#38bdf8]/35 text-[#efe6d6]'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <Orbit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#fde047]">
                  SPACE-TRACK BOXSCORE: GLOBAL SATELLITE & SPACE DEBRIS CENSUS
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                  OFFICIAL 18TH SDS DATA
                </span>
              </div>
              <p className="text-xs text-[#b5a990] font-sans">
                Comprehensive census of all 71,365 human-made space objects cataloged by the United States Space Force (18th Space Defense Squadron).
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[#b5a990] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global KPI Summary Bar */}
        {globalSummary && (
          <div className="px-5 py-3 border-b border-white/10 bg-black/30 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs font-mono">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[#a8a29e] block text-[9.5px] uppercase">Total Tracked Objects</span>
              <span className="text-base font-bold text-[#fde047]">{globalSummary.totalTrackedObjects?.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20">
              <span className="text-[#38bdf8] block text-[9.5px] uppercase">Active in Orbit</span>
              <span className="text-base font-bold text-[#a5f3fc]">{globalSummary.totalInOrbit?.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
              <span className="text-[#10b981] block text-[9.5px] uppercase">Active Payloads</span>
              <span className="text-base font-bold text-[#6ee7b7]">{globalSummary.activePayloadsInOrbit?.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20">
              <span className="text-[#f97316] block text-[9.5px] uppercase">Rocket Bodies</span>
              <span className="text-base font-bold text-[#fdba74]">{globalSummary.rocketBodiesInOrbit?.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20">
              <span className="text-[#ef4444] block text-[9.5px] uppercase">Tracked Debris</span>
              <span className="text-base font-bold text-[#fca5a5]">{globalSummary.trackedDebrisInOrbit?.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[#a8a29e] block text-[9.5px] uppercase">Decayed from Orbit</span>
              <span className="text-base font-bold text-[#efe6d6]">{globalSummary.totalDecayed?.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Search & Sort Bar */}
        <div className="px-5 py-2.5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/20 text-xs font-mono">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#a8a29e] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 122 nations (e.g. INDIA, US, PRC, ESA)..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-[#efe6d6] focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-end">
            <span className="text-[#a8a29e] text-[11px] mr-1">Sort by:</span>
            {[
              { id: 'ORBITAL_TOTAL_COUNT', label: 'Total In Orbit' },
              { id: 'ORBITAL_PAYLOAD_COUNT', label: 'Payloads' },
              { id: 'ORBITAL_DEBRIS_COUNT', label: 'Debris' },
              { id: 'COUNTRY_TOTAL', label: 'Total Historical' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSortBy(s.id as any)}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  sortBy === s.id ? 'bg-[#38bdf8] text-black font-bold' : 'text-[#b5a990] hover:text-white bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Split Table & Selected Country Deep Dive */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Left: Scrollable Country Table */}
          <div className="flex-1 overflow-y-auto no-scrollbar border-r border-white/10">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 bg-[#0d121c] border-b border-white/10 text-[10.5px] text-[#a8a29e] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Country / Organization</th>
                  <th className="py-2.5 px-2 text-center">Code</th>
                  <th className="py-2.5 px-2 text-right">Payloads</th>
                  <th className="py-2.5 px-2 text-right">Rockets</th>
                  <th className="py-2.5 px-2 text-right">Debris</th>
                  <th className="py-2.5 px-2 text-right font-bold text-[#38bdf8]">In Orbit</th>
                  <th className="py-2.5 px-3 text-right">Decayed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRecords.map((r, idx) => {
                  const isSelected = selectedRecord?.SPADOC_CD === r.SPADOC_CD;
                  const isIndia = r.SPADOC_CD === 'IND';

                  return (
                    <tr
                      key={r.SPADOC_CD}
                      onClick={() => { soundManager.playClick(); setSelectedRecord(r); }}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#38bdf8]/15 text-[#fde047]' 
                          : isIndia 
                          ? 'bg-[#e8913a]/10 hover:bg-[#e8913a]/20 text-[#fde047]' 
                          : 'hover:bg-white/5 text-[#efe6d6]'
                      }`}
                    >
                      <td className="py-2 px-3 font-medium flex items-center gap-1.5 truncate max-w-[200px]">
                        {isIndia && <span className="text-amber-400">🇮🇳</span>}
                        {r.SPADOC_CD === 'US' && <span>🇺🇸</span>}
                        {r.SPADOC_CD === 'PRC' && <span>🇨🇳</span>}
                        {r.SPADOC_CD === 'CIS' && <span>🇷🇺</span>}
                        {r.SPADOC_CD === 'ESA' && <span>🇪🇺</span>}
                        {r.SPADOC_CD === 'JPN' && <span>🇯🇵</span>}
                        {r.SPADOC_CD === 'UK' && <span>🇬🇧</span>}
                        <span className="truncate">{r.COUNTRY}</span>
                      </td>
                      <td className="py-2 px-2 text-center text-[#a8a29e] text-[10px]">{r.SPADOC_CD}</td>
                      <td className="py-2 px-2 text-right text-[#10b981]">{r.ORBITAL_PAYLOAD_COUNT.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-[#f97316]">{r.ORBITAL_ROCKET_BODY_COUNT.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-[#ef4444]">{r.ORBITAL_DEBRIS_COUNT.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right font-bold text-[#38bdf8]">{r.ORBITAL_TOTAL_COUNT.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-[#a8a29e]">{r.DECAYED_TOTAL_COUNT.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Right: Selected Country Profile HUD */}
          {selectedRecord && (
            <div className="w-full lg:w-96 p-5 bg-[#080b11] shrink-0 border-t lg:border-t-0 flex flex-col justify-between space-y-4 font-mono text-xs overflow-y-auto no-scrollbar">
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#38bdf8] font-bold uppercase">
                      SPADOC CODE: {selectedRecord.SPADOC_CD}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-[#a8a29e]">
                      Rank #{records.findIndex(r => r.SPADOC_CD === selectedRecord.SPADOC_CD) + 1}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#fde047] mt-1">
                    {selectedRecord.COUNTRY}
                  </h4>
                  <p className="text-[11px] font-sans text-[#a8a29e] mt-0.5">
                    Total historical space objects logged: <strong>{selectedRecord.COUNTRY_TOTAL.toLocaleString()}</strong>
                  </p>
                </div>

                {/* Active in orbit composition */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#efe6d6] block">
                    ACTIVE IN ORBIT: {selectedRecord.ORBITAL_TOTAL_COUNT.toLocaleString()}
                  </span>

                  {/* Ratio visual bar */}
                  <div className="h-3 w-full rounded-full overflow-hidden flex bg-white/10">
                    <div 
                      className="bg-[#10b981] h-full"
                      style={{ 
                        width: `${selectedRecord.ORBITAL_TOTAL_COUNT > 0 ? (selectedRecord.ORBITAL_PAYLOAD_COUNT / selectedRecord.ORBITAL_TOTAL_COUNT) * 100 : 0}%` 
                      }}
                      title={`Payloads: ${selectedRecord.ORBITAL_PAYLOAD_COUNT}`}
                    />
                    <div 
                      className="bg-[#f97316] h-full"
                      style={{ 
                        width: `${selectedRecord.ORBITAL_TOTAL_COUNT > 0 ? (selectedRecord.ORBITAL_ROCKET_BODY_COUNT / selectedRecord.ORBITAL_TOTAL_COUNT) * 100 : 0}%` 
                      }}
                      title={`Rocket Bodies: ${selectedRecord.ORBITAL_ROCKET_BODY_COUNT}`}
                    />
                    <div 
                      className="bg-[#ef4444] h-full"
                      style={{ 
                        width: `${selectedRecord.ORBITAL_TOTAL_COUNT > 0 ? (selectedRecord.ORBITAL_DEBRIS_COUNT / selectedRecord.ORBITAL_TOTAL_COUNT) * 100 : 0}%` 
                      }}
                      title={`Debris: ${selectedRecord.ORBITAL_DEBRIS_COUNT}`}
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                      <span className="flex items-center gap-1.5 text-[#10b981]">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span>Payloads (Operational Satellites)</span>
                      </span>
                      <strong className="text-[#efe6d6]">{selectedRecord.ORBITAL_PAYLOAD_COUNT.toLocaleString()}</strong>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                      <span className="flex items-center gap-1.5 text-[#f97316]">
                        <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                        <span>Spent Rocket Bodies</span>
                      </span>
                      <strong className="text-[#efe6d6]">{selectedRecord.ORBITAL_ROCKET_BODY_COUNT.toLocaleString()}</strong>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                      <span className="flex items-center gap-1.5 text-[#ef4444]">
                        <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                        <span>Tracked Orbital Debris</span>
                      </span>
                      <strong className="text-[#efe6d6]">{selectedRecord.ORBITAL_DEBRIS_COUNT.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                {/* Atmospheric Decay Statistics */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold text-[#a8a29e] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>ATMOSPHERIC DECAY: {selectedRecord.DECAYED_TOTAL_COUNT.toLocaleString()} Objects</span>
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    <div className="p-2 rounded bg-black/30 border border-white/5">
                      <span className="text-[#a8a29e] block text-[9.5px]">Decayed Satellites</span>
                      <span className="text-white font-bold">{selectedRecord.DECAYED_PAYLOAD_COUNT.toLocaleString()}</span>
                    </div>
                    <div className="p-2 rounded bg-black/30 border border-white/5">
                      <span className="text-[#a8a29e] block text-[9.5px]">Burned Debris</span>
                      <span className="text-white font-bold">{selectedRecord.DECAYED_DEBRIS_COUNT.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attribution Footnote */}
              <div className="pt-3 border-t border-white/10 text-[10px] text-[#9ca3af] space-y-1">
                <div className="flex items-center gap-1 text-[#38bdf8]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Space-Track Boxscore API</span>
                </div>
                <p>Data originates directly from the United States Space Force 18th Space Defense Squadron radar and optical tracking network.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-[#a8a29e]">
          <div className="flex items-center gap-2">
            <span>Query URL:</span>
            <a
              href="https://www.space-track.org/basicspacedata/query/class/boxscore/format/html"
              target="_blank"
              rel="noreferrer"
              className="text-[#38bdf8] hover:underline flex items-center gap-1"
            >
              <span>space-track.org/basicspacedata/query/class/boxscore</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-lg bg-[#38bdf8] text-black font-bold hover:bg-[#a5f3fc] transition-colors"
          >
            Close Census
          </button>
        </div>
      </div>
    </div>
  );
}
