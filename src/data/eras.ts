import { EraId } from './timelineEvents';

export interface EraDefinition {
  id: EraId;
  label: string;
  sanskritLabel: string;
  timeRange: string;
  color: string;
  description: string;
}

export const ERAS: EraDefinition[] = [
  {
    id: 'cosmology',
    label: 'Cosmology & Kalpas',
    sanskritLabel: 'सृष्टि एवं कल्प',
    timeRange: '1.97B yrs ago',
    color: '#e8913a', // gold
    description: 'Brahma’s cosmic dawn, churning of the milk ocean, and the retrieval of Earth by Varaha.'
  },
  {
    id: 'satya',
    label: 'Satya Yuga',
    sanskritLabel: 'सत्य युग (कृत)',
    timeRange: '1.728M yrs duration',
    color: '#d98591', // red mid / rose
    description: 'The Golden Age of truth and meditation, Narasimha Avatara, and Prahlada.'
  },
  {
    id: 'treta',
    label: 'Tretā Yuga',
    sanskritLabel: 'त्रेता युग',
    timeRange: '1.296M yrs duration',
    color: '#c9643e', // orange mid
    description: 'The Age of sacred sacrifice and moral order, Vamana Trivikrama, and Sri Rama of Ayodhya.'
  },
  {
    id: 'dvapara',
    label: 'Dvāpara Yuga',
    sanskritLabel: 'द्वापर युग',
    timeRange: '864k yrs duration',
    color: '#b8b062', // yellow mid
    description: 'The Age of temple worship, Sri Krishna, Kurukshetra war, and the Bhagavad Gita.'
  },
  {
    id: 'archaeology',
    label: 'Indus-Sarasvatī',
    sanskritLabel: 'सिन्धु-सरस्वती संस्कृति',
    timeRange: '7000–1900 BCE',
    color: '#86a86c', // canvas green
    description: 'Neolithic Mehrgarh to mature grid cities, maritime dockyards, and Dholavira reservoirs.'
  },
  {
    id: 'vedic',
    label: 'Vedic & Upanishadic',
    sanskritLabel: 'वैदिक एवं उपनिषद् काल',
    timeRange: '2500–600 BCE',
    color: '#6fb0b2', // brand accent cyan
    description: 'Oral compilation of the 4 Vedas along the sacred Sarasvati and non-dual Upanishadic wisdom.'
  },
  {
    id: 'classical',
    label: 'Classical Golden Age',
    sanskritLabel: 'मौर्य-गुप्त स्वर्ण युग',
    timeRange: '600 BCE–800 CE',
    color: '#9d93c9', // blue mid / purple
    description: 'Panini grammar, Ashoka edicts, Patanjali Yoga, Aryabhata astronomy, and Brahmagupta zero.'
  },
  {
    id: 'medieval',
    label: 'Medieval Renaissance',
    sanskritLabel: 'मध्यकालीन भक्ति एवं विज्ञान',
    timeRange: '800–1700 CE',
    color: '#c0463c', // red dark
    description: 'Adi Shankara Advaita, Chola Brihadisvara granite tower, Hampi, and the Kerala School of calculus.'
  },
  {
    id: 'modern',
    label: 'Modern Epoch (2026)',
    sanskritLabel: 'आधुनिक काल (२०२६)',
    timeRange: '1893 CE–Present',
    color: '#f2c47a', // gold2
    description: 'Vivekananda at Chicago, Ramanujan mathematics, space exploration, and humanity at Type 0.73.'
  },
  {
    id: 'kardashev',
    label: 'Kardashev & Dyson Horizon',
    sanskritLabel: 'भविष्य: कार्दाशेव सभ्यता',
    timeRange: '~2150 CE to ~10¹⁰⁰ CE',
    color: '#80B9E8', // stellar blue
    description: 'Planetary energy grid, Sol Dyson Swarm, galactic civilization, and the Final Observer (Type IX).'
  },
  {
    id: 'cycle',
    label: 'Cosmic Dissolution (Loop)',
    sanskritLabel: 'महाप्रलय एवं अनन्त चक्र',
    timeRange: '311.04 Trillion yrs',
    color: '#e8913a', // gold
    description: 'Mahapralaya: dissolution into the causal ocean and Vishnu in Yoganidra. The cycle begins again.'
  }
];
