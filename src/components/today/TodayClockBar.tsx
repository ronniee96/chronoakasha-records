'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Globe, MapPin, Compass, Sparkles, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { ObserverLocation } from '../../types/today';
import { POPULAR_OBSERVERS } from '../../utils/satelliteTracker';
import { soundManager } from '../../utils/audio';

export type TodayViewTab = 
  | 'overview' 
  | 'map2d' 
  | 'globe3d' 
  | 'imagery'
  | 'passes' 
  | 'replay' 
  | 'history' 
  | 'feed';

interface TodayClockBarProps {
  activeTab: TodayViewTab;
  onTabChange: (tab: TodayViewTab) => void;
  observer: ObserverLocation;
  onObserverChange: (obs: ObserverLocation) => void;
  uiMode: 'cinematic' | 'research';
  onUiModeToggle: () => void;
  isLightMode: boolean;
}

export function TodayClockBar({
  activeTab,
  onTabChange,
  observer,
  onObserverChange,
  uiMode,
  onUiModeToggle,
  isLightMode
}: TodayClockBarProps) {
  const [time, setTime] = useState<Date>(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('local');
  const [isObserverMenuOpen, setIsObserverMenuOpen] = useState<boolean>(false);

  // Live 1-second clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Time zone conversions
  const getFormattedTime = (tz: string) => {
    try {
      if (tz === 'local') {
        return time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      if (tz === 'UTC') {
        return time.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      return time.toLocaleTimeString('en-US', { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return time.toLocaleTimeString();
    }
  };

  const getUtcString = () => {
    return time.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  };

  // Day number and year progress
  const startOfYear = new Date(Date.UTC(time.getUTCFullYear(), 0, 1));
  const diffTime = time.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const isLeap = (time.getFullYear() % 4 === 0 && time.getFullYear() % 100 !== 0) || (time.getFullYear() % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const yearProgressPercent = ((dayOfYear / totalDays) * 100).toFixed(1);

  // Time elapsed since midnight local
  const midnight = new Date(time);
  midnight.setHours(0, 0, 0, 0);
  const msSinceMidnight = time.getTime() - midnight.getTime();
  const hoursSinceMidnight = Math.floor(msSinceMidnight / (1000 * 60 * 60));
  const minsSinceMidnight = Math.floor((msSinceMidnight % (1000 * 60 * 60)) / (1000 * 60));
  const secsSinceMidnight = Math.floor((msSinceMidnight % (1000 * 60)) / 1000);
  const elapsedString = `${String(hoursSinceMidnight).padStart(2, '0')}h ${String(minsSinceMidnight).padStart(2, '0')}m ${String(secsSinceMidnight).padStart(2, '0')}s`;

  // Full calendar date string
  const fullDateString = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`w-full px-3 md:px-6 py-2.5 border-b select-none transition-colors duration-200 ${
      isLightMode 
        ? 'bg-[#f4ebd9]/95 border-[#c59b27]/30 text-[#1d130a]' 
        : 'bg-gradient-to-r from-[#140e09]/95 via-[#0e0906]/95 to-[#140e09]/95 border-[rgba(232,145,58,0.25)] text-[#efe6d6]'
    } backdrop-blur-xl shadow-lg relative z-30`}>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* 1. Date & Live Clocks */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
          {/* Calendar Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-black/40 border border-[#e8913a]/30 shadow-inner">
            <span className="text-[#e8913a] text-sm animate-pulse">❖</span>
            <div>
              <span className="text-[12px] sm:text-[13px] font-serif font-bold text-[#fde047] block tracking-wide">
                {fullDateString}
              </span>
              <span className="text-[10px] font-mono text-[#b5a990] block">
                {getUtcString()}
              </span>
            </div>
          </div>

          {/* Live Chronometer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-gradient-to-r from-[#21160e] to-[#120d09] border border-[#e8913a]/40 shadow-md">
            <Clock className="w-3.5 h-3.5 text-[#e8913a]" />
            <div className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-[#ffffff] drop-shadow-[0_0_8px_rgba(232,145,58,0.4)]">
              {getFormattedTime(selectedTimeZone)}
            </div>
            
            {/* Time Zone Selector Dropdown */}
            <select
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.target.value)}
              className="bg-black/60 text-[#d4af37] text-[10px] font-mono rounded px-1.5 py-0.5 border border-[#e8913a]/30 focus:outline-none cursor-pointer"
              aria-label="Select Timezone"
            >
              <option value="local">LOCAL</option>
              <option value="UTC">UTC (0°)</option>
              <option value="Asia/Kolkata">IST (+5:30)</option>
              <option value="America/New_York">EST (-5:00)</option>
              <option value="America/Los_Angeles">PST (-8:00)</option>
              <option value="Europe/London">GMT / BST</option>
              <option value="Europe/Paris">CET (+1:00)</option>
              <option value="Asia/Tokyo">JST (+9:00)</option>
            </select>
          </div>

          {/* Day of Year & Midnight Elapsed Telemetry */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-[8px] bg-black/30 border border-white/5 text-[10.5px] font-mono text-[#b5a990]">
            <div>
              <span className="text-[#e8913a] font-bold">DAY {dayOfYear}</span>
              <span className="opacity-60">/{totalDays}</span>
              <span className="ml-1 text-[9.5px] text-[#6fb0b2]">({yearProgressPercent}%)</span>
            </div>
            <span className="opacity-30">|</span>
            <div>
              <span className="opacity-70">SINCE 00:00: </span>
              <span className="text-[#efe6d6] font-bold">{elapsedString}</span>
            </div>
          </div>
        </div>

        {/* 2. Observer Location & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Observer Location Pill */}
          <div className="relative">
            <button
              onClick={() => setIsObserverMenuOpen(!isObserverMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-[7px] bg-[#1a120b] hover:bg-[#261a10] border border-[#e8913a]/40 text-[11px] font-serif text-[#d4af37] transition-all shadow-sm"
              aria-label="Observer Ground Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#e8913a]" />
              <span className="truncate max-w-[160px] sm:max-w-[200px]">{observer.name}</span>
            </button>

            {/* Observer Dropdown Menu */}
            {isObserverMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 rounded-[10px] bg-[#160f0a] border border-[#e8913a]/50 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95">
                <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-[#e8913a] px-2 py-1 block border-b border-white/10 mb-1">
                  Select Ground Observer Coordinates
                </span>
                <div className="space-y-1 max-h-56 overflow-y-auto no-scrollbar">
                  {POPULAR_OBSERVERS.map((obs, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playClick();
                        onObserverChange(obs);
                        setIsObserverMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded text-[11px] font-serif transition-colors flex flex-col ${
                        obs.name === observer.name
                          ? 'bg-[#e8913a]/25 text-[#fde047] border border-[#e8913a]/40 font-bold'
                          : 'text-[#b5a990] hover:text-[#ffffff] hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate">{obs.name}</span>
                      <span className="text-[9.5px] font-mono text-[#8a7f6c]">
                        {obs.latitude.toFixed(2)}° N, {obs.longitude.toFixed(2)}° E
                      </span>
                    </button>
                  ))}
                </div>

                {/* Browser Geolocation Button */}
                {typeof window !== 'undefined' && 'geolocation' in navigator && (
                  <button
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          onObserverChange({
                            name: 'My Real-Time Position (GPS Geolocation)',
                            latitude: parseFloat(pos.coords.latitude.toFixed(4)),
                            longitude: parseFloat(pos.coords.longitude.toFixed(4)),
                            altitudeMeters: Math.round(pos.coords.altitude || 50)
                          });
                          setIsObserverMenuOpen(false);
                          soundManager.bell(880, 0.2, 1.5);
                        },
                        (err) => alert(`Geolocation error: ${err.message}`)
                      );
                    }}
                    className="w-full mt-2 py-1.5 text-center text-[10px] font-mono font-bold text-[#6fb0b2] bg-[#6fb0b2]/10 hover:bg-[#6fb0b2]/20 border border-[#6fb0b2]/30 rounded transition-colors"
                  >
                    📍 Use My Browser GPS Location
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Research vs Cinematic Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onUiModeToggle();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-[7px] text-[10.5px] font-serif font-bold uppercase tracking-wider transition-all border ${
              uiMode === 'research'
                ? 'bg-[#6fb0b2]/20 text-[#a5f3fc] border-[#6fb0b2]/50 shadow-[0_0_10px_rgba(111,176,178,0.3)]'
                : 'bg-black/30 text-[#b5a990] border-white/10 hover:text-white'
            }`}
            aria-label="Toggle Telemetry Research Mode"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{uiMode === 'research' ? 'Research Mode' : 'Cinematic'}</span>
          </button>
        </div>
      </div>

      {/* 3. Navigation View Mode Sub-tabs */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar pt-2.5 border-t border-white/5 mt-2.5">
        {[
          { id: 'overview', label: 'Overview & Highlights', icon: '✦' },
          { id: 'globe3d', label: '3D Orbital Globe', icon: '🌐' },
          { id: 'map2d', label: '2D Earth Tracking Map', icon: '🗺️' },
          { id: 'imagery', label: 'Space Imagery Archive', icon: '📸' },
          { id: 'passes', label: 'Upcoming Passes', icon: '🛰️' },
          { id: 'replay', label: '7-Day Satellite Replay', icon: '⏮️' },
          { id: 'history', label: 'On This Day in History', icon: '📜' },
          { id: 'feed', label: 'Live Activity Feed', icon: '📡' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                onTabChange(tab.id as TodayViewTab);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[11px] font-serif font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-b from-[#e8913a] to-[#a85817] text-[#0d0a08] border-[#fde047] shadow-[0_0_10px_rgba(232,145,58,0.4)] font-extrabold'
                  : isLightMode
                  ? 'text-[#5c4a38] border-transparent hover:bg-black/5 hover:text-[#1d130a]'
                  : 'text-[#b5a990] border-transparent hover:border-[#e8913a]/30 hover:text-[#efe6d6] hover:bg-white/5'
              }`}
              aria-label={tab.label}
            >
              <span className="text-xs">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
