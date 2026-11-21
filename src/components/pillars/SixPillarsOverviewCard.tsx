'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Landmark, Radio, Compass, Orbit, Sparkles, Building2, 
  Bot, Database, ShieldCheck, Server, Cpu, Search,
  ArrowDown, ChevronRight, X, LayoutGrid, ListFilter,
  CheckCircle2, HelpCircle, Eye
} from 'lucide-react';
import { PillarId } from '../../types/sixPillars';
import { soundManager } from '../../utils/audio';

interface SixPillarsOverviewCardProps {
  isLightMode: boolean;
  onSelectPillar: (pillar: PillarId) => void;
  onOpenKaalDarshi: () => void;
  onExploreTimeline: () => void;
  activeYear?: number;
  activeEventTitle?: string;
}

export function SixPillarsOverviewCard({
  isLightMode,
  onSelectPillar,
  onOpenKaalDarshi,
  onExploreTimeline,
  activeYear,
  activeEventTitle,
}: SixPillarsOverviewCardProps) {
  const [viewLayout, setViewLayout] = useState<'list' | 'blueprint'>('list');
  const [showFoundationModal, setShowFoundationModal] = useState<boolean>(false);

  const pillars = [
    {
      num: '01',
      id: 'past' as PillarId,
      title: 'THE PAST',
      hindiTitle: 'अतीत',
      engineName: 'Historical Engine',
      engineResponsibility: 'Verified historical records',
      question: 'What happened before us?',
      desc: 'Ancient civilizations, human origins, archaeology, historical events, forgotten knowledge, mythology, scriptures and the evolution of humanity.',
      imageSrc: '/assets/pillars/01_the_past.jpg',
      icon: <Landmark className="w-5 h-5 text-[#d97706]" />,
      accentColor: '#d97706',
      borderGlow: 'hover:border-[#d97706]/70 hover:shadow-[0_0_24px_rgba(217,119,6,0.3)]',
    },
    {
      num: '02',
      id: 'present' as PillarId,
      title: 'THE PRESENT',
      hindiTitle: 'वर्तमान',
      engineName: 'Live Universe Engine',
      engineResponsibility: 'Current astronomical and satellite data',
      question: 'What is happening in the universe right now?',
      desc: 'Live satellite positions, space missions, planetary events, scientific discoveries, astronomical activity and global developments.',
      imageSrc: '/assets/pillars/02_the_present.jpg',
      icon: <Radio className="w-5 h-5 text-[#38bdf8]" />,
      accentColor: '#38bdf8',
      borderGlow: 'hover:border-[#38bdf8]/70 hover:shadow-[0_0_24px_rgba(56,189,248,0.3)]',
    },
    {
      num: '03',
      id: 'hinduCosmology' as PillarId,
      title: 'COSMIC WISDOM',
      hindiTitle: 'सनातन ब्रह्माण्ड',
      engineName: 'Hindu Knowledge Engine',
      engineResponsibility: 'Scriptures and traditional cosmology',
      question: 'What do ancient Hindu traditions say about time and the cosmos?',
      desc: 'Vedas, Puranas, Upanishads, Yugas, Kalpas, Manvantaras, cosmic creation, dissolution and traditional cosmological philosophy.',
      imageSrc: '/assets/pillars/03_cosmic_wisdom.jpg',
      icon: <Compass className="w-5 h-5 text-[#e8913a]" />,
      accentColor: '#e8913a',
      borderGlow: 'hover:border-[#e8913a]/70 hover:shadow-[0_0_24px_rgba(232,145,58,0.3)]',
    },
    {
      num: '04',
      id: 'celestialAtlas' as PillarId,
      title: 'THE CELESTIAL ATLAS',
      hindiTitle: 'खगोलीय मानचित्र',
      engineName: 'Celestial Engine',
      engineResponsibility: 'Planetary and constellation calculations',
      question: 'Where are the planets, stars and constellations?',
      desc: 'Solar system, planetary orbits, 88 IAU constellations, 27 Nakshatras, Rashis, eclipses, celestial coordinates and astronomical calculations.',
      imageSrc: '/assets/pillars/04_celestial_atlas.jpg',
      icon: <Orbit className="w-5 h-5 text-[#c084fc]" />,
      accentColor: '#c084fc',
      borderGlow: 'hover:border-[#c084fc]/70 hover:shadow-[0_0_24px_rgba(192,132,252,0.3)]',
    },
    {
      num: '05',
      id: 'future' as PillarId,
      title: 'THE FUTURE',
      hindiTitle: 'भविष्य',
      engineName: 'Forecasting Engine',
      engineResponsibility: 'Evidence-based forecasts and traditional interpretations',
      question: 'What might happen in the future?',
      desc: 'Astrological interpretations, astronomical predictions, scientific forecasting, technological developments, future scenarios and historical prophecies.',
      imageSrc: '/assets/pillars/05_the_future.jpg',
      icon: <Sparkles className="w-5 h-5 text-[#34d399]" />,
      accentColor: '#34d399',
      borderGlow: 'hover:border-[#34d399]/70 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]',
    },
    {
      num: '06',
      id: 'civilizations' as PillarId,
      title: 'FUTURE CIVILIZATIONS',
      hindiTitle: 'भविष्य की सभ्यता',
      engineName: 'Civilization Engine',
      engineResponsibility: 'Long-term technological and civilizational scenarios',
      question: 'What could humanity and future civilizations become?',
      desc: 'Kardashev civilizations, artificial intelligence, interplanetary colonization, interstellar travel, advanced technology and the long-term evolution of intelligence.',
      imageSrc: '/assets/pillars/06_future_civilizations.jpg',
      icon: <Building2 className="w-5 h-5 text-[#f472b6]" />,
      accentColor: '#f472b6',
      borderGlow: 'hover:border-[#f472b6]/70 hover:shadow-[0_0_24px_rgba(244,114,182,0.3)]',
    },
  ];

  return (
    <div className={`w-full min-h-full py-8 px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col items-center select-none ${
      isLightMode 
        ? 'bg-[#f7efe1] text-[#1c130b]' 
        : 'bg-[#040507] text-[#efe6d6]'
    }`}>
      <div className="w-full max-w-4xl mx-auto flex flex-col space-y-7 animate-in fade-in duration-300">
        
        {/* TOP BAR: BRAND TITLE & VIEW TOGGLE */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold tracking-wider text-[#efe6d6] uppercase flex items-center gap-2">
              <span className="text-[#d4af37]">CHRONOAKASHA</span>
              <span className="text-[#a8a29e] font-light">—</span>
              <span className="text-sm sm:text-base font-serif font-semibold text-[#f2c47a]">Six Pillars of Existence</span>
            </h1>
            <span className="text-[11px] font-mono text-[#a8a29e] tracking-widest uppercase mt-0.5">
              अतीत · वर्तमान · सनातन · ब्रह्माण्ड · भविष्य · सभ्यता
            </span>
          </div>

          {/* View Mode Toggle: List View vs Blueprint Architecture */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
            <button
              onClick={() => { soundManager.playClick(); setViewLayout('list'); }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                viewLayout === 'list'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md'
                  : 'text-[#b5a990] hover:text-[#efe6d6]'
              }`}
              title="Detailed List View (As per reference)"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LIST VIEW</span>
            </button>
            <button
              onClick={() => { soundManager.playClick(); setViewLayout('blueprint'); }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                viewLayout === 'blueprint'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md'
                  : 'text-[#b5a990] hover:text-[#efe6d6]'
              }`}
              title="Architecture Blueprint View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">BLUEPRINT</span>
            </button>
          </div>
        </div>

        {/* ----------------- CENTRAL DESIGN CONCEPT HERO BANNER ----------------- */}
        <div className="rounded-2xl border border-[rgba(232,145,58,0.35)] overflow-hidden bg-gradient-to-b from-[#18110b] via-[#0d0905] to-[#120e0a] shadow-2xl relative">
          <div className="relative w-full h-44 sm:h-56 md:h-64 overflow-hidden">
            <Image
              src="/assets/kalachakra-central-wheel.jpg"
              alt="The Central Design Concept — Kalachakra Wheel of Time"
              fill
              className="object-cover object-center brightness-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0905] via-[#0d0905]/40 to-transparent pointer-events-none" />
            <div className="absolute top-3 left-4 px-3 py-1 rounded-full bg-black/70 border border-[#e8913a]/40 text-[11px] font-mono text-[#fde047] uppercase tracking-wider backdrop-blur-md">
              The Central Design Concept
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-3 relative z-10 -mt-6">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#efe6d6] leading-snug">
              All six pillars should connect through one central interactive <span className="text-[#fde047]">कालचक्र — COSMIC WHEEL OF TIME</span>.
            </h2>
            <p className="text-xs sm:text-sm text-[#c5bba8] font-serif leading-relaxed">
              Users should be able to move between the six pillars without losing their position in the larger chronology.
            </p>

            {/* Active Chronological Anchor Indicator */}
            {activeYear !== undefined && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 text-xs font-mono text-[#b5a990]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  <span>SYNCHRONIZED ANCHOR: <strong className="text-[#fde047]">{activeYear < 0 ? `${Math.abs(activeYear)} BCE` : `${activeYear} CE`}</strong></span>
                  {activeEventTitle && <span className="hidden md:inline truncate max-w-xs text-[#a8a29e]">({activeEventTitle})</span>}
                </div>
                <button
                  onClick={onExploreTimeline}
                  className="px-2.5 py-1 rounded bg-[#e8913a]/20 border border-[#e8913a]/40 text-[#fde047] hover:bg-[#e8913a] hover:text-black transition-colors"
                >
                  View on Wheel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ----------------- VIEW MODE 1: EXACT SCREENSHOT DETAILED LIST VIEW ----------------- */}
        {viewLayout === 'list' && (
          <div className="flex flex-col space-y-6 divide-y divide-white/5">
            {pillars.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  soundManager.bell(880, 0.15, 1.2);
                  onSelectPillar(p.id);
                }}
                className={`pt-6 first:pt-0 cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl transition-all duration-300 ${
                  isLightMode
                    ? 'hover:bg-[#ede0ca]/60 border border-transparent hover:border-[#c59b27]/30'
                    : 'hover:bg-white/[0.03] border border-transparent hover:border-white/10'
                }`}
              >
                {/* Pillar Square Image Thumbnail (rounded corners matching reference) */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/15 bg-black/60 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={p.imageSrc}
                    alt={`${p.title} - ${p.hindiTitle}`}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                    priority={p.num === '01' || p.num === '02'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Block */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-sans font-bold tracking-wide text-[#efe6d6] group-hover:text-[#fde047] transition-colors flex items-center gap-2">
                    <span className="font-mono text-[#d4af37]">{p.num} —</span>
                    <span>{p.title}</span>
                    <span className="text-[#a8a29e] font-light">|</span>
                    <span className="font-serif text-[#f2c47a]" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                      {p.hindiTitle}
                    </span>
                  </h3>

                  <p className="text-sm font-serif italic text-[#c2b69d] mt-1 group-hover:text-[#f8ecd5] transition-colors leading-relaxed">
                    {p.question}
                  </p>

                  <p className="text-xs sm:text-[13px] font-sans text-[#9ca3af] leading-relaxed mt-1.5 group-hover:text-[#d1d5db] transition-colors">
                    {p.desc}
                  </p>
                </div>

                <div className="hidden sm:flex items-center text-[#b5a990] group-hover:text-[#fde047] group-hover:translate-x-1.5 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ----------------- VIEW MODE 2: BLUEPRINT ARCHITECTURE VIEW ----------------- */}
        {viewLayout === 'blueprint' && (
          <div className="flex flex-col space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    soundManager.bell(880, 0.15, 1.2);
                    onSelectPillar(p.id);
                  }}
                  className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isLightMode 
                      ? 'bg-[#f0e4d0] border-[#c59b27]/30 text-[#1c130b] hover:bg-[#eadeca]' 
                      : 'bg-[#101218] border-white/10 text-[#efe6d6] hover:bg-[#141822]'
                  } ${p.borderGlow}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#b5a990] tracking-widest">
                      {p.num}
                    </span>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                      {p.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold tracking-wider text-[#efe6d6] group-hover:text-[#fde047] transition-colors">
                      {p.title}
                    </h3>
                    <h4 className="text-xs font-mono font-medium text-[#b5a990] mt-0.5 tracking-wide">
                      {p.engineName} • <span className="font-serif" style={{ color: p.accentColor }}>{p.hindiTitle}</span>
                    </h4>
                    <p className="text-xs text-[#a39782] font-serif leading-relaxed mt-2 line-clamp-2">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#b5a990] group-hover:text-[#fde047] transition-colors">
                    <span>EXPLORE PILLAR</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* KAALDARSHI AI BANNER */}
            <div 
              onClick={() => {
                soundManager.bell(1046.5, 0.2, 1.4);
                onOpenKaalDarshi();
              }}
              className={`w-full cursor-pointer rounded-2xl p-5 text-center border shadow-xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.01] ${
                isLightMode 
                  ? 'bg-gradient-to-r from-[#eadeca] via-[#f4ebd9] to-[#eadeca] border-[#e8913a]/50' 
                  : 'bg-gradient-to-r from-[#120d09] via-[#1a140d] to-[#120d09] border-[rgba(232,145,58,0.4)] hover:border-[#e8913a] hover:shadow-[0_0_30px_rgba(232,145,58,0.3)]'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Bot className="w-5 h-5 text-[#e8913a] animate-pulse" />
                <h2 className="text-base font-display font-bold tracking-[0.2em] text-[#fde047] uppercase">
                  KAALDARSHI AI
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-serif text-[#efe6d6] leading-relaxed max-w-2xl mx-auto">
                Shared research, citations, knowledge graph and cross-pillar intelligence
              </p>
            </div>

            {/* SHARED FOUNDATION PILL CARD */}
            <div 
              onClick={() => {
                soundManager.playClick();
                setShowFoundationModal(true);
              }}
              className={`w-full cursor-pointer rounded-2xl p-4 text-center border shadow-lg transition-all duration-300 relative overflow-hidden group hover:scale-[1.005] ${
                isLightMode 
                  ? 'bg-[#e2d5bd] border-[#b5a990]/40 text-[#1c130b]' 
                  : 'bg-[#181a20] border-white/10 text-[#efe6d6] hover:bg-[#1e222a] hover:border-[#6fb0b2]/50'
              }`}
            >
              <h3 className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-[#e8dfcf] uppercase flex items-center justify-center gap-2">
                <Database className="w-4 h-4 text-[#6fb0b2]" />
                SHARED FOUNDATION
              </h3>
              <p className="text-[11px] sm:text-xs font-mono text-[#9ca3af] mt-1 tracking-wider">
                PostgreSQL · Prisma · Source Archive · APIs · Search · Security
              </p>
            </div>
          </div>
        )}

        {/* ----------------- IMPORTANT ARCHITECTURAL DECISION TABLE ----------------- */}
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0d0e12] space-y-4">
          <div className="border-b border-white/10 pb-2">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#d4af37]">
              Important architectural decision
            </h3>
            <p className="text-xs font-serif text-[#b5a990] mt-0.5">
              Build these as six independent knowledge engines connected to one shared platform:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-[#fde047]">
                  <th className="pb-2.5 font-bold uppercase tracking-wider">Engine</th>
                  <th className="pb-2.5 font-bold uppercase tracking-wider">Main responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {pillars.map((p) => (
                  <tr 
                    key={p.id} 
                    onClick={() => onSelectPillar(p.id)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 font-mono font-medium text-[#efe6d6]">{p.engineName}</td>
                    <td className="py-2.5 text-[#9ca3af]">{p.engineResponsibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-xs font-serif text-[#c5bba8] leading-relaxed">
            The AI research assistant connects all six, retrieves sources, explains relationships and distinguishes evidence from belief and speculation.
          </div>
        </div>

        {/* ----------------- ONE FINAL PRINCIPLE MANIFESTO ----------------- */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[rgba(232,145,58,0.3)] bg-gradient-to-r from-[#170e08] via-[#1f130b] to-[#170e08] space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e8913a]">
            One final principle
          </h4>
          <p className="text-xs sm:text-sm font-serif text-[#efe6d6] leading-relaxed italic">
            &quot;Chronoakasha should never claim to know the future with certainty. Its strength should be showing what is known, what traditions teach, what science predicts, what remains uncertain and what humanity could potentially achieve.&quot;
          </p>
        </div>

        {/* BOTTOM ACTION BAR: KAALDARSHI AI QUICK JUMP & KALACHAKRA WHEEL */}
        <div className="pt-3 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              soundManager.bell(1046.5, 0.2, 1.4);
              onOpenKaalDarshi();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#e8913a]/50 bg-gradient-to-r from-[#2a170c] to-[#170e08] text-[#fde047] hover:border-[#e8913a] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
          >
            <Bot className="w-4 h-4 text-[#e8913a]" />
            <span>Launch KaalDarshi AI Assistant</span>
          </button>

          <button
            onClick={() => {
              soundManager.bell(880, 0.15, 1.2);
              onExploreTimeline();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-[#efe6d6] hover:text-[#fde047] hover:border-[#e8913a] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
          >
            <span>Explore Kalachakra Wheel</span>
            <ArrowDown className="w-4 h-4 text-[#d4af37]" />
          </button>
        </div>

      </div>

      {/* SHARED FOUNDATION MODAL */}
      {showFoundationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0e1017] border border-[rgba(232,145,58,0.4)] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#efe6d6] space-y-5 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowFoundationModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#b5a990] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <Database className="w-5 h-5 text-[#6fb0b2]" />
              <div>
                <h3 className="text-base font-mono font-bold tracking-wider text-[#fde047] uppercase">
                  SHARED FOUNDATION ARCHITECTURE
                </h3>
                <p className="text-xs font-mono text-[#b5a990]">
                  Core Engineering & Data Integrity Infrastructure
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#38bdf8] font-bold">
                  <Server className="w-3.5 h-3.5" />
                  <span>PostgreSQL & Prisma ORM</span>
                </div>
                <p className="text-[11px] font-serif text-[#b5a990] leading-relaxed">
                  2,006+ attested timeline records with foreign-keyed primary citations, scriptural verses, and astronomical coordinates.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#e8913a] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>8-Tier Epistemic Security</span>
                </div>
                <p className="text-[11px] font-serif text-[#b5a990] leading-relaxed">
                  Strict classification from Tier A (Empirical Astrophysics) to Tier H (Speculative Type IX Civilization), preventing misinformation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#34d399] font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Real-time Astrodynamics APIs</span>
                </div>
                <p className="text-[11px] font-serif text-[#b5a990] leading-relaxed">
                  Local VSOP87 analytical ephemeris, Chitrapaksha Lahiri Ayanamsa, and CelesTrak TLE orbital propagation via satellite.js.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#c084fc] font-bold">
                  <Search className="w-3.5 h-3.5" />
                  <span>Zero-Latency Semantic Search</span>
                </div>
                <p className="text-[11px] font-serif text-[#b5a990] leading-relaxed">
                  Indexed multi-field search across titles, transliterations, Puranic corpora, epigraphic records, and tags with sub-10ms response.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8c8273]">
                CHRONOAKASHA v2.5 MASTER CORE
              </span>
              <button
                onClick={() => setShowFoundationModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#e8913a] text-black font-mono font-bold text-xs hover:bg-[#fde047] transition-colors"
              >
                Close Architecture View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
