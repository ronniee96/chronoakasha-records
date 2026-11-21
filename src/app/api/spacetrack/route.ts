import { NextResponse } from 'next/server';

interface SpaceTrackSession {
  cookie: string;
  expiresAt: number;
}

let sessionStore: SpaceTrackSession | null = null;

async function getSpaceTrackSession(username: string, password: string): Promise<string | null> {
  const now = Date.now();
  if (sessionStore && now < sessionStore.expiresAt) {
    return sessionStore.cookie;
  }

  try {
    const loginRes = await fetch('https://www.space-track.org/ajaxauth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        identity: username,
        password: password
      })
    });

    if (!loginRes.ok) return null;

    const cookieHeader = loginRes.headers.get('set-cookie');
    if (!cookieHeader) return null;

    // Extract session cookie
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const authCookie = cookies.find(c => c.startsWith('spacetrack_session') || c.startsWith('PHPSESSID') || c.includes('=')) || cookieHeader;

    sessionStore = {
      cookie: authCookie,
      expiresAt: now + 3600 * 1000 // 1 hour session validity
    };

    return authCookie;
  } catch (err) {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noradId = searchParams.get('noradId') || '25544'; // Default ISS (25544)
    const days = parseInt(searchParams.get('days') || '7', 10);

    const username = process.env.SPACETRACK_USERNAME;
    const password = process.env.SPACETRACK_PASSWORD;

    // Check credential availability
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        status: 'CREDENTIALS_REQUIRED',
        provider: 'Space-Track (18th Space Defense Squadron)',
        message: 'Space-Track account credentials (SPACETRACK_USERNAME & SPACETRACK_PASSWORD) are not configured in environment variables.',
        instructions: 'Configure free credentials at space-track.org in SETTINGS → DATA PROVIDERS to unlock official historical GP_History element sets.',
        mode: 'RECONSTRUCTED_APPROXIMATION',
        isArchivedElements: false,
        noradId: parseInt(noradId, 10),
        disclaimer: 'Showing algorithmic backward SGP4 propagation from current epoch elements. Not genuine Space-Track GP_History records.'
      });
    }

    const sessionCookie = await getSpaceTrackSession(username, password);
    if (!sessionCookie) {
      return NextResponse.json({
        success: false,
        status: 'AUTHENTICATION_FAILED',
        provider: 'Space-Track (18th Space Defense Squadron)',
        message: 'Could not authenticate with Space-Track API. Please verify username and password.',
        mode: 'RECONSTRUCTED_APPROXIMATION',
        isArchivedElements: false
      }, { status: 401 });
    }

    // Query 7-day historical general perturbations (GP_History)
    const queryUrl = `https://www.space-track.org/basicspacedata/query/class/gp_history/NORAD_CAT_ID/${noradId}/EPOCH/>now-${days}/orderby/EPOCH%20asc/format/json`;
    
    const queryRes = await fetch(queryUrl, {
      headers: {
        'Cookie': sessionCookie,
        'Accept': 'application/json'
      }
    });

    if (!queryRes.ok) {
      return NextResponse.json({
        success: false,
        status: 'QUERY_ERROR',
        error: `Space-Track returned HTTP ${queryRes.status}`
      }, { status: queryRes.status });
    }

    const records = await queryRes.json();

    return NextResponse.json({
      success: true,
      status: 'AUTHENTICATED_ARCHIVE',
      provider: 'Space-Track (18th Space Defense Squadron)',
      noradId: parseInt(noradId, 10),
      isArchivedElements: true,
      mode: 'OFFICIAL_GP_HISTORY',
      count: records.length,
      historicalElements: records.map((r: any) => ({
        noradId: parseInt(r.NORAD_CAT_ID, 10),
        epoch: r.EPOCH,
        line1: r.TLE_LINE1,
        line2: r.TLE_LINE2,
        inclinationDeg: parseFloat(r.INCLINATION),
        raanDeg: parseFloat(r.RA_OF_ASC_NODE),
        eccentricity: parseFloat(r.ECCENTRICITY),
        meanMotion: parseFloat(r.MEAN_MOTION),
        periodMinutes: parseFloat(r.PERIOD),
        bstar: parseFloat(r.BSTAR)
      })),
      retrievedAt: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Space-Track integration error'
    }, { status: 500 });
  }
}
