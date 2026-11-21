'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CosmicGatewayProps {
  onEnter: () => void;
}

export function CosmicGateway({ onEnter }: CosmicGatewayProps) {
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const handleEnterClick = () => {
    soundManager.init();
    soundManager.playChime(528);
    setHasEntered(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#05070a] transition-all duration-700 select-none ${
        hasEntered ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Animated Concentric Mandala Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Subtle breathing golden aura */}
        <div className="w-[500px] h-[500px] rounded-full bg-[#e8913a]/10 blur-[100px] animate-pulse" />

        {/* Outer Rotating Concentric Rings */}
        <div className="absolute w-[700px] h-[700px] rounded-full border border-[#e8913a]/15 animate-spin-slow" />
        <div className="absolute w-[540px] h-[540px] rounded-full border border-[#6fb0b2]/20 border-dashed animate-spin-reverse-slow" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#f2c47a]/25 animate-spin-slow" />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-[#e8913a]/30 border-dotted" />
      </div>

      {/* Main Content Modal */}
      <div className="relative z-10 max-w-2xl px-6 text-center space-y-8 animate-fadeIn">
        {/* Official Brand Emblem / Logo Banner */}
        <div className="flex justify-center mb-2">
          <div className="relative w-80 sm:w-96 md:w-[480px] h-32 md:h-40 filter drop-shadow-[0_0_25px_rgba(232,145,58,0.5)]">
            <Image
              src="/assets/chronoakasha-logo.png"
              alt="Chronoākāsha Records"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Taglines */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#f2c47a] uppercase">
            THE UNIVERSAL ARCHIVE OF EXISTENCE
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display text-[#efe6d6] max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Everything that was. Everything that is. Everything that may become.
          </h1>
          <p className="text-xs sm:text-sm text-[#b5a990] max-w-md mx-auto leading-relaxed">
            From the dawn of the Śveta-Vārāha Kalpa 1.97 billion years ago, through the Vedas and golden empires, to the Dyson Swarm and the Final Observer.
          </p>
        </div>

        {/* Action Buttons: Enter Archive & Quick Start */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleEnterClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider bg-[#e8913a] text-[#08090D] hover:bg-[#f2c47a] shadow-[0_0_20px_rgba(232,145,58,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>ENTER THE ARCHIVE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Epistemological Transparency Notice */}
        <div className="pt-6 border-t border-[rgba(232,214,180,0.1)] flex items-center justify-center gap-2 text-[11px] text-[#b5a990]/80">
          <Sparkles className="w-3.5 h-3.5 text-[#e8913a]" />
          <span>Fusing Verified Puranic Chronology with Theoretical Astrophysics</span>
        </div>
      </div>
    </div>
  );
}
