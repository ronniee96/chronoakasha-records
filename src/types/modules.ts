export type MasterModuleId = 
  | 'chakra'          // Existing Historical Kalachakra Wheel
  | 'voyage3d'        // Existing 3D Dyson Cosmos
  | 'cinematic'       // Existing Cinematic Odyssey
  | 'today'           // Module 1: Today Living Timeline
  | 'cosmos'          // Module 2: Universe & Galaxies Explorer
  | 'graha'           // Module 3: Graha Mandala & Solar System
  | 'rashi'           // Module 4: Jyotisham Vedic Astrology Calculator
  | 'nakshatra'       // Module 5: 27 Nakshatra Observatory
  | 'panchang'        // Module 6: Sacred Hindu Panchang
  | 'kalachakra'      // Module 7: Cosmic Time, Yugas & Kalpas
  | 'civilizations'   // Module 8: Ancient Civilizations
  | 'scriptures'      // Module 9: Jnana Kosha Scripture Library
  | 'prophecy'        // Module 10: Bhavishya & Historical Prophecies
  | 'future'          // Module 11: Civilizations of Tomorrow & Scenarios
  | 'spacemissions'   // Module 12: Space Exploration & Live World Feed
  | 'knowledge'       // Module 13: Media Library, Quizzes & Learning Paths
  | 'mycosmos';       // Personal Vault: My Cosmic Space

export type LanguageMode = 'en' | 'hi' | 'sa';

export interface ModuleNavDef {
  id: MasterModuleId;
  labelEn: string;
  labelHi: string;
  labelSa: string;
  sanskritName: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  accentColor: string;
}
