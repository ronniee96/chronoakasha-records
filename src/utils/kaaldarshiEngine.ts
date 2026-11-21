import { KaalDarshiResponse, EpistemicClassification } from '../types/sixPillars';
import { calculateAllPlanets, getLahiriAyanamsa } from './astronomyEngine';
import { SCRIPTURE_RECORDS } from '../data/scripturesData';
import { ANCIENT_CIVILIZATIONS } from '../data/civilizationsData';
import { KARDASHEV_SCALE, FUTURE_SCENARIOS } from '../data/futureCivilizationsData';
import { calculatePanchang } from './panchangEngine';

export function queryKaalDarshi(query: string, now: Date = new Date()): KaalDarshiResponse {
  const q = query.toLowerCase().trim();

  // 1. Where is Jupiter / Moon / Saturn / Sun right now?
  if (q.includes('jupiter') || q.includes('गुरु') || q.includes('बृहस्पति')) {
    const planets = calculateAllPlanets(now);
    const jupiter = planets.find(p => p.grahaKey === 'jupiter') || planets[4];
    return {
      query,
      epistemicClassification: 'F', // Astronomical Calculation
      synthesis: `According to real-time Keplerian orbital propagation with Chitrapaksha Lahiri Ayanamsa (${getLahiriAyanamsa(now).toFixed(2)}°), Jupiter (Guru / बृहस्पति) is currently transiting through ${jupiter.rashiName} (${jupiter.rashiSanskrit}) at ${jupiter.rashiDegrees.toFixed(2)}° in Nakshatra ${jupiter.nakshatraName} (Pada ${jupiter.nakshatraPada}). Its daily motion is ${jupiter.speedDegPerDay >= 0 ? '+' : ''}${jupiter.speedDegPerDay.toFixed(3)}°/day and its motion is currently ${jupiter.isRetrograde ? 'Vakra (Retrograde वक्र)' : 'Margi (Direct मार्गी)'}.`,
      citations: [
        {
          sourceTitle: 'VSOP87 Planetary Solutions & Astronomical Ephemeris',
          authorOrLineage: 'Bureau des Longitudes (Paris) & NASA JPL Horizons',
          publicationOrPeriod: 'Contemporary Astronomical Standards',
          epistemicCode: 'F'
        },
        {
          sourceTitle: 'Surya Siddhanta (Spashtadhikara - True Longitudes)',
          authorOrLineage: 'Classical Vedic Astronomical Tradition',
          publicationOrPeriod: 'c. 5th Century CE',
          epistemicCode: 'C'
        }
      ],
      connectedPillars: ['celestialAtlas', 'hinduCosmology'],
      suggestedCrossPillarExplorations: [
        { label: 'Inspect Graha Mandala Live Ephemeris', targetPillar: 'celestialAtlas', nodeId: 'jupiter-guru' },
        { label: 'View Nakshatra Observatory', targetPillar: 'celestialAtlas' }
      ]
    };
  }

  // 2. Where is Saturn / Shani?
  if (q.includes('saturn') || q.includes('शनि')) {
    const planets = calculateAllPlanets(now);
    const saturn = planets.find(p => p.grahaKey === 'saturn') || planets[6];
    return {
      query,
      epistemicClassification: 'F',
      synthesis: `Saturn (Shanaishchara / शनि) is currently located at sidereal longitude ${saturn.siderealLongitude.toFixed(2)}°, placing it in ${saturn.rashiName} (${saturn.rashiDegrees.toFixed(2)}°) within ${saturn.nakshatraName} Pada ${saturn.nakshatraPada}. It completes one orbital period around the Sun every 29.45 Earth years. In Jyotish, Shani represents the karaka of deep time (Kala), discipline, perseverance, and ascetic detachment.`,
      citations: [
        {
          sourceTitle: 'NASA JPL DE440 Planetary Ephemeris',
          authorOrLineage: 'Jet Propulsion Laboratory, Pasadena, CA',
          publicationOrPeriod: '2021',
          epistemicCode: 'A'
        },
        {
          sourceTitle: 'Varahamihira’s Brihat Samhita (Chapter 10: Saturn’s Transit)',
          authorOrLineage: 'Varahamihira',
          publicationOrPeriod: '6th Century CE, Ujjain',
          epistemicCode: 'C'
        }
      ],
      connectedPillars: ['celestialAtlas', 'hinduCosmology'],
      suggestedCrossPillarExplorations: [
        { label: 'Open Saturn Node in Knowledge Graph', targetPillar: 'celestialAtlas', nodeId: 'saturn-shani' },
        { label: 'Check Shani’s Transit in Jyotisham', targetPillar: 'jyotisham' }
      ]
    };
  }

  // 3. Rigveda cosmic order / Nasadiya Sukta
  if (q.includes('rigveda') || q.includes('ऋग्वेद') || q.includes('nasadiya') || q.includes('creation') || q.includes('cosmic order')) {
    const scripture = SCRIPTURE_RECORDS.find(s => s.id === 'nasadiya-sukta-cosmology') || SCRIPTURE_RECORDS[0];
    return {
      query,
      epistemicClassification: 'C',
      synthesis: `The Rigveda presents humanity's earliest recorded non-dogmatic contemplation of cosmogenesis in the Nasadiya Sukta (Mandala 10, Sukta 129). It describes the primordial state before the manifestation of matter, radiant energy, or dualities (Sat/Asat, Day/Night, Death/Immortality). The cosmic order itself is governed by Ṛta (ऋत)—the unalterable natural and cosmic harmony that precedes anthropomorphic gods.`,
      sanskritPassage: {
        devanagari: scripture.sanskritDevanagari.split('\n')[0] + '\n' + scripture.sanskritDevanagari.split('\n')[1],
        transliteration: scripture.iastTransliteration.split('\n')[0],
        english: scripture.englishTranslation,
        source: scripture.sourceText + ' • ' + scripture.chapterVerse
      },
      scientificCorrespondence: 'Directly anticipates quantum vacuum fluctuations and modern inflationary cosmologies where space-time geometry and entropy emerge from a prior boundary state.',
      citations: [
        {
          sourceTitle: 'Rigveda Samhita (Bhandarkar Oriental Research Institute Critical Edition)',
          authorOrLineage: 'Vedic Risis (Parameshthin Prajapati)',
          publicationOrPeriod: '2nd Millennium BCE Core Tradition',
          epistemicCode: 'C'
        },
        {
          sourceTitle: 'Cosmos: A Personal Voyage (Episode 10)',
          authorOrLineage: 'Dr. Carl Sagan',
          publicationOrPeriod: '1980',
          epistemicCode: 'D'
        }
      ],
      connectedPillars: ['hinduCosmology', 'past'],
      suggestedCrossPillarExplorations: [
        { label: 'Open Jnana Kosha Scripture Reader', targetPillar: 'hinduCosmology' },
        { label: 'Compare Big Bang Cosmology in Cosmos Atlas', targetPillar: 'celestialAtlas' }
      ]
    };
  }

  // 4. How is Kalpa calculated in Surya Siddhanta / Puranas?
  if (q.includes('kalpa') || q.includes('कल्प') || q.includes('yuga') || q.includes('brahma')) {
    return {
      query,
      epistemicClassification: 'C',
      synthesis: `In Surya Siddhanta (Madhyamadhikara, Verses 15–17) and the Puranas, a Kalpa is defined as one daytime period of Brahma, lasting exactly 1,000 Mahayugas (4.32 billion terrestrial years), followed by a night of equal duration. Within one Kalpa reside 14 Manvantaras (each lasting 71 Mahayugas, separated by Sandhis of 1 Krita Yuga duration). A Mahayuga consists of 4 Yugas in the ratio 4:3:2:1 (Satya: 1.728M yrs, Treta: 1.296M yrs, Dvapara: 864,000 yrs, Kali: 432,000 yrs = total 4.32M yrs). Currently, we are located in the 51st divine year of Brahma, in the Sveta-Varaha Kalpa, 7th Manvantara (Vaivasvata), 28th Mahayuga cycle.`,
      scientificCorrespondence: 'The Hindu Kalpa of 4.32 billion years closely corresponds to the radiometric geological age of the Earth (~4.54 billion years) and half the age of the observable universe (~13.8 billion years).',
      citations: [
        {
          sourceTitle: 'Surya Siddhanta (Translated by Ebenezer Burgess)',
          authorOrLineage: 'Astronomical Society of Bengal',
          publicationOrPeriod: '1860 (Original c. 500 CE)',
          chapterOrPage: 'Chapter 1: Computation of Mean Motions, vv. 15-24',
          epistemicCode: 'C'
        },
        {
          sourceTitle: 'Srimad Bhagavata Purana (Canto 3, Chapter 11)',
          authorOrLineage: 'Maha-muni Veda Vyasa / BORI',
          publicationOrPeriod: 'Classical Sanskrit Redaction',
          epistemicCode: 'C'
        }
      ],
      connectedPillars: ['hinduCosmology', 'past'],
      suggestedCrossPillarExplorations: [
        { label: 'Explore Kalachakra Cosmic Wheel', targetPillar: 'hinduCosmology' },
        { label: 'View Geological Earth Timeline (Hadean to Anthropocene)', targetPillar: 'past' }
      ]
    };
  }

  // 5. Type II / Dyson / Kardashev / Future civilizations
  if (q.includes('type ii') || q.includes('dyson') || q.includes('kardashev') || q.includes('civilization') || q.includes('future')) {
    const k2 = KARDASHEV_SCALE.find(k => k.type === 'Type II') || KARDASHEV_SCALE[2];
    return {
      query,
      epistemicClassification: 'E', // Scientific Hypothesis
      synthesis: `A Kardashev Type II civilization is capable of harnessing the complete bolometric radiant power output of its parent star (~10²⁶ Watts for a solar-mass star like the Sun). Freeman Dyson demonstrated in 1960 that by the laws of thermodynamics, such megastructures cannot hide their energy use: they must radiate waste heat at ~300 K in the mid-infrared spectrum. Proposed engineering architectures include non-rigid Dyson swarms (millions of co-orbiting photovoltaic statites), stellar lifting (extracting hydrogen via magnetic fields to prolong star lifespan), and Matrioshka brain megacomputers.`,
      citations: [
        {
          sourceTitle: 'Search for Artificial Stellar Sources of Infrared Radiation',
          authorOrLineage: 'Freeman J. Dyson',
          publicationOrPeriod: 'Science, Vol. 131, No. 3414 (1960)',
          chapterOrPage: 'pp. 1667-1668',
          epistemicCode: 'E'
        },
        {
          sourceTitle: 'Transmission of Information by Extraterrestrial Civilizations',
          authorOrLineage: 'Nikolai S. Kardashev',
          publicationOrPeriod: 'Soviet Astronomy, Vol. 8 (1964)',
          chapterOrPage: 'pp. 217-221',
          epistemicCode: 'E'
        }
      ],
      connectedPillars: ['civilizations', 'future'],
      suggestedCrossPillarExplorations: [
        { label: 'Launch 3D Dyson Swarm Simulation', targetPillar: 'voyage3d' },
        { label: 'Explore Kardashev Horizons 2030–100,000 CE', targetPillar: 'civilizations' }
      ]
    };
  }

  // 6. Default comprehensive multi-pillar synthesis
  const panchang = calculatePanchang(now);
  return {
    query,
    epistemicClassification: 'D', // Scholarly Interpretation
    synthesis: `Chronoākāsha Records has synthesized this inquiry across the Six Pillars of Existence. Currently in the living timeline, the day is ${panchang.varaDaySanskrit} (${panchang.varaName}, ${panchang.paksha} Paksha, Tithi ${panchang.tithiName}), occupying lunar mansion ${panchang.nakshatraName} (Pada ${panchang.nakshatraPada}). Across the deep time horizon, human civilizational progression bridges ancient hydraulic and metallurgical engineering (Indus-Sarasvati, Vedic, Mesopotamia) with modern space exploration (ISRO, NASA) and Kardashev energy scaling.`,
    citations: [
      {
        sourceTitle: 'Chronoākāsha Universal Knowledge Repository & Astronomical Ephemeris',
        authorOrLineage: 'Chronoākāsha Research Consortium',
        publicationOrPeriod: 'Contemporary Epoch',
        epistemicCode: 'D'
      }
    ],
    connectedPillars: ['past', 'present', 'hinduCosmology', 'celestialAtlas', 'future', 'civilizations'],
    suggestedCrossPillarExplorations: [
      { label: 'Explore Today Living Timeline', targetPillar: 'present' },
      { label: 'Inspect Global Knowledge Graph', targetPillar: 'past' }
    ]
  };
}
