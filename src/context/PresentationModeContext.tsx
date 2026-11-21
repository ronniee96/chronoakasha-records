'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PresentationMode } from '../types/sixPillars';

interface PresentationModeContextType {
  mode: PresentationMode;
  setMode: (mode: PresentationMode) => void;
  isCinematic: boolean;
  isResearch: boolean;
  isReading: boolean;
}

const PresentationModeContext = createContext<PresentationModeContextType>({
  mode: 'research',
  setMode: () => {},
  isCinematic: false,
  isResearch: true,
  isReading: false,
});

export const PRESENTATION_MODES: {
  id: PresentationMode;
  label: string;
  hindiLabel: string;
  icon: string;
  badge: string;
  tagline: string;
  description: string;
}[] = [
  {
    id: 'cinematic',
    label: 'Cinematic Mode',
    hindiLabel: 'दृश्यकल्प • CINEMATIC',
    icon: '⚡',
    badge: 'Key Points & High Impact',
    tagline: 'Only Key Points & Visual Impact',
    description: 'High-impact visual headlines, punchy stat badges, and immediate takeaways without text clutter.'
  },
  {
    id: 'research',
    label: 'Research Mode',
    hindiLabel: 'अनुसन्धान • RESEARCH',
    icon: '🔬',
    badge: 'All Proofs & KaTeX Equations',
    tagline: 'All Proofs, Mathematics & Vedic Citations',
    description: 'Rigorous KaTeX mathematical tensors, authentic Sanskrit scriptural citations, epistemic proofs, and telemetry data tables.'
  },
  {
    id: 'reading',
    label: 'Reading Mode',
    hindiLabel: 'स्वाध्याय • READING',
    icon: '📖',
    badge: 'Comfortable & Story-Driven',
    tagline: 'Comfortable Editorial Story & Simple Analogies',
    description: 'Comfortable typography, warm relaxed line spacing, intuitive analogies, and peaceful narrative flow.'
  }
];

export function PresentationModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<PresentationMode>('cinematic');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chronoakasha_presentation_mode');
      if (saved && (saved === 'cinematic' || saved === 'research' || saved === 'reading')) {
        setModeState(saved as PresentationMode);
      }
    } catch {
      // LocalStorage access may fail in restricted contexts
    }
  }, []);

  const setMode = (newMode: PresentationMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('chronoakasha_presentation_mode', newMode);
    } catch {
      // ignore
    }
  };

  const value: PresentationModeContextType = {
    mode,
    setMode,
    isCinematic: mode === 'cinematic',
    isResearch: mode === 'research',
    isReading: mode === 'reading',
  };

  return (
    <PresentationModeContext.Provider value={value}>
      {children}
    </PresentationModeContext.Provider>
  );
}

export function usePresentationMode() {
  return useContext(PresentationModeContext);
}
