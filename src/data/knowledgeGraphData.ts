import { KnowledgeGraphNode } from '../types/sixPillars';

export const GLOBAL_KNOWLEDGE_NODES: KnowledgeGraphNode[] = [
  {
    id: 'saturn-shani',
    title: 'Saturn (Shani / शनैश्चर)',
    sanskritTitle: 'शनि मण्डल • मन्दगामी ग्रह',
    pillar: 'celestialAtlas',
    category: 'Celestial',
    summary: 'Sixth planet from the Sun, gas giant with an extensive icy ring system, known in Vedic astronomy as Shanaishchara ("slow-moving"), completing an orbit every 29.45 Earth years.',
    epistemicCode: 'A',
    relatedNodeIds: ['sun-surya', 'jupiter-guru', 'surya-siddhanta-kalpa', 'dyson-swarm-type-2'],
    attributes: {
      astronomicalDiameterKm: 120536,
      distanceFromSunAU: 9.58,
      orbitalPeriodYears: 29.45,
      knownMoonsCount: 146,
      jyotishRulerOf: ['Makara (Capricorn)', 'Kumbha (Aquarius)'],
      jyotishSignificance: 'Karaka of Karma, perseverance, discipline, deep time, and ascetic detachment.',
      majorSpaceMissions: ['Cassini-Huygens (NASA/ESA/ASI)', 'Pioneer 11', 'Voyager 1 & 2'],
      scripturalReference: 'Surya Siddhanta Chapter 2; Matsya Purana Shani Stotram; Varahamihira Brihat Samhita.'
    }
  },
  {
    id: 'sun-surya',
    title: 'Sun (Surya / सविता)',
    sanskritTitle: 'सूर्य मण्डल • जगतश्चक्षु',
    pillar: 'celestialAtlas',
    category: 'Celestial',
    summary: 'G-type main-sequence star at the center of the Solar System, containing 99.86% of the system’s mass. Revered in the Vedas as the visible soul and life-giver of all living beings.',
    epistemicCode: 'A',
    relatedNodeIds: ['saturn-shani', 'rigveda-nasadiya-sukta', 'surya-siddhanta-kalpa', 'dyson-swarm-type-2'],
    attributes: {
      luminosityWatts: '3.828 × 10²⁶ W',
      surfaceTemperatureK: 5778,
      ageYears: '4.6 billion years',
      vedicTitle: 'सविता वै देवानां प्रसविता (Savita, the generator of light and life)',
      jyotishRulerOf: ['Simha (Leo)'],
      modernObservationMissions: ['Aditya-L1 (ISRO)', 'Parker Solar Probe (NASA)', 'SOHO (ESA/NASA)'],
      scripturalReference: 'Rigveda 1.115 (Surya Sukta); Gayatri Mantra (Rigveda 3.62.10); Surya Siddhanta.'
    }
  },
  {
    id: 'indus-sarasvati-civilization',
    title: 'Indus-Sarasvati Civilization',
    sanskritTitle: 'सिन्धु-सरस्वती सभ्यता',
    pillar: 'past',
    category: 'Civilizational',
    summary: 'Bronze Age urban civilization spanning over 1 million square kilometers along the Ghaggar-Hakra and Indus river basins, featuring standardized weights, sanitation, and grid cities.',
    epistemicCode: 'B',
    relatedNodeIds: ['dholavira-hydraulic-engineering', 'sanauli-chariot-burials', 'vedic-civilization'],
    attributes: {
      chronology: '3300 BCE – 1300 BCE (Mature: 2600–1900 BCE)',
      majorMetropolises: ['Rakhigarhi', 'Dholavira', 'Mohenjo-daro', 'Harappa', 'Kalibangan', 'Lothal'],
      writingScript: 'Indus Script (Over 4,000 inscribed steatite seals and copper tablets; undeciphered)',
      sanitationAndHydraulics: 'Underground covered brick sewer networks, household terracotta drains, public baths.',
      archaeologicalSources: ['ASI Excavation Reports', 'Kenoyer & Possehl Surveys', 'Dholavira Signboard (1998)']
    }
  },
  {
    id: 'dholavira-hydraulic-engineering',
    title: 'Dholavira Cascade Reservoirs',
    sanskritTitle: 'धोलावीरा जल संरक्षण प्रणालिका',
    pillar: 'past',
    category: 'Historical',
    summary: 'UNESCO World Heritage site in Kutch, Gujarat featuring 16 massive rock-cut water reservoirs with cascading silt filters and stone check dams designed for hyper-arid climates.',
    epistemicCode: 'B',
    relatedNodeIds: ['indus-sarasvati-civilization', 'vedic-civilization'],
    attributes: {
      location: 'Khadir Bet, Rann of Kutch, Gujarat',
      reservoirCapacityLitres: 'Over 300,000 cubic meters of potable water',
      engineeringFeatures: 'Terraced cascading reservoirs, rock-cut settling tanks, sluice gates, storm drain diversion.',
      excavator: 'Archaeological Survey of India (R.S. Bisht, 1990–2005)'
    }
  },
  {
    id: 'sanauli-chariot-burials',
    title: 'Sanauli Royal Burials & Solid-Wheel Chariots',
    sanskritTitle: 'सिनौली काष्ठ रथ एवं योद्धा समाधियाँ',
    pillar: 'past',
    category: 'Historical',
    summary: 'Archaeological discovery near Delhi of c. 1900 BCE royal burial pits containing 3 solid-wheel vehicles decorated with copper triangles, anthropomorphic copper antennae swords, and gold ornaments.',
    epistemicCode: 'B',
    relatedNodeIds: ['indus-sarasvati-civilization', 'vedic-civilization'],
    attributes: {
      dating: 'c. 1900 BCE (Copper Hoard / Late Harappan / Ochre Coloured Pottery Horizon)',
      location: 'Baghpat District, Western Uttar Pradesh, Ganga-Yamuna Doab',
      findings: ['3 full-sized solid-wheel copper-embossed vehicles', 'Copper antenna swords', 'Warrior helmets', 'Copper-sheathed coffins'],
      academicDebate: 'Excavators argue for indigenous horse-associated Vedic chariot tradition; others characterize as ceremonial bullock carts.'
    }
  },
  {
    id: 'rigveda-nasadiya-sukta',
    title: 'Nasadiya Sukta (The Hymn of Creation)',
    sanskritTitle: 'नासदीय सूक्तम् • ऋग्वेद १०.१२९',
    pillar: 'hinduCosmology',
    category: 'Scriptural',
    summary: 'Famous cosmological hymn of Rigveda Mandala 10, contemplating the state prior to spacetime, matter, existence (Sat) or non-existence (Asat), asking who can truly declare how creation arose.',
    epistemicCode: 'C',
    relatedNodeIds: ['brahma-anda-cosmic-egg', 'sun-surya', 'surya-siddhanta-kalpa'],
    attributes: {
      canonicalSource: 'Rigveda Samhita 10.129.1-7',
      primaryVerse: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्...',
      scientificAnalogy: 'Quantum vacuum fluctuations and pre-inflationary singularity prior to cosmological spacetime metrics.',
      celebratedScholars: ['Carl Sagan ("Cosmos")', 'Erwin Schrödinger', 'Heinrich Zimmer', 'Max Müller']
    }
  },
  {
    id: 'surya-siddhanta-kalpa',
    title: 'Surya Siddhanta (Cosmic Time & Kalpa)',
    sanskritTitle: 'सूर्यसिद्धान्तः • कालमानम्',
    pillar: 'hinduCosmology',
    category: 'Scriptural',
    summary: 'The foundational astronomical treatise of classical India, establishing the quantitative metrics of Mahayugas (4.32 million years) and Kalpas (4.32 billion years = 1 day of Brahma).',
    epistemicCode: 'C',
    relatedNodeIds: ['kali-yuga-reset-kalki', 'sun-surya', 'saturn-shani', 'brahma-anda-cosmic-egg'],
    attributes: {
      kalpaDurationYears: '4,320,000,000 terrestrial years',
      manvantarasInKalpa: 14,
      chaturyugasInKalpa: 1000,
      currentCosmicDate: '51st divine year of Brahma, 1st Kalpa (Sveta-Varaha), 7th Manvantara (Vaivasvata), 28th Mahayuga, Kali Yuga (started 3102 BCE).',
      astronomicalAccuracy: 'Estimated Earth radiometric age of 4.54B years closely matches the Kalpa order of magnitude.'
    }
  },
  {
    id: 'kali-yuga-reset-kalki',
    title: 'Kali Yuga Culmination & Kalki Avatara',
    sanskritTitle: 'कलियुगान्त एवं कल्कि अवतार',
    pillar: 'future',
    category: 'Futuristic',
    summary: 'Puranic forecast detailing the sociopolitical degeneration of Kali Yuga, followed by the manifestation of Kalki in Shambhala to re-establish Dharma and initiate the rebirth of Satya Yuga.',
    epistemicCode: 'C',
    relatedNodeIds: ['surya-siddhanta-kalpa', 'dyson-swarm-type-2'],
    attributes: {
      puranicSources: ['Srimad Bhagavata Purana 12.2', 'Vishnu Purana 4.24', 'Kalki Purana'],
      astronomicalHorizon: 'Kali Yuga ends at ~428,899 CE in classical Puranic terrestrial metrics (or symbolic periodic renewal).',
      epistemicStatus: 'Unfulfilled / Traditional Escatological Renewal',
      dharmaReset: 'Instantaneous reset of human collective consciousness into the golden Satya Yuga.'
    }
  },
  {
    id: 'chandrayaan-3-moon-mission',
    title: 'Chandrayaan-3 (ISRO Lunar South Pole)',
    sanskritTitle: 'चन्द्रयान-३ • शिवशक्ति बिन्दु',
    pillar: 'present',
    category: 'Technological',
    summary: 'Historic lunar mission executed by the Indian Space Research Organisation (ISRO), achieving humanity’s first soft landing near the lunar south pole on August 23, 2023.',
    epistemicCode: 'A',
    relatedNodeIds: ['james-webb-space-telescope', 'sun-surya', 'antariksha-station-2035'],
    attributes: {
      landingCoordinates: '69.37° S, 32.35° E (Shiv Shakti Point)',
      landerAndRover: 'Vikram Lander and Pragyan Rover (26 kg)',
      scientificInstruments: ['ChaSTE (thermal probe)', 'ILSA (lunar seismometer)', 'APXS & LIBS (spectroscopes)'],
      discoveries: 'Direct in-situ measurement of elemental sulfur in south polar regolith and surface thermal gradient.'
    }
  },
  {
    id: 'dyson-swarm-type-2',
    title: 'Dyson Swarm & Kardashev Type II Civilization',
    sanskritTitle: 'डाइसन महासंरचना एवं द्वितीय स्तरीय सभ्यता',
    pillar: 'civilizations',
    category: 'Futuristic',
    summary: 'Astrophysical megastructure proposed by Freeman Dyson to capture the entire bolometric radiant energy output of a home star (~3.828 × 10²⁶ W for a Sun-like star).',
    epistemicCode: 'E',
    relatedNodeIds: ['sun-surya', 'kardashev-type-3-galactic'],
    attributes: {
      energyScaleWatts: '10²⁶ W (Complete stellar luminosity)',
      architecture: 'Co-orbiting constellation of millions of autonomous photovoltaic satellites or statites with solar sails.',
      infraredWasteHeat: 'Emits detectable excess mid-infrared blackbody radiation (300 K) via conservation of energy.',
      searchTechnosignatures: ['Project Hephaistos (searching 5 million Gaia/WISE stars for Dyson candidates)']
    }
  },
  {
    id: 'kardashev-type-3-galactic',
    title: 'Kardashev Type III Galactic Civilization',
    sanskritTitle: 'आकाशगंगा व्यापी सभ्यता (Type III)',
    pillar: 'civilizations',
    category: 'Futuristic',
    summary: 'Civilization capable of harnessing energy on the scale of an entire galaxy (~10³⁷ W for the Milky Way), coordinating stellar lifting, galactic communication networks, and self-replicating probes.',
    epistemicCode: 'G',
    relatedNodeIds: ['dyson-swarm-type-2', 'laniakea-supercluster'],
    attributes: {
      energyScaleWatts: '10³⁷ W',
      astrophysicalFootprint: 'Total colonization of ~100–400 billion stellar systems via relativistic von Neumann probes.',
      timeRequired: 'Estimated 1 to 10 million years using sub-light interstellar travel (v ~ 0.05c to 0.1c).'
    }
  },
  {
    id: 'laniakea-supercluster',
    title: 'Laniakea Supercluster (Indra-Jala of Galaxies)',
    sanskritTitle: 'लानियाकेया महापुंज • इन्द्रजाल',
    pillar: 'celestialAtlas',
    category: 'Celestial',
    summary: 'The colossal gravitational basin of attraction encompassing over 100,000 galaxies across 520 million light-years, flowing along cosmic web filaments toward the Great Attractor.',
    epistemicCode: 'A',
    relatedNodeIds: ['kardashev-type-3-galactic', 'brahma-anda-cosmic-egg'],
    attributes: {
      extentLightYears: '520,000,000 light-years',
      massSolarMasses: '10¹⁷ solar masses',
      constituentClusters: ['Virgo Cluster', 'Centaurus Cluster', 'Hydra Cluster', 'Norma Cluster'],
      discoveryYear: 2014,
      vedicAnalogy: 'The interconnected infinite jewel-net of Indra (Indrajala) where every vertex reflects all other jewels.'
    }
  }
];
