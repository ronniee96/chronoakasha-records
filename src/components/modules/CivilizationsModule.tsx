'use client';

import React, { useState } from 'react';
import { Landmark, Compass, Hammer, Binary, FileText, Globe, Search, Layers, ChevronRight, Award } from 'lucide-react';
import { ANCIENT_CIVILIZATIONS, CivilizationRecord } from '../../data/civilizationsData';

interface CivilizationsModuleProps {
  isLightMode?: boolean;
}

export function CivilizationsModule({ isLightMode }: CivilizationsModuleProps) {
  const [selectedCivId, setSelectedCivId] = useState<string>('indus-sarasvati');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'astronomy' | 'engineering' | 'comparative'>('overview');

  const filteredCivs = ANCIENT_CIVILIZATIONS.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.sanskritName.includes(searchTerm) ||
    c.geographicalRegion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCiv: CivilizationRecord = ANCIENT_CIVILIZATIONS.find(c => c.id === selectedCivId) || ANCIENT_CIVILIZATIONS[0];

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Hero Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Landmark className="w-3.5 h-3.5" />
          <span>तुलनात्मक प्राचीन सभ्यताएँ • Comparative Ancient Civilizations</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          सभ्यता दर्शन • THE ATLAS OF CIVILIZATIONS
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          An objective comparative exploration of human civilization, metallurgy, mathematics, astronomy, and urban architecture across the ancient world.
        </p>
      </div>

      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#b5a990]" />
          <input
            type="text"
            placeholder="Search civilizations, regions, cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-xs md:text-sm text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none focus:border-[#e8913a]"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#b5a990]">
          <span>{ANCIENT_CIVILIZATIONS.length} Civilizations Documented</span>
          <span>•</span>
          <span className="text-[#e8913a]">Mature Bronze Age to Classical Antiquity</span>
        </div>
      </div>

      {/* Main Grid: Civilization Selector & In-depth Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Civilization Selector Cards */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block px-1">
            Ancient Civilizations Roster
          </span>
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredCivs.map((civ) => {
              const isSelected = civ.id === activeCiv.id;
              return (
                <div
                  key={civ.id}
                  onClick={() => setSelectedCivId(civ.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2a1b12] to-[#1a120c] border-[#e8913a] shadow-lg shadow-[#e8913a]/10 scale-[1.01]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold" style={{ color: civ.color }}>
                      {civ.sanskritName}
                    </span>
                    <span className="text-[10px] font-mono text-[#b5a990] px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                      {civ.flourishingCenturies}
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#efe6d6] truncate">
                    {civ.name}
                  </h3>
                  <p className="text-[11px] text-[#b5a990] line-clamp-1 mt-0.5">
                    {civ.geographicalRegion}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dossier */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Civilization Header Plaque */}
          <div 
            className="p-6 rounded-2xl border relative overflow-hidden space-y-4"
            style={{ 
              borderColor: `${activeCiv.color}55`,
              background: `linear-gradient(135deg, ${activeCiv.color}15 0%, rgba(10,10,14,0.9) 100%)`
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-sm font-serif font-bold text-[#fde047] block">
                  {activeCiv.sanskritName}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#efe6d6]">
                  {activeCiv.name}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#b5a990] block">Temporal Horizon</span>
                <span className="text-sm font-mono font-bold text-[#e8913a]">
                  {activeCiv.timeRange}
                </span>
              </div>
            </div>

            {/* Geography & Major Archaeological Sites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#b5a990] flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-[#527FAE]" />
                  Geographical Core
                </span>
                <p className="text-[#efe6d6] leading-relaxed">
                  {activeCiv.geographicalRegion}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#b5a990] flex items-center gap-1.5">
                  <Landmark className="w-3 h-3 text-[#e8913a]" />
                  Principal Metropolises & Sites
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {activeCiv.majorCitiesOrSites.map((site, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#f1e9d8]">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Tabs for In-depth Knowledge */}
            <div className="flex items-center gap-2 border-b border-white/10 pt-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 px-3 border-b-2 font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'border-[#e8913a] text-[#fde047]'
                    : 'border-transparent text-[#b5a990] hover:text-[#efe6d6]'
                }`}
              >
                Key Achievements
              </button>
              <button
                onClick={() => setActiveTab('astronomy')}
                className={`pb-2 px-3 border-b-2 font-semibold transition-all ${
                  activeTab === 'astronomy'
                    ? 'border-[#e8913a] text-[#fde047]'
                    : 'border-transparent text-[#b5a990] hover:text-[#efe6d6]'
                }`}
              >
                Astronomy & Math
              </button>
              <button
                onClick={() => setActiveTab('engineering')}
                className={`pb-2 px-3 border-b-2 font-semibold transition-all ${
                  activeTab === 'engineering'
                    ? 'border-[#e8913a] text-[#fde047]'
                    : 'border-transparent text-[#b5a990] hover:text-[#efe6d6]'
                }`}
              >
                Metallurgy & Script
              </button>
              <button
                onClick={() => setActiveTab('comparative')}
                className={`pb-2 px-3 border-b-2 font-semibold transition-all ${
                  activeTab === 'comparative'
                    ? 'border-[#e8913a] text-[#fde047]'
                    : 'border-transparent text-[#b5a990] hover:text-[#efe6d6]'
                }`}
              >
                Comparative Legacy
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-2 text-sm">
              {activeTab === 'overview' && (
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#e8913a]" />
                    Pioneering Technological & Architectural Milestones
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeCiv.keyAchievements.map((ach, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
                        <span className="text-xs font-mono font-bold text-[#e8913a] mt-0.5">0{idx + 1}</span>
                        <p className="text-xs text-[#efe6d6] leading-relaxed font-serif">
                          {ach}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'astronomy' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#527FAE]">
                      <Compass className="w-4 h-4" />
                      <span>Astronomical Knowledge & Alignments</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                      {activeCiv.astronomicalKnowledge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#e8913a]">
                      <Binary className="w-4 h-4" />
                      <span>Mathematical System & Metrology</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                      {activeCiv.mathematicalSystem}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'engineering' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C9A45C]">
                      <Hammer className="w-4 h-4" />
                      <span>Metallurgy, Materials & Engineering</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                      {activeCiv.metallurgyAndMaterials}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#b5a990]">
                      <FileText className="w-4 h-4" />
                      <span>Writing System & Epigraphy</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                      {activeCiv.writingSystem}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'comparative' && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#fde047]">
                    <Layers className="w-4 h-4" />
                    <span>Global Context & Lasting Civilizational Legacy</span>
                  </div>
                  <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                    {activeCiv.comparativeLegacy}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
