'use client';

import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Calendar, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { ReplayState, SatelliteLivePosition } from '../../types/today';
import { soundManager } from '../../utils/audio';

interface SevenDayReplayControlsProps {
  replayState: ReplayState;
  onReplayStateChange: (updater: (prev: ReplayState) => ReplayState) => void;
  satellites: SatelliteLivePosition[];
  selectedNoradId: number | null;
  onSelectSatellite: (noradId: number) => void;
  isLightMode: boolean;
}

export function SevenDayReplayControls({
  replayState,
  onReplayStateChange,
  satellites,
  selectedNoradId,
  onSelectSatellite,
  isLightMode
}: SevenDayReplayControlsProps) {
  const SPEED_PRESETS = [1, 10, 60, 300, 1200];

  // Replay animation ticker
  useEffect(() => {
    if (!replayState.isPlaying) return;

    const interval = setInterval(() => {
      onReplayStateChange((prev) => {
        // Advance timestamp by speedMultiplier * 100ms
        const nextTime = prev.currentTimestamp + prev.speedMultiplier * 100;
        if (nextTime >= prev.maxTimestamp) {
          return { ...prev, isPlaying: false, currentTimestamp: prev.maxTimestamp };
        }
        return { ...prev, currentTimestamp: nextTime };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [replayState.isPlaying, onReplayStateChange]);

  const replayDate = new Date(replayState.currentTimestamp);
  const minDate = new Date(replayState.minTimestamp);
  const maxDate = new Date(replayState.maxTimestamp);

  const formatReplayDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatReplayTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC';
  };

  // Quick jump to individual days in the 7-day window
  const getDayOffsets = () => {
    const days: { label: string; timestamp: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      days.push({
        label: i === 0 ? 'Today' : `${i}d ago (${d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })})`,
        timestamp: d.getTime()
      });
    }
    return days;
  };

  return (
    <div className={`p-4 md:p-6 space-y-4 select-none ${
      isLightMode ? 'text-[#1d130a]' : 'text-[#efe6d6]'
    }`}>
      {/* 1. Header & Scientific Provenance Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#e8913a] text-lg">⏮️</span>
            <h2 className="text-xl font-serif font-bold text-[#fde047]">
              7-Day Satellite Movement & Orbital Replay
            </h2>
          </div>
          <p className="text-xs font-serif text-[#b5a990] mt-0.5">
            Continuous trajectory replay across the previous 7 days with adaptive simulation stepping
          </p>
        </div>

        {/* Scientific Transparency Notice */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-amber-950/40 border border-amber-500/40 text-[10.5px] font-mono text-amber-200">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>SGP4 Historical Backward Propagation</span>
        </div>
      </div>

      {/* 2. Scientific Data Limitations Documentation Box */}
      <div className="p-3 rounded-[9px] bg-black/40 border border-amber-500/30 text-[11px] font-serif space-y-1 text-[#b5a990]">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Orbital Data Provenance & Propagation Accuracy</span>
        </div>
        <p className="leading-relaxed">
          Historical orbital element archives (such as Space-Track.org / CelesTrak TLE Archives) require authenticated government credentials or licensed credentials for automated historical batch downloads. In accordance with strict scientific accuracy, positions within this 7-day replay are propagated backward using SGP4 celestial mechanics anchored to current epoch ephemeris. Accuracy is within ~1–5 km for LEO spacecraft over a 7-day window.
        </p>
      </div>

      {/* 3. Replay Scrubbing Bar */}
      <div className="p-4 rounded-[12px] bg-gradient-to-r from-[#1b120a] to-[#120c07] border border-[#e8913a]/30 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono">
            <Calendar className="w-4 h-4 text-[#e8913a]" />
            <span className="text-base font-bold text-[#fde047]">{formatReplayDate(replayDate)}</span>
            <span className="text-xs text-[#a5f3fc] bg-black/50 px-2 py-0.5 rounded border border-white/10">
              {formatReplayTime(replayDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#b5a990]">
            <span>ADAPTIVE STEP: </span>
            <span className="text-[#e8913a] font-bold">
              {replayState.adaptiveStepSeconds >= 120 ? '120s (Far > 3500km)' : '10s (Near Approach)'}
            </span>
          </div>
        </div>

        {/* Range Slider Scrubber */}
        <input
          type="range"
          min={replayState.minTimestamp}
          max={replayState.maxTimestamp}
          value={replayState.currentTimestamp}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            onReplayStateChange((prev) => ({ ...prev, currentTimestamp: val, isPlaying: false }));
          }}
          className="w-full accent-[#e8913a] cursor-pointer h-2 bg-black/60 rounded-lg"
          aria-label="Replay Timeline Scrubber"
        />

        {/* Quick Day Jumper Pills */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pt-1">
          {getDayOffsets().map((day, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playClick();
                onReplayStateChange((prev) => ({ ...prev, currentTimestamp: day.timestamp, isPlaying: false }));
              }}
              className="text-[10px] font-mono px-2 py-1 rounded bg-black/40 hover:bg-[#e8913a]/20 border border-white/5 hover:border-[#e8913a]/40 text-[#b5a990] hover:text-white transition-colors whitespace-nowrap"
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Playback Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-[10px] bg-black/50 border border-white/10">
        <div className="flex items-center gap-2">
          {/* Rewind 1 hour */}
          <button
            onClick={() => {
              soundManager.playClick();
              onReplayStateChange((prev) => ({
                ...prev,
                currentTimestamp: Math.max(prev.minTimestamp, prev.currentTimestamp - 3600 * 1000)
              }));
            }}
            className="p-2 rounded-[7px] text-[#b5a990] hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
            aria-label="Rewind 1 Hour"
          >
            <Rewind className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={() => {
              soundManager.bell(880, 0.2, 1.2);
              onReplayStateChange((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] font-serif font-bold text-xs uppercase tracking-wider bg-gradient-to-b from-[#e8913a] via-[#c57922] to-[#994710] text-black border border-[#fde047] shadow-[0_0_12px_rgba(232,145,58,0.4)] hover:brightness-110 transition-all"
            aria-label={replayState.isPlaying ? "Pause Replay" : "Start Replay"}
          >
            {replayState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{replayState.isPlaying ? 'Pause' : 'Play Replay'}</span>
          </button>

          {/* Forward 1 hour */}
          <button
            onClick={() => {
              soundManager.playClick();
              onReplayStateChange((prev) => ({
                ...prev,
                currentTimestamp: Math.min(prev.maxTimestamp, prev.currentTimestamp + 3600 * 1000)
              }));
            }}
            className="p-2 rounded-[7px] text-[#b5a990] hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
            aria-label="Forward 1 Hour"
          >
            <FastForward className="w-4 h-4" />
          </button>

          {/* Reset to Real-Time Present */}
          <button
            onClick={() => {
              soundManager.playClick();
              onReplayStateChange((prev) => ({
                ...prev,
                currentTimestamp: prev.maxTimestamp,
                isPlaying: false
              }));
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-[7px] text-xs font-mono text-[#d4af37] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors ml-2"
            aria-label="Jump to Real Time Present"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Real-Time Present</span>
          </button>
        </div>

        {/* Speed Multipliers */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-[#8a7f6c] uppercase mr-1">Speed:</span>
          {SPEED_PRESETS.map((spd) => (
            <button
              key={spd}
              onClick={() => {
                soundManager.playClick();
                onReplayStateChange((prev) => ({ ...prev, speedMultiplier: spd }));
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                replayState.speedMultiplier === spd
                  ? 'bg-[#fde047] text-black border border-[#fde047]'
                  : 'bg-black/40 text-[#b5a990] border border-white/10 hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
