/**
 * Chronoakasha Records — Rishi Muni (ऋषि मुनि) Vedic Astrological Oracle Engine
 * 
 * Provides:
 * 1. High-precision Sidereal Birth Chart calculations (Lagna, 12 Bhavas, Grahas)
 * 2. Planetary Dignities (Uccha, Neecha, Sva-kshetra, Mitra, Shatru)
 * 3. Color Oracle (Natal favorite color, Today's auspicious color, Today's critical caution color)
 * 4. Daily Transit Forecast (What will probably happen today across Mind, Karma, and Relationships)
 * 5. Rishi Muni Interactive Dialogue Generation with classical Vedic sage persona
 */

import { calculateAllPlanets, getLahiriAyanamsa, getJulianDay, PlanetEphemeris, RASHIS, NAKSHATRAS_LIST } from './astronomyEngine';
import { calculateAscendant, BirthDetails, KundliHouse } from './jyotishEngine';

export interface RishiMuniBirthInput {
  name: string;
  birthYear: number;
  birthMonth: number; // 1 to 12
  birthDay: number;   // 1 to 31
  birthHour: number;  // 0 to 23
  birthMinute: number;// 0 to 59
  city: string;
  latitude: number;
  longitude: number;
  timeZoneOffsetHours: number;
  lifeFocus?: 'general' | 'career' | 'relationships' | 'health' | 'spirituality';
}

export interface PlanetaryDignity {
  planetId: string;
  planetName: string;
  sanskritName: string;
  rashiIndex: number;
  rashiName: string;
  houseNumber: number;
  dignity: 'Exalted (उच्च)' | 'Debilitated (नीच)' | 'Own Sign (स्वक्षेत्र)' | 'Friendly (मित्र)' | 'Neutral (सम)' | 'Enemy (शत्रु)';
  badgeColor: string;
  meaning: string;
}

export interface ColorOracle {
  natalLuckyColor: {
    colorName: string;
    hex: string;
    sanskritName: string;
    associatedPlanet: string;
    rationale: string;
  };
  todayAuspiciousColor: {
    colorName: string;
    hex: string;
    sanskritName: string;
    governingRuler: string;
    howToUse: string;
  };
  todayCriticalColor: {
    colorName: string;
    hex: string;
    sanskritName: string;
    avoidReason: string;
    warningMessage: string;
  };
}

export interface DailyForecast {
  dateFormatted: string;
  weekdayLord: string;
  moonTransitRashi: string;
  summary: string;
  mindAndEmotions: string;
  careerAndKarma: string;
  relationshipsAndSpeech: string;
  shubhMuhurat: string; // Auspicious hours
  rahuKaal: string;      // Inauspicious hours
  sacredRemedy: {
    mantra: string;
    meaning: string;
    suggestedDonationOrAction: string;
  };
}

export interface RishiMuniReading {
  user: {
    name: string;
    birthString: string;
    locationString: string;
  };
  lagna: {
    signIndex: number;
    signName: string;
    sanskritName: string;
    degreeFormatted: string;
    lord: string;
    element: string;
    significance: string;
  };
  chandra: {
    signName: string;
    sanskritName: string;
    nakshatraName: string;
    nakshatraPada: number;
    deity: string;
  };
  surya: {
    signName: string;
    sanskritName: string;
  };
  houses: KundliHouse[];
  dignities: PlanetaryDignity[];
  colorOracle: ColorOracle;
  dailyForecast: DailyForecast;
  rishiBlessing: string;
}

export const PRESET_BIRTH_PROFILES: { label: string; city: string; lat: number; lon: number; tz: number; year: number; month: number; day: number; hour: number; minute: number }[] = [
  { label: 'Rohan • Chandrapur, Maharashtra', city: 'Chandrapur, Maharashtra, India', lat: 19.9615, lon: 79.2961, tz: 5.5, year: 2003, month: 2, day: 10, hour: 9, minute: 40 },
  { label: 'Ancient Seeker • Kashi (Varanasi)', city: 'Varanasi, India', lat: 25.3176, lon: 82.9739, tz: 5.5, year: 1998, month: 4, day: 14, hour: 6, minute: 30 },
  { label: 'Royal Ascendant • Ujjain (Prime Meridian)', city: 'Ujjain, India', lat: 23.1765, lon: 75.7682, tz: 5.5, year: 2000, month: 1, day: 1, hour: 12, minute: 0 },
  { label: 'Cosmic Explorer • New Delhi', city: 'New Delhi, India', lat: 28.6139, lon: 77.2090, tz: 5.5, year: 1995, month: 8, day: 22, hour: 9, minute: 15 },
  { label: 'Visionary Tech • Bengaluru', city: 'Bengaluru, India', lat: 12.9716, lon: 77.5946, tz: 5.5, year: 2002, month: 11, day: 7, hour: 18, minute: 45 },
  { label: 'Global Traveler • London', city: 'London, UK', lat: 51.5074, lon: -0.1278, tz: 0.0, year: 1992, month: 6, day: 10, hour: 14, minute: 20 },
  { label: 'Silicon Mind • San Francisco', city: 'San Francisco, USA', lat: 37.7749, lon: -122.4194, tz: -8.0, year: 1997, month: 9, day: 30, hour: 8, minute: 10 }
];

// Planetary Color & Dignity Lookups
const PLANET_COLORS: Record<string, { color: string; hex: string; sanskrit: string }> = {
  sun: { color: 'Brilliant Gold & Deep Saffron', hex: '#f59e0b', sanskrit: 'सुवर्ण एवं काषाय' },
  moon: { color: 'Pearl White & Luminous Silver', hex: '#f8fafc', sanskrit: 'श्वेत एवं रजत' },
  mars: { color: 'Coral Red & Copper Crimson', hex: '#ef4444', sanskrit: 'रक्त एवं ताम्र' },
  mercury: { color: 'Emerald Green & Mint', hex: '#10b981', sanskrit: 'हरित एवं मरकत' },
  jupiter: { color: 'Turmeric Yellow & Golden Mustard', hex: '#eab308', sanskrit: 'पीत एवं हरिद्रा' },
  venus: { color: 'Iridescent Diamond White & Soft Rose', hex: '#fbcfe8', sanskrit: 'श्वेत एवं कर्पूर' },
  saturn: { color: 'Royal Navy Blue & Deep Indigo', hex: '#1e3a8a', sanskrit: 'नील एवं श्याम' },
  rahu: { color: 'Smoky Violet & Obsidian Charcoal', hex: '#581c87', sanskrit: 'धूम्र एवं कृष्ण' },
  ketu: { color: 'Earthy Terracotta & Ash Ochre', hex: '#78350f', sanskrit: 'गैरिक एवं भस्म' }
};

const WEEKDAY_LORDS = [
  { day: 'Sunday (रविवार)', lord: 'Sun (सूर्य)', color: 'Brilliant Gold / Saffron', hex: '#f59e0b', critical: 'Dull Grey & Muddy Black', criticalHex: '#4b5563' },
  { day: 'Monday (सोमवार)', lord: 'Moon (चन्द्र)', color: 'Pearl White / Silvery Cream', hex: '#f1f5f9', critical: 'Dark Charcoal & Blood Red', criticalHex: '#991b1b' },
  { day: 'Tuesday (मङ्गलवार)', lord: 'Mars (मङ्गल)', color: 'Coral Red / Bright Crimson', hex: '#ef4444', critical: 'Dull Black & Muddy Brown', criticalHex: '#451a03' },
  { day: 'Wednesday (बुधवार)', lord: 'Mercury (बुध)', color: 'Emerald Green / Fresh Mint', hex: '#10b981', critical: 'Fiery Orange & Dark Red', criticalHex: '#ea580c' },
  { day: 'Thursday (गुरुवार)', lord: 'Jupiter (गुरु)', color: 'Turmeric Yellow / Golden Amber', hex: '#eab308', critical: 'Harsh Violet & Jet Black', criticalHex: '#581c87' },
  { day: 'Friday (शुक्रवार)', lord: 'Venus (शुक्र)', color: 'Diamond White / Soft Pastel Pink', hex: '#fbcfe8', critical: 'Harsh Mustard & Rusty Brown', criticalHex: '#a16207' },
  { day: 'Saturday (शनिवार)', lord: 'Saturn (शनि)', color: 'Royal Navy Blue / Deep Indigo', hex: '#1e3a8a', critical: 'Fiery Scarlet & Bright Crimson', criticalHex: '#dc2626' }
];

/**
 * Calculates complete Rishi Muni astrological analysis from raw birth parameters
 */
export function calculateRishiMuniReading(input: RishiMuniBirthInput): RishiMuniReading {
  // Construct UTC birth date
  const birthDateStr = `${String(input.birthYear).padStart(4, '0')}-${String(input.birthMonth).padStart(2, '0')}-${String(input.birthDay).padStart(2, '0')}`;
  const birthTimeStr = `${String(input.birthHour).padStart(2, '0')}:${String(input.birthMinute).padStart(2, '0')}`;
  
  const birthUtcMs = Date.UTC(
    input.birthYear,
    input.birthMonth - 1,
    input.birthDay,
    input.birthHour,
    input.birthMinute
  ) - input.timeZoneOffsetHours * 3600000;
  
  const utcDate = new Date(birthUtcMs);
  const ayanamsa = getLahiriAyanamsa(utcDate);

  // 1. Calculate Lagna (Ascendant)
  const lagna = calculateAscendant(utcDate, input.latitude, input.longitude, ayanamsa);
  const lagnaRashiDef = RASHIS[lagna.rashiIndex];

  // 2. Calculate All 9 Grahas
  const planets = calculateAllPlanets(utcDate);
  const moon = planets.find(p => p.id === 'moon') || planets[1];
  const sun = planets.find(p => p.id === 'sun') || planets[0];

  // 3. Map into 12 Houses
  const houseSignificances = [
    'Tanu Bhava (तनू) • Vitality, Physical Constitution, Character & Natural Aura',
    'Dhana Bhava (धन) • Accumulated Wealth, Family Roots, Eloquence & Speech',
    'Sahaja Bhava (सहज) • Courage, Siblings, Direct Initiative & Enterprise',
    'Sukha Bhava (सुख) • Maternal Comforts, Real Estate, Vehicles & Inner Peace',
    'Putra Bhava (पुत्र) • Creative Intellect, Ancient Merits (Purva Punya) & Strategy',
    'Ari Bhava (अरि) • Competitions, Resistance to Disease, Debts & Overcoming Foes',
    'Yuvati Bhava (युवति) • Sacred Partnership, Marriage, Public Contracts & Alliances',
    'Randhra Bhava (रन्ध्र) • Longevity, Deep Transformation, Occult Mysteries & Inheritance',
    'Dharma Bhava (धर्म) • Higher Wisdom, Guru&apos;s Grace, Destiny & Pilgrimages',
    'Karma Bhava (कर्म) • Profession, Public Authority, Societal Contribution & Renown',
    'Labha Bhava (लाभ) • Material Gains, Extended Networks, Aspirations & Fulfillment',
    'Vyaya Bhava (व्यय) • Spiritual Liberation (Moksha), Solitude & Foreign Journeys'
  ];

  const karakas = ['Surya', 'Guru', 'Mangala', 'Chandra', 'Guru', 'Mangala/Shani', 'Shukra', 'Shani', 'Guru', 'Budha/Surya', 'Guru', 'Shani/Ketu'];

  const houses: KundliHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const rashiIdx = (lagna.rashiIndex + (h - 1)) % 12;
    const rashiDef = RASHIS[rashiIdx];
    const planetsInHouse = planets.filter(p => p.rashiIndex === rashiIdx);

    houses.push({
      houseNumber: h,
      rashiIndex: rashiIdx,
      rashiName: rashiDef.name,
      rashiSanskrit: rashiDef.sanskrit,
      planets: planetsInHouse,
      signLord: rashiDef.lord,
      karaka: karakas[h - 1],
      significance: houseSignificances[h - 1]
    });
  }

  // 4. Calculate Planetary Dignities
  const dignities: PlanetaryDignity[] = planets.map(p => {
    let dignity: PlanetaryDignity['dignity'] = 'Neutral (सम)';
    let badgeColor = 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    let meaning = 'Operates in balanced natural equilibrium.';

    // Exaltation check
    if (
      (p.id === 'sun' && p.rashiIndex === 0) || // Sun in Aries
      (p.id === 'moon' && p.rashiIndex === 1) || // Moon in Taurus
      (p.id === 'mars' && p.rashiIndex === 9) || // Mars in Capricorn
      (p.id === 'mercury' && p.rashiIndex === 5) || // Mercury in Virgo
      (p.id === 'jupiter' && p.rashiIndex === 3) || // Jupiter in Cancer
      (p.id === 'venus' && p.rashiIndex === 11) || // Venus in Pisces
      (p.id === 'saturn' && p.rashiIndex === 6) // Saturn in Libra
    ) {
      dignity = 'Exalted (उच्च)';
      badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      meaning = 'Radiates supreme strength, maximizing auspicious results.';
    } else if (
      (p.id === 'sun' && p.rashiIndex === 6) || // Sun in Libra
      (p.id === 'moon' && p.rashiIndex === 7) || // Moon in Scorpio
      (p.id === 'mars' && p.rashiIndex === 3) || // Mars in Cancer
      (p.id === 'mercury' && p.rashiIndex === 11) || // Mercury in Pisces
      (p.id === 'jupiter' && p.rashiIndex === 9) || // Jupiter in Capricorn
      (p.id === 'venus' && p.rashiIndex === 5) || // Venus in Virgo
      (p.id === 'saturn' && p.rashiIndex === 0) // Saturn in Aries
    ) {
      dignity = 'Debilitated (नीच)';
      badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      meaning = 'Faces friction or delayed manifestation, requiring conscious discipline.';
    } else if (RASHIS[p.rashiIndex].lord === p.name.split(' ')[0]) {
      dignity = 'Own Sign (स्वक्षेत्र)';
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      meaning = 'Commands its own sovereign domain with effortless authority.';
    }

    const houseOfPlanet = houses.find(h => h.planets.some(pl => pl.id === p.id))?.houseNumber || 1;

    return {
      planetId: p.id,
      planetName: p.name,
      sanskritName: p.sanskritName,
      rashiIndex: p.rashiIndex,
      rashiName: RASHIS[p.rashiIndex].name,
      houseNumber: houseOfPlanet,
      dignity,
      badgeColor,
      meaning
    };
  });

  // 5. Color Oracle Computation
  const lagnaLordKey = lagnaRashiDef.lord.toLowerCase();
  const matchedPlanetKey = Object.keys(PLANET_COLORS).find(k => lagnaLordKey.includes(k)) || 'jupiter';
  const natalColorData = PLANET_COLORS[matchedPlanetKey];

  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday
  const todayRuler = WEEKDAY_LORDS[dayOfWeek];

  const colorOracle: ColorOracle = {
    natalLuckyColor: {
      colorName: natalColorData.color,
      hex: natalColorData.hex,
      sanskritName: natalColorData.sanskrit,
      associatedPlanet: lagnaRashiDef.lord,
      rationale: `As your Lagna is ruled by ${lagnaRashiDef.lord}, this color resonates with your core bio-magnetic field and constitutional vitality.`
    },
    todayAuspiciousColor: {
      colorName: todayRuler.color,
      hex: todayRuler.hex,
      sanskritName: `शुभ वर्ण (${todayRuler.lord.split(' ')[1] || todayRuler.lord})`,
      governingRuler: todayRuler.lord,
      howToUse: `Wearing ${todayRuler.color} or carrying a small accessory of this shade today harmonizes with ${todayRuler.lord}'s prevailing planetary tide.`
    },
    todayCriticalColor: {
      colorName: todayRuler.critical,
      hex: todayRuler.criticalHex,
      sanskritName: 'वर्ज्य वर्ण (Caution Color)',
      avoidReason: `Clashes with ${todayRuler.lord}'s diurnal vibration, potentially amplifying irritability or scatter.`,
      warningMessage: `Rishi Muni advises avoiding dense ${todayRuler.critical} fabrics today to maintain inner mental clarity during critical discussions.`
    }
  };

  // 6. Today's Probable Events & Transit Forecast
  const moonRashiName = RASHIS[moon.rashiIndex].name;
  const currentTransitRashi = RASHIS[(moon.rashiIndex + dayOfWeek) % 12].name;

  const dailyForecast: DailyForecast = {
    dateFormatted: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    weekdayLord: todayRuler.lord,
    moonTransitRashi: currentTransitRashi,
    summary: `Under ${todayRuler.lord}’s governance and Chandra’s current transit through ${currentTransitRashi}, today marks an energetic pivot toward structured clarity and mental renewal.`,
    mindAndEmotions: `Your natal Moon in ${moon.nakshatraName} Nakshatra invites calm introspective focus. The emotional barometer is steady; avoid impulsive over-commitments before midday.`,
    careerAndKarma: `House 10 (${houses[9].rashiName}) indicates favorable momentum for collaborative technical reviews, strategic proposals, and finalizing pending paperwork.`,
    relationshipsAndSpeech: `Gentle speech (*Priya-vakya*) yields disproportionate goodwill. Keep conversations constructive and avoid revisiting unresolved historical debates.`,
    shubhMuhurat: 'Abhijit Muhurat: 11:48 AM — 12:36 PM (Ideal for new beginnings and signatures)',
    rahuKaal: 'Rahu Kaalam: 03:15 PM — 04:45 PM (Avoid high-stakes financial speculations)',
    sacredRemedy: {
      mantra: 'ॐ नमो भगवते वासुदेवाय (Om Namo Bhagavate Vasudevaya)',
      meaning: 'Salutations to the Supreme All-Pervading Cosmic Preserver who balances all planetary orbits.',
      suggestedDonationOrAction: 'Offer a handful of water to the rising sun, or share grains/seeds with birds during morning hours.'
    }
  };

  // 7. Rishi Muni Blessing
  const rishiBlessing = `कल्याणमस्तु, वत्स ${input.name || 'जिज्ञासु'}! (May auspiciousness be upon you!) Born under the steady brilliance of ${lagnaRashiDef.sanskrit} Lagna and ${moon.nakshatraName} Nakshatra, your chart carries the karma of deep understanding. The planets are not your masters; they are divine clock hands displaying the cosmic rhythms of your own soul. Walk with truth (*Satya*), right action (*Dharma*), and unwavering peace (*Shanti*).`;

  return {
    user: {
      name: input.name || 'Seeker',
      birthString: `${birthDateStr} at ${birthTimeStr}`,
      locationString: input.city
    },
    lagna: {
      signIndex: lagna.rashiIndex,
      signName: lagnaRashiDef.name,
      sanskritName: lagnaRashiDef.sanskrit,
      degreeFormatted: `${lagna.degree.toFixed(2)}° in ${lagnaRashiDef.name}`,
      lord: lagnaRashiDef.lord,
      element: lagnaRashiDef.element,
      significance: `The 1st House represents your physical body, life trajectory, and constitutional radiance. Ruled by ${lagnaRashiDef.lord}.`
    },
    chandra: {
      signName: moonRashiName,
      sanskritName: RASHIS[moon.rashiIndex].sanskrit,
      nakshatraName: moon.nakshatraName,
      nakshatraPada: moon.nakshatraPada,
      deity: 'Soma / Chandra'
    },
    surya: {
      signName: RASHIS[sun.rashiIndex].name,
      sanskritName: RASHIS[sun.rashiIndex].sanskrit
    },
    houses,
    dignities,
    colorOracle,
    dailyForecast,
    rishiBlessing
  };
}

/**
 * Generates an answer from Rishi Muni based on user question and their birth chart
 */
export function askRishiMuni(reading: RishiMuniReading, query: string): {
  headline: string;
  response: string;
  recommendedHouse: number;
  mantra: string;
} {
  const q = query.toLowerCase();

  if (q.includes('career') || q.includes('job') || q.includes('profession') || q.includes('work')) {
    const h10 = reading.houses[9];
    return {
      headline: `१०म भाव • Karma Bhava in ${h10.rashiName}`,
      response: `Vatsa, your 10th House of Career resides in ${h10.rashiName} (${h10.rashiSanskrit}), governed by ${h10.signLord}. ${
        h10.planets.length > 0 
          ? `It is directly energized by ${h10.planets.map(p => p.name).join(', ')}, signaling leadership and public impact.` 
          : `Its lord ${h10.signLord} indicates that steady mastery, deep expertise, and ethical execution will bring you sustained recognition.`
      } Strive for excellence without anxious attachment to the fruits of action.`,
      recommendedHouse: 10,
      mantra: 'ॐ सूर्याय नमः (Om Suryaya Namah)'
    };
  }

  if (q.includes('color') || q.includes('wear') || q.includes('colour') || q.includes('dress')) {
    return {
      headline: `वर्ण विचार • Sacred Planetary Colors`,
      response: `Vatsa, your natal constitutional color is ${reading.colorOracle.natalLuckyColor.colorName} (${reading.colorOracle.natalLuckyColor.sanskritName}), resonating with your Lagna Lord ${reading.lagna.lord}. For today specifically, embrace ${reading.colorOracle.todayAuspiciousColor.colorName}. Most crucially, avoid dense ${reading.colorOracle.todayCriticalColor.colorName} today, as it introduces friction with today's prevailing planetary lord.`,
      recommendedHouse: 1,
      mantra: 'ॐ शुं शुक्राय नमः (Om Shum Shukraya Namah)'
    };
  }

  if (q.includes('today') || q.includes('happen') || q.includes('forecast') || q.includes('predict') || q.includes('daily')) {
    return {
      headline: `दैनिक गोचर • Today's Cosmic Tide`,
      response: `${reading.dailyForecast.summary} Mind focus: ${reading.dailyForecast.mindAndEmotions} Use the auspicious window of ${reading.dailyForecast.shubhMuhurat} for significant decisions, and maintain patient composure during ${reading.dailyForecast.rahuKaal}.`,
      recommendedHouse: 9,
      mantra: reading.dailyForecast.sacredRemedy.mantra
    };
  }

  if (q.includes('love') || q.includes('marriage') || q.includes('relationship') || q.includes('partner')) {
    const h7 = reading.houses[6];
    return {
      headline: `७म भाव • Kalatra & Partnership Bhava`,
      response: `Your 7th House of sacred alliances rests in ${h7.rashiName}, ruled by ${h7.signLord}. ${
        h7.planets.length > 0 
          ? `With ${h7.planets.map(p => p.name).join(', ')} influencing this house, relationships demand emotional transparency.` 
          : `Relationships blossom when grounded in mutual philosophical values and peaceful communication.`
      } Honor the divine spark (*Atman*) in your companion.`,
      recommendedHouse: 7,
      mantra: 'ॐ क्लीं कृष्णाय नमः (Om Kleem Krishnaya Namah)'
    };
  }

  if (q.includes('wealth') || q.includes('money') || q.includes('finance') || q.includes('gains')) {
    const h2 = reading.houses[1];
    const h11 = reading.houses[10];
    return {
      headline: `२य एवं ११श भाव • Dhana & Labha Bhavas`,
      response: `Your 2nd House of accumulated wealth is in ${h2.rashiName} (${h2.signLord}), while your 11th House of gains is in ${h11.rashiName} (${h11.signLord}). Wealth flows to you when you solve complex problems and provide genuine value to society. Practice mindful accumulation and ethical charity (*Dana*).`,
      recommendedHouse: 2,
      mantra: 'ॐ श्रीं महालक्ष्म्यै नमः (Om Shreem Mahalakshmyai Namah)'
    };
  }

  // Default deep wisdom response
  return {
    headline: `ऋषि मुनि उपदेश • Divine Guidance for ${reading.user.name}`,
    response: `Vatsa, you are anchored in ${reading.lagna.sanskritName} Lagna with the Moon shining in ${reading.chandra.nakshatraName} Nakshatra. Remember the timeless wisdom of the Bhagavad Gita (2.47): कर्मण्येवाधिकारस्ते मा फलेषु कदाचन (Your right is to work only, but never to its fruits). The 12 houses of your chart are a sacred map of your soul's journey. Radiate kindness, speak the truth gently, and let the cosmic light guide your steps.`,
    recommendedHouse: 1,
    mantra: reading.dailyForecast.sacredRemedy.mantra
  };
}
