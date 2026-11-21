'use client';

import React, { useState } from 'react';
import { X, Search, Sparkles, BookOpen, Compass, ShieldCheck, ExternalLink, ArrowRight, CornerDownRight } from 'lucide-react';
import { queryKaalDarshi } from '../../utils/kaaldarshiEngine';
import { KaalDarshiResponse, EPISTEMIC_BADGES, PillarId } from '../../types/sixPillars';
import { soundManager } from '../../utils/audio';

interface KaalDarshiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePillar: (pillar: PillarId) => void;
  isLightMode?: boolean;
}

const PRESET_QUERIES = [
  'Where is Jupiter located right now in the sidereal zodiac?',
  'Where is Saturn and what is its Jyotish significance?',
  'What does the Rigveda Nasadiya Sukta say about cosmic origin?',
  'How is a Kalpa quantitatively calculated in Surya Siddhanta?',
  'What are the engineering requirements of a Type II Dyson Swarm?',
  'What archaeological evidence was found at Sanauli chariot burials?'
];

export function KaalDarshiModal({
  isOpen,
  onClose,
  onNavigatePillar,
  isLightMode
}: KaalDarshiModalProps) {
  const [inputText, setInputText] = useState<string>('');
  const [activeResponse, setActiveResponse] = useState<KaalDarshiResponse | null>(() => 
    queryKaalDarshi('Where is Jupiter located right now in the sidereal zodiac?')
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    soundManager.playClick();
    setIsLoading(true);
    setTimeout(() => {
      const res = queryKaalDarshi(q);
      setActiveResponse(res);
      setIsLoading(false);
    }, 250);
  };

  const handleSelectPreset = (preset: string) => {
    setInputText(preset);
    handleSearch(preset);
  };

  const epistemicMeta = activeResponse ? EPISTEMIC_BADGES[activeResponse.epistemicClassification] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col border shadow-2xl overflow-hidden transition-all ${
          isLightMode
            ? 'bg-[#f4ebd9] border-[#c59b27]/40 text-[#1d130a]'
            : 'bg-gradient-to-b from-[#18110b] via-[#100b07] to-[#080503] border-[rgba(232,145,58,0.4)] text-[#efe6d6]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8913a] to-[#994710] flex items-center justify-center shadow-lg shadow-[#e8913a]/30">
              <Sparkles className="w-5 h-5 text-black font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-[#fde047]">
                  कालदर्शी • KAALDARSHI AI RESEARCH ASSISTANT
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#e8913a]/15 border border-[#e8913a]/30 text-[#e8913a] font-bold">
                  8-TIER EPISTEMIC RIGOR
                </span>
              </div>
              <p className="text-xs text-[#b5a990] font-serif">
                Direct evidence-based cross-pillar research with zero hallucinations and verified primary citations.
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-[#b5a990] hover:text-[#efe6d6] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 bg-black/20 shrink-0 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(inputText);
            }}
            className="relative flex items-center"
          >
            <Search className="absolute left-3.5 w-4 h-4 text-[#e8913a]" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask KaalDarshi across any of the Six Pillars (e.g., 'Where is Jupiter?', 'How is a Kalpa calculated?')..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs md:text-sm text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none focus:border-[#e8913a]"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-1.5 rounded-lg bg-[#e8913a] hover:bg-[#f2c47a] text-black font-mono text-xs font-bold transition-all shadow-md"
            >
              QUERY
            </button>
          </form>

          {/* Quick Presets Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
            <span className="text-[#b5a990] shrink-0 font-bold">Inquiries:</span>
            {PRESET_QUERIES.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#e8913a]/15 border border-white/10 hover:border-[#e8913a]/40 text-[#b5a990] hover:text-[#fde047] whitespace-nowrap transition-all shrink-0"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Research Response Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-3 text-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#e8913a] border-t-transparent animate-spin" />
              <p className="text-xs font-mono text-[#b5a990]">
                Scanning astronomical ephemeris, archaeological excavations and Vedic canons...
              </p>
            </div>
          ) : activeResponse && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Epistemic Badge & Query Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-[#b5a990] block">Inquiry</span>
                  <h3 className="text-sm font-serif font-bold text-[#efe6d6]">
                    &quot;{activeResponse.query}&quot;
                  </h3>
                </div>

                {epistemicMeta && (
                  <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${epistemicMeta.badgeColor}`}>
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <div>
                      <span className="text-xs font-mono font-bold block">
                        [{epistemicMeta.code}] {epistemicMeta.labelEn}
                      </span>
                      <span className="text-[10px] font-serif block opacity-80">
                        {epistemicMeta.labelSa}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Scholarly Synthesis */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#20140c] to-[#140e08] border border-[rgba(232,145,58,0.3)] shadow-inner space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#e8913a] block font-bold">
                  KaalDarshi Research Synthesis
                </span>
                <p className="text-sm md:text-base font-serif text-[#efe6d6] leading-relaxed">
                  {activeResponse.synthesis}
                </p>
              </div>

              {/* Sanskrit Passage (if applicable) */}
              {activeResponse.sanskritPassage && (
                <div className="p-4 rounded-xl bg-black/60 border border-[rgba(232,145,58,0.3)] space-y-2 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#e8913a] block">
                    {activeResponse.sanskritPassage.source}
                  </span>
                  <p 
                    className="text-base text-[#fde047] font-semibold leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: 'Noto Serif Devanagari, Georgia, serif' }}
                  >
                    {activeResponse.sanskritPassage.devanagari}
                  </p>
                  <p className="text-xs italic text-[#d4af37]">
                    &quot;{activeResponse.sanskritPassage.transliteration}&quot;
                  </p>
                </div>
              )}

              {/* Scientific Correspondence Notes */}
              {activeResponse.scientificCorrespondence && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#527FAE] block font-bold">
                    Scientific & Cosmological Correspondence
                  </span>
                  <p className="text-xs md:text-sm font-serif text-[#efe6d6] leading-relaxed">
                    {activeResponse.scientificCorrespondence}
                  </p>
                </div>
              )}

              {/* Primary Citations */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block">
                  Primary Sources & Research Citations ({activeResponse.citations.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeResponse.citations.map((cite, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1 text-xs font-serif">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#fde047] truncate pr-2">{cite.sourceTitle}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/10 text-[#e8913a]">
                          Tier {cite.epistemicCode}
                        </span>
                      </div>
                      <p className="text-[#b5a990] text-[11px]">
                        {cite.authorOrLineage} • {cite.publicationOrPeriod}
                      </p>
                      {cite.chapterOrPage && (
                        <p className="text-[10px] font-mono text-[#527FAE]">
                          {cite.chapterOrPage}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Cross-Pillar Explorations */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#e8913a] block">
                  Connected Cross-Pillar Journeys
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeResponse.suggestedCrossPillarExplorations.map((exp, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playClick();
                        onClose();
                        onNavigatePillar(exp.targetPillar);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#e8913a]/15 hover:bg-[#e8913a] text-[#fde047] hover:text-black border border-[#e8913a]/30 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>{exp.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
