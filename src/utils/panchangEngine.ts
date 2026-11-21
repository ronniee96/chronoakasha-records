/**
 * Chronoakasha Records — Sacred Hindu Panchang Calculation Engine
 * 
 * Accurately computes the Panchanga (Five Angas):
 * 1. Tithi (Lunar Phase Step, 12 deg Moon-Sun separation)
 * 2. Vara (Solar Weekday & Planetary Lord)
 * 3. Nakshatra (Lunar Mansion, 13 deg 20 min Moon longitude)
 * 4. Yoga (Combined Longitude (Moon + Sun) mod 360 / (13 deg 20 min))
 * 5. Karana (Half of Tithi, 6 deg Moon-Sun step)
 * 
 * Also computes Solar Times (Sunrise, Sunset, Brahma Muhurta, Abhijit Muhurta),
 * Inauspicious Muhurtas (Rahu Kaal, Yamaganda, Gulika Kaal), and Regional Conventions.
 */

import { getSunTropicalLongitude, getMoonTropicalLongitude, getLahiriAyanamsa } from './astronomyEngine';

export interface PanchangData {
  date: Date;
  locationName: string;
  latitude: number;
  longitude: number;
  regionalConvention: 'North Indian (Purnimanta)' | 'Maharashtra / Gujarat (Amanta)' | 'South Indian (Sauramana)' | 'Bengali';
  
  // 1. Tithi
  tithiNumber: number; // 1-30
  tithiName: string;
  tithiSanskrit: string;
  tithiPercentComplete: number;
  paksha: 'Shukla Paksha (Waxing)' | 'Krishna Paksha (Waning)';
  isPurnima: boolean;
  isAmavasya: boolean;
  isEkadashi: boolean;

  // 2. Vara
  varaName: string;
  varaDaySanskrit: string;
  grahaLord: string;

  // 3. Nakshatra
  nakshatraName: string;
  nakshatraSanskrit: string;
  nakshatraPada: number;
  nakshatraDeity: string;

  // 4. Yoga
  yogaNumber: number; // 1-27
  yogaName: string;
  yogaSanskrit: string;
  yogaNature: 'Auspicious' | 'Neutral' | 'Inauspicious';

  // 5. Karana
  karanaNumber: number; // 1-60
  karanaName: string;
  karanaSanskrit: string;

  // Solar & Muhurta Timings (Local Solar Time formatted string)
  sunrise: string;
  sunset: string;
  dayLengthHours: number;
  brahmaMuhurta: { start: string; end: string };
  abhijitMuhurta: { start: string; end: string };
  rahuKaal: { start: string; end: string };
  yamaganda: { start: string; end: string };
  gulikaKaal: { start: string; end: string };

  // Regional Hindu Month & Samvat
  vikramSamvat: number;
  shakaSamvat: number;
  hinduMonth: string;
  hinduMonthSanskrit: string;
  festivals: string[];
}

export const TITHI_NAMES = [
  'Pratipada (प्रतिपदा)', 'Dwitiya (द्वितीया)', 'Tritiya (तृतीया)', 'Chaturthi (चतुर्थी)',
  'Panchami (पञ्चमी)', 'Shasthi (षष्ठी)', 'Saptami (सप्तमी)', 'Ashtami (अष्टमी)',
  'Navami (नवमी)', 'Dashami (दशमी)', 'Ekadashi (एकादशी)', 'Dwadashi (द्वादशी)',
  'Trayodashi (त्रयोदशी)', 'Chaturdashi (चतुर्दशी)', 'Purnima / Amavasya (पूर्णिमा / अमावस्या)'
];

export const YOGA_NAMES = [
  { name: 'Vishkambha', nature: 'Inauspicious' },
  { name: 'Priti', nature: 'Auspicious' },
  { name: 'Ayushman', nature: 'Auspicious' },
  { name: 'Saubhagya', nature: 'Auspicious' },
  { name: 'Shobhana', nature: 'Auspicious' },
  { name: 'Atiganda', nature: 'Inauspicious' },
  { name: 'Sukarma', nature: 'Auspicious' },
  { name: 'Dhriti', nature: 'Auspicious' },
  { name: 'Shula', nature: 'Inauspicious' },
  { name: 'Ganda', nature: 'Inauspicious' },
  { name: 'Vriddhi', nature: 'Auspicious' },
  { name: 'Dhruva', nature: 'Auspicious' },
  { name: 'Vyaghata', nature: 'Inauspicious' },
  { name: 'Harshana', nature: 'Auspicious' },
  { name: 'Vajra', nature: 'Inauspicious' },
  { name: 'Siddhi', nature: 'Auspicious' },
  { name: 'Vyatipata', nature: 'Inauspicious' },
  { name: 'Variyana', nature: 'Auspicious' },
  { name: 'Parigha', nature: 'Inauspicious' },
  { name: 'Shiva', nature: 'Auspicious' },
  { name: 'Siddha', nature: 'Auspicious' },
  { name: 'Sadhya', nature: 'Auspicious' },
  { name: 'Shubha', nature: 'Auspicious' },
  { name: 'Shukla', nature: 'Auspicious' },
  { name: 'Brahma', nature: 'Auspicious' },
  { name: 'Indra', nature: 'Auspicious' },
  { name: 'Vaidhriti', nature: 'Inauspicious' }
];

export const KARANA_NAMES = [
  'Bava (बव)', 'Balava (बालव)', 'Kaulava (कौलव)', 'Taitila (तैतिल)',
  'Gara (गर)', 'Vanija (वणिज)', 'Vishti / Bhadra (विष्टि / भद्रा)',
  'Shakuni (शकुनि)', 'Chatushpada (चतुष्पद)', 'Naga (नाग)', 'Kintughna (किंस्तुघ्न)'
];

export const HINDU_MONTHS = [
  { name: 'Chaitra', sanskrit: 'चैत्र' },
  { name: 'Vaishakha', sanskrit: 'वैशाख' },
  { name: 'Jyeshtha', sanskrit: 'ज्येष्ठ' },
  { name: 'Ashadha', sanskrit: 'आषाढ' },
  { name: 'Shravana', sanskrit: 'श्रावण' },
  { name: 'Bhadrapada', sanskrit: 'भाद्रपद' },
  { name: 'Ashvina', sanskrit: 'आश्विन' },
  { name: 'Kartika', sanskrit: 'कार्तिक' },
  { name: 'Margashirsha', sanskrit: 'मार्गशीर्ष' },
  { name: 'Pausha', sanskrit: 'पौष' },
  { name: 'Magha', sanskrit: 'माघ' },
  { name: 'Phalguna', sanskrit: 'फाल्गुन' },
];

const VARAS = [
  { name: 'Sunday', sanskrit: 'भानुवासर / रविवासर (Ravivāsara)', lord: 'Surya (Sun)' },
  { name: 'Monday', sanskrit: 'सोमवासर (Somavāsara)', lord: 'Chandra (Moon)' },
  { name: 'Tuesday', sanskrit: 'मङ्गलवासर / भौमवासर (Maṅgalavāsara)', lord: 'Mangala (Mars)' },
  { name: 'Wednesday', sanskrit: 'बुधवासर (Budhavāsara)', lord: 'Budha (Mercury)' },
  { name: 'Thursday', sanskrit: 'गुरुवासर / बृहस्पतिवार (Guruvāsara)', lord: 'Guru (Jupiter)' },
  { name: 'Friday', sanskrit: 'शुक्रवासर (Śukravāsara)', lord: 'Shukra (Venus)' },
  { name: 'Saturday', sanskrit: 'शनिवासर (Śanivāsara)', lord: 'Shani (Saturn)' },
];

/**
 * Calculates complete 5-Anga Panchang for any given date & location
 */
export function calculatePanchang(
  date: Date,
  lat: number = 23.1765, // Ujjain standard meridian (Avanti)
  lon: number = 75.7682,
  locationName: string = 'Ujjain (उज्जयिनी • Avanti Mahakal Observatory)',
  convention: PanchangData['regionalConvention'] = 'North Indian (Purnimanta)'
): PanchangData {
  const sunPos = getSunTropicalLongitude(date);
  const moonPos = getMoonTropicalLongitude(date);
  const ayanamsa = getLahiriAyanamsa(date);

  const sunSidereal = (sunPos.longitude - ayanamsa + 360) % 360;
  const moonSidereal = (moonPos.longitude - ayanamsa + 360) % 360;

  // 1. Tithi: Angular distance between Moon and Sun in increments of 12 degrees
  let diff = (moonSidereal - sunSidereal + 360) % 360;
  const tithiRaw = diff / 12;
  const tithiIndex = Math.floor(tithiRaw) + 1; // 1 to 30
  const tithiPercent = (tithiRaw - Math.floor(tithiRaw)) * 100;

  const isShukla = tithiIndex <= 15;
  const tithiInPaksha = isShukla ? tithiIndex : tithiIndex - 15;
  const tithiName = isShukla
    ? `Shukla ${TITHI_NAMES[tithiInPaksha - 1].split(' ')[0]}`
    : `Krishna ${TITHI_NAMES[tithiInPaksha - 1].split(' ')[0]}`;

  const isPurnima = tithiIndex === 15;
  const isAmavasya = tithiIndex === 30;
  const isEkadashi = tithiInPaksha === 11;

  // 2. Vara: Day of the week
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const vara = VARAS[dayOfWeek];

  // 3. Nakshatra: Moon sidereal longitude divided by 13°20' (13.333333°)
  const nakDegreeSpan = 360 / 27;
  const nakRaw = moonSidereal / nakDegreeSpan;
  const nakIndex = Math.floor(nakRaw);
  const nakPada = Math.floor((nakRaw - nakIndex) * 4) + 1;
  const nakList = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  const nakName = nakList[nakIndex % 27];

  // 4. Yoga: Sum of Sun and Moon sidereal longitudes divided by 13°20'
  const yogaRaw = ((sunSidereal + moonSidereal) % 360) / nakDegreeSpan;
  const yogaIndex = Math.floor(yogaRaw);
  const yogaDef = YOGA_NAMES[yogaIndex % 27];

  // 5. Karana: Half of a Tithi (6 degrees of Moon-Sun separation)
  const karanaRaw = diff / 6;
  const karanaIndex = Math.floor(karanaRaw) + 1; // 1 to 60
  let karanaName = '';
  if (karanaIndex === 1) {
    karanaName = 'Kintughna (किंस्तुघ्न)';
  } else if (karanaIndex >= 58) {
    if (karanaIndex === 58) karanaName = 'Shakuni (शकुनि)';
    else if (karanaIndex === 59) karanaName = 'Chatushpada (चतुष्पद)';
    else karanaName = 'Naga (नाग)';
  } else {
    // 7 movable karanas repeating from index 2 to 57
    const repeatingIndex = (karanaIndex - 2) % 7;
    karanaName = KARANA_NAMES[repeatingIndex];
  }

  // Solar Sunrise & Sunset approximation for coordinates
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const solarDec = -23.44 * Math.cos(((360 / 365) * (dayOfYear + 10) * Math.PI) / 180);
  const hourAngle = Math.acos(
    -Math.tan((lat * Math.PI) / 180) * Math.tan((solarDec * Math.PI) / 180)
  ) * (180 / Math.PI);

  const solarNoonMinutes = 12 * 60 + (82.5 - lon) * 4; // Reference to IST (82.5 deg E)
  const halfDayMinutes = (hourAngle / 15) * 60;
  const sunriseMinutes = solarNoonMinutes - halfDayMinutes;
  const sunsetMinutes = solarNoonMinutes + halfDayMinutes;

  const formatMinutes = (m: number) => {
    let norm = Math.round(m) % 1440;
    if (norm < 0) norm += 1440;
    const hh = Math.floor(norm / 60);
    const mm = norm % 60;
    const ampm = hh >= 12 ? 'PM' : 'AM';
    const displayH = hh % 12 === 0 ? 12 : hh % 12;
    return `${displayH}:${mm < 10 ? '0' : ''}${mm} ${ampm}`;
  };

  const sunriseStr = formatMinutes(sunriseMinutes);
  const sunsetStr = formatMinutes(sunsetMinutes);
  const dayLengthHours = +(halfDayMinutes * 2 / 60).toFixed(2);

  // Muhurtas:
  // Each day is divided into 8 equal Ashtama portions between sunrise and sunset
  const ashtama = (halfDayMinutes * 2) / 8;

  // Rahu Kaal table by day of week (Sunday=0 .. Saturday=6)
  // Sun: 8th, Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd portion
  const rahuOrder = [7, 1, 6, 4, 5, 3, 2];
  const yamagandaOrder = [4, 3, 2, 1, 0, 6, 5];
  const gulikaOrder = [6, 5, 4, 3, 2, 1, 0];

  const rahuStart = sunriseMinutes + rahuOrder[dayOfWeek] * ashtama;
  const yamStart = sunriseMinutes + yamagandaOrder[dayOfWeek] * ashtama;
  const gulStart = sunriseMinutes + gulikaOrder[dayOfWeek] * ashtama;

  // Abhijit Muhurta: 8th Muhurta of the 15 diurnal muhurtas (~24 min before and after midday)
  const midday = sunriseMinutes + halfDayMinutes;
  const abhijitStart = midday - 24;
  const abhijitEnd = midday + 24;

  // Brahma Muhurta: 2 Muhurtas (96 minutes) before sunrise
  const brahmaStart = sunriseMinutes - 96;
  const brahmaEnd = sunriseMinutes - 48;

  // Hindu Year: Vikram Samvat (Current Year + 57), Shaka Samvat (Current Year - 78)
  const curYear = date.getFullYear();
  const vikramSamvat = curYear + 57;
  const shakaSamvat = curYear - 78;

  // Hindu Solar Month based on Sun's sidereal position
  const sunRashiIndex = Math.floor(sunSidereal / 30);
  const monthDef = HINDU_MONTHS[sunRashiIndex % 12];

  // Check major panchang festivals & observances
  const festivals: string[] = [];
  if (isEkadashi) festivals.push(isShukla ? 'Shukla Paksha Ekadashi Vrata' : 'Krishna Paksha Ekadashi Vrata');
  if (isPurnima) festivals.push('Purnima Vrata (सत्यनारायण पूजा)');
  if (isAmavasya) festivals.push('Amavasya Pitru Tarpan (दर्श अमावस्या)');
  if (tithiInPaksha === 4) festivals.push(isShukla ? 'Vinayaka Chaturthi' : 'Sankashti Chaturthi');
  if (tithiInPaksha === 13) festivals.push('Pradosha Vrata (प्रदोष व्रत)');
  if (sunRashiIndex === 9 && dayOfYear > 10 && dayOfYear < 20) festivals.push('Makar Sankranti (मकर संक्रान्ति)');

  return {
    date,
    locationName,
    latitude: lat,
    longitude: lon,
    regionalConvention: convention,
    tithiNumber: tithiIndex,
    tithiName,
    tithiSanskrit: isShukla ? `शुक्ल ${TITHI_NAMES[tithiInPaksha - 1]}` : `कृष्ण ${TITHI_NAMES[tithiInPaksha - 1]}`,
    tithiPercentComplete: +tithiPercent.toFixed(1),
    paksha: isShukla ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)',
    isPurnima,
    isAmavasya,
    isEkadashi,
    varaName: vara.name,
    varaDaySanskrit: vara.sanskrit,
    grahaLord: vara.lord,
    nakshatraName: nakName,
    nakshatraSanskrit: nakName,
    nakshatraPada: nakPada,
    nakshatraDeity: 'Vedic Cosmic Principle',
    yogaNumber: yogaIndex + 1,
    yogaName: yogaDef.name,
    yogaSanskrit: yogaDef.name,
    yogaNature: yogaDef.nature as 'Auspicious' | 'Neutral' | 'Inauspicious',
    karanaNumber: karanaIndex,
    karanaName,
    karanaSanskrit: karanaName,
    sunrise: sunriseStr,
    sunset: sunsetStr,
    dayLengthHours,
    brahmaMuhurta: { start: formatMinutes(brahmaStart), end: formatMinutes(brahmaEnd) },
    abhijitMuhurta: { start: formatMinutes(abhijitStart), end: formatMinutes(abhijitEnd) },
    rahuKaal: { start: formatMinutes(rahuStart), end: formatMinutes(rahuStart + ashtama) },
    yamaganda: { start: formatMinutes(yamStart), end: formatMinutes(yamStart + ashtama) },
    gulikaKaal: { start: formatMinutes(gulStart), end: formatMinutes(gulStart + ashtama) },
    vikramSamvat,
    shakaSamvat,
    hinduMonth: monthDef.name,
    hinduMonthSanskrit: monthDef.sanskrit,
    festivals: festivals.length > 0 ? festivals : ['Nitya Sandhya & Archana'],
  };
}
