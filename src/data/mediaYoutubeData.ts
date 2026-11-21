export interface MediaKnowledgeRecord {
  id: string;
  title: string;
  channel: string;
  url: string;
  category: 'Hindu Cosmology' | 'Vedic & Ancient Astronomy' | 'Nakshatras & Jyotish' | 'Ancient Civilizations & Archaeology' | 'Astrophysics & Space' | 'Future Civilizations & Kardashev';
  publicationYear: number;
  description: string;
  keySubjects: string[];
  timestamps: Array<{ time: string; topic: string }>;
  referencedResearchAndBooks: string[];
  reliabilityClassification: 'Primary Scientific Source' | 'Academic Publication' | 'Official Institution' | 'Established Historical Reference' | 'Educational Commentary' | 'Personal / Philosophical Interpretation';
  epistemicNotes: string;
  relatedChronoakashaModule: string;
}

export const MEDIA_KNOWLEDGE_LIBRARY: MediaKnowledgeRecord[] = [
  {
    id: 'sagan-cosmos-hindu-time',
    title: 'Carl Sagan on Hindu Cosmology & Cosmic Time Scales (Cosmos Episode 10)',
    channel: 'Cosmos: A Personal Voyage (PBS / Carl Sagan Archive)',
    url: 'https://www.youtube.com/watch?v=uq1C6RoQN3U',
    category: 'Hindu Cosmology',
    publicationYear: 1980,
    description: 'Dr. Carl Sagan travels to southern India to examine Chola bronze sculptures of Shiva Nataraja (the cosmic dance of creation and destruction) and reflects on the astonishing resonance between Hindu cosmological cycles (Kalpas of 4.32 billion years) and modern astrophysics.',
    keySubjects: ['Shiva Nataraja', 'Cosmic Cycles', 'Kalpas and Mahayugas', 'Deep Time', 'Modern Big Bang cosmology'],
    timestamps: [
      { time: '0:00', topic: 'Introduction at Brihadisvara Temple, Thanjavur' },
      { time: '1:45', topic: 'Shiva Nataraja iconography: drum of creation & flame of destruction' },
      { time: '3:20', topic: 'Comparison of Hindu Kalpa (4.32 billion years) to Earth’s radiometric age' },
      { time: '5:10', topic: 'Cyclic universes and cosmic rebirth across infinite eons' }
    ],
    referencedResearchAndBooks: [
      'Carl Sagan — "Cosmos" (Random House, 1980)',
      'Heinrich Zimmer — "Myths and Symbols in Indian Art and Civilization" (Princeton, 1946)',
      'Surya Siddhanta astronomical calculations'
    ],
    reliabilityClassification: 'Established Historical Reference',
    epistemicNotes: 'Dr. Sagan accurately notes that ancient Hindu cosmology is the only traditional worldview that calculated billions of years for cosmic cycles. Sagan highlights the philosophical elegance while maintaining strict scientific distinction between poetic/religious cosmology and empirical observational physics.',
    relatedChronoakashaModule: 'kalachakra',
  },
  {
    id: 'isro-chandrayaan-aditya-exploration',
    title: 'ISRO Chandrayaan-3 & Aditya-L1: India’s Modern Lunar & Solar Science',
    channel: 'ISRO Official Documentary / Doordarshan Archive',
    url: 'https://www.youtube.com/watch?v=DLA_64yz8Ss',
    category: 'Astrophysics & Space',
    publicationYear: 2023,
    description: 'Official documentary detailing the historic soft landing of Chandrayaan-3 near the lunar South Pole and the orbital insertion of Aditya-L1 at the Sun-Earth Lagrange Point 1 to study coronal heating and solar wind dynamics.',
    keySubjects: ['Chandrayaan-3', 'Vikram Lander & Pragyan Rover', 'Aditya-L1', 'Lagrange Point 1', 'Lunar Regolith Thermal Conductivity'],
    timestamps: [
      { time: '0:00', topic: 'Descent trajectory towards the Lunar South Pole' },
      { time: '4:15', topic: 'ChaSTE instrument measuring lunar sub-surface temperatures' },
      { time: '8:30', topic: 'Aditya-L1 VELC payload observing solar magnetic reconnection' }
    ],
    referencedResearchAndBooks: [
      'ISRO Chandrayaan-3 Mission Science Reports (2023)',
      'Aditya-L1 Payloads Design & Solar Coronal Science (Current Science, 2023)'
    ],
    reliabilityClassification: 'Official Institution',
    epistemicNotes: 'Peer-reviewed telemetry and empirical experimental results collected directly by operational spacecraft instruments on the lunar surface and at the L1 halo orbit.',
    relatedChronoakashaModule: 'spacemissions',
  },
  {
    id: 'kardashev-civilizations-isaac-arthur',
    title: 'The Kardashev Scale: Type I, Type II, and Megastructure Civilizations',
    channel: 'Science & Futurism with Isaac Arthur (SFIA)',
    url: 'https://www.youtube.com/watch?v=3Wtgv9q2C6M',
    category: 'Future Civilizations & Kardashev',
    publicationYear: 2021,
    description: 'Rigorous physics-based analysis of Nikolai Kardashev’s energy scale. Explores the physical feasibility of Dyson Swarms, orbital statites, Matrioshka brains, Shkadov thrusters, and planetary heat dissipation limits.',
    keySubjects: ['Kardashev Scale', 'Dyson Swarm vs Sphere', 'Stellar Lifting', 'Shkadov Thruster', 'Thermodynamic Waste Heat'],
    timestamps: [
      { time: '0:00', topic: 'Nikolai Kardashev 1964 paper overview' },
      { time: '5:20', topic: 'Type I planetary energy harnessing and climate thermal ceilings' },
      { time: '12:40', topic: 'Type II Dyson Swarm construction using Mercury matter disassembly' },
      { time: '21:15', topic: 'Type III galactic communications and relativistic limitations' }
    ],
    referencedResearchAndBooks: [
      'Nikolai Kardashev — "Transmission of Information by Extraterrestrial Civilizations" (1964)',
      'Freeman Dyson — "Search for Artificial Stellar Sources of Infrared Radiation" (Science, 1960)'
    ],
    reliabilityClassification: 'Educational Commentary',
    epistemicNotes: 'High-quality physics and engineering analysis anchored in established thermodynamics and orbital mechanics. Recognizes speculative engineering assumptions while avoiding pseudoscientific shortcuts.',
    relatedChronoakashaModule: 'future',
  },
  {
    id: 'rakhigarhi-dholavira-asi-archaeology',
    title: 'Dholavira & Rakhigarhi: Water Management & Genomic History of the Indus Civilization',
    channel: 'Archaeological Survey of India & IIT Gandhinagar Archaeological Series',
    url: 'https://www.youtube.com/watch?v=8V7ZkP9g0Qo',
    category: 'Ancient Civilizations & Archaeology',
    publicationYear: 2022,
    description: 'Detailed archaeological exploration of Dholavira’s UNESCO World Heritage hydraulic infrastructure in the Rann of Kutch and Rakhigarhi’s ancient DNA excavations revealing indigenous continuous genetic ancestry.',
    keySubjects: ['Dholavira Water Harvesting', 'Rakhigarhi Ancient DNA', 'Urban Planning', 'Steatite Seals', 'UNESCO World Heritage'],
    timestamps: [
      { time: '0:00', topic: 'Excavation of Dholavira’s rock-cut reservoirs' },
      { time: '6:30', topic: 'Standardized brick proportions (4:2:1) across 1,000 km' },
      { time: '14:20', topic: 'Shinde et al. (Cell, 2019) Rakhigarhi skeletal DNA analysis' }
    ],
    referencedResearchAndBooks: [
      'R.S. Bisht — "Excavations at Dholavira 1990–2005" (Archaeological Survey of India)',
      'Shinde, Narasimhan, Reich et al. — "An Ancient Harappan Genome" (Cell, 2019)'
    ],
    reliabilityClassification: 'Academic Publication',
    epistemicNotes: 'Primary archaeological excavation documentation combined with peer-reviewed paleogenomic sequencing published in high-impact journals.',
    relatedChronoakashaModule: 'civilizations',
  },
  {
    id: 'vedic-astronomy-subhash-kak',
    title: 'Archaeoastronomy of the Rigveda and the Fire Altar Geometry',
    channel: 'Center for Indic Studies / Academic Lecture Series',
    url: 'https://www.youtube.com/watch?v=9L1gXw8E3K0',
    category: 'Vedic & Ancient Astronomy',
    publicationYear: 2020,
    description: 'Prof. Subhash Kak examines the astronomical codes embedded in the Rigvedic fire altar constructions (Shyena Chiti), demonstrating that the altar layer brick ratios preserve the ratio of the solar and lunar synodic cycles and planetary periods.',
    keySubjects: ['Shulba Sutras', 'Fire Altar Astronomy', 'Rigvedic Astronomical Code', 'Nakshatra Counting', 'Archaeoastronomy'],
    timestamps: [
      { time: '0:00', topic: 'The structure of the Agnicayana ritual' },
      { time: '8:45', topic: '360 enclosing stones and 360 days of the civil year' },
      { time: '18:20', topic: 'Baudhayana Shulba Sutra geometric proofs' }
    ],
    referencedResearchAndBooks: [
      'Subhash Kak — "The Astronomical Code of the Rgveda" (Munshiram Manoharlal, 2000)',
      'Frits Staal — "Agni: The Vedic Ritual of the Fire Altar" (1983)'
    ],
    reliabilityClassification: 'Academic Publication',
    epistemicNotes: 'Represents peer-reviewed archaeoastronomical analysis of ritual geometry. Compares textually attested brick counts with known astronomical periods.',
    relatedChronoakashaModule: 'scriptures',
  }
];
