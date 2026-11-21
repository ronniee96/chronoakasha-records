export interface ProphecyRecord {
  id: string;
  tradition: 'Hindu Puranic' | 'Kalki Tradition' | 'Nostradamus' | 'Mayan Calendar' | 'Biblical' | 'Buddhist' | 'Modern Futurist & Science';
  title: string;
  sourceText: string;
  originDate: string;
  authorOrTradition: string;
  originalQuote: string;
  historicalContext: string;
  interpretation: string;
  epistemicStatus: 'Fulfilled' | 'Unfulfilled (Future Horizon)' | 'Disputed Interpretation' | 'Debunked / Misrepresented' | 'Hypothetical Scenario';
  evidenceAndCritique: string;
}

export const ALL_PROPHECIES: ProphecyRecord[] = [
  {
    id: 'kalki-avatara-rebirth',
    tradition: 'Kalki Tradition',
    title: 'The Manifestation of Kalki & Rebirth of Krita Yuga',
    sourceText: 'Srimad Bhagavata Purana, Canto 12, Chapter 2, Verses 16-24',
    originDate: 'Classical Puranic redaction (c. 500–900 CE, ancient tradition)',
    authorOrTradition: 'Vedic Puranic Corpus (Maharshi Veda Vyasa)',
    originalQuote: 'शम्भलग्राममुख्यस्य ब्राह्मणस्य महात्मनः । भवने विष्णुयशसः कल्किः प्रादुर्भविष्यति ॥ अश्वमाशुगमारुह्य देवदत्तं जगत्पतिः । असिनाऽसाधुदमनोऽष्टैश्वर्यगुणान्वितः ॥ यदावतीर्णो भगवान् कल्किर्धर्मपतिर्हरिः । कृतं भविष्यति तदा प्रजासूतिश्च सात्त्विकी ॥',
    historicalContext: 'Composed as an ethical and cosmological anchor during periods of political fragmentation, reassuring humanity that degradation is temporary and cosmic balance will be restored.',
    interpretation: 'At the dark culmination of Kali Yuga, Lord Vishnu manifests as Kalki in the village of Shambhala in the home of Vishnuyashas. Riding the celestial steed Devadatta with a flashing sword, he purifies the earth of tyranny. In that very instant, the cosmic consciousness resets and Satya Yuga begins anew.',
    epistemicStatus: 'Unfulfilled (Future Horizon)',
    evidenceAndCritique: 'Traditional Puranic horizon slated for the conclusion of Kali Yuga (~428,899 CE in astronomical Puranic metrics, or symbolic cyclic renewal according to modern spiritual reform movements like Sri Aurobindo and Swami Vivekananda).',
  },
  {
    id: 'bhagavata-kali-yuga-symptoms',
    tradition: 'Hindu Puranic',
    title: 'Bhagavata Purana Predictions of Kali Yuga Society',
    sourceText: 'Srimad Bhagavata Purana, Canto 12, Chapter 2, Verses 1-6',
    originDate: 'c. 1st millennium BCE core tradition, redacted classical Sanskrit',
    authorOrTradition: 'Shuka Maharshi to King Parikshit',
    originalQuote: 'ततश्चानुदिनं धर्मः सत्यं शौचं क्षमा दया । कालेन बलिना राजन् नङ्क्ष्यत्यायुर्बलं स्मृतिः ॥ वित्तमेव कलौ नॄणां जन्माचारगुणोदयः । धर्मन्यायव्यवस्थायां कारणं बलमेव हि ॥',
    historicalContext: 'Spoken on the banks of the Ganga to King Parikshit as Sri Krishna departed the physical realm in 3102 BCE.',
    interpretation: 'Predicts that in Kali Yuga, wealth alone will be the criterion of a person’s nobility and virtue; brute force will dictate law and justice; beauty will be judged solely by hair styling and vanity; marriage will become an informal verbal agreement; and priests will be recognized solely by wearing an external thread rather than inner realization.',
    epistemicStatus: 'Fulfilled',
    evidenceAndCritique: 'Astonishing sociological accuracy matching modern consumerist society, institutional commercialization, and legal systems driven by wealth and media optics.',
  },
  {
    id: 'nostradamus-london-fire',
    tradition: 'Nostradamus',
    title: 'The Great Fire of London (1666 CE)',
    sourceText: 'Les Prophéties (Century II, Quatrain 51)',
    originDate: '1555 CE',
    authorOrTradition: 'Michel de Nostredame (Nostradamus)',
    originalQuote: 'Le sang du juste à Londres fera faute, / Bruslez par fouldres de vingt trois les six: / La dame antique cherra de place haute, / De mesme secte plusieurs seront occis.',
    historicalContext: 'Published in Lyon in 1555, 111 years prior to the catastrophic fire that consumed medieval London in September 1666.',
    interpretation: 'The text references "London will demand the blood of the just, burned by lightning of twenty three the six (20 * 3 + 6 = 66 -> 1666)". The ancient lady (Old St. Paul’s Cathedral) fell from its high place.',
    epistemicStatus: 'Fulfilled',
    evidenceAndCritique: 'Widely cited as one of the clearest numerical correspondences in Nostradamus, though sceptics argue "twenty three the six" can be parsed in multiple French permutations.',
  },
  {
    id: 'mayan-baktun-cycle-2012',
    tradition: 'Mayan Calendar',
    title: 'The 13th Baktun Completion (December 21, 2012)',
    sourceText: 'Tortuguero Monument 6 & Dresden Codex',
    originDate: 'Classic Maya Period (c. 600–900 CE)',
    authorOrTradition: 'Maya Astronomical Priesthood',
    originalQuote: 'Tzuk-te\' 13 Baktun... uht-om Bolon Yokte\' K\'uh (The thirteenth Baktun will be completed; the deity Bolon Yokte\' will descend).',
    historicalContext: 'The Mesoamerican Long Count calendar measured cycles of 144,000 days (Baktuns). 13 Baktuns equaled 5,125.36 solar years, ending at the winter solstice of 2012.',
    interpretation: 'The Maya did not predict the physical destruction of the Earth; rather, it signified the completion of a major cosmological calendar era, akin to our odometer rolling over from 1999 to 2000.',
    epistemicStatus: 'Debunked / Misrepresented',
    evidenceAndCritique: 'Apocalyptic doomsday theories popularized by Western mass media in 2012 were debunked by Mayanist scholars (David Stuart, Stephen Houston) who showed Maya inscriptions at Xultun projected calendars thousands of years beyond 2012.',
  },
  {
    id: 'arthur-clarke-geostationary-satellites',
    tradition: 'Modern Futurist & Science',
    title: 'Geostationary Communication Satellites (1945)',
    sourceText: 'Wireless World Magazine ("Extra-Terrestrial Relays")',
    originDate: 'October 1945',
    authorOrTradition: 'Arthur C. Clarke',
    originalQuote: 'An artificial satellite at the correct distance from the earth would make one revolution every 24 hours; i.e., it would remain stationary above the same spot and would be within clear line of sight of almost half the planet’s surface.',
    historicalContext: 'Written before the advent of orbital rocketry, proposing that three transponders in 35,786 km orbit could provide worldwide wireless communications.',
    interpretation: 'Direct technological blueprint for the global telecommunications satellite network that powers our internet, television, and satellite tracking today.',
    epistemicStatus: 'Fulfilled',
    evidenceAndCritique: 'The geostationary orbit at 35,786 km is officially recognized by the International Astronomical Union as the "Clarke Orbit" in tribute to this precise technological foresight.',
  },
  {
    id: 'moores-law-semiconductors',
    tradition: 'Modern Futurist & Science',
    title: "Moore's Law of Exponential Microchip Density",
    sourceText: 'Electronics Magazine ("Cramming more components onto integrated circuits")',
    originDate: 'April 19, 1965',
    authorOrTradition: 'Gordon E. Moore (Intel Co-Founder)',
    originalQuote: 'The complexity for minimum component costs has increased at a rate of roughly a factor of two per year... Over the longer term, the rate of increase is a bit more uncertain, although there is no reason to believe it will not remain nearly constant for at least 10 years.',
    historicalContext: 'Projected that the number of transistors on a microchip would double roughly every 18 to 24 months.',
    interpretation: 'Became the self-fulfilling technological roadmap of the digital revolution, driving computing power from room-sized mainframes to handheld supercomputers and AI neural networks.',
    epistemicStatus: 'Fulfilled',
    evidenceAndCritique: 'Held true with remarkable precision for over 50 years until approaching physical quantum tunneling barriers below 2 nanometers in the 2020s, transitioning into 3D chiplet architectures.',
  }
];
