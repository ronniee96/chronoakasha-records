export interface ScriptureRecord {
  id: string;
  category: 'Vedas' | 'Upanishads' | 'Gita & Itihasa' | 'Puranas' | 'Surya Siddhanta & Astronomy' | 'Ancient Sciences';
  title: string;
  sanskritTitle: string;
  sourceText: string;
  chapterVerse: string;
  sanskritDevanagari: string;
  iastTransliteration: string;
  englishTranslation: string;
  cosmologicalContext: string;
  scientificSignificance: string;
  scholarlyInterpretation: string;
  tags: string[];
}

export const SCRIPTURE_RECORDS: ScriptureRecord[] = [
  {
    id: 'nasadiya-sukta-cosmology',
    category: 'Vedas',
    title: 'Nasadiya Sukta — The Hymn of Cosmic Origin',
    sanskritTitle: 'नासदीय सूक्तम् • ऋग्वेद',
    sourceText: 'Rigveda Samhita',
    chapterVerse: 'Mandala 10, Sukta 129, Verse 1-2',
    sanskritDevanagari: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥ १ ॥\nन मृत्युरासीदमृतं न तर्हि न रात्र्या अह्न आसीत्प्रकेतः ।\nआनीदवातं स्वधया तदेकं तस्माद्धान्यन्न परः किञ्चनास ॥ २ ॥',
    iastTransliteration: 'nāsadāsīnno sadāsīttadānīṃ nāsīdrajo no vyomā paro yat |\nkimāvarīvaḥ kuha kasya śarmannambhaḥ kimāsīdgahanaṃ gabhīram || 1 ||\nna mṛtyurāsīdamṛtaṃ na tarhi na rātryā ahna āsītpraketaḥ |\nānīdavātaṃ svadhayā tadekaṃ tasmāddhānyanna paraḥ kiñcanāsa || 2 ||',
    englishTranslation: 'Then was not non-existence nor existence: there was no realm of air, no sky beyond it. What covered in, and where? and what gave shelter? Was water there, unfathomed depth of water? Death was not then, nor was there aught immortal: no sign was there, the day’s and night’s divider. That One Thing, breathless, breathed by its own nature: apart from it was nothing whatsoever.',
    cosmologicalContext: 'Pre-creation state prior to the emergence of matter, radiation, spacetime metrics, or duality. Directly resonates with the modern inflationary universe and quantum vacuum potential.',
    scientificSignificance: 'Anticipates non-dogmatic cosmological inquiry into the pre-Big Bang epoch, acknowledging epistemic horizons ("Who verily knows and who can here declare it, whence it was born and whence comes this creation?").',
    scholarlyInterpretation: 'Max Müller and Heinrich Zimmer celebrated this hymn as humanity’s earliest recorded philosophical contemplation of cosmogenesis devoid of anthropomorphic mythology.',
    tags: ['Rigveda', 'Nasadiya Sukta', 'Cosmogenesis', 'Quantum Vacuum', 'Pre-Big Bang'],
  },
  {
    id: 'surya-siddhanta-sidereal-time',
    category: 'Surya Siddhanta & Astronomy',
    title: 'Surya Siddhanta — Measure of Cosmic Time & Yugas',
    sanskritTitle: 'सूर्यसिद्धान्तः • मध्यमाधिकारः',
    sourceText: 'Surya Siddhanta',
    chapterVerse: 'Madhyamadhikara, Verses 15-17',
    sanskritDevanagari: 'युगानां द्विसहस्रेण ब्रह्मणः कल्प उच्यते ।\nतस्मिन्कल्पे मनवश्चतुर्दश भवन्ति हि ॥ १५ ॥\nकृतत्रेताद्वापरकलियुगैः सहितास्तथा ।\nचतुर्युगानि सहस्रं ब्रह्मण एकमहः स्मृतम् ॥ १६ ॥',
    iastTransliteration: 'yugānāṃ dvisahasreṇa brahmaṇaḥ kalpa ucyate |\ntasminkalpe manavaścaturdaśa bhavanti hi || 15 ||\nkṛtatretādvāparakaliyugaiḥ sahitāstathā |\ncaturyugāni sahasraṃ brahmaṇa ekamahaḥ smṛtam || 16 ||',
    englishTranslation: 'Two thousand Mahayugas constitute a Kalpa, which is one day and night of Brahma. Within that Kalpa reside fourteen Manvantaras. A single day of Brahma comprises one thousand Chaturyugas (4.32 billion terrestrial years).',
    cosmologicalContext: 'Defines the quantitative astronomical time scale of Indian civilization, measuring time from the microscopic Prana (breath = 4 seconds) to the Kalpa ($4.32 \times 10^9$ years) and Mahakalpa ($311.04 \times 10^{12}$ years).',
    scientificSignificance: 'The only ancient civilization that independently calculated cosmic epochs on the order of billions of years, closely agreeing with the modern radiometric age of the Earth ($4.54 \times 10^9$ years).',
    scholarlyInterpretation: 'Carl Sagan remarked: "The Hindu religion is the only one of the world\'s great faiths dedicated to the idea that the Cosmos itself undergoes an immense, indeed an infinite, number of deaths and rebirths... It is the only religion in which the time scales correspond to those of modern scientific cosmology."',
    tags: ['Surya Siddhanta', 'Kalpa', 'Mahayuga', 'Cosmic Time', 'Carl Sagan'],
  },
  {
    id: 'gita-cosmic-dissolution',
    category: 'Gita & Itihasa',
    title: 'Bhagavad Gita — Day and Night of Cosmic Creation',
    sanskritTitle: 'श्रीमद्भगवद्गीता • अक्षरब्रह्मयोगः',
    sourceText: 'Bhagavad Gita',
    chapterVerse: 'Chapter 8, Verses 17-18',
    sanskritDevanagari: 'सहस्रयुगपर्यन्तमहर्यद्ब्रह्मणो विदुः ।\nरात्रिं युगसहस्रान्तां तेऽहोरात्रविदो जनाः ॥ १७ ॥\nअव्यक्ताद्व्यक्तयः सर्वाः प्रभवन्त्यहरागमे ।\nरात्र्यागमे प्रलीयन्ते तत्रैवाव्यक्तसंज्ञके ॥ १८ ॥',
    iastTransliteration: 'sahasrayugaparyantamaharyadbrahmaṇo viduḥ |\nrātriṃ yugasahasrāntāṃ te\'horātravido janāḥ || 17 ||\navyaktādvyaktayaḥ sarvāḥ prabhavantyaharāgame |\nrātryāgame pralīyante tatraivāvyaktasaṃjñake || 18 ||',
    englishTranslation: 'Those who know that the day of Brahma extends for a thousand Mahayugas (4.32 billion years) and his night for another thousand Mahayugas, they truly understand day and night. At the approach of Brahma’s day, all manifested beings emanate from the unmanifest; at the approach of his night, they dissolve back into that very unmanifest.',
    cosmologicalContext: 'Cyclic dissolution and manifestation (Srishti and Pralaya). Spacetime metrics expand into physical matter during the cosmic day and collapse into quantum unmanifest potential during the cosmic night.',
    scientificSignificance: 'Mirrors cyclic conformal cosmologies (Penrose CCC) and the pulsating model of cosmic expansion, entropy dissipation, and cosmic rebirth.',
    scholarlyInterpretation: 'Adi Shankaracharya comments in his Gita Bhashya that Avyakta is the causal state of universal equilibrium where karmic impressions remain dormant before the subsequent cosmic dawn.',
    tags: ['Bhagavad Gita', 'Cyclic Universe', 'Avyakta', 'Srishti', 'Pralaya'],
  },
  {
    id: 'vishnu-purana-pralaya',
    category: 'Puranas',
    title: 'Vishnu Purana — The Four Orders of Universal Dissolution',
    sanskritTitle: 'विष्णुपुराणम् • प्रलयव्यवस्था',
    sourceText: 'Vishnu Purana',
    chapterVerse: 'Book 6, Chapter 3, Verses 1-4',
    sanskritDevanagari: 'नैमित्तिकः प्राकृतिकस्तथैवात्यन्तिको द्विज ।\nनित्यश्चेति चतुर्द्धाऽयं प्रलयः संप्रकीर्तितः ॥\nब्राह्मो नैमित्तिकस्तत्र शेते यत्र जगत्पतिः ।\nप्राकृतो ब्रह्मणो नाशे मोक्षादात्यन्तिको मतः ॥',
    iastTransliteration: 'naimittikaḥ prākṛtikastathaivātyantiko dvija |\nnityaśceti caturddhā\'yaṃ pralayaḥ saṃprakīrtitaḥ ||\nbrāhmo naimittikastatra śete yatra jagatpatiḥ |\nprākṛto brahmaṇo nāśe mokṣādātyantiko mataḥ ||',
    englishTranslation: 'The cosmic dissolution is celebrated as fourfold: Naimittika (occasional, occurring at the end of Brahma’s day), Prakritika (elemental, occurring at the completion of Brahma’s 100-year life), Atyantika (absolute spiritual liberation), and Nitya (perpetual, atomic moment-to-moment decay).',
    cosmologicalContext: 'Categorizes entropy across four dimensional scales: diurnal stellar sleep, complete cosmic elemental dissolution into Prakriti, quantum perpetual decay, and individual consciousness transcendence.',
    scientificSignificance: 'Nitya Pralaya prefigures the second law of thermodynamics (continuous entropy increase). Prakritika Pralaya describes the complete decay of atoms, space, and vacuum into unmanifest energy.',
    scholarlyInterpretation: 'Puranic cosmology strictly separates intermediate planetary destruction (Naimittika) from total universal thermodynamic disintegration (Prakritika).',
    tags: ['Vishnu Purana', 'Pralaya', 'Entropy', 'Thermodynamics', 'Maha Pralaya'],
  },
  {
    id: 'vedanga-jyotisha-solstice',
    category: 'Surya Siddhanta & Astronomy',
    title: 'Vedanga Jyotisha — Solstice & Calendar Calibration',
    sanskritTitle: 'वेदाङ्ग ज्योतिषम् • कालविधानशास्त्रम्',
    sourceText: 'Rig-Jyotisha / Yajur-Jyotisha of Lagadha',
    chapterVerse: 'Verse 5-7',
    sanskritDevanagari: 'माघशुक्लप्रपन्नस्य पौषकृष्णसमापिनः ।\nयुगस्य पञ्चवर्षस्य कालज्ञानं प्रचक्षते ॥\nस्वराम्र्कौ यदा योगं वासवेन गतो भवेत् ।\nतदोदगयनं स्यात्तु सावनो मास एव च ॥',
    iastTransliteration: 'māghaśuklaprapannasya pauṣakṛṣṇasamāpinaḥ |\nyugasya pañcavarṣasya kālajñānaṃ pracakṣate ||\nsvarāmrkau yadā yogaṃ vāsavena gato bhavet |\ntadodagayanaṃ syāttu sāvano māsa eva ca ||',
    englishTranslation: 'The five-year lunisolar Yuga cycle commences with the bright half of Magha and concludes with the dark half of Pausha. When the Sun and Moon together enter the asterism of Vasava (Dhanishta), the northern course of the Sun (Uttarayana) begins.',
    cosmologicalContext: 'Composed by sage Lagadha (~1400–1200 BCE), it established the foundational mathematical rules for synchronizing civil solar years with lunar months using an intercalary 5-year Yuga.',
    scientificSignificance: 'Records the winter solstice occurring in the Dhanishta nakshatra, providing astronomers and historians with a precise archaeoastronomical anchor point for dating Vedic observations.',
    scholarlyInterpretation: 'B.G. Tilak in "Orion" and S.B. Dikshit analyzed these verses to demonstrate systematic astronomical observational records preserved in ancient India.',
    tags: ['Vedanga Jyotisha', 'Lagadha', 'Solstice', 'Dhanishta', 'Uttarayana', 'Archaeoastronomy'],
  },
  {
    id: 'chandogya-upanishad-space',
    category: 'Upanishads',
    title: 'Chandogya Upanishad — Akasha as the Source and Goal',
    sanskritTitle: 'छान्दोग्योपनिषत् • आकाशप्रकरणम्',
    sourceText: 'Chandogya Upanishad',
    chapterVerse: 'Prapathaka 1, Khanda 9, Verse 1',
    sanskritDevanagari: 'अस्य लोकस्य का गतिरित्याकाश इति होवाच ।\nसर्वाणि ह वा इमानि भूतान्याकाशादेव समुत्पद्यन्त\nआकाशं प्रत्यस्तं यन्त्याकाशो ह्येवेभ्यो ज्यायानाकाशः परायणम् ॥',
    iastTransliteration: 'asya lokasya kā gatirityākāśa iti hovāca |\nsarvāṇi ha vā imāni bhūtānyākāśādeva samutpadyanta\nākāśaṃ pratyastaṃ yantyākāśo hyevebhyo jyāyānākāśaḥ parāyaṇam ||',
    englishTranslation: 'What is the goal of this universe? "Akasha (Space)", he said. For all these beings emerge out of Space alone, and into Space they again dissolve back. For Space is greater than all these, Space is the ultimate support.',
    cosmologicalContext: 'Establishes Akasha (Spacetime Continuum) not as mere empty void, but as the subtlest material element that holds the metrics of physical geometry, sound vibration, and cosmic manifestation.',
    scientificSignificance: 'Anticipates Einsteinian spacetime as a dynamic, physical fabric that curves, generates gravitational fields, and hosts all matter and energy.',
    scholarlyInterpretation: 'Swami Vivekananda emphasized in his lectures on Raja Yoga that the ancient concept of Akasha corresponds precisely to the unified energetic field of modern physics.',
    tags: ['Chandogya Upanishad', 'Akasha', 'Spacetime', 'Cosmic Fabric', 'Vivekananda'],
  },
  {
    id: 'sushruta-samhita-surgical-science',
    category: 'Ancient Sciences',
    title: 'Sushruta Samhita — The Science of Surgery & Anatomy',
    sanskritTitle: 'सुश्रुतसंहिता • सूत्रस्थानम्',
    sourceText: 'Sushruta Samhita',
    chapterVerse: 'Sutrasthana, Chapter 1, Verse 15',
    sanskritDevanagari: 'शस्त्रं शास्त्रं यदा सम्यक् प्रयुज्येत चिकित्सकैः ।\nतदा सिद्धिर्भवेच्छीघ्रं नात्र कार्या विचारणा ॥\nशरीरे चैव शास्त्रे च दृष्टार्थः स्याद्विशारदः ।',
    iastTransliteration: 'śastraṃ śāstraṃ yadā samyak prayujyeta cikitsakaiḥ |\ntadā siddhirbhavecchīghraṃ nātra kāryā vicāraṇā ||\nśarīre caiva śāstre ca dṛṣṭārthaḥ syādviśāradaḥ |',
    englishTranslation: 'When surgical instrumentation and scientific theory are combined meticulously by the physician, success is accomplished swiftly without doubt. One must be proficient both in textual science and direct ocular anatomical observation of the body.',
    cosmologicalContext: 'Sushruta (6th century BCE, Varanasi) is recognized as the father of plastic surgery (rhinoplasty), ophthalmic cataract surgery, and systematic dissection of cadavers.',
    scientificSignificance: 'Establishes the empirical method in ancient medicine: requiring anatomical dissection, sterile hygiene, categorization of 121 surgical instruments, and prosthetic rehabilitation.',
    scholarlyInterpretation: 'The Royal College of Surgeons in London preserves Sushruta’s statue, honoring his documented techniques of pedicle skin flaps that laid the basis of modern reconstructive surgery.',
    tags: ['Sushruta Samhita', 'Ayurveda', 'Surgery', 'Anatomy', 'Empirical Science'],
  },
];
