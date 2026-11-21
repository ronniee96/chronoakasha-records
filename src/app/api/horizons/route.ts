import { NextResponse } from 'next/server';

interface PlanetaryTargetDef {
  id: string;
  command: string;
  name: string;
  sanskritName: string;
  category: 'star' | 'moon' | 'terrestrial-planet' | 'gas-giant' | 'ice-giant' | 'asteroid' | 'comet';
  colorHex: string;
  description: string;
}

const PRESET_TARGETS: PlanetaryTargetDef[] = [
  // Navagraha & Major Solar System Bodies
  { id: 'sun', command: '10', name: 'Sun', sanskritName: 'सूर्य (Surya)', category: 'star', colorHex: '#f59e0b', description: 'Center of our solar system and cosmic life-giver in Vedic cosmology.' },
  { id: 'moon', command: '301', name: 'Moon', sanskritName: 'चन्द्र (Chandra)', category: 'moon', colorHex: '#e2e8f0', description: 'Earth’s natural satellite; master of the mind, tides, and 27 Nakshatras.' },
  { id: 'mercury', command: '199', name: 'Mercury', sanskritName: 'बुध (Budha)', category: 'terrestrial-planet', colorHex: '#94a3b8', description: 'Innermost planet; ruler of intellect, communication, and swift motion.' },
  { id: 'venus', command: '299', name: 'Venus', sanskritName: 'शुक्र (Shukra)', category: 'terrestrial-planet', colorHex: '#fef08a', description: 'Brilliant morning/evening star; associated with beauty, art, and harmony.' },
  { id: 'mars', command: '499', name: 'Mars', sanskritName: 'मंगल (Mangala)', category: 'terrestrial-planet', colorHex: '#ef4444', description: 'The red planet; embodiment of vigor, energy, and planetary dynamism.' },
  { id: 'jupiter', command: '599', name: 'Jupiter', sanskritName: 'बृहस्पति (Guru)', category: 'gas-giant', colorHex: '#f97316', description: 'Greatest of planets; preceptor of the gods, wisdom, and cosmic law.' },
  { id: 'saturn', command: '699', name: 'Saturn', sanskritName: 'शनि (Shani)', category: 'gas-giant', colorHex: '#eab308', description: 'Ringed giant; lord of time (Kaala), perseverance, and karma.' },
  { id: 'uranus', command: '799', name: 'Uranus', sanskritName: 'अरुण (Aruna)', category: 'ice-giant', colorHex: '#38bdf8', description: 'Tilted ice giant; associated with dawn and revolutionary change.' },
  { id: 'neptune', command: '899', name: 'Neptune', sanskritName: 'वरुण (Varuna)', category: 'ice-giant', colorHex: '#3b82f6', description: 'Deep blue distant world; ruler of cosmic waters and celestial order (Rta).' },
  { id: 'pluto', command: '999', name: 'Pluto', sanskritName: 'यम (Yama)', category: 'terrestrial-planet', colorHex: '#cbd5e1', description: 'Dwarf planet at Kuiper Belt threshold; lord of the underworld and transformation.' },
  
  // High-Interest Asteroids & Near-Earth Objects
  { id: 'ceres', command: '1;', name: '1 Ceres', sanskritName: 'सेरेस (Dwarf Planet)', category: 'asteroid', colorHex: '#a3e635', description: 'Largest object in main asteroid belt; round dwarf planet with water ice.' },
  { id: 'vesta', command: '4;', name: '4 Vesta', sanskritName: 'वेस्ता (Main Belt Asteroid)', category: 'asteroid', colorHex: '#facc15', description: 'Second-largest asteroid, visually brightest from Earth.' },
  { id: 'apophis', command: '99942;', name: '99942 Apophis', sanskritName: 'अपोफिस (Near-Earth Asteroid)', category: 'asteroid', colorHex: '#f43f5e', description: 'Potentially hazardous asteroid with historic Earth flyby in 2029.' },
  { id: 'bennu', command: '101955;', name: '101955 Bennu', sanskritName: 'बेन्नू (OSIRIS-REx Target)', category: 'asteroid', colorHex: '#fb923c', description: 'Carbonaceous asteroid sampled by NASA OSIRIS-REx mission.' },
  { id: 'halley', command: '1P', name: '1P/Halley', sanskritName: 'हेली धूमकेतु (Periodic Comet)', category: 'comet', colorHex: '#67e8f9', description: 'Famous periodic comet with ~76-year orbital period.' }
];

const RASHIS = [
  { name: 'Mesha', en: 'Aries', sa: 'मेष' },
  { name: 'Vrishabha', en: 'Taurus', sa: 'वृषभ' },
  { name: 'Mithuna', en: 'Gemini', sa: 'मिथुन' },
  { name: 'Karka', en: 'Cancer', sa: 'कर्क' },
  { name: 'Simha', en: 'Leo', sa: 'सिंह' },
  { name: 'Kanya', en: 'Virgo', sa: 'कन्या' },
  { name: 'Tula', en: 'Libra', sa: 'तुला' },
  { name: 'Vrishchika', en: 'Scorpio', sa: 'वृश्चिक' },
  { name: 'Dhanu', en: 'Sagittarius', sa: 'धनु' },
  { name: 'Makara', en: 'Capricorn', sa: 'मकर' },
  { name: 'Kumbha', en: 'Aquarius', sa: 'कुम्भ' },
  { name: 'Meena', en: 'Pisces', sa: 'मीन' }
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

interface HorizonsCacheEntry {
  timestamp: number;
  data: any;
}

const ephemerisCache: Map<string, HorizonsCacheEntry> = new Map();
const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Convert ICRF Right Ascension (HH MM SS.ss) and Declination (sDD MN SC.s)
 * into Sidereal Ecliptic Longitude, Rashi, and Nakshatra with Pada
 */
function calculateVedicCoordinates(raStr: string, decStr: string) {
  try {
    const raParts = raStr.replace(/[hms]/g, ' ').trim().split(/\s+/).map(Number);
    const decParts = decStr.replace(/[°'"]/g, ' ').trim().split(/\s+/).map(Number);

    if (raParts.length < 3 || decParts.length < 3) return null;

    // RA in degrees (1 hour = 15 deg)
    const raDeg = (raParts[0] + raParts[1] / 60 + raParts[2] / 3600) * 15;
    // Dec in degrees
    const sign = decStr.trim().startsWith('-') ? -1 : 1;
    const decDeg = sign * (Math.abs(decParts[0]) + decParts[1] / 60 + decParts[2] / 3600);

    // Obliquity of Ecliptic J2000
    const epsRad = (23.43929 * Math.PI) / 180;
    const alphaRad = (raDeg * Math.PI) / 180;
    const deltaRad = (decDeg * Math.PI) / 180;

    // Ecliptic coordinates conversion
    const x = Math.cos(deltaRad) * Math.cos(alphaRad);
    const y = Math.sin(deltaRad) * Math.sin(epsRad) + Math.cos(deltaRad) * Math.cos(epsRad) * Math.sin(alphaRad);

    let lambdaTropical = (Math.atan2(y, x) * 180) / Math.PI;
    if (lambdaTropical < 0) lambdaTropical += 360;

    // Chitrapaksha Lahiri Ayanamsa for ~2026 epoch is ~24.23°
    const ayanamsa = 24.23;
    let lambdaSidereal = (lambdaTropical - ayanamsa + 360) % 360;

    // Rashi
    const rashiIdx = Math.floor(lambdaSidereal / 30) % 12;
    const degInRashi = lambdaSidereal % 30;
    const rashi = RASHIS[rashiIdx];

    // Nakshatra (360° / 27 = 13° 20' = 13.333333°)
    const nakshatraSpan = 360 / 27;
    const nakshatraIdx = Math.floor(lambdaSidereal / nakshatraSpan) % 27;
    const pada = Math.floor((lambdaSidereal % nakshatraSpan) / (nakshatraSpan / 4)) + 1;

    return {
      siderealLongitudeDeg: parseFloat(lambdaSidereal.toFixed(3)),
      tropicalLongitudeDeg: parseFloat(lambdaTropical.toFixed(3)),
      rashi: {
        name: `${rashi.name} (${rashi.en})`,
        sanskrit: rashi.sa,
        degreesInSign: parseFloat(degInRashi.toFixed(2))
      },
      nakshatra: {
        name: NAKSHATRAS[nakshatraIdx],
        pada: pada,
        index: nakshatraIdx + 1
      }
    };
  } catch {
    return null;
  }
}

/**
 * Extract physical characteristics from Horizons header block — discard everything else
 */
function parseCleanPhysicalData(rawText: string) {
  const physical: Record<string, string | number> = {};

  const matchRadius = rawText.match(/Vol\.\s*mean\s*radius\s*\(km\)\s*=\s*([0-9.+-]+)/i) ||
                      rawText.match(/Equatorial\s*radius\s*\(km\)\s*=\s*([0-9.+-]+)/i) ||
                      rawText.match(/Radius\s*\(km\)\s*=\s*([0-9.+-]+)/i);
  if (matchRadius) physical.radiusKm = parseFloat(matchRadius[1]);

  const matchDensity = rawText.match(/Density\s*\(g\/cm\^3\)\s*=\s*([0-9.+-]+)/i);
  if (matchDensity) physical.densityGPerCm3 = parseFloat(matchDensity[1]);

  const matchMass = rawText.match(/Mass(?:\s*x10\^(\d+))?\s*\(kg\)\s*=\s*([~0-9.+-]+)/i);
  if (matchMass) {
    const exponent = matchMass[1] || '';
    const baseValue = matchMass[2].trim();
    physical.massFormatted = exponent ? `${baseValue} × 10^${exponent} kg` : `${baseValue} kg`;
  }

  const matchRot = rawText.match(/Sidereal\s*rot\.\s*period\s*=\s*([0-9.+-]+)\s*([a-z]+)/i);
  if (matchRot) physical.rotationPeriod = `${matchRot[1]} ${matchRot[2]}`;

  const matchGravity = rawText.match(/Equ\.\s*gravity\s*m\/s\^2\s*=\s*([0-9.+-]+)/i) ||
                        rawText.match(/Surface\s*gravity\s*=\s*([0-9.+-]+)/i);
  if (matchGravity) physical.surfaceGravityMS2 = parseFloat(matchGravity[1]);

  const matchEscape = rawText.match(/Escape\s*speed,\s*km\/s\s*=\s*([0-9.+-]+)/i);
  if (matchEscape) physical.escapeSpeedKmS = parseFloat(matchEscape[1]);

  const matchOrbSpeed = rawText.match(/Orbital\s*speed,\s*km\/s\s*=\s*([0-9.+-]+)/i);
  if (matchOrbSpeed) physical.meanOrbitalSpeedKmS = parseFloat(matchOrbSpeed[1]);

  const matchTemp = rawText.match(/Mean\s*temperature\s*\(K\)\s*=\s*([0-9.+-]+)/i);
  if (matchTemp) {
    const kelvin = parseFloat(matchTemp[1]);
    physical.meanTemperatureK = kelvin;
    physical.meanTemperatureC = parseFloat((kelvin - 273.15).toFixed(1));
  }

  return Object.keys(physical).length > 0 ? physical : null;
}

/**
 * Extract ONLY the clean table data between $$SOE and $$EOE markers
 * Discards all telnet instructions, email footers, and disclaimer walls
 */
function parseCleanObserverData(rawText: string) {
  const soeIdx = rawText.indexOf('$$SOE');
  const eoeIdx = rawText.indexOf('$$EOE');

  if (soeIdx === -1 || eoeIdx === -1) return null;

  const ephemBlock = rawText.substring(soeIdx + 5, eoeIdx).trim();
  const firstLine = ephemBlock.split('\n')[0].trim();
  const tokens = firstLine.split(/\s+/);
  if (tokens.length < 9) return null;

  const dateStr = `${tokens[0]} ${tokens[1]}`;
  const ra = `${tokens[2]}h ${tokens[3]}m ${tokens[4]}s`;
  const dec = `${tokens[5]}° ${tokens[6]}' ${tokens[7]}"`;
  const apMag = parseFloat(tokens[8]) || null;
  const sBrt = parseFloat(tokens[9]) || null;
  const deltaAU = parseFloat(tokens[10]) || null;
  const deldotKmS = parseFloat(tokens[11]) || null;
  const sotAngle = parseFloat(tokens[12]) || null;
  const leadTrail = tokens[13] || '';
  const phaseAngle = parseFloat(tokens[14]) || null;
  const constellation = tokens[tokens.length - 1];

  const distanceKm = deltaAU ? Math.round(deltaAU * 149597870.7) : null;
  const lightTimeSeconds = deltaAU ? Math.round(deltaAU * 499.00478) : null;

  const vedic = calculateVedicCoordinates(ra, dec);

  return {
    epochUT: dateStr,
    coordinates: {
      rightAscension: ra,
      declination: dec,
      constellationIAU: constellation,
      vedicRashi: vedic?.rashi || null,
      vedicNakshatra: vedic?.nakshatra || null,
      siderealLongitudeDeg: vedic?.siderealLongitudeDeg || null
    },
    distance: {
      astronomicalUnits: deltaAU,
      kilometers: distanceKm,
      millionsKm: distanceKm ? parseFloat((distanceKm / 1e6).toFixed(3)) : null,
      lightTravelTimeSeconds: lightTimeSeconds,
      lightTravelTimeFormatted: lightTimeSeconds 
        ? `${Math.floor(lightTimeSeconds / 60)}m ${lightTimeSeconds % 60}s`
        : null
    },
    motion: {
      radialVelocityKmS: deldotKmS,
      direction: deldotKmS && deldotKmS < 0 ? 'Approaching Earth' : 'Receding from Earth'
    },
    visibility: {
      apparentVisualMagnitude: apMag,
      isNakedEyeVisible: apMag !== null ? apMag <= 6.0 : false,
      surfaceBrightness: sBrt,
      solarElongationDeg: sotAngle,
      solarSkyPosition: leadTrail === '/L' ? 'Morning Sky (Leads Sun)' : leadTrail === '/T' ? 'Evening Sky (Trails Sun)' : 'Daylight Sky',
      phaseAngleDeg: phaseAngle
    }
  };
}

/**
 * Extract ONLY the clean 3D Cartesian vector state between $$SOE and $$EOE
 */
function parseCleanVectorData(rawText: string) {
  const soeIdx = rawText.indexOf('$$SOE');
  const eoeIdx = rawText.indexOf('$$EOE');

  if (soeIdx === -1 || eoeIdx === -1) return null;

  const ephemBlock = rawText.substring(soeIdx + 5, eoeIdx).trim();
  const xMatch = ephemBlock.match(/X\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const yMatch = ephemBlock.match(/Y\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const zMatch = ephemBlock.match(/Z\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const vxMatch = ephemBlock.match(/VX\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const vyMatch = ephemBlock.match(/VY\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const vzMatch = ephemBlock.match(/VZ\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const ltMatch = ephemBlock.match(/LT\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const rgMatch = ephemBlock.match(/RG\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);
  const rrMatch = ephemBlock.match(/RR\s*=\s*([+-]?\d+\.?\d*E?[+-]?\d*)/i);

  const vx = vxMatch ? parseFloat(vxMatch[1]) : 0;
  const vy = vyMatch ? parseFloat(vyMatch[1]) : 0;
  const vz = vzMatch ? parseFloat(vzMatch[1]) : 0;
  const totalSpeed = Math.sqrt(vx * vx + vy * vy + vz * vz);

  return {
    referenceFrame: 'Ecliptic of J2000.0 (ICRF)',
    positionKm: {
      x: xMatch ? parseFloat(xMatch[1]) : 0,
      y: yMatch ? parseFloat(yMatch[1]) : 0,
      z: zMatch ? parseFloat(zMatch[1]) : 0
    },
    velocityKmS: {
      vx,
      vy,
      vz,
      totalOrbitalSpeedKmS: parseFloat(totalSpeed.toFixed(3))
    },
    rangeKm: rgMatch ? parseFloat(rgMatch[1]) : 0,
    rangeRateKmS: rrMatch ? parseFloat(rrMatch[1]) : 0,
    lightTimeSeconds: ltMatch ? parseFloat(ltMatch[1]) : 0
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const targetQuery = searchParams.get('target') || 'mars';
    const commandParam = searchParams.get('command');
    const ephemType = (searchParams.get('ephem_type') || 'OBSERVER').toUpperCase();
    const center = searchParams.get('center') || '500@399'; // Geocentric default

    let command = commandParam;
    let targetMeta = PRESET_TARGETS.find(t => t.id === targetQuery.toLowerCase());
    if (!command) {
      command = targetMeta ? targetMeta.command : targetQuery;
    }

    const todayStr = searchParams.get('start_time') || new Date().toISOString().substring(0, 10);
    const tomorrowStr = searchParams.get('stop_time') || new Date(Date.now() + 24 * 3600 * 1000).toISOString().substring(0, 10);

    const cacheKey = `${command}_${ephemType}_${center}_${todayStr}`;
    const now = Date.now();
    const cached = ephemerisCache.get(cacheKey);

    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        provider: 'NASA JPL Horizons Ephemeris System',
        data: cached.data
      });
    }

    const encodedCommand = encodeURIComponent(`'${command}'`);
    const encodedCenter = encodeURIComponent(`'${center}'`);
    const encodedStart = encodeURIComponent(`'${todayStr}'`);
    const encodedStop = encodeURIComponent(`'${tomorrowStr}'`);
    
    let horizonsUrl = `https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=${encodedCommand}&MAKE_EPHEM='YES'&CENTER=${encodedCenter}&START_TIME=${encodedStart}&STOP_TIME=${encodedStop}&STEP_SIZE='1d'`;

    if (ephemType === 'VECTORS') {
      horizonsUrl += `&EPHEM_TYPE='VECTORS'&OBJ_DATA='NO'&VEC_TABLE='3'&OUT_UNITS='KM-S'&REF_PLANE='ECLIPTIC'&REF_SYSTEM='ICRF'`;
    } else {
      const quantities = encodeURIComponent(`'1,9,20,23,24,29'`);
      horizonsUrl += `&EPHEM_TYPE='OBSERVER'&OBJ_DATA='YES'&QUANTITIES=${quantities}&REF_SYSTEM='ICRF'`;
    }

    const res = await fetch(horizonsUrl, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 14400 }
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `JPL Horizons returned HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();
    if (json.error) {
      return NextResponse.json({
        success: false,
        error: json.error,
        message: 'JPL Horizons rejected the query parameters.'
      }, { status: 400 });
    }

    const rawText: string = json.result || '';

    // Extract ONLY usable data — discard all text walls, emails, and telnet disclaimers
    const cleanObservation = ephemType === 'OBSERVER' ? parseCleanObserverData(rawText) : null;
    const cleanVectors = ephemType === 'VECTORS' ? parseCleanVectorData(rawText) : null;
    const cleanPhysics = parseCleanPhysicalData(rawText);

    const cleanPayload = {
      target: targetMeta || { 
        id: targetQuery, 
        command, 
        name: targetQuery, 
        sanskritName: '', 
        category: 'asteroid', 
        colorHex: '#38bdf8', 
        description: 'Custom astronomical target' 
      },
      ephemerisType: ephemType,
      coordinateOrigin: center === '500@399' ? 'Geocentric (Earth Center)' : center === '@0' ? 'Solar System Barycenter' : center,
      observation: cleanObservation,
      vectorState: cleanVectors,
      physicalProperties: cleanPhysics,
      apiSignature: {
        source: 'NASA/JPL Horizons Ephemeris System',
        version: json.signature?.version || '1.3'
      }
    };

    ephemerisCache.set(cacheKey, { timestamp: now, data: cleanPayload });

    return NextResponse.json({
      success: true,
      source: 'live',
      provider: 'NASA JPL Horizons Ephemeris System',
      data: cleanPayload
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to query NASA JPL Horizons'
    }, { status: 500 });
  }
}
