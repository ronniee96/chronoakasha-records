'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Maximize2, X, Scan, Check } from 'lucide-react';
import wikiThumbnailsData from '../data/wikiThumbnails.json';
import tryambakImageMap from '../data/tryambakImageMap.json';

export interface WikiImageProps {
  wikiImageTitle?: string;
  tags?: string[];
  categoryCode?: string;
  caption?: string;
  isLightMode?: boolean;
  isExpanded?: boolean;
}

export interface ImageRecord {
  title: string;
  src: string;
  fb: string;
  url: string;
}

const STATIC_THUMBS = wikiThumbnailsData as Record<string, ImageRecord>;
const TAG_MAP = tryambakImageMap as Record<string, string>;

// In-memory cache for dynamic lookups during the session
const clientImageCache = new Map<string, ImageRecord | null>();

function cleanWikimediaUrl(url: string): string {
  if (!url) return '';
  return url
    .replace('https://thumb.wikimedia.org', 'https://upload.wikimedia.org')
    .replace('http://thumb.wikimedia.org', 'https://upload.wikimedia.org')
    .split('?')[0];
}

// Pre-fill cache with sanitized static thumbs for instant 0ms lookups
Object.entries(STATIC_THUMBS).forEach(([k, v]) => {
  if (v && v.src) {
    clientImageCache.set(k, {
      ...v,
      src: cleanWikimediaUrl(v.src),
      fb: cleanWikimediaUrl(v.fb || v.src),
    });
  }
});

function getTargetTitle(wikiImageTitle?: string, tags?: string[], categoryCode?: string): string | null {
  if (categoryCode === 'F') return null; // Future speculative events have no historical photo

  const direct = (wikiImageTitle || '').trim();
  if (direct) return direct;

  if (tags && tags.length > 0) {
    for (const g of tags.slice(0, 3)) {
      if (TAG_MAP[g]) return TAG_MAP[g];
    }
  }

  return null;
}

/**
 * Inner component mounted only when targetTitle is valid.
 * Uses key={targetTitle} so state is 100% freshly created and isolated per image target.
 */
function WikiImageInner({
  targetTitle,
  caption,
  isLightMode,
  isExpanded,
}: WikiImageProps & { targetTitle: string }) {
  // Synchronous cache lookup: 0ms instant resolution
  const cachedRecord = clientImageCache.has(targetTitle)
    ? clientImageCache.get(targetTitle) ?? null
    : null;

  const [imgRecord, setImgRecord] = useState<ImageRecord | null>(cachedRecord);
  const [attemptState, setAttemptState] = useState<'primary' | 'fallback' | 'proxy' | 'failed'>('primary');
  const [isLoading, setIsLoading] = useState<boolean>(
    Boolean(!cachedRecord && !clientImageCache.has(targetTitle))
  );
  const [cropMode, setCropMode] = useState<'fit' | 'fill'>('fit');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  useEffect(() => {
    // Reset attempt state on new targetTitle
    setAttemptState('primary');

    // 1. Instant check in client cache / static index (0ms resolution)
    if (clientImageCache.has(targetTitle)) {
      const rec = clientImageCache.get(targetTitle) || null;
      setImgRecord(rec);
      setIsLoading(false);
      return;
    }

    // 2. Fetch from Wikipedia summary API (following all redirects)
    let active = true;
    setIsLoading(true);

    const fetchWiki = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`
        );
        if (!res.ok) {
          if (active) {
            clientImageCache.set(targetTitle, null);
            setImgRecord(null);
            setIsLoading(false);
          }
          return;
        }

        const data = await res.json();
        if (data && data.thumbnail && data.thumbnail.source) {
          const rawSrc = data.thumbnail.source.replace(/\/(\d+)px-/, '/500px-');
          const record: ImageRecord = {
            title: data.title || targetTitle,
            src: cleanWikimediaUrl(rawSrc),
            fb: cleanWikimediaUrl(data.thumbnail.source),
            url:
              data.content_urls?.desktop?.page ||
              `https://en.wikipedia.org/wiki/${encodeURIComponent(targetTitle)}`,
          };
          if (active) {
            clientImageCache.set(targetTitle, record);
            setImgRecord(record);
            setIsLoading(false);
          }
        } else {
          if (active) {
            clientImageCache.set(targetTitle, null);
            setImgRecord(null);
            setIsLoading(false);
          }
        }
      } catch {
        if (active) {
          clientImageCache.set(targetTitle, null);
          setImgRecord(null);
          setIsLoading(false);
        }
      }
    };

    fetchWiki();

    return () => {
      active = false;
    };
  }, [targetTitle]);

  // Authentic Hindutva / Sanātana Sacred Loading State
  if (isLoading) {
    return (
      <div
        className={`relative rounded-[12px] h-52 sm:h-60 overflow-hidden border shadow-2xl flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 ${
          isLightMode
            ? 'bg-[#f4ebd9]/90 border-[#c59b27]/40 text-[#1d130a]'
            : 'bg-gradient-to-b from-[#1c140d]/95 via-[#120d08]/95 to-[#0a0704]/95 border-[rgba(232,145,58,0.35)] text-[#efe6d6]'
        }`}
      >
        <span className="absolute top-2 left-2 text-[10px] text-[#e8913a] opacity-80">❖</span>
        <span className="absolute top-2 right-2 text-[10px] text-[#e8913a] opacity-80">❖</span>
        <span className="absolute bottom-2 left-2 text-[10px] text-[#e8913a] opacity-80">❖</span>
        <span className="absolute bottom-2 right-2 text-[10px] text-[#e8913a] opacity-80">❖</span>

        <div className="relative mb-3 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full border border-dashed border-[#e8913a]/50 animate-spin"
            style={{ animationDuration: '14s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-serif text-[#fde047] drop-shadow-[0_0_10px_rgba(232,145,58,0.6)] animate-pulse">
              ॐ
            </span>
          </div>
        </div>

        <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#e8913a] block">
          कालचक्र अभिलेख • Chronoakasha Archive
        </span>
        <p className="text-[10.5px] font-serif text-[#b5a990] mt-1">
          अन्वेषणम् क्रियते... Synchronizing authentic historical record
        </p>
      </div>
    );
  }

  // If no image exists or all attempts failed, render authentic sacred seal
  if (!imgRecord || attemptState === 'failed') {
    return (
      <div
        className={`relative rounded-[12px] h-32 sm:h-36 overflow-hidden border shadow-lg flex flex-col items-center justify-center p-4 text-center select-none ${
          isLightMode
            ? 'bg-[#eadeca] border-[#c59b27]/30 text-[#1d130a]'
            : 'bg-gradient-to-b from-[#18110b] to-[#0c0805] border-[rgba(232,145,58,0.25)] text-[#efe6d6]'
        }`}
      >
        <span className="text-xl font-serif text-[#e8913a] mb-1">ॐ</span>
        <h4 className="text-xs font-serif font-bold text-[#efe6d6] truncate max-w-[90%]">
          {caption || targetTitle}
        </h4>
        <span className="text-[10px] font-mono text-[#b5a990] mt-1 tracking-wider uppercase">
          सनातन ऐतिहासिक अभिलेख • HISTORICAL ATTESTATION
        </span>
      </div>
    );
  }

  const proxyUrl = `/api/image-proxy?title=${encodeURIComponent(targetTitle)}`;
  const currentSrc = attemptState === 'proxy' 
    ? proxyUrl 
    : (attemptState === 'fallback' && imgRecord.fb ? imgRecord.fb : imgRecord.src);

  return (
    <>
      <figure
        className={`relative rounded-[14px] overflow-hidden border shadow-2xl transition-all duration-300 animate-in fade-in ${
          isLightMode
            ? 'bg-[#eadeca] border-[#c59b27]/40'
            : 'bg-gradient-to-b from-[#1c140d] via-[#120d08] to-[#0a0704] border-[rgba(232,145,58,0.35)]'
        } group`}
      >
        {/* Decorative Traditional Indian Brass Corner Accents */}
        <span className="absolute top-2 left-2 z-20 text-[10px] text-[#e8913a] select-none opacity-80 pointer-events-none">
          ❖
        </span>
        <span className="absolute top-2 right-2 z-20 text-[10px] text-[#e8913a] select-none opacity-80 pointer-events-none">
          ❖
        </span>

        {/* Floating Top Controls: Fit/Fill Toggle & Fullscreen Modal */}
        <div className="absolute top-2.5 right-6 z-30 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCropMode((prev) => (prev === 'fit' ? 'fill' : 'fit'));
            }}
            className="px-2 py-0.5 rounded-[5px] bg-[#0d0905]/85 hover:bg-[#1a120c] backdrop-blur-md border border-[rgba(232,145,58,0.4)] text-[9.5px] font-mono font-medium text-[#d4af37] flex items-center gap-1 shadow-md transition-all"
            title={cropMode === 'fit' ? 'Toggle to Fill Frame (Top-Anchored)' : 'Toggle to Fit Whole Image (No Crop)'}
          >
            <Scan className="w-2.5 h-2.5 text-[#e8913a]" />
            <span>{cropMode === 'fit' ? 'FIT: NO CROP' : 'FILL'}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="p-1 rounded-[5px] bg-[#0d0905]/85 hover:bg-[#1a120c] backdrop-blur-md border border-[rgba(232,145,58,0.4)] text-[#d4af37] hover:text-[#fde047] shadow-md transition-all"
            title="Expand to Fullscreen View"
            aria-label="Expand to Fullscreen View"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* 
          Image Viewport Container:
          Standard layout (panel ~380px wide): h-64 sm:h-72 md:h-80 lg:h-[350px]
          Expanded widescreen layout (panel ~800-1200px wide): h-80 sm:h-96 md:h-[420px] lg:h-[480px]
        */}
        <div
          className={`relative w-full overflow-hidden flex items-center justify-center bg-[#070503] transition-all duration-500 cursor-zoom-in ${
            isExpanded
              ? 'h-80 sm:h-96 md:h-[420px] lg:h-[480px]'
              : 'h-64 sm:h-72 md:h-80 lg:h-[350px]'
          }`}
          onClick={() => setIsLightboxOpen(true)}
          title="Click to view full uncropped artwork in high resolution"
        >
          {/* Ambient blurred aura backdrop — eliminates harsh black bars while harmonizing with art */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <img
              src={currentSrc}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover blur-3xl scale-125 opacity-35 brightness-75 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/90 via-[#0d0a08]/20 to-[#0d0a08]/60 pointer-events-none" />
          </div>

          {/* Primary sharp artwork — ZERO CROPPING in fit mode, full head/crown always preserved */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-3">
            <img
              key={currentSrc}
              src={currentSrc}
              alt={imgRecord.title || caption || 'Historical record'}
              referrerPolicy="no-referrer"
              loading="eager"
              onError={() => {
                if (attemptState === 'primary' && imgRecord.fb && imgRecord.src !== imgRecord.fb) {
                  setAttemptState('fallback');
                } else if (attemptState === 'primary' || attemptState === 'fallback') {
                  setAttemptState('proxy');
                } else {
                  setAttemptState('failed');
                }
              }}
              className={`transition-all duration-500 drop-shadow-[0_12px_36px_rgba(0,0,0,0.9)] ${
                cropMode === 'fill'
                  ? 'w-full h-full object-cover object-top rounded-[6px]'
                  : 'max-h-full max-w-full w-auto h-auto object-contain rounded-[6px] group-hover:scale-[1.015]'
              }`}
            />
          </div>

          {/* Subtle authentic vignette border */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/40 rounded-[14px]" />
        </div>

        {/* Ornate Copperplate Caption Plaque */}
        <figcaption className="p-3 bg-gradient-to-t from-[#16100b] via-[#1a130e] to-[#241a12] text-[11px] text-[#b5a990] flex items-center justify-between border-t border-[rgba(232,145,58,0.25)] select-none">
          <div className="truncate pr-3 flex items-center gap-1.5">
            <span className="text-[#e8913a]">✦</span>
            <span className="truncate font-serif font-semibold text-[#efe6d6]">
              {imgRecord.title || caption}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-[10px] font-serif text-[#b5a990] hover:text-[#fde047] transition-colors"
            >
              <span>पूर्ण दर्शन</span>
            </button>
            <a
              href={imgRecord.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-[#d4af37] hover:text-[#f2c47a] transition-colors bg-black/40 px-2 py-0.5 rounded border border-[#e8913a]/30"
              aria-label="Open Historical Archive Entry on Wikipedia"
            >
              <span>WIKIPEDIA</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </figcaption>
      </figure>

      {/* Fullscreen Sacred Art Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-300 select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between pb-3 border-b border-[rgba(232,145,58,0.3)] shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="text-[#e8913a] text-xl font-serif">ॐ</span>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#efe6d6] leading-tight">
                  {imgRecord.title || caption}
                </h3>
                <span className="text-[10px] font-mono text-[#b5a990] uppercase tracking-wider">
                  सनातन ऐतिहासिक चित्रावली • SACRED ICONOGRAPHY ARCHIVE
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={imgRecord.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-mono text-[#d4af37] hover:text-[#fde047] bg-[#1a120c] px-3 py-1.5 rounded-lg border border-[#e8913a]/40 transition-colors"
              >
                <span>WIKIMEDIA COMMONS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#efe6d6] hover:text-white transition-colors"
                aria-label="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Lightbox Image Viewport */}
          <div
            className="flex-1 w-full flex items-center justify-center py-4 overflow-hidden"
            onClick={() => setIsLightboxOpen(false)}
          >
            <img
              src={currentSrc}
              alt={imgRecord.title || caption || 'Sacred historical artwork'}
              referrerPolicy="no-referrer"
              className="max-h-[82vh] max-w-[94vw] object-contain rounded-lg shadow-[0_25px_70px_rgba(0,0,0,0.98)] border border-[rgba(232,145,58,0.25)] animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Lightbox Footer Note */}
          <div
            className="w-full max-w-6xl text-center text-[11px] font-serif text-[#b5a990] pt-2 border-t border-[rgba(232,145,58,0.2)] shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Esc</kbd> or click anywhere outside to dismiss • Original uncropped sacred artwork
            </span>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Top-level WikiImage:
 * Returns null immediately if there is no image target for this event.
 * Remounts WikiImageInner with key={targetTitle} to ensure 0 state leakage.
 */
export function WikiImage(props: WikiImageProps) {
  const targetTitle = getTargetTitle(props.wikiImageTitle, props.tags, props.categoryCode);
  if (!targetTitle) {
    return (
      <div
        className={`relative rounded-[12px] h-28 overflow-hidden border shadow-md flex flex-col items-center justify-center p-3 text-center select-none ${
          props.isLightMode
            ? 'bg-[#eadeca]/80 border-[#c59b27]/30 text-[#1d130a]'
            : 'bg-gradient-to-b from-[#18110b] to-[#0c0805] border-[rgba(232,145,58,0.2)] text-[#efe6d6]'
        }`}
      >
        <span className="text-xl font-serif text-[#e8913a] mb-0.5">ॐ</span>
        <h4 className="text-xs font-serif font-semibold text-[#efe6d6] truncate max-w-[90%]">
          {props.caption}
        </h4>
        <span className="text-[9.5px] font-mono text-[#b5a990] tracking-wider uppercase mt-0.5">
          अभिलेख पट्टिका • CHRONOAKASHA HISTORICAL RECORD
        </span>
      </div>
    );
  }
  return <WikiImageInner {...props} targetTitle={targetTitle} key={targetTitle} />;
}
