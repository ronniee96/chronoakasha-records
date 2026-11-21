'use client';

import React, { useState } from 'react';
import { Film, BookOpen, HelpCircle, CheckCircle2, XCircle, Search, ExternalLink, Award, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { MEDIA_KNOWLEDGE_LIBRARY, MediaKnowledgeRecord } from '../../data/mediaYoutubeData';
import { LEARNING_PATHS, GLOSSARY_TERMS, QUIZ_QUESTIONS, LearningPath, GlossaryTerm, QuizQuestion } from '../../data/learningPathData';
import { soundManager } from '../../utils/audio';

interface KnowledgeMediaModuleProps {
  isLightMode?: boolean;
}

export function KnowledgeMediaModule({ isLightMode }: KnowledgeMediaModuleProps) {
  const [activeTab, setActiveTab] = useState<'media' | 'paths' | 'glossary' | 'quiz'>('media');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Filtered Media
  const filteredMedia = MEDIA_KNOWLEDGE_LIBRARY.filter((m: MediaKnowledgeRecord) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.keySubjects.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
    m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered Glossary
  const filteredGlossary = GLOSSARY_TERMS.filter((t: GlossaryTerm) =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.sanskrit.includes(searchTerm) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.etymology.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (isQuizSubmitted) return;
    soundManager.playClick();
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q: QuizQuestion, idx: number) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 ${
      isLightMode ? 'text-[#1c140d]' : 'text-[#efe6d6]'
    }`}>
      {/* Header Plaque */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8913a]/10 border border-[#e8913a]/30 text-xs font-mono text-[#e8913a] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ज्ञान संग्रहालय एवं अनुशीलन • Curated Media, Guided Paths & Glossary</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fde047] tracking-tight">
          ज्ञान कोश • THE KNOWLEDGE ARCHIVE
        </h1>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-[#b5a990] font-serif leading-relaxed">
          Curated multimedia research, structured learning paths from Vedic cosmology to modern astrophysics, searchable Sanskrit glossary, and self-assessment evaluations.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl overflow-x-auto max-w-full">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('media'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'media'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            श्रव्य-दृश्य संग्रह • CURATED MEDIA ({MEDIA_KNOWLEDGE_LIBRARY.length})
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('paths'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'paths'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            शिक्षा मार्ग • LEARNING PATHS ({LEARNING_PATHS.length})
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('glossary'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'glossary'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            संस्कृत शब्दावली • SANSKRIT GLOSSARY ({GLOSSARY_TERMS.length})
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('quiz'); }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold whitespace-nowrap transition-all ${
              activeTab === 'quiz'
                ? 'bg-[#e8913a] text-black shadow-lg shadow-[#e8913a]/25'
                : 'text-[#b5a990] hover:text-[#efe6d6]'
            }`}
          >
            प्रश्नोत्तरी • COSMIC QUIZ
          </button>
        </div>
      </div>

      {/* TAB 1: CURATED MEDIA ARCHIVE */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
            <Search className="w-4 h-4 text-[#b5a990]" />
            <input
              type="text"
              placeholder="Search documentary videos, topics, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs md:text-sm text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedia.map((item: MediaKnowledgeRecord) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0d0906] border border-white/10 hover:border-[#e8913a]/50 transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[#e8913a]">
                      {item.category}
                    </span>
                    <span className="text-[#b5a990]">
                      {item.publicationYear} • {item.channel}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#efe6d6] line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#b5a990] font-serif leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Reliability Badge */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded w-fit">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{item.reliabilityClassification}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.keySubjects.map((topic: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#b5a990]">
                        #{topic}
                      </span>
                    ))}
                  </div>

                  {/* Timestamps */}
                  {item.timestamps.length > 0 && (
                    <div className="space-y-1 text-[11px] font-mono text-[#b5a990] bg-black/40 p-2 rounded-lg border border-white/5">
                      <span className="text-[10px] text-[#e8913a] font-bold block flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Key Video Chapters
                      </span>
                      {item.timestamps.slice(0, 3).map((ts, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-[#efe6d6] truncate pr-2">{ts.topic}</span>
                          <span className="text-[#e8913a] shrink-0 font-bold">{ts.time}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-[#e8913a]/15 hover:bg-[#e8913a] text-[#fde047] hover:text-black border border-[#e8913a]/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>WATCH ON YOUTUBE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GUIDED LEARNING PATHS */}
      {activeTab === 'paths' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {LEARNING_PATHS.map((path: LearningPath, pIdx: number) => (
              <div
                key={path.id}
                className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0d0906] border border-[rgba(232,145,58,0.3)] space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
                      Learning Pathway 0{pIdx + 1} • {path.estimatedHours} Hours • {path.sanskritTitle}
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#fde047]">
                      {path.title}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                    Level: {path.difficulty}
                  </span>
                </div>

                <p className="text-sm text-[#efe6d6] font-serif leading-relaxed">
                  {path.description}
                </p>

                {/* Lessons Sequence */}
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#b5a990] block">
                    Curriculum Lessons ({path.lessons.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {path.lessons.map((lesson) => (
                      <div key={lesson.lessonNumber} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#e8913a]">
                          Lesson 0{lesson.lessonNumber}
                        </span>
                        <h4 className="text-xs font-serif font-bold text-[#efe6d6]">
                          {lesson.title}
                        </h4>
                        <p className="text-[11px] text-[#b5a990] font-serif leading-relaxed line-clamp-3">
                          {lesson.summary}
                        </p>
                        <div className="pt-1 flex flex-wrap gap-1">
                          {lesson.keyConcepts.map((kc, i) => (
                            <span key={i} className="text-[9px] font-mono text-[#fde047] px-1 py-0.5 rounded bg-white/5">
                              {kc}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SANSKRIT GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
            <Search className="w-4 h-4 text-[#b5a990]" />
            <input
              type="text"
              placeholder="Search Sanskrit terminology, Devanagari, or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs md:text-sm text-[#efe6d6] placeholder-[#b5a990]/60 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((g: GlossaryTerm, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-serif font-bold text-[#fde047]">
                      {g.term}
                    </h3>
                    <span className="text-sm font-serif text-[#e8913a]" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
                      ({g.sanskrit})
                    </span>
                    <span className="text-xs font-serif italic text-[#b5a990]">
                      [{g.iast}]
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#b5a990] px-2 py-0.5 rounded bg-white/5">
                    {g.category}
                  </span>
                </div>

                <p className="text-xs text-[#efe6d6] font-serif leading-relaxed">
                  {g.definition}
                </p>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#527FAE] block font-bold">
                    Etymology & Canonical Reference
                  </span>
                  <p className="text-xs text-[#b5a990] font-serif italic">
                    {g.etymology} — {g.scriptureReference}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE COSMIC QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1c1209] to-[#0a0705] border border-[rgba(232,145,58,0.4)] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e8913a] uppercase block">
                  Interactive Knowledge Evaluation
                </span>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#fde047]">
                  Cosmic & Vedic Knowledge Quiz
                </h2>
              </div>
              <span className="text-xs font-mono text-[#b5a990]">
                {QUIZ_QUESTIONS.length} Questions
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q: QuizQuestion, qIdx: number) => {
                const userAns = selectedAnswers[qIdx];

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono font-bold text-[#e8913a] mt-0.5">Q{qIdx + 1}.</span>
                      <p className="text-sm font-serif font-bold text-[#efe6d6]">
                        {q.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isSelected = userAns === optIdx;
                        let optionStyle = 'bg-black/40 border-white/10 text-[#efe6d6] hover:border-white/30';

                        if (isQuizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                          } else if (isSelected && optIdx !== q.correctIndex) {
                            optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-[#e8913a] text-black font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs font-serif transition-all ${optionStyle}`}
                          >
                            <span className="font-mono text-[10px] mr-2">[{String.fromCharCode(65 + optIdx)}]</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submit */}
                    {isQuizSubmitted && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-serif text-[#b5a990] space-y-1">
                        <span className="font-bold text-[#fde047] block font-mono text-[10px] uppercase">
                          Explanation ({q.referenceSource}):
                        </span>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Score & Submit Action */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {isQuizSubmitted ? (
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#fde047]" />
                  <div>
                    <span className="text-xs font-mono text-[#b5a990] block">Assessment Result:</span>
                    <span className="text-lg font-serif font-bold text-[#fde047]">
                      {calculateScore()} / {QUIZ_QUESTIONS.length} Correct ({Math.round((calculateScore() / QUIZ_QUESTIONS.length) * 100)}%)
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-xs font-mono text-[#b5a990]">
                  {Object.keys(selectedAnswers).length} of {QUIZ_QUESTIONS.length} Answered
                </span>
              )}

              <button
                onClick={() => {
                  soundManager.playClick();
                  if (isQuizSubmitted) {
                    setSelectedAnswers({});
                    setIsQuizSubmitted(false);
                  } else {
                    setIsQuizSubmitted(true);
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-[#e8913a] hover:bg-[#f2c47a] text-black font-mono font-bold text-xs transition-all shadow-lg shadow-[#e8913a]/20"
              >
                {isQuizSubmitted ? 'RETAKE QUIZ' : 'SUBMIT ASSESSMENT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
