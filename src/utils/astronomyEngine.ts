/**
 * Chronoakasha Records — Astronomical & Ephemeris Calculation Engine
 * 
 * Powered by astronomy-engine (NASA JPL DE405 / VSOP87 precision ephemeris)
 * Provides high-precision planetary coordinates, Earth/Moon motion,
 * Chitrapaksha (Lahiri) Ayanamsa for sidereal zodiac mapping,
 * and geocentric coordinates for all classical Navagrahas.
 */

import * as Astronomy from 'astronomy-engine';

export interface PlanetEphemeris {
  id: string;
  name: string;
  sanskritName: string;
  grahaKey: 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn' | 'rahu' | 'ketu' | 'uranus' | 'neptune';
  tropicalLongitude: number; // degrees 0-360
  siderealLongitude: number; // degrees 0-360 (Lahiri Ayanamsa)
  rashiIndex: number;        // 0 = Mesha (Aries) .. 11 = Meena (Pisces)
  rashiName: string;
  rashiSanskrit: string;
  rashiDegrees: number;      // 0-30 deg within sign
  nakshatraIndex: number;    // 0 = Ashwini .. 26 = Revati
  nakshatraName: string;
  nakshatraPada: number;     // 1-4
  isRetrograde: boolean;
  distanceAU: number;        // distance from Earth in AU
  speedDegPerDay: number;
  houseNorthIndian?: number; // 1-12
  color: string;
}

export const RASHIS = [
  { index: 0, name: 'Aries', sanskrit: 'मेष (Meṣa)', lord: 'Mars', element: 'Fire' },
  { index: 1, name: 'Taurus', sanskrit: 'वृषभ (Vṛṣabha)', lord: 'Venus', element: 'Earth' },
  { index: 2, name: 'Gemini', sanskrit: 'मिथुन (Mithuna)', lord: 'Mercury', element: 'Air' },
  { index: 3, name: 'Cancer', sanskrit: 'कर्क (Karka)', lord: 'Moon', element: 'Water' },
  { index: 4, name: 'Leo', sanskrit: 'सिंह (Siṁha)', lord: 'Sun', element: 'Fire' },
  { index: 5, name: 'Virgo', sanskrit: 'कन्या (Kanyā)', lord: 'Mercury', element: 'Earth' },
  { index: 6, name: 'Libra', sanskrit: 'तुला (Tulā)', lord: 'Venus', element: 'Air' },
  { index: 7, name: 'Scorpio', sanskrit: 'वृश्चिक (Vṛścika)', lord: 'Mars', element: 'Water' },
  { index: 8, name: 'Sagittarius', sanskrit: 'धनु (Dhanu)', lord: 'Jupiter', element: 'Fire' },
  { index: 9, name: 'Capricorn', sanskrit: 'मकर (Makara)', lord: 'Saturn', element: 'Earth' },
  { index: 10, name: 'Aquarius', sanskrit: 'कुम्भ (Kumbha)', lord: 'Saturn', element: 'Air' },
  { index: 11, name: 'Pisces', sanskrit: 'मीन (Mīna)', lord: 'Jupiter', element: 'Water' },
];

export const NAKSHATRAS_LIST = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

/**
 * Calculates Julian Day from UTC Date
 */
export function getJulianDay(date: Date): number {
  const time = new Astronomy.AstroTime(date);
  return time.ut + 2451545.0;
}

/**
 * Calculates Chitrapaksha (Lahiri) Ayanamsa for a given date
 * Standard Indian Astronomical Ephemeris value:
 * Base epoch 2000.0 is 23° 51' 25.53" = 23.857092°
 * Precession rate: 50.290966 arcseconds per year
 */
export function getLahiriAyanamsa(date: Date): number {
  const time = new Astronomy.AstroTime(date);
  const t = time.ut / 36525.0; // Julian centuries from J2000.0
  return 23.857092 + (50.290966 * t * 100) / 3600;
}

export function normalize360(deg: number): number {
  let val = deg % 360;
  if (val < 0) val += 360;
  return val;
}

/**
 * Compute Sun's Tropical Longitude using astronomy-engine
 */
export function getSunTropicalLongitude(date: Date): { longitude: number; distanceAU: number } {
  const time = new Astronomy.AstroTime(date);
  const geo = Astronomy.GeoVector(Astronomy.Body.Sun, time, true);
  const ecl = Astronomy.Ecliptic(geo);
  return { longitude: normalize360(ecl.elon), distanceAU: geo.Length() };
}

/**
 * Compute Moon's Tropical Longitude using astronomy-engine
 */
export function getMoonTropicalLongitude(date: Date): { longitude: number; distanceAU: number } {
  const time = new Astronomy.AstroTime(date);
  const geo = Astronomy.GeoVector(Astronomy.Body.Moon, time, true);
  const ecl = Astronomy.Ecliptic(geo);
  return { longitude: normalize360(ecl.elon), distanceAU: geo.Length() };
}

/**
 * Calculates complete Navagraha + modern planets with NASA JPL DE405 / VSOP87 precision
 */
export function calculateAllPlanets(date: Date): PlanetEphemeris[] {
  const time = new Astronomy.AstroTime(date);
  const t = time.ut / 36525.0; // Julian centuries from J2000.0
  const ayanamsa = 23.857092 + (50.290966 * t * 100) / 3600;

  const bodiesConfig: Array<{
    id: string;
    name: string;
    sanskritName: string;
    grahaKey: PlanetEphemeris['grahaKey'];
    body: Astronomy.Body | null;
    color: string;
  }> = [
    { id: 'sun', name: 'Sun', sanskritName: 'सूर्य (Sūrya)', grahaKey: 'sun', body: Astronomy.Body.Sun, color: '#f59e0b' },
    { id: 'moon', name: 'Moon', sanskritName: 'चन्द्र (Candra)', grahaKey: 'moon', body: Astronomy.Body.Moon, color: '#f8fafc' },
    { id: 'mars', name: 'Mars', sanskritName: 'मङ्गल (Maṅgala)', grahaKey: 'mars', body: Astronomy.Body.Mars, color: '#ef4444' },
    { id: 'mercury', name: 'Mercury', sanskritName: 'बुध (Budha)', grahaKey: 'mercury', body: Astronomy.Body.Mercury, color: '#10b981' },
    { id: 'jupiter', name: 'Jupiter', sanskritName: 'गुरु (Guru)', grahaKey: 'jupiter', body: Astronomy.Body.Jupiter, color: '#eab308' },
    { id: 'venus', name: 'Venus', sanskritName: 'शुक्र (Śukra)', grahaKey: 'venus', body: Astronomy.Body.Venus, color: '#fbcfe8' },
    { id: 'saturn', name: 'Saturn', sanskritName: 'शनि (Śani)', grahaKey: 'saturn', body: Astronomy.Body.Saturn, color: '#38bdf8' },
    { id: 'rahu', name: 'Rahu', sanskritName: 'राहु (Rāhu)', grahaKey: 'rahu', body: null, color: '#818cf8' },
    { id: 'ketu', name: 'Ketu', sanskritName: 'केतु (Ketu)', grahaKey: 'ketu', body: null, color: '#a855f7' },
    { id: 'uranus', name: 'Uranus', sanskritName: 'अरुण (Uranus)', grahaKey: 'uranus', body: Astronomy.Body.Uranus, color: '#22d3ee' },
    { id: 'neptune', name: 'Neptune', sanskritName: 'वरुण (Neptune)', grahaKey: 'neptune', body: Astronomy.Body.Neptune, color: '#6366f1' },
  ];

  // Calculate Lunar Node (Rahu/Ketu)
  // Mean ascending node Omega
  const rahuTrop = normalize360(125.044522 - 1934.1362608 * t + 0.0020708 * t * t);
  const ketuTrop = normalize360(rahuTrop + 180);

  const results: PlanetEphemeris[] = [];

  for (const cfg of bodiesConfig) {
    let tropLon = 0;
    let distAU = 1.0;
    let isRetro = false;
    let speed = 1.0;

    if (cfg.body !== null) {
      const geo = Astronomy.GeoVector(cfg.body, time, true);
      const ecl = Astronomy.Ecliptic(geo);
      tropLon = normalize360(ecl.elon);
      distAU = geo.Length();

      // Compute speed & retrograde motion by evaluating at +0.1 day
      const timeNext = time.AddDays(0.1);
      const geoNext = Astronomy.GeoVector(cfg.body, timeNext, true);
      const eclNext = Astronomy.Ecliptic(geoNext);
      let delta = eclNext.elon - ecl.elon;
      if (delta < -180) delta += 360;
      if (delta > 180) delta -= 360;
      speed = delta / 0.1;
      isRetro = speed < 0;
    } else if (cfg.id === 'rahu') {
      tropLon = rahuTrop;
      isRetro = true; // Lunar nodes are naturally retrograde
      speed = -0.05295;
    } else if (cfg.id === 'ketu') {
      tropLon = ketuTrop;
      isRetro = true;
      speed = -0.05295;
    }

    const sidereal = normalize360(tropLon - ayanamsa);
    const rashiIdx = Math.floor(sidereal / 30);
    const rashiDeg = sidereal % 30;

    // Nakshatra: 360 / 27 = 13.333333 degrees each
    const nakIdx = Math.floor(sidereal / (360 / 27)) % 27;
    const nakDeg = sidereal % (360 / 27);
    const pada = Math.min(4, Math.floor(nakDeg / (360 / 108)) + 1);

    results.push({
      id: cfg.id,
      name: cfg.name,
      sanskritName: cfg.sanskritName,
      grahaKey: cfg.grahaKey,
      tropicalLongitude: +tropLon.toFixed(4),
      siderealLongitude: +sidereal.toFixed(4),
      rashiIndex: rashiIdx,
      rashiName: RASHIS[rashiIdx].name,
      rashiSanskrit: RASHIS[rashiIdx].sanskrit,
      rashiDegrees: +rashiDeg.toFixed(4),
      nakshatraIndex: nakIdx,
      nakshatraName: NAKSHATRAS_LIST[nakIdx],
      nakshatraPada: pada,
      isRetrograde: isRetro,
      distanceAU: +distAU.toFixed(4),
      speedDegPerDay: +speed.toFixed(4),
      color: cfg.color
    });
  }

  return results;
}
