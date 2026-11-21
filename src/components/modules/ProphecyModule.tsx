'use client';

import React, { useState } from 'react';
import { Eye, ShieldAlert, CheckCircle, AlertTriangle, HelpCircle, XCircle, Search, Filter } from 'lucide-react';
import { ALL_PROPHECIES, ProphecyRecord } from '../../data/prophecyData';
import { soundManager } from '../../utils/audio';

interface ProphecyModuleProps {
  isLightMode?: boolean;
}

const TRADITIONS = [
  'All Traditions',
  'Hindu Puranic',
  'Kalki Tradition',
  'Nostradamus',
  'Mayan Calendar',
  'Biblical',
  'Buddhist',
  'Modern Futurist & Science'
] as const;

const EPISTEMIC_FILTERS = [
  'All Epistemic States',
  'Fulfilled',
  'Unfulfilled (Future Horizon)',
  'Disputed Interpretation',
  'Debunked / Misrepresented',
  'Hypothetical Scenario'
] as const;

export function ProphecyModule({ isLightMode }: ProphecyModuleProps) {
  const [selectedTradition, setSelectedTradition] = useState<string>('All Traditions');
  const [selectedEpistemic, setSelectedEpistemic] = useState<string>('All Epistemic States');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeProphecyId, setActiveProphecyId] = useState<string>(ALL_PROPHECIES[0]?.id || '');

  const filteredProphecies = ALL_PROPHECIES.filter(p => {
    const matchesTradition = selectedTradition === 'All Traditions' || p.tradition === selectedTradition;
    const matchesEpistemic = selectedEpistemic === 'All Epistemic States' || p.epistemicStatus === selectedEpistemic;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sourceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authorOrTradition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.interpretation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.originalQuote.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTradition && matchesEpistemic && matchesSearch;
  });

  const activeProphecy = ALL_PROPHECIES.find(p => p.id === activeProphecyId) || filteredProphecies[0] || ALL_PROPHECIES[0];

  const getEpistemicBadge = (status: ProphecyRecord['epistemicStatus']) => {
    switch (status) {
      case 'Fulfilled':
        return {
          icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
          color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
          label: 'Historical / Sociological Match'
        };
      case 'Unfulfilled (Future Horizon)':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-[#e8913a]" />,
          color: 'text-[#fde047] border-[#e8913a]/30 bg-[#e8913a]/10',
          label: 'Future Escatological Horizon'
        };
      case 'Disputed Interpretation':
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />,
          color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
          label: 'Disputed / Metaphorical'
        };
      case 'Debunked / Misrepresented':
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-rose-400" />,
          color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
          label: 'Debunked / Pseudo-historical'
        };
      case 'Hypothetical Scenario':
      default:
        return {
          icon: <Eye className="w-3.5 h-3.5 text-cyan-400" />,
          color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
          label: 'Scientific Scenario'
        };
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5" />
          <span>भविष्य पुराण एवं भविष्यवाणियाँ • Comparative Historical Predictions</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          भविष्य दर्शन • THE PROPHECY & HORIZON OBSERVATORY
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Critical examination of historical predictions across Puranic cosmology, Kalki avatara, Nostradamus, and modern science futurism, indexed with strict epistemic status classifications.
        </p>
      </div>

      {/* Disclaimers & Epistemic Gate */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#20140c] to-[#140e08] border border-[#e8913a]/30 flex items-start gap-3 text-xs font-serif text-[#efe6d6] leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-[#e8913a] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#fde047] font-mono uppercase tracking-wider block text-[11px] mb-0.5">
            ज्ञानमीमांसा मर्यादा • Epistemic Principle
          </span>
          Traditional prophecies are presented as cultural, literary, and philosophical artifacts. They are objectively compared against historical evidence and distinguished from deterministic scientific prediction.
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {TRADITIONS.map(trad => (
            <button
              key={trad}
              onClick={() => { soundManager.playClick(); setSelectedTradition(trad); }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedTradition === trad
                  ? 'bg-[#e8913a] text-black font-bold shadow-md shadow-[#e8913a]/20'
                  : 'bg-black/40 border border-white/10 text-[#b5a990] hover:text-[#efe6d6]'
              }`}
            >
              {trad}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8 flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
            <Search className="w-4 h-4 text-[#b5a990]" />
            <input
              type="text"
              placeholder="Search predictions, sources, or authors (e.g. Kalki, Bhagavata, Nostradamus)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs md:text-sm text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedEpistemic}
              onChange={(e) => setSelectedEpistemic(e.target.value)}
              className="w-full h-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-[#fde047] focus:outline-none focus:border-[#e8913a]"
            >
              {EPISTEMIC_FILTERS.map(ef => (
                <option key={ef} value={ef} className="bg-[#120d09] text-[#efe6d6]">
                  {ef}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Prophecy List & In-depth Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Predictions List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block px-1">
            Historical Records ({filteredProphecies.length})
          </span>
          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredProphecies.map(p => {
              const isSelected = p.id === activeProphecy.id;
              const badge = getEpistemicBadge(p.epistemicStatus);
              return (
                <div
                  key={p.id}
                  onClick={() => { soundManager.playClick(); setActiveProphecyId(p.id); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#28180e] to-[#18100a] border-[#e8913a] shadow-lg shadow-[#e8913a]/15 scale-[1.01]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[#e8913a]">
                      {p.tradition}
                    </span>
                    <span className="text-[10px] font-mono text-[#b5a990]">
                      {p.originDate}
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#efe6d6] line-clamp-1">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded border w-fit" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    {badge.icon}
                    <span className="text-xs">{p.epistemicStatus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-depth Prophecy Dossier */}
        {activeProphecy && (
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] via-[#140e08] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
              {/* Header */}
              <div className="border-b border-white/10 pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#e8913a] uppercase">
                    {activeProphecy.tradition} • {activeProphecy.sourceText}
                  </span>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${getEpistemicBadge(activeProphecy.epistemicStatus).color}`}>
                    {getEpistemicBadge(activeProphecy.epistemicStatus).icon}
                    <span>{activeProphecy.epistemicStatus}</span>
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#efe6d6]">
                  {activeProphecy.title}
                </h2>
                <div className="text-xs font-mono text-[#b5a990] flex items-center gap-3">
                  <span>Author / Lineage: <b className="text-[#efe6d6]">{activeProphecy.authorOrTradition}</b></span>
                  <span>•</span>
                  <span>Origin: <b className="text-[#efe6d6]">{activeProphecy.originDate}</b></span>
                </div>
              </div>

              {/* Original Quote / Verse */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#24150b] to-[#170e08] border border-[rgba(232,145,58,0.3)] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#e8913a] tracking-wider block">
                  Original Attested Quote / Stanza
                </span>
                <p className="text-xs md:text-sm font-serif italic text-[#fde047] leading-relaxed whitespace-pre-line">
                  &quot;{activeProphecy.originalQuote}&quot;
                </p>
              </div>

              {/* Historical Context */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] block">
                  Historical Origin & Purpose
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                  {activeProphecy.historicalContext}
                </p>
              </div>

              {/* Interpretation */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#e8913a] block">
                  Traditional or Futurist Interpretation
                </span>
                <p className="text-xs md:text-sm text-[#efe6d6] font-serif leading-relaxed">
                  {activeProphecy.interpretation}
                </p>
              </div>

              {/* Evidence, Critique & Epistemic Verification */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#17120c] to-[#100d09] border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#527FAE] block font-bold">
                  Scientific, Historical & Epistemic Critique
                </span>
                <p className="text-xs md:text-sm text-[#b5a990] font-serif leading-relaxed">
                  {activeProphecy.evidenceAndCritique}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
