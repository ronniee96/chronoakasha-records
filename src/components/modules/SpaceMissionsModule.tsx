'use client';

import React, { useState } from 'react';
import { Rocket, Satellite, Globe, Target, Calendar, CheckCircle2, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface SpaceMissionsModuleProps {
  isLightMode?: boolean;
  onOpenSatelliteTracker?: () => void;
}

interface MissionItem {
  id: string;
  name: string;
  sanskritName?: string;
  agency: 'ISRO' | 'NASA' | 'ESA' | 'JAXA' | 'CNSA';
  targetDestination: string;
  launchDate: string;
  status: 'Active & Operational' | 'Milestone Completed' | 'Planned / Upcoming';
  description: string;
  scientificPayload: string[];
  keyLegacy: string;
  agencyColor: string;
}

const MISSIONS: MissionItem[] = [
  {
    id: 'isro-chandrayaan-3',
    name: 'Chandrayaan-3 (विक्रम एवं प्रज्ञान)',
    sanskritName: 'चन्द्रयान-३ • शिवशक्ति बिन्दु',
    agency: 'ISRO',
    targetDestination: 'Moon (South Polar Region ~69.37° S)',
    launchDate: '14 July 2023 (Landed: 23 Aug 2023)',
    status: 'Milestone Completed',
    description: 'First humanity soft-landing near the lunar south pole. Successfully operated the Vikram lander and Pragyan rover, proving in-situ elemental sulfur and recording lunar seismic activity.',
    scientificPayload: ['ChaSTE (Thermal probe)', 'ILSA (Seismometer)', 'APXS & LIBS (Spectroscopy)', 'RAMBHA (Plasma)'],
    keyLegacy: 'Established National Space Day of India; confirmed sulfur presence in south polar regolith and executed a sub-hop re-ignition test.',
    agencyColor: '#e8913a'
  },
  {
    id: 'isro-aditya-l1',
    name: 'Aditya-L1 (आदित्य-एल१)',
    sanskritName: 'आदित्य-एल१ सौर वेधशाला',
    agency: 'ISRO',
    targetDestination: 'Sun-Earth Lagrange Point 1 (1.5 million km from Earth)',
    launchDate: '2 September 2023 (Arrived L1: 6 Jan 2024)',
    status: 'Active & Operational',
    description: 'India’s first dedicated space-based solar observatory positioned in a halo orbit around the Sun-Earth L1 point to monitor solar coronal mass ejections (CMEs) without eclipses.',
    scientificPayload: ['VELC (Coronagraph)', 'SUIT (UV Imaging Telescope)', 'ASPEX (Solar wind particles)', 'PAPA (Plasma analyzer)'],
    keyLegacy: 'Continuous unobstructed 24/7 observation of the solar photosphere, chromosphere, and corona for space weather forecasting.',
    agencyColor: '#fde047'
  },
  {
    id: 'isro-gaganyaan',
    name: 'Gaganyaan (गगनयान)',
    sanskritName: 'गगनयान • मानवकल्प अन्तरिक्ष अभियान',
    agency: 'ISRO',
    targetDestination: 'Low Earth Orbit (400 km circular orbit)',
    launchDate: '2025–2026 (TV-D1 test completed Oct 2023)',
    status: 'Planned / Upcoming',
    description: 'India’s indigenous human spaceflight mission designed to carry a crew of 3 vyomanauts to Low Earth Orbit for a 3-day mission and return safely to Indian waters.',
    scientificPayload: ['Crew Module Atmospheric Re-entry', 'Service Module Propulsion', 'Vyommitra Humanoid Robot', 'Environmental Control & Life Support (ECLSS)'],
    keyLegacy: 'Lays the bedrock for Bharatiya Antariksha Station (BAS) by 2035 and an Indian crewed lunar landing by 2040.',
    agencyColor: '#527FAE'
  },
  {
    id: 'nasa-james-webb',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA',
    targetDestination: 'Sun-Earth Lagrange Point 2 (1.5 million km)',
    launchDate: '25 December 2021',
    status: 'Active & Operational',
    description: 'The premier space observatory in infrared astronomy, utilizing a 6.5-meter beryllium gold-coated primary mirror to image the first galaxies formed post-Big Bang.',
    scientificPayload: ['NIRCam (Near-Infrared Camera)', 'MIRI (Mid-Infrared Instrument)', 'NIRSpec', 'Fine Guidance Sensor'],
    keyLegacy: 'Detected early luminous galaxies at redshift $z > 13$, resolved atmospheric carbon dioxide and water vapor in exoplanet atmospheres.',
    agencyColor: '#60a5fa'
  },
  {
    id: 'isro-mangalyaan',
    name: 'Mars Orbiter Mission (मंगलयान)',
    sanskritName: 'मंगलयान • प्रथम प्रयास विजय',
    agency: 'ISRO',
    targetDestination: 'Mars Orbit',
    launchDate: '5 November 2013 (Entered Orbit: 24 Sept 2014)',
    status: 'Milestone Completed',
    description: 'India became the first Asian nation to reach Martian orbit and the first in the world to succeed on its maiden attempt, operating for over 7 years.',
    scientificPayload: ['MCC (Mars Color Camera)', 'MSM (Methane Sensor for Mars)', 'MENCA (Exospheric analyzer)', 'TIS (Thermal sensor)'],
    keyLegacy: 'Globally celebrated for frugal engineering ($74M), capturing whole-disk color portraits of Mars and mapping Phobos and Deimos.',
    agencyColor: '#e8913a'
  },
  {
    id: 'nasa-artemis',
    name: 'Artemis Program & Lunar Gateway',
    agency: 'NASA',
    targetDestination: 'Moon (Lunar Orbit & Surface)',
    launchDate: '2022 (Artemis I) — Ongoing',
    status: 'Active & Operational',
    description: 'International collaborative program led by NASA to establish permanent sustainable human presence on the Moon and prepare for crewed missions to Mars.',
    scientificPayload: ['Space Launch System (SLS)', 'Orion Spacecraft', 'Lunar Gateway Space Station', 'Commercial Human Landing Systems'],
    keyLegacy: 'Landing the first woman and person of color on the lunar south pole and forging the international Artemis Accords.',
    agencyColor: '#38bdf8'
  }
];

export function SpaceMissionsModule({ isLightMode, onOpenSatelliteTracker }: SpaceMissionsModuleProps) {
  const [selectedAgency, setSelectedAgency] = useState<string>('All');
  const [selectedMissionId, setSelectedMissionId] = useState<string>('isro-chandrayaan-3');

  const filteredMissions = MISSIONS.filter(m => selectedAgency === 'All' || m.agency === selectedAgency);
  const activeMission = MISSIONS.find(m => m.id === selectedMissionId) || filteredMissions[0] || MISSIONS[0];

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Rocket className="w-3.5 h-3.5" />
          <span>अन्तरिक्ष अन्वेषण • Global Space Exploration & ISRO Milestones</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          अन्तरिक्ष अभियान • SPACE MISSIONS OBSERVATORY
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Comprehensive exploration of lunar landings, solar observatories, Mars missions, and deep-space telescopes across ISRO, NASA, and international space consortia.
        </p>
      </div>

      {/* Satellite Tracker CTA Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#20140c] via-[#160f09] to-[#0a0705] border border-[#e8913a]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Satellite className="w-6 h-6 text-[#e8913a] shrink-0" />
          <div>
            <span className="text-xs font-mono font-bold text-[#fde047] block">
              LIVE REAL-TIME SATELLITE ORBIT TRACKER
            </span>
            <p className="text-xs text-[#efe6d6] font-serif">
              Track live overhead passes of the International Space Station, Tiangong, Hubble, Sentinel, and Starlink constellations via real CelesTrak TLE propagation.
            </p>
          </div>
        </div>

        {onOpenSatelliteTracker && (
          <button
            onClick={() => { soundManager.playClick(); onOpenSatelliteTracker(); }}
            className="px-4 py-2 rounded-xl bg-[#e8913a] hover:bg-[#f2c47a] text-black text-xs font-mono font-bold transition-all shadow-lg shadow-[#e8913a]/20 flex items-center gap-2"
          >
            <span>LAUNCH SATELLITE TRACKER</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Agency Filter Bar */}
      <div className="flex items-center gap-2">
        {['All', 'ISRO', 'NASA', 'ESA', 'JAXA'].map(ag => (
          <button
            key={ag}
            onClick={() => { soundManager.playClick(); setSelectedAgency(ag); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              selectedAgency === ag
                ? 'bg-[#e8913a] text-black font-bold'
                : 'bg-black/40 border border-white/10 text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            {ag}
          </button>
        ))}
      </div>

      {/* Main Grid: Mission Selector & Deep Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mission Selector */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block px-1">
            Missions Portfolio ({filteredMissions.length})
          </span>
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredMissions.map(m => {
              const isSelected = m.id === activeMission.id;
              return (
                <div
                  key={m.id}
                  onClick={() => { soundManager.playClick(); setSelectedMissionId(m.id); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2a1a10] to-[#18110b] border-[#e8913a] shadow-lg shadow-[#e8913a]/15 scale-[1.01]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[#e8913a]">
                      {m.agency}
                    </span>
                    <span className="text-[10px] font-mono text-[#b5a990]">
                      {m.launchDate.split('(')[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#efe6d6] line-clamp-1">
                    {m.name}
                  </h3>
                  <p className="text-[11px] text-[#b5a990] mt-1 flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-[#527FAE]" />
                    <span>{m.targetDestination}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mission Deep Dossier */}
        {activeMission && (
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] via-[#140e08] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#e8913a] uppercase">
                    {activeMission.agency} • {activeMission.sanskritName || activeMission.targetDestination}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    {activeMission.status}
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#fde047]">
                  {activeMission.name}
                </h2>
                <div className="text-xs font-mono text-[#b5a990] flex items-center gap-3">
                  <span>Destination: <b className="text-[#efe6d6]">{activeMission.targetDestination}</b></span>
                  <span>•</span>
                  <span>Launch: <b className="text-[#efe6d6]">{activeMission.launchDate}</b></span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Mission Overview</span>
                <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                  {activeMission.description}
                </p>
              </div>

              {/* Scientific Payloads */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-[#527FAE] block uppercase">
                  Scientific Payloads & Instrumentation
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMission.scientificPayload.map((payload, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-serif text-[#efe6d6]">
                      {payload}
                    </span>
                  ))}
                </div>
              </div>

              {/* Legacy & Milestones */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#20140c] to-[#120d08] border border-[rgba(232,145,58,0.3)] space-y-1.5">
                <span className="text-xs font-mono font-bold text-[#e8913a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Lasting Historical & Scientific Legacy
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                  {activeMission.keyLegacy}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
