'use client';

import React, { useState, useMemo } from 'react';
import { 
  X, Sparkles, Compass, Moon, Sun, ShieldAlert, CheckCircle2, 
  Send, RefreshCw, Calendar, Clock, MapPin, Heart, Briefcase, 
  BookOpen, ChevronRight, HelpCircle, AlertTriangle, Eye, Flame,
  Navigation, Edit3, Check
} from 'lucide-react';
import { 
  RishiMuniBirthInput, 
  RishiMuniReading, 
  calculateRishiMuniReading, 
  askRishiMuni, 
  PRESET_BIRTH_PROFILES 
} from '../../utils/rishiMuniEngine';
import { findLocalCity, resolveGeocode, LOCAL_GEO_DATABASE, GeoLocation } from '../../utils/geoLocator';
import { RishiMuniAvatar } from './RishiMuniAvatar';
import { NorthIndianKundliChart } from './NorthIndianKundliChart';
import { soundManager } from '../../utils/audio';

interface RishiMuniModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export function RishiMuniModal({
  isOpen,
  onClose,
  isLightMode
}: RishiMuniModalProps) {
  // Birth details state
  const [name, setName] = useState<string>('Rohan (जिज्ञासु)');
  const [birthYear, setBirthYear] = useState<number>(2003);
  const [birthMonth, setBirthMonth] = useState<number>(2);
  const [birthDay, setBirthDay] = useState<number>(10);
  const [birthHour, setBirthHour] = useState<number>(9);
  const [birthMinute, setBirthMinute] = useState<number>(40);
  const [city, setCity] = useState<string>('Chandrapur, Maharashtra, India');
  const [latitude, setLatitude] = useState<number>(19.9615);
  const [longitude, setLongitude] = useState<number>(79.2961);
  const [timeZoneOffset, setTimeZoneOffset] = useState<number>(5.5);

  // Geographic Auto-Resolution State
  const [geoSuggestions, setGeoSuggestions] = useState<GeoLocation[]>([]);
  const [isManualCoords, setIsManualCoords] = useState<boolean>(false);
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [geocodeFeedback, setGeocodeFeedback] = useState<string>('✓ Auto-geocoded (NASA JPL VSOP87 precision)');

  // Active view tab in right column
  const [activeTab, setActiveTab] = useState<'oracle' | 'houses' | 'dialogue'>('oracle');
  const [selectedHouse, setSelectedHouse] = useState<number>(1);

  // Handle City Change with Instant 0ms Offline Database + Fallback
  const handleCityChange = async (val: string) => {
    setCity(val);
    if (!val.trim()) {
      setGeoSuggestions([]);
      return;
    }

    // 1. Instant 0ms Local Database Search
    const localMatch = findLocalCity(val);
    if (localMatch) {
      setLatitude(localMatch.latitude);
      setLongitude(localMatch.longitude);
      setTimeZoneOffset(localMatch.timeZoneOffsetHours);
      setGeocodeFeedback(`✓ Resolved: ${localMatch.displayName} (${localMatch.latitude.toFixed(2)}°, ${localMatch.longitude.toFixed(2)}°)`);
    }

    // 2. Generate interactive quick suggestions from 180+ cities
    const qLower = val.toLowerCase().trim();
    const suggestions = Object.values(LOCAL_GEO_DATABASE)
      .filter(loc => 
        loc.city.toLowerCase().includes(qLower) || 
        (loc.state && loc.state.toLowerCase().includes(qLower)) ||
        loc.displayName.toLowerCase().includes(qLower)
      )
      .slice(0, 5);
    setGeoSuggestions(suggestions);

    // 3. If no local match and user typed > 3 chars, debounced geocode query
    if (!localMatch && val.length > 3) {
      setIsGeocoding(true);
      try {
        const resolved = await resolveGeocode(val);
        if (resolved) {
          setLatitude(resolved.latitude);
          setLongitude(resolved.longitude);
          setTimeZoneOffset(resolved.timeZoneOffsetHours);
          setGeocodeFeedback(`✓ Auto-Geocoded: ${resolved.displayName} (${resolved.latitude.toFixed(2)}°, ${resolved.longitude.toFixed(2)}°)`);
        }
      } catch {
        // Fallback
      } finally {
        setIsGeocoding(false);
      }
    }
  };

  const selectSuggestion = (loc: GeoLocation) => {
    soundManager.playClick();
    setCity(loc.displayName);
    setLatitude(loc.latitude);
    setLongitude(loc.longitude);
    setTimeZoneOffset(loc.timeZoneOffsetHours);
    setGeoSuggestions([]);
    setGeocodeFeedback(`✓ Selected: ${loc.displayName}`);
  };

  // Browser GPS Location Auto-Detection
  const handleUseGPS = () => {
    soundManager.playClick();
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      setIsGeocoding(true);
      setGeocodeFeedback('Fetching precise device GPS coordinates...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          // Estimate TZ from lon
          const tz = (lon >= 65 && lon <= 95) ? 5.5 : Math.round((lon / 15) * 2) / 2;
          setTimeZoneOffset(tz);
          setCity(`Device GPS (${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E)`);
          setGeocodeFeedback(`✓ GPS Locked: ${lat.toFixed(4)}°, ${lon.toFixed(4)}°`);
          setIsGeocoding(false);
        },
        () => {
          setGeocodeFeedback('GPS access denied or unavailable. Manual entry active.');
          setIsGeocoding(false);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setGeocodeFeedback('Geolocation API not supported on this browser.');
    }
  };

  // Chat with Rishi Muni
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [isSageThinking, setIsSageThinking] = useState<boolean>(false);
  const [dialogueLog, setDialogueLog] = useState<{
    sender: 'user' | 'rishi';
    headline?: string;
    text: string;
    mantra?: string;
  }[]>([
    {
      sender: 'rishi',
      headline: 'ऋषि मुनि आशीर्वाद • Divine Blessing',
      text: 'कल्याणमस्तु, वत्स! (May auspiciousness be upon you!) I am Rishi Muni. Enter your sacred birth details to unravel your Lagna, the 12 cosmic houses, today\'s planetary movements, your auspicious colors, and the critical colors to avoid today. What does your heart seek to know?',
      mantra: 'ॐ नमो भगवते वासुदेवाय'
    }
  ]);

  // Compute live reading
  const reading: RishiMuniReading = useMemo(() => {
    const input: RishiMuniBirthInput = {
      name,
      birthYear,
      birthMonth,
      birthDay,
      birthHour,
      birthMinute,
      city,
      latitude,
      longitude,
      timeZoneOffsetHours: timeZoneOffset
    };
    return calculateRishiMuniReading(input);
  }, [name, birthYear, birthMonth, birthDay, birthHour, birthMinute, city, latitude, longitude, timeZoneOffset]);

  if (!isOpen) return null;

  const handleApplyPreset = (idx: number) => {
    soundManager.playClick();
    const p = PRESET_BIRTH_PROFILES[idx];
    setCity(p.city);
    setLatitude(p.lat);
    setLongitude(p.lon);
    setTimeZoneOffset(p.tz);
    setBirthYear(p.year);
    setBirthMonth(p.month);
    setBirthDay(p.day);
    setBirthHour(p.hour);
    setBirthMinute(p.minute);
  };

  const handleAskQuestion = (qText: string) => {
    if (!qText.trim()) return;
    soundManager.playClick();
    const q = qText.trim();
    setUserQuestion('');

    setDialogueLog(prev => [...prev, { sender: 'user', text: q }]);
    setIsSageThinking(true);

    setTimeout(() => {
      soundManager.playTempleBell(528);
      const answer = askRishiMuni(reading, q);
      setSelectedHouse(answer.recommendedHouse);
      setDialogueLog(prev => [
        ...prev,
        {
          sender: 'rishi',
          headline: answer.headline,
          text: answer.response,
          mantra: answer.mantra
        }
      ]);
      setIsSageThinking(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 select-none">
      <div className={`relative w-full max-w-6xl max-h-[94vh] rounded-3xl flex flex-col border shadow-[0_0_50px_rgba(232,145,58,0.3)] overflow-hidden transition-all ${
        isLightMode 
          ? 'bg-[#fcf8f2] border-amber-500/40 text-[#1c140d]' 
          : 'bg-[#0a0705] border-amber-600/50 text-[#efe6d6]'
      }`}>
        {/* Top Sacred Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-amber-500/30 bg-gradient-to-r from-[#201107] via-[#140b04] to-[#0a0705]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg shadow-inner">
              🧘‍♂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-black text-[#fde047] tracking-tight">
                  ऋषि मुनि • RISHI MUNI AI
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300">
                  Vedic Astrological Oracle
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#b5a990]">
                Sidereal Rashi & House Placements • Auspicious & Critical Colors • Daily Transit Guidance
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-2 rounded-xl text-[#b5a990] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Rishi Muni Oracle"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Body Grid: 2 Columns */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ================= LEFT COLUMN: BIRTH DATA & KUNDALI (5 COLS) ================= */}
          <div className="lg:col-span-5 space-y-5 flex flex-col">
            {/* Quick Profile Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block tracking-wider">
                Ancient & Modern Birth Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_BIRTH_PROFILES.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPreset(idx)}
                    className="px-2.5 py-1 rounded-lg text-[10.5px] font-mono bg-black/50 hover:bg-amber-500/20 text-[#efe6d6] hover:text-amber-300 border border-white/10 hover:border-amber-500/30 transition-all truncate max-w-[200px]"
                  >
                    {p.label.split('•')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Birth Details Input Bento Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/25 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold text-[#fde047] uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Janma Vivarana (Birth Data)</span>
                </span>
                <span className="text-[10px] font-mono text-[#a5f3fc]">Lahiri Ayanamsa</span>
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-mono text-gray-400 block">Name / Seeker Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10.5px] font-mono text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Birth Date (Y-M-D)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    <input 
                      type="number" 
                      value={birthYear} 
                      onChange={(e) => setBirthYear(+e.target.value)}
                      className="h-8 px-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-center text-white" 
                      placeholder="YYYY"
                    />
                    <input 
                      type="number" 
                      min="1" 
                      max="12" 
                      value={birthMonth} 
                      onChange={(e) => setBirthMonth(+e.target.value)}
                      className="h-8 px-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-center text-white" 
                      placeholder="MM"
                    />
                    <input 
                      type="number" 
                      min="1" 
                      max="31" 
                      value={birthDay} 
                      onChange={(e) => setBirthDay(+e.target.value)}
                      className="h-8 px-1 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-center text-white" 
                      placeholder="DD"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10.5px] font-mono text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Birth Time (24h)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    <input 
                      type="number" 
                      min="0" 
                      max="23" 
                      value={birthHour} 
                      onChange={(e) => setBirthHour(+e.target.value)}
                      className="h-8 px-2 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-center text-white" 
                      placeholder="HH"
                    />
                    <input 
                      type="number" 
                      min="0" 
                      max="59" 
                      value={birthMinute} 
                      onChange={(e) => setBirthMinute(+e.target.value)}
                      className="h-8 px-2 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-center text-white" 
                      placeholder="MM"
                    />
                  </div>
                </div>
              </div>

              {/* City & Coordinates Auto-Geocoding Section */}
              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[10.5px] font-mono text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Birth Location (Auto-Geocodes Offline & Global)</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleUseGPS}
                      className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1"
                      title="Auto-detect current GPS Coordinates"
                    >
                      <Navigation className="w-2.5 h-2.5 text-cyan-400" />
                      <span>GPS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsManualCoords(!isManualCoords)}
                      className={`px-2 py-0.5 rounded text-[9.5px] font-mono border transition-all flex items-center gap-1 ${
                        isManualCoords 
                          ? 'bg-amber-500 text-black font-bold border-amber-400' 
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                      }`}
                      title="Toggle Manual Lat/Lon Entry"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>{isManualCoords ? 'Done' : 'Manual'}</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full h-8 px-3 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                    placeholder="Type city or town (e.g. Chandrapur, Varanasi, London...)"
                  />
                  {isGeocoding && (
                    <div className="absolute right-2.5 top-2 text-[10px] font-mono text-cyan-400 animate-pulse">
                      Resolving...
                    </div>
                  )}

                  {/* Auto-Complete Dropdown Suggestions */}
                  {geoSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-9 z-50 rounded-xl bg-[#140e08] border border-amber-500/40 shadow-2xl p-1.5 space-y-1 backdrop-blur-xl">
                      {geoSuggestions.map((loc, sIdx) => (
                        <div
                          key={sIdx}
                          onClick={() => selectSuggestion(loc)}
                          className="px-3 py-1.5 rounded-lg text-left hover:bg-amber-500/20 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div className="truncate">
                            <span className="text-xs font-mono font-bold text-white group-hover:text-amber-300">
                              {loc.city}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 ml-1.5">
                              {loc.state ? `${loc.state}, ` : ''}{loc.country}
                            </span>
                          </div>
                          <span className="text-[9.5px] font-mono text-cyan-400 shrink-0">
                            {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coordinates Bar & Feedback */}
                {!isManualCoords ? (
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                    <div>Lat: <span className="text-amber-300 font-bold">{latitude.toFixed(4)}°</span></div>
                    <div>Lon: <span className="text-amber-300 font-bold">{longitude.toFixed(4)}°</span></div>
                    <div>TZ: <span className="text-cyan-300 font-bold">UTC{timeZoneOffset >= 0 ? `+${timeZoneOffset}` : timeZoneOffset}</span></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <div>
                      <span className="text-[9.5px] font-mono text-gray-400 block mb-0.5">Latitude (°N)</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={latitude}
                        onChange={(e) => setLatitude(+e.target.value)}
                        className="w-full h-7 px-2 rounded bg-black/70 border border-amber-500/40 text-xs font-mono text-white text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[9.5px] font-mono text-gray-400 block mb-0.5">Longitude (°E)</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={longitude}
                        onChange={(e) => setLongitude(+e.target.value)}
                        className="w-full h-7 px-2 rounded bg-black/70 border border-amber-500/40 text-xs font-mono text-white text-center"
                      />
                    </div>
                    <div>
                      <span className="text-[9.5px] font-mono text-gray-400 block mb-0.5">Timezone (Hrs)</span>
                      <input
                        type="number"
                        step="0.5"
                        value={timeZoneOffset}
                        onChange={(e) => setTimeZoneOffset(+e.target.value)}
                        className="w-full h-7 px-2 rounded bg-black/70 border border-cyan-500/40 text-xs font-mono text-white text-center"
                      />
                    </div>
                  </div>
                )}

                <div className="text-[9.5px] font-mono text-emerald-400/90 truncate">
                  {geocodeFeedback}
                </div>
              </div>
            </div>

            {/* Interactive North Indian Kundali Visualizer */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  लग्न कुण्डली • Interactive North Indian Chart
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Lagna: <b className="text-white">{reading.lagna.sanskritName}</b>
                </span>
              </div>

              <NorthIndianKundliChart
                houses={reading.houses}
                selectedHouse={selectedHouse}
                onSelectHouse={setSelectedHouse}
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN: RISHI MUNI ORACLE & COLORS (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-5 flex flex-col">
            {/* Sage Avatar & Blessing Stage */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#2a160a] via-[#1c0f06] to-[#0c0804] border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center gap-5">
              <RishiMuniAvatar
                isSpeaking={isSageThinking}
                size="md"
                onClick={() => handleAskQuestion('Give me your divine blessing and today’s spiritual guidance.')}
              />

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>Jnana Mudra • ज्ञान मुद्रा</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fde047]">
                  Rishi Muni Speaks
                </h3>
                <p className="text-xs sm:text-sm text-[#efe6d6] font-serif leading-relaxed italic">
                  &ldquo;{reading.rishiBlessing.slice(0, 160)}...&rdquo;
                </p>
                <div className="pt-1 flex flex-wrap gap-2 text-[10.5px] font-mono text-gray-300">
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">Lagna: <b>{reading.lagna.signName}</b></span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">Moon: <b>{reading.chandra.signName} ({reading.chandra.nakshatraName})</b></span>
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">Sun: <b>{reading.surya.signName}</b></span>
                </div>
              </div>
            </div>

            {/* Sub-Tabs: Color Oracle | House Placements | Rishi Dialogue */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('oracle'); }}
                className={`flex-1 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'oracle'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <span>🎨</span>
                <span>Color Oracle & Today&apos;s Forecast</span>
              </button>
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('houses'); }}
                className={`flex-1 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'houses'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <span>🏛️</span>
                <span>12 House Placements</span>
              </button>
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('dialogue'); }}
                className={`flex-1 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'dialogue'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <span>💬</span>
                <span>Ask Rishi Muni AI</span>
              </button>
            </div>

            {/* ================= TAB 1: COLOR ORACLE & TODAY'S FORECAST ================= */}
            {activeTab === 'oracle' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* 1. Auspicious vs Critical Color Banners */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Today's Auspicious / Preference Color */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Today&apos;s Auspicious Color (आज का शुभ रंग)</span>
                      </span>
                      <span className="w-5 h-5 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: reading.colorOracle.todayAuspiciousColor.hex }} />
                    </div>
                    <div className="text-base font-serif font-bold text-emerald-300">
                      {reading.colorOracle.todayAuspiciousColor.colorName}
                    </div>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {reading.colorOracle.todayAuspiciousColor.howToUse}
                    </p>
                    <div className="text-[10px] font-mono text-emerald-400/80 pt-1 border-t border-white/10">
                      Governed by: <b>{reading.colorOracle.todayAuspiciousColor.governingRuler}</b>
                    </div>
                  </div>

                  {/* Today's Critical / Caution Color */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-rose-500/40 space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-rose-400 uppercase flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Today&apos;s Critical Color (आज का वर्ज्य रंग)</span>
                      </span>
                      <span className="w-5 h-5 rounded-full border border-white/20 bg-neutral-900 shadow-md" />
                    </div>
                    <div className="text-base font-serif font-bold text-rose-300">
                      {reading.colorOracle.todayCriticalColor.colorName}
                    </div>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {reading.colorOracle.todayCriticalColor.warningMessage}
                    </p>
                    <div className="text-[10px] font-mono text-rose-400/80 pt-1 border-t border-white/10">
                      Rationale: <b>{reading.colorOracle.todayCriticalColor.avoidReason}</b>
                    </div>
                  </div>
                </div>

                {/* Natal Lucky Color Footnote */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: reading.colorOracle.natalLuckyColor.hex }} />
                    <span className="text-amber-200">
                      Your Natal Power Color: <b>{reading.colorOracle.natalLuckyColor.colorName}</b> ({reading.colorOracle.natalLuckyColor.sanskritName})
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">Lagna Lord: {reading.colorOracle.natalLuckyColor.associatedPlanet}</span>
                </div>

                {/* 2. Today's Probable Events & Daily Transit */}
                <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold text-[#fde047] uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>What Will Probably Happen Today • दैनिक गोचर फल</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300">{reading.dailyForecast.dateFormatted}</span>
                  </div>

                  <p className="text-sm text-[#efe6d6] font-serif leading-relaxed">
                    {reading.dailyForecast.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                      <span className="text-amber-400 font-mono font-bold block">🧠 Mind & Emotions:</span>
                      <p className="text-gray-300 font-sans leading-relaxed">{reading.dailyForecast.mindAndEmotions}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                      <span className="text-cyan-400 font-mono font-bold block">💼 Career & Karma:</span>
                      <p className="text-gray-300 font-sans leading-relaxed">{reading.dailyForecast.careerAndKarma}</p>
                    </div>
                  </div>

                  {/* Timing & Sacred Remedy */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-emerald-300 font-mono font-bold">✨ {reading.dailyForecast.shubhMuhurat}</span>
                      <span className="text-rose-300 font-mono font-bold">⚠️ {reading.dailyForecast.rahuKaal}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <span className="text-amber-300 font-mono font-bold block">🕉️ Rishi Muni&apos;s Daily Remedy (उपाय):</span>
                      <p className="text-amber-100 font-serif italic text-sm">{reading.dailyForecast.sacredRemedy.mantra}</p>
                      <p className="text-[11px] text-gray-300">{reading.dailyForecast.sacredRemedy.meaning}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: 12 HOUSE PLACEMENTS ================= */}
            {activeTab === 'houses' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-[#fde047]">
                      {reading.houses[selectedHouse - 1].significance}
                    </span>
                    <span className="text-xs font-mono text-cyan-300">
                      Sign: {reading.houses[selectedHouse - 1].rashiName} ({reading.houses[selectedHouse - 1].rashiSanskrit})
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-sans">
                    Governed by <b>{reading.houses[selectedHouse - 1].signLord}</b> • Natural Karaka: <b>{reading.houses[selectedHouse - 1].karaka}</b>
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {reading.houses[selectedHouse - 1].planets.length > 0 ? (
                      reading.houses[selectedHouse - 1].planets.map(p => (
                        <span key={p.id} className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                          🪐 {p.name} ({p.rashiDegrees.toFixed(1)}°)
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 font-mono">No direct planets (influenced by Lord {reading.houses[selectedHouse - 1].signLord})</span>
                    )}
                  </div>
                </div>

                {/* Complete 12 Houses Table */}
                <div className="max-h-60 overflow-y-auto rounded-xl border border-white/10 bg-black/40 text-xs font-mono">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase sticky top-0">
                      <tr>
                        <th className="p-2.5">Bhava</th>
                        <th className="p-2.5">Sign & Lord</th>
                        <th className="p-2.5">Occupying Grahas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-gray-300">
                      {reading.houses.map(h => (
                        <tr 
                          key={h.houseNumber} 
                          onClick={() => { soundManager.playClick(); setSelectedHouse(h.houseNumber); }}
                          className={`cursor-pointer hover:bg-white/5 transition-colors ${
                            selectedHouse === h.houseNumber ? 'bg-amber-500/20 text-amber-200' : ''
                          }`}
                        >
                          <td className="p-2.5 font-bold">House {h.houseNumber}</td>
                          <td className="p-2.5">{h.rashiName} ({h.signLord})</td>
                          <td className="p-2.5">
                            {h.planets.map(p => p.name.split(' ')[0]).join(', ') || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================= TAB 3: ASK RISHI MUNI AI DIALOGUE ================= */}
            {activeTab === 'dialogue' && (
              <div className="space-y-4 flex-1 flex flex-col animate-in fade-in duration-200">
                {/* Chat Log Window */}
                <div className="flex-1 max-h-72 overflow-y-auto space-y-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-sans">
                  {dialogueLog.map((msg, mIdx) => (
                    <div 
                      key={mIdx}
                      className={`p-3.5 rounded-2xl space-y-1.5 ${
                        msg.sender === 'user' 
                          ? 'ml-8 bg-amber-500/20 border border-amber-500/40 text-amber-100 text-right' 
                          : 'mr-8 bg-gradient-to-r from-[#20150d] to-[#120d08] border border-amber-500/30 text-[#efe6d6]'
                      }`}
                    >
                      {msg.headline && (
                        <span className="text-[11px] font-mono font-bold text-[#fde047] block">
                          {msg.headline}
                        </span>
                      )}
                      <p className="leading-relaxed font-serif text-sm">
                        {msg.text}
                      </p>
                      {msg.mantra && (
                        <span className="text-[10.5px] font-mono text-cyan-300 block pt-1">
                          🕉️ Remedy Mantra: <b>{msg.mantra}</b>
                        </span>
                      )}
                    </div>
                  ))}

                  {isSageThinking && (
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-300 font-mono text-xs animate-pulse flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>Rishi Muni is consulting your planetary degrees...</span>
                    </div>
                  )}
                </div>

                {/* Instant Query Suggestion Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '🔮 What will happen today?',
                    '🎨 What color should I wear today?',
                    '💼 How is my 10th house career?',
                    '❤️ What does my 7th house say about love?',
                    '💰 How is my wealth and finance?'
                  ].map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleAskQuestion(chip)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-500/20 text-[#b5a990] hover:text-amber-300 border border-white/10 text-[11px] font-mono transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Input Text Bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAskQuestion(userQuestion);
                    }}
                    placeholder="Ask Rishi Muni about houses, colors, career, or today's forecast..."
                    className="flex-1 h-10 px-4 rounded-xl bg-black/60 border border-white/20 text-xs font-mono text-white focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    onClick={() => handleAskQuestion(userQuestion)}
                    disabled={!userQuestion.trim() || isSageThinking}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#e8913a] to-[#d97706] hover:from-[#f59e0b] hover:to-[#ea580c] disabled:opacity-50 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Ask Sage</span>
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
