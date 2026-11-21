'use client';

import React from 'react';
import { X, ExternalLink, ShieldCheck, Compass, Orbit, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode: boolean;
}

export function AboutModal({ isOpen, onClose, isLightMode }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[8px] animate-fadeIn">
      <div 
        className={`relative w-full max-w-3xl p-6 md:p-8 rounded-[14px] border shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isLightMode 
            ? 'bg-[#f4ebd9] border-[#c59b27] text-[#1d130a]' 
            : 'bg-gradient-to-b from-[#1c140d] via-[#120d08] to-[#0a0704] border-[rgba(212,175,55,0.4)] text-[#efe6d6]'
        }`}
      >
        <span className="absolute top-2 left-2 text-[9px] text-[#d4af37] opacity-60">❖</span>
        <span className="absolute top-2 right-2 text-[9px] text-[#d4af37] opacity-60">❖</span>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(212,175,55,0.22)]">
          <div>
            <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#d4af37]">कालचक्र तत्त्वज्ञान • METHODOLOGY & PHILOSOPHY</span>
            <h2 className="text-2xl md:text-3xl font-display text-[#d4af37] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              How This Wheel Is Built
            </h2>
            <p className="text-xs text-[#b5a990] font-serif mt-1">Chronoaकोश Records — The Universal Archive of Sanātana Civilization</p>
          </div>
          <button 
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-[6px] border border-[rgba(212,175,55,0.2)] hover:border-[#d4af37] text-[#b5a990] hover:text-[#efe6d6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#b5a990] font-serif">
          <div>
            <h3 className="text-base font-serif font-bold text-[#d4af37] flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#e8913a]" />
              १. क्रमबद्ध कालचक्र रचना • Sequence-Based Chronological Spacing
            </h3>
            <p className="leading-relaxed">
              Unlike conventional timelines that enforce linear millimetric year spacing—which would squeeze centuries of dense urban civilization into sub-pixel slivers while leaving billions of primordial years vast and empty—the <strong className="text-[#efe6d6]">Chronoaकोश Kalachakra</strong> employs sequence-based chronological radial spacing. This ensures that every profound philosophical discourse, temple consecration, and mathematical discovery remains distinctly legible, interactive, and navigable across all 1,989 milestones.
            </p>
          </div>

          <div>
            <h3 className="text-base font-serif font-bold text-[#d4af37] flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#6fb0b2]" />
              २. प्रमाण एवं सत्यनिष्ठा • Epistemological Integrity (Attestation vs Prophecy)
            </h3>
            <p className="leading-relaxed">
              We maintain transparent distinctions between different orders of knowledge. Every milestone in the archive is tagged with its epistemological status:
            </p>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <li className="p-3 rounded-[8px] bg-[#1a120b] border border-[rgba(212,175,55,0.25)] space-y-1">
                <span className="font-bold text-[#d4af37] block">पुरातत्व प्रमाण • Archaeologically Attested:</span>
                <span>Carbon-14 dated artifacts, excavations, and strata (Mehrgarh, Harappa, Dholavira, Rakhigarhi).</span>
              </li>
              <li className="p-3 rounded-[8px] bg-[#1a120b] border border-[rgba(212,175,55,0.25)] space-y-1">
                <span className="font-bold text-[#6fb0b2] block">अभिलेख एवं इतिहास • Historically Documented:</span>
                <span>Inscriptions, coins, and edicts (Aihole, Heliodorus Pillar, Chola copperplates).</span>
              </li>
              <li className="p-3 rounded-[8px] bg-[#1a120b] border border-[rgba(212,175,55,0.25)] space-y-1">
                <span className="font-bold text-[#fde047] block">पौराणिक काल गणना • Traditional Chronology:</span>
                <span>Puranic, Siddhantic, and sampradaya reckoning (Kalpas, Yugas, Aryabhata epoch).</span>
              </li>
              <li className="p-3 rounded-[8px] bg-[#1a120b] border border-[rgba(212,175,55,0.25)] space-y-1">
                <span className="font-bold text-[#80B9E8] block">सैद्धान्तिक भौतिकी • Theoretical Physics:</span>
                <span>Dyson Swarms, Kardashev scaling, Penrose extraction, and thermodynamic horizons.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-serif font-bold text-[#d4af37] flex items-center gap-2 mb-2">
              <Orbit className="w-4 h-4 text-[#e8913a]" />
              ३. ३D खगोल एवं महाप्रलय • 3D Cosmological Odyssey
            </h3>
            <p className="leading-relaxed">
              The archive seamlessly transitions between the grounded archaeology of ancient Bharata, the scientific future of planetary energy capture (Kardashev Scale Types 0 to IX), and the cyclical Mahāpralaya returning to Sri Vishnu resting in Yoganidra upon Ananta Shesha.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[rgba(212,175,55,0.2)] flex items-center justify-between">
          <p className="text-xs text-[#b5a990] font-serif">
            Chronoaकोश Records • Sanātana Time Machine
          </p>
          <button
            onClick={() => { soundManager.playTempleBell(320); onClose(); }}
            className="px-5 py-2 rounded-[8px] text-xs font-serif font-bold uppercase tracking-wider bg-gradient-to-b from-[#e8913a] to-[#b8621b] text-[#08090D] border border-[#fde047] shadow-md hover:brightness-110 transition-all"
          >
            अवगत • Understood
          </button>
        </div>
      </div>
    </div>
  );
}
