import { NextResponse } from 'next/server';
import boxscoreData from '../../../../data/spaceTrackBoxscore.json';

export interface SpaceTrackBoxscoreRow {
  COUNTRY: string;
  SPADOC_CD: string;
  ORBITAL_TBA: number;
  ORBITAL_PAYLOAD_COUNT: number;
  ORBITAL_ROCKET_BODY_COUNT: number;
  ORBITAL_DEBRIS_COUNT: number;
  ORBITAL_TOTAL_COUNT: number;
  DECAYED_PAYLOAD_COUNT: number;
  DECAYED_ROCKET_BODY_COUNT: number;
  DECAYED_DEBRIS_COUNT: number;
  DECAYED_TOTAL_COUNT: number;
  COUNTRY_TOTAL: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const sortBy = searchParams.get('sortBy') || 'ORBITAL_TOTAL_COUNT'; // or 'COUNTRY_TOTAL', 'ORBITAL_PAYLOAD_COUNT', 'ORBITAL_DEBRIS_COUNT'

    const rows = boxscoreData as SpaceTrackBoxscoreRow[];
    const allSummary = rows.find(r => r.SPADOC_CD === 'ALL') || rows[rows.length - 1];
    const countryRows = rows.filter(r => r.SPADOC_CD !== 'ALL');

    let filtered = countryRows;
    if (query) {
      filtered = countryRows.filter(r => 
        r.COUNTRY.toLowerCase().includes(query) || 
        r.SPADOC_CD.toLowerCase().includes(query)
      );
    }

    // Sort descending
    filtered.sort((a, b) => {
      const valA = (a as any)[sortBy] ?? a.ORBITAL_TOTAL_COUNT;
      const valB = (b as any)[sortBy] ?? b.ORBITAL_TOTAL_COUNT;
      return valB - valA;
    });

    return NextResponse.json({
      success: true,
      provider: 'Space-Track (18th Space Defense Squadron)',
      sourceUrl: 'https://www.space-track.org/basicspacedata/query/class/boxscore/format/html',
      globalSummary: {
        totalTrackedObjects: allSummary.COUNTRY_TOTAL, // 71,365
        totalInOrbit: allSummary.ORBITAL_TOTAL_COUNT, // 35,558
        activePayloadsInOrbit: allSummary.ORBITAL_PAYLOAD_COUNT, // 19,880
        rocketBodiesInOrbit: allSummary.ORBITAL_ROCKET_BODY_COUNT, // 2,437
        trackedDebrisInOrbit: allSummary.ORBITAL_DEBRIS_COUNT, // 12,553
        totalDecayed: allSummary.DECAYED_TOTAL_COUNT, // 35,807
        decayedPayloads: allSummary.DECAYED_PAYLOAD_COUNT, // 8,448
        decayedDebris: allSummary.DECAYED_DEBRIS_COUNT // 22,864
      },
      count: filtered.length,
      records: filtered,
      topNations: countryRows.slice(0, 10).map(r => ({
        country: r.COUNTRY,
        code: r.SPADOC_CD,
        orbitalPayloads: r.ORBITAL_PAYLOAD_COUNT,
        orbitalDebris: r.ORBITAL_DEBRIS_COUNT,
        orbitalTotal: r.ORBITAL_TOTAL_COUNT,
        totalHistorical: r.COUNTRY_TOTAL
      }))
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to retrieve Space-Track boxscore'
    }, { status: 500 });
  }
}
