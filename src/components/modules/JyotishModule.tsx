'use client';

import React, { useState, useMemo } from 'react';
import { 
  Compass, Sparkles, Moon, Sun, ShieldCheck, Heart, 
  BookOpen, Briefcase, GraduationCap, Award, RefreshCw, 
  MapPin, Clock, Calendar, CheckCircle2, AlertTriangle, Layers, ChevronRight
} from 'lucide-react';
import { 
  BirthDetails, 
  generateJyotishReport, 
  calculateAshtakoota,
  JyotishReport,
  AshtakootaResult
} from '../../utils/jyotishEngine';
import { RASHIS, NAKSHATRAS_LIST } from '../../utils/astronomyEngine';
import { soundManager } from '../../utils/audio';

const PRESET_CITIES = [
  { name: 'Ujjain (Avanti • Prime Meridian of Ancient India)', lat: 23.1765, lon: 75.7682, tz: 5.5 },
  { name: 'New Delhi / Indraprastha', lat: 28.6139, lon: 77.2090, tz: 5.5 },
  { name: 'Varanasi / Kashi (Sacred City of Light)', lat: 25.3176, lon: 82.9739, tz: 5.5 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, tz: 5.5 },
  { name: 'Bengaluru', lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { name: 'London (Greenwich Prime Meridian)', lat: 51.5074, lon: -0.1278, tz: 0.0 },
  { name: 'New York', lat: 40.7128, lon: -74.0060, tz: -5.0 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, tz: 9.0 },
];

export function JyotishModule({ isLightMode }: { isLightMode: boolean }) {
  // Birth chart inputs
  const [fullName, setFullName] = useState<string>('Siddhartha (जिज्ञासु)');
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [birthTime, setBirthTime] = useState<string>('12:00');
  const [selectedCityIdx, setSelectedCityIdx] = useState<number>(0);
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'dasha' | 'interpretations' | 'compatibility'>('chart');

  // Compatibility sub-engine inputs
  const [compatPartnerNak, setCompatPartnerNak] = useState<number>(3); // Rohini
  const [compatPartnerRashi, setCompatPartnerRashi] = useState<number>(1); // Taurus

  // Calculate report
  const report: JyotishReport = useMemo(() => {
    const city = PRESET_CITIES[selectedCityIdx];
    const details: BirthDetails = {
      fullName,
      birthDate,
      birthTime,
      birthPlace: city.name,
      latitude: city.lat,
      longitude: city.lon,
      timeZoneOffsetHours: city.tz,
    };
    return generateJyotishReport(details);
  }, [fullName, birthDate, birthTime, selectedCityIdx]);

  // Compatibility result
  const compatibilityResult: AshtakootaResult = useMemo(() => {
    const moon = report.planets.find((p) => p.id === 'moon')!;
    return calculateAshtakoota(
      moon.nakshatraIndex,
      moon.rashiIndex,
      compatPartnerNak,
      compatPartnerRashi
    );
  }, [report, compatPartnerNak, compatPartnerRashi]);

  return (
    <div className={`w-full h-full flex flex-col overflow-y-auto ${
      isLightMode ? 'bg-[#fcf8f0] text-[#1d130a]' : 'bg-[#090B18] text-[#efe6d6]'
    }`}>
      {/* Top Banner */}
      <div className="shrink-0 px-4 sm:px-8 py-5 border-b border-[#C9A45C]/25 bg-gradient-to-r from-[#15132B]/80 via-[#090B18] to-[#15132B]/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/40">
              MODULE 04 • ज्योतिषम्
            </span>
            <span className="text-xs text-[#527FAE] font-serif">Nirayana Vedic Ephemeris (Chitrapaksha)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F1E9D8] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            JYOTISHAM — Janma Kundli & Vedic Astrology Observatory
          </h1>
          <p className="text-xs text-[#B8C4D5] max-w-3xl mt-0.5">
            Calculates high-precision sidereal planetary placements, Lagna (Ascendant), 12 Bhavas, Vimshottari Dasha cycles, and traditional interpretive syntheses rooted in Classical Parashari and Jaimini principles.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-[10px] bg-black/40 border border-[#C9A45C]/30">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('chart'); }}
            className={`px-3 py-1.5 rounded-[7px] text-xs font-serif font-bold transition-all ${
              activeTab === 'chart'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#B86F4E] text-[#090B18] shadow-md'
                : 'text-[#B8C4D5] hover:text-[#F1E9D8] hover:bg-white/5'
            }`}
          >
            Janma Kundli (जन्म कुण्डली)
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('planets'); }}
            className={`px-3 py-1.5 rounded-[7px] text-xs font-serif font-bold transition-all ${
              activeTab === 'planets'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#B86F4E] text-[#090B18] shadow-md'
                : 'text-[#B8C4D5] hover:text-[#F1E9D8] hover:bg-white/5'
            }`}
          >
            Graha Sthiti (ग्रह स्थिति)
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('dasha'); }}
            className={`px-3 py-1.5 rounded-[7px] text-xs font-serif font-bold transition-all ${
              activeTab === 'dasha'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#B86F4E] text-[#090B18] shadow-md'
                : 'text-[#B8C4D5] hover:text-[#F1E9D8] hover:bg-white/5'
            }`}
          >
            Vimshottari Dasha (दशा)
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('interpretations'); }}
            className={`px-3 py-1.5 rounded-[7px] text-xs font-serif font-bold transition-all ${
              activeTab === 'interpretations'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#B86F4E] text-[#090B18] shadow-md'
                : 'text-[#B8C4D5] hover:text-[#F1E9D8] hover:bg-white/5'
            }`}
          >
            Interpretations (फलकथन)
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('compatibility'); }}
            className={`px-3 py-1.5 rounded-[7px] text-xs font-serif font-bold transition-all ${
              activeTab === 'compatibility'
                ? 'bg-gradient-to-r from-[#C9A45C] to-[#B86F4E] text-[#090B18] shadow-md'
                : 'text-[#B8C4D5] hover:text-[#F1E9D8] hover:bg-white/5'
            }`}
          >
            Guna Milan (गुण मिलान)
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
        
        {/* LEFT COLUMN: Input Form & Quick Key Metrics */}
        <div className="space-y-4">
          <div className="p-4 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/30 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#C9A45C]/20 pb-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C9A45C] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C9A45C]" />
                Birth Coordinates & Time
              </span>
              <span className="text-[10px] font-mono text-[#B8C4D5]">Ayanamsa: {report.ayanamsaDegree}°</span>
            </div>

            <div>
              <label className="text-[11px] font-serif text-[#B8C4D5] block mb-1">Full Name (नाम):</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-[6px] bg-black/50 border border-white/10 text-xs font-serif text-[#F1E9D8] focus:border-[#C9A45C] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-serif text-[#B8C4D5] block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C9A45C]" /> Date:
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[6px] bg-black/50 border border-white/10 text-xs font-mono text-[#F1E9D8] focus:border-[#C9A45C] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-serif text-[#B8C4D5] block mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C9A45C]" /> Time:
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[6px] bg-black/50 border border-white/10 text-xs font-mono text-[#F1E9D8] focus:border-[#C9A45C] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-serif text-[#B8C4D5] block mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C9A45C]" /> Birth Location:
              </label>
              <select
                value={selectedCityIdx}
                onChange={(e) => setSelectedCityIdx(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-[6px] bg-black/50 border border-white/10 text-xs font-serif text-[#F1E9D8] focus:border-[#C9A45C] outline-none"
              >
                {PRESET_CITIES.map((c, i) => (
                  <option key={i} value={i} className="bg-[#101014] text-[#F1E9D8]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Astronomical Placements Pill Box */}
          <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#15132B]/70 to-[#090B18] border border-[#C9A45C]/25 space-y-2.5 shadow-lg">
            <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#C9A45C] block">
              Core Astrological Pillars
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Lagna (Ascendant)</span>
                <span className="font-serif font-bold text-[#F1E9D8]">{report.lagnaRashi}</span>
                <span className="text-[10px] font-mono text-[#C9A45C] block">{report.lagnaDegree}° in sign</span>
              </div>
              <div className="p-2.5 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Chandra Rashi (Moon Sign)</span>
                <span className="font-serif font-bold text-[#F1E9D8]">{report.chandraRashi}</span>
                <span className="text-[10px] text-[#527FAE] block">{report.birthNakshatra} (P{report.birthPada})</span>
              </div>
              <div className="p-2.5 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Surya Rashi (Sun Sign)</span>
                <span className="font-serif font-bold text-[#f59e0b]">{report.suryaRashi}</span>
              </div>
              <div className="p-2.5 rounded-[8px] bg-black/40 border border-white/5">
                <span className="text-[10px] text-[#B8C4D5] block">Current Mahadasha</span>
                <span className="font-serif font-bold text-[#D99A43]">{report.currentDasha.mahadasha}</span>
                <span className="text-[10px] text-[#B8C4D5] block">Sub: {report.currentDasha.antardasha}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tab Panes */}
        <div className="min-w-0">

          {/* 1. KUNDLI CHART VIEW (North & South Indian formats) */}
          {activeTab === 'chart' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-[10px] bg-[#15132B]/40 border border-[#C9A45C]/20">
                <span className="text-xs font-serif font-bold text-[#F1E9D8]">
                  Divisional Format: {chartStyle === 'north' ? 'North Indian (Diamond / Chhatra)' : 'South Indian (Square / Rasi)'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setChartStyle('north')}
                    className={`px-2.5 py-1 rounded text-[11px] font-serif font-bold transition-all ${
                      chartStyle === 'north' ? 'bg-[#C9A45C] text-[#090B18]' : 'text-[#B8C4D5] hover:bg-white/10'
                    }`}
                  >
                    North Indian
                  </button>
                  <button
                    onClick={() => setChartStyle('south')}
                    className={`px-2.5 py-1 rounded text-[11px] font-serif font-bold transition-all ${
                      chartStyle === 'south' ? 'bg-[#C9A45C] text-[#090B18]' : 'text-[#B8C4D5] hover:bg-white/10'
                    }`}
                  >
                    South Indian
                  </button>
                </div>
              </div>

              {/* The Interactive Kundli Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {report.houses.map((house) => (
                  <div
                    key={house.houseNumber}
                    className={`p-3.5 rounded-[12px] border transition-all ${
                      house.houseNumber === 1
                        ? 'bg-gradient-to-br from-[#1c183b] to-[#110e24] border-[#C9A45C] shadow-lg ring-1 ring-[#C9A45C]/30'
                        : 'bg-[#101018]/80 border-white/10 hover:border-[#C9A45C]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/5">
                      <span className="font-serif font-bold text-[#C9A45C]">
                        House {house.houseNumber} • {house.rashiSanskrit}
                      </span>
                      <span className="text-[10px] font-mono text-[#B8C4D5]">Lord: {house.signLord}</span>
                    </div>

                    <p className="text-[10.5px] text-[#B8C4D5] font-serif mt-1.5 leading-snug">
                      {house.significance}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/5 min-h-[44px]">
                      {house.planets.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {house.planets.map((p) => (
                            <span
                              key={p.id}
                              className="px-2 py-0.5 rounded text-[10.5px] font-serif font-bold border"
                              style={{ backgroundColor: `${p.color}20`, borderColor: p.color, color: p.color }}
                            >
                              {p.name.split(' ')[0]} {p.isRetrograde ? '(R)' : ''} {p.rashiDegrees.toFixed(0)}°
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-500 italic font-serif">No planets placed (खाली)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. GRAHA STHITI TABLE */}
          {activeTab === 'planets' && (
            <div className="p-4 rounded-[14px] bg-[#15132B]/60 border border-[#C9A45C]/30 overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs font-serif">
                <thead>
                  <tr className="border-b border-[#C9A45C]/30 text-[#C9A45C] uppercase tracking-wider text-[10.5px]">
                    <th className="py-2.5 px-3">Graha (ग्रह)</th>
                    <th className="py-2.5 px-3">Rashi (राशि)</th>
                    <th className="py-2.5 px-3">Longitude in Sign</th>
                    <th className="py-2.5 px-3">Nakshatra (नक्षत्र)</th>
                    <th className="py-2.5 px-3">Pada</th>
                    <th className="py-2.5 px-3">House</th>
                    <th className="py-2.5 px-3">Speed / Motion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {report.planets.map((planet) => {
                    const houseIdx = report.houses.findIndex((h) => h.rashiIndex === planet.rashiIndex) + 1;
                    return (
                      <tr key={planet.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 flex items-center gap-2 font-bold text-[#F1E9D8]">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: planet.color }} />
                          {planet.sanskritName}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#B8C4D5]">{planet.rashiSanskrit} ({planet.rashiName})</td>
                        <td className="py-2.5 px-3 font-mono text-[#F1E9D8]">{planet.rashiDegrees.toFixed(2)}°</td>
                        <td className="py-2.5 px-3 text-[#527FAE] font-semibold">{planet.nakshatraName}</td>
                        <td className="py-2.5 px-3 font-mono">{planet.nakshatraPada}</td>
                        <td className="py-2.5 px-3 font-mono text-[#C9A45C]">Bhava {houseIdx}</td>
                        <td className="py-2.5 px-3">
                          {planet.isRetrograde ? (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950/60 text-red-300 border border-red-800">
                              Retrograde (वक्री)
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-400">Direct (मार्गी)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. VIMSHOTTARI DASHA EXPANDED VIEW */}
          {activeTab === 'dasha' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[12px] bg-gradient-to-r from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#C9A45C] uppercase tracking-wider block">Active Current Period</span>
                  <h3 className="text-lg font-serif font-bold text-[#F1E9D8]">
                    {report.currentDasha.mahadasha} Mahadasha • {report.currentDasha.antardasha} Antardasha
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-[#C9A45C] text-[#090B18]">
                  Vimshottari 120-Yr Cycle
                </span>
              </div>

              <div className="space-y-2">
                {report.vimshottariDasha.map((dasha, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-[10px] border transition-all ${
                      dasha.isCurrent
                        ? 'bg-[#1c183b] border-[#C9A45C] shadow-lg ring-1 ring-[#C9A45C]/40'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif font-bold text-[#F1E9D8] flex items-center gap-2">
                        {dasha.planetSanskrit} ({dasha.planet})
                        {dasha.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#C9A45C] text-[#090B18]">
                            Current Active
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[#C9A45C]">{dasha.yearsDuration} Years Duration</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B8C4D5] mt-1">
                      <span>Start: {dasha.startDate}</span>
                      <span>End: {dasha.endDate}</span>
                    </div>

                    {dasha.antardashas && (
                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <span className="text-[10px] font-serif font-bold text-[#C9A45C] block mb-1.5 uppercase">
                          Antardashas (Sub-Periods within this Mahadasha):
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {dasha.antardashas.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className={`p-1.5 rounded text-[10.5px] border font-serif ${
                                sub.isCurrent
                                  ? 'bg-[#C9A45C]/20 border-[#C9A45C] text-[#F1E9D8] font-bold'
                                  : 'bg-white/5 border-white/5 text-[#B8C4D5]'
                              }`}
                            >
                              <span>{sub.subPlanet}</span>
                              <span className="block text-[9px] font-mono text-gray-400">{sub.startDate.slice(0, 7)} to {sub.endDate.slice(0, 7)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. TRADITIONAL INTERPRETATIONS */}
          {activeTab === 'interpretations' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#C9A45C] border-b border-[#C9A45C]/20 pb-2">
                  <Compass className="w-4 h-4" />
                  <h3 className="text-sm font-serif font-bold uppercase tracking-wider">Ascendant & Constitutional Temperament</h3>
                </div>
                <p className="text-xs text-[#F1E9D8] leading-relaxed font-serif">
                  {report.interpretations.ascendantProfile}
                </p>
              </div>

              <div className="p-4 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#527FAE] border-b border-[#527FAE]/20 pb-2">
                  <Briefcase className="w-4 h-4" />
                  <h3 className="text-sm font-serif font-bold uppercase tracking-wider">Career, Karma & Public Contribution</h3>
                </div>
                <p className="text-xs text-[#F1E9D8] leading-relaxed font-serif">
                  {report.interpretations.careerTendencies}
                </p>
              </div>

              <div className="p-4 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#10b981] border-b border-[#10b981]/20 pb-2">
                  <GraduationCap className="w-4 h-4" />
                  <h3 className="text-sm font-serif font-bold uppercase tracking-wider">Education, Buddhi & Analytical Mind</h3>
                </div>
                <p className="text-xs text-[#F1E9D8] leading-relaxed font-serif">
                  {report.interpretations.educationAndMind}
                </p>
              </div>

              <div className="p-4 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#ec4899] border-b border-[#ec4899]/20 pb-2">
                  <Heart className="w-4 h-4" />
                  <h3 className="text-sm font-serif font-bold uppercase tracking-wider">Relationships, Marriage & Collaborations</h3>
                </div>
                <p className="text-xs text-[#F1E9D8] leading-relaxed font-serif">
                  {report.interpretations.relationshipsAndMarriage}
                </p>
              </div>

              {/* Ethics & Epistemic Disclaimer */}
              <div className="p-3.5 rounded-[10px] bg-black/60 border border-amber-500/30 text-[10.5px] text-[#B8C4D5] leading-relaxed font-serif flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <span>{report.interpretations.disclaimer}</span>
              </div>
            </div>
          )}

          {/* 5. ASHTAKOOTA GUNA MILAN COMPATIBILITY */}
          {activeTab === 'compatibility' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[12px] bg-[#15132B]/60 border border-[#C9A45C]/30 space-y-3">
                <span className="text-xs font-serif font-bold text-[#C9A45C] uppercase tracking-wider block">
                  Compare with Partner Moon Sign & Nakshatra
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-serif text-[#B8C4D5] block mb-1">Partner Moon Nakshatra:</label>
                    <select
                      value={compatPartnerNak}
                      onChange={(e) => setCompatPartnerNak(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-[6px] bg-black/50 border border-white/10 text-xs font-serif text-[#F1E9D8]"
                    >
                      {NAKSHATRAS_LIST.map((nak, idx) => (
                        <option key={idx} value={idx} className="bg-[#101014] text-[#F1E9D8]">
                          {idx + 1}. {nak}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-serif text-[#B8C4D5] block mb-1">Partner Moon Rashi:</label>
                    <select
                      value={compatPartnerRashi}
                      onChange={(e) => setCompatPartnerRashi(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-[6px] bg-black/50 border border-white/10 text-xs font-serif text-[#F1E9D8]"
                    >
                      {RASHIS.map((r) => (
                        <option key={r.index} value={r.index} className="bg-[#101014] text-[#F1E9D8]">
                          {r.sanskrit} ({r.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Ashtakoota Score Card */}
              <div className="p-5 rounded-[14px] bg-gradient-to-r from-[#1c183b] to-[#101018] border border-[#C9A45C]/40 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#C9A45C] uppercase">Ashtakoota Score</span>
                    <h3 className="text-2xl font-serif font-bold text-[#F1E9D8]">
                      {compatibilityResult.totalScore} / {compatibilityResult.maxScore} Gunas
                    </h3>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-serif font-bold bg-[#C9A45C] text-[#090B18]">
                    {compatibilityResult.compatibilityVerdict}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">1. Varna (Spiritual)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.varna.score} / {compatibilityResult.varna.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">2. Vashya (Dominance)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.vashya.score} / {compatibilityResult.vashya.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">3. Tara (Destiny)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.tara.score} / {compatibilityResult.tara.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">4. Yoni (Instinct)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.yoni.score} / {compatibilityResult.yoni.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">5. Graha Maitri</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.grahaMaitri.score} / {compatibilityResult.grahaMaitri.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">6. Gana (Temperament)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.gana.score} / {compatibilityResult.gana.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">7. Bhakoot (Emotional)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.bhakoot.score} / {compatibilityResult.bhakoot.max}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-[#B8C4D5] block text-[10px]">8. Nadi (Physiological)</span>
                    <span className="font-bold text-[#F1E9D8]">{compatibilityResult.nadi.score} / {compatibilityResult.nadi.max}</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-black/50 border border-white/10 text-xs font-serif text-[#B8C4D5] space-y-1">
                  <span className="text-[#C9A45C] font-bold block">Manglik Dosha Assessment:</span>
                  <p>{compatibilityResult.manglikAnalysis}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
