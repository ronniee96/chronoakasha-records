'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Orbit, Sparkles, Compass } from 'lucide-react';
import { calculateAllPlanets, getLahiriAyanamsa, PlanetEphemeris } from '../../utils/astronomyEngine';
import { soundManager } from '../../utils/audio';

interface GrahaModuleProps {
  isLightMode?: boolean;
}

export function GrahaModule({ isLightMode }: GrahaModuleProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'geocentric' | 'heliocentric'>('geocentric');
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string>('sun');

  // Calculate live planetary ephemeris
  const planets: PlanetEphemeris[] = useMemo(() => {
    return calculateAllPlanets(currentDate);
  }, [currentDate]);

  const ayanamsaDeg = useMemo(() => {
    return getLahiriAyanamsa(currentDate);
  }, [currentDate]);

  const selectedPlanet: PlanetEphemeris = useMemo(() => {
    return planets.find((p: PlanetEphemeris) => p.grahaKey === selectedPlanetKey) || planets[0];
  }, [planets, selectedPlanetKey]);

  const handleTimeShift = (days: number) => {
    soundManager.playClick();
    const next = new Date(currentDate.getTime() + days * 86400000);
    setCurrentDate(next);
  };

  const handleResetNow = () => {
    soundManager.playClick();
    setCurrentDate(new Date());
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Orbit className="w-3.5 h-3.5" />
          <span>ग्रह स्थिति एवं सौर मण्डल • Sidereal Ephemeris & Solar Dynamics</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          ग्रह मण्डल • THE CELESTIAL EPHEMERIS
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Real-time astronomical ephemeris calculated with Chitrapaksha Lahiri Ayanamsa ({ayanamsaDeg.toFixed(3)}°), tracking planetary longitudes, Rashi Bhavas, Nakshatras, and retrogrades.
        </p>
      </div>

      {/* Time Controls Bar */}
      <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-[#e8913a]" />
          <div>
            <span className="text-xs font-mono text-[#b5a990] block">Ephemeris Epoch</span>
            <span className="text-sm font-mono font-bold text-[#efe6d6]">
              {currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} — {currentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} UTC
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleTimeShift(-30)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#b5a990] hover:text-[#efe6d6] border border-white/10"
          >
            -30d
          </button>
          <button
            onClick={() => handleTimeShift(-1)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#b5a990] hover:text-[#efe6d6] border border-white/10"
          >
            -1d
          </button>
          <button
            onClick={handleResetNow}
            className="px-3 py-1 rounded bg-[#e8913a] text-black text-xs font-mono font-bold hover:bg-[#f2c47a] transition-colors"
          >
            LIVE NOW
          </button>
          <button
            onClick={() => handleTimeShift(1)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#b5a990] hover:text-[#efe6d6] border border-white/10"
          >
            +1d
          </button>
          <button
            onClick={() => handleTimeShift(30)}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#b5a990] hover:text-[#efe6d6] border border-white/10"
          >
            +30d
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10">
          <button
            onClick={() => { soundManager.playClick(); setViewMode('geocentric'); }}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'geocentric'
                ? 'bg-[#e8913a] text-black font-bold'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            Geocentric (Jyotish)
          </button>
          <button
            onClick={() => { soundManager.playClick(); setViewMode('heliocentric'); }}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'heliocentric'
                ? 'bg-[#e8913a] text-black font-bold'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            Heliocentric (Astronomical)
          </button>
        </div>
      </div>

      {/* Main Grid: Planetary Ephemeris Table & Selected Graha Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Planetary Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[#e8913a] tracking-wider">
                नवह्राः एवं आधुनिक ग्रहाः • Planetary Longitudes Table
              </span>
              <span className="text-xs font-mono text-[#b5a990]">
                Lahiri Ayanamsa: {ayanamsaDeg.toFixed(2)}°
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-mono text-[#b5a990] uppercase">
                    <th className="py-2">Graha</th>
                    <th className="py-2">Sign (Rashi)</th>
                    <th className="py-2">Degree</th>
                    <th className="py-2">Nakshatra (Pada)</th>
                    <th className="py-2">Daily Motion</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {planets.map((p: PlanetEphemeris) => {
                    const isSelected = p.grahaKey === selectedPlanet?.grahaKey;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => { soundManager.playClick(); setSelectedPlanetKey(p.grahaKey); }}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#e8913a]/15 text-[#fde047]' : 'hover:bg-white/5 text-[#efe6d6]'
                        }`}
                      >
                        <td className="py-2.5 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="font-bold">{p.sanskritName}</span>
                          <span className="text-[10px] font-mono text-[#b5a990]">({p.name})</span>
                        </td>
                        <td className="py-2.5 font-bold" style={{ color: p.color }}>
                          {p.rashiName}
                        </td>
                        <td className="py-2.5 font-mono">
                          {p.rashiDegrees.toFixed(2)}°
                        </td>
                        <td className="py-2.5 text-[#b5a990]">
                          {p.nakshatraName} (P{p.nakshatraPada})
                        </td>
                        <td className="py-2.5 font-mono text-[11px]">
                          {p.speedDegPerDay >= 0 ? `+${p.speedDegPerDay.toFixed(2)}` : p.speedDegPerDay.toFixed(2)}°/d
                        </td>
                        <td className="py-2.5">
                          {p.isRetrograde ? (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold">
                              R (वक्र)
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-mono text-[10px]">Direct</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Planet Deep Dossier */}
        {selectedPlanet && (
          <div className="lg:col-span-4 space-y-6">
            <div 
              className="p-6 rounded-2xl border space-y-5 relative overflow-hidden"
              style={{
                borderColor: `${selectedPlanet.color}55`,
                background: `linear-gradient(135deg, ${selectedPlanet.color}20 0%, rgba(10,10,14,0.95) 100%)`
              }}
            >
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold uppercase block" style={{ color: selectedPlanet.color }}>
                  {selectedPlanet.sanskritName} • {selectedPlanet.name}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#efe6d6]">
                  {selectedPlanet.name}
                </h3>
              </div>

              {/* Coordinates Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-serif">
                <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Current Rashi</span>
                  <span className="text-sm font-bold text-[#fde047] block">
                    {selectedPlanet.rashiName}
                  </span>
                  <span className="text-[10px] font-mono text-[#b5a990]">
                    {selectedPlanet.rashiDegrees.toFixed(2)}° in sign
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Lunar Nakshatra</span>
                  <span className="text-sm font-bold text-[#e8913a] block">
                    {selectedPlanet.nakshatraName}
                  </span>
                  <span className="text-[10px] font-mono text-[#b5a990]">
                    Pada {selectedPlanet.nakshatraPada} / 4
                  </span>
                </div>
              </div>

              {/* Motion & Longitude */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#b5a990]">Sidereal Longitude:</span>
                  <span className="text-[#efe6d6] font-bold">{selectedPlanet.siderealLongitude.toFixed(3)}°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#b5a990]">Tropical Longitude:</span>
                  <span className="text-[#efe6d6]">{selectedPlanet.tropicalLongitude.toFixed(3)}°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#b5a990]">Daily Velocity:</span>
                  <span className="text-[#efe6d6]">{selectedPlanet.speedDegPerDay.toFixed(3)}° / day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#b5a990]">Retrograde (वक्र):</span>
                  <span className={selectedPlanet.isRetrograde ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                    {selectedPlanet.isRetrograde ? 'Yes (वक्र गति)' : 'No (मार्गी)'}
                  </span>
                </div>
              </div>

              {/* Jyotish Significance */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1.5 text-xs font-serif">
                <span className="text-[10px] font-mono uppercase text-[#e8913a] block font-bold">
                  Traditional Jyotish Significance
                </span>
                <p className="text-[#b5a990] leading-relaxed">
                  In classical Vedic astronomy, {selectedPlanet.sanskritName} represents vital karmic vectors. In this epoch, transit across {selectedPlanet.rashiName} within {selectedPlanet.nakshatraName} governs planetary aspects (Drishti) and Vimshottari Mahadasha influence.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
