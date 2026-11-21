export interface CivilizationRecord {
  id: string;
  name: string;
  sanskritName: string;
  geographicalRegion: string;
  timeRange: string;
  flourishingCenturies: string;
  majorCitiesOrSites: string[];
  keyAchievements: string[];
  astronomicalKnowledge: string;
  mathematicalSystem: string;
  metallurgyAndMaterials: string;
  writingSystem: string;
  comparativeLegacy: string;
  color: string;
}

export const ANCIENT_CIVILIZATIONS: CivilizationRecord[] = [
  {
    id: 'indus-sarasvati',
    name: 'Indus-Sarasvati Civilization',
    sanskritName: 'सिन्धु-सरस्वती सभ्यता',
    geographicalRegion: 'Northwestern Indian Subcontinent (Ghaggar-Hakra & Indus basins)',
    timeRange: '3300 BCE — 1300 BCE (Mature: 2600–1900 BCE)',
    flourishingCenturies: '26th – 19th Century BCE',
    majorCitiesOrSites: ['Rakhigarhi', 'Dholavira', 'Mohenjo-daro', 'Harappa', 'Kalibangan', 'Lothal'],
    keyAchievements: [
      'Advanced urban grid planning with underground covered sewage and drainage',
      'Sophisticated hydraulic engineering: Dholavira’s 16 rock-cut reservoirs with cascading filters',
      'Binary and decimal standardized stone weights (accurate to fractions of a gram)',
      'World’s oldest known tidal dockyard and maritime port at Lothal'
    ],
    astronomicalKnowledge: 'Urban alignments oriented precisely to cardinal directions and celestial meridian. Dholavira and Kalibangan streets aligned with the solstice sunrises and Pleiades (Krittika).',
    mathematicalSystem: 'Dual binary-decimal system with standard ratios 1:2:4:8:16:32 and precise decimal subdivisions down to 1.704 mm on ivory rulers.',
    metallurgyAndMaterials: 'High-tin bronze casting (Lost-wax "cire perdue" Dancing Girl of Mohenjo-daro), copper drills, micro-steatite beads, and gold craftsmanship.',
    writingSystem: 'Indus Script (over 4,000 inscribed steatite seals, copper tablets, and the Dholavira signpost; undeciphered corpus).',
    comparativeLegacy: 'Covered over 1 million square kilometers—exceeding contemporary Egypt and Mesopotamia combined. Demonstrates voluntary civic order with no royal palace fortifications or mass warfare weaponry.',
    color: '#e8913a',
  },
  {
    id: 'vedic-sarasvati',
    name: 'Vedic Civilization',
    sanskritName: 'वैदिक सभ्यता',
    geographicalRegion: 'Aryavarta (Sapta Sindhu & Gangetic Plain)',
    timeRange: 'c. 2500 BCE — 500 BCE',
    flourishingCenturies: '2nd – 1st Millennium BCE',
    majorCitiesOrSites: ['Hastinapura', 'Ayodhya', 'Kashi (Varanasi)', 'Kurukshetra', 'Taxila (Takshashila)', 'Ujjain'],
    keyAchievements: [
      'Rigorous oral mnemonic preservation system (Pathas: Pada, Krama, Jata, Ghana) preserving texts unchanged across millennia',
      'Shulba Sutras of Baudhayana & Apastamba containing the earliest geometric formulations of the Pythagorean theorem',
      'Invention of Wootz steel (Ukku) crucible metallurgy exported worldwide as Damascus blades',
      'Foundational philosophy of non-dual consciousness (Advaita), Yoga, and Ayurveda'
    ],
    astronomicalKnowledge: '27/28 Nakshatra ecliptic division, precession of equinoxes, Uttarayana/Dakshinayana solstice cycles recorded in Vedanga Jyotisha and Surya Siddhanta.',
    mathematicalSystem: 'Birthplace of the decimal place-value system with zero (Shunya), combinatorics (Pingala’s Chandas Shastra), and exact square root extraction algorithms.',
    metallurgyAndMaterials: 'Smelting of pure copper, zinc distillation (Zawar mines, earliest industrial zinc production), and corrosion-resistant forge-welded iron (Iron Pillar of Delhi).',
    writingSystem: 'Initially sacred oral audition (Shruti / Smriti); later Brahmi script, the ancestor of Devanagari, Tibetan, Thai, and South Asian scripts.',
    comparativeLegacy: 'Continuous living civilizational matrix whose philosophical, linguistic (Sanskrit), and astronomical traditions survive unbroken to the modern day.',
    color: '#f59e0b',
  },
  {
    id: 'mesopotamia-sumer-babylon',
    name: 'Mesopotamian Civilization (Sumer & Babylon)',
    sanskritName: 'मेसोपोटामिया • सुमेर एवं बाबिल',
    geographicalRegion: 'Tigris-Euphrates River Basin (Modern Iraq & Kuwait)',
    timeRange: 'c. 4500 BCE — 539 BCE',
    flourishingCenturies: '3rd – 1st Millennium BCE',
    majorCitiesOrSites: ['Ur', 'Uruk', 'Babylon', 'Nippur', 'Nineveh', 'Eridu'],
    keyAchievements: [
      'Invention of the potter’s wheel and wheeled transport',
      'Monumental mud-brick stepped temples (Ziggurats)',
      'Earliest codified legal statutes (Code of Hammurabi)',
      'Systematic irrigation canals managing river floodwaters'
    ],
    astronomicalKnowledge: 'Comprehensive astronomical diaries (Enuma Anu Enlil) recording planetary cycles of Venus (Ammisaduqa tablet) and defining the 12 signs of the zodiac (30 degrees each).',
    mathematicalSystem: 'Sexagesimal (base-60) positional numeral system, giving modern humanity 60 seconds in a minute, 60 minutes in an hour, and 360 degrees in a circle.',
    metallurgyAndMaterials: 'Extensive bronze smelting, lapis lazuli trade with Badakhshan and Meluhha (Indus), glazed architectural bricks (Ishtar Gate).',
    writingSystem: 'Cuneiform script impressed into wet clay tablets with wedge-shaped reeds.',
    comparativeLegacy: 'Pioneered early mathematics and astronomical record-keeping, heavily influencing Hellenistic, Persian, and Mediterranean astronomy.',
    color: '#3b82f6',
  },
  {
    id: 'nile-egypt',
    name: 'Ancient Egyptian Civilization',
    sanskritName: 'प्राचीन मिस्र सभ्यता',
    geographicalRegion: 'Nile Valley (Northeast Africa)',
    timeRange: 'c. 3100 BCE — 30 BCE',
    flourishingCenturies: 'Old, Middle & New Kingdoms (27th – 11th Century BCE)',
    majorCitiesOrSites: ['Memphis', 'Thebes (Luxor)', 'Giza', 'Alexandria', 'Amarna'],
    keyAchievements: [
      'Monumental stone architecture: Great Pyramid of Khufu (aligned to true north within 4 minutes of arc)',
      'Advanced preservation of biological tissue through mummification and embalming chemistry',
      'Papyrus manufacture creating the world’s first flexible, portable writing substrate',
      'Extensive quarrying and transportation of multi-ton granite megaliths'
    ],
    astronomicalKnowledge: '365-day solar calendar calibrated by the heliacal rising of Sirius (Sopdet) preceding the annual Nile inundation; decanal star clocks tracking night hours.',
    mathematicalSystem: 'Base-10 hieroglyphic system using unit fractions (Rhind Mathematical Papyrus) for surveying agricultural fields and calculating pyramid volume.',
    metallurgyAndMaterials: 'Gold mining and beating, faience glass ceramics, electrum alloys, bronze casting.',
    writingSystem: 'Hieroglyphic sacred script, cursive Hieratic, and later Demotic scripts; deciphered via the Rosetta Stone.',
    comparativeLegacy: 'Monumental architectural iconography that defined human aspirations of immortality and cosmic alignment for millennia.',
    color: '#a855f7',
  },
  {
    id: 'mesoamerican-maya',
    name: 'Maya Civilization',
    sanskritName: 'माया सभ्यता • मध्य अमेरिका',
    geographicalRegion: 'Mesoamerica (Modern Mexico, Guatemala, Belize, Honduras)',
    timeRange: 'c. 2000 BCE — 1500 CE (Classic: 250–900 CE)',
    flourishingCenturies: '3rd – 9th Century CE',
    majorCitiesOrSites: ['Tikal', 'Chichen Itza', 'Palenque', 'Calakmul', 'Copan'],
    keyAchievements: [
      'Corbel-vaulted stone stepped pyramids and astronomical observatories (El Caracol)',
      'Independent discovery of the zero concept in mathematics',
      'Interlocking calendar systems tracking celestial cycles over multi-thousand-year spans',
      'Terraced hillside agriculture and limestone cenote water storage'
    ],
    astronomicalKnowledge: 'Extremely accurate Venus synodic period (583.92 days recorded in Dresden Codex, error < 1 day in 500 years); solar eclipse warning tables and lunar month calculations.',
    mathematicalSystem: 'Vigesimal (base-20) numeral system using dots (1), bars (5), and shell symbols (0).',
    metallurgyAndMaterials: 'Expert knapping of volcanic obsidian for surgical blades and ritual weapons; jadeite carving, lime stucco.',
    writingSystem: 'Logographic and syllabic Maya hieroglyphic script written in accordion bark-paper codices and carved on stone stelae.',
    comparativeLegacy: 'Sophisticated indigenous American astronomical and mathematical civilization that achieved high mathematical precision without metal tools or draft animals.',
    color: '#10b981',
  },
  {
    id: 'classical-greece',
    name: 'Classical Greek Civilization',
    sanskritName: 'ग्रीक सभ्यता • यवन',
    geographicalRegion: 'Aegean Basin, Peloponnese & Mediterranean colonies',
    timeRange: 'c. 800 BCE — 146 BCE',
    flourishingCenturies: '5th – 3rd Century BCE',
    majorCitiesOrSites: ['Athens', 'Sparta', 'Alexandria', 'Corinth', 'Syracuse', 'Miletus'],
    keyAchievements: [
      'Foundational axiomatic deductive mathematics: Euclid’s Elements and Archimedean mechanics',
      'The Antikythera Mechanism: World’s earliest analog astronomical computer with differential gearing',
      'Systematic philosophical discourse: Socrates, Plato, Aristotle',
      'Development of theatrical tragedy, comedy, and democratic civic institutions'
    ],
    astronomicalKnowledge: 'Geocentric spherical astronomy (Eudoxus, Hipparchus discovering precession, Ptolemaic epicycles) and Aristarchus of Samos proposing the earliest heliocentric hypothesis.',
    mathematicalSystem: 'Alphabetic numeral system with rigorous axiomatic proofs and geometric algebra.',
    metallurgyAndMaterials: 'High-grade bronze and wrought iron, marble architectural sculpture (Parthenon), advanced ceramic pottery.',
    writingSystem: 'Greek Alphabet (derived from Phoenician, adding distinct vowel glyphs).',
    comparativeLegacy: 'Formed the intellectual grammar of Western philosophy, formal logic, and scientific methodology.',
    color: '#06b6d4',
  },
  {
    id: 'ancient-china',
    name: 'Ancient & Classical China',
    sanskritName: 'प्राचीन चीन सभ्यता',
    geographicalRegion: 'Yellow River (Huang He) and Yangtze River Basins',
    timeRange: 'c. 2070 BCE — 220 CE (Shang, Zhou, Han Dynasties)',
    flourishingCenturies: '1st Millennium BCE – Han Dynasty',
    majorCitiesOrSites: ['Chang\'an (Xi\'an)', 'Luoyang', 'Anyang', 'Linzi'],
    keyAchievements: [
      'The Four Great Inventions: Compass (Sinan), Papermaking, Gunpowder, and Woodblock Printing',
      'World’s first seismoscope by Zhang Heng (132 CE) detecting distant earthquakes with brass dragons',
      'Blast furnaces producing cast iron over 1,500 years before European industrialization',
      'The Great Wall engineering and the Grand Canal transport system'
    ],
    astronomicalKnowledge: 'Meticulous catalog of guest stars (Supernova SN 1054 creating the Crab Nebula), solar sunspot records, 28 Lunar Mansions (Xiu), and armillary spheres.',
    mathematicalSystem: 'Decimal counting rods system with rod numerals, matrix solving, and computation of Pi to seven decimal places by Zu Chongzhi.',
    metallurgyAndMaterials: 'Superb bronze vessel casting, high-temperature porcelain kilns, sericulture (silk), and hydraulic cast-iron trip hammers.',
    writingSystem: 'Chinese Logographs (Oracle bone script evolving into Hanzi characters).',
    comparativeLegacy: 'Unmatched continuous bureaucratic and scientific documentation preserving thousands of years of empirical astronomical, seismic, and medical data.',
    color: '#ec4899',
  }
];
