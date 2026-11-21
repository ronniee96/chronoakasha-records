export type EventCategory = 
  | 'Cosmology & Kalpas'
  | 'Scriptures & Philosophy'
  | 'Civilizations & Archaeology'
  | 'Science & Astronomy'
  | 'Dynasties & Kings'
  | 'Kardashev & Dyson Future';

export type DateClassification = 
  | 'Traditional chronology'
  | 'Archaeologically attested'
  | 'Historically documented'
  | 'Scholarly estimated'
  | 'Scriptural account'
  | 'Theoretical physics'
  | 'Speculative scenario'
  | 'Astronomical / Epigraphic';

export type EraId = 
  | 'cosmology'
  | 'satya'
  | 'treta'
  | 'dvapara'
  | 'archaeology'
  | 'vedic'
  | 'classical'
  | 'medieval'
  | 'modern'
  | 'kardashev'
  | 'cycle';

export interface TimelineEvent {
  id: string;
  title: string;
  sanskritTitle?: string;
  date: string;
  numericSortYear: number; // For sequence calculation
  era: EraId;
  category: EventCategory;
  ring: number; // 1 to 6 (concentric ring)
  dateClassification: DateClassification;
  summary: string;
  content: string;
  sanskritQuote?: {
    verse: string;
    transliteration: string;
    translation: string;
  };
  image: string;
  imageCaption: string;
  imageAttribution: string;
  tags: string[];
  relatedPeople?: string[];
  relatedPlaces?: string[];
  relatedTexts?: string[];
  confidence: string;
  kardashevLevel?: number;
  energyScale?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // 1. COSMOLOGY & THE DAWN OF SVETA-VARAHA KALPA
  {
    id: 'sveta-varaha-kalpa-begins',
    title: 'Śveta-Vārāha Kalpa begins',
    sanskritTitle: 'श्वेतवाराह कल्प प्रारम्भ',
    date: '1.9729 billion years ago',
    numericSortYear: -1972949126,
    era: 'cosmology',
    category: 'Cosmology & Kalpas',
    ring: 1,
    dateClassification: 'Traditional chronology',
    summary: 'The cosmic dawn of Brahmā’s 51st year (first kalpa of the second parārdha), marking the current daytime cycle of the cosmos.',
    content: 'According to Surya Siddhanta and Vishnu Purana, a day of Brahma (Kalpa) lasts 4.32 billion solar years, consisting of 14 Manvantaras with intervening Sandhis. The current kalpa is designated Śveta-Vārāha (The White Boar), named after the divine incarnation that retrieved the Earth submerged beneath cosmic waters (Kāraṇodaka). To date, 6 Manvantaras have elapsed, and we reside in the 28th Mahāyuga of the 7th Manvantara (Vaivasvata), approximately 1.972 billion years since the morning of this Kalpa.',
    sanskritQuote: {
      verse: 'ब्राह्मस्य हि परार्धस्य प्रक्रमे प्रथमस्य च । श्वेतवाराहसंज्ञोऽयं कल्पो वर्तत एव हि ॥',
      transliteration: 'brāhmasya hi parārdhasya prakrame prathamasya ca | śvetavārāhasaṁjño’yaṁ kalpo vartata eva hi ||',
      translation: 'At the commencement of the second half of Brahma’s cosmic life, this current cycle known as the Sveta-Varaha Kalpa proceeds.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Varaha_Avatar_-_Google_Art_Project.jpg/800px-Varaha_Avatar_-_Google_Art_Project.jpg',
    imageCaption: 'Varaha lifting the Earth goddess Bhudevi from the primordial cosmic ocean',
    imageAttribution: 'Wikimedia Commons / National Museum New Delhi (Public Domain)',
    tags: ['#kalpa', '#brahma', '#cosmology', '#varaha', '#creation'],
    relatedPeople: ['Brahma', 'Sri Vishnu', 'Bhudevi', 'Svayambhuva Manu'],
    relatedPlaces: ['Brahmaloka', 'Kāraṇodaka', 'Bhumandala'],
    relatedTexts: ['Surya Siddhanta', 'Vishnu Purana', 'Srimad Bhagavatam (Canto 3)'],
    confidence: 'High (Traditional Consensus)'
  },
  {
    id: 'samudra-manthan-kurma',
    title: 'Samudra Manthan & Kūrma Avatāra',
    sanskritTitle: 'समुद्र मन्थन एवं कूर्मावतार',
    date: 'Traditional Antiquity (Satya Yuga Dawn)',
    numericSortYear: -1500000000,
    era: 'cosmology',
    category: 'Cosmology & Kalpas',
    ring: 2,
    dateClassification: 'Scriptural account',
    summary: 'The cosmic churning of the Ocean of Milk by the Devas and Asuras, supported by the tortoise incarnation Kurma.',
    content: 'The Churning of the Ocean (Kshira Sagara) represents the profound allegorical and cosmological churning of consciousness and matter. Mount Mandara was used as the churning rod and serpent Vasuki as the churning rope. Lord Vishnu assumed the gigantic form of Kurma (the tortoise) beneath Mount Mandara to sustain the planetary churning axis. From this cosmic laboratory arose the 14 Ratnas: Halahala poison (consumed by Lord Shiva, becoming Nilakantha), Kamadhenu, Airavata, Kaustubha jewel, Parijata tree, Dhanvantari carrying the Amrita (nectar of immortality), and Goddess Sri Lakshmi.',
    sanskritQuote: {
      verse: 'मन्थध्वममृतार्थं वै क्षीरोदं सुरदानवाः । मन्दरेण गिरिन्द्रेण वासुकिना च रज्जुना ॥',
      transliteration: 'manthadhvam-amṛtārthaṁ vai kṣīrodaṁ suradānavāḥ | mandareṇa girindreṇa vāsukinā ca rajjunā ||',
      translation: 'Churn the Ocean of Milk for the nectar of immortality, O gods and demons, with King Mandara as the pestle and Vasuki as the rope.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kurma_avatar_of_Vishnu%2C_below_Mount_Mandar%2C_with_Vasuki_wrapped_around_it%2C_during_Samudra_manthan.jpg/800px-Kurma_avatar_of_Vishnu%2C_below_Mount_Mandar%2C_with_Vasuki_wrapped_around_it%2C_during_Samudra_manthan.jpg',
    imageCaption: 'The Churning of the Milk Ocean (Samudra Manthan) with Kurma stabilizing Mount Mandara',
    imageAttribution: 'Wikimedia Commons / Pahari Painting (c. 1770) / Victoria and Albert Museum',
    tags: ['#samudra_manthan', '#kurma', '#amrita', '#lakshmi', '#shiva'],
    relatedPeople: ['Kurma Avatara', 'Lord Shiva', 'Devas', 'Asuras', 'Dhanvantari'],
    relatedPlaces: ['Kshira Sagara', 'Mount Mandara'],
    relatedTexts: ['Mahabharata (Adi Parva)', 'Bhagavata Purana (Canto 8)', 'Vishnu Purana'],
    confidence: 'Traditional Puranic Account'
  },
  {
    id: 'narasimha-prahlada',
    title: 'Narasimha Avatāra & Prahlāda Charitra',
    sanskritTitle: 'नृसिंहावतार एवं प्रह्लाद चरित्र',
    date: 'Traditional Antiquity (Satya Yuga Epoch)',
    numericSortYear: -3892000,
    era: 'satya',
    category: 'Scriptures & Philosophy',
    ring: 2,
    dateClassification: 'Scriptural account',
    summary: 'The divine manifestation of the Man-Lion avatar transcending physical contradictions to protect the steadfast devotee.',
    content: 'Hiranyakashipu had obtained an intricate cosmological boon from Brahma: he could not be killed by day or by night, indoors or outdoors, on earth or in space, by man or beast, with living or inanimate weapons. In response to his persecution of Prahlada, Lord Vishnu manifested as Narasimha (half-man, half-lion) at twilight on the threshold (neither inside nor outside), placing the demon on his lap (neither earth nor sky) and vanquishing him with his divine claws. This theological event underscores the omnipresence of the Divine and the protection of pure devotion (Bhakti).',
    sanskritQuote: {
      verse: 'तव करकमलवरे नखम् अद्भुतशृङ्गं दलितहिरण्यकशिपुतनुभृङ्गम् । केशव धृतनरहरिरूप जय जगदीश हरे ॥',
      transliteration: 'tava kara-kamala-vare nakham adbhuta-śṛṅgaṁ dalita-hiraṇyakaśipu-tanu-bhṛṅgam | keśava dhṛta-narahari-rūpa jaya jagadīśa hare ||',
      translation: 'O Keshava! In the form of the man-lion, with your wondrous lotus-fingered claws you tore apart the bee-like body of Hiranyakashipu!'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Narasimha_Lakshmi_Hampi.jpg/800px-Narasimha_Lakshmi_Hampi.jpg',
    imageCaption: 'Monolithic Lakshmi Narasimha Statue at Hampi, Vijayanagara (1528 CE)',
    imageAttribution: 'Wikimedia Commons / Creative Commons Attribution-ShareAlike',
    tags: ['#narasimha', '#prahlada', '#satya_yuga', '#avatar', '#hampi'],
    relatedPeople: ['Narasimha', 'Prahlada', 'Hiranyakashipu'],
    relatedPlaces: ['Ahobilam', 'Multan (Kashyapadurg)'],
    relatedTexts: ['Bhagavata Purana (Canto 7)', 'Vishnu Purana'],
    confidence: 'Traditional Scriptural Account'
  },
  {
    id: 'vamana-trivikrama',
    title: 'Vāmana Avatāra & Trivikrama Mahotsava',
    sanskritTitle: 'वामनावतार एवं त्रिविक्रम',
    date: 'Traditional Antiquity (Treta Yuga Dawn)',
    numericSortYear: -2164000,
    era: 'treta',
    category: 'Scriptures & Philosophy',
    ring: 2,
    dateClassification: 'Scriptural account',
    summary: 'The dwarf Brahmin avatar expands into Trivikrama, measuring the three worlds in three cosmic strides.',
    content: 'When the righteous Asura King Bali conquered the three realms, Lord Vishnu incarnated as Vamana, a young celibate scholar. Asking for only three strides of land during Bali’s grand sacrifice, Vamana expanded into the infinite Trivikrama form: His first step covered the Earth, His second encompassed the heavens and celestial spheres, and for the third, King Bali humbly offered his own head. Honoring Bali’s uncompromising truthfulness, Vamana crowned him ruler of Sutala loka until the next Manvantara.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Vamana_and_Bali_-_Google_Art_Project.jpg/800px-Vamana_and_Bali_-_Google_Art_Project.jpg',
    imageCaption: 'King Bali pouring water to seal the gift to Vamana as Sage Shukracharya looks on',
    imageAttribution: 'Wikimedia Commons / Government Museum Bangalore (Public Domain)',
    tags: ['#vamana', '#trivikrama', '#bali', '#treta_yuga'],
    relatedPeople: ['Vamana', 'Mahabali', 'Shukracharya'],
    relatedPlaces: ['Sutala', 'Narmada River'],
    relatedTexts: ['Rigveda 1.22.17', 'Bhagavata Purana (Canto 8)'],
    confidence: 'Vedic & Puranic Consensus'
  },
  {
    id: 'sri-rama-ayodhya',
    title: 'Śrī Rāma Avatāra & The Treta Yuga Epic',
    sanskritTitle: 'श्रीरामावतार एवं रामायण',
    date: 'Traditional c. 5000–1800 BCE / Treta Yuga',
    numericSortYear: -5050,
    era: 'treta',
    category: 'Scriptures & Philosophy',
    ring: 2,
    dateClassification: 'Traditional chronology',
    summary: 'The incarnation of Maryada Purushottama Sri Rama in the Ikshvaku solar dynasty of Ayodhya, chronicled by Sage Valmiki.',
    content: 'Sri Rama exemplifies dharma in family, governance, and combat. Sage Valmiki composed the 24,000 verses of the Ramayana in the Gayatri meter. The epic details Rama’s exile to Dandakaranya, the abduction of Sita by Ravana, the building of Rama Sethu (Adam’s Bridge) across the Palk Strait with the Vanara army, and the establishment of Rama-Rajya (an ideal state of righteousness, peace, and abundance). Astronomical dating based on planetarium configurations described in the Valmiki Ramayana has been calculated by scholars from 5050 BCE to earlier epochs.',
    sanskritQuote: {
      verse: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः । राजा सर्वस्य लोकस्य देवानामिव वासवः ॥',
      transliteration: 'rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ | rājā sarvasya lokasya devānāmiva vāsavaḥ ||',
      translation: 'Rama is the very embodiment of Dharma, virtuous, of truth and valor, emperor of the entire world like Indra of the devas.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Rama_and_Sita_Pahari_1780.jpg/800px-Rama_and_Sita_Pahari_1780.jpg',
    imageCaption: 'Rama and Sita enthroned with Lakshmana, Bharata, Shatrughna and Hanuman (Pahari Painting c. 1780)',
    imageAttribution: 'Wikimedia Commons / British Museum (Public Domain)',
    tags: ['#rama', '#ramayana', '#ayodhya', '#dharma', '#treta_yuga'],
    relatedPeople: ['Sri Rama', 'Sita Devi', 'Hanuman', 'Lakshmana', 'Valmiki'],
    relatedPlaces: ['Ayodhya', 'Dandakaranya', 'Kishkindha', 'Rameshwaram', 'Lanka'],
    relatedTexts: ['Valmiki Ramayana', 'Adhyatma Ramayana', 'Kamba Ramayanam'],
    confidence: 'High (Traditional & Epigraphic)'
  },
  {
    id: 'kurukshetra-war-gita',
    title: 'Kurukshetra War & Bhagavad Gītā spoken',
    sanskritTitle: 'कुरुक्षेत्र युद्ध एवं श्रीमद्भगवद्गीता',
    date: '3139–3102 BCE (Aryabhata Tradition: 3102 BCE)',
    numericSortYear: -3139,
    era: 'dvapara',
    category: 'Scriptures & Philosophy',
    ring: 2,
    dateClassification: 'Traditional chronology',
    summary: 'The cataclysmic Mahabharata war at Kurukshetra and Sri Krishna’s immortal dialogue of Yoga to Arjuna on the battlefield.',
    content: 'Fought between the Pandavas and Kauravas over sovereign dharma, the Kurukshetra war assembled armies across the entire Indian subcontinent. On the brink of conflict, Arjuna fell into moral despair. Sri Krishna revealed the 700 verses of the Srimad Bhagavad Gita, synthesizing Karma Yoga (selfless action), Jnana Yoga (discernment of eternal self), and Bhakti Yoga (loving devotion to the Supreme), culminating in the Vishwarupa Darshana (Universal Cosmic Form). Aryabhata’s calculations in the Aryabhatiya correlate the start of Kali Yuga to the conclusion of the war and Krishna’s ascension.',
    sanskritQuote: {
      verse: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
      transliteration: 'yadā yadā hi dharmasya glānirbhavati bhārata | abhyutthānamadharmasya tadātmānaṁ sṛjāmyaham ||',
      translation: 'Whenever there is a decline in righteousness, O Bharata, and an ascendance of unrighteousness, at that time I manifest Myself.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Krishna_and_arjun_on_chariot.jpg/800px-Krishna_and_arjun_on_chariot.jpg',
    imageCaption: 'Lord Krishna delivering the Bhagavad Gita to Arjuna on the chariot at Kurukshetra',
    imageAttribution: 'Wikimedia Commons / 19th Century Lithograph (Public Domain)',
    tags: ['#krishna', '#arjuna', '#bhagavad_gita', '#mahabharata', '#kurukshetra'],
    relatedPeople: ['Sri Krishna', 'Arjuna', 'Bhishma', 'Yudhishthira', 'Vyasa'],
    relatedPlaces: ['Kurukshetra', 'Hastinapur', 'Indraprastha', 'Dwaraka'],
    relatedTexts: ['Mahabharata (Bhishma Parva)', 'Bhagavad Gita'],
    confidence: 'High (Traditional Astronomical Reckoning)'
  },
  {
    id: 'kali-yuga-begins',
    title: 'Kali Yuga begins (Astronomical Epoch)',
    sanskritTitle: 'कलियुग प्रारम्भ (खगोलीय गणना)',
    date: 'February 18, 3102 BCE (Julian -3101)',
    numericSortYear: -3102,
    era: 'dvapara',
    category: 'Cosmology & Kalpas',
    ring: 1,
    dateClassification: 'Astronomical / Epigraphic',
    summary: 'The planetary conjunction marking the formal commencement of the Kali Yuga according to Surya Siddhanta and Aryabhata.',
    content: 'The Aryabhatiya (499 CE) and the Aihole Inscription of Pulakeshin II (634 CE) verify that the present Kali Yuga began on the midnight connecting 17 and 18 February 3102 BCE, when all visible planets were in conjunction near Revati (Zeta Piscium). This date corresponds in Purāṇic accounts to Sri Krishna’s departure from the earthly realm at Prabhasa and the submergence of maritime Dwaraka into the Arabian Sea, as corroborated by contemporary marine archaeological excavations at Bet Dwaraka.',
    sanskritQuote: {
      verse: 'षष्ट्यब्दानां षष्टिर्यदा व्यतीतास्त्रयश्च युगपादाः । त्र्यधिका विंशतिरब्दास्तदेह मम जन्मनोऽतीताः ॥',
      transliteration: 'ṣaṣṭyabdānāṁ ṣaṣṭiryadā vyatītāstrayaśca yugapādāḥ | tryadhikā viṁśatirabdāstadeha mama janmano’tītāḥ ||',
      translation: 'When sixty times sixty years (3600 years) and three quarters of the Yuga had elapsed, twenty-three years had passed since my birth.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Aihole_inscriptions_Ravikirti_Pulakesin_II_temple_dated_634_CE.jpg/800px-Aihole_inscriptions_Ravikirti_Pulakesin_II_temple_dated_634_CE.jpg',
    imageCaption: 'The Aihole Inscription of 634 CE citing the 3,735th year since the Mahabharata war and Kali Yuga',
    imageAttribution: 'Wikimedia Commons / Archaeological Survey of India (Public Domain)',
    tags: ['#kali_yuga', '#aryabhata', '#aihole', '#dwaraka', '#astronomy'],
    relatedPeople: ['Aryabhata', 'Pulakeshin II', 'Ravikirti', 'Sri Krishna'],
    relatedPlaces: ['Ujjain', 'Prabhasa', 'Dwaraka', 'Aihole'],
    relatedTexts: ['Aryabhatiya (Kalakriya)', 'Surya Siddhanta', 'Aihole Inscription'],
    confidence: 'Astronomically Verified & Epigraphically Attested'
  },

  // 2. ARCHAEOLOGY & THE SARASVATI-INDUS CIVILIZATION
  {
    id: 'mehrgarh-settlement',
    title: 'Mehrgarh Agricultural Settlement',
    sanskritTitle: 'मेहरगढ़ प्राचीन सभ्यता',
    date: 'c. 7000–5500 BCE',
    numericSortYear: -7000,
    era: 'archaeology',
    category: 'Civilizations & Archaeology',
    ring: 3,
    dateClassification: 'Archaeologically attested',
    summary: 'One of the earliest Neolithic farming, metallurgy, and dentistry settlements in South Asia on the Bolan River.',
    content: 'Excavated by Jean-François Jarrige, Mehrgarh in Balochistan revealed an unbroken cultural sequence from pre-pottery Neolithic farming (wheat, barley, sheep, zebu cattle) to copper metallurgy, bead crafts, and early micro-drilling dentistry on human teeth dating to 7000 BCE. Mehrgarh conclusively demonstrated that the urbanization of the Indus-Sarasvati basin was an indigenous evolution spanning millennia rather than an imported civilization.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mehrgarh_Mother_Goddess.jpg/800px-Mehrgarh_Mother_Goddess.jpg',
    imageCaption: 'Terracotta female figurine with ornate hair dress from Mehrgarh (c. 3000 BCE)',
    imageAttribution: 'Wikimedia Commons / Guimet Museum Paris (Public Domain)',
    tags: ['#mehrgarh', '#neolithic', '#agriculture', '#archaeology', '#indigenous'],
    relatedPeople: ['Jean-François Jarrige'],
    relatedPlaces: ['Mehrgarh', 'Bolan Pass', 'Kachi Plain'],
    relatedTexts: ['Reports of Archaeological Survey'],
    confidence: 'Archaeologically Attested (C-14 Dating)'
  },
  {
    id: 'mature-indus-sarasvati-flourishing',
    title: 'Mature Indus-Sarasvati Civilization',
    sanskritTitle: 'सिन्धु-सरस्वती सभ्यता का उत्कर्ष',
    date: 'c. 2600–1900 BCE',
    numericSortYear: -2600,
    era: 'archaeology',
    category: 'Civilizations & Archaeology',
    ring: 3,
    dateClassification: 'Archaeologically attested',
    summary: 'The largest bronze-age urban civilization: grid-planned cities, subterranean drainage, Dholavira reservoirs, and maritime trade.',
    content: 'Spanning over 1.5 million square kilometers across north-western India and Pakistan, over 1,500 mature sites have been identified, more than 60% situated along the dried paleochannels of the sacred Vedic Sarasvati (Ghaggar-Hakra) river. Notable centers include Harappa, Mohenjo-daro, Rakhigarhi (the largest metropolis), Dholavira (pioneering sophisticated stone water harvesting and stadium architecture), Kalibangan (earliest ploughed agricultural fields and Vedic fire altars), and Lothal (world’s earliest tidal dockyard connected to the Gulf of Khambhat).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Priest_King_Harappa.jpg/800px-Priest_King_Harappa.jpg',
    imageCaption: 'The steatite sculpture of the Priest-King discovered at Mohenjo-daro wearing a trefoil robe',
    imageAttribution: 'Wikimedia Commons / National Museum Karachi (Public Domain)',
    tags: ['#indus_sarasvati', '#harappa', '#mohenjodaro', '#dholavira', '#rakhigarhi', '#lothal'],
    relatedPeople: ['Sir John Marshall', 'R.D. Banerjee', 'R.S. Bisht'],
    relatedPlaces: ['Rakhigarhi', 'Dholavira', 'Kalibangan', 'Lothal', 'Mohenjo-daro'],
    relatedTexts: ['Rigveda (Sarasvati Suktas)', 'Archaeological Survey Monographs'],
    confidence: 'Archaeologically Attested (Comprehensive Excavations)'
  },
  {
    id: 'rigveda-compilation',
    title: 'Rigvedic Hymns & Sarasvati River Sacred Geography',
    sanskritTitle: 'ऋग्वेद संहिता एवं सरस्वती नदी',
    date: 'c. 2500–1500 BCE (Traditional: Eternal Apaurusheya)',
    numericSortYear: -2000,
    era: 'vedic',
    category: 'Scriptures & Philosophy',
    ring: 4,
    dateClassification: 'Scholarly estimated',
    summary: 'The world’s oldest continuously preserved liturgical literature, celebrating the sacred cosmic order (Ṛta) and the majestic Sarasvati river.',
    content: 'The Rigveda Samhita consists of 1,028 suktas (hymns) organized into 10 mandalas, transmitted orally with unbroken phonetic fidelity through rigorous mnemonic recensions (Pada, Krama, Jata, and Ghana pathas). The hymns celebrate Agni, Indra, Soma, Varuna, and Ushas, culminating in the profound philosophical inquiry of the Nasadiya Sukta (Hymn of Non-Creation: 10.129). The Sarasvati is praised as *ambitame, nadītame, devitame* (best of mothers, rivers, and goddesses) flowing unbroken from the snowy mountains to the western sea (Giribhya ā samudrāt).',
    sanskritQuote: {
      verse: 'नासदीय सूक्त: नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् । किमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥',
      transliteration: 'nāsadāsīnno sadāsīttadānīṁ nāsīdrajo no vyomā paro yat | kimāvarīvaḥ kuha kasya śarmannambhaḥ kimāsīdgahanaṁ gabhīram ||',
      translation: 'Then there was neither non-existence nor existence; there was no realm of air, no sky beyond. What covered it, and where? And what gave shelter? Was water there, unfathomed and profound?'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Rigveda_MS2097.jpg/800px-Rigveda_MS2097.jpg',
    imageCaption: 'A 19th-century paper manuscript of the Rigveda Samhita in Devanagari script',
    imageAttribution: 'Wikimedia Commons / Oxford Bodleian Library (Public Domain)',
    tags: ['#rigveda', '#sarasvati', '#nasadiya_sukta', '#apaurusheya', '#mantra'],
    relatedPeople: ['Sage Veda Vyasa', 'Visvamitra', 'Vasishtha', 'Dirghatamas'],
    relatedPlaces: ['Saptasindhu', 'Brahmavarta', 'Sarasvati River'],
    relatedTexts: ['Rigveda Samhita', 'Nirukta of Yaska'],
    confidence: 'Oral Tradition & Linguistic Antiquity'
  },
  {
    id: 'upanishads-philosophy',
    title: 'Principal Upanishads & The Philosophy of Brahman',
    sanskritTitle: 'प्रमुख उपनिषद् एवं अद्वैत दर्शन',
    date: 'c. 1000–600 BCE',
    numericSortYear: -900,
    era: 'vedic',
    category: 'Scriptures & Philosophy',
    ring: 4,
    dateClassification: 'Historically documented',
    summary: 'The philosophical summit of the Vedas, revealing the non-dual identity of Atman (individual self) and Brahman (ultimate reality).',
    content: 'Moving inward from outer ritual to contemplative inquiry, the major Upanishads—Brihadaranyaka, Chandogya, Taittiriya, Aitareya, Katha, Mundaka, Mandukya, Kena, and Isha—codify the foundational Vedantic revelations. Through dialogues between sages like Yajnavalkya and Maitreyi, Uddalaka and Shvetaketu, and Yama and Nachiketa, they proclaim the four Great Sayings (Mahāvākyas): *Prajñānaṁ Brahma*, *Aham Brahmāsmi*, *Tat Tvam Asi*, and *Ayam Ātmā Brahma*. The Mandukya Upanishad formulates the 4 states of consciousness (Waking/Jagrat, Dreaming/Svapna, Deep Sleep/Susupti, and Transcendental/Turiya) symbolized by OM.',
    sanskritQuote: {
      verse: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥',
      transliteration: 'oṁ asato mā sadgamaya | tamaso mā jyotirgamaya | mṛtyormā amṛtaṁ gamaya ||',
      translation: 'Lead us from the unreal to the Real; lead us from darkness unto Light; lead us from mortality unto Immortality.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Isha_Upanishad_manuscript%2C_Devanagari%2C_Vedas.jpg/800px-Isha_Upanishad_manuscript%2C_Devanagari%2C_Vedas.jpg',
    imageCaption: 'Palm-leaf manuscript page of the Isha Upanishad with traditional commentary',
    imageAttribution: 'Wikimedia Commons / Adyar Library (Public Domain)',
    tags: ['#upanishads', '#brahman', '#atman', '#tat_tvam_asi', '#vedanta'],
    relatedPeople: ['Sage Yajnavalkya', 'Gargi Vachaknavi', 'Nachiketa', 'Uddalaka Aruni'],
    relatedPlaces: ['Mithila', 'Naimisharanya', 'Kashi'],
    relatedTexts: ['Brihadaranyaka Upanishad', 'Chandogya Upanishad', 'Mandukya Upanishad'],
    confidence: 'Unanimous Literary & Philosophical Consensus'
  },

  // 3. CLASSICAL AGE, SCIENCES & GOLDEN EMPIRES
  {
    id: 'panini-ashtadhyayi',
    title: 'Pāṇini composes Aṣṭādhyāyī (Grammar of Sanskrit)',
    sanskritTitle: 'पाणिनि कृत अष्टाध्यायी',
    date: 'c. 500 BCE',
    numericSortYear: -500,
    era: 'classical',
    category: 'Science & Astronomy',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'The world’s first formal generative linguistic system, prefiguring Backus-Naur form, Turing-complete algorithms, and computing formalisms.',
    content: 'Working at Shalatula on the Indus River, Panini formulated 3,959 concise sutras in the Ashtadhyayi. Using an auxiliary meta-language (Shivasutras), contextual markers, recursive generative rewrite rules, and priority operators, Panini generated the entirety of correct Sanskrit phonology and morphology. Modern computer scientists including Noam Chomsky, Donald Knuth, and Subhash Kak have acknowledged Panini as the father of formal language theory and computer linguistics.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Statue_of_Panini_in_National_Museum_of_New_Delhi.jpg/800px-Statue_of_Panini_in_National_Museum_of_New_Delhi.jpg',
    imageCaption: 'Sculpture of Acharya Panini composing the generative Ashtadhyayi',
    imageAttribution: 'Wikimedia Commons / National Museum New Delhi (Public Domain)',
    tags: ['#panini', '#sanskrit', '#grammar', '#linguistics', '#computer_science'],
    relatedPeople: ['Panini', 'Patanjali', 'Katyayana'],
    relatedPlaces: ['Shalatula', 'Taxila (Takshashila)'],
    relatedTexts: ['Ashtadhyayi', 'Mahabhasya'],
    confidence: 'Historically Documented'
  },
  {
    id: 'maurya-empire-chanakya',
    title: 'Maurya Empire unified by Chandragupta & Chāṇakya',
    sanskritTitle: 'मौर्य साम्राज्य एवं चाणक्य अर्थशास्त्र',
    date: '322–185 BCE',
    numericSortYear: -322,
    era: 'classical',
    category: 'Dynasties & Kings',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'The unification of the Indian subcontinent from the Hindu Kush to Bengal under Chandragupta Maurya and the statecraft of Chanakya.',
    content: 'Mentored by the polymath Chanakya (Kautilya), Chandragupta Maurya displaced the Nanda dynasty of Magadha, defeated Seleucus I Nicator (regaining Arachosia, Gedrosia, and Paropamisadae), and founded India’s first pan-subcontinental empire centered at Pataliputra. Chanakya authored the Arthashastra, an exhaustive treatise on governance, political science, economic policy, foreign diplomacy (Mandala theory), espionage, and jurisprudence, setting standards for administrative excellence.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ashoka_Pillars_Lauriya_Nandangarh.jpg/800px-Ashoka_Pillars_Lauriya_Nandangarh.jpg',
    imageCaption: 'Ashokan pillar at Lauriya Nandangarh, crowned with the Lion Capital (c. 250 BCE)',
    imageAttribution: 'Wikimedia Commons / Archaeological Survey of India (Public Domain)',
    tags: ['#maurya', '#chanakya', '#arthashastra', '#chandragupta', '#ashoka'],
    relatedPeople: ['Chandragupta Maurya', 'Chanakya (Kautilya)', 'Emperor Ashoka', 'Megasthenes'],
    relatedPlaces: ['Pataliputra', 'Takshashila', 'Ujjain'],
    relatedTexts: ['Arthashastra', 'Indika of Megasthenes', 'Mudrarakshasa'],
    confidence: 'Archaeologically & Historically Documented'
  },
  {
    id: 'patanjali-yoga-sutras',
    title: 'Patañjali compiles the Yoga Sūtras',
    sanskritTitle: 'पतञ्जलि योगसूत्र',
    date: 'c. 200 BCE–200 CE',
    numericSortYear: -200,
    era: 'classical',
    category: 'Scriptures & Philosophy',
    ring: 4,
    dateClassification: 'Historically documented',
    summary: 'The classical codification of Raja Yoga into 196 aphorisms delineating the Eight Limbs (Ashtanga Yoga) to Samadhi.',
    content: 'Patanjali defined yoga as *citta-vṛtti-nirodhaḥ* (the intentional cessation of the fluctuations of consciousness). The Yoga Sutras map the human psycho-spiritual architecture across 4 chapters (Samadhi, Sadhana, Vibhuti, Kaivalya). The Eight Limbs—Yama (ethical restraints), Niyama (disciplines), Asana (posture), Pranayama (breath regulation), Pratyahara (sensory withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption)—provide an empirical roadmap for liberation and transcendental realization.',
    sanskritQuote: {
      verse: 'योगश्चित्तवृत्तिनिरोधः । तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥',
      transliteration: 'yogaścittavṛttinirodhaḥ | tadā draṣṭuḥ svarūpe’vasthānam ||',
      translation: 'Yoga is the cessation of the modifications of the mind. Then the witness rests in its own essential nature.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Patanjali_statue_at_Patanjali_Yogpeeth.jpg/800px-Patanjali_statue_at_Patanjali_Yogpeeth.jpg',
    imageCaption: 'Statue of Maharishi Patanjali depicted with the multi-headed serpent hood of Shesha',
    imageAttribution: 'Wikimedia Commons / CC-BY-SA 4.0',
    tags: ['#yoga', '#patanjali', '#samadhi', '#ashtanga', '#philosophy'],
    relatedPeople: ['Maharishi Patanjali', 'Vyasa (commentator)'],
    relatedPlaces: ['Kashi', 'Chidambaram'],
    relatedTexts: ['Yoga Sutras of Patanjali', 'Yogabhashya'],
    confidence: 'Unanimous Literary & Philosophical Consensus'
  },
  {
    id: 'aryabhata-astronomy',
    title: 'Āryabhaṭa calculates Earth’s Rotation & Pi',
    sanskritTitle: 'आर्यभट कृत आर्यभटीय',
    date: '499 CE (Saka 421)',
    numericSortYear: 499,
    era: 'classical',
    category: 'Science & Astronomy',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'Composing the Aryabhatiya at age 23, Aryabhata determined Earth’s diurnal axial rotation, solar eclipses, and Pi to 4 decimal places (3.1416).',
    content: 'In 121 verses divided into Gitikapada, Ganitapada, Kalakriyapada, and Golapada, Aryabhata calculated the solar year to 365.2586 days, formulated trigonometric sine tables (*jya* and *kojya*), determined that the Moon and planets shine by reflected sunlight, and explained eclipses through shadows rather than demonic consumption. Crucially, he noted that just as a man in a boat moving forward perceives stationary trees moving backward, so the stars appear to revolve westward because the Earth rotates eastward on its axis.',
    sanskritQuote: {
      verse: 'अनुलोमगतिर्नौस्थः पश्यत्यचलं विलोमगं यद्वत् । अचलानि भानि तद्वत् समपश्चिमगानि लङ्कायाम् ॥',
      transliteration: 'anulomagatirnausthaḥ paśyatyacalaṁ vilomagaṁ yadvat | acalāni bhāni tadvat samapaścimagāni laṅkāyām ||',
      translation: 'Just as a person moving forward on a boat sees fixed objects moving backwards, so the fixed stars appear to move straight west to an observer at Lanka.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aryabhata_statue_IUCAA.jpg/800px-Aryabhata_statue_IUCAA.jpg',
    imageCaption: 'Statue of Aryabhata at IUCAA (Inter-University Centre for Astronomy and Astrophysics, Pune)',
    imageAttribution: 'Wikimedia Commons / IUCAA Pune (CC BY-SA 3.0)',
    tags: ['#aryabhata', '#astronomy', '#mathematics', '#pi', '#earth_rotation'],
    relatedPeople: ['Aryabhata I', 'Bhaskara I', 'Varahamihira'],
    relatedPlaces: ['Kusumapura (Pataliputra)', 'Taregna'],
    relatedTexts: ['Aryabhatiya', 'Arya-Siddhanta'],
    confidence: 'Historically Documented & Autographed Date'
  },
  {
    id: 'brahmagupta-zero-gravity',
    title: 'Brahmagupta formulates Zero & Universal Gravity',
    sanskritTitle: 'ब्रह्मगुप्त कृत ब्राह्मस्फुटसिद्धान्त',
    date: '628 CE (Saka 550)',
    numericSortYear: 628,
    era: 'classical',
    category: 'Science & Astronomy',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'The first mathematical treatise to treat Zero as a number with operational rules, negative integers, and the gravitational nature of the Earth.',
    content: 'Composed at Bhinmal in Rajasthan, Brahmagupta’s *Brahmasphutasiddhanta* established formal arithmetic rules for zero (*shunya*) and negative numbers (*rina*). He solved indeterminate quadratic equations of the form $Nx^2 + 1 = y^2$ (later known as Pell’s equation) via the Chakravala method. Long before Newton, Brahmagupta stated: "A body falls towards the earth as it is the nature of the earth to attract bodies, just as it is in the nature of water to flow."',
    sanskritQuote: {
      verse: 'आकृष्टिशक्तिश्च मही तया यत् खस्थं गुरुस्वाभिमुखं स्वशक्त्या । आकृष्यते तत्पततीव भाति समे समन्तात् क्व पतत्वियं खे ॥',
      transliteration: 'ākṛṣṭiśaktiśca mahī tayā yat khasthaṁ gurusvābhimukhaṁ svaśaktyā | ākṛṣyate tatpatatīva bhāti same samantāt kva patatviyaṁ khe ||',
      translation: 'The earth has an attractive power (akrishti-shakti). By this, all heavy objects in space are drawn towards it by its innate strength; it appears as if they fall.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Brahmasphutasiddhanta_manuscript.jpg/800px-Brahmasphutasiddhanta_manuscript.jpg',
    imageCaption: 'Manuscript folios of Brahmagupta’s Brahmasphutasiddhanta (628 CE)',
    imageAttribution: 'Wikimedia Commons / Asiatic Society of Bengal (Public Domain)',
    tags: ['#brahmagupta', '#zero', '#gravity', '#algebra', '#astronomy'],
    relatedPeople: ['Brahmagupta', 'Varahamihira', 'Bhaskara II'],
    relatedPlaces: ['Bhinmal (Gurjaradesha)', 'Ujjain Observatory'],
    relatedTexts: ['Brahmasphutasiddhanta', 'Khandakhadyaka'],
    confidence: 'Historically Documented (628 CE)'
  },
  {
    id: 'adi-shankara-advaita',
    title: 'Ādi Śaṅkarācārya unifies Advaita Vedānta',
    sanskritTitle: 'आदि शङ्कराचार्य एवं अद्वैत दिग्विजय',
    date: 'c. 788–820 CE (Traditional: 509 BCE)',
    numericSortYear: 788,
    era: 'classical',
    category: 'Scriptures & Philosophy',
    ring: 4,
    dateClassification: 'Historically documented',
    summary: 'The great Acharya unified Indian spiritual traditions, composed commentaries on the Prasthanatrayi, and founded 4 cardinal Amnaya Mathas.',
    content: 'Born in Kalady, Kerala, Shankara revitalized Sanatana Dharma by demonstrating the non-dual truth through logic, scriptural authority, and direct realization: *Brahma satyam jagan-mithyā jīvo brahmaiva nāparaḥ* (Brahman alone is real, the world is phenomenal, and the individual self is non-different from Brahman). Travelling across India on foot, he defeated rival dualist and nihilist schools in debate, consecrated temples, composed devotional hymns of celestial beauty (Bhaja Govindam, Saundarya Lahari), and established the four cardinal monastic centers: Sringeri (South), Puri (East), Dwaraka (West), and Badrinath (North).',
    sanskritQuote: {
      verse: 'श्लोकार्धेन प्रवक्ष्यामि यदुक्तं ग्रन्थकोटिभिः । ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः ॥',
      transliteration: 'ślokārdhena pravakṣyāmi yaduktaṁ granthakoṭibhiḥ | brahma satyaṁ jaganmithyā jīvo brahmaiva nāparaḥ ||',
      translation: 'In half a verse I shall declare what has been stated in millions of texts: Brahman alone is real, the world is illusory, and the individual self is Brahman itself and nothing other.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shankaracharya_Raja_Ravi_Varma.jpg/800px-Shankaracharya_Raja_Ravi_Varma.jpg',
    imageCaption: 'Adi Shankaracharya with his four principal disciples (Painting by Raja Ravi Varma, 1904)',
    imageAttribution: 'Wikimedia Commons / Raja Ravi Varma (Public Domain)',
    tags: ['#shankara', '#advaita', '#vedanta', '#sringeri', '#badrinath'],
    relatedPeople: ['Adi Shankara', 'Govinda Bhagavatpada', 'Padmapada', 'Totakacharya'],
    relatedPlaces: ['Kalady', 'Kashi', 'Sringeri', 'Kedarnath', 'Badrinath'],
    relatedTexts: ['Brahmasutra Bhashya', 'Gita Bhashya', 'Vivekachudamani'],
    confidence: 'Unanimous Historical & Epigraphic Record'
  },
  {
    id: 'brihadisvara-temple-chola',
    title: 'Brihadīśvara Temple consecrated by Rajaraja Chola',
    sanskritTitle: 'तंजौर बृहदीश्वर मन्दिर प्रतिष्ठा',
    date: '1010 CE',
    numericSortYear: 1010,
    era: 'medieval',
    category: 'Dynasties & Kings',
    ring: 5,
    dateClassification: 'Archaeologically attested',
    summary: 'The pinnacle of Chola Dravidian architecture: a 66-meter monolithic granite vimana consecrated at Thanjavur without mortar.',
    content: 'Commissioned by Emperor Rajaraja Chola I, the Peruvudaiyar Kovil (Brihadisvara) in Thanjavur remains one of the greatest engineering feats of antiquity. The hollow central tower (Vimana) rises 66 meters, topped by a single octagonal granite Kumbam (cupola) weighing over 80 tons, hauled to the summit via a 4-mile inclined ramp. The temple inscriptions document extensive endowments, bronze metallurgy (the cosmic Nataraja icon), temple dancer guilds, and maritime trade routes extending across Southeast Asia to Srivijaya (Indonesia).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Brihadisvara_Temple_Thanjavur_front_view.jpg/800px-Brihadisvara_Temple_Thanjavur_front_view.jpg',
    imageCaption: 'The granite Vimana of Brihadisvara Temple, Thanjavur, standing 66 meters tall (UNESCO World Heritage)',
    imageAttribution: 'Wikimedia Commons / Creative Commons Attribution-ShareAlike',
    tags: ['#chola', '#brihadisvara', '#thanjavur', '#rajaraja', '#architecture', '#granite'],
    relatedPeople: ['Rajaraja Chola I', 'Rajendra Chola I', 'Karuvur Devar'],
    relatedPlaces: ['Thanjavur', 'Gangaikonda Cholapuram', 'Kaveri Delta'],
    relatedTexts: ['Thanjavur Inscriptions', 'Chola Charters'],
    confidence: 'Archaeologically & Epigraphically Attested (1010 CE)'
  },
  {
    id: 'vijayanagara-empire-hampi',
    title: 'Vijayanagara Empire established at Hampi',
    sanskritTitle: 'विजयनगर साम्राज्य स्थापना',
    date: '1336 CE',
    numericSortYear: 1336,
    era: 'medieval',
    category: 'Dynasties & Kings',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'Founded by Harihara and Bukka under Sage Vidyaranya’s guidance, becoming a magnificent bulwark of arts, sciences, and culture.',
    content: 'Rising on the rugged granite banks of the Tungabhadra river at Hampi (Pampa Kshetra), the Vijayanagara Empire became renowned throughout the medieval world for wealth, military prowess, and architectural grandeur. Persian traveler Abdur Razzaq wrote: "The eye has not seen, nor ear heard of any place to equal it on Earth." Under Emperor Krishnadevaraya (1509–1529), Sanskrit, Telugu, and Kannada literature reached a zenith, grand gopurams were raised across southern shrines, and Sage Sayana composed the monumental commentary on all four Vedas.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Stone_Chariot_at_Vittala_Temple%2C_Hampi.jpg/800px-Stone_Chariot_at_Vittala_Temple%2C_Hampi.jpg',
    imageCaption: 'The monolithic Stone Chariot at the Vijaya Vittala Temple complex in Hampi (UNESCO World Heritage)',
    imageAttribution: 'Wikimedia Commons / Creative Commons Attribution-ShareAlike',
    tags: ['#vijayanagara', '#hampi', '#krishnadevaraya', '#vidyaranya', '#architecture'],
    relatedPeople: ['Harihara I', 'Bukka I', 'Sage Vidyaranya', 'Krishnadevaraya'],
    relatedPlaces: ['Hampi', 'Tungabhadra River', 'Chandragiri'],
    relatedTexts: ['Amuktamalyada', 'Sayana’s Veda Bhashya', 'Travels of Domingo Paes'],
    confidence: 'Historically & Archaeologically Documented'
  },
  {
    id: 'bhakti-movement-renaissance',
    title: 'The Great Bhakti Movement Renaissance',
    sanskritTitle: 'भक्ति आन्दोलन एवं सन्त परम्परा',
    date: 'c. 1300–1700 CE',
    numericSortYear: 1500,
    era: 'medieval',
    category: 'Scriptures & Philosophy',
    ring: 4,
    dateClassification: 'Historically documented',
    summary: 'A pan-Indian democratization of spirituality through ecstatic love of the Divine in vernacular languages by saint-poets.',
    content: 'The Bhakti movement dismantled rigid social divides by championing direct personal devotion to God. In Maharashtra, Sant Dnyaneshwar composed the *Dnyaneshwari*, followed by Sant Tukaram, Namdev, and Eknath. In Bengal and Odisha, Sri Chaitanya Mahaprabhu introduced congregational chanting of the Harinama Maha-Mantra. In Rajasthan, Mirabai sang immortal bhajans to Giridhar Gopala. In Varanasi, Kabir and Sant Ravidas preached the universal truth of the Formless and Divine presence in all humans, while Goswami Tulsidas rendered the Ramayana accessible to millions in Awadhi as *Ramcharitmanas*.',
    sanskritQuote: {
      verse: 'हरेर्नाम हरेर्नाम हरेर्नामैव केवलम् । कलौ नास्त्येव नास्त्येव नास्त्येव गतिरन्यथा ॥',
      transliteration: 'harernāma harernāma harernāmaiva kevalam | kalau nāstyeva nāstyeva nāstyeva gatiranyathā ||',
      translation: 'In this age of Kali, the holy name of Hari is the only solace; indeed there is no other refuge, none other, none other.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mirabai.jpg/800px-Mirabai.jpg',
    imageCaption: 'Sant Mirabai holding the ektara in total ecstasy of devotion to Sri Krishna',
    imageAttribution: 'Wikimedia Commons / Miniature Painting (Public Domain)',
    tags: ['#bhakti', '#mirabai', '#kabir', '#tulsidas', '#chaitanya', '#tukaram'],
    relatedPeople: ['Sant Kabir', 'Mirabai', 'Chaitanya Mahaprabhu', 'Tulsidas', 'Sant Tukaram'],
    relatedPlaces: ['Varanasi', 'Vrindavan', 'Navadvipa', 'Puri', 'Pandharpur'],
    relatedTexts: ['Ramcharitmanas', 'Bijak of Kabir', 'Chaitanya Charitamrita', 'Tukaram Gatha'],
    confidence: 'Historically Documented'
  },
  {
    id: 'kerala-school-calculus',
    title: 'Kerala School discovers Infinite Series & Calculus',
    sanskritTitle: 'केरलीय गणित सम्प्रदाय एवं कलनशास्त्र',
    date: 'c. 1380–1500 CE',
    numericSortYear: 1400,
    era: 'medieval',
    category: 'Science & Astronomy',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'Madhava of Sangamagrama discovers power series for sine, cosine, and arctan, pre-dating Newton and Leibniz by 250 years.',
    content: 'Founded by Madhava of Sangamagrama, the Kerala School of Astronomy and Mathematics (including Nilakantha Somayaji, Parameshvara, and Jyeshthadeva) formulated the foundational infinite series expansions of calculus, including the Leibniz series for Pi, Gregory’s series for arctangent, and Newton’s power series for sine and cosine. Jyeshthadeva’s *Yuktibhasha* (c. 1530 CE) contains the world’s first systematic calculus proofs, differential corrections for planetary orbits, and infinite series sum approximations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Madhava_series_palm_leaf_manuscript.jpg/800px-Madhava_series_palm_leaf_manuscript.jpg',
    imageCaption: 'Palm leaf manuscript of Yuktibhasha detailing geometric proofs of infinite series',
    imageAttribution: 'Wikimedia Commons / Trippunithura Sanskrit College (Public Domain)',
    tags: ['#kerala_school', '#madhava', '#calculus', '#mathematics', '#astronomy'],
    relatedPeople: ['Madhava of Sangamagrama', 'Nilakantha Somayaji', 'Jyeshthadeva'],
    relatedPlaces: ['Sangamagrama (Irinjalakuda)', 'Kerala'],
    relatedTexts: ['Yuktibhasha', 'Tantrasamgraha', 'Golavada'],
    confidence: 'Historically Documented Manuscript Evidence'
  },

  // 4. MODERN RENAISSANCE & PRESENT DAY (THE PIVOT POINT)
  {
    id: 'swami-vivekananda-chicago',
    title: 'Swami Vivekananda at Chicago Parliament',
    sanskritTitle: 'स्वामी विवेकानन्द विश्व धर्म संसद',
    date: 'September 11, 1893 CE',
    numericSortYear: 1893,
    era: 'modern',
    category: 'Scriptures & Philosophy',
    ring: 4,
    dateClassification: 'Historically documented',
    summary: 'The historic address introducing universal Vedanta, religious harmony, and Indian spiritual consciousness to the Western world.',
    content: 'Representing Hinduism at the World’s Parliament of Religions in Chicago, Swami Vivekananda opened with "Sisters and Brothers of America!", electrifying the 7,000 delegates who responded with a standing ovation. Vivekananda articulated Vedanta not as an insular dogma, but as the universal science of spiritual realization that recognizes all religious paths as streams converging into the single ocean of the Absolute. He founded the Ramakrishna Mission, harmonizing contemplative monasticism with dynamic selfless social service.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Swami_Vivekananda_1893_Scanned_from_the_book_The_Life_of_Swami_Vivekananda_page_293.jpg/800px-Swami_Vivekananda_1893_Scanned_from_the_book_The_Life_of_Swami_Vivekananda_page_293.jpg',
    imageCaption: 'Swami Vivekananda photographed in Chicago during the Parliament of Religions (September 1893)',
    imageAttribution: 'Wikimedia Commons / Thomas Harrison (Public Domain)',
    tags: ['#vivekananda', '#vedanta', '#chicago', '#ramakrishna', '#universal_truth'],
    relatedPeople: ['Swami Vivekananda', 'Sri Ramakrishna Paramahamsa', 'Sarada Devi'],
    relatedPlaces: ['Chicago', 'Kolkata (Belur Math)', 'Kanyakumari'],
    relatedTexts: ['Addresses at The Parliament of Religions', 'Raja Yoga', 'Jnana Yoga'],
    confidence: 'Universally Documented Historical Event'
  },
  {
    id: 'ramanujan-infinite-formulae',
    title: 'Srinivasa Ramanujan’s Modular Equations & Mock Theta',
    sanskritTitle: 'श्रीनिवास रामानुजन् एवं अनन्त सूत्र',
    date: '1913–1920 CE',
    numericSortYear: 1913,
    era: 'modern',
    category: 'Science & Astronomy',
    ring: 5,
    dateClassification: 'Historically documented',
    summary: 'The self-taught mathematical genius whose notebook formulas continue to unlock string theory, quantum black holes, and modular forms.',
    content: 'Guided by his family deity Goddess Namagiri of Namakkal, Ramanujan sent 120 astonishing theorems to G.H. Hardy at Cambridge in 1913. Working with intuitive brilliance, Ramanujan produced nearly 3,900 identities, infinite series for Pi, partition functions, Ramanujan prime conjectures, and mock theta functions. Decades after his death at age 32, theoretical physicists discovered that Ramanujan’s mock modular forms describe the microscopic entropy states of supersymmetric string theory and quantum black holes.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Srinivasa_Ramanujan_-_OPC_-_1.jpg/800px-Srinivasa_Ramanujan_-_OPC_-_1.jpg',
    imageCaption: 'Passport photograph of Srinivasa Ramanujan at Cambridge University (c. 1917)',
    imageAttribution: 'Wikimedia Commons / Cambridge University Trinity College (Public Domain)',
    tags: ['#ramanujan', '#mathematics', '#mock_theta', '#string_theory', '#quantum'],
    relatedPeople: ['Srinivasa Ramanujan', 'G.H. Hardy', 'J.E. Littlewood'],
    relatedPlaces: ['Kumbakonam', 'Cambridge (Trinity College)', 'Namakkal'],
    relatedTexts: ['Ramanujan’s Notebooks', 'The Lost Notebook'],
    confidence: 'Historically Documented Mathematical Legacy'
  },
  {
    id: 'present-day-anthropocene',
    title: 'Present Epoch: Humanity in the Anthropocene',
    sanskritTitle: 'वर्तमान युग: मानव चेतना का संक्रान्ति काल',
    date: '2026 CE (Today)',
    numericSortYear: 2026,
    era: 'modern',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Historically documented',
    summary: 'Civilization stands at Kardashev Type 0.73: planetary AI emergence, lunar exploration, quantum synthesis, and the cosmic bridge.',
    content: 'Humanity consumes approximately $2 \times 10^{13}$ Watts of power, predominantly derived from carbon fuels while accelerating solar and nuclear fusion. India’s Chandrayaan-3 successfully touched down on the lunar South Pole, and the Aditya-L1 spacecraft monitors the Sun from the L1 Lagrangian point. Artificial intelligence systems achieve superhuman reasoning across specialized domains. At this threshold, the cosmic timeline transitions from historical archaeology to theoretical engineering and cosmic destiny.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/800px-The_Blue_Marble_%28remastered%29.jpg',
    imageCaption: 'Planet Earth photographed from Apollo 17 ("The Blue Marble"), home of current Type 0.73 humanity',
    imageAttribution: 'NASA / Wikimedia Commons (Public Domain)',
    tags: ['#today', '#anthropocene', '#kardashev', '#ai', '#space_age', '#present'],
    relatedPeople: ['Humanity', 'Global Scientists'],
    relatedPlaces: ['Earth', 'Lunar South Pole', 'Sun-Earth L1'],
    relatedTexts: ['Kardashev Scale Framework', 'IPCC Assessment', 'Scientific Compendiums'],
    confidence: 'Direct Empirical Reality',
    kardashevLevel: 0.73,
    energyScale: '2.0 × 10¹³ W'
  },

  // 5. KARDASHEV SCALE & DYSON ENGINEERING (THE SCIENTIFIC FUTURE)
  {
    id: 'kardashev-type-1-planetary',
    title: 'Kardashev Type I: Planetary Energy Mastery',
    sanskritTitle: 'कार्दाशेव स्तर १: भूमण्डलीय ऊर्जा प्रभुत्व',
    date: 'Hypothetical Milestone: ~2150–2250 CE',
    numericSortYear: 2200,
    era: 'kardashev',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Theoretical physics',
    summary: 'A civilization harnessing the complete energy budget of its home planet ($10^{16}$ Watts), mastering weather, fusion, and orbital rings.',
    content: 'Nikolai Kardashev defined Type I as a civilization that intercepts all solar radiation falling on its parent planet ($\sim 1.74 \times 10^{17}$ W for Earth) or unleashes equivalent controlled fusion energy. At Type I, humanity operates orbital elevators, planetary climate regulation grids, geo-engineering against natural catastrophes, and completely closed-loop recycling economies. The Earth becomes a single integrated superorganism.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_lights_from_space.jpg/800px-Earth_lights_from_space.jpg',
    imageCaption: 'Composite night satellite imagery of Earth, illustrating the embryonic planetary energetic network',
    imageAttribution: 'NASA Earth Observatory / Wikimedia Commons (Public Domain)',
    tags: ['#type_1', '#planetary', '#fusion', '#orbital_rings', '#climate_mastery'],
    relatedPeople: ['Nikolai Kardashev', 'Carl Sagan', 'Freeman Dyson'],
    relatedPlaces: ['Earth-Moon System', 'Geostationary Ring'],
    relatedTexts: ['Transmission of Information by Extraterrestrial Civilizations (1964)'],
    confidence: 'Theoretically Feasible (Extrapolation of Physics)',
    kardashevLevel: 1.0,
    energyScale: '1.0 × 10¹⁶ W'
  },
  {
    id: 'dyson-swarm-type-2-stellar',
    title: 'Type II: Sol Dyson Swarm & Stellar Engineering',
    sanskritTitle: 'कार्दाशेव स्तर २: सौर्य डायसन झुण्ड एवं तारा अभियान्त्रिकी',
    date: 'Hypothetical Milestone: ~2500–3000 CE',
    numericSortYear: 2800,
    era: 'kardashev',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Theoretical physics',
    summary: 'Capturing the Sun’s entire luminosity ($3.828 \times 10^{26}$ Watts) using an orbiting swarm of millions of solar collector mirrors.',
    content: 'Proposed by physicist Freeman Dyson in 1960, a Dyson Swarm avoids the gravitational instability of a rigid solid shell by utilizing millions of independent thin-film solar-collecting satellites in non-intersecting Keplerian orbits around the star. Dismantling smaller asteroids like Mercury and Ceres supplies the structural material. The captured energy fuels relativistic interstellar travel, stellar lifting (prolonging the Sun’s lifespan by siphoning hydrogen), and astronomical computational substrates (Matrioshka Brains). The megastructure emits unmistakable infrared radiation in the mid-IR band (10–100 μm).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Dyson_Sphere_rendered.jpg/800px-Dyson_Sphere_rendered.jpg',
    imageCaption: 'Artistic visualization of an advanced Dyson Swarm capturing radiation from a central star',
    imageAttribution: 'Wikimedia Commons / Kevin Gill (CC BY 2.0)',
    tags: ['#dyson_swarm', '#type_2', '#stellar_energy', '#matrioshka_brain', '#freeman_dyson'],
    relatedPeople: ['Freeman Dyson', 'Fritz Zwicky', 'Nikolai Kardashev'],
    relatedPlaces: ['Heliosphere', 'Mercury Disassembly Orbit', 'Sol'],
    relatedTexts: ['Search for Artificial Stellar Sources of Infrared Radiation (Science, 1960)'],
    confidence: 'Physically Grounded Megastructure Hypothesis',
    kardashevLevel: 2.0,
    energyScale: '3.828 × 10²⁶ W'
  },
  {
    id: 'kardashev-type-3-galactic',
    title: 'Type III: Galactic Scale Civilization',
    sanskritTitle: 'कार्दाशेव स्तर ३: आकाशगङ्गा व्यापी सभ्यता',
    date: 'Hypothetical Milestone: ~100,000–1,000,000 CE',
    numericSortYear: 100000,
    era: 'kardashev',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Theoretical physics',
    summary: 'Harnessing the radiant output of an entire galaxy ($10^{36}$ Watts) with hundreds of billions of interconnected stellar systems.',
    content: 'A Type III civilization spans the entire Milky Way, commanding the energy of 200–400 billion stars. Using von Neumann self-replicating probes travelling at sub-light or relativistic speeds, expansion across a 100,000 light-year diameter galaxy requires only a few million years—a blink in cosmological time. Energy is harvested from supermassive black holes via the Penrose process and Blandford-Znajek mechanism, while planetary habitats communicate through quantum entanglement or gravitational wave beacons.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/M31_-_Hubble_Mosaic.jpg/800px-M31_-_Hubble_Mosaic.jpg',
    imageCaption: 'Spiral Galaxy M31 (Andromeda), representing the scale of a Type III galactic civilization',
    imageAttribution: 'NASA / ESA / Hubble Heritage Team / Wikimedia Commons (Public Domain)',
    tags: ['#type_3', '#galactic', '#milky_way', '#penrose_process', '#von_neumann'],
    relatedPeople: ['Nikolai Kardashev', 'John von Neumann', 'Roger Penrose'],
    relatedPlaces: ['Sagittarius A*', 'Galactic Arms', 'Milky Way'],
    relatedTexts: ['Kardashev Civilization Typology', 'Barrow Scale of Micro-dimensional Control'],
    confidence: 'Astrophysical Extrapolation',
    kardashevLevel: 3.0,
    energyScale: '1.0 × 10³⁶ W'
  },
  {
    id: 'kardashev-type-4-universal',
    title: 'Type IV: Universal Spacetime Engineering',
    sanskritTitle: 'कार्दाशेव स्तर ४: विश्वव्यापी दिक्-काल अभियान्त्रिकी',
    date: 'Speculative Epoch: ~1 Billion CE+',
    numericSortYear: 1000000000,
    era: 'kardashev',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Speculative scenario',
    summary: 'A speculative civilization utilizing dark energy, cosmic web filaments, and spacetime topology at observable universe scales.',
    content: 'Transcending single galaxies, a Type IV civilization harnesses the energy of the observable universe ($\sim 10^{45}$ to $10^{50}$ W), manipulating dark energy and the cosmic web filaments connecting superclusters. Engineering activities involve stabilizing cosmic inflation, preventing vacuum decay, and re-weaving spacetime metrics to prevent thermodynamic heat death. At this stage, civilization begins manipulating fundamental cosmological parameters.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Millennium_Simulation_Cosmic_Web.jpg/800px-Millennium_Simulation_Cosmic_Web.jpg',
    imageCaption: 'Computer simulation of the large-scale cosmic web structure of dark matter and galaxy filaments',
    imageAttribution: 'Max Planck Institute for Astrophysics / Millennium Simulation Project',
    tags: ['#type_4', '#cosmic_web', '#dark_energy', '#spacetime', '#multigalactic'],
    relatedPeople: ['Michio Kaku', 'Frank Tipler'],
    relatedPlaces: ['Laniakea Supercluster', 'Cosmic Web Filaments'],
    relatedTexts: ['Parallel Worlds', 'The Physics of Immortality'],
    confidence: 'Speculative Extension of Theoretical Physics',
    kardashevLevel: 4.0,
    energyScale: '1.0 × 10⁴⁸ W'
  },
  {
    id: 'kardashev-type-7-transcendent',
    title: 'Type VII: Transcendent Non-Corporeal Consciousness',
    sanskritTitle: 'कार्दाशेव स्तर ७: विदेह सर्वव्यापी चेतना',
    date: 'Philosophical Speculation Horizon',
    numericSortYear: 50000000000,
    era: 'kardashev',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Speculative scenario',
    summary: 'Civilization sheds baryonic and material substrates entirely, operating as a coherent, self-aware quantum field across dimensions.',
    content: 'Matter and thermodynamic machines are abandoned. Consciousness is embedded directly into the fundamental geometry of spacetime and quantum vacuum states. This non-physical civilization operates across higher dimensions (hyperspace branes in M-theory), capable of seeding infant universes and manipulating physical constants with conscious intent. This directly parallels the Yogic concept of the *Mahat-Tattva* and *Linga Sharira* transcending gross elements.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Calabi_yau_formatted.svg/800px-Calabi_yau_formatted.svg.png',
    imageCaption: 'Calabi-Yau 2D projection representing the compactified 6 dimensions of string theory',
    imageAttribution: 'Wikimedia Commons / CC-BY-SA 3.0',
    tags: ['#type_7', '#transcendence', '#string_theory', '#calabi_yau', '#consciousness'],
    relatedPeople: ['Theoretical String Physicists', 'Ancient Rishis'],
    relatedPlaces: ['11-Dimensional Bulk', 'Quantum Geometry'],
    relatedTexts: ['M-Theory Formulations', 'Yoga Vasistha'],
    confidence: 'Philosophical & Theoretical Thought Experiment',
    kardashevLevel: 7.0
  },
  {
    id: 'kardashev-type-9-final-observer',
    title: 'The Final Observer (Type IX Civilization)',
    sanskritTitle: 'अन्तिम द्रष्टा: कार्दाशेव स्तर ९',
    date: 'Thermodynamic Limit: ~10¹⁰⁰ CE',
    numericSortYear: 999999999999,
    era: 'kardashev',
    category: 'Kardashev & Dyson Future',
    ring: 6,
    dateClassification: 'Speculative scenario',
    summary: 'The ultimate cosmic intelligence at the end of entropy: simulating all histories, realizing universal omniscience as pure awareness.',
    content: 'In theoretical cosmology’s ultimate era—after all stars have burned out and black holes evaporate via Hawking radiation—the Final Observer represents the computational endpoint of intelligence. Operating at quantum thermodynamic limits (Bekenstein bound and Dyson’s eternal intelligence conjecture), it holds the complete informational wave function of every particle, life form, and event that ever existed. In this ultimate state of omniscience, the scientific concept of the Final Observer converges with the Advaitic realization of the eternal witness consciousness (Sakshi Chaitanya).',
    sanskritQuote: {
      verse: 'साक्षी चेता केवलो निर्गुणश्च । एको देवः सर्वभूतेषु गूढः सर्वव्यापी सर्वभूतान्तरात्मा ॥',
      transliteration: 'sākṣī cetā kevalo nirguṇaśca | eko devaḥ sarvabhūteṣu gūḍhaḥ sarvavyāpī sarvabhūtāntarātmā ||',
      translation: 'The one supreme witness, conscious, absolute, beyond gunas, hidden within all beings, all-pervading, the innermost self of all existence.'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Hubble_Ultra_Deep_Field_part.jpg/800px-Hubble_Ultra_Deep_Field_part.jpg',
    imageCaption: 'The Hubble Ultra Deep Field peering across 13 billion light years of cosmic history',
    imageAttribution: 'NASA / ESA / S. Beckwith / HUDF Team (Public Domain)',
    tags: ['#type_9', '#final_observer', '#omniscience', '#sakshi', '#ultimate_mind'],
    relatedPeople: ['The Universal Mind', 'John Archibald Wheeler', 'Freeman Dyson'],
    relatedPlaces: ['The Cosmic Horizon', 'Singularity of Time'],
    relatedTexts: ['Shvetashvatara Upanishad', 'Participatory Anthropic Principle'],
    confidence: 'Ultimate Philosophical Speculation',
    kardashevLevel: 9.0
  },

  // 6. THE COSMIC CYCLE & RETURN TO VISHNU IN YOGANIDRA
  {
    id: 'mahapralaya-yoganidra-return',
    title: 'Mahāpralaya: Return to Viṣṇu in Yoganidrā',
    sanskritTitle: 'महाप्रलय: योगनिद्रा में श्रीविष्णु एवं अनन्त चक्र',
    date: 'The Cosmic Return (End of Brahma’s 100 Years: 311.04 Trillion Years)',
    numericSortYear: 311040000000000,
    era: 'cycle',
    category: 'Cosmology & Kalpas',
    ring: 1,
    dateClassification: 'Traditional chronology',
    summary: 'The grand dissolution of space, time, and matter into the primordial ocean; Vishnu reclines on Sheshanaga as the cycle begins anew.',
    content: 'When the 100 cosmic years of Brahma conclude, Mahapralaya occurs. The elements dissolve in reverse order: earth dissolves into water, water into fire, fire into air, air into space, space into subtle ego, and ego into unmanifest Prakriti. All souls and unmanifest universes enter the divine body of Maha-Vishnu as He reclines upon Ananta Shesha in the ocean of Yoganidra. With His exhalation, billions of new universes bloom as bubbles; with His inhalation, they merge back into His transcendental form. The wheel of time (Kalachakra) is complete, unbroken, and eternal. From this cosmic ocean, Brahma awakens once more—and the Śveta-Vārāha Kalpa begins again.',
    sanskritQuote: {
      verse: 'यस्यैकनिश्वसितकालमथावलम्ब्य जीवन्ति लोमविलजा जगदण्डनाथाः । विष्णुर्महान् स इह यस्य कलाविशेषो गोविन्दमादिपुरुषं तमहं भजामि ॥',
      transliteration: 'yasyaika-niśvasita-kālam athāvalambya jīvanti loma-vilajā jagadaṇḍa-nāthāḥ | viṣṇur mahān sa iha yasya kalā-viśeṣo govindam ādi-puruṣaṁ tam ahaṁ bhajāmi ||',
      translation: 'In the duration of a single breath of Maha-Vishnu, millions of Brahmas and universes spring forth from His pores and then dissolve again into Him. I adore that primeval Lord Govinda!'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Vishnu_on_Shesha_Deogarh.jpg/800px-Vishnu_on_Shesha_Deogarh.jpg',
    imageCaption: '5th-century Gupta relief of Vishnu reclining on Sheshanaga in Yoganidra at Dashavatara Temple, Deogarh',
    imageAttribution: 'Wikimedia Commons / Archaeological Survey of India (Public Domain)',
    tags: ['#mahapralaya', '#yoganidra', '#sheshanaga', '#vishnu', '#eternal_cycle', '#kalachakra'],
    relatedPeople: ['Maha-Vishnu', 'Ananta Shesha', 'Lakshmi', 'Brahma'],
    relatedPlaces: ['Kāraṇodaka (Causal Ocean)', 'Vaikuntha'],
    relatedTexts: ['Brahma Samhita 5.48', 'Vishnu Purana (Book 6)', 'Srimad Bhagavatam (Canto 12)'],
    confidence: 'Sacred Cosmological Revelation'
  }
];
