'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Orbit, 
  Search, 
  X, 
  ExternalLink, 
  Radio, 
  Satellite, 
  Compass, 
  Sparkles, 
  Layers, 
  Cloud, 
  Eye, 
  CheckCircle2,
  Rocket
} from 'lucide-react';
import { SatelliteRecord, SatelliteCategory } from '../../types/today';
import { soundManager } from '../../utils/audio';

export interface CelesTrakGroupOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  tag: string;
}

export const CELESTRAK_GROUPS: CelesTrakGroupOption[] = [
  { id: 'stations', name: 'Space Stations', icon: '🛰️', description: 'ISS, Tiangong CSS, Crew Dragon & orbital research stations', tag: 'CREWED LABS' },
  { id: 'visual', name: '100 Brightest', icon: '✨', description: 'Visually brightest satellites visible to the naked eye from Earth', tag: 'NAKED-EYE' },
  { id: 'resource', name: 'Earth Resources', icon: '🌍', description: 'Landsat 8/9, Sentinel-2, Terra, Aqua, Cartosat remote sensing', tag: 'EARTH OBS' },
  { id: 'sar', name: 'Synthetic Aperture Radar', icon: '📡', description: 'Sentinel-1, RADARSAT, TerraSAR-X, ICEYE all-weather radar', tag: 'RADAR SAR' },
  { id: 'weather', name: 'Meteorological', icon: '🌦️', description: 'NOAA, GOES, METOP, INSAT, Meteosat storm tracking satellites', tag: 'WEATHER' },
  { id: 'science', name: 'Science & Astronomy', icon: '🔬', description: 'Hubble, Chandra, Fermi, Swift, Astrosat astrophysical missions', tag: 'ASTROPHYSICS' },
  { id: 'last-30-days', name: 'Last 30 Days Launches', icon: '🚀', description: 'Fresh operational satellites launched into orbit in the past month', tag: 'NEW LAUNCHES' },
  { id: 'all', name: 'Combined Core Fleet', icon: '🌐', description: 'Curated 200+ multi-discipline active orbital fleet', tag: 'PRIMARY FLEET' }
];

interface CelesTrakExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSatellite: (noradId: number) => void;
  isLightMode?: boolean;
}

export function CelesTrakExplorerModal({
  isOpen,
  onClose,
  onSelectSatellite,
  isLightMode = false
}: CelesTrakExplorerModalProps) {
  const [activeGroup, setActiveGroup] = useState<string>('stations');
  const [satellites, setSatellites] = useState<SatelliteRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSat, setSelectedSat] = useState<SatelliteRecord | null>(null);

  const fetchGroup = async (groupId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/satellites?group=${groupId}`);
      const data = await res.json();
      if (data.satellites) {
        setSatellites(data.satellites);
        if (data.satellites.length > 0) {
          setSelectedSat(data.satellites[0]);
        }
      }
    } catch (err) {
      console.error('Failed to query CelesTrak group:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchGroup(activeGroup);
    }
  }, [isOpen, activeGroup]);

  const filteredSatellites = useMemo(() => {
    if (!searchQuery.trim()) return satellites;
    const q = searchQuery.toLowerCase().trim();
    return satellites.filter(s => 
      s.name.toLowerCase().includes(q) || 
      String(s.noradId).includes(q) ||
      s.operator.toLowerCase().includes(q)
    );
  }, [satellites, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div 
        className={`w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isLightMode 
            ? 'bg-[#f7f2e8] border-[#c59b27]/40 text-[#1d130a]' 
            : 'bg-[#0a0d14] border-[#e8913a]/35 text-[#efe6d6]'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8913a]/15 border border-[#e8913a]/30 flex items-center justify-center text-[#e8913a]">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#fde047]">
                  CELESTRAK LIVE ORBITAL EPHEMERIDES BROWSER
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                  REAL SGP4 DATA
                </span>
              </div>
              <p className="text-xs text-[#b5a990] font-sans">
                Access official General Perturbations (GP) orbital element sets maintained by CelesTrak across 8 specialized spacecraft categories.
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

        {/* CelesTrak Group Switcher Pills */}
        <div className="px-5 py-2.5 border-b border-white/10 bg-black/25 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono">
          {CELESTRAK_GROUPS.map(grp => {
            const isActive = activeGroup === grp.id;
            return (
              <button
                key={grp.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveGroup(grp.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#e8913a] text-black font-bold border-[#fde047] shadow-md'
                    : 'bg-white/5 border-white/5 text-[#b5a990] hover:text-[#efe6d6] hover:bg-white/10'
                }`}
              >
                <span>{grp.icon}</span>
                <span>{grp.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="px-5 py-2.5 border-b border-white/10 flex items-center justify-between gap-3 bg-black/15 text-xs font-mono">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-[#a8a29e] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeGroup} (e.g. ISS, Tianhe, 25544, Sentinel)...`}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-[#efe6d6] focus:outline-none focus:border-[#e8913a]"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#a8a29e]">
            <span>Showing <strong className="text-[#fde047]">{filteredSatellites.length}</strong> satellites</span>
            <span className="hidden md:inline">• 2-Hour In-Memory Server Cache Active</span>
          </div>
        </div>

        {/* Main Content Split: Satellites Table + Live Telemetry HUD */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Table */}
          <div className="flex-1 overflow-y-auto no-scrollbar border-r border-white/10">
            {isLoading ? (
              <div className="py-24 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-[#e8913a] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-[#a8a29e]">Retrieving orbital elements from celestrak.org...</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="sticky top-0 bg-[#0d121c] border-b border-white/10 text-[10.5px] text-[#a8a29e] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Satellite Name</th>
                    <th className="py-2.5 px-2 text-center">NORAD ID</th>
                    <th className="py-2.5 px-2 text-right">Orbit</th>
                    <th className="py-2.5 px-2 text-right">Inclination</th>
                    <th className="py-2.5 px-2 text-right">Period</th>
                    <th className="py-2.5 px-2 text-right">Altitude</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredSatellites.map(sat => {
                    const isSelected = selectedSat?.noradId === sat.noradId;

                    return (
                      <tr
                        key={sat.noradId}
                        onClick={() => { soundManager.playClick(); setSelectedSat(sat); }}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-[#e8913a]/20 text-[#fde047]' 
                            : 'hover:bg-white/5 text-[#efe6d6]'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-medium flex items-center gap-2 truncate max-w-[220px]">
                          <span className="text-amber-400">🛰️</span>
                          <span className="truncate">{sat.name}</span>
                        </td>
                        <td className="py-2.5 px-2 text-center text-[#38bdf8] font-bold">{sat.noradId}</td>
                        <td className="py-2.5 px-2 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] bg-white/5 border border-white/10 text-[#d4af37]">
                            {sat.orbitType}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right">{sat.inclinationDeg}°</td>
                        <td className="py-2.5 px-2 text-right">{sat.periodMinutes}m</td>
                        <td className="py-2.5 px-2 text-right text-[#a8a29e]">
                          {sat.perigeeKm}–{sat.apogeeKm} km
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.bell(880, 0.2, 1.5);
                              onSelectSatellite(sat.noradId);
                              onClose();
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e8913a]/20 hover:bg-[#e8913a] text-[#fde047] hover:text-black border border-[#e8913a]/40 transition-colors"
                          >
                            Track ↗
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Right Selected Satellite Detail Panel */}
          {selectedSat && (
            <div className="w-full lg:w-96 p-5 bg-[#080b11] shrink-0 border-t lg:border-t-0 flex flex-col justify-between space-y-4 font-mono text-xs overflow-y-auto no-scrollbar">
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#e8913a] font-bold uppercase tracking-wider">
                      NORAD #{selectedSat.noradId} • {selectedSat.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-[#38bdf8]">
                      {selectedSat.orbitType} ORBIT
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#fde047] mt-1">
                    {selectedSat.name}
                  </h4>
                  <p className="text-[11px] font-sans text-[#a8a29e] mt-1 leading-relaxed">
                    {selectedSat.description}
                  </p>
                </div>

                {/* Orbital Mechanics Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#a8a29e] block text-[9.5px]">INCLINATION</span>
                    <span className="text-white font-bold">{selectedSat.inclinationDeg}°</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#a8a29e] block text-[9.5px]">ORBITAL PERIOD</span>
                    <span className="text-white font-bold">{selectedSat.periodMinutes} min</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#a8a29e] block text-[9.5px]">PERIGEE / APOGEE</span>
                    <span className="text-[#38bdf8] font-bold">{selectedSat.perigeeKm} / {selectedSat.apogeeKm} km</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#a8a29e] block text-[9.5px]">OPERATOR</span>
                    <span className="text-[#fde047] truncate block">{selectedSat.operator}</span>
                  </div>
                </div>

                {/* Two-Line Element (TLE) Raw Display */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#a8a29e] uppercase block font-bold">
                    Raw Two-Line Element Set (TLE):
                  </span>
                  <div className="p-2 rounded bg-black/60 border border-white/10 text-[9.5px] font-mono text-[#6ee7b7] overflow-x-auto select-text">
                    <div>{selectedSat.line1}</div>
                    <div>{selectedSat.line2}</div>
                  </div>
                  <span className="text-[9px] text-[#a8a29e] block">Epoch: {selectedSat.epochDate?.substring(0, 19)}Z</span>
                </div>

                {/* Track Button */}
                <button
                  onClick={() => {
                    soundManager.bell(880, 0.2, 1.5);
                    onSelectSatellite(selectedSat.noradId);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e8913a] to-[#b8621b] hover:from-[#fde047] hover:to-[#e8913a] text-black font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Orbit className="w-4 h-4 text-black" />
                  <span>Lock & Track on 3D Globe</span>
                </button>
              </div>

              {/* Attribution */}
              <div className="pt-3 border-t border-white/10 text-[10px] text-[#9ca3af] space-y-1">
                <div className="flex items-center gap-1 text-[#e8913a]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>CelesTrak Orbital Propagation Standard</span>
                </div>
                <p>Data retrieved from CelesTrak (celestrak.org) under Dr. T.S. Kelso educational data policy.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-[#a8a29e]">
          <div className="flex items-center gap-2">
            <span>Upstream Feed:</span>
            <a
              href="https://celestrak.org/NORAD/elements/"
              target="_blank"
              rel="noreferrer"
              className="text-[#e8913a] hover:underline flex items-center gap-1"
            >
              <span>celestrak.org/NORAD/elements/</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-lg bg-[#e8913a] text-black font-bold hover:bg-[#fde047] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
