'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { 
  SatelliteRecord, 
  SatelliteLivePosition, 
  SatellitePass, 
  ObserverLocation, 
  ReplayState, 
  TodayActivityFeedItem 
} from '../../types/today';
import { 
  DEFAULT_OBSERVER, 
  getSatelliteLivePosition, 
  predictUpcomingPasses, 
  getAdaptiveStepSeconds 
} from '../../utils/satelliteTracker';
import { TODAY_IN_HISTORY_EVENTS, getHistoricalEventsForDate } from '../../data/todayHistoryData';
import { TodayClockBar, TodayViewTab } from './TodayClockBar';
import { SatellitePassList } from './SatellitePassList';
import { SevenDayReplayControls } from './SevenDayReplayControls';
import { TodayInHistory } from './TodayInHistory';
import { TodayLiveFeed } from './TodayLiveFeed';
import { SpaceImageryArchive } from './SpaceImageryArchive';
import { DataProviderSettingsModal } from '../admin/DataProviderSettingsModal';

// Dynamically loaded for instant rendering and zero UI freeze
const SatelliteMap2D = dynamic(() => import('./SatelliteMap2D').then(m => m.SatelliteMap2D), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 text-center p-6 space-y-2">
      <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
      <span className="text-[11px] font-mono text-amber-300">Loading 2D Satellite Tracking...</span>
    </div>
  )
});
const SatelliteGlobe3D = dynamic(() => import('./SatelliteGlobe3D').then(m => m.SatelliteGlobe3D), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 text-center p-6 space-y-2">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      <span className="text-[11px] font-mono text-cyan-300">Loading 3D Google Earth Globe...</span>
    </div>
  )
});
const SpaceTrackBoxscoreModal = dynamic(() => import('./SpaceTrackBoxscoreModal').then(m => m.SpaceTrackBoxscoreModal), { ssr: false });
const CelesTrakExplorerModal = dynamic(() => import('./CelesTrakExplorerModal').then(m => m.CelesTrakExplorerModal), { ssr: false });
const JplHorizonsModal = dynamic(() => import('./JplHorizonsModal').then(m => m.JplHorizonsModal), { ssr: false });
import { 
  Orbit, 
  Globe, 
  Radio, 
  Calendar, 
  Clock, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Filter, 
  SlidersHorizontal 
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface TodayLivingTimelineProps {
  onClose?: () => void;
  onJumpToChakraEra: (eraIndex: number) => void;
  isLightMode: boolean;
}

export function TodayLivingTimeline({
  onClose,
  onJumpToChakraEra,
  isLightMode
}: TodayLivingTimelineProps) {
  // Navigation and mode state
  const [activeTab, setActiveTab] = useState<TodayViewTab>('overview');
  const [uiMode, setUiMode] = useState<'cinematic' | 'research'>('research');
  const [observer, setObserver] = useState<ObserverLocation>(DEFAULT_OBSERVER);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBoxscoreOpen, setIsBoxscoreOpen] = useState<boolean>(false);
  const [isCelesTrakOpen, setIsCelesTrakOpen] = useState<boolean>(false);
  const [isHorizonsOpen, setIsHorizonsOpen] = useState<boolean>(false);
  const [overviewOrbitalMode, setOverviewOrbitalMode] = useState<'2d' | '3d'>('2d');

  // Satellite data state
  const [rawSatellites, setRawSatellites] = useState<SatelliteRecord[]>([]);
  const [selectedNoradId, setSelectedNoradId] = useState<number | null>(25544); // Default to ISS (ZARYA)
  const [isLoadingSatellites, setIsLoadingSatellites] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // 7-Day Replay state
  const [replayState, setReplayState] = useState<ReplayState>(() => {
    const now = Date.now();
    return {
      isPlaying: false,
      speedMultiplier: 60,
      currentTimestamp: now,
      minTimestamp: now - 7 * 24 * 3600 * 1000,
      maxTimestamp: now,
      adaptiveStepSeconds: 120
    };
  });

  // 1. Fetch satellite TLE data from internal API (cached for 2 hours)
  useEffect(() => {
    let active = true;
    const fetchSatellites = async () => {
      try {
        const res = await fetch('/api/satellites');
        if (!res.ok) throw new Error('API fetch failed');
        const json = await res.json();
        if (active && json.satellites && json.satellites.length > 0) {
          setRawSatellites(json.satellites);
          setIsLoadingSatellites(false);
        }
      } catch (err) {
        if (active) {
          setIsLoadingSatellites(false);
        }
      }
    };

    fetchSatellites();
    return () => { active = false; };
  }, []);

  // 2. Continuous real-time SGP4 orbital propagation (ticks every 3 seconds)
  const [propagationDate, setPropagationDate] = useState<Date>(new Date());
  useEffect(() => {
    if (activeTab === 'replay') return; // In replay mode, replayState.currentTimestamp governs time
    const timer = setInterval(() => {
      setPropagationDate(new Date());
    }, 3000);
    return () => clearInterval(timer);
  }, [activeTab]);

  // Active time for propagation: either real-time or historical replay timestamp
  const effectiveDate = useMemo(() => {
    if (activeTab === 'replay') {
      return new Date(replayState.currentTimestamp);
    }
    return propagationDate;
  }, [activeTab, replayState.currentTimestamp, propagationDate]);

  // 3. Compute live positions for all satellites
  const livePositions = useMemo(() => {
    if (rawSatellites.length === 0) return [];
    const positions: SatelliteLivePosition[] = [];

    for (const sat of rawSatellites) {
      const pos = getSatelliteLivePosition(sat, effectiveDate, observer);
      if (pos) {
        positions.push(pos);
      }
    }
    return positions;
  }, [rawSatellites, effectiveDate, observer]);

  // Compute adaptive replay step when in replay mode
  useEffect(() => {
    if (activeTab !== 'replay' || livePositions.length === 0) return;
    const closestDist = Math.min(...livePositions.map(p => p.groundTrackDistanceKm));
    const step = getAdaptiveStepSeconds(closestDist);
    if (step !== replayState.adaptiveStepSeconds) {
      setReplayState(prev => ({ ...prev, adaptiveStepSeconds: step }));
    }
  }, [activeTab, livePositions, replayState.adaptiveStepSeconds]);

  // 4. Compute upcoming satellite passes (24-hour lookahead)
  const upcomingPasses = useMemo(() => {
    if (rawSatellites.length === 0) return [];
    return predictUpcomingPasses(rawSatellites, observer, new Date(), 24);
  }, [rawSatellites, observer]);

  // 5. Historical events for today
  const todayHistoricalEvents = useMemo(() => {
    const today = new Date();
    return getHistoricalEventsForDate(today.getMonth() + 1, today.getDate());
  }, []);

  // 6. Real-time Activity Feed generation
  const feedItems = useMemo<TodayActivityFeedItem[]>(() => {
    const items: TodayActivityFeedItem[] = [];

    // A. Active satellites currently overhead (elevation > 10 or in pass)
    livePositions
      .filter(p => p.isPassActive || p.elevationDeg >= 15)
      .slice(0, 4)
      .forEach(sat => {
        items.push({
          id: `feed-live-${sat.noradId}`,
          timestamp: new Date(sat.timestamp),
          category: 'satellite-live',
          title: `${sat.name} is Currently Overhead (${sat.elevationDeg.toFixed(0)}° Elev)`,
          description: `Travelling at ${sat.velocityKmS} km/s at an orbital altitude of ${sat.altitudeKm} km. Ground track distance to ${observer.name}: ${sat.groundTrackDistanceKm} km. ${sat.isSunlit ? 'Illuminated by direct sunlight.' : 'In Earth orbital shadow.'}`,
          source: 'NORAD SGP4 Real-Time Propagation',
          status: 'LIVE',
          scientificCategory: 'REAL OBSERVATION',
          satelliteNoradId: sat.noradId
        });
      });

    // B. Upcoming orbital passes in next 6 hours
    upcomingPasses.slice(0, 5).forEach(pass => {
      items.push({
        id: `feed-pass-${pass.id}`,
        timestamp: pass.startTime,
        category: 'space-pass',
        title: `Upcoming Pass: ${pass.satelliteName} (${pass.maxElevationDeg}° Max Elev)`,
        description: `Pass duration ${Math.floor(pass.durationSeconds / 60)}m ${pass.durationSeconds % 60}s. Ground track intersection at ${pass.groundTrackDistanceKm} km distance. ${pass.isOpticallyVisible ? '✨ Optically visible to naked eye!' : 'Sensor/radio frequency telemetry flyby.'}`,
        source: 'ChronoAkasha Orbit Engine & CelesTrak TLEs',
        status: 'UPCOMING',
        scientificCategory: 'PREDICTION',
        satelliteNoradId: pass.noradId
      });
    });

    // C. Today in history anniversaries
    todayHistoricalEvents.slice(0, 4).forEach(hist => {
      items.push({
        id: `feed-hist-${hist.id}`,
        timestamp: new Date(),
        category: 'history',
        title: `Anniversary: ${hist.title} (${hist.yearFormatted})`,
        description: `${hist.description.substring(0, 160)}... Significance: ${hist.historicalSignificance.substring(0, 100)}...`,
        source: hist.primaryReferences[0],
        status: 'HISTORICAL',
        scientificCategory: 'HISTORICAL RECORD',
        historicalEventId: hist.id
      });
    });

    return items;
  }, [livePositions, upcomingPasses, todayHistoricalEvents, observer]);

  // Filtered live positions based on category selector
  const filteredLivePositions = useMemo(() => {
    if (selectedCategoryFilter === 'all') return livePositions;
    return livePositions.filter(p => p.category === selectedCategoryFilter);
  }, [livePositions, selectedCategoryFilter]);

  const selectedSatellite = useMemo(() => {
    return livePositions.find(p => p.noradId === selectedNoradId) || livePositions[0];
  }, [livePositions, selectedNoradId]);

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden select-none transition-colors duration-200 ${
      isLightMode ? 'bg-[#f4ebd9] text-[#1d130a]' : 'bg-[#0a0704] text-[#efe6d6]'
    }`}>
      {/* 1. Dedicated Today Clock & Mode Bar */}
      <TodayClockBar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        observer={observer}
        onObserverChange={(obs) => setObserver(obs)}
        uiMode={uiMode}
        onUiModeToggle={() => setUiMode(prev => prev === 'research' ? 'cinematic' : 'research')}
        isLightMode={isLightMode}
      />

      {/* 2. Main Stage Content Switcher */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto no-scrollbar relative flex flex-col">
        {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
        {activeTab === 'overview' && (
          <div className="flex-1 p-3 md:p-6 space-y-7 max-w-7xl mx-auto w-full">
            {/* 4 Quadrants: How I envision the new experience */}
            <div className="space-y-3 pb-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#efe6d6] tracking-wide flex items-center gap-2">
                  <span>How I envision the new experience</span>
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => { soundManager.bell(880, 0.2, 1.5); setIsHorizonsOpen(true); }}
                    className="px-2.5 py-1 rounded-lg border border-[#0284c7]/50 hover:border-[#38bdf8] bg-[#0284c7]/15 hover:bg-[#0284c7]/25 text-[#7dd3fc] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    title="Query NASA JPL Horizons Planetary & Asteroid Ephemerides"
                  >
                    <Orbit className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>JPL HORIZONS (PLANETS & NEOS)</span>
                  </button>
                  <button
                    onClick={() => { soundManager.bell(880, 0.15, 1.2); setIsCelesTrakOpen(true); }}
                    className="px-2.5 py-1 rounded-lg border border-[#a855f7]/50 hover:border-[#d8b4fe] bg-[#a855f7]/15 hover:bg-[#a855f7]/25 text-[#d8b4fe] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    title="Browse Live CelesTrak Satellite Catalog (8 Groups & TLEs)"
                  >
                    <Orbit className="w-3.5 h-3.5 text-[#c084fc]" />
                    <span>CELESTRAK CATALOG (8 GROUPS)</span>
                  </button>
                  <button
                    onClick={() => { soundManager.bell(880, 0.15, 1.2); setIsBoxscoreOpen(true); }}
                    className="px-2.5 py-1 rounded-lg border border-[#38bdf8]/50 hover:border-[#a5f3fc] bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#a5f3fc] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    title="Open Space-Track 18th SDS Global Satellite & Debris Boxscore"
                  >
                    <Radio className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>ORBITAL BOXSCORE (71,365 OBJECTS)</span>
                  </button>
                  <button
                    onClick={() => { soundManager.playClick(); setIsSettingsOpen(true); }}
                    className="px-2.5 py-1 rounded-lg border border-[#e8913a]/50 hover:border-[#fde047] bg-[#e8913a]/15 hover:bg-[#e8913a]/25 text-[#fde047] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    title="Open Administrator Data Providers Management"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>SETTINGS → DATA PROVIDERS</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Live Earth */}
                <div
                  onClick={() => { soundManager.bell(880, 0.15, 1.2); setActiveTab('globe3d'); }}
                  className="group cursor-pointer rounded-2xl border border-white/10 hover:border-[#38bdf8]/60 overflow-hidden bg-[#0c0f17] shadow-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.25)] flex flex-col"
                >
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-black">
                    <Image
                      src="/assets/today_envision/01_live_earth.jpg"
                      alt="1. Live Earth"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-[10px] font-mono text-[#38bdf8] backdrop-blur-md">
                      3D ORBITAL SIMULATION
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-base font-sans font-bold text-[#efe6d6] group-hover:text-[#38bdf8] transition-colors">
                      1. Live Earth
                    </h3>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Satellites, orbital paths, current positions and overhead passes.
                    </p>
                  </div>
                </div>

                {/* 2. Seven-day replay */}
                <div
                  onClick={() => { soundManager.bell(880, 0.15, 1.2); setActiveTab('replay'); }}
                  className="group cursor-pointer rounded-2xl border border-white/10 hover:border-[#10b981]/60 overflow-hidden bg-[#0c1310] shadow-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] flex flex-col"
                >
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-black">
                    <Image
                      src="/assets/today_envision/02_seven_day_replay.jpg"
                      alt="2. Seven-day replay"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-[10px] font-mono text-[#10b981] backdrop-blur-md">
                      HISTORICAL ORBITAL TRACKS
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-base font-sans font-bold text-[#efe6d6] group-hover:text-[#10b981] transition-colors">
                      2. Seven-day replay
                    </h3>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Rewind and observe satellite movements from previous days.
                    </p>
                  </div>
                </div>

                {/* 3. On this day */}
                <div
                  onClick={() => { soundManager.bell(880, 0.15, 1.2); setActiveTab('history'); }}
                  className="group cursor-pointer rounded-2xl border border-white/10 hover:border-[#fde047]/60 overflow-hidden bg-[#16130b] shadow-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(253,224,71,0.25)] flex flex-col"
                >
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-black">
                    <Image
                      src="/assets/today_envision/03_on_this_day.jpg"
                      alt="3. On this day"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-[10px] font-mono text-[#fde047] backdrop-blur-md">
                      ASTRONOMY & ANNIVERSARIES
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-base font-sans font-bold text-[#efe6d6] group-hover:text-[#fde047] transition-colors">
                      3. On this day
                    </h3>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Historical events, discoveries and anniversaries.
                    </p>
                  </div>
                </div>

                {/* 4. Living timeline */}
                <div
                  onClick={() => { soundManager.bell(880, 0.15, 1.2); setActiveTab('feed'); }}
                  className="group cursor-pointer rounded-2xl border border-white/10 hover:border-[#e8913a]/60 overflow-hidden bg-[#160f0a] shadow-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,145,58,0.25)] flex flex-col"
                >
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-black">
                    <Image
                      src="/assets/today_envision/04_living_timeline.jpg"
                      alt="4. Living timeline"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-[10px] font-mono text-[#e8913a] backdrop-blur-md">
                      MUSEUM-GRADE PANORAMA
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-base font-sans font-bold text-[#efe6d6] group-hover:text-[#e8913a] transition-colors">
                      4. Living timeline
                    </h3>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      Connect the past, present and future in one experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Grid: Interactive 2D Map / 3D Google Earth Preview & Selected Satellite Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Orbital Tracking View (8 Cols) */}
              <div className="lg:col-span-8 rounded-[14px] overflow-hidden border border-[#e8913a]/30 shadow-2xl relative h-[420px] sm:h-[480px] flex flex-col bg-black">
                <div className="absolute top-2.5 right-2.5 z-[500] flex items-center gap-1.5 flex-wrap">
                  {/* In-Card 2D vs 3D Switcher */}
                  <div className="inline-flex rounded-md bg-black/80 border border-white/20 p-0.5 backdrop-blur-md">
                    <button
                      onClick={() => { soundManager.playClick(); setOverviewOrbitalMode('2d'); }}
                      className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono transition-colors flex items-center gap-1 ${
                        overviewOrbitalMode === '2d' 
                          ? 'bg-[#e8913a] text-black font-bold shadow' 
                          : 'text-[#b5a990] hover:text-white'
                      }`}
                    >
                      <span>2D Map</span>
                    </button>
                    <button
                      onClick={() => { soundManager.playClick(); setOverviewOrbitalMode('3d'); }}
                      className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono transition-colors flex items-center gap-1 ${
                        overviewOrbitalMode === '3d' 
                          ? 'bg-[#0284c7] text-white font-bold shadow' 
                          : 'text-[#b5a990] hover:text-white'
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      <span>3D Globe</span>
                    </button>
                  </div>

                  {/* Expand Full Screen */}
                  <button
                    onClick={() => setActiveTab(overviewOrbitalMode === '2d' ? 'map2d' : 'globe3d')}
                    className="px-2.5 py-1 rounded-[6px] text-[10.5px] font-serif font-bold text-white bg-black/75 hover:bg-black/95 border border-white/20 transition-colors flex items-center gap-1 shadow"
                    aria-label="Expand Full Screen"
                  >
                    <span>Full Screen</span>
                    <ArrowRight className="w-3 h-3 text-[#fde047]" />
                  </button>
                </div>

                {overviewOrbitalMode === '2d' ? (
                  <SatelliteMap2D
                    satellites={filteredLivePositions}
                    selectedNoradId={selectedNoradId}
                    onSelectSatellite={(id) => setSelectedNoradId(id)}
                    observer={observer}
                    isLightMode={isLightMode}
                  />
                ) : (
                  <SatelliteGlobe3D
                    satellites={filteredLivePositions}
                    selectedNoradId={selectedNoradId}
                    onSelectSatellite={(id) => setSelectedNoradId(id)}
                    observer={observer}
                    isLightMode={isLightMode}
                  />
                )}
              </div>

              {/* Selected Satellite Live Telemetry Card (4 Cols) */}
              <div className="lg:col-span-4 rounded-[14px] bg-gradient-to-b from-[#18110b] via-[#110c08] to-[#1a120c] border border-[#e8913a]/35 shadow-2xl p-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Orbit className="w-4 h-4 text-[#e8913a] animate-spin" style={{ animationDuration: '10s' }} />
                      <span className="font-serif font-bold text-base text-[#fde047]">
                        {selectedSatellite ? selectedSatellite.name : 'Satellite Telemetry'}
                      </span>
                    </div>
                    {selectedSatellite && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#6fb0b2] border border-[#6fb0b2]/30">
                        NORAD {selectedSatellite.noradId}
                      </span>
                    )}
                  </div>

                  {selectedSatellite ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 rounded bg-black/40 border border-white/5">
                          <span className="text-[9.5px] text-[#8a7f6c] block">LATITUDE</span>
                          <span className="text-[#efe6d6] font-bold">{selectedSatellite.latitude}°</span>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/5">
                          <span className="text-[9.5px] text-[#8a7f6c] block">LONGITUDE</span>
                          <span className="text-[#efe6d6] font-bold">{selectedSatellite.longitude}°</span>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/5">
                          <span className="text-[9.5px] text-[#8a7f6c] block">ALTITUDE</span>
                          <span className="text-[#fde047] font-bold">{selectedSatellite.altitudeKm} km</span>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/5">
                          <span className="text-[9.5px] text-[#8a7f6c] block">VELOCITY</span>
                          <span className="text-[#a5f3fc] font-bold">{selectedSatellite.velocityKmS} km/s</span>
                        </div>
                      </div>

                      {/* Observer Relative Look Angles */}
                      <div className="p-3 rounded-[9px] bg-black/50 border border-[#e8913a]/30 space-y-1.5 text-xs font-mono">
                        <span className="text-[10px] font-bold text-[#e8913a] uppercase block">
                          Relative to {observer.name}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-[#b5a990]">ELEVATION:</span>
                          <span className={`font-bold ${selectedSatellite.elevationDeg >= 10 ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {selectedSatellite.elevationDeg}° {selectedSatellite.elevationDeg >= 10 ? '(Over Horizon)' : '(Below Horizon)'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#b5a990]">AZIMUTH:</span>
                          <span className="text-[#efe6d6] font-bold">{selectedSatellite.azimuthDeg}°</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#b5a990]">GROUND DISTANCE:</span>
                          <span className="text-[#6fb0b2] font-bold">{selectedSatellite.groundTrackDistanceKm} km</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#b5a990]">ILLUMINATION:</span>
                          <span className={selectedSatellite.isSunlit ? 'text-amber-300 font-bold' : 'text-slate-400 font-bold'}>
                            {selectedSatellite.isSunlit ? '☀️ Direct Sunlight' : '🌑 Orbital Shadow'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-[#8a7f6c] text-xs font-serif">
                      Select any satellite on the map to inspect live ephemeris
                    </div>
                  )}
                </div>

                {/* Satellite Category Switcher */}
                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono text-[#8a7f6c] uppercase block">
                    Filter Displayed Satellites:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'all', label: 'All (224)' },
                      { id: 'space-stations', label: 'Stations' },
                      { id: 'earth-observation', label: 'Earth Obs' },
                      { id: 'scientific', label: 'Science' },
                      { id: 'navigation-comms', label: 'Navigation' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategoryFilter(cat.id)}
                        className={`text-[9.5px] font-mono px-2 py-0.5 rounded transition-colors ${
                          selectedCategoryFilter === cat.id
                            ? 'bg-[#e8913a] text-black font-bold'
                            : 'bg-black/40 text-[#b5a990] hover:text-white border border-white/5'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Today in History Highlights & Upcoming Passes Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Highlight 1: On This Day in History */}
              <div className="p-4 rounded-[14px] bg-gradient-to-b from-[#18110b] via-[#120d08] to-[#1a120c] border border-[rgba(232,145,58,0.3)] shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e8913a]">📜</span>
                    <h3 className="font-serif font-bold text-base text-[#fde047]">
                      On This Day in History Highlights
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-[11px] font-serif font-bold text-[#e8913a] hover:text-[#fde047] flex items-center gap-1 transition-colors"
                  >
                    <span>View All ({todayHistoricalEvents.length})</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {todayHistoricalEvents.slice(0, 2).map((hist) => (
                    <div key={hist.id} className="p-3 rounded-[9px] bg-black/40 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#fde047] font-bold">{hist.yearFormatted}</span>
                        <span className="text-[10px] text-[#6fb0b2]">{hist.civilization}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#efe6d6] leading-snug">
                        {hist.title}
                      </h4>
                      <p className="text-[11px] font-serif text-[#b5a990] line-clamp-2 leading-relaxed">
                        {hist.description}
                      </p>
                      {hist.chakraEraIndex !== undefined && (
                        <button
                          onClick={() => {
                            soundManager.bell(880, 0.2, 1.8);
                            onJumpToChakraEra(hist.chakraEraIndex!);
                          }}
                          className="text-[10px] font-serif font-bold text-[#e8913a] hover:text-white flex items-center gap-1 pt-1"
                        >
                          <Compass className="w-3 h-3" />
                          <span>Jump to Kalachakra Wheel Era</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight 2: Next Overhead Passes */}
              <div className="p-4 rounded-[14px] bg-gradient-to-b from-[#18110b] via-[#120d08] to-[#1a120c] border border-[rgba(232,145,58,0.3)] shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e8913a]">🛰️</span>
                    <h3 className="font-serif font-bold text-base text-[#fde047]">
                      Next Flybys over {observer.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('passes')}
                    className="text-[11px] font-serif font-bold text-[#e8913a] hover:text-[#fde047] flex items-center gap-1 transition-colors"
                  >
                    <span>View Schedule</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {upcomingPasses.slice(0, 3).map((pass) => (
                    <div 
                      key={pass.id} 
                      onClick={() => {
                        soundManager.bell(880, 0.2, 1.2);
                        setSelectedNoradId(pass.noradId);
                      }}
                      className="p-3 rounded-[9px] bg-black/40 border border-white/5 space-y-1 hover:border-[#e8913a]/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#fde047] font-bold">{pass.satelliteName}</span>
                        <span className="text-[#e8913a] font-bold">
                          {pass.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#b5a990]">
                        <span>Peak: {pass.maxElevationDeg}° Elev</span>
                        <span>Dist: {pass.groundTrackDistanceKm} km</span>
                        <span className={pass.isOpticallyVisible ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          {pass.isOpticallyVisible ? '✨ Naked-Eye' : 'Sensor Swath'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL 2D EARTH TRACKING MAP */}
        {activeTab === 'map2d' && (
          <div className="flex-1 w-full h-full min-h-[500px]">
            <SatelliteMap2D
              satellites={filteredLivePositions}
              selectedNoradId={selectedNoradId}
              onSelectSatellite={(id) => setSelectedNoradId(id)}
              observer={observer}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {/* TAB 3: 3D ORBITAL GLOBE */}
        {activeTab === 'globe3d' && (
          <div className="flex-1 w-full h-full min-h-[500px]">
            <SatelliteGlobe3D
              satellites={filteredLivePositions}
              selectedNoradId={selectedNoradId}
              onSelectSatellite={(id) => setSelectedNoradId(id)}
              observer={observer}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {/* TAB 4: UPCOMING PASSES */}
        {activeTab === 'passes' && (
          <div className="flex-1 w-full max-w-5xl mx-auto">
            <SatellitePassList
              passes={upcomingPasses}
              observer={observer}
              onSelectSatellite={(id) => {
                setSelectedNoradId(id);
                setActiveTab('map2d');
              }}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {/* TAB 5: 7-DAY REPLAY */}
        {activeTab === 'replay' && (
          <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col space-y-4 p-3 md:p-6">
            <SevenDayReplayControls
              replayState={replayState}
              onReplayStateChange={setReplayState}
              satellites={filteredLivePositions}
              selectedNoradId={selectedNoradId}
              onSelectSatellite={(id) => setSelectedNoradId(id)}
              isLightMode={isLightMode}
            />
            {/* Replay 2D Map Canvas */}
            <div className="rounded-[14px] overflow-hidden border border-[#e8913a]/30 shadow-2xl h-[420px] flex-1">
              <SatelliteMap2D
                satellites={filteredLivePositions}
                selectedNoradId={selectedNoradId}
                onSelectSatellite={(id) => setSelectedNoradId(id)}
                observer={observer}
                isLightMode={isLightMode}
              />
            </div>
          </div>
        )}

        {/* TAB 6: ON THIS DAY IN HISTORY */}
        {activeTab === 'history' && (
          <div className="flex-1 w-full max-w-6xl mx-auto">
            <TodayInHistory
              events={todayHistoricalEvents}
              onJumpToChakraEra={onJumpToChakraEra}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {/* TAB 7: LIVE ACTIVITY FEED */}
        {activeTab === 'feed' && (
          <div className="flex-1 w-full max-w-4xl mx-auto">
            <TodayLiveFeed
              feedItems={feedItems}
              onSelectSatellite={(id) => {
                setSelectedNoradId(id);
                setActiveTab('map2d');
              }}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {/* TAB 8: SPACE IMAGERY ARCHIVE (Earth Observations & Spacecraft Photos) */}
        {activeTab === 'imagery' && (
          <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-6">
            <SpaceImageryArchive isLightMode={isLightMode} />
          </div>
        )}
      </div>

      {/* Administrator Data Providers Modal */}
      <DataProviderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isLightMode={isLightMode}
      />

      {/* Space-Track 18th SDS Satellite Boxscore Modal */}
      <SpaceTrackBoxscoreModal
        isOpen={isBoxscoreOpen}
        onClose={() => setIsBoxscoreOpen(false)}
        isLightMode={isLightMode}
      />

      {/* CelesTrak 8-Group Satellite Catalog Modal */}
      <CelesTrakExplorerModal
        isOpen={isCelesTrakOpen}
        onClose={() => setIsCelesTrakOpen(false)}
        onSelectSatellite={(noradId) => {
          setSelectedNoradId(noradId);
          if (activeTab !== 'globe3d' && activeTab !== 'map2d') {
            setActiveTab('globe3d');
          }
        }}
        isLightMode={isLightMode}
      />

      {/* NASA JPL Horizons Planetary & Asteroid Ephemeris Modal */}
      <JplHorizonsModal
        isOpen={isHorizonsOpen}
        onClose={() => setIsHorizonsOpen(false)}
        isLightMode={isLightMode}
      />
    </div>
  );
}
