export interface LearningPath {
  id: string;
  title: string;
  sanskritTitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  description: string;
  lessons: Array<{
    lessonNumber: number;
    title: string;
    summary: string;
    keyConcepts: string[];
  }>;
}

export interface QuizQuestion {
  id: string;
  topic: 'Cosmology' | 'Astronomy' | 'Panchang' | 'Civilizations' | 'Jyotish';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceSource: string;
}

export interface GlossaryTerm {
  term: string;
  sanskrit: string;
  iast: string;
  category: 'Time & Cosmology' | 'Astronomy & Grahas' | 'Philosophy & Metaphysics' | 'Archaeology & Metallurgy';
  definition: string;
  etymology: string;
  scriptureReference: string;
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'hindu-cosmology-mastery',
    title: 'Hindu Cosmology & The Dimensions of Time',
    sanskritTitle: 'कालमीमांसा एवं ब्रह्माण्ड दर्शन',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    description: 'A comprehensive curriculum exploring ancient Indian concepts of cosmic deep time, cyclic dissolution, multi-tiered dimensional lokas, and comparative modern astrophysics.',
    lessons: [
      {
        lessonNumber: 1,
        title: 'Introduction to Microscopic and Macroscopic Time (Truti to Kalpa)',
        summary: 'Examine how ancient Indian astronomy divided time from the atomic Truti (~30 microseconds) to the day of Brahma (4.32 billion years).',
        keyConcepts: ['Surya Siddhanta time hierarchy', 'Prana and Pala', 'Solar vs Lunar calibration', 'Deep time consciousness']
      },
      {
        lessonNumber: 2,
        title: 'The Yuga Cycle (Satya, Treta, Dvapara, Kali)',
        summary: 'Understand the mathematical 4:3:2:1 ratio of the four cosmic ages, their astronomical parameters, and the metaphorical decline and renewal of Dharma.',
        keyConcepts: ['Mahayuga (4.32M years)', 'Yuga Sandhi transition dawns', 'Astronomical planetary conjunctions', 'Societal cycles']
      },
      {
        lessonNumber: 3,
        title: 'Manvantaras and Kalpas: The Galactic Scales',
        summary: 'Explore the 14 Manvantaras of each cosmic day and the reign of Manus, comparing their ~308 million year spans to the Solar System’s galactic orbit.',
        keyConcepts: ['Vaivasvata Manvantara', 'Galactic Year analogy', 'Day and Night of Brahma', 'Sveta-Varaha Kalpa']
      },
      {
        lessonNumber: 4,
        title: 'The Architecture of the 14 Lokas (Cosmic Geography)',
        summary: 'Analyze the fourteen planes of conscious existence from Satyaloka down to Patala, and their metaphysical and dimensional representations.',
        keyConcepts: ['Seven Urdhva Lokas', 'Seven Adho Lokas', 'Mount Meru as cosmic axis', 'Interdimensional planes']
      },
      {
        lessonNumber: 5,
        title: 'Dissolution (Pralaya) & Cyclic Rebirth',
        summary: 'Contrast the four types of Pralaya (Nitya, Naimittika, Prakritika, Atyantika) with modern thermodynamic entropy and conformal cyclic cosmology.',
        keyConcepts: ['Thermodynamics of Pralaya', 'Avyakta unmanifest state', 'Penrose cyclic universe', 'Rebirth of Satya Yuga']
      }
    ]
  },
  {
    id: 'nakshatra-astronomy-sky',
    title: 'Nakshatra Astronomy & The Celestial Coordinate System',
    sanskritTitle: 'नक्षत्र विज्ञान एवं खगोलीय मण्डल',
    difficulty: 'Beginner',
    estimatedHours: 4,
    description: 'Learn the observational astronomy of the 27 lunar mansions along the ecliptic path, their modern IAU star associations, and their cultural lore.',
    lessons: [
      {
        lessonNumber: 1,
        title: 'The Ecliptic and the Moon’s Sidereal Journey',
        summary: 'Why 27 divisions? Understanding the Moon’s 27.3-day sidereal orbit and the 13°20’ span of each asterism across the night sky.',
        keyConcepts: ['Sidereal vs Tropical zodiac', 'Chitrapaksha / Spica anchor', 'Daily lunar motion', 'Ecliptic belt']
      },
      {
        lessonNumber: 2,
        title: 'Identifying Marker Stars in the Modern Night Sky',
        summary: 'Locate iconic Nakshatras using naked-eye and telescopic modern stars: Krittika (Pleiades), Rohini (Aldebaran), Ardra (Betelgeuse), Chitra (Spica), Jyeshtha (Antares), and Shravana (Altair).',
        keyConcepts: ['Yogatara (Junction stars)', 'Stellar magnitudes and spectral classes', 'Winter and summer sky asterisms']
      },
      {
        lessonNumber: 3,
        title: 'The Pada System: Navamsa Divisions (108 Harmonics)',
        summary: 'How each Nakshatra divides into four quarters (Padas) of 3°20’, creating the 108 sacred harmonics that interlock the 27 Nakshatras with the 12 Rashis.',
        keyConcepts: ['108 cosmic harmonics', 'Navamsa Rashi mapping', 'Sound syllables (Nama Nakshatra)', 'Vargottama degrees']
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-kalpa-duration',
    topic: 'Cosmology',
    question: 'According to the Surya Siddhanta and classical Hindu astronomy, what is the exact duration of one Kalpa (a single day of Brahma)?',
    options: [
      '4.32 Million Solar Years',
      '432,000 Solar Years',
      '4.32 Billion Solar Years (1,000 Mahayugas)',
      '311.04 Trillion Solar Years'
    ],
    correctIndex: 2,
    explanation: 'A Kalpa consists of 1,000 Chaturyugas (Mahayugas), each lasting 4,320,000 solar years. Multiplying 1,000 by 4.32 million yields exactly 4.32 billion years, which Carl Sagan noted corresponds remarkably to the modern scientific radiometric age of planet Earth (~4.54 billion years).',
    referenceSource: 'Surya Siddhanta, Madhyamadhikara, Verse 15–17; Bhagavad Gita 8.17'
  },
  {
    id: 'q2-panchang-tithi',
    topic: 'Panchang',
    question: 'How is a Tithi (lunar day) mathematically defined in Hindu Panchang calculation?',
    options: [
      'A 24-hour solar period from midnight to midnight',
      'A 12-degree increase in longitudinal separation between the Moon and the Sun',
      'The time taken for the Earth to rotate once on its polar axis',
      'A 13-degree-20-minute movement of the Moon across a Nakshatra'
    ],
    correctIndex: 1,
    explanation: 'A Tithi is defined as the time during which the Moon advances 12 degrees eastward from the Sun in celestial longitude. Because the Moon’s speed varies along its elliptical orbit (Kepler’s second law), a Tithi varies in duration from approximately 19 to 26 hours.',
    referenceSource: 'Vedanga Jyotisha; Surya Siddhanta Chapter 14'
  },
  {
    id: 'q3-chitra-nakshatra',
    topic: 'Astronomy',
    question: 'Which brilliant astronomical star serves as the primary anchor for Chitra Nakshatra and the Chitrapaksha (Lahiri) Ayanamsa?',
    options: [
      'Aldebaran (Alpha Tauri)',
      'Betelgeuse (Alpha Orionis)',
      'Spica (Alpha Virginis)',
      'Regulus (Alpha Leonis)'
    ],
    correctIndex: 2,
    explanation: 'Spica (Alpha Virginis), a luminous spectroscopic binary star located ~250 light-years away, serves as the celestial benchmark for Chitra Nakshatra. The Lahiri Ayanamsa defines zero Aries as exactly 180 degrees opposite Spica.',
    referenceSource: 'Indian Astronomical Ephemeris Committee (1955); IAU Catalog'
  },
  {
    id: 'q4-dholavira-water',
    topic: 'Civilizations',
    question: 'What is the signature archaeological innovation that distinguishes the Indus-Sarasvati city of Dholavira in the Rann of Kutch?',
    options: [
      'High-rise stone colosseums',
      'A massive network of 16 interconnected rock-cut water reservoirs with stone dams and desilting chambers',
      'The earliest iron-smelting blast furnaces',
      'A royal subterranean crypt filled with gold sarcophagi'
    ],
    correctIndex: 1,
    explanation: 'Dholavira engineered one of the world’s most sophisticated prehistoric stormwater management systems, harvesting rainwater from the streams Mansar and Manhar into 16 stepped rock-cut reservoirs that held over 250,000 cubic meters of potable water.',
    referenceSource: 'Archaeological Survey of India (Excavations at Dholavira by R.S. Bisht); UNESCO World Heritage'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Ayanamsa',
    sanskrit: 'अयनांश',
    iast: 'Ayanāṃśa',
    category: 'Astronomy & Grahas',
    definition: 'The angular difference between the Tropical (Sayana) and Sidereal (Nirayana) zodiacs caused by the axial precession of the equinoxes (~50.29 arcseconds per year). The most common standard is the Chitrapaksha / Lahiri Ayanamsa.',
    etymology: 'Ayana (solar course) + Amsha (portion/degree).',
    scriptureReference: 'Surya Siddhanta, Madhyamadhikara; BPHS'
  },
  {
    term: 'Kalpa',
    sanskrit: 'कल्प',
    iast: 'Kalpa',
    category: 'Time & Cosmology',
    definition: 'A cosmic epoch lasting 4.32 billion solar years, representing one single daytime period of Brahma, during which the universe manifests through 14 Manvantaras.',
    etymology: 'From root klp (to order, fashion, compose, or ordain).',
    scriptureReference: 'Rigveda 10.190.3; Vishnu Purana 1.3; Bhagavad Gita 8.17'
  },
  {
    term: 'Pralaya',
    sanskrit: 'प्रलय',
    iast: 'Pralaya',
    category: 'Time & Cosmology',
    definition: 'Cosmic dissolution or return to unmanifest equilibrium. Subdivided into Nitya (momentary atomic decay), Naimittika (diurnal planetary rest of Brahma), Prakritika (complete universal elemental collapse), and Atyantika (spiritual liberation).',
    etymology: 'Pra (thorough) + laya (dissolution, melting into the source).',
    scriptureReference: 'Vishnu Purana 6.3.1-4; Bhagavata Purana 12.4'
  },
  {
    term: 'Wootz Steel',
    sanskrit: 'उक्कु / तीक्ष्ण लोह',
    iast: 'Ukku / Tīkṣṇa Loha',
    category: 'Archaeology & Metallurgy',
    definition: 'Crucible steel developed in ancient South India characterized by high carbon content (~1.5%) and ultra-fine banded iron carbide (cementite) microstructures, famed worldwide as Damascus steel.',
    etymology: 'From Kannada/Telugu "Ukku" meaning steel; described in Rasaratnasamuccaya as Tikshna Loha.',
    scriptureReference: 'Rasaratna Samuccaya, Chapter 5; Periplus of the Erythraean Sea'
  }
];
