'use client';

import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { EventCategory, DateClassification } from '../data/timelineEvents';
import { soundManager } from '../utils/audio';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: EventCategory[];
  onToggleCategory: (cat: EventCategory) => void;
  selectedClassifications: DateClassification[];
  onToggleClassification: (cls: DateClassification) => void;
  onResetFilters: () => void;
  isLightMode: boolean;
}

const ALL_CATEGORIES: EventCategory[] = [
  'Cosmology & Kalpas',
  'Scriptures & Philosophy',
  'Civilizations & Archaeology',
  'Science & Astronomy',
  'Dynasties & Kings',
  'Kardashev & Dyson Future'
];

const ALL_CLASSIFICATIONS: DateClassification[] = [
  'Archaeologically attested',
  'Historically documented',
  'Traditional chronology',
  'Scholarly estimated',
  'Scriptural account',
  'Theoretical physics',
  'Speculative scenario',
  'Astronomical / Epigraphic'
];

export function FilterModal({
  isOpen,
  onClose,
  selectedCategories,
  onToggleCategory,
  selectedClassifications,
  onToggleClassification,
  onResetFilters,
  isLightMode
}: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[8px] animate-fadeIn">
      <div 
        className={`relative w-full max-w-lg p-6 rounded-[14px] border shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isLightMode 
            ? 'bg-[#f4ebd9] border-[#c59b27] text-[#1d130a]' 
            : 'bg-gradient-to-b from-[#1c140d] via-[#120d08] to-[#0a0704] border-[rgba(212,175,55,0.4)] text-[#efe6d6]'
        }`}
      >
        <span className="absolute top-2 left-2 text-[9px] text-[#d4af37] opacity-60">❖</span>
        <span className="absolute top-2 right-2 text-[9px] text-[#d4af37] opacity-60">❖</span>

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[rgba(212,175,55,0.22)]">
          <div>
            <h3 className="text-xl font-display text-[#d4af37]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              शोधन • Filter Kinds & Classifications
            </h3>
            <p className="text-xs text-[#b5a990] font-serif mt-0.5">Customize the active event rings and epistemological categories</p>
          </div>
          <button 
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-[6px] border border-[rgba(212,175,55,0.2)] hover:border-[#d4af37] text-[#b5a990] hover:text-[#efe6d6] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Section */}
        <div className="mt-5">
          <h4 className="text-xs uppercase tracking-wider font-serif font-bold text-[#d4af37] mb-3 flex items-center gap-1.5">
            <span>ज्ञान मण्डल • Knowledge Spheres</span>
            <span className="text-[#b5a990] font-mono text-[10px]">({selectedCategories.length}/{ALL_CATEGORIES.length})</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundManager.playTempleBell(280);
                    onToggleCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-serif font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                    active
                      ? 'bg-gradient-to-b from-[#6fb0b2] to-[#39787a] text-[#08090D] border-[#a5f3fc] shadow-[0_0_10px_rgba(111,176,178,0.4)]'
                      : isLightMode
                      ? 'border-[#c59b27]/40 text-[#4a3b2c] hover:border-[#6fb0b2]'
                      : 'border-[rgba(212,175,55,0.2)] bg-[#1a120b] text-[#b5a990] hover:border-[#d4af37] hover:text-[#efe6d6]'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Classifications / Epistemology Section */}
        <div className="mt-6">
          <h4 className="text-xs uppercase tracking-wider font-serif font-bold text-[#d4af37] mb-3 flex items-center gap-1.5">
            <span>प्रमाण वर्गीकरण • Epistemological Attestation</span>
            <span className="text-[#b5a990] font-mono text-[10px]">({selectedClassifications.length}/{ALL_CLASSIFICATIONS.length})</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {ALL_CLASSIFICATIONS.map((cls) => {
              const active = selectedClassifications.includes(cls);
              return (
                <button
                  key={cls}
                  onClick={() => {
                    soundManager.playTempleBell(320);
                    onToggleClassification(cls);
                  }}
                  className={`px-3 py-1.5 rounded-[6px] text-xs font-serif font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                    active
                      ? 'bg-gradient-to-b from-[#e8913a] to-[#b8621b] text-[#08090D] border-[#fde047] shadow-[0_0_10px_rgba(232,145,58,0.4)] font-bold'
                      : isLightMode
                      ? 'border-[#c59b27]/40 text-[#4a3b2c] hover:border-[#e8913a]'
                      : 'border-[rgba(212,175,55,0.2)] bg-[#1a120b] text-[#b5a990] hover:border-[#d4af37] hover:text-[#efe6d6]'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" />}
                  <span>{cls}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Footers */}
        <div className="mt-8 pt-4 border-t border-[rgba(212,175,55,0.2)] flex items-center justify-between">
          <button
            onClick={() => {
              soundManager.playClick();
              onResetFilters();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-serif text-[#d4af37] hover:text-[#ffffff] border border-[rgba(212,175,55,0.25)] bg-[#16100b] hover:border-[#d4af37] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>पुनःस्थापन • Reset All</span>
          </button>
          <button
            onClick={() => {
              soundManager.playTempleBell(432);
              onClose();
            }}
            className="px-5 py-2 rounded-[8px] text-xs font-serif font-extrabold uppercase tracking-wider bg-gradient-to-b from-[#e8913a] via-[#c57922] to-[#994710] text-[#08090D] border border-[#fde047] shadow-[0_0_12px_rgba(232,145,58,0.4)] hover:brightness-110 transition-all"
          >
            लागू करें • Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
