/**
 * Chronoakasha Records — Six Pillars of Existence Architecture Types
 * अतीत · वर्तमान · सनातन · ब्रह्माण्ड · भविष्य · सभ्यता
 */

export type PillarId = 
  | 'overview'       // Blueprint Gateway: Six Pillars Master Card
  | 'past'           // Pillar 01: The Past (अतीत)
  | 'present'        // Pillar 02: The Present (वर्तमान)
  | 'hinduCosmology' // Pillar 03: Hindu Cosmology (सनातन ब्रह्माण्ड)
  | 'celestialAtlas' // Pillar 04: The Celestial Atlas (ब्रह्माण्ड दर्शन)
  | 'future'         // Pillar 05: The Future (भविष्य)
  | 'civilizations'  // Pillar 06: Future Civilizations (भविष्य सभ्यता)
  | 'jyotisham'      // Specialized System: Personal Jyotisha & Panchang
  | 'chakra'         // Legacy Core: 16-Era Kalachakra Wheel
  | 'voyage3d'       // Legacy Core: 3D Dyson Cosmos
  | 'cinematic'      // Legacy Core: Cinematic Odyssey
  | 'mycosmos';      // Personal Vault: My Chronoakasha

export type PresentationMode = 'cinematic' | 'research' | 'reading';

export type EpistemicClassification = 
  | 'A' // Established Scientific Fact
  | 'B' // Documented Historical Evidence
  | 'C' // Traditional Religious or Philosophical Teaching
  | 'D' // Scholarly Interpretation
  | 'E' // Scientific Hypothesis
  | 'F' // Mathematical or Astronomical Prediction
  | 'G' // Speculative Future Scenario
  | 'H'; // Unverified Claim

export interface EpistemicMeta {
  code: EpistemicClassification;
  labelEn: string;
  labelSa: string;
  badgeColor: string;
  description: string;
}

export const EPISTEMIC_BADGES: Record<EpistemicClassification, EpistemicMeta> = {
  A: {
    code: 'A',
    labelEn: 'Established Scientific Fact',
    labelSa: 'प्रत्यक्ष वैज्ञानिक तथ्य',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    description: 'Empirically verified observation or experimentally validated physical law.'
  },
  B: {
    code: 'B',
    labelEn: 'Documented Historical Evidence',
    labelSa: 'प्रमाणित ऐतिहासिक साक्ष्य',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    description: 'Archaeological, epigraphic, or primary textual attestations.'
  },
  C: {
    code: 'C',
    labelEn: 'Traditional Knowledge',
    labelSa: 'परम्परागत दार्शनिक ज्ञान',
    badgeColor: 'text-[#fde047] bg-[#e8913a]/10 border-[#e8913a]/30',
    description: 'Teachings preserved in sacred canonical scriptures, Puranas, or cultural memory.'
  },
  D: {
    code: 'D',
    labelEn: 'Scholarly Interpretation',
    labelSa: 'विद्वत सम्मत मीमांसा',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    description: 'Peer-reviewed academic consensus or competing scholarly translation.'
  },
  E: {
    code: 'E',
    labelEn: 'Scientific Hypothesis',
    labelSa: 'वैज्ञानिक परिकल्पना',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    description: 'Testable scientific model requiring ongoing observational confirmation.'
  },
  F: {
    code: 'F',
    labelEn: 'Astronomical Prediction',
    labelSa: 'गणितीय खगोलीय गणना',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    description: 'Deterministic outcome derived from gravitational orbital ephemerides.'
  },
  G: {
    code: 'G',
    labelEn: 'Speculative Future Scenario',
    labelSa: 'अनागत सम्भावना परिदृश्य',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    description: 'Conditional extrapolation based on technological and energy trends.'
  },
  H: {
    code: 'H',
    labelEn: 'Unverified / Disputed Claim',
    labelSa: 'अपुष्ट / विवादास्पद विवरण',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    description: 'Popular folklore, retconned prophecies, or claims lacking primary evidence.'
  }
};

export interface KnowledgeGraphNode {
  id: string;
  title: string;
  sanskritTitle?: string;
  pillar: PillarId;
  category: 'Celestial' | 'Historical' | 'Scriptural' | 'Civilizational' | 'Futuristic' | 'Technological';
  summary: string;
  epistemicCode: EpistemicClassification;
  relatedNodeIds: string[];
  attributes: Record<string, string | number | string[]>;
}

export interface KaalDarshiCitation {
  sourceTitle: string;
  authorOrLineage: string;
  publicationOrPeriod: string;
  chapterOrPage?: string;
  sourceUrl?: string;
  epistemicCode: EpistemicClassification;
}

export interface KaalDarshiResponse {
  query: string;
  epistemicClassification: EpistemicClassification;
  synthesis: string;
  sanskritPassage?: {
    devanagari: string;
    transliteration: string;
    english: string;
    source: string;
  };
  scientificCorrespondence?: string;
  citations: KaalDarshiCitation[];
  connectedPillars: PillarId[];
  suggestedCrossPillarExplorations: Array<{
    label: string;
    targetPillar: PillarId;
    nodeId?: string;
  }>;
}
