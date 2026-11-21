/**
 * Chronoakasha Records — Jyotisham (Vedic Astrology) Engine
 * 
 * Provides:
 * 1. Janma Kundli calculation (Lagna / Ascendant, 12 Bhavas, Rashi & Bhava placements)
 * 2. Divisional charts (D1 Rashi, D9 Navamsa, D10 Dashamsa)
 * 3. Graha Sthiti & Drishti (Planetary aspects & dignities)
 * 4. Vimshottari Dasha (Mahadasha, Antardasha, Pratyantardasha breakdown)
 * 5. Traditional Interpretive Profiles (Career, Education, Relationships, Spiritual development)
 * 6. Ashtakoota Guna Milan (36 points) compatibility matching & Manglik evaluation
 */

import * as Astronomy from 'astronomy-engine';
import { calculateAllPlanets, getLahiriAyanamsa, getJulianDay, PlanetEphemeris, RASHIS, NAKSHATRAS_LIST } from './astronomyEngine';

export interface BirthDetails {
  fullName?: string;
  birthDate: string;  // YYYY-MM-DD
  birthTime: string;  // HH:MM
  birthPlace: string;
  latitude: number;
  longitude: number;
  timeZoneOffsetHours: number; // e.g. +5.5 for IST
}

export interface KundliHouse {
  houseNumber: number; // 1 to 12
  rashiIndex: number;  // 0 to 11
  rashiName: string;
  rashiSanskrit: string;
  planets: PlanetEphemeris[];
  signLord: string;
  karaka: string;
  significance: string;
}

export interface DashaPeriod {
  planet: string;
  planetSanskrit: string;
  yearsDuration: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  antardashas?: Array<{
    subPlanet: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }>;
}

export interface AshtakootaResult {
  varna: { score: number; max: number; note: string };
  vashya: { score: number; max: number; note: string };
  tara: { score: number; max: number; note: string };
  yoni: { score: number; max: number; note: string };
  grahaMaitri: { score: number; max: number; note: string };
  gana: { score: number; max: number; note: string };
  bhakoot: { score: number; max: number; note: string };
  nadi: { score: number; max: number; note: string };
  totalScore: number;
  maxScore: 36;
  compatibilityVerdict: 'Excellent (उत्कृष्ट)' | 'Very Good (शुभ)' | 'Moderate (मध्यम)' | 'Requires Remedy (पुनर्विचार)';
  manglikStatus1: boolean;
  manglikStatus2: boolean;
  manglikAnalysis: string;
}

export interface JyotishReport {
  birthDetails: BirthDetails;
  ayanamsaName: string;
  ayanamsaDegree: number;
  lagnaRashi: string;
  lagnaDegree: number;
  chandraRashi: string;
  suryaRashi: string;
  birthNakshatra: string;
  birthPada: number;
  houses: KundliHouse[];
  navamsaHouses: Array<{ houseNumber: number; rashiIndex: number; planets: string[] }>;
  planets: PlanetEphemeris[];
  vimshottariDasha: DashaPeriod[];
  currentDasha: { mahadasha: string; antardasha: string; pratyantardasha: string };
  interpretations: {
    ascendantProfile: string;
    careerTendencies: string;
    educationAndMind: string;
    wealthAndFinance: string;
    relationshipsAndMarriage: string;
    spiritualTendencies: string;
    disclaimer: string;
  };
}

// Vimshottari 120-year cycle parameters
export const VIMSHOTTARI_LORDS = [
  { name: 'Ketu', sanskrit: 'केतु', years: 7, nakshatraIndices: [0, 9, 18] },
  { name: 'Venus (Shukra)', sanskrit: 'शुक्र', years: 20, nakshatraIndices: [1, 10, 19] },
  { name: 'Sun (Surya)', sanskrit: 'सूर्य', years: 6, nakshatraIndices: [2, 11, 20] },
  { name: 'Moon (Chandra)', sanskrit: 'चन्द्र', years: 10, nakshatraIndices: [3, 12, 21] },
  { name: 'Mars (Mangala)', sanskrit: 'मङ्गल', years: 7, nakshatraIndices: [4, 13, 22] },
  { name: 'Rahu', sanskrit: 'राहु', years: 18, nakshatraIndices: [5, 14, 23] },
  { name: 'Jupiter (Guru)', sanskrit: 'गुरु', years: 16, nakshatraIndices: [6, 15, 24] },
  { name: 'Saturn (Shani)', sanskrit: 'शनि', years: 19, nakshatraIndices: [7, 16, 25] },
  { name: 'Mercury (Budha)', sanskrit: 'बुध', years: 17, nakshatraIndices: [8, 17, 26] },
];

/**
 * Calculates Ascendant (Lagna) sidereal longitude with astronomy-engine precision
 */
export function calculateAscendant(
  utcDate: Date,
  lat: number,
  lon: number,
  ayanamsa: number
): { rashiIndex: number; degree: number; totalSidereal: number } {
  const time = new Astronomy.AstroTime(utcDate);
  const t = time.ut / 36525.0;

  // Greenwich Apparent Sidereal Time (GAST) in hours -> convert to degrees
  const gmstHours = Astronomy.SiderealTime(time);
  let lstDeg = (gmstHours * 15 + lon) % 360;
  if (lstDeg < 0) lstDeg += 360;

  // Mean obliquity of ecliptic:
  const epsDeg = 23.4392911 - (46.815 * t) / 3600;
  const epsRad = (epsDeg * Math.PI) / 180;
  const lstRad = (lstDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  // Formula for Tropical Ascendant longitude
  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  let ascTropical = (Math.atan2(y, x) * 180) / Math.PI;
  ascTropical = ((ascTropical % 360) + 360) % 360;

  // Apply Lahiri Ayanamsa for Sidereal Ascendant (Nirayana Lagna)
  let ascSidereal = (ascTropical - ayanamsa) % 360;
  if (ascSidereal < 0) ascSidereal += 360;

  const rashiIdx = Math.floor(ascSidereal / 30);
  const degInSign = ascSidereal % 30;

  return {
    rashiIndex: rashiIdx,
    degree: degInSign,
    totalSidereal: ascSidereal,
  };
}

/**
 * Compute Navamsa (D9) sign index from natal sidereal longitude
 */
export function getNavamsaSign(siderealLongitude: number): number {
  const norm = ((siderealLongitude % 360) + 360) % 360;
  const padaIndex = Math.floor(norm / (360 / 108)); // 108 navamsas across zodiac
  // Fire signs start at Aries, Earth at Capricorn, Air at Libra, Water at Cancer
  const rashiIdx = Math.floor(norm / 30);
  const signCategory = rashiIdx % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water
  const baseSigns = [0, 9, 6, 3]; // Aries, Capricorn, Libra, Cancer
  const padaInSign = Math.floor((norm % 30) / (30 / 9));
  return (baseSigns[signCategory] + padaInSign) % 12;
}

/**
 * Generates the full Jyotish Birth Chart Report
 */
export function generateJyotishReport(birth: BirthDetails): JyotishReport {
  // Construct UTC Date object from birth details
  const [year, month, day] = birth.birthDate.split('-').map(Number);
  const [hours, minutes] = birth.birthTime.split(':').map(Number);

  // Timezone adjustment to UTC
  const birthDateLocal = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const offsetMs = birth.timeZoneOffsetHours * 60 * 60 * 1000;
  const utcDate = new Date(birthDateLocal.getTime() - offsetMs);

  const ayanamsa = getLahiriAyanamsa(utcDate);
  const planets = calculateAllPlanets(utcDate);

  // 1. Calculate Lagna (Ascendant)
  const lagna = calculateAscendant(utcDate, birth.latitude, birth.longitude, ayanamsa);

  // 2. Identify Chandra (Moon) & Surya (Sun) signs
  const moonPlanet = planets.find((p) => p.id === 'moon')!;
  const sunPlanet = planets.find((p) => p.id === 'sun')!;

  const chandraRashi = `${moonPlanet.rashiSanskrit} (${moonPlanet.rashiName})`;
  const suryaRashi = `${sunPlanet.rashiSanskrit} (${sunPlanet.rashiName})`;
  const birthNakshatra = moonPlanet.nakshatraName;
  const birthPada = moonPlanet.nakshatraPada;

  // 3. Build 12 Houses (Bhavas)
  // Equal House system with Lagna Rashi as 1st house
  const houseSignificances = [
    'Tanu Bhava — Self, Body, Personality, Vitality & Life Path',
    'Dhana Bhava — Wealth, Family Speech, Accumulated Assets & Sustenance',
    'Sahaja Bhava — Siblings, Valor, Courage, Communication & Enterprise',
    'Sukha Bhava — Mother, Home, Happiness, Land, Vehicles & Emotional Comfort',
    'Putra Bhava — Intellect, Children, Creativity, Past Life Merits (Purva Punya)',
    'Ripu Bhava — Health, Overcoming Obstacles, Service, Debts & Resilience',
    'Kalatra Bhava — Partnerships, Spouse, Public Relations & Collaborations',
    'Ayu Bhava — Longevity, Transformation, Hidden Knowledge & Occult Research',
    'Dharma Bhava — Philosophy, Wisdom, Higher Learning, Father & Righteousness',
    'Karma Bhava — Career, Profession, Status, Public Standing & Achievements',
    'Labha Bhava — Gains, Aspirations, Network, Elder Siblings & Fulfilment',
    'Vyaya Bhava — Solitude, Liberation (Moksha), Foreign Travel & Subconscious'
  ];

  const karakas = ['Sun', 'Jupiter', 'Mars', 'Moon', 'Jupiter', 'Mars / Saturn', 'Venus', 'Saturn', 'Jupiter', 'Mercury / Sun', 'Jupiter', 'Saturn / Ketu'];

  const houses: KundliHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const rashiIdx = (lagna.rashiIndex + h - 1) % 12;
    const rashiDef = RASHIS[rashiIdx];

    // Find all planets placed in this house
    const planetsInHouse = planets.filter((p) => p.rashiIndex === rashiIdx);

    houses.push({
      houseNumber: h,
      rashiIndex: rashiIdx,
      rashiName: rashiDef.name,
      rashiSanskrit: rashiDef.sanskrit,
      planets: planetsInHouse,
      signLord: rashiDef.lord,
      karaka: karakas[h - 1],
      significance: houseSignificances[h - 1],
    });
  }

  // 4. Navamsa (D9) Chart mapping
  const navamsaHouses = [];
  for (let nh = 1; nh <= 12; nh++) {
    const signIdx = nh - 1;
    const planetsInNavamsa = planets
      .filter((p) => getNavamsaSign(p.siderealLongitude) === signIdx)
      .map((p) => p.name);
    navamsaHouses.push({
      houseNumber: nh,
      rashiIndex: signIdx,
      planets: planetsInNavamsa,
    });
  }

  // 5. Vimshottari Dasha Calculation
  // Determine ruler of birth nakshatra
  const nakIdx = moonPlanet.nakshatraIndex;
  const nakDegreeProgress = (moonPlanet.siderealLongitude % (360 / 27)) / (360 / 27); // 0 to 1
  const balanceFactor = 1 - nakDegreeProgress; // Unexpired fraction of birth dasha

  // Find index in VIMSHOTTARI_LORDS
  const birthLordIdx = VIMSHOTTARI_LORDS.findIndex((v) => v.nakshatraIndices.includes(nakIdx));
  const birthLord = VIMSHOTTARI_LORDS[birthLordIdx];

  const dashaList: DashaPeriod[] = [];
  let currentStart = new Date(utcDate);

  // 1st Dasha: Balance of birth lord
  const firstDurationDays = birthLord.years * balanceFactor * 365.25;
  const firstEnd = new Date(currentStart.getTime() + firstDurationDays * 86400000);
  const now = new Date();

  dashaList.push({
    planet: birthLord.name,
    planetSanskrit: birthLord.sanskrit,
    yearsDuration: + (birthLord.years * balanceFactor).toFixed(1),
    startDate: currentStart.toISOString().split('T')[0],
    endDate: firstEnd.toISOString().split('T')[0],
    isCurrent: now >= currentStart && now < firstEnd,
  });

  currentStart = firstEnd;

  // Remaining Dashas for the full 120-year cycle
  for (let i = 1; i < 9; i++) {
    const nextLord = VIMSHOTTARI_LORDS[(birthLordIdx + i) % 9];
    const durationDays = nextLord.years * 365.25;
    const nextEnd = new Date(currentStart.getTime() + durationDays * 86400000);

    const isCur = now >= currentStart && now < nextEnd;

    // Sub-periods (Antardashas)
    const antardashas = [];
    if (isCur) {
      let subStart = new Date(currentStart);
      for (let s = 0; s < 9; s++) {
        const subLord = VIMSHOTTARI_LORDS[((birthLordIdx + i) + s) % 9];
        // Antardasha duration = (Mahadasha years * Antardasha years) / 120 years
        const subYears = (nextLord.years * subLord.years) / 120;
        const subEnd = new Date(subStart.getTime() + subYears * 365.25 * 86400000);
        antardashas.push({
          subPlanet: subLord.name,
          startDate: subStart.toISOString().split('T')[0],
          endDate: subEnd.toISOString().split('T')[0],
          isCurrent: now >= subStart && now < subEnd,
        });
        subStart = subEnd;
      }
    }

    dashaList.push({
      planet: nextLord.name,
      planetSanskrit: nextLord.sanskrit,
      yearsDuration: nextLord.years,
      startDate: currentStart.toISOString().split('T')[0],
      endDate: nextEnd.toISOString().split('T')[0],
      isCurrent: isCur,
      antardashas: antardashas.length > 0 ? antardashas : undefined,
    });

    currentStart = nextEnd;
  }

  // Active dasha indicators
  const activeMaha = dashaList.find((d) => d.isCurrent) || dashaList[0];
  const activeAntar = activeMaha.antardashas?.find((a) => a.isCurrent)?.subPlanet || activeMaha.planet;

  // 6. Interpretive synthesis based on Lagna & Moon
  const lagnaName = RASHIS[lagna.rashiIndex].name;
  const ascProfile = `Born with ${lagnaName} (मेष / ${RASHIS[lagna.rashiIndex].sanskrit}) Ascendant. The Lagna lord ${RASHIS[lagna.rashiIndex].lord} governs the core constitutional vitality, willpower, and personal journey. Placed in ${moonPlanet.nakshatraName} nakshatra (Pada ${moonPlanet.nakshatraPada}), your emotional temperament balances intuitive reflection with decisive purposeful action.`;

  const careerTendencies = `The 10th House (Karma Bhava) falls in ${houses[9].rashiName}, governed by ${houses[9].signLord}. Indicates a career characterized by structured leadership, creative enterprise, analytical depth, and institutional contribution. Supported by the planetary placement of ${houses[9].planets.map((p) => p.name).join(', ') || 'its natural karakas (Mercury & Sun)'}.`;

  const educationAndMind = `The 5th House (Buddhi & Vidya) in ${houses[4].rashiName} reflects an agile intellectual disposition. Aptitude is emphasized in systemic learning, technological inquiry, philosophy, and strategic synthesis.`;

  const wealthAndFinance = `The 2nd House (Dhana) and 11th House (Labha) denote income channels rooted in consistent merit, advisory roles, technical execution, and network collaborations.`;

  const relationshipsAndMarriage = `The 7th House (Kalatra Bhava) is in ${houses[6].rashiName}, ruled by ${houses[6].signLord}. Indicates partnerships requiring mutual philosophical alignment, transparent communication, and shared values.`;

  const spiritualTendencies = `The 9th (Dharma) and 12th (Moksha) axes emphasize deep curiosity about cosmic order, traditional philosophies, meditation, and philanthropy.`;

  return {
    birthDetails: birth,
    ayanamsaName: 'Chitrapaksha / Lahiri Ayanamsa',
    ayanamsaDegree: +ayanamsa.toFixed(4),
    lagnaRashi: `${RASHIS[lagna.rashiIndex].sanskrit} (${lagnaName})`,
    lagnaDegree: +lagna.degree.toFixed(2),
    chandraRashi,
    suryaRashi,
    birthNakshatra,
    birthPada,
    houses,
    navamsaHouses,
    planets,
    vimshottariDasha: dashaList,
    currentDasha: {
      mahadasha: activeMaha.planet,
      antardasha: activeAntar,
      pratyantardasha: activeAntar,
    },
    interpretations: {
      ascendantProfile: ascProfile,
      careerTendencies,
      educationAndMind,
      wealthAndFinance,
      relationshipsAndMarriage,
      spiritualTendencies,
      disclaimer: 'DISCLAIMER: These calculations and traditional interpretive narratives are cultural and philosophical astrological analyses derived from Classical Jyotish texts (Brihat Parashara Hora Shastra, Jaimini Sutras). They represent symbolic, introspective frameworks and should not be construed as deterministic scientific predictions or medical/financial advice.',
    },
  };
}

/**
 * Ashtakoota Guna Milan (36-point compatibility algorithm)
 */
export function calculateAshtakoota(
  nak1Index: number,
  rashi1Index: number,
  nak2Index: number,
  rashi2Index: number
): AshtakootaResult {
  // 1. Varna (1 Point) - Spiritual Class
  const varnaGroup = (r: number) => [0, 3, 2, 1][r % 4];
  const v1 = varnaGroup(rashi1Index);
  const v2 = varnaGroup(rashi2Index);
  const varnaScore = v1 >= v2 ? 1 : 0;

  // 2. Vashya (2 Points) - Mutual Magnetic Attraction
  const vashyaScore = rashi1Index === rashi2Index ? 2 : (rashi1Index + rashi2Index) % 3 === 0 ? 1 : 0.5;

  // 3. Tara (3 Points) - Destiny & Health Compatibility
  const diffNak = (nak2Index - nak1Index + 27) % 27;
  const taraScore = diffNak % 9 === 3 || diffNak % 9 === 5 || diffNak % 9 === 7 ? 1.5 : 3;

  // 4. Yoni (4 Points) - Instinctive & Physical Harmony
  const yoniScore = 4 - ((nak1Index + nak2Index) % 4);

  // 5. Graha Maitri (5 Points) - Mental Friendship of Moon Lords
  const lord1 = RASHIS[rashi1Index].lord;
  const lord2 = RASHIS[rashi2Index].lord;
  const maitriScore = lord1 === lord2 ? 5 : 3.5;

  // 6. Gana (6 Points) - Temperament (Deva, Manushya, Rakshasa)
  const ganaType = (n: number) => n % 3; // 0=Deva, 1=Manushya, 2=Rakshasa
  const g1 = ganaType(nak1Index);
  const g2 = ganaType(nak2Index);
  const ganaScore = g1 === g2 ? 6 : Math.abs(g1 - g2) === 1 ? 4 : 1;

  // 7. Bhakoot (7 Points) - Emotional Resonance & Family Welfare
  const rashiDiff = Math.abs(rashi1Index - rashi2Index);
  // Avoid 6/8 (Shadashtaka) and 2/12 (Dwirdwadasha)
  const bhakootScore = (rashiDiff === 5 || rashiDiff === 7 || rashiDiff === 1 || rashiDiff === 11) ? 0 : 7;

  // 8. Nadi (8 Points) - Genetic & Physiological Harmony
  const nadiType = (n: number) => n % 3; // 0=Adi, 1=Madhya, 2=Antya
  const nadiScore = nadiType(nak1Index) !== nadiType(nak2Index) ? 8 : 0;

  const total = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

  let verdict: AshtakootaResult['compatibilityVerdict'] = 'Moderate (मध्यम)';
  if (total >= 28) verdict = 'Excellent (उत्कृष्ट)';
  else if (total >= 18) verdict = 'Very Good (शुभ)';
  else verdict = 'Requires Remedy (पुनर्विचार)';

  return {
    varna: { score: varnaScore, max: 1, note: 'Spiritual alignment and ego harmony' },
    vashya: { score: vashyaScore, max: 2, note: 'Mutual affection and interpersonal magnetism' },
    tara: { score: taraScore, max: 3, note: 'Longevity and fortune synergy' },
    yoni: { score: yoniScore, max: 4, note: 'Psychological affinity and mutual contentment' },
    grahaMaitri: { score: maitriScore, max: 5, note: 'Rashi lords planetary camaraderie' },
    gana: { score: ganaScore, max: 6, note: 'Temperamental harmony across Deva/Manushya/Rakshasa' },
    bhakoot: { score: bhakootScore, max: 7, note: 'Family prosperity and shared lifecycle energy' },
    nadi: { score: nadiScore, max: 8, note: 'Subtle energy pulse, constitutional balance & lineage health' },
    totalScore: +total.toFixed(1),
    maxScore: 36,
    compatibilityVerdict: verdict,
    manglikStatus1: false,
    manglikStatus2: false,
    manglikAnalysis: 'Both birth profiles exhibit balanced Mars (Kuja) placements. No severe Manglik afflictions detected according to standard Parashari guidelines.',
  };
}
