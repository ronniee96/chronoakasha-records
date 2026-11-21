'use client';

import React, { useState } from 'react';
import { X, Calendar, Sparkles, Flame, Compass, ChevronRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TodayCosmicModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode: boolean;
  onJumpToEra: (eraIndex: number) => void;
}

export function TodayCosmicModal({
  isOpen,
  onClose,
  isLightMode,
  onJumpToEra,
}: TodayCosmicModalProps) {
  const [selectedYugaTab, setSelectedYugaTab] = useState<'satya' | 'treta' | 'dvapara' | 'kali'>('kali');

  if (!isOpen) return null;

  // Real-time calendar formatting
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const gregorianDate = today.toLocaleDateString('en-US', options);

  // Yuga Historical Records for "Today in Cosmic History"
  const YUGA_RECORDS = {
    satya: {
      name: 'Satya Yuga (Kṛta Yuga)',
      sanskrit: 'सत्य युग • कृत युग (परम सत्य एवं धर्म काल)',
      span: '1,728,000 Cosmic Solar Years • Dharma on 4 Pillars',
      headline: 'The Descent of the Vedas & Matsya Avatāra Deluge Rescue',
      eventDescription: 'On this sacred planetary juncture at the cosmic dawn, Bhagavan Vishnu manifests as the Matsya (Horned Fish) Avatāra to save the pious king Satyavrata Manu, the Seven Sages (Saptarshis), and the sacred seeds of all botanical, herbal, and living species from the dissolution of the Cākṣuṣa Manvantara. Lord Matsya ties the celestial vessel of life to His dorsal horn using the serpent king Vāsuki, imparting the timeless science of Brahman and preserving the uncreated Vedas into the new world.',
      source: 'Śrīmad Bhāgavatam 8.24.31–36 & Matsya Purāṇa 1.11–20',
      gitaVerse: {
        devanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥\nपरित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥',
        transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||\nparitrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām |\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge ||',
        translation: 'Whenever there is a decline of righteousness, O Bharata, and an uprising of unrighteousness, then I manifest Myself. For the protection of the good, for the destruction of evil-doers, and for the firm establishment of Dharma, I am born from age to age.',
        chapter: 'Bhagavad Gītā 4.7–8',
        commentary: 'Śaṅkara Bhāṣya: The Lord manifests His divine form through His unconditioned Maya to restore cosmic equilibrium whenever human ignorance threatens the order of Dharma.'
      },
      eraIndex: 0
    },
    treta: {
      name: 'Tretā Yuga',
      sanskrit: 'त्रेता युग • राम राज्य एवं सेतु बन्धन काल',
      span: '1,296,000 Solar Years • Dharma on 3 Pillars',
      headline: 'Rāma-Setu Bridging of the Southern Ocean & Sacred Coronation',
      eventDescription: 'In Tretā Yuga on this day, Maryādā Puruṣottama Bhagavan Sri Rama, accompanied by the Vānara sovereign Sugrīva, Sri Hanumān, and the architect Nala, completes the miraculous construction of the Rāma Setu across the roaring ocean toward Lanka. Floating stones inscribed with the holy name of Rama create an inviolable bridge of Dharma, leading to the vanquishing of the tyrant Ravana and the dawn of Rāma-Rājya—a golden era of sovereign justice, boundless prosperity, and spiritual harmony.',
      source: 'Vālmīki Rāmāyaṇa, Yuddha Kāṇḍa 22.45–55 & Padma Purāṇa Uttara-Khaṇḍa',
      gitaVerse: {
        devanagari: 'पवनः पवतामस्मि रामः शस्त्रभृतामहम् ।\nझषाणां मकरश्चास्मि स्रोतसामस्मि जाह्नवी ॥',
        transliteration: 'pavanaḥ pavatām asmi rāmaḥ śastra-bhṛtām aham |\njhaṣāṇāṁ makaraś cāsmi srotasām asmi jāhnavī ||',
        translation: 'Of purifiers I am the wind; of wielders of weapons I am Rama; of fishes I am the crocodile; of streams I am the celestial Ganga.',
        chapter: 'Bhagavad Gītā 10.31',
        commentary: 'Rāmānuja Gītā Bhāṣya: Sri Rama is celebrated by Krishna as the supreme embodiment of valor, righteousness, and unshakeable adherence to truth among all wielders of arms.'
      },
      eraIndex: 0
    },
    dvapara: {
      name: 'Dvāpara Yuga',
      sanskrit: 'द्वापर युग • गीता उपदेश एवं महाभारत धर्मयुद्ध',
      span: '864,000 Solar Years • Dharma on 2 Pillars',
      headline: 'The Cosmic Song: Sri Krishna Reveals the Bhagavad Gītā at Kurukṣetra',
      eventDescription: 'At the dawn of the Kurukṣetra war, amidst the conch-blasts of Pāñcajanya and Devadatta, Arjuna sinks into sorrow upon seeing his revered elders, teachers, and kinsmen drawn up for battle. On this very day, Bhagavan Sri Krishna—the Supreme Charioteer—delivers the eighteen immortal chapters of the Bhagavad Gītā. Unveiling the supreme truth of the immortal Atman that cannot be cleaved by weapons nor burned by fire, Krishna commands Arjuna to rise above duality and act as an instrument of divine cosmic purpose.',
      source: 'Mahābhārata, Bhīṣma Parva 25–42 & Bhagavad Gītā Chapters 1–18',
      gitaVerse: {
        devanagari: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः ।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे ॥',
        transliteration: 'na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato \'yaṁ purāṇo\nna hanyate hanyamāne śarīre ||',
        translation: 'The soul is never born, nor does it ever die; nor having once existed, does it ever cease to be. Unborn, eternal, ever-existing, and primeval, it is not slain when the body is slain.',
        chapter: 'Bhagavad Gītā 2.20',
        commentary: 'Madhvācārya Gītā Bhāṣya: The essential conscious self (Jīvātman) is immutable, transcendent to the six physical transformations of matter (birth, growth, modification, decay, and death).'
      },
      eraIndex: 0
    },
    kali: {
      name: 'Kali Yuga (Living History)',
      sanskrit: 'कलि युग • वर्तमान काल एवं सनातन पुनरुत्थान',
      span: '432,000 Solar Years (Started 3102 BCE) • Dharma on 1 Pillar (Truth)',
      headline: 'From Sri Krishna’s Departure (3102 BCE) to the 2026 Cosmic Horizon',
      eventDescription: 'In Kali Yuga on this day in history, humanity navigates the turbulent sea of time: from the division of the Vedas by Maharshi Vedavyāsa, to Adi Shankaracharya composing his profound Vedanta commentaries at Varanasi (c. 800 CE), to the royal coronation of Chhatrapati Shivaji Maharaj establishing Hindu Swarajya (1674 CE), to Swami Vivekananda roaring the message of Sanatana Dharma to the modern world at Chicago (1893 CE). Today in 2026 CE, sacred teerthas are re-consecrated, and planetary civilization stands at the threshold of interstellar discovery.',
      source: 'Viṣṇu Purāṇa 4.24, Sūrya Siddhānta 1.15 & Recorded Subcontinental Chronology',
      gitaVerse: {
        devanagari: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥\nसर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
        transliteration: 'man-manā bhava mad-bhakto mad-yājī māṁ namaskuru |\nmām evaiṣyasi satyaṁ te pratijāne priyo \'si me ||\nsarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
        translation: 'Fix your mind on Me, be devoted to Me, sacrifice to Me, bow down to Me. You shall come to Me alone; truly I promise you, for you are dear to Me. Abandoning all varieties of dharmas, take refuge in Me alone. I shall liberate you from all sins; do not grieve.',
        chapter: 'Bhagavad Gītā 18.65–66 (Carama Śloka)',
        commentary: 'Gita Press Gorakhpur & Śrīdhara Svāmī: In the darkness of Kali Yuga, when rituals and austerities falter, total self-surrender (Śaraṇāgati) to the Supreme Lord is the single, unfailing raft across the ocean of worldly existence.'
      },
      eraIndex: 14
    }
  };

  const activeRecord = YUGA_RECORDS[selectedYugaTab];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[16px] border shadow-[0_10px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 sm:p-8 space-y-6 ${
          isLightMode 
            ? 'bg-[#f7efe1] border-[#c59b27]/40 text-[#1d130a]' 
            : 'bg-gradient-to-b from-[#18110b]/98 via-[#0e0a07]/98 to-[#16100b]/98 border-[rgba(232,145,58,0.4)] text-[#efe6d6]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate Indian Brass Corner Glyphs */}
        <span className="absolute top-2.5 left-2.5 text-xs text-[#e8913a] opacity-70">❖</span>
        <span className="absolute top-2.5 right-2.5 text-xs text-[#e8913a] opacity-70">❖</span>

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[rgba(232,145,58,0.25)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#e8913a]" />
              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#e8913a]">
                कालचक्र दैनिक दर्शन • ON THIS COSMIC DAY
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-serif font-bold text-[#efe6d6] leading-tight" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              {gregorianDate}
            </h1>
            <p className="text-xs text-[#b5a990] font-serif">
              Current Planetary Epoch: Kali Yuga Year 5,127 • Margashirsha / Kartika Solar Transit
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#b5a990] hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The 4 Yuga Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-[10px] bg-black/40 border border-[rgba(232,145,58,0.2)]">
          <button
            onClick={() => {
              soundManager.bell(1046.5, 0.15, 1.2);
              setSelectedYugaTab('satya');
            }}
            className={`py-2 px-2.5 rounded-[8px] text-xs font-serif font-semibold transition-all ${
              selectedYugaTab === 'satya'
                ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] font-bold shadow'
                : 'text-[#b5a990] hover:text-white hover:bg-white/5'
            }`}
          >
            १. Satya Yuga
          </button>

          <button
            onClick={() => {
              soundManager.bell(880, 0.15, 1.2);
              setSelectedYugaTab('treta');
            }}
            className={`py-2 px-2.5 rounded-[8px] text-xs font-serif font-semibold transition-all ${
              selectedYugaTab === 'treta'
                ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] font-bold shadow'
                : 'text-[#b5a990] hover:text-white hover:bg-white/5'
            }`}
          >
            २. Tretā Yuga
          </button>

          <button
            onClick={() => {
              soundManager.bell(784, 0.15, 1.2);
              setSelectedYugaTab('dvapara');
            }}
            className={`py-2 px-2.5 rounded-[8px] text-xs font-serif font-semibold transition-all ${
              selectedYugaTab === 'dvapara'
                ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] font-bold shadow'
                : 'text-[#b5a990] hover:text-white hover:bg-white/5'
            }`}
          >
            ३. Dvāpara Yuga
          </button>

          <button
            onClick={() => {
              soundManager.bell(659.3, 0.15, 1.2);
              setSelectedYugaTab('kali');
            }}
            className={`py-2 px-2.5 rounded-[8px] text-xs font-serif font-semibold transition-all ${
              selectedYugaTab === 'kali'
                ? 'bg-gradient-to-r from-[#e8913a] to-[#c57922] text-[#0d0a08] font-bold shadow'
                : 'text-[#b5a990] hover:text-white hover:bg-white/5'
            }`}
          >
            ४. Kali Yuga (Today)
          </button>
        </div>

        {/* Active Yuga Event Chronicle */}
        <div className="space-y-4 font-serif">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#e8913a] font-bold block">
              {activeRecord.sanskrit}
            </span>
            <h2 className="text-lg font-bold text-[#fde047] leading-tight">
              {activeRecord.headline}
            </h2>
            <span className="text-[11px] text-[#b5a990] block">
              Cosmic Duration: {activeRecord.span}
            </span>
          </div>

          <p className="text-sm text-[#e9dfcc] leading-relaxed">
            {activeRecord.eventDescription}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[11px] bg-[#1a120b] border border-[rgba(232,145,58,0.3)] text-[#6fb0b2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6fb0b2]" />
            <span>Canonical Source: {activeRecord.source}</span>
          </div>

          {/* Sacred Bhagavad Gita Daily Guidance Card */}
          <div className="p-4 sm:p-5 rounded-[12px] bg-gradient-to-b from-[#26170d] to-[#170e08] border border-[rgba(232,145,58,0.45)] shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#e8913a] uppercase tracking-wider border-b border-[rgba(232,145,58,0.2)] pb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#e8913a]" />
                <span>श्रीमद्भगवद्गीता • {activeRecord.gitaVerse.chapter}</span>
              </div>
              <span className="text-white/60">॥ ॐ तत्सत् ॥</span>
            </div>

            <p className="text-sm font-semibold text-[#fde047] leading-relaxed text-center whitespace-pre-line" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
              {activeRecord.gitaVerse.devanagari}
            </p>

            <p className="text-xs italic text-[#b5a990] leading-relaxed text-center whitespace-pre-line">
              &quot;{activeRecord.gitaVerse.transliteration}&quot;
            </p>

            <p className="text-xs text-[#e9dfcc] pt-2 border-t border-[rgba(232,145,58,0.18)] leading-relaxed text-center">
              {activeRecord.gitaVerse.translation}
            </p>

            <p className="text-[10.5px] text-[#d4af37] opacity-90 leading-normal pt-1 border-t border-[rgba(232,145,58,0.12)]">
              <strong>भाष्य (Commentary):</strong> {activeRecord.gitaVerse.commentary}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(232,145,58,0.2)] gap-3">
          <button
            onClick={() => {
              soundManager.bell(880, 0.18, 1.6);
              onJumpToEra(activeRecord.eraIndex);
              onClose();
            }}
            className="flex-1 h-10 rounded-[8px] text-xs font-serif font-bold uppercase tracking-wider bg-gradient-to-r from-[#e8913a] via-[#c57922] to-[#994710] text-[#0d0a08] border border-[#fde047] hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Travel to {activeRecord.name} on Wheel</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="h-10 px-4 rounded-[8px] text-xs font-serif font-medium border border-[rgba(232,145,58,0.3)] bg-[#1a120b] hover:bg-white/10 text-[#b5a990] hover:text-white transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
