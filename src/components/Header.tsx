'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, Volume2, VolumeX, Sparkles, Filter, Info, Sun, Moon, Orbit, 
  Compass, PlayCircle, Radio, Atom, Grid, ChevronDown, BookOpen, 
  Landmark, Eye, Rocket, Satellite, User, Calendar, Network, Bot, Sliders
} from 'lucide-react';
import { MasterModuleId } from '../types/modules';
import { PillarId, PresentationMode } from '../types/sixPillars';
import { PRESENTATION_MODES } from '../context/PresentationModeContext';
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
    nameSa: 'भविष्य की सभ्यता',
    icon: <Rocket className="w-4 h-4" />,
    color: '#f472b6',
    description: 'Kardashev civilizations, AI, interplanetary colonization & long-term intelligence.'
  }
];

export function Header({
  searchQuery,
  onSearchChange,
  onFirstClick,
  onTodayClick,
  onLastClick,
  onSurpriseClick,
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
  const [isModeMenuOpen, setIsModeMenuOpen] = useState<boolean>(false);
  const pillarsMenuRef = useRef<HTMLDivElement>(null);
  const modeMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pillarsMenuRef.current && !pillarsMenuRef.current.contains(e.target as Node)) {
        setIsPillarsMenuOpen(false);
      }
      if (modeMenuRef.current && !modeMenuRef.current.contains(e.target as Node)) {
        setIsModeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePillarSwitch = (pillarId: PillarId) => {
    soundManager.playTempleBell(528);
    onModeChange(pillarId);
    setIsPillarsMenuOpen(false);
  };

  const activePillar = SIX_PILLARS.find(p => p.id === currentMode);

  return (
    <header 
      className={`w-full z-40 h-[68px] min-h-[68px] max-h-[68px] shrink-0 px-3 md:px-6 flex items-center justify-between transition-colors duration-200 border-b select-none relative overflow-x-auto no-scrollbar gap-3 md:gap-5 ${
        isLightMode 
          ? 'bg-[#f4ebd9]/95 text-[#1d130a] border-[#c59b27]/40 shadow-sm' 
          : 'bg-[#0a0705]/98 text-[#efe6d6] border-[rgba(212,175,55,0.22)]'
      } backdrop-blur-xl shadow-lg`}
    >
      {/* 1. Left: Museum-Grade Brand Emblem & Calligraphic Wordmark */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div 
          onClick={onFirstClick}
          className="cursor-pointer flex items-center gap-2.5 group select-none"
          aria-label="Chronoākāsha Records — आदि First"
          title="Return to Cosmic Dawn (The First Kalpa)"
        >
          {/* Sacred Golden Kalachakra Emblem */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/25 via-[#18110a] to-black border border-amber-500/50 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.25)] group-hover:border-amber-400 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.45)] transition-all">
            <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-xl bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Typography */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-base sm:text-lg font-serif font-extrabold tracking-tight text-[#efe6d6] group-hover:text-amber-300 transition-colors">
                Chronoa<span className="text-amber-500">कोश</span>
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-amber-500/80 leading-none mt-1">
              RECORDS • कालचक्र
            </span>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-white/10 mx-1 hidden lg:block" />
      </div>

      {/* 2. Center: Harmonious Navigation & Sacred AI Suite */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Master Six Pillars Menu Trigger */}
        <div className="relative" ref={pillarsMenuRef}>
          <button
            onClick={() => { soundManager.playClick(); setIsPillarsMenuOpen(!isPillarsMenuOpen); }}
            className={`flex items-center gap-2 h-8 px-3 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all border shadow-sm whitespace-nowrap ${
              activePillar
                ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 text-amber-300 border-amber-400/60 shadow-amber-500/10'
                : 'bg-black/50 border-white/10 text-[#efe6d6] hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {activePillar ? `${activePillar.nameSa} • P${activePillar.romanNumeral}` : 'षड् स्तम्भ • Six Pillars'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isPillarsMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Six Pillars Dropdown Menu */}
          {isPillarsMenuOpen && (
            <div className="absolute left-0 mt-2 w-[340px] sm:w-[480px] md:w-[620px] rounded-2xl bg-[#0c0906]/98 border border-amber-500/40 shadow-2xl backdrop-blur-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    षड् स्तम्भ दर्शन • THE SIX PILLARS OF EXISTENCE
                  </span>
                  <span className="text-[10px] font-mono text-[#b5a990]">
                    अतीत · वर्तमान · सनातन · ब्रह्माण्ड · भविष्य · सभ्यता
                  </span>
                </div>
                {/* Blueprint Overview Button inside menu */}
                <button
                  onClick={() => { soundManager.playClick(); onModeChange('overview'); setIsPillarsMenuOpen(false); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>रूपरेखा • Overview</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                {SIX_PILLARS.map(p => {
                  const isCurrent = currentMode === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePillarSwitch(p.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-400 text-amber-300 shadow-sm'
                          : 'bg-black/30 border-white/5 hover:border-white/15 hover:bg-black/50 text-[#efe6d6]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold" style={{ color: p.color }}>
                          PILLAR {p.romanNumeral} • {p.nameSa}
                        </span>
                        {isCurrent && <span className="text-xs text-amber-400">✦ Active</span>}
                      </div>
                      <h4 className="text-xs font-serif font-bold text-[#efe6d6] truncate">
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

        {/* Sacred AI Suite Dock (Unified Glass Capsule) */}
        <div className="inline-flex items-center p-0.5 rounded-xl bg-black/60 border border-amber-500/30 shadow-lg backdrop-blur-md">
          {/* Rishi Muni AI */}
          {onOpenRishiMuni && (
            <button
              onClick={() => { soundManager.playTempleBell(528); onOpenRishiMuni(); }}
              className="h-7 px-2.5 sm:px-3 rounded-lg text-xs font-mono font-bold text-amber-300 hover:text-black hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-400 transition-all flex items-center gap-1.5 whitespace-nowrap group"
              title="Open Rishi Muni AI • Vedic Horoscope & Colors"
            >
              <span className="text-sm">🧘‍♂️</span>
              <span className="font-serif">ऋषि मुनि AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-black animate-pulse" />
            </button>
          )}

          <div className="h-4 w-[1px] bg-white/10 mx-0.5" />

          {/* KaalDarshi AI */}
          <button
            onClick={() => { soundManager.playTempleBell(432); onOpenKaalDarshi(); }}
            className="h-7 px-2.5 sm:px-3 rounded-lg text-xs font-mono font-bold text-[#fde047] hover:text-black hover:bg-[#e8913a] transition-all flex items-center gap-1.5 whitespace-nowrap"
            title="Open KaalDarshi AI Unified Research Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-serif">कालदर्शी AI</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-0.5" />

          {/* Global Knowledge Graph */}
          <button
            onClick={() => { soundManager.playClick(); onOpenKnowledgeGraph(); }}
            className="h-7 px-2.5 sm:px-3 rounded-lg text-xs font-mono font-bold text-[#a5f3fc] hover:text-black hover:bg-[#38bdf8] transition-all flex items-center gap-1.5 whitespace-nowrap"
            title="Open Global Knowledge Graph Network"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-serif">ज्ञान संजाल</span>
          </button>
        </div>

        {/* Adaptive Experience Mode Selector (Cinematic / Research / Reading) */}
        <div className="relative" ref={modeMenuRef}>
          <button
            onClick={() => { soundManager.playClick(); setIsModeMenuOpen(!isModeMenuOpen); }}
            className="h-8 px-3 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 bg-black/60 border border-white/15 hover:border-amber-500/40 text-gray-200 hover:text-white transition-all whitespace-nowrap shadow-sm"
            title="Switch Adaptive Presentation Mode"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="capitalize">{presentationMode} Mode</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {isModeMenuOpen && (
            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-80 rounded-2xl bg-[#0c0906]/98 border border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-3 z-[100] text-xs font-mono space-y-1.5 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-amber-400/80 font-bold border-b border-white/10 mb-1 flex items-center justify-between">
                <span>Adaptive Experience Mode</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">AI Tailored</span>
              </div>
              {PRESENTATION_MODES.map(pm => {
                const isActive = presentationMode === pm.id;
                return (
                  <button
                    key={pm.id}
                    onClick={() => {
                      soundManager.playClick();
                      onChangePresentationMode(pm.id);
                      setIsModeMenuOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex flex-col gap-1 border ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-500/25 via-amber-600/15 to-transparent text-amber-300 border-amber-400/60 font-bold shadow-lg shadow-amber-500/10' 
                        : 'text-[#efe6d6] border-white/5 hover:bg-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-xs">
                        <span className="text-sm">{pm.icon}</span>
                        <span className={isActive ? 'text-amber-300' : 'text-white'}>{pm.label}</span>
                      </span>
                      {isActive && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400 text-black font-extrabold uppercase shadow-sm">
                          Active
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] leading-relaxed pl-5 ${isActive ? 'text-amber-200/90' : 'text-[#9ca3af]'}`}>
                      {pm.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. Right: Spatial Viewers & Utilities */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Core Spatial Viewers Segmented Control */}
        <div className="inline-flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15 shadow-md backdrop-blur-md">
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
                className={`h-7 px-2.5 sm:px-3 rounded-lg text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/20 text-amber-300 border border-amber-400/60 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
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
              className="h-7 px-2.5 rounded-lg text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center gap-1 whitespace-nowrap"
              title="11D Evolution Matrix"
            >
              <Atom className="w-3.5 h-3.5 text-cyan-400" />
              <span>11D</span>
            </button>
          )}

          {/* Filter */}
          <button
            onClick={() => { soundManager.playClick(); onFilterToggle(); }}
            className={`h-7 px-2.5 rounded-lg text-xs font-serif font-bold tracking-wider uppercase transition-all flex items-center gap-1 border whitespace-nowrap ${
              activeFilterCount > 0
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : 'bg-white/5 hover:bg-white/10 text-amber-300 border-white/10'
            }`}
            title="Filters"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Filter</span>
            {activeFilterCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] bg-cyan-400 text-black font-extrabold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Ambient Sound */}
          <button
            onClick={onSoundToggle}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border ${
              !isMuted
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Theme */}
          <button
            onClick={() => { soundManager.playClick(); onThemeToggle(); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all"
            title={isLightMode ? 'Dark Mode' : 'Light Mode'}
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* About */}
          <button
            onClick={() => { soundManager.playClick(); onAboutToggle(); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all"
            title="About & Methodology"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
