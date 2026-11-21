'use client';

import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';

interface RishiMuniAvatarProps {
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function RishiMuniAvatar({
  isSpeaking = false,
  size = 'md',
  onClick,
  className = ''
}: RishiMuniAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeDimensions = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-48 h-48 sm:w-56 sm:h-56',
    lg: 'w-64 h-64 sm:w-80 sm:h-80'
  }[size];

  const handleClick = () => {
    soundManager.playTempleBell(528);
    onClick?.();
  };

  return (
    <div 
      className={`relative flex items-center justify-center select-none cursor-pointer group ${sizeDimensions} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Rishi Muni • Vedic Astrological Sage in Jnana Mudra (Click for Blessing)"
    >
      {/* 1. Outermost Cosmic Golden Halo & Solar Corona */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/30 via-yellow-400/20 to-orange-500/30 blur-2xl transition-all duration-1000 ${
          isSpeaking || isHovered 
            ? 'scale-125 opacity-100 animate-pulse' 
            : 'scale-100 opacity-60'
        }`}
      />

      {/* 2. Rotating Sacred Geometric Chakra Rays */}
      <div 
        className="absolute inset-[-10%] rounded-full border border-amber-500/20 opacity-70 animate-spin"
        style={{ animationDuration: '60s' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
      </div>

      {/* 3. Reverse Rotating 12-Spoke Rashi Disc */}
      <div 
        className="absolute inset-[-4%] rounded-full border border-amber-400/30 border-dashed opacity-50 animate-spin"
        style={{ animationDuration: '45s', animationDirection: 'reverse' }}
      />

      {/* 4. Core Handcrafted Master Vector Illustration of Rishi Muni in Jnana Mudra */}
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transform transition-transform duration-300 group-hover:scale-105"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="auraGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#ea580c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="robeSaffron" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          <linearGradient id="robeGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="beardSilver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="skinWarm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Mudra Hand Glow */}
          <filter id="handGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Divine Prabha-Mandala (Aura Halo) --- */}
        <circle cx="200" cy="180" r="145" fill="url(#auraGlow)" />
        <circle cx="200" cy="180" r="130" stroke="#fef08a" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="200" cy="180" r="115" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />

        {/* 12 Radiant Rays of Aditya behind head */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 200 + Math.cos(angle) * 115;
          const y1 = 180 + Math.sin(angle) * 115;
          const x2 = 200 + Math.cos(angle) * 145;
          const y2 = 180 + Math.sin(angle) * 145;
          return (
            <line 
              key={i} 
              x1={x1} 
              y1={y1} 
              x2={x2} 
              y2={y2} 
              stroke="#fef08a" 
              strokeWidth="2" 
              strokeLinecap="round" 
              opacity="0.7" 
            />
          );
        })}

        {/* --- Torso & Meditative Posture --- */}
        {/* Saffron Angavastra & Robes */}
        <path 
          d="M100 370 C100 290, 140 260, 200 260 C260 260, 300 290, 300 370 C300 390, 100 390, 100 370 Z" 
          fill="url(#robeSaffron)" 
          stroke="#7c2d12" 
          strokeWidth="2" 
        />
        {/* Golden Sash / Yajnopavita / Scarf fold */}
        <path 
          d="M145 265 Q200 320 260 375" 
          stroke="url(#robeGold)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          opacity="0.8" 
        />
        <path 
          d="M135 270 Q190 325 250 380" 
          stroke="#78350f" 
          strokeWidth="2" 
        />

        {/* Sacred Rudraksha Mala across chest */}
        <path 
          d="M150 260 Q200 315 250 260" 
          stroke="#451a03" 
          strokeWidth="3.5" 
          strokeDasharray="4 6" 
          strokeLinecap="round" 
        />
        <circle cx="200" cy="288" r="5" fill="#92400e" stroke="#fef08a" strokeWidth="1" />

        {/* --- Ascetic Head, Face & Hair --- */}
        {/* Matted Hair Jata Topknot */}
        <ellipse cx="200" cy="115" rx="35" ry="30" fill="#451a03" />
        <ellipse cx="200" cy="100" rx="25" ry="20" fill="#78350f" />
        <circle cx="200" cy="90" r="16" fill="#92400e" />
        <circle cx="200" cy="90" r="6" fill="#fef08a" />
        {/* Golden Crescent Moon in Hair */}
        <path 
          d="M214 78 Q222 88 214 98 Q226 88 214 78 Z" 
          fill="#fef08a" 
          filter="url(#handGlow)" 
        />

        {/* Face Outline */}
        <path 
          d="M165 145 C165 125, 235 125, 235 145 C235 185, 215 210, 200 215 C185 210, 165 185, 165 145 Z" 
          fill="url(#skinWarm)" 
        />

        {/* Sandalwood Tripundra on Forehead */}
        <path d="M185 136 L215 136" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M186 141 L214 141" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M188 146 L212 146" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        {/* Red Kumkum Third-Eye Bindu */}
        <circle cx="200" cy="141" r="2.5" fill="#dc2626" />

        {/* Meditative Serene Eyes */}
        <path d="M178 158 Q187 165 194 159" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M206 159 Q213 165 222 158" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Eyebrows */}
        <path d="M176 153 Q186 149 195 153" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M205 153 Q214 149 224 153" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Gentle Compassionate Smile */}
        <path d="M192 180 Q200 185 208 180" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Flowing Silver Beard of Timeless Wisdom */}
        <path 
          d="M170 170 C160 215, 175 270, 200 280 C225 270, 240 215, 230 170 C220 185, 210 190, 200 190 C190 190, 180 185, 170 170 Z" 
          fill="url(#beardSilver)" 
          stroke="#cbd5e1" 
          strokeWidth="1.5" 
        />
        {/* Fine Beard Texture Waves */}
        <path d="M188 200 Q192 240 196 265" stroke="#94a3b8" strokeWidth="1" opacity="0.6" fill="none" />
        <path d="M200 195 Q200 245 200 272" stroke="#94a3b8" strokeWidth="1" opacity="0.6" fill="none" />
        <path d="M212 200 Q208 240 204 265" stroke="#94a3b8" strokeWidth="1" opacity="0.6" fill="none" />

        {/* --- RIGHT HAND IN SACRED JNANA MUDRA (Gyan Mudra of Cosmic Wisdom) --- */}
        {/* Palm & Wrist */}
        <g filter="url(#handGlow)">
          {/* Radiant Halo around the Mudra */}
          <circle cx="285" cy="245" r="28" fill="#fef08a" opacity="0.35" />
          <circle cx="285" cy="245" r="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />

          {/* Forearm draped in sleeve */}
          <path d="M260 300 Q275 270 280 255" stroke="url(#robeSaffron)" strokeWidth="18" strokeLinecap="round" />
          {/* Rudraksha Bracelet on Wrist */}
          <circle cx="277" cy="262" r="3.5" fill="#451a03" />
          <circle cx="282" cy="265" r="3.5" fill="#78350f" />
          <circle cx="287" cy="268" r="3.5" fill="#451a03" />

          {/* Mudra Hand: Index Finger & Thumb Meeting in Circle */}
          <path 
            d="M280 252 C275 240, 280 230, 287 232 C293 234, 292 245, 286 248" 
            fill="url(#skinWarm)" 
            stroke="#78350f" 
            strokeWidth="1.5" 
          />
          {/* Thumb touching tip */}
          <path 
            d="M276 250 C272 242, 276 235, 283 234 C287 234, 288 240, 285 245" 
            fill="url(#skinWarm)" 
            stroke="#78350f" 
            strokeWidth="1.5" 
          />
          {/* Golden Sparkle at Finger Contact (The Spark of Jnana) */}
          <circle cx="285" cy="235" r="3" fill="#ffffff" />
          <path d="M285 230 L285 240 M280 235 L290 235" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Three Extended Fingers (Sat, Chit, Ananda) */}
          <path d="M290 234 Q304 225 308 232 Q306 238 293 240" fill="url(#skinWarm)" stroke="#78350f" strokeWidth="1.2" />
          <path d="M289 240 Q303 234 306 240 Q304 246 291 247" fill="url(#skinWarm)" stroke="#78350f" strokeWidth="1.2" />
          <path d="M287 247 Q299 244 301 250 Q298 255 288 253" fill="url(#skinWarm)" stroke="#78350f" strokeWidth="1.2" />
        </g>

        {/* --- LEFT HAND IN DHYANA MUDRA WITH JAPAMALA --- */}
        <g>
          {/* Left sleeve & hand resting in lap */}
          <path d="M140 300 Q125 270 120 255" stroke="url(#robeSaffron)" strokeWidth="18" strokeLinecap="round" />
          <ellipse cx="125" cy="255" rx="14" ry="10" fill="url(#skinWarm)" stroke="#78350f" strokeWidth="1.5" />
          {/* Mala Dropping from Fingers */}
          <path 
            d="M125 260 Q120 300 135 320 Q145 315 130 262" 
            stroke="#451a03" 
            strokeWidth="3" 
            strokeDasharray="3 4" 
            strokeLinecap="round" 
            fill="none" 
          />
          <circle cx="135" cy="320" r="4" fill="#f59e0b" />
        </g>

        {/* --- Sacred Lotus Asana Base --- */}
        <path 
          d="M80 380 Q200 350 320 380 Q200 410 80 380 Z" 
          fill="#1c1209" 
          stroke="#e8913a" 
          strokeWidth="2" 
          opacity="0.8" 
        />
        <path 
          d="M120 375 Q200 355 280 375" 
          stroke="#fde047" 
          strokeWidth="1.5" 
          strokeDasharray="4 6" 
          opacity="0.7" 
        />
      </svg>

      {/* 5. Speech / Aura Pulse Indicator */}
      {isSpeaking && (
        <div className="absolute bottom-2 px-3 py-1 rounded-full bg-black/80 border border-amber-400 text-[10px] font-mono font-bold text-amber-300 shadow-lg flex items-center gap-1.5 z-20 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>ऋषि मुनि उपदेश</span>
        </div>
      )}
    </div>
  );
}
