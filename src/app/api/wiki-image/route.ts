import { NextRequest, NextResponse } from 'next/server';

// Server-side cache for Wikipedia image summaries
const cache = new Map<string, { src: string; title: string; extract: string; pageUrl: string } | null>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title required' }, { status: 400 });
  }

  const cleanTitle = title.trim();
  if (cache.has(cleanTitle)) {
    return NextResponse.json(cache.get(cleanTitle), {
      headers: { 'Cache-Control': 'public, s-maxage=86400' },
    });
  }

  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`,
      {
        headers: {
          'User-Agent': 'ChronoakashaRecords/1.0 (https://chronoakasha.records; contact@tryambakmedia.in)',
          'Accept': 'application/json',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!wikiRes.ok) {
      cache.set(cleanTitle, null);
      return NextResponse.json(null);
    }

    const data = await wikiRes.json();
    if (data && data.thumbnail && data.thumbnail.source) {
      // Upgrade to 500px high-resolution thumbnail
      const src = data.thumbnail.source.replace(/\/(\d+)px-/, '/600px-');
      const result = {
        src,
        title: data.title || cleanTitle,
        extract: data.extract || '',
        pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(cleanTitle)}`,
      };
      cache.set(cleanTitle, result);
      return NextResponse.json(result, {
        headers: { 'Cache-Control': 'public, s-maxage=86400' },
      });
    }

    cache.set(cleanTitle, null);
    return NextResponse.json(null);
  } catch (err) {
    return NextResponse.json(null);
  }
}
