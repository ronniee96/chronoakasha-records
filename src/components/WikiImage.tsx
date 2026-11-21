'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import wikiThumbnailsData from '../data/wikiThumbnails.json';
import tryambakImageMap from '../data/tryambakImageMap.json';

export interface WikiImageProps {
  wikiImageTitle?: string;
  tags?: string[];
  categoryCode?: string;
  caption?: string;
  isLightMode?: boolean;
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
    <figure
      className={`relative rounded-[12px] overflow-hidden border shadow-2xl transition-all duration-300 animate-in fade-in ${
        isLightMode
          ? 'bg-[#eadeca] border-[#c59b27]/40'
          : 'bg-gradient-to-b from-[#1c140d] via-[#120d08] to-[#0a0704] border-[rgba(232,145,58,0.35)]'
      } group`}
    >
      {/* Decorative Traditional Indian Brass Corner Accents */}
      <span className="absolute top-1.5 left-1.5 z-20 text-[9px] text-[#e8913a] select-none opacity-80">
        ❖
      </span>
      <span className="absolute top-1.5 right-1.5 z-20 text-[9px] text-[#e8913a] select-none opacity-80">
        ❖
      </span>
      <span className="absolute bottom-11 left-1.5 z-20 text-[9px] text-[#e8913a] select-none opacity-80">
        ❖
      </span>
      <span className="absolute bottom-11 right-1.5 z-20 text-[9px] text-[#e8913a] select-none opacity-80">
        ❖
      </span>

      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden flex items-center justify-center bg-[#0d0a08]">
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
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
        />

        {/* Subtle authentic glow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Ornate Copperplate Caption Plaque */}
      <figcaption className="p-3 bg-gradient-to-t from-[#16100b] via-[#1a130e] to-[#241a12] text-[11px] text-[#b5a990] flex items-center justify-between border-t border-[rgba(232,145,58,0.25)] select-none">
        <div className="truncate pr-3 flex items-center gap-1.5">
          <span className="text-[#e8913a]">✦</span>
          <span className="truncate font-serif font-semibold text-[#efe6d6]">
            {imgRecord.title || caption}
          </span>
        </div>
        <a
          href={imgRecord.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] font-mono text-[#d4af37] hover:text-[#f2c47a] transition-colors shrink-0 bg-black/40 px-2 py-0.5 rounded border border-[#e8913a]/30"
          aria-label="Open Historical Archive Entry on Wikipedia"
        >
          <span>WIKIPEDIA</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </figcaption>
    </figure>
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
