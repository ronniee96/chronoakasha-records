'use client';

import React, { useState } from 'react';
import { 
  X, Atom, Dna, Flame, Globe, Rocket, Compass, BookOpen, 
  ChevronRight, Sparkles, Layers, ShieldCheck, Zap, Maximize2,
  Eye, Skull, ShieldAlert, ExternalLink, Play, Infinity as InfinityIcon, CheckCircle2, Video,
  Film, PlayCircle, Clock
} from 'lucide-react';
import { 
  EVOLUTION_FUTURE_STAGES, 
  ScientificStage, 
  APERTURE_DIMENSIONAL_GODHOOD,
  WHAT_IF_4TH_DIMENSION_VIDEO,
  FourthDimensionChapter,
  FourthDimensionPower
} from '../data/evolutionAndFutureData';
import { formatMathEquation } from '../data/dysonClusterData';
import { MathEquation } from './MathEquation';
import { soundManager } from '../utils/audio';

interface EvolutionChakraModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode: boolean;
  onSelectYearOnWheel: (numericYear: number) => void;
}

export function EvolutionChakraModal({
  isOpen,
  onClose,
  isLightMode,
  onSelectYearOnWheel,
}: EvolutionChakraModalProps) {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'physics' | 'chemistry' | 'biology' | 'dimensions' | 'requirements' | 'vedic' | 'aperture_godhood' | 'whatif_4d'>('whatif_4d');
  const [selectedDimIndex, setSelectedDimIndex] = useState<number>(4); // defaults to 4D Tesseract
  const [activeGodhoodSubTab, setActiveGodhoodSubTab] = useState<'ladder' | 'mechanisms' | 'consequences' | 'apotheosis'>('ladder');
  const [selected4DChapterIdx, setSelected4DChapterIdx] = useState<number>(0);
  const [selectedPowerId, setSelectedPowerId] = useState<string>('vault-bypass');

  if (!isOpen) return null;

  const activeStage: ScientificStage = EVOLUTION_FUTURE_STAGES[selectedStageIndex];
  const selectedDimension = APERTURE_DIMENSIONAL_GODHOOD.theDimensionalLadder[selectedDimIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-5xl h-[92vh] flex flex-col rounded-[16px] border shadow-2xl overflow-hidden transition-all duration-300 ${
          isLightMode 
            ? 'bg-[#fcf8f0] border-[#c59b27]/40 text-[#1d130a]' 
            : 'bg-gradient-to-b from-[#18110b] via-[#0f0b08] to-[#140e0a] border-[rgba(232,145,58,0.4)] text-[#efe6d6]'
        }`}
      >
        {/* TOP HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(232,145,58,0.25)] bg-[#120d09]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8913a] to-[#994710] flex items-center justify-center text-white shadow-md">
              <Atom className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
            </span>
            <div>
              <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#e8913a] block">
                SCIENTIFIC EVOLUTION & MULTIDIMENSIONAL CHAKRA • मानवेतिहास एवं कालचक्र
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#efe6d6] leading-none" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                From Primordial Hominins to 11D Spacetime & Satya Yuga Reborn
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.bell(1046.5, 0.2, 1.8);
                setActiveTab('whatif_4d');
              }}
              className={`h-7 px-2.5 rounded-full text-[10.5px] font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'whatif_4d'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-600 text-white border border-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3 text-rose-400" />
              <span className="hidden sm:inline">What If:</span>
              <span>4th Dimension</span>
            </button>

            <button
              onClick={() => {
                soundManager.bell(1046.5, 0.2, 1.8);
                setActiveTab('aperture_godhood');
              }}
              className={`h-7 px-2.5 rounded-full text-[10.5px] font-serif font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'aperture_godhood'
                  ? 'bg-gradient-to-r from-[#a855f7] to-[#7e22ce] text-white border border-[#e9d5ff] shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : 'bg-[#a855f7]/15 text-[#d8b4fe] border border-[#a855f7]/30 hover:bg-[#a855f7]/30 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#fde047]" />
              <span className="hidden sm:inline">Aperture Theory:</span>
              <span>Dimensional Godhood</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#b5a990] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN BODY: 2-COLUMN LAYOUT */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* COLUMN 1: PROGRESSION STAGES RAIL (LEFT) */}
          <div className="w-full md:w-[320px] lg:w-[360px] border-b md:border-b-0 md:border-r border-[rgba(232,145,58,0.2)] overflow-y-auto no-scrollbar bg-[#0d0906]/60 p-2 space-y-1">
            <div className="px-2 py-1.5 text-[10.5px] font-serif font-bold uppercase tracking-wider text-[#d4af37] border-b border-[rgba(232,145,58,0.15)] flex items-center justify-between">
              <span>CHRONOLOGICAL CHAKRAS ({EVOLUTION_FUTURE_STAGES.length})</span>
              <span className="text-[9px] text-[#b5a990]">7 Mya ➔ 10¹⁰⁰ CE ➔ 0</span>
            </div>

            {EVOLUTION_FUTURE_STAGES.map((stg, idx) => {
              const isSelected = idx === selectedStageIndex;
              const isFuture = stg.category === 'future_civilization' || stg.category === 'cosmic_renewal';

              return (
                <button
                  key={stg.id}
                  onClick={() => {
                    soundManager.bell(idx === 14 ? 1046.5 : 880, 0.18, 1.4);
                    setSelectedStageIndex(idx);
                  }}
                  className={`w-full p-2.5 rounded-[8px] text-left transition-all duration-200 border flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#e8913a]/30 via-[#e8913a]/15 to-transparent border-[#e8913a] shadow-[0_0_12px_rgba(232,145,58,0.3)]'
                      : 'border-transparent hover:border-[rgba(232,145,58,0.2)] hover:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-mono font-bold mt-0.5 ${
                    isSelected 
                      ? 'bg-[#e8913a] text-[#0d0a08]' 
                      : isFuture
                      ? 'bg-[#c57922]/20 text-[#fde047] border border-[#fde047]/30'
                      : 'bg-white/10 text-[#b5a990]'
                  }`}>
                    {idx + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 leading-none mb-1">
                      <span className="text-[10px] font-mono text-[#e8913a] font-semibold truncate">
                        {stg.timeEpoch}
                      </span>
                      {stg.kardashevScale && (
                        <span className="text-[8.5px] font-mono px-1 rounded bg-black/40 text-[#fde047] border border-white/5 shrink-0">
                          {stg.kardashevScale.split('(')[0].trim()}
                        </span>
                      )}
                    </div>
                    <h4 className={`text-xs font-serif font-bold truncate leading-tight ${isSelected ? 'text-white' : 'text-[#e9dfcc]'}`}>
                      {stg.title}
                    </h4>
                    <span className="text-[10px] font-serif text-[#b5a990] truncate block mt-0.5" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                      {stg.sanskritTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* COLUMN 2: DEEP SCIENTIFIC & MULTIDIMENSIONAL DOSSIER (RIGHT) */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#120d09]/90">
            
            {/* STAGE HEADER */}
            <div className="p-4 sm:p-5 border-b border-[rgba(232,145,58,0.2)] bg-[#16100c] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-[#e8913a] block">
                    STAGE {activeStage.order} • {activeStage.timeEpoch} • {activeStage.sanskritTitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#efe6d6] leading-tight" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                    {activeStage.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    soundManager.bell(880, 0.2, 1.8);
                    onSelectYearOnWheel(activeStage.numericYear);
                    onClose();
                  }}
                  className="h-8 px-3 rounded-[6px] text-xs font-serif font-bold uppercase tracking-wider bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <span>Jump on Chakra Wheel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-[#b5a990] font-serif leading-relaxed">
                {activeStage.summary}
              </p>

              {/* Dimensional & Energetic Badge Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-black/50 border border-[rgba(232,145,58,0.3)] text-[#fde047]">
                  Dimensions: <strong>{activeStage.dimensions}</strong>
                </span>
                {activeStage.kardashevScale && (
                  <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-black/50 border border-[rgba(232,145,58,0.3)] text-[#6fb0b2]">
                    Energy: <strong>{activeStage.kardashevScale}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* NAVIGATION TABS */}
            <div className="flex items-center gap-1 p-2 border-b border-[rgba(232,145,58,0.18)] bg-[#0d0905] overflow-x-auto no-scrollbar">
              {[
                { id: 'whatif_4d', label: '🎬 What If 4D Theater', icon: Film, isRose: true },
                { id: 'physics', label: 'Physics & Equations', icon: Atom },
                { id: 'chemistry', label: 'Chemistry & Reactions', icon: Flame },
                { id: 'biology', label: 'Biology & Cognition', icon: Dna },
                { id: 'dimensions', label: 'Spacetime Topology (4D/5D/11D)', icon: Layers },
                { id: 'requirements', label: 'Stage Requirements', icon: Zap },
                { id: 'vedic', label: 'Vedic Synthesis', icon: BookOpen },
                { id: 'aperture_godhood', label: '✦ Aperture Dimensional Godhood', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isSpecial = tab.id === 'aperture_godhood';
                const isRose = (tab as any).isRose;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundManager.tick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`h-8 px-3 rounded-[6px] text-xs font-serif font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      isActive 
                        ? isRose
                          ? 'bg-gradient-to-r from-rose-500 to-amber-600 text-white font-bold shadow-[0_0_12px_rgba(244,63,94,0.4)] border border-rose-300/40'
                          : isSpecial
                          ? 'bg-gradient-to-r from-[#a855f7] to-[#7e22ce] text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-[#e9d5ff]/40'
                          : 'bg-[#e8913a] text-[#0d0a08] font-bold shadow' 
                        : isRose
                        ? 'text-rose-300 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30'
                        : isSpecial
                        ? 'text-[#d8b4fe] bg-[#a855f7]/10 hover:bg-[#a855f7]/25 border border-[#a855f7]/30'
                        : 'text-[#b5a990] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-serif text-xs leading-relaxed">
              
              {/* TAB 0: WHAT IF 4TH DIMENSION THEATER */}
              {activeTab === 'whatif_4d' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Hero Header */}
                  <div className="p-4 rounded-[12px] bg-gradient-to-r from-[#2a131a] via-[#1a0f12] to-[#140e0a] border border-rose-500/40 shadow-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/20 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                          WHAT IF SCIENCE SHOW DOCUMENTARY
                        </span>
                        <span className="text-xs font-mono text-gray-400">
                          {WHAT_IF_4TH_DIMENSION_VIDEO.creator}
                        </span>
                      </div>
                      <a
                        href={WHAT_IF_4TH_DIMENSION_VIDEO.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md text-[10.5px] font-mono font-bold bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15 flex items-center gap-1.5 transition-all"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-[#fde047]">
                      {WHAT_IF_4TH_DIMENSION_VIDEO.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {WHAT_IF_4TH_DIMENSION_VIDEO.synopsis}
                    </p>
                  </div>

                  {/* Responsive 16:9 Video Embed */}
                  <div className="relative rounded-2xl overflow-hidden border border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.25)] bg-black">
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={`${WHAT_IF_4TH_DIMENSION_VIDEO.embedUrl}?rel=0`}
                        title={WHAT_IF_4TH_DIMENSION_VIDEO.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>

                  {/* Interactive Chapter Timeline (7 chapters) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Documentary Chapters & Timestamp Navigator</span>
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        Click any chapter to inspect 4D proofs
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
                      {WHAT_IF_4TH_DIMENSION_VIDEO.chapters.map((ch, idx) => {
                        const isSelected = selected4DChapterIdx === idx;
                        return (
                          <button
                            key={ch.timestamp}
                            onClick={() => {
                              soundManager.tick();
                              setSelected4DChapterIdx(idx);
                            }}
                            className={`p-2 rounded-lg border text-left transition-all ${
                              isSelected
                                ? 'bg-rose-500/25 border-rose-400 text-rose-200 shadow-md shadow-rose-500/20'
                                : 'bg-black/50 border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-400'
                            }`}
                          >
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/70 border border-rose-500/30 text-rose-300 block w-fit mb-1">
                              {ch.timestamp}
                            </span>
                            <div className="text-[11px] font-serif font-bold text-white truncate">
                              {ch.title}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Chapter Detail Card */}
                    {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx] && (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#1d1216] via-[#140d10] to-[#0c0906] border border-rose-500/30 space-y-3 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest block">
                              Chapter 0{selected4DChapterIdx + 1} • {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].timestamp}
                            </span>
                            <h4 className="text-sm sm:text-base font-serif font-black text-[#fde047]">
                              {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].title}
                            </h4>
                            <p className="text-[11px] font-mono text-cyan-300">
                              {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].tagline}
                            </p>
                          </div>

                          <a
                            href={`${WHAT_IF_4TH_DIMENSION_VIDEO.url}&t=${WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].seconds}s`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-all"
                          >
                            <PlayCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Jump to {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].timestamp}</span>
                          </a>
                        </div>

                        <p className="text-xs text-gray-200 leading-relaxed font-sans">
                          {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                          {WHAT_IF_4TH_DIMENSION_VIDEO.chapters[selected4DChapterIdx].keyPoints.map((pt, pIdx) => (
                            <div key={pIdx} className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-mono text-[9px] font-bold shrink-0 mt-0.5">
                                {pIdx + 1}
                              </span>
                              <span className="text-[11px] text-gray-300 leading-relaxed font-sans">
                                {pt}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4 Superbeing Powers Dossier */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The 4 Superbeing Capabilities (Indistinguishable from Godhood)</span>
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        Select a power to inspect Flatland mechanics
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {WHAT_IF_4TH_DIMENSION_VIDEO.superbeingPowers.map((pow) => {
                        const isCurrent = selectedPowerId === pow.id;
                        return (
                          <button
                            key={pow.id}
                            onClick={() => {
                              soundManager.tick();
                              setSelectedPowerId(pow.id);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              isCurrent
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                                : 'bg-black/50 border-white/10 hover:border-white/20 text-gray-400'
                            }`}
                          >
                            <span className="text-[9px] font-mono text-cyan-300 block uppercase">
                              {pow.category}
                            </span>
                            <h5 className="text-xs font-serif font-bold text-white line-clamp-1 mt-0.5">
                              {pow.name}
                            </h5>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Power Inspector */}
                    {(() => {
                      const activePow = WHAT_IF_4TH_DIMENSION_VIDEO.superbeingPowers.find(p => p.id === selectedPowerId) || WHAT_IF_4TH_DIMENSION_VIDEO.superbeingPowers[0];
                      return (
                        <div className="p-4 rounded-xl bg-gradient-to-b from-[#1c140d] to-[#100a06] border border-amber-500/30 space-y-3 shadow-lg">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
                            <div>
                              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                                {activePow.sanskritName}
                              </span>
                              <h4 className="text-sm font-serif font-black text-[#fde047]">
                                {activePow.name}
                              </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                              {activePow.category} Mechanics
                            </span>
                          </div>

                          <p className="text-xs text-gray-200 leading-relaxed font-sans">
                            {activePow.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 rounded bg-black/60 border border-white/10 space-y-1">
                              <strong className="text-cyan-400 block font-mono text-[10.5px]">
                                📐 The Flatland Analogy:
                              </strong>
                              <p className="text-gray-300 text-[11px] leading-relaxed">
                                {activePow.flatlandAnalogy}
                              </p>
                            </div>
                            <div className="p-2.5 rounded bg-black/60 border border-white/10 space-y-1">
                              <strong className="text-amber-400 block font-mono text-[10.5px]">
                                ⚡ Physical & Theoretical Mechanism:
                              </strong>
                              <p className="text-gray-300 text-[11px] leading-relaxed">
                                {activePow.physicalMechanism}
                              </p>
                            </div>
                          </div>

                          <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-[#fde047] leading-relaxed">
                            <strong className="text-amber-300 font-mono block mb-0.5">🕉️ Vedic Parallel:</strong>
                            {activePow.vedicParallel}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Grand Philosophical & Bhagavad Gita 11 Viśvarūpa Resolution */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#20150d] via-[#140e09] to-[#0d0906] border border-amber-500/30 space-y-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🕉️</span>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          BHAGAVAD GITA 11.8 • DIVYA CHAKSHU & THE BLOCK UNIVERSE
                        </span>
                        <h4 className="text-xs font-serif font-bold text-[#fde047]">
                          The Trans-Temporal Divine Eye
                        </h4>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-300 font-serif leading-relaxed">
                      <em>&ldquo;Na tu māṁ śakyase draṣṭum anenaiva sva-cakṣuṣā | divyaṁ dadāmi te cakṣuḥ paśya me yogam aiśvaram&rdquo;</em> (BG 11.8) — 
                      Sri Krishna tells Arjuna: <em>&ldquo;You cannot behold My true form with your physical (3D biological) eyes; therefore I bestow upon you the Divine Eye (higher-dimensional perception).&rdquo;</em> 
                      Arjuna immediately perceives all timelines simultaneously: warriors already entering the mouth of time, stars forming and dying, and past/future unified in a single transcendent block. The 4th dimension resolves the mystery of divine omnipresence not as magic, but as the natural geometry of higher space.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 1: PHYSICS & EQUATIONS */}
              {activeTab === 'physics' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block mb-1">
                      Core Physical Theories & Mechanisms
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#e9dfcc]">
                      {activeStage.physics.coreTheories.map((th, i) => (
                        <li key={i}>{th}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-black/60 border border-[rgba(232,145,58,0.3)] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#fde047] block">
                      Governing Mathematical Equations & Laws
                    </span>
                    <div className="space-y-2 text-xs bg-black/80 p-3 rounded-[6px] border border-white/5 overflow-x-auto">
                      {activeStage.physics.governingEquations.map((eq, i) => (
                        <div key={i} className="py-1 text-[#a5f3fc]">
                          <MathEquation equation={eq} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block">
                      Detailed Physical Mechanism
                    </span>
                    <p className="text-[#e9dfcc] leading-relaxed">
                      {activeStage.physics.mechanisms}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: CHEMISTRY & REACTIONS */}
              {activeTab === 'chemistry' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block mb-1">
                      Molecular & Chemical Transformations
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#e9dfcc]">
                      {activeStage.chemistry.molecularProcesses.map((proc, i) => (
                        <li key={i}>{proc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-black/60 border border-[rgba(232,145,58,0.3)] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#fde047] block">
                      Stoichiometric & Nuclear Reactions
                    </span>
                    <div className="space-y-2 text-xs bg-black/80 p-3 rounded-[6px] border border-white/5 overflow-x-auto">
                      {activeStage.chemistry.reactions.map((rxn, i) => (
                        <div key={i} className="py-1 text-[#fca5a5]">
                          <MathEquation equation={rxn} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block">
                      Industrial & Planetary Applications
                    </span>
                    <p className="text-[#e9dfcc] leading-relaxed">
                      {activeStage.chemistry.applications}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: BIOLOGY & COGNITION */}
              {activeTab === 'biology' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block mb-1">
                      Biological & Evolutionary Milestones
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#e9dfcc]">
                      {activeStage.biology.evolutionaryMilestones.map((bio, i) => (
                        <li key={i}>{bio}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#86a86c] block">
                      Genetic Architecture & Anatomical Morphology
                    </span>
                    <p className="text-[#e9dfcc] leading-relaxed">
                      {activeStage.biology.geneticMorphology}
                    </p>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9d93c9] block">
                      Neural Cognition, Language & Consciousness
                    </span>
                    <p className="text-[#e9dfcc] leading-relaxed">
                      {activeStage.biology.neuralCognition}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: SPACETIME TOPOLOGY (4D, 5D, 11D) */}
              {activeTab === 'dimensions' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3 p-3 rounded-[8px] bg-[#1a120c] border border-[rgba(232,145,58,0.3)]">
                    <Layers className="w-6 h-6 text-[#e8913a] shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#e8913a] block">
                        Dimensional Coordinate Manifold
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {activeStage.dimensionalTopology.dimensionsCount} Dimensions • {activeStage.dimensionalTopology.manifoldDescription}
                      </h4>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[10px] bg-black/60 border border-[rgba(232,145,58,0.3)] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#fde047] block">
                      Invariant Spacetime Metric Tensor $ds^2$
                    </span>
                    <div className="text-xs text-[#6fb0b2] bg-black/80 p-3 rounded-[6px] border border-white/5 overflow-x-auto">
                      <MathEquation equation={activeStage.dimensionalTopology.spacetimeMetric} />
                    </div>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block">
                      Geodesic Trajectory Behavior
                    </span>
                    <p className="text-[#e9dfcc] leading-relaxed">
                      {activeStage.dimensionalTopology.geodesicBehavior}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: STAGE TRANSITION REQUIREMENTS */}
              {activeTab === 'requirements' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#fde047] block mb-1">
                      Required Continuous Energy Threshold
                    </span>
                    <p className="font-mono text-xs text-[#efe6d6]">
                      {activeStage.transitionRequirements.energyThreshold}
                    </p>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8913a] block mb-1">
                      Technological Milestones to Attain
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#e9dfcc]">
                      {activeStage.transitionRequirements.technologicalMilestones.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-[8px] bg-white/5 border border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d98591] block mb-1">
                      Societal & Existential Hurdles
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#e9dfcc]">
                      {activeStage.transitionRequirements.societalHurdles.map((soc, i) => (
                        <li key={i}>{soc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-[8px] bg-gradient-to-r from-[#e8913a]/15 to-transparent border-l-2 border-[#e8913a]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#fde047] block mb-1">
                      Prerequisites to Unlock Next Civilization Level
                    </span>
                    <p className="text-[#e9dfcc]">
                      {activeStage.transitionRequirements.nextStagePrerequisites}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 6: VEDIC SYNTHESIS */}
              {activeTab === 'vedic' && (
                <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#26170d] to-[#140e08] border border-[rgba(232,145,58,0.35)] shadow-xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-[rgba(232,145,58,0.2)] pb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#e8913a] block">
                        Canonical Source: {activeStage.vedicSynthesis.source}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {activeStage.vedicSynthesis.concept}
                      </h4>
                    </div>
                    <span className="text-white/60 font-serif">॥ ॐ तत्सत् ॥</span>
                  </div>

                  <div className="p-3 rounded-[8px] bg-black/40 border border-white/5 text-center space-y-2">
                    <p className="text-sm font-semibold text-[#fde047] leading-relaxed" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                      {activeStage.vedicSynthesis.sanskritVerse}
                    </p>
                    <p className="text-xs italic text-[#b5a990]">
                      &quot;{activeStage.vedicSynthesis.transliteration}&quot;
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#efe6d6] block">
                      English Translation:
                    </span>
                    <p className="text-xs text-[#e9dfcc] leading-relaxed">
                      {activeStage.vedicSynthesis.translation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[rgba(232,145,58,0.18)] space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#d4af37] block">
                      Philosophical & Cosmological Parallel:
                    </span>
                    <p className="text-xs text-[#b5a990] leading-relaxed">
                      {activeStage.vedicSynthesis.philosophicalMeaning}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 7: APERTURE DIMENSIONAL THEORY & GODHOOD APOTHEOSIS */}
              {activeTab === 'aperture_godhood' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Source Video & Attribution Plaque */}
                  <div className="p-4 rounded-[12px] bg-gradient-to-r from-[#2a133d] via-[#1a0e28] to-[#120a1c] border border-[#a855f7]/40 shadow-xl space-y-3 relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#a855f7]/25 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#a855f7] flex items-center justify-center text-white shadow-md">
                          <Video className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d8b4fe] block">
                            THEORETICAL COSMOLOGY & HIGHER-DIMENSIONAL TRANSCENDENCE
                          </span>
                          <h4 className="text-sm font-serif font-bold text-white">
                            {APERTURE_DIMENSIONAL_GODHOOD.sourceVideo.title}
                          </h4>
                        </div>
                      </div>

                      <a
                        href={APERTURE_DIMENSIONAL_GODHOOD.sourceVideo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-serif font-bold bg-[#ff0000]/20 hover:bg-[#ff0000]/30 text-white border border-[#ff0000]/50 transition-all shadow-sm group"
                      >
                        <Play className="w-3.5 h-3.5 text-[#ff4444] fill-current group-hover:scale-110 transition-transform" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3 text-white/70" />
                      </a>
                    </div>

                    <p className="text-xs text-[#e9d5ff] leading-relaxed italic">
                      &quot;{APERTURE_DIMENSIONAL_GODHOOD.sourceVideo.coreThesis}&quot;
                    </p>
                  </div>

                  {/* Sub-Navigation Modules */}
                  <div className="flex items-center gap-1.5 p-1 rounded-[8px] bg-black/60 border border-[rgba(232,145,58,0.25)] overflow-x-auto no-scrollbar">
                    {[
                      { id: 'ladder', label: '0D ➔ 11D Multiverse Ladder', icon: Layers },
                      { id: 'mechanisms', label: 'The 4 Godhood Mechanics', icon: Eye },
                      { id: 'consequences', label: 'The 4 Terrifying Consequences', icon: Skull },
                      { id: 'apotheosis', label: 'Ascent to Godhood & Vedic Ouroboros', icon: InfinityIcon },
                    ].map((st) => {
                      const Icon = st.icon;
                      const isActive = activeGodhoodSubTab === st.id;
                      return (
                        <button
                          key={st.id}
                          onClick={() => {
                            soundManager.tick();
                            setActiveGodhoodSubTab(st.id as any);
                          }}
                          className={`flex-1 py-1.5 px-2.5 rounded-[6px] text-[11px] font-serif transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] font-bold shadow-md'
                              : 'text-[#b5a990] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{st.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* SUB-TAB 1: 0D ➔ 11D MULTIVERSE LADDER */}
                  {activeGodhoodSubTab === 'ladder' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      {/* Interactive Dimension Selector Bar */}
                      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                        {APERTURE_DIMENSIONAL_GODHOOD.theDimensionalLadder.map((dim, idx) => {
                          const isSelected = idx === selectedDimIndex;
                          return (
                            <button
                              key={dim.dimension}
                              onClick={() => {
                                soundManager.bell(440 + idx * 55, 0.15, 1.2);
                                setSelectedDimIndex(idx);
                              }}
                              className={`h-8 px-2.5 rounded-[6px] text-[10.5px] font-mono font-bold transition-all whitespace-nowrap border shrink-0 ${
                                isSelected
                                  ? 'bg-[#fde047] text-[#0d0a08] border-[#fde047] shadow-[0_0_10px_rgba(253,224,71,0.4)]'
                                  : 'bg-black/40 text-[#b5a990] border-white/10 hover:border-[#e8913a]/50 hover:text-white'
                              }`}
                            >
                              {dim.dimension}D
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Dimension Dossier Card */}
                      <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#1a120b] to-[#100a06] border border-[rgba(232,145,58,0.35)] shadow-xl space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(232,145,58,0.2)] pb-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-[#e8913a] uppercase block">
                              DIMENSIONAL LEVEL {selectedDimension.dimension} • {selectedDimension.sanskritName}
                            </span>
                            <h4 className="text-base font-serif font-bold text-[#fde047]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                              {selectedDimension.label}
                            </h4>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-white/10 text-[#a5f3fc] border border-[#a5f3fc]/30">
                              {selectedDimension.geometryType}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10.5px] font-serif bg-[#e8913a]/20 text-[#fde047] border border-[#e8913a]/40">
                              {selectedDimension.vedicCosmologicalEquivalent}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2.5 text-xs text-[#e9dfcc]">
                          <div className="p-2.5 rounded-[6px] bg-white/5 border border-white/5">
                            <strong className="text-[#e8913a] block mb-0.5">Spatial Topology & Geometry:</strong>
                            <p>{selectedDimension.spatialDescription}</p>
                          </div>

                          <div className="p-2.5 rounded-[6px] bg-white/5 border border-white/5">
                            <strong className="text-[#d98591] block mb-0.5">Human Perception Boundary (Why We Are Blind To It):</strong>
                            <p>{selectedDimension.humanPerceptionLimit}</p>
                          </div>

                          <div className="p-2.5 rounded-[6px] bg-[#2a170d]/50 border border-[rgba(232,145,58,0.25)]">
                            <strong className="text-[#6fb0b2] block mb-0.5">Entity Capabilities in this Dimension:</strong>
                            <p>{selectedDimension.entityCapabilities}</p>
                          </div>

                          {selectedDimension.dimension === 4 && (
                            <div className="p-3 rounded-lg bg-gradient-to-r from-rose-500/20 via-black to-amber-500/10 border border-rose-500/30 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <Film className="w-4 h-4 text-rose-400 shrink-0" />
                                <span className="text-xs text-rose-200 font-serif">
                                  <strong>Featured Documentary:</strong> What If You Could See the 4th Dimension?
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setActiveTab('whatif_4d');
                                }}
                                className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 transition-all shadow active:scale-95"
                              >
                                <span>Launch 4D Theater</span>
                                <PlayCircle className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: THE 4 GODHOOD MECHANICS */}
                  {activeGodhoodSubTab === 'mechanisms' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <p className="text-xs text-[#b5a990] italic">
                        Why an entity in the 4th, 5th, or 11th dimension possesses powers that are indistinguishable from Godhood (Omnipresence, Omniscience, Miracle Healing, and Reality Creation):
                      </p>

                      <div className="grid grid-cols-1 gap-3">
                        {APERTURE_DIMENSIONAL_GODHOOD.godhoodMechanisms.map((mech) => (
                          <div 
                            key={mech.id}
                            className="p-3.5 rounded-[10px] bg-gradient-to-b from-[#1c130c] to-[#120b06] border border-[rgba(232,145,58,0.3)] shadow-md space-y-2"
                          >
                            <div className="flex items-center justify-between border-b border-[rgba(232,145,58,0.18)] pb-1.5">
                              <h4 className="text-xs font-serif font-bold text-[#fde047]">
                                {mech.title}
                              </h4>
                              <span className="text-[10.5px] font-serif text-[#e8913a]">
                                {mech.sanskritParallel}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              <div className="p-2 rounded bg-black/40 border border-white/5">
                                <strong className="text-[#6fb0b2] block mb-1">📐 The Flatland Analogy:</strong>
                                <p className="text-[#b5a990] leading-relaxed">{mech.flatlandAnalogy}</p>
                              </div>
                              <div className="p-2 rounded bg-black/40 border border-white/5">
                                <strong className="text-[#e8913a] block mb-1">⚡ Manifestation in 3D Space (Godhood):</strong>
                                <p className="text-[#e9dfcc] leading-relaxed">{mech.manifestationIn3D}</p>
                              </div>
                            </div>

                            <div className="pt-1 text-[11px] text-[#b5a990] border-t border-white/5">
                              <strong className="text-[#efe6d6]">Theoretical Physics Foundation: </strong>
                              {mech.scientificExplanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 3: THE 4 TERRIFYING CONSEQUENCES */}
                  {activeGodhoodSubTab === 'consequences' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="p-2.5 rounded-[8px] bg-red-950/20 border border-red-500/30 text-xs text-[#fca5a5]">
                        <span className="font-bold flex items-center gap-1.5 mb-1 text-red-400">
                          <ShieldAlert className="w-4 h-4" />
                          Existential Dread & Cosmic Vulnerability
                        </span>
                        Higher spatial dimensions provide godlike omnipotence to their inhabitants, but for 3-dimensional humans, they expose terrifying vulnerabilities from which there is zero defense:
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {APERTURE_DIMENSIONAL_GODHOOD.terrifyingConsequences.map((c) => (
                          <div 
                            key={c.id}
                            className="p-3.5 rounded-[10px] bg-gradient-to-b from-[#180e0c] via-[#100806] to-[#0d0605] border border-red-500/25 shadow-lg space-y-2 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between border-b border-red-500/20 pb-1.5 mb-2">
                                <h4 className="text-xs font-serif font-bold text-red-300">
                                  {c.title}
                                </h4>
                                <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase bg-red-900/40 text-red-200 border border-red-500/30">
                                  {c.threatLevel}
                                </span>
                              </div>

                              <p className="text-xs font-semibold text-[#efe6d6] mb-1.5">
                                {c.premise}
                              </p>
                              <p className="text-xs text-[#b5a990] leading-relaxed mb-2">
                                {c.mechanics}
                              </p>
                              <p className="text-xs text-[#fca5a5]/90 leading-relaxed p-2 rounded bg-black/40 border border-red-900/30">
                                <strong className="text-red-300 block mb-0.5">Human Vulnerability:</strong>
                                {c.implicationForHumanity}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-red-500/15 text-[11px] italic text-[#fde047]">
                              &quot;{c.philosophicalVerdict}&quot;
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 4: HUMANITY'S ASCENT TO GODHOOD & VEDIC OUROBOROS */}
                  {activeGodhoodSubTab === 'apotheosis' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="p-3.5 rounded-[10px] bg-gradient-to-r from-[#22150a] via-[#190e06] to-[#120904] border border-[#e8913a]/40 shadow-md">
                        <span className="text-[10px] font-mono font-bold text-[#e8913a] uppercase block">
                          THE 5-PHASE POST-HUMAN DIMENSIONAL EVOLUTION ROADMAP
                        </span>
                        <h4 className="text-sm font-serif font-bold text-[#fde047]">
                          How Humanity Evolves from 3D Primates to 11D Cosmic Gods
                        </h4>
                        <p className="text-xs text-[#b5a990] mt-1 leading-relaxed">
                          Humans are not destined to remain trapped in 3D biological meat sacks. Through technological, cognitive, and dimensional expansion, our species ascends the dimensional ladder:
                        </p>
                      </div>

                      {/* 5 Evolutionary Phases */}
                      <div className="space-y-2.5">
                        {APERTURE_DIMENSIONAL_GODHOOD.humanTranscendenceRoadmap.map((p) => (
                          <div 
                            key={p.phase}
                            className="p-3 rounded-[8px] bg-black/40 border border-[rgba(232,145,58,0.25)] space-y-1.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-white/5 pb-1">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#e8913a] text-[#0d0a08] flex items-center justify-center text-[10px] font-mono font-bold">
                                  {p.phase}
                                </span>
                                <h5 className="text-xs font-serif font-bold text-[#efe6d6]">
                                  {p.title}
                                </h5>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                <span className="text-[#e8913a]">{p.tier}</span>
                                <span className="text-[#b5a990]">({p.timeframe})</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11.5px] pt-1">
                              <div className="p-2 rounded bg-white/5">
                                <strong className="text-[#6fb0b2] block mb-0.5">Evolutionary Mechanism:</strong>
                                <p className="text-[#b5a990]">{p.evolutionaryMechanism}</p>
                              </div>
                              <div className="p-2 rounded bg-white/5">
                                <strong className="text-[#fde047] block mb-0.5">Dimensional Attainment:</strong>
                                <p className="text-[#b5a990]">{p.dimensionalAttainment}</p>
                              </div>
                              <div className="p-2 rounded bg-white/5">
                                <strong className="text-[#d98591] block mb-0.5">Godlike Super-Power:</strong>
                                <p className="text-[#b5a990]">{p.godlikeAttainment}</p>
                              </div>
                            </div>

                            <p className="text-[10.5px] italic text-[#e8913a] pt-1">
                              Vedic Canonical Echo: {p.vedicCanonicalEcho}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Vedic Ouroboros Grand Synthesis */}
                      <div className="p-4 rounded-[12px] bg-gradient-to-b from-[#2a170d] to-[#150a04] border border-[#e8913a]/50 shadow-xl space-y-2.5">
                        <div className="flex items-center justify-between border-b border-[rgba(232,145,58,0.25)] pb-1.5">
                          <span className="text-xs font-serif font-bold text-[#fde047]">
                            ॥ {APERTURE_DIMENSIONAL_GODHOOD.vedicSynthesis.title} ॥
                          </span>
                          <span className="text-[10.5px] font-serif text-[#e8913a]">
                            {APERTURE_DIMENSIONAL_GODHOOD.vedicSynthesis.source}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-[#fde047] text-center" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                          {APERTURE_DIMENSIONAL_GODHOOD.vedicSynthesis.verse}
                        </p>
                        <p className="text-xs italic text-[#b5a990] text-center">
                          &quot;{APERTURE_DIMENSIONAL_GODHOOD.vedicSynthesis.transliteration}&quot;
                        </p>
                        <p className="text-xs text-[#efe6d6] text-center leading-relaxed pt-1">
                          {APERTURE_DIMENSIONAL_GODHOOD.vedicSynthesis.translation}
                        </p>

                        <div className="pt-2 border-t border-[rgba(232,145,58,0.2)] text-xs text-[#e9dfcc] leading-relaxed">
                          <strong className="text-[#e8913a] block mb-1">The Grand Philosophical Paradox (The Closed Cosmic Circle):</strong>
                          {APERTURE_DIMENSIONAL_GODHOOD.vedicSynthesis.philosophicalResolution}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-3 border-t border-[rgba(232,145,58,0.2)] bg-[#0d0905] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  disabled={selectedStageIndex === 0}
                  onClick={() => {
                    soundManager.tick();
                    setSelectedStageIndex(prev => Math.max(0, prev - 1));
                  }}
                  className="h-8 px-3 rounded-[6px] text-xs font-serif border border-[rgba(232,145,58,0.3)] bg-white/5 hover:bg-white/10 text-[#b5a990] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Previous Stage
                </button>
                <button
                  disabled={selectedStageIndex === EVOLUTION_FUTURE_STAGES.length - 1}
                  onClick={() => {
                    soundManager.tick();
                    setSelectedStageIndex(prev => Math.min(EVOLUTION_FUTURE_STAGES.length - 1, prev + 1));
                  }}
                  className="h-8 px-3 rounded-[6px] text-xs font-serif border border-[rgba(232,145,58,0.3)] bg-white/5 hover:bg-white/10 text-[#b5a990] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next Stage
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#d4af37]">
                Stage {selectedStageIndex + 1} of {EVOLUTION_FUTURE_STAGES.length}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
