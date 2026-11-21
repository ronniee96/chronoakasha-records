'use client';

import React, { useState } from 'react';
import { SatellitePass, ObserverLocation } from '../../types/today';
import { Clock, Eye, Sun, Moon, ShieldCheck, Compass, AlertCircle, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface SatellitePassListProps {
  passes: SatellitePass[];
  observer: ObserverLocation;
  onSelectSatellite: (noradId: number) => void;
  isLightMode: boolean;
}

export function SatellitePassList({
  passes,
  observer,
  onSelectSatellite,
  isLightMode
}: SatellitePassListProps) {
  const [filterType, setFilterType] = useState<'all' | 'optical' | 'daytime' | 'ground-track'>('all');

  const filteredPasses = passes.filter((p) => {
    if (filterType === 'optical') return p.isOpticallyVisible;
    if (filterType === 'daytime') return p.isDaytimePass;
    if (filterType === 'ground-track') return p.passType === 'ground-track';
    return true;
  });

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`h-full flex flex-col overflow-hidden p-4 md:p-6 space-y-4 ${
      isLightMode ? 'text-[#1d130a]' : 'text-[#efe6d6]'
    }`}>
      {/* 1. Header with Scientific Attribution Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#e8913a] text-sm">🛰️</span>
            <h2 className="text-xl font-serif font-bold text-[#fde047]">
              Predicted Orbital Passes & Sensor Swaths
            </h2>
          </div>
          <p className="text-xs font-serif text-[#b5a990] mt-0.5">
            Real-time orbital intersections for <b className="text-[#efe6d6]">{observer.name}</b> ({observer.latitude.toFixed(2)}° N, {observer.longitude.toFixed(2)}° E)
          </p>
        </div>

        {/* Scientific Distinction Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-black/40 border border-[#6fb0b2]/40 text-[10.5px] font-mono text-[#a5f3fc]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6fb0b2]" />
          <span>PREDICTION • SGP4 Ephemeris Model</span>
        </div>
      </div>

      {/* 2. Scientific Criteria Documentation Card */}
      <div className="p-3 rounded-[9px] bg-black/30 border border-[#e8913a]/25 text-[11px] font-serif space-y-1.5 text-[#b5a990]">
        <div className="flex items-center gap-2 text-[#e8913a] font-bold text-xs uppercase tracking-wide">
          <AlertCircle className="w-3.5 h-3.5 text-[#e8913a]" />
          <span>Pass Criteria & Optical vs Sensor Visibility Specifications</span>
        </div>
        <p className="leading-relaxed">
          • <b className="text-[#06b6d4]">Sentinel-2 (A/B)</b>: Pass triggered when satellite nadir ground-track passes within <b className="text-white">145 km</b> of observer.<br/>
          • <b className="text-[#06b6d4]">Landsat (8/9)</b>: Pass triggered when nadir ground-track passes within <b className="text-white">93 km</b> of observer.<br/>
          • <b className="text-[#f59e0b]">ISS, Tiangong & Space Stations</b>: Elevation reaches <b className="text-white">&ge; 10.0°</b> above observer horizon. An optical pass requires both the satellite to be illuminated by direct sunlight AND the observer to be in astronomical darkness (Sun &lt; -6°).
        </p>
      </div>

      {/* 3. Filter Buttons */}
      <div className="flex items-center gap-2 select-none overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: `All Passes (${passes.length})` },
          { id: 'optical', label: `✨ Naked-Eye Optical (${passes.filter(p => p.isOpticallyVisible).length})` },
          { id: 'ground-track', label: `🎯 Nadir Swaths (${passes.filter(p => p.passType === 'ground-track').length})` },
          { id: 'daytime', label: `☀️ Daytime Flybys (${passes.filter(p => p.isDaytimePass).length})` }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => {
              soundManager.playClick();
              setFilterType(f.id as any);
            }}
            className={`px-3 py-1 rounded-[6px] text-xs font-serif font-bold transition-all border whitespace-nowrap ${
              filterType === f.id
                ? 'bg-[#e8913a] text-black border-[#fde047] shadow-md'
                : 'bg-black/30 text-[#b5a990] border-white/10 hover:text-white hover:border-[#e8913a]/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 4. Passes List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
        {filteredPasses.length === 0 ? (
          <div className="p-8 text-center text-[#b5a990] font-serif text-sm border border-dashed border-white/10 rounded-[12px]">
            No predicted passes matching current criteria in the next 24 hours. Try switching observer location or broadening filters.
          </div>
        ) : (
          filteredPasses.map((pass) => {
            const timeUntilSec = Math.round((pass.startTime.getTime() - Date.now()) / 1000);
            const timeUntilMinutes = Math.max(0, Math.floor(timeUntilSec / 60));
            const hoursUntil = Math.floor(timeUntilMinutes / 60);
            const minsRem = timeUntilMinutes % 60;
            const timeUntilStr = hoursUntil > 0 ? `${hoursUntil}h ${minsRem}m` : `${minsRem} min`;

            return (
              <div
                key={pass.id}
                onClick={() => {
                  soundManager.bell(880, 0.2, 1.2);
                  onSelectSatellite(pass.noradId);
                }}
                className="p-3.5 rounded-[10px] bg-gradient-to-r from-[#170f09] via-[#120c07] to-[#1a120b] border border-[#e8913a]/30 hover:border-[#fde047] transition-all cursor-pointer group shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-extrabold text-base text-[#fde047] group-hover:text-[#ffffff] transition-colors">
                      {pass.satelliteName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-[#6fb0b2] border border-[#6fb0b2]/30">
                      NORAD {pass.noradId}
                    </span>
                    {pass.passType === 'ground-track' ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                        Nadir Remote Sensing Swath
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30">
                        Max Elevation Pass
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {pass.isOpticallyVisible ? (
                      <span className="flex items-center gap-1 text-[10.5px] font-serif font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Eye className="w-3 h-3" />
                        ✨ Naked-Eye Visible
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10.5px] font-serif text-[#8a7f6c] bg-black/40 px-2 py-0.5 rounded border border-white/5">
                        <Sun className="w-3 h-3" />
                        Sensor / Radio Pass
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-[#e8913a] px-2 py-0.5 rounded bg-[#e8913a]/15 border border-[#e8913a]/40">
                      in {timeUntilStr}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-[#b5a990] pt-2.5">
                  <div>
                    <span className="text-[10px] text-[#8a7f6c] block">START TIME</span>
                    <span className="text-[#efe6d6] font-bold">{formatDate(pass.startTime)} {formatTime(pass.startTime)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8a7f6c] block">PEAK / CLOSEST</span>
                    <span className="text-[#fde047] font-bold">{formatTime(pass.maxElevationTime)} ({pass.maxElevationDeg}°)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8a7f6c] block">DURATION</span>
                    <span className="text-[#efe6d6] font-bold">{Math.floor(pass.durationSeconds / 60)}m {pass.durationSeconds % 60}s</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8a7f6c] block">GROUND TRACK DIST</span>
                    <span className="text-[#6fb0b2] font-bold">{pass.groundTrackDistanceKm} km</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
