import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Server-side memory cache
const memoryCache = new Map<string, { buffer: Buffer; contentType: string }>();

// Persistent disk cache directory
const CACHE_DIR = path.join(process.cwd(), '.next', 'cache', 'wiki-images');

try {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
} catch {
  // Ignore
}

function getSafeFilename(title: string): string {
  return Buffer.from(title).toString('hex').substring(0, 64);
}

function generateFallbackSvg(title: string): { buffer: Buffer; contentType: string } {
  const clean = title.replace(/_/g, ' ').substring(0, 45);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1e1510"/>
        <stop offset="50%" stop-color="#110d0a"/>
        <stop offset="100%" stop-color="#08090D"/>
      </radialGradient>
      <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#e8913a" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#e8913a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="640" height="400" fill="url(#bg)"/>
    
    <!-- Concentric Sacred Rings -->
    <circle cx="320" cy="180" r="140" fill="url(#lotusGlow)"/>
    <circle cx="320" cy="180" r="120" fill="none" stroke="#e8913a" stroke-width="1.2" stroke-dasharray="3 6" opacity="0.6"/>
    <circle cx="320" cy="180" r="90" fill="none" stroke="#f2c47a" stroke-width="1" opacity="0.4"/>
    <circle cx="320" cy="180" r="60" fill="none" stroke="#6fb0b2" stroke-width="1" stroke-dasharray="2 4" opacity="0.5"/>
    <circle cx="320" cy="180" r="30" fill="none" stroke="#e8913a" stroke-width="1.5" opacity="0.7"/>

    <!-- Central Sacred Glyph -->
    <text x="320" y="192" text-anchor="middle" dominant-baseline="central" fill="#e8913a" font-family="serif" font-size="44" font-weight="bold">ॐ</text>

    <!-- Title & Subtitle -->
    <text x="320" y="270" text-anchor="middle" dominant-baseline="central" fill="#efe6d6" font-family="Georgia, serif" font-size="16" font-weight="bold">${clean}</text>
    <text x="320" y="295" text-anchor="middle" dominant-baseline="central" fill="#b5a990" font-family="sans-serif" font-size="11" letter-spacing="1">CHRONOAKASHA RECORDS • SANĀTANA ARCHIVE</text>
  </svg>`;

  return {
    buffer: Buffer.from(svg),
    contentType: 'image/svg+xml',
  };
}

async function fetchThumbnailUrl(title: string): Promise<string | null> {
  const headers = {
    'User-Agent': 'ChronoakashaRecords/1.0 (https://chronoakasha.records; contact@tryambakmedia.in)',
    'Accept': 'application/json',
  };

  // Step 1: Direct Wikipedia summary lookup
  try {
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/\s+/g, '_'))}`;
    const res = await fetch(summaryUrl, { headers });
    if (res.ok) {
      const data = await res.json();
      if (data.thumbnail?.source) {
        return data.thumbnail.source;
      }
    }
  } catch {
    // Continue to step 2
  }

  // Step 2: Full-text search fallback
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&srlimit=1&format=json`;
    const sRes = await fetch(searchUrl, { headers });
    if (sRes.ok) {
      const sData = await sRes.json();
      const matchedTitle = sData.query?.search?.[0]?.title;
      if (matchedTitle && matchedTitle.toLowerCase() !== title.toLowerCase()) {
        const fallbackSummaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(matchedTitle.replace(/\s+/g, '_'))}`;
        const fbRes = await fetch(fallbackSummaryUrl, { headers });
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          if (fbData.thumbnail?.source) {
            return fbData.thumbnail.source;
          }
        }
      }
    }
  } catch {
    // Continue
  }

  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || searchParams.get('t');

  if (!title) {
    const fallback = generateFallbackSvg('Chronoaकोश Archive');
    return new NextResponse(new Uint8Array(fallback.buffer), {
      headers: {
        'Content-Type': fallback.contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  const cleanTitle = title.trim();

  // 1. Check in-memory cache (0ms)
  if (memoryCache.has(cleanTitle)) {
    const cached = memoryCache.get(cleanTitle)!;
    return new NextResponse(new Uint8Array(cached.buffer), {
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // 2. Check disk cache (1ms)
  const safeFilename = getSafeFilename(cleanTitle);
  const diskPath = path.join(CACHE_DIR, `${safeFilename}.jpg`);
  if (fs.existsSync(diskPath)) {
    try {
      const buffer = fs.readFileSync(diskPath);
      const contentType = 'image/jpeg';
      memoryCache.set(cleanTitle, { buffer, contentType });
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      // Continue to download
    }
  }

  // 3. Fetch from Wikipedia API
  try {
    const thumbUrl = await fetchThumbnailUrl(cleanTitle);

    if (thumbUrl) {
      const imgRes = await fetch(thumbUrl, {
        headers: {
          'User-Agent': 'ChronoakashaRecords/1.0 (https://chronoakasha.records; contact@tryambakmedia.in)',
        },
      });

      if (imgRes.ok) {
        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = imgRes.headers.get('content-type') || 'image/jpeg';

        // Write to memory and disk cache
        memoryCache.set(cleanTitle, { buffer, contentType });
        try {
          fs.writeFileSync(diskPath, buffer);
        } catch {
          // Ignore
        }

        return new NextResponse(new Uint8Array(buffer), {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }
  } catch {
    // Failed to download image, proceed to fallback SVG
  }

  // Fallback to elegant SVG
  const fallback = generateFallbackSvg(cleanTitle);
  memoryCache.set(cleanTitle, fallback);

  return new NextResponse(new Uint8Array(fallback.buffer), {
    headers: {
      'Content-Type': fallback.contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
