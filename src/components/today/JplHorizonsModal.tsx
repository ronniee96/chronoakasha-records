'use client';

import React, { useState, useEffect } from 'react';
import { 
  Orbit, 
  X, 
  Navigation,
  Activity,
  Gauge,
  Sparkles,
  Compass,
  Clock,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

export interface PlanetaryTargetDef {
  id: string;
  command: string;
  name: string;
  sanskritName: string;
  category: 'star' | 'moon' | 'terrestrial-planet' | 'gas-giant' | 'ice-giant' | 'asteroid' | 'comet';
  colorHex: string;
  description: string;
}

export const PRESET_TARGETS: PlanetaryTargetDef[] = [
  // Navagraha & Major Solar System Bodies
  { id: 'sun', command: '10', name: 'Sun', sanskritName: 'सूर्य (Surya)', category: 'star', colorHex: '#f59e0b', description: 'Center of our solar system and cosmic life-giver in Vedic cosmology.' },
  { id: 'moon', command: '301', name: 'Moon', sanskritName: 'चन्द्र (Chandra)', category: 'moon', colorHex: '#e2e8f0', description: 'Earth’s natural satellite; master of the mind, tides, and 27 Nakshatras.' },
  { id: 'mercury', command: '199', name: 'Mercury', sanskritName: 'बुध (Budha)', category: 'terrestrial-planet', colorHex: '#94a3b8', description: 'Innermost planet; ruler of intellect, communication, and swift motion.' },
  { id: 'venus', command: '299', name: 'Venus', sanskritName: 'शुक्र (Shukra)', category: 'terrestrial-planet', colorHex: '#fef08a', description: 'Brilliant morning/evening star; associated with beauty, art, and harmony.' },
  { id: 'mars', command: '499', name: 'Mars', sanskritName: 'मंगल (Mangala)', category: 'terrestrial-planet', colorHex: '#ef4444', description: 'The red planet; embodiment of vigor, energy, and planetary dynamism.' },
  { id: 'jupiter', command: '599', name: 'Jupiter', sanskritName: 'बृहस्पति (Guru)', category: 'gas-giant', colorHex: '#f97316', description: 'Greatest of planets; preceptor of the gods, wisdom, and cosmic law.' },
  { id: 'saturn', command: '699', name: 'Saturn', sanskritName: 'शनि (Shani)', category: 'gas-giant', colorHex: '#eab308', description: 'Ringed giant; lord of time (Kaala), perseverance, and karma.' },
  { id: 'uranus', command: '799', name: 'Uranus', sanskritName: 'अरुण (Aruna)', category: 'ice-giant', colorHex: '#38bdf8', description: 'Tilted ice giant; associated with dawn and revolutionary change.' },
  { id: 'neptune', command: '899', name: 'Neptune', sanskritName: 'वरुण (Varuna)', category: 'ice-giant', colorHex: '#3b82f6', description: 'Deep blue distant world; ruler of cosmic waters and celestial order (Rta).' },
  { id: 'pluto', command: '999', name: 'Pluto', sanskritName: 'यम (Yama)', category: 'terrestrial-planet', colorHex: '#cbd5e1', description: 'Dwarf planet at Kuiper Belt threshold; lord of transformation.' },
  
  // Asteroids & NEOs
  { id: 'ceres', command: '1;', name: '1 Ceres', sanskritName: 'सेरेस (Dwarf Planet)', category: 'asteroid', colorHex: '#a3e635', description: 'Largest object in main asteroid belt; round dwarf planet with water ice.' },
  { id: 'vesta', command: '4;', name: '4 Vesta', sanskritName: 'वेस्ता (Main Belt Asteroid)', category: 'asteroid', colorHex: '#facc15', description: 'Second-largest asteroid, visually brightest from Earth.' },
  { id: 'apophis', command: '99942;', name: '99942 Apophis', sanskritName: 'अपोफिस (Near-Earth Asteroid)', category: 'asteroid', colorHex: '#f43f5e', description: 'Potentially hazardous asteroid with historic Earth flyby in 2029.' },
  { id: 'bennu', command: '101955;', name: '101955 Bennu', sanskritName: 'बेन्नू (OSIRIS-REx Target)', category: 'asteroid', colorHex: '#fb923c', description: 'Carbonaceous asteroid sampled by NASA OSIRIS-REx mission.' },
  { id: 'halley', command: '1P', name: '1P/Halley', sanskritName: 'हेली धूमकेतु (Periodic Comet)', category: 'comet', colorHex: '#67e8f9', description: 'Famous periodic comet with ~76-year orbital period.' }
];

interface JplHorizonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export function JplHorizonsModal({ isOpen, onClose, isLightMode = false }: JplHorizonsModalProps) {
  const [selectedTarget, setSelectedTarget] = useState<PlanetaryTargetDef>(PRESET_TARGETS[4]); // Mars default
  const [ephemType, setEphemType] = useState<'OBSERVER' | 'VECTORS'>('OBSERVER');
  const [center, setCenter] = useState<string>('500@399'); // Geocentric default
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchHorizonsData = async (targetId: string, type: 'OBSERVER' | 'VECTORS', centerSite: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const url = `/api/horizons?target=${encodeURIComponent(targetId)}&ephem_type=${type}&center=${encodeURIComponent(centerSite)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to fetch Horizons data');
      }
      setData(json.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with NASA JPL Horizons');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHorizonsData(selectedTarget.id, ephemType, center);
    }
  }, [isOpen, selectedTarget, ephemType, center]);

  if (!isOpen) return null;

  const obs = data?.observation;
  const coords = obs?.coordinates;
  const dist = obs?.distance;
  const motion = obs?.motion;
  const vis = obs?.visibility;
  const vec = data?.vectorState;
  const physical = data?.physicalProperties;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isLightMode 
            ? 'bg-[#faf6ee] border-[#d4af37]/40 text-[#1d130a]' 
            : 'bg-[#090b10] border-[#38bdf8]/35 text-[#efe6d6] shadow-[0_0_60px_rgba(56,189,248,0.15)]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-blue-950/40 via-black to-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] p-2 flex items-center justify-center text-white shadow-md">
              <Orbit className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#fde047] tracking-wide">
                  NASA JPL HORIZONS OBSERVATORY
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#a5f3fc]">
                  v1.3 CLEAN SCIENTIFIC DATA
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] font-mono">
                Jet Propulsion Laboratory • ICRF High-Precision Ephemeris • Automated Signal-to-Noise Filtering
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Presets & Quick Selector */}
        <div className="px-5 py-3 border-b border-white/5 bg-black/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-[#94a3b8] uppercase font-bold shrink-0">
            Targets:
          </span>
          {PRESET_TARGETS.map(t => {
            const isSelected = selectedTarget.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedTarget(t);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'border-[#38bdf8] bg-[#38bdf8]/20 text-[#a5f3fc] font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'border-white/5 bg-white/5 text-[#9ca3af] hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.colorHex }} />
                <span>{t.name}</span>
                <span className="text-[10px] opacity-75 font-serif">{t.sanskritName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Origin Control Bar */}
        <div className="px-5 py-2.5 bg-black/20 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#94a3b8]">Mode:</span>
            <div className="inline-flex rounded-lg bg-black/60 border border-white/10 p-0.5">
              <button
                onClick={() => { soundManager.playClick(); setEphemType('OBSERVER'); }}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  ephemType === 'OBSERVER' ? 'bg-[#0284c7] text-white font-bold' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                OBSERVER APPARENT (RA / DEC)
              </button>
              <button
                onClick={() => { soundManager.playClick(); setEphemType('VECTORS'); }}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  ephemType === 'VECTORS' ? 'bg-[#0284c7] text-white font-bold' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                3D STATE VECTORS (X, Y, Z)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#94a3b8]">Coordinate Center:</span>
            <select
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="bg-black/80 text-[#38bdf8] text-xs font-mono rounded px-2.5 py-1 border border-white/10 focus:outline-none focus:border-[#38bdf8]"
            >
              <option value="500@399">Geocentric (500@399 Earth Center)</option>
              <option value="@0">Solar System Barycenter (@0)</option>
              <option value="500@10">Sun Center (500@10 Heliocentric)</option>
            </select>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {isLoading && (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#38bdf8] border-t-transparent animate-spin" />
              <p className="text-sm font-mono text-[#a5f3fc]">
                Extracting JPL Horizons data for {selectedTarget.name}...
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono">
              <p className="font-bold">Horizons Request Notice:</p>
              <p>{errorMsg}</p>
            </div>
          )}

          {!isLoading && data && (
            <>
              {/* Target Banner */}
              <div 
                className="p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden shadow-lg"
                style={{
                  borderColor: `${selectedTarget.colorHex}55`,
                  background: `linear-gradient(135deg, ${selectedTarget.colorHex}22 0%, rgba(10,14,24,0.95) 100%)`
                }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white uppercase">
                      COMMAND {selectedTarget.command}
                    </span>
                    <span className="text-xs font-serif font-bold text-[#fde047]">
                      {selectedTarget.sanskritName}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                    {selectedTarget.name}
                  </h3>
                  <p className="text-xs text-[#cbd5e1] max-w-2xl leading-relaxed">
                    {selectedTarget.description}
                  </p>
                </div>

                <div className="flex flex-col items-end text-right font-mono text-xs text-[#94a3b8] shrink-0">
                  <span className="text-[#a5f3fc] font-bold">EPOCH: {obs?.epochUT || 'Current'}</span>
                  <span>ORIGIN: {data.coordinateOrigin}</span>
                  <span className="text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live JPL Synchronized</span>
                  </span>
                </div>
              </div>

              {/* SECTION 1: OBSERVER EPHEMERIS */}
              {ephemType === 'OBSERVER' && obs && (
                <div className="space-y-4">
                  {/* Astronomical Coordinates Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
                    {/* RA */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] text-[#94a3b8] block">Right Ascension (RA)</span>
                      <span className="text-sm font-bold text-[#fde047] block truncate">
                        {coords?.rightAscension}
                      </span>
                      <span className="text-[10px] text-[#64748b]">ICRF Astrometric</span>
                    </div>

                    {/* DEC */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] text-[#94a3b8] block">Declination (DEC)</span>
                      <span className="text-sm font-bold text-[#fde047] block truncate">
                        {coords?.declination}
                      </span>
                      <span className="text-[10px] text-[#64748b]">J2000 Equator</span>
                    </div>

                    {/* Range in AU & km */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] text-[#94a3b8] block">Earth Distance (Δ)</span>
                      <span className="text-sm font-bold text-[#38bdf8] block">
                        {dist?.astronomicalUnits ? `${dist.astronomicalUnits.toFixed(4)} AU` : 'N/A'}
                      </span>
                      <span className="text-[10px] text-[#64748b]">
                        {dist?.millionsKm ? `${dist.millionsKm}M km` : ''}
                      </span>
                    </div>

                    {/* Light Travel Time */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] text-[#94a3b8] block">Light Travel Delay</span>
                      <span className="text-sm font-bold text-[#a5f3fc] block">
                        {dist?.lightTravelTimeFormatted || 'N/A'}
                      </span>
                      <span className="text-[10px] text-[#64748b]">One-way photon delay</span>
                    </div>

                    {/* Visual Magnitude */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] text-[#94a3b8] block">Visual Magnitude</span>
                      <span className="text-sm font-bold text-white block">
                        {vis?.apparentVisualMagnitude !== null ? vis.apparentVisualMagnitude : 'N/A'}
                      </span>
                      <span className="text-[10px] text-[#64748b]">
                        {vis?.isNakedEyeVisible ? '✨ Naked-Eye' : 'Telescopic'}
                      </span>
                    </div>

                    {/* Constellation */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] text-[#94a3b8] block">Constellation (IAU)</span>
                      <span className="text-sm font-bold text-[#e8913a] block">
                        {coords?.constellationIAU || 'N/A'}
                      </span>
                      <span className="text-[10px] text-[#64748b]">
                        {vis?.solarSkyPosition || 'Sky Position'}
                      </span>
                    </div>
                  </div>

                  {/* Sidereal Vedic Alignment & Orbital Dynamics Banner */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vedic Alignment */}
                    <div className="p-4 rounded-2xl bg-black/50 border border-[#e8913a]/30 space-y-2">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs font-mono font-bold uppercase text-[#e8913a] flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Vedic Sidereal Alignment (Lahiri Ayanamsa)</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#b5a990]">
                          Long: {coords?.siderealLongitudeDeg || 0}°
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs font-serif pt-1">
                        <div>
                          <span className="text-[10px] font-mono text-[#94a3b8] block">Rashi (Zodiac Sign)</span>
                          <span className="text-base font-bold text-[#fde047]">
                            {coords?.vedicRashi?.sanskrit} {coords?.vedicRashi?.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#94a3b8] block">
                            {coords?.vedicRashi?.degreesInSign}° in sign
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#94a3b8] block">Nakshatra</span>
                          <span className="text-base font-bold text-[#e8913a]">
                            {coords?.vedicNakshatra?.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#94a3b8] block">
                            Pada {coords?.vedicNakshatra?.pada} of 4 (Nakshatra #{coords?.vedicNakshatra?.index})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Observer Photometry & Motion */}
                    <div className="p-4 rounded-2xl bg-black/50 border border-[#38bdf8]/30 space-y-2">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs font-mono font-bold uppercase text-[#38bdf8] flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Observing Angles & Velocity</span>
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          motion?.direction === 'Approaching Earth' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {motion?.direction || 'Stationary'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                        <div>
                          <span className="text-[10px] text-[#94a3b8] block">Solar Elongation</span>
                          <span className="text-sm font-bold text-white">
                            {vis?.solarElongationDeg ? `${vis.solarElongationDeg.toFixed(1)}°` : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94a3b8] block">Phase Angle</span>
                          <span className="text-sm font-bold text-white">
                            {vis?.phaseAngleDeg ? `${vis.phaseAngleDeg.toFixed(1)}°` : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94a3b8] block">Radial Speed</span>
                          <span className="text-sm font-bold text-[#a5f3fc]">
                            {motion?.radialVelocityKmS ? `${motion.radialVelocityKmS} km/s` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: 3D CARTESIAN STATE VECTORS */}
              {ephemType === 'VECTORS' && vec && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Geometric Cartesian State Vectors ({vec.referenceFrame})</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                    {/* Position Vector */}
                    <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#fde047] block border-b border-white/10 pb-2">
                        Position Components (km)
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#94a3b8]">X:</span>
                          <span className="text-white font-bold">{vec.positionKm.x.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#94a3b8]">Y:</span>
                          <span className="text-white font-bold">{vec.positionKm.y.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#94a3b8]">Z:</span>
                          <span className="text-white font-bold">{vec.positionKm.z.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[#a5f3fc]">
                          <span>Distance Magnitude:</span>
                          <span className="font-bold">{vec.rangeKm.toLocaleString()} km</span>
                        </div>
                      </div>
                    </div>

                    {/* Velocity Vector */}
                    <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                      <span className="text-xs font-bold text-[#38bdf8] block border-b border-white/10 pb-2">
                        Velocity Components (km/s)
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[#94a3b8]">VX:</span>
                          <span className="text-white font-bold">{vec.velocityKmS.vx.toFixed(3)} km/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#94a3b8]">VY:</span>
                          <span className="text-white font-bold">{vec.velocityKmS.vy.toFixed(3)} km/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#94a3b8]">VZ:</span>
                          <span className="text-white font-bold">{vec.velocityKmS.vz.toFixed(3)} km/s</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-emerald-400">
                          <span>Total Speed:</span>
                          <span className="font-bold">{vec.velocityKmS.totalOrbitalSpeedKmS} km/s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: PHYSICAL METRICS (Clean scientific metrics only) */}
              {physical && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e8913a] flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>Physical Dimensions & Astrophysics</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    {physical.radiusKm && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Mean Radius</span>
                        <span className="text-white font-bold">{physical.radiusKm.toLocaleString()} km</span>
                      </div>
                    )}
                    {physical.densityGPerCm3 && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Bulk Density</span>
                        <span className="text-white font-bold">{physical.densityGPerCm3} g/cm³</span>
                      </div>
                    )}
                    {physical.massFormatted && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Planetary Mass</span>
                        <span className="text-white font-bold">{physical.massFormatted}</span>
                      </div>
                    )}
                    {physical.rotationPeriod && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Sidereal Rotation</span>
                        <span className="text-white font-bold">{physical.rotationPeriod}</span>
                      </div>
                    )}
                    {physical.surfaceGravityMS2 && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Surface Gravity</span>
                        <span className="text-white font-bold">{physical.surfaceGravityMS2} m/s²</span>
                      </div>
                    )}
                    {physical.escapeSpeedKmS && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Escape Velocity</span>
                        <span className="text-white font-bold">{physical.escapeSpeedKmS} km/s</span>
                      </div>
                    )}
                    {physical.meanOrbitalSpeedKmS && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Orbital Velocity</span>
                        <span className="text-white font-bold">{physical.meanOrbitalSpeedKmS} km/s</span>
                      </div>
                    )}
                    {physical.meanTemperatureK && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] text-[#94a3b8] block">Mean Temperature</span>
                        <span className="text-white font-bold">{physical.meanTemperatureK} K ({physical.meanTemperatureC}°C)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Clean Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs font-mono text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#efe6d6]">NASA JPL Horizons API • Filtered Scientific Payload</span>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
