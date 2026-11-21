'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, Calendar, MapPin, Users, BookOpen, Sparkles, Tag, ShieldCheck, ExternalLink } from 'lucide-react';
import { TimelineEvent } from '../data/timelineEvents';
import { soundManager } from '../utils/audio';

interface EventDetailDrawerProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isLightMode: boolean;
  onSelectTag?: (tag: string) => void;
}

export function EventDetailDrawer({
  event,
  onClose,
  onPrev,
  onNext,
  isLightMode,
  onSelectTag
}: EventDetailDrawerProps) {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  if (!event) return null;

  // Determine lookup title for image proxy
  const searchTitle = event.id === 'kardashev-type-9-final-observer' 
    ? 'Hubble_Ultra_Deep_Field' 
    : event.id === 'sveta-varaha-kalpa-begins' 
    ? 'Varaha' 
    : event.id === 'samudra-manthan-kurma' 
    ? 'Kurma' 
    : event.id === 'kurukshetra-war-gita' 
    ? 'Krishna' 
    : event.id === 'present-day-anthropocene' 
    ? 'The_Blue_Marble' 
    : event.id === 'dyson-swarm-type-2-stellar' 
    ? 'Dyson_sphere' 
    : event.title.split('—')[0].split('(')[0].trim().replace(/\s+/g, '_');

  const proxyImageUrl = `/api/image-proxy?title=${encodeURIComponent(searchTitle)}`;

  return (
    <aside 
      className={`fixed top-[68px] bottom-[46px] right-0 z-40 w-full sm:w-[460px] md:w-[520px] lg:w-[560px] border-l shadow-2xl flex flex-col transition-all duration-300 ${
        isLightMode 
          ? 'bg-[#f0d9a8]/98 border-[#e8913a]/30 text-[#1d130a]' 
          : 'bg-[#16110d]/98 border-[rgba(232,214,180,0.15)] text-[#efe6d6]'
      } backdrop-blur-xl animate-slideLeft`}
    >
      {/* Top Drawer Action Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[rgba(232,214,180,0.12)] bg-black/10 select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); onPrev(); }}
            className="p-1.5 rounded-full hover:bg-[rgba(232,214,180,0.1)] text-[#b5a990] hover:text-[#efe6d6] transition-colors"
            title="Previous Milestone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => { soundManager.playClick(); onNext(); }}
            className="p-1.5 rounded-full hover:bg-[rgba(232,214,180,0.1)] text-[#b5a990] hover:text-[#efe6d6] transition-colors"
            title="Next Milestone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-[#b5a990] ml-2">Ring {event.ring}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => soundManager.playChime(432 + event.ring * 32)}
            className="p-1.5 rounded-full hover:bg-[rgba(232,214,180,0.1)] text-[#e8913a] transition-colors"
            title="Resonate Sacred Harmonic Frequency"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-[rgba(232,214,180,0.1)] text-[#b5a990] hover:text-[#efe6d6] transition-colors"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Category & Classification Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#e8913a]/15 text-[#e8913a] border border-[#e8913a]/30">
            {event.category}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#6fb0b2]/15 text-[#6fb0b2] border border-[#6fb0b2]/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            {event.dateClassification}
          </span>
          {event.kardashevLevel !== undefined && (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#9d93c9]/20 text-[#9d93c9] border border-[#9d93c9]/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Kardashev Type {event.kardashevLevel}
            </span>
          )}
        </div>

        {/* Title Stack */}
        <div>
          {event.sanskritTitle && (
            <p className="text-sm font-medium text-[#e8913a] tracking-wide mb-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              {event.sanskritTitle}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl font-display text-[#efe6d6] leading-tight" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            {event.title}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-[#f2c47a]">
            <Calendar className="w-3.5 h-3.5 text-[#e8913a]" />
            <span>{event.date}</span>
            {event.energyScale && (
              <span className="ml-2 px-2 py-0.5 rounded bg-[rgba(232,214,180,0.08)] text-[#80B9E8]">
                Power: {event.energyScale}
              </span>
            )}
          </div>
        </div>

        {/* High-Resolution Photographic Card via Local Same-Origin Proxy */}
        <figure className="relative rounded-[14px] overflow-hidden border border-[rgba(232,214,180,0.18)] bg-black/60 shadow-xl group">
          <div className="relative w-full h-64 md:h-72 bg-black flex items-center justify-center overflow-hidden">
            <img 
              src={proxyImageUrl} 
              alt={event.imageCaption || event.title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-80 animate-pulse'}`}
            />
          </div>
          <figcaption className="p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-[11px] text-[#b5a990] flex items-center justify-between border-t border-[rgba(232,214,180,0.1)]">
            <span className="truncate pr-2 font-medium text-[#efe6d6]">
              {event.imageCaption || event.title}
            </span>
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(searchTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#e8913a] hover:underline shrink-0 text-[10px]"
            >
              Wikimedia Commons <ExternalLink className="w-3 h-3" />
            </a>
          </figcaption>
        </figure>

        {/* Sanskrit Verse / Quote Card */}
        {event.sanskritQuote && (
          <div className="p-4 rounded-[12px] bg-[#e8913a]/10 border border-[#e8913a]/30 space-y-2">
            <p className="text-sm font-semibold text-[#f2c47a] tracking-wide text-center" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              {event.sanskritQuote.verse}
            </p>
            <p className="text-xs italic text-[#b5a990] text-center font-serif">
              &quot;{event.sanskritQuote.transliteration}&quot;
            </p>
            <p className="text-xs text-[#efe6d6] text-center border-t border-[rgba(232,214,180,0.15)] pt-2 leading-relaxed">
              {event.sanskritQuote.translation}
            </p>
          </div>
        )}

        {/* Summary & Narrative */}
        <div className="space-y-3 text-sm leading-relaxed text-[#e9dfcc]">
          <p className="font-semibold text-base text-[#efe6d6]">
            {event.summary}
          </p>
          <p className="text-sm opacity-90 leading-relaxed font-body">
            {event.content}
          </p>
        </div>

        {/* Metadata Grid (People, Places, Texts) */}
        <div className="space-y-3 pt-3 border-t border-[rgba(232,214,180,0.12)]">
          {event.relatedPeople && event.relatedPeople.length > 0 && (
            <div className="flex items-start gap-2 text-xs">
              <Users className="w-3.5 h-3.5 text-[#e8913a] mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-[#b5a990]">Associated Figures: </span>
                <span className="text-[#efe6d6]">{event.relatedPeople.join(', ')}</span>
              </div>
            </div>
          )}
          {event.relatedPlaces && event.relatedPlaces.length > 0 && (
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#6fb0b2] mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-[#b5a990]">Sacred Geography: </span>
                <span className="text-[#efe6d6]">{event.relatedPlaces.join(', ')}</span>
              </div>
            </div>
          )}
          {event.relatedTexts && event.relatedTexts.length > 0 && (
            <div className="flex items-start gap-2 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#9d93c9] mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-[#b5a990]">Source Treatises: </span>
                <span className="text-[#efe6d6]">{event.relatedTexts.join(', ')}</span>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#86a86c] mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-[#b5a990]">Attestation Confidence: </span>
              <span className="text-[#efe6d6]">{event.confidence}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-3 border-t border-[rgba(232,214,180,0.12)]">
          <div className="flex items-center gap-1.5 mb-2">
            <Tag className="w-3.5 h-3.5 text-[#b5a990]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#b5a990]">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag && onSelectTag(tag)}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[rgba(232,214,180,0.06)] hover:bg-[#e8913a]/20 text-[#b5a990] hover:text-[#e8913a] border border-[rgba(232,214,180,0.1)] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
