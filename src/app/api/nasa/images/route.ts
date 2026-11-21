import { NextResponse } from 'next/server';

interface ImageSearchCache {
  timestamp: number;
  data: any[];
}

const searchCache: Map<string, ImageSearchCache> = new Map();
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'International Space Station';
    const page = searchParams.get('page') || '1';
    const cacheKey = `${query.toLowerCase().trim()}_p${page}`;

    const now = Date.now();
    const cached = searchCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        provider: 'NASA Image and Video Library',
        query,
        count: cached.data.length,
        items: cached.data
      });
    }

    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page=${page}`;
    const res = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 7200 }
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `NASA Images API returned HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const rawJson = await res.json();
    const rawItems = rawJson.collection?.items || [];

    // Parse and normalize into clean SpacecraftPhotograph records
    const normalizedItems = rawItems.slice(0, 24).map((item: any) => {
      const metadata = item.data?.[0] || {};
      const links = item.links || [];
      const imageThumb = links.find((l: any) => l.rel === 'preview')?.href || '';

      return {
        nasaId: metadata.nasa_id || '',
        title: metadata.title || 'NASA Photograph',
        description: metadata.description || 'Authentic photograph from NASA scientific archives.',
        dateCreated: metadata.date_created || '',
        center: metadata.center || 'NASA',
        photographer: metadata.photographer || metadata.secondary_creator || 'NASA',
        keywords: metadata.keywords || [],
        thumbnailUrl: imageThumb,
        originalUrl: item.href || '',
        provider: 'NASA Image and Video Library',
        isAuthenticNasaMedia: true
      };
    }).filter((it: any) => it.thumbnailUrl);

    searchCache.set(cacheKey, { timestamp: now, data: normalizedItems });

    return NextResponse.json({
      success: true,
      source: 'live',
      provider: 'NASA Image and Video Library',
      query,
      count: normalizedItems.length,
      items: normalizedItems,
      fetchedAt: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to fetch NASA imagery'
    }, { status: 500 });
  }
}
