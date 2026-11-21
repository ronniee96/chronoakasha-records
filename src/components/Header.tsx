'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, VolumeX, Sparkles, Filter, Info, Sun, Moon, Orbit, 
  Compass, PlayCircle, Radio, Atom, Grid, ChevronDown, BookOpen, 
  Landmark, Eye, Rocket, Network, Zap, User
} from 'lucide-react';
import { MasterModuleId } from '../types/modules';
import { PillarId, PresentationMode } from '../types/sixPillars';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onFirstClick: () => void;
  onTodayClick: () => void;
  onLastClick: () => void;
  onSurpriseClick: () => void;
  onFilterToggle: () => void;
  onAboutToggle: () => void;
  onEvolutionClick?: () => void;
  activeFilterCount: number;
  currentMode: MasterModuleId | PillarId;
  onModeChange: (mode: MasterModuleId | PillarId) => void;
  isLightMode: boolean;
  onThemeToggle: () => void;
  isMuted: boolean;
  onSoundToggle: () => void;
  // Six Pillars features
  onOpenKaalDarshi: () => void;
  onOpenKnowledgeGraph: () => void;
  onOpenRishiMuni?: () => void;
  presentationMode: PresentationMode;
  onChangePresentationMode: (mode: PresentationMode) => void;
}

interface PillarNavDef {
  id: PillarId;
  romanNumeral: string;
  nameEn: string;
  nameSa: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const SIX_PILLARS: PillarNavDef[] = [
  {
    id: 'past',
    romanNumeral: '01',
    nameEn: 'The Past',
    nameSa: 'अतीत',
    icon: <Landmark className="w-4 h-4" />,
    color: '#d97706',
    description: 'Ancient civilizations, human origins, archaeology, historical events & scriptures.'
  },
  {
    id: 'present',
    romanNumeral: '02',
    nameEn: 'The Present',
    nameSa: 'वर्तमान',
    icon: <Radio className="w-4 h-4" />,
    color: '#38bdf8',
    description: 'Live satellite positions, space missions, planetary events & astronomical discoveries.'
  },
  {
    id: 'hinduCosmology',
    romanNumeral: '03',
    nameEn: 'Cosmic Wisdom',
    nameSa: 'सनातन ब्रह्माण्ड',
    icon: <Compass className="w-4 h-4" />,
    color: '#e8913a',
    description: 'Vedas, Puranas, Upanishads, Yugas, Kalpas, Manvantaras & traditional cosmology.'
  },
  {
    id: 'celestialAtlas',
    romanNumeral: '04',
    nameEn: 'The Celestial Atlas',
    nameSa: 'खगोलीय मानचित्र',
    icon: <Orbit className="w-4 h-4" />,
    color: '#c084fc',
    description: 'Solar system, orbits, 88 constellations, 27 Nakshatras, Rashis & eclipses.'
  },
  {
    id: 'future',
    romanNumeral: '05',
    nameEn: 'The Future',
    nameSa: 'भविष्य',
    icon: <Eye className="w-4 h-4" />,
    color: '#34d399',
    description: 'Astrological interpretations, astronomical predictions, forecasting & prophecies.'
  },
  {
    id: 'civilizations',
    romanNumeral: '06',
    nameEn: 'Future Civilizations',
    nameSa: 'भविष्य सभ्यता',
    icon: <Rocket className="w-4 h-4" />,
    color: '#f472b6',
    description: 'Kardashev civilizations, AI, interplanetary colonization & long-term intelligence.'
  }
];

export function Header({
  onFirstClick,
  onFilterToggle,
  onAboutToggle,
  onEvolutionClick,
  activeFilterCount,
  currentMode,
  onModeChange,
  isLightMode,
  onThemeToggle,
  isMuted,
  onSoundToggle,
  onOpenKaalDarshi,
  onOpenKnowledgeGraph,
  onOpenRishiMuni,
  presentationMode,
  onChangePresentationMode
}: HeaderProps) {
  const [isPillarsMenuOpen, setIsPillarsMenuOpen] = useState<boolean>(false);
  const pillarsMenuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click safely without preventing button interaction
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pillarsMenuRef.current && !pillarsMenuRef.current.contains(e.target as Node)) {
        setIsPillarsMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePillarSwitch = (pillarId: PillarId) => {
    soundManager.playTempleBell(528);
    onModeChange(pillarId);
    setIsPillarsMenuOpen(false);
  };

  const activePillar = SIX_PILLARS.find(p => p.id === currentMode);

  return (
    <header 
      className={`w-full z-50 h-[70px] min-h-[70px] max-h-[70px] shrink-0 px-2 sm:px-4 md:px-6 flex items-center justify-between transition-colors duration-200 border-b select-none relative overflow-x-auto overflow-y-hidden no-scrollbar gap-2 md:gap-3 ${
        isLightMode 
          ? 'bg-[#f4ebd9]/95 text-[#1d130a] border-[#c59b27]/40 shadow-sm' 
          : 'bg-[#0a0705]/98 text-[#efe6d6] border-[rgba(212,175,55,0.22)]'
      } backdrop-blur-xl shadow-lg`}
    >
      {/* ================= 1. LEFT ZONE: BRAND & PILLARS NAV ================= */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <div 
          onClick={onFirstClick}
          className="cursor-pointer flex items-center gap-2 group select-none shrink-0"
          aria-label="Chronoākāsha Records — आदि First"
          title="Return to Cosmic Dawn (The First Kalpa)"
        >
          {/* Sacred Golden Kalachakra Emblem */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500/25 via-[#18110a] to-black border border-amber-500/50 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover:border-amber-400 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.45)] transition-all">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-xl bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Typography */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-sm sm:text-base md:text-lg font-serif font-extrabold tracking-tight text-[#efe6d6] group-hover:text-amber-300 transition-colors whitespace-nowrap">
                Chronoa<span className="text-amber-500">कोश</span>
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] uppercase text-amber-500/80 leading-none mt-0.5 whitespace-nowrap hidden sm:block">
              RECORDS • कालचक्र
            </span>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-white/10 mx-0.5 sm:mx-1 hidden md:block" />

        {/* Master Six Pillars Menu Trigger */}
        <div className="relative shrink-0" ref={pillarsMenuRef}>
          <button
            onClick={() => { soundManager.playClick(); setIsPillarsMenuOpen(!isPillarsMenuOpen); }}
            className={`flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border shadow-sm whitespace-nowrap active:scale-95 ${
              activePillar
                ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 text-amber-300 border-amber-400/60 shadow-amber-500/10'
                : 'bg-black/60 border-white/15 text-[#efe6d6] hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">
              {activePillar ? `${activePillar.nameSa} • P${activePillar.romanNumeral}` : 'षड् स्तम्भ • Six Pillars'}
            </span>
            <span className="sm:hidden">
              {activePillar ? `P${activePillar.romanNumeral}` : 'स्तम्भ'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isPillarsMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Six Pillars Dropdown Mega-Menu (Fixed Positioning to prevent ANY clipping) */}
          {isPillarsMenuOpen && (
            <div 
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-[74px] left-3 sm:left-8 md:left-20 w-[340px] sm:w-[500px] md:w-[680px] rounded-2xl bg-[#0c0906]/98 border border-amber-500/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-4 sm:p-5 z-[200] animate-in fade-in zoom-in-95 duration-150 space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    षड् स्तम्भ दर्शन • THE SIX PILLARS OF EXISTENCE
                  </span>
                  <span className="text-[10px] font-mono text-[#b5a990]">
                    अतीत · वर्तमान · सनातन · ब्रह्माण्ड · भविष्य · सभ्यता
                  </span>
                </div>
                {/* Blueprint Overview Button inside menu */}
                <button
                  onClick={() => { soundManager.playClick(); onModeChange('overview'); setIsPillarsMenuOpen(false); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>रूपरेखा • Overview</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-h-[460px] overflow-y-auto pr-1">
                {SIX_PILLARS.map(p => {
                  const isCurrent = currentMode === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePillarSwitch(p.id)}
                      className={`p-3 sm:p-3.5 rounded-xl text-left border transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-400 text-amber-300 shadow-md scale-[1.01]'
                          : 'bg-black/40 border-white/10 hover:border-amber-500/30 hover:bg-black/60 text-[#efe6d6]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold" style={{ color: p.color }}>
                          PILLAR {p.romanNumeral} • {p.nameSa}
                        </span>
                        {isCurrent && <span className="text-xs text-amber-400 font-bold">✦ Active</span>}
                      </div>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#efe6d6] truncate">
                        {p.nameEn}
                      </h4>
                      <p className="text-[10.5px] font-serif text-[#b5a990] line-clamp-2 mt-0.5">
                        {p.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Specialized Systems Quick Jump Footer */}
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => { soundManager.playClick(); onModeChange('jyotisham'); setIsPillarsMenuOpen(false); }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>JYOTISHAM & KUNDLI</span>
                </button>
                <button
                  onClick={() => { soundManager.playClick(); onModeChange('mycosmos'); setIsPillarsMenuOpen(false); }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>MY CHRONOAKASHA</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= 2. CENTER ZONE: DIRECT EXPERIENCE MODES & AI SUITE ================= */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0">
        {/* DIRECT 1-CLICK PRESENTATION MODE DOCK */}
        <div 
          className="inline-flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15 shadow-md backdrop-blur-md shrink-0"
          role="group"
          aria-label="Adaptive Reading and Experience Modes"
        >
          {[
            { id: 'cinematic', label: 'Cinematic', icon: '⚡', hint: 'Key Points & Visuals' },
            { id: 'research', label: 'Research', icon: '🔬', hint: 'Math, KaTeX & Citations' },
            { id: 'reading', label: 'Reading', icon: '📖', hint: 'Clean Editorial Text & Stories' }
          ].map(m => {
            const isActive = presentationMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  soundManager.playClick();
                  onChangePresentationMode(m.id as any);
                }}
                className={`h-8 px-2 sm:px-2.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? m.id === 'reading'
                      ? 'bg-gradient-to-r from-emerald-500/35 to-emerald-600/25 text-emerald-300 border border-emerald-400/60 shadow-md font-extrabold'
                      : m.id === 'research'
                      ? 'bg-gradient-to-r from-cyan-500/35 to-cyan-600/25 text-cyan-300 border border-cyan-400/60 shadow-md font-extrabold'
                      : 'bg-gradient-to-r from-amber-500/35 to-amber-600/25 text-amber-300 border border-amber-400/60 shadow-md font-extrabold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={`Switch to ${m.label} Mode (${m.hint})`}
              >
                <span>{m.icon}</span>
                <span className={`capitalize ${isActive ? 'inline' : 'hidden 2xl:inline'}`}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* SACRED AI SUITE: 3 DISTINCT, ELEGANT BUTTONS */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* 1. Rishi Muni AI */}
          {onOpenRishiMuni && (
            <button
              onClick={() => { soundManager.playTempleBell(528); onOpenRishiMuni(); }}
              className="h-8 px-2 sm:px-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-amber-500/20 via-[#18110a] to-amber-600/15 hover:from-amber-500/35 hover:to-orange-500/25 text-amber-300 hover:text-amber-100 border border-amber-500/50 hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:shadow-[0_0_18px_rgba(245,158,11,0.35)] transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
              title="Open Rishi Muni AI — Vedic Astrological Oracle, Kundli & Daily Transit"
            >
              <span className="text-sm">🧘‍♂️</span>
              <span className="font-serif tracking-wide hidden sm:inline">ऋषि मुनि <span className="hidden 2xl:inline">AI</span></span>
            </button>
          )}

          {/* 2. KaalDarshi AI */}
          <button
            onClick={() => { soundManager.playTempleBell(432); onOpenKaalDarshi(); }}
            className="h-8 px-2 sm:px-2.5 rounded-xl text-xs font-mono font-bold bg-black/60 hover:bg-amber-500/15 text-amber-200 hover:text-amber-100 border border-amber-500/30 hover:border-amber-400/60 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm active:scale-95"
            title="Open KaalDarshi AI — Unified Cosmic Research Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-serif tracking-wide hidden sm:inline">कालदर्शी <span className="hidden 2xl:inline">AI</span></span>
          </button>

          {/* 3. Global Knowledge Graph */}
          <button
            onClick={() => { soundManager.playClick(); onOpenKnowledgeGraph(); }}
            className="h-8 px-2 sm:px-2.5 rounded-xl text-xs font-mono font-bold bg-black/60 hover:bg-cyan-500/15 text-cyan-200 hover:text-cyan-100 border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm active:scale-95"
            title="Open Global Knowledge Graph — Interconnected Vedic & Scientific Network"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-serif tracking-wide hidden sm:inline">ज्ञान संजाल</span>
          </button>
        </div>
      </div>

      {/* ================= 3. RIGHT ZONE: SPATIAL VIEWERS & UTILITIES ================= */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Core Spatial Viewers Segmented Control */}
        <div className="inline-flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15 shadow-md backdrop-blur-md shrink-0">
          {[
            { id: 'chakra', label: 'Chakra', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'voyage3d', label: '3D Cosmos', icon: <Orbit className="w-3.5 h-3.5" /> },
            { id: 'cinematic', label: 'Odyssey', icon: <PlayCircle className="w-3.5 h-3.5" /> },
            { id: 'present', label: 'Today', icon: <Radio className="w-3.5 h-3.5" /> }
          ].map(item => {
            const isCurrent = currentMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { soundManager.playClick(); onModeChange(item.id as any); }}
                className={`h-8 px-2 sm:px-2.5 rounded-lg text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-all active:scale-95 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/20 text-amber-300 border border-amber-400/60 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={`Switch to ${item.label} view`}
                aria-label={item.label}
              >
                {item.icon}
                <span className={isCurrent ? 'inline' : 'hidden 2xl:inline'}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Utilities Dock */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* 11D Evolution Matrix */}
          {onEvolutionClick && (
            <button
              onClick={() => { soundManager.bell(880, 0.2, 1.8); onEvolutionClick(); }}
              className="h-8 px-2 sm:px-2.5 rounded-lg text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center gap-1 whitespace-nowrap active:scale-95"
              title="11D Evolution Matrix"
            >
              <Atom className="w-3.5 h-3.5 text-cyan-400" />
              <span>11D</span>
            </button>
          )}

          {/* Filter */}
          <button
            onClick={() => { soundManager.playClick(); onFilterToggle(); }}
            className={`h-8 px-2 sm:px-2.5 rounded-lg text-xs font-serif font-bold tracking-wider uppercase transition-all flex items-center gap-1 border whitespace-nowrap active:scale-95 ${
              activeFilterCount > 0
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : 'bg-white/5 hover:bg-white/10 text-amber-300 border-white/10'
            }`}
            title="Filters"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden 2xl:inline">Filter</span>
            {activeFilterCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] bg-cyan-400 text-black font-extrabold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Ambient Sound */}
          <button
            onClick={onSoundToggle}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all border active:scale-95 shrink-0 ${
              !isMuted
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Theme */}
          <button
            onClick={() => { soundManager.playClick(); onThemeToggle(); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all active:scale-95 shrink-0"
            title={isLightMode ? 'Dark Mode' : 'Light Mode'}
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* About */}
          <button
            onClick={() => { soundManager.playClick(); onAboutToggle(); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all active:scale-95 shrink-0"
            title="About & Methodology"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
