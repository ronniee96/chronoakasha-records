'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Home, Radio, RotateCcw, Volume2, Shield, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function NotFound() {
  const [isPlayingChime, setIsPlayingChime] = useState(false);

  const handleChime = () => {
    soundManager.playTempleBell(528);
    setIsPlayingChime(true);
    setTimeout(() => setIsPlayingChime(false), 2500);
  };

  return (
    <div className="min-h-screen w-full bg-[#080503] text-[#efe6d6] flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden select-none">
      {/* 1. Divine Cosmic Background & Starfield */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-[#0a0705] to-[#040201] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e8913a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Floating Prana / Gold Aura Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-orange-600/20 blur-[80px] pointer-events-none" />

      {/* 2. Top Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <Link 
          href="/" 
          onClick={() => soundManager.playClick()}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/30 via-[#18110a] to-black border border-amber-500/50 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.3)] group-hover:border-amber-400 transition-all">
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold text-[#efe6d6] tracking-tight group-hover:text-amber-300 transition-colors">
              Chronoa<span className="text-amber-500">कोश</span>
            </span>
            <span className="text-[8.5px] font-mono tracking-[0.2em] uppercase text-amber-500/80 leading-none">
              RECORDS • कालचक्र
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleChime}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
              isPlayingChime
                ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] font-bold'
                : 'bg-white/5 hover:bg-white/10 text-amber-300 border-amber-500/30'
            }`}
            title="Ring Sacred Temple Bell (528 Hz)"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingChime ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">घण्टा नाद (528 Hz)</span>
          </button>
        </div>
      </header>

      {/* 3. Center Sanctuary: Sri Hanumanji Sanjeevani Rescue Illustration */}
      <main className="w-full max-w-4xl flex flex-col items-center text-center z-10 my-auto py-8 space-y-6">
        {/* Sacred Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/40 text-xs font-mono text-amber-300 shadow-lg backdrop-blur-md">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>संकटमोचन रक्षणम् • SRI HANUMAN RESCUE PROTOCOL</span>
        </div>

        {/* Dynamic Hanumanji Vector Art */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-2">
          {/* Pulsing Sun Aura */}
          <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute inset-4 rounded-full border border-orange-500/20 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent blur-md" />

          {/* SVG of Flying Hanumanji with Dronagiri Mountain & Gada */}
          <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
            <defs>
              <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="sanjuGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
              <linearGradient id="auraRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#d97706" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Radiant Halo (Prabha Mandala) */}
            <circle cx="160" cy="115" r="50" fill="url(#auraRadial)" />
            <circle cx="160" cy="115" r="38" fill="none" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Flying Prana Streamers / Cloud Wings */}
            <path d="M40 210 Q 90 190, 140 220 T 260 215" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
            <path d="M60 230 Q 110 210, 160 235 T 280 230" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />

            {/* Lord Hanuman Silhouette in Flight (Soaring Angle) */}
            <g transform="translate(10, -5)">
              {/* Celestial Kundala & Mukuta (Crown) */}
              <polygon points="155,75 160,55 165,75" fill="#fde047" />
              <polygon points="148,78 160,65 172,78" fill="#f59e0b" />
              <circle cx="160" cy="72" r="3" fill="#ef4444" />

              {/* Head & Face in Abhaya Radiance */}
              <circle cx="160" cy="100" r="22" fill="#d97706" />
              <ellipse cx="160" cy="108" rx="14" ry="10" fill="#f59e0b" />
              {/* Sacred Tilaka & Eyes */}
              <line x1="160" y1="88" x2="160" y2="102" stroke="#dc2626" strokeWidth="2.5" />
              <circle cx="154" cy="98" r="2" fill="#ffffff" />
              <circle cx="166" cy="98" r="2" fill="#ffffff" />

              {/* Muscular Torso with Golden Yajnopavita & Mala */}
              <path d="M142 120 Q 160 115, 178 120 L 172 170 Q 160 178, 148 170 Z" fill="#b45309" stroke="#fde047" strokeWidth="1" />
              {/* Sacred Thread (Yajnopavita) */}
              <path d="M145 122 Q 158 145, 172 168" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="2 2" />
              {/* Pearl Garland */}
              <path d="M148 122 Q 160 140, 172 122" fill="none" stroke="#fef08a" strokeWidth="2" />

              {/* Right Arm: Raising Golden Gada (Mace) */}
              <path d="M178 125 Q 210 110, 225 90" fill="none" stroke="#d97706" strokeWidth="12" strokeLinecap="round" />
              {/* Golden Gada */}
              <line x1="218" y1="95" x2="255" y2="55" stroke="#fef08a" strokeWidth="4" />
              <circle cx="258" cy="52" r="14" fill="url(#goldGlow)" stroke="#fde047" strokeWidth="1.5" />
              <polygon points="258,35 264,48 252,48" fill="#fde047" />

              {/* Left Arm: Uplifting Dronagiri Sanjeevani Mountain */}
              <path d="M142 125 Q 110 120, 85 95" fill="none" stroke="#d97706" strokeWidth="12" strokeLinecap="round" />
              {/* Sanjeevani Mountain with Healing Herb Aura */}
              <g transform="translate(45, 40)">
                <polygon points="40,10 65,55 15,55" fill="url(#sanjuGrad)" stroke="#6ee7b7" strokeWidth="1.5" />
                <polygon points="25,25 45,55 5,55" fill="#047857" opacity="0.8" />
                <polygon points="50,20 75,55 35,55" fill="#065f46" opacity="0.8" />
                {/* Luminous Sanjeevani Booti Stars */}
                <circle cx="40" cy="22" r="2.5" fill="#a7f3d0" className="animate-ping" />
                <circle cx="30" cy="38" r="2" fill="#6ee7b7" />
                <circle cx="52" cy="35" r="2" fill="#34d399" />
              </g>

              {/* Flying Legs with Dhoti */}
              <path d="M148 170 Q 130 200, 115 220" fill="none" stroke="#ea580c" strokeWidth="12" strokeLinecap="round" />
              <path d="M172 170 Q 185 205, 195 235" fill="none" stroke="#ea580c" strokeWidth="12" strokeLinecap="round" />
              {/* Golden Anklets (Nupura) */}
              <ellipse cx="115" cy="220" rx="6" ry="3" fill="#fde047" />
              <ellipse cx="195" cy="235" rx="6" ry="3" fill="#fde047" />

              {/* Majestic Upward-Curling Tail (Puchham) */}
              <path d="M145 175 Q 90 190, 85 140 T 115 70" fill="none" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
              <circle cx="115" cy="70" r="5" fill="#f59e0b" />
            </g>
          </svg>
        </div>

        {/* Hero Sanskrit Shloka */}
        <div className="space-y-2 max-w-2xl">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#fde047] tracking-tight leading-snug drop-shadow-md">
            “संकट कटै मिटै सब पीरा । जो सुमिरै हनुमत बलबीरा ॥”
          </p>
          <p className="text-xs sm:text-sm font-mono text-amber-300/80 uppercase tracking-widest">
            — श्री हनुमान चालीसा (Shri Hanuman Chalisa)
          </p>
        </div>

        {/* Narrative Description */}
        <div className="max-w-2xl bg-black/50 border border-amber-500/20 p-5 rounded-2xl backdrop-blur-xl space-y-2.5 text-center shadow-xl">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#e8913a] uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>४०४ माया • Lost Beyond the 14 Cosmic Lokas</span>
          </div>
          <p className="text-xs sm:text-sm font-serif text-[#dcd6cc] leading-relaxed">
            Seeker of Chronoākāsha, you have wandered beyond the recorded coordinate grid. But in the presence of <b>Sankat Mochan Mahavira</b>, no path is permanently lost. Lord Hanuman brings the Sanjeevani of cosmic clarity to dispel confusion and restore your journey across the universal records.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#a5f3fc] italic">
            “मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् । वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥”
          </div>
        </div>

        {/* Rescue Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* 1. Return to Kalachakra Origin */}
          <Link
            href="/"
            onClick={() => soundManager.playTempleBell(528)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e8913a] via-[#f59e0b] to-[#d97706] hover:from-[#f59e0b] hover:to-[#ea580c] text-black font-mono font-extrabold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 group scale-100 hover:scale-105"
          >
            <Home className="w-4 h-4 text-black" />
            <span>कालचक्र आदि द्वार • Return Home</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* 2. Today Living Timeline */}
          <Link
            href="/?mode=present"
            onClick={() => soundManager.playClick()}
            className="px-5 py-3 rounded-xl bg-black/60 hover:bg-black/80 text-[#efe6d6] hover:text-white border border-white/15 hover:border-amber-400/50 font-mono font-bold text-xs transition-all flex items-center gap-2"
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>वर्तमान वेधशाला • Living Observatory</span>
          </Link>

          {/* 3. Re-sync Coordinates */}
          <button
            onClick={() => { soundManager.playClick(); window.location.reload(); }}
            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 font-mono text-xs transition-all flex items-center gap-1.5"
            title="Reload Coordinates"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>पुनः संधान (Retry)</span>
          </button>
        </div>
      </main>

      {/* 4. Footer Peace Invocation */}
      <footer className="w-full max-w-5xl text-center z-10 pt-4 border-t border-white/10 text-[10.5px] font-mono text-[#8a7f6c] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>ॐ शान्तिः शान्तिः शान्तिः • Universal Harmony & Protection</span>
        <span>Chronoākāsha Universal Archive • Protected by Mahavira</span>
      </footer>
    </div>
  );
}
