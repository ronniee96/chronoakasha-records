'use client';

import React, { useState } from 'react';
import { TodayActivityFeedItem, ScientificStatus, FeedItemStatus } from '../../types/today';
import { Radio, ShieldAlert, Sparkles, Clock, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface TodayLiveFeedProps {
  feedItems: TodayActivityFeedItem[];
  onSelectSatellite?: (noradId: number) => void;
  isLightMode: boolean;
}

const STATUS_BADGES: Record<FeedItemStatus, { bg: string; text: string; border: string }> = {
  LIVE: { bg: 'bg-emerald-950/70', text: 'text-emerald-400', border: 'border-emerald-500/40' },
  UPCOMING: { bg: 'bg-amber-950/70', text: 'text-amber-300', border: 'border-amber-500/40' },
  PREDICTED: { bg: 'bg-cyan-950/70', text: 'text-cyan-300', border: 'border-cyan-500/40' },
  HISTORICAL: { bg: 'bg-purple-950/70', text: 'text-purple-300', border: 'border-purple-500/40' }
};

const SCIENTIFIC_BADGES: Record<ScientificStatus, { label: string; color: string }> = {
  'REAL OBSERVATION': { label: 'REAL OBSERVATION (Direct Telemetry)', color: 'text-emerald-400' },
  'ORBITAL PROPAGATION': { label: 'ORBITAL PROPAGATION (SGP4 Model)', color: 'text-cyan-400' },
  'PREDICTION': { label: 'PREDICTION (Calculated Ephemeris)', color: 'text-amber-400' },
  'HISTORICAL RECORD': { label: 'HISTORICAL RECORD (Primary Archival)', color: 'text-purple-400' },
  'SPECULATION': { label: 'THEORETICAL SPECULATION (Unverified)', color: 'text-rose-400' }
};

export function TodayLiveFeed({
  feedItems,
  onSelectSatellite,
  isLightMode
}: TodayLiveFeedProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = feedItems.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  const formatTimestamp = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC';
  };

  return (
    <div className={`p-4 md:p-6 space-y-4 select-none ${
      isLightMode ? 'text-[#1d130a]' : 'text-[#efe6d6]'
    }`}>
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-xl font-serif font-bold text-[#fde047]">
              Today&apos;s Real-Time Space & Historical Feed
            </h2>
          </div>
          <p className="text-xs font-serif text-[#b5a990] mt-0.5">
            Streaming astronomical events, overhead satellite swaths, space mission updates, and anniversary triggers
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-black/40 border border-emerald-500/30 text-[10.5px] font-mono text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>STREAM ACTIVE &bull; 2-Hour Refresh Cycle</span>
        </div>
      </div>

      {/* 2. Status Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: `All Events (${feedItems.length})` },
          { id: 'LIVE', label: `🟢 Live Now (${feedItems.filter(i => i.status === 'LIVE').length})` },
          { id: 'UPCOMING', label: `🟡 Upcoming Passes (${feedItems.filter(i => i.status === 'UPCOMING').length})` },
          { id: 'HISTORICAL', label: `🟣 Historical Milestones (${feedItems.filter(i => i.status === 'HISTORICAL').length})` },
          { id: 'PREDICTED', label: `🔵 Predicted Approximations (${feedItems.filter(i => i.status === 'PREDICTED').length})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => {
              soundManager.playClick();
              setFilterStatus(f.id);
            }}
            className={`px-3 py-1 rounded-[6px] text-xs font-serif font-bold transition-all border whitespace-nowrap ${
              filterStatus === f.id
                ? 'bg-[#e8913a] text-black border-[#fde047] shadow-md'
                : 'bg-black/30 text-[#b5a990] border-white/10 hover:text-white hover:border-[#e8913a]/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3. Feed Items Stream */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const statusStyle = STATUS_BADGES[item.status] || STATUS_BADGES.LIVE;
          const sciMeta = SCIENTIFIC_BADGES[item.scientificCategory] || SCIENTIFIC_BADGES['REAL OBSERVATION'];

          return (
            <div
              key={item.id}
              onClick={() => {
                if (item.satelliteNoradId && onSelectSatellite) {
                  soundManager.bell(880, 0.2, 1.2);
                  onSelectSatellite(item.satelliteNoradId);
                }
              }}
              className={`p-3.5 rounded-[10px] bg-gradient-to-r from-[#170f09] to-[#120c07] border border-[#e8913a]/25 hover:border-[#e8913a]/60 transition-all shadow-md ${
                item.satelliteNoradId ? 'cursor-pointer group' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    {item.status}
                  </span>
                  <span className="font-serif font-bold text-sm text-[#efe6d6] group-hover:text-[#fde047] transition-colors">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#8a7f6c]">
                  <Clock className="w-3 h-3 text-[#e8913a]" />
                  <span>{formatTimestamp(item.timestamp)}</span>
                </div>
              </div>

              <p className="text-xs font-serif text-[#b5a990] leading-relaxed pt-2">
                {item.description}
              </p>

              <div className="pt-2 mt-1 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono">
                <div className="text-[#8a7f6c]">
                  SOURCE: <span className="text-[#efe6d6]">{item.source}</span>
                </div>
                <div className={`font-bold ${sciMeta.color}`}>
                  {sciMeta.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
