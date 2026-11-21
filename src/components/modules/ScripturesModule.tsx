'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Search, Copy, Check, Volume2, ShieldCheck, Tag, ExternalLink } from 'lucide-react';
import { SCRIPTURE_RECORDS, ScriptureRecord } from '../../data/scripturesData';
import { soundManager } from '../../utils/audio';

interface ScripturesModuleProps {
  isLightMode?: boolean;
}

const CATEGORIES = [
  'All',
  'Vedas',
  'Upanishads',
  'Gita & Itihasa',
  'Puranas',
  'Surya Siddhanta & Astronomy',
  'Ancient Sciences',
] as const;

export function ScripturesModule({ isLightMode }: ScripturesModuleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeVerseId, setActiveVerseId] = useState<string>(SCRIPTURE_RECORDS[0]?.id || '');

  const filteredVerses = SCRIPTURE_RECORDS.filter(record => {
    const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.sanskritTitle.includes(searchTerm) ||
      record.sourceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.sanskritDevanagari.includes(searchTerm) ||
      record.englishTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeRecord = SCRIPTURE_RECORDS.find(r => r.id === activeVerseId) || filteredVerses[0] || SCRIPTURE_RECORDS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>सनातन ज्ञानकोश • The Living Vedic & Scientific Canon</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          शास्त्र दर्शन • SACRED SCRIPTURES & SCIENCE
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Authentic Sanskrit literature across the Vedas, Upanishads, Bhagavad Gita, and astronomical treatises of Surya Siddhanta, alongside rigorous cosmological commentary.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { soundManager.playClick(); setSelectedCategory(cat); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#e8913a] text-black font-bold shadow-md shadow-[#e8913a]/20'
                  : 'bg-black/40 border border-white/10 text-[#b5a990] hover:text-[#efe6d6] hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
          <Search className="w-4 h-4 text-[#b5a990]" />
          <input
            type="text"
            placeholder="Search verses in Devanagari, English, source texts (e.g. Nasadiya, Surya Siddhanta, Gita)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs md:text-sm text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Verse Selector & Deep Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Verses Roster */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block px-1">
            Canonical Texts ({filteredVerses.length})
          </span>
          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredVerses.map(record => {
              const isSelected = record.id === activeRecord.id;
              return (
                <div
                  key={record.id}
                  onClick={() => { soundManager.playClick(); setActiveVerseId(record.id); }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2a1a10] to-[#18110b] border-[#e8913a] shadow-lg shadow-[#e8913a]/15 scale-[1.01]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[#e8913a]">
                      {record.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#b5a990]">
                      {record.chapterVerse}
                    </span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#efe6d6] line-clamp-1">
                    {record.title}
                  </h3>
                  <p className="text-xs font-serif text-[#fde047]/80 mt-1 line-clamp-1" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                    {record.sanskritTitle}
                  </p>
                  <p className="text-[11px] text-[#b5a990] mt-1.5 line-clamp-2 italic">
                    &quot;{record.englishTranslation}&quot;
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-depth Manuscript Reader */}
        {activeRecord && (
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] via-[#140e08] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6 relative overflow-hidden">
              {/* Copperplate decorative corner accents */}
              <span className="absolute top-2 left-2 text-xs text-[#e8913a] opacity-60">❖</span>
              <span className="absolute top-2 right-2 text-xs text-[#e8913a] opacity-60">❖</span>
              <span className="absolute bottom-2 left-2 text-xs text-[#e8913a] opacity-60">❖</span>
              <span className="absolute bottom-2 right-2 text-xs text-[#e8913a] opacity-60">❖</span>

              {/* Title & Provenance */}
              <div className="flex items-start justify-between gap-4 border-b border-[#e8913a]/20 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#e8913a] uppercase">
                      {activeRecord.sourceText}
                    </span>
                    <span className="text-xs text-[#b5a990]">•</span>
                    <span className="text-xs font-mono text-[#b5a990]">
                      {activeRecord.chapterVerse}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-[#efe6d6]">
                    {activeRecord.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(`${activeRecord.sanskritDevanagari}\n\n${activeRecord.englishTranslation}`, activeRecord.id)}
                    className="p-2 rounded-lg bg-black/40 border border-white/10 hover:border-[#e8913a] text-[#b5a990] hover:text-[#fde047] transition-all"
                    title="Copy Sanskrit and Translation"
                  >
                    {copiedId === activeRecord.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sacred Sanskrit Devanagari Block */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#24150b] to-[#1a1008] border border-[rgba(232,145,58,0.3)] shadow-inner text-center space-y-3">
                <span className="text-[10px] font-mono uppercase text-[#e8913a] tracking-widest block">
                  मूल संस्कृत श्लोक • ORIGINAL SANATANA RECITATION
                </span>
                <p 
                  className="text-base md:text-lg text-[#fde047] font-semibold leading-relaxed whitespace-pre-line tracking-wide drop-shadow-[0_0_12px_rgba(232,145,58,0.3)]"
                  style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                >
                  {activeRecord.sanskritDevanagari}
                </p>
              </div>

              {/* IAST Transliteration */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] block">
                  IAST Roman Transliteration
                </span>
                <p className="text-xs md:text-sm font-serif italic text-[#d4af37] leading-relaxed whitespace-pre-line">
                  {activeRecord.iastTransliteration}
                </p>
              </div>

              {/* English Translation */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] block">
                  English Translation & Semantic Meaning
                </span>
                <p className="text-sm font-serif text-[#efe6d6] leading-relaxed">
                  {activeRecord.englishTranslation}
                </p>
              </div>

              {/* Cosmological Context & Modern Scientific Resonance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-[#527FAE] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Cosmological Context
                  </span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                    {activeRecord.cosmologicalContext}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold text-[#e8913a] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Scientific Significance
                  </span>
                  <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                    {activeRecord.scientificSignificance}
                  </p>
                </div>
              </div>

              {/* Scholarly Commentary & Quotes */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#17120c] to-[#100d09] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#b5a990] block">
                  Scholarly Commentary & Citation
                </span>
                <p className="text-xs text-[#b5a990] font-serif italic leading-relaxed">
                  &quot;{activeRecord.scholarlyInterpretation}&quot;
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
                <Tag className="w-3 h-3 text-[#b5a990]" />
                {activeRecord.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#b5a990]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
