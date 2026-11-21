export interface YugaDefinition {
  name: string;
  sanskrit: string;
  durationYears: number;
  divineYears: number;
  dharmaRatio: string; // e.g. "4/4 (100% Bull of Dharma stands on 4 legs)"
  virtuePrevalent: string;
  primaryAvatara: string;
  humanLifespanTradition: string;
  description: string;
  characteristics: string[];
}

export interface CosmicTimeScale {
  currentDateEstimate: {
    brahmaAgeYears: number; // 50 divine years elapsed = ~155.52 trillion solar years
    currentKalpa: string;
    kalpaNumber: number; // 1st Kalpa of 51st year
    currentManvantara: string;
    manvantaraIndex: number; // 7th out of 14 (Vaivasvata)
    currentMahayuga: number; // 28th out of 71
    currentYuga: string;
    kaliYugaElapsedYears: number; // 5,127 years elapsed (began 3102 BCE at Krishna departure)
    kaliYugaRemainingYears: number; // 426,873 years remaining
  };
  yugas: YugaDefinition[];
  largerCycles: Array<{
    name: string;
    sanskrit: string;
    durationYears: string;
    numericalYears: number;
    description: string;
    scientificAnalogy: string;
  }>;
  fourteenLokas: Array<{
    level: number;
    name: string;
    sanskrit: string;
    type: 'Urdhva Loka (Higher Realms)' | 'Bhu Loka (Earthly Realm)' | 'Adho Loka (Nether Realms)';
    inhabitants: string;
    significance: string;
  }>;
}

export const KALACHAKRA_COSMOLOGY: CosmicTimeScale = {
  currentDateEstimate: {
    brahmaAgeYears: 155520000000000,
    currentKalpa: 'Śveta-Vārāha Kalpa (श्वेत-वराह कल्प)',
    kalpaNumber: 1,
    currentManvantara: 'Vaivasvata Manvantara (वैवस्वत मन्वन्तर)',
    manvantaraIndex: 7,
    currentMahayuga: 28,
    currentYuga: 'Kali Yuga (कलियुग)',
    kaliYugaElapsedYears: 5127,
    kaliYugaRemainingYears: 426873,
  },
  yugas: [
    {
      name: 'Satya Yuga (Krita Yuga)',
      sanskrit: 'सत्ययुग / कृतयुग',
      durationYears: 1728000,
      divineYears: 4800,
      dharmaRatio: '4/4 (100% — Bull of Dharma stands firm on all 4 legs: Satya, Tapas, Shaucha, Daya)',
      virtuePrevalent: 'Meditation (Dhyana) & Absolute Truthfulness',
      primaryAvatara: 'Matsya, Kurma, Varaha, Narasimha',
      humanLifespanTradition: '100,000 years (symbolic of primal physiological equilibrium)',
      description: 'The Golden Age of unclouded spiritual clarity. Beings abide directly in the knowledge of the Supreme Self with no disease, deceit, or conflict.',
      characteristics: [
        'Universal alignment with cosmic law (Rta)',
        'Spontaneous manifestation of sustenance without destructive agriculture',
        'Absence of state penal machinery; voluntary self-governance',
        'Direct perceptual communion between mortal consciousness and celestial beings'
      ]
    },
    {
      name: 'Treta Yuga',
      sanskrit: 'त्रेतायुग',
      durationYears: 1296000,
      divineYears: 3600,
      dharmaRatio: '3/4 (75% — Bull stands on 3 legs)',
      virtuePrevalent: 'Sacrifice (Yajna) & Righteous Knowledge',
      primaryAvatara: 'Vamana, Parashurama, Sri Rama',
      humanLifespanTradition: '10,000 years',
      description: 'The Silver Age. Intellect awakens to duality. Ceremonial knowledge, agriculture, kingdom governance, and duty are codified to preserve righteousness.',
      characteristics: [
        'Emergence of cities, monarchies, and institutional statecraft',
        'Codification of the Vedic rituals (Yajna) to maintain environmental equilibrium',
        'Ascent of Maryada Purushottama (Sri Rama) setting the ideal of ethical kingship',
        'First emergence of subtle pride and attachment to sensory possessions'
      ]
    },
    {
      name: 'Dvapara Yuga',
      sanskrit: 'द्वापरयुग',
      durationYears: 864000,
      divineYears: 2400,
      dharmaRatio: '2/4 (50% — Bull stands on 2 legs: Satya and Daya)',
      virtuePrevalent: 'Temple Worship (Archana) & Textual Compilation',
      primaryAvatara: 'Balarama, Sri Krishna, Veda Vyasa',
      humanLifespanTradition: '1,000 years',
      description: 'The Bronze Age. Righteousness and vice balance equally. Society becomes technologically sophisticated yet susceptible to factional discord.',
      characteristics: [
        'Division of the single Veda into four by Maharshi Veda Vyasa',
        'Massive geopolitical alliances and advanced military engineering (Kurukshetra War)',
        'Delivering of the eternal philosophical summit: Srimad Bhagavad Gita',
        'Increasing physical ailments requiring systematization of Ayurveda'
      ]
    },
    {
      name: 'Kali Yuga',
      sanskrit: 'कलियुग',
      durationYears: 432000,
      divineYears: 1200,
      dharmaRatio: '1/4 (25% — Bull stands solely on Satya (Truth))',
      virtuePrevalent: 'Name Chanting (Nama Sankirtana) & Philanthropy (Dana)',
      primaryAvatara: 'Buddha, Kalki (at the conclusion of the epoch)',
      humanLifespanTradition: '100 years',
      description: 'The Iron Age. Spiritual intuition declines, materialistic sciences soar, and societal bonds fracture. Commenced in 3102 BCE at the astronomical departure of Sri Krishna.',
      characteristics: [
        'Predominance of material sciences, technological externalization, and digital networks',
        'Decline of physical resilience accompanied by spiritual accessibility through simple devotion',
        'Global civilizational interconnectedness coupled with ecological exploitation',
        'Concludes with the arrival of Kalki Avatara to inaugurate the rebirth of Satya Yuga'
      ]
    }
  ],
  largerCycles: [
    {
      name: 'Chaturyuga / Mahayuga',
      sanskrit: 'चतुर्युग / महायुग',
      durationYears: '4.32 Million Solar Years',
      numericalYears: 4320000,
      description: 'One complete four-epoch cycle (Satya + Treta + Dvapara + Kali). The ratio is 4:3:2:1.',
      scientificAnalogy: 'Matches the typical duration of geological speciation and planetary magnetic reversals.'
    },
    {
      name: 'Manvantara',
      sanskrit: 'मन्वन्तर',
      durationYears: '308.448 Million Solar Years (71 Mahayugas + Sandhi)',
      numericalYears: 308448000,
      description: 'The reign of one Manu (progenitor). 14 Manvantaras occur in one day of Brahma. We are in the 7th (Vaivasvata).',
      scientificAnalogy: 'Comparable to the Galactic Year (time taken for the Solar System to orbit the Milky Way core: ~230-250M years).'
    },
    {
      name: 'Kalpa (A Day of Brahma)',
      sanskrit: 'कल्प (ब्रह्मणो दिनम्)',
      durationYears: '4.32 Billion Solar Years (1,000 Mahayugas)',
      numericalYears: 4320000000,
      description: 'One diurnal waking cycle of Brahma. Followed by an equal night of dissolution (Naimittika Pralaya).',
      scientificAnalogy: 'Matches almost exactly the scientific age of planet Earth (~4.54 billion years).'
    },
    {
      name: 'Maha Kalpa (Lifespan of Brahma)',
      sanskrit: 'महाकल्प (ब्रह्मणः परमायुः)',
      durationYears: '311.04 Trillion Solar Years (100 Brahma Years)',
      numericalYears: 311040000000000,
      description: 'Total lifespan of one secondary creator (Brahma). At completion, the universe enters Prakritika Maha-Pralaya, dissolving into Sri Vishnu in Yoganidra.',
      scientificAnalogy: 'Exceeds the current age of our observable universe (13.8 billion years) by over 22,000 times, matching deep time multiverse models.'
    }
  ],
  fourteenLokas: [
    { level: 7, name: 'Satya Loka (Brahma Loka)', sanskrit: 'सत्यलोक', type: 'Urdhva Loka (Higher Realms)', inhabitants: 'Brahma, liberated Rishis, non-returning souls', significance: 'Highest realm of absolute truth and unmanifest meditation' },
    { level: 6, name: 'Tapa Loka', sanskrit: 'तपोलोक', type: 'Urdhva Loka (Higher Realms)', inhabitants: 'Vairagis, Kumaras, ascetic sages', significance: 'Plane of intense spiritual Tapasya and indestructible energy' },
    { level: 5, name: 'Jana Loka', sanskrit: 'जनलोक', type: 'Urdhva Loka (Higher Realms)', inhabitants: 'Sons of Brahma, enlightened masters', significance: 'Realm of creative cosmic thought and wisdom' },
    { level: 4, name: 'Mahar Loka', sanskrit: 'महर्लोक', type: 'Urdhva Loka (Higher Realms)', inhabitants: 'Bhrigu, Markandeya and long-lived seers', significance: 'Threshold realm unaffected by diurnal planetary destruction' },
    { level: 3, name: 'Svar Loka (Svarga)', sanskrit: 'स्वर्गलोक', type: 'Urdhva Loka (Higher Realms)', inhabitants: 'Indra, Devas, Gandharvas, Apsaras', significance: 'Celestial realm of reward, divine music, and joy' },
    { level: 2, name: 'Bhuvar Loka', sanskrit: 'भुवर्लोक', type: 'Urdhva Loka (Higher Realms)', inhabitants: 'Siddhas, Munis, astral beings', significance: 'Atmospheric and planetary orbital space connecting Earth to the Sun' },
    { level: 1, name: 'Bhu Loka (Prithvi)', sanskrit: 'भूलोक', type: 'Bhu Loka (Earthly Realm)', inhabitants: 'Humans, animals, flora, mineral kingdom', significance: 'The terrestrial field of action (Karma Kshetra) where souls evolve' },
    { level: -1, name: 'Atala Loka', sanskrit: 'अतल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Bala, sorcerers, illusionists', significance: 'Subterranean luxury and sensuous material technology' },
    { level: -2, name: 'Vitala Loka', sanskrit: 'वितल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Hatakeshvara (Shiva aspect), gold elementals', significance: 'Depths of golden subterranean alchemy and subterranean rivers' },
    { level: -3, name: 'Sutala Loka', sanskrit: 'सुतल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Mahabali (devoted king) protected by Vamana', significance: 'Sanctified nether kingdom endowed with greater comfort than Svarga' },
    { level: -4, name: 'Talatala Loka', sanskrit: 'तलातल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Maya Danava (supreme architect of asuras)', significance: 'Realm of supreme mechanical, architectural, and illusionist science' },
    { level: -5, name: 'Mahatala Loka', sanskrit: 'महातल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Multi-hooded serpents (Kuhaka, Takshaka)', significance: 'Subterranean serpent kingdom guarding deep planetary crust' },
    { level: -6, name: 'Rasatala Loka', sanskrit: 'रसातल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Daityas, Danavas, Panis', significance: 'Subtle netherworld opposing the celestial hierarchy' },
    { level: -7, name: 'Patala Loka (Nagaloka)', sanskrit: 'पाताल', type: 'Adho Loka (Nether Realms)', inhabitants: 'Vasuki, Sesha Naga supporting the earth', significance: 'Bottom-most realm crowned with wish-granting jewels illuminating the abyss' }
  ]
};
