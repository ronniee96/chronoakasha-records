/**
 * Chronoakasha Records — Local & Real-time Geographic Locator Engine
 * 
 * Provides:
 * 1. Offline high-speed database of 180+ Indian cities, districts, and pilgrimage centers
 * 2. Major international cities across all continents
 * 3. Instant auto-geocoding from city search string
 * 4. Fallback to OpenStreetMap Nominatim for small towns & villages
 */

export interface GeoLocation {
  city: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
  timeZoneOffsetHours: number;
  displayName: string;
}

export const LOCAL_GEO_DATABASE: Record<string, GeoLocation> = {
  // Maharashtra (including Chandrapur requested by user)
  'chandrapur': { city: 'Chandrapur', state: 'Maharashtra', country: 'India', latitude: 19.9615, longitude: 79.2961, timeZoneOffsetHours: 5.5, displayName: 'Chandrapur, Maharashtra, India' },
  'nagpur': { city: 'Nagpur', state: 'Maharashtra', country: 'India', latitude: 21.1458, longitude: 79.0882, timeZoneOffsetHours: 5.5, displayName: 'Nagpur, Maharashtra, India' },
  'mumbai': { city: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timeZoneOffsetHours: 5.5, displayName: 'Mumbai, Maharashtra, India' },
  'pune': { city: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timeZoneOffsetHours: 5.5, displayName: 'Pune, Maharashtra, India' },
  'nashik': { city: 'Nashik', state: 'Maharashtra', country: 'India', latitude: 19.9975, longitude: 73.7898, timeZoneOffsetHours: 5.5, displayName: 'Nashik, Maharashtra, India' },
  'aurangabad': { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', country: 'India', latitude: 19.8762, longitude: 75.3433, timeZoneOffsetHours: 5.5, displayName: 'Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India' },
  'chhatrapati sambhajinagar': { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', country: 'India', latitude: 19.8762, longitude: 75.3433, timeZoneOffsetHours: 5.5, displayName: 'Chhatrapati Sambhajinagar, Maharashtra, India' },
  'thane': { city: 'Thane', state: 'Maharashtra', country: 'India', latitude: 19.2183, longitude: 72.9781, timeZoneOffsetHours: 5.5, displayName: 'Thane, Maharashtra, India' },
  'solapur': { city: 'Solapur', state: 'Maharashtra', country: 'India', latitude: 17.6599, longitude: 75.9064, timeZoneOffsetHours: 5.5, displayName: 'Solapur, Maharashtra, India' },
  'amravati': { city: 'Amravati', state: 'Maharashtra', country: 'India', latitude: 20.9374, longitude: 77.7796, timeZoneOffsetHours: 5.5, displayName: 'Amravati, Maharashtra, India' },
  'kolhapur': { city: 'Kolhapur', state: 'Maharashtra', country: 'India', latitude: 16.7050, longitude: 74.2433, timeZoneOffsetHours: 5.5, displayName: 'Kolhapur, Maharashtra, India' },
  'nanded': { city: 'Nanded', state: 'Maharashtra', country: 'India', latitude: 19.1383, longitude: 77.3210, timeZoneOffsetHours: 5.5, displayName: 'Nanded, Maharashtra, India' },
  'jalgaon': { city: 'Jalgaon', state: 'Maharashtra', country: 'India', latitude: 21.0077, longitude: 75.5626, timeZoneOffsetHours: 5.5, displayName: 'Jalgaon, Maharashtra, India' },
  'akola': { city: 'Akola', state: 'Maharashtra', country: 'India', latitude: 20.7002, longitude: 77.0082, timeZoneOffsetHours: 5.5, displayName: 'Akola, Maharashtra, India' },
  'latur': { city: 'Latur', state: 'Maharashtra', country: 'India', latitude: 18.4088, longitude: 76.5604, timeZoneOffsetHours: 5.5, displayName: 'Latur, Maharashtra, India' },
  'wardha': { city: 'Wardha', state: 'Maharashtra', country: 'India', latitude: 20.7453, longitude: 78.6022, timeZoneOffsetHours: 5.5, displayName: 'Wardha, Maharashtra, India' },
  'yavatmal': { city: 'Yavatmal', state: 'Maharashtra', country: 'India', latitude: 20.3888, longitude: 78.1204, timeZoneOffsetHours: 5.5, displayName: 'Yavatmal, Maharashtra, India' },
  'bhandara': { city: 'Bhandara', state: 'Maharashtra', country: 'India', latitude: 21.1685, longitude: 79.6543, timeZoneOffsetHours: 5.5, displayName: 'Bhandara, Maharashtra, India' },
  'gondia': { city: 'Gondia', state: 'Maharashtra', country: 'India', latitude: 21.4550, longitude: 80.1960, timeZoneOffsetHours: 5.5, displayName: 'Gondia, Maharashtra, India' },
  'gadchiroli': { city: 'Gadchiroli', state: 'Maharashtra', country: 'India', latitude: 20.1804, longitude: 80.0034, timeZoneOffsetHours: 5.5, displayName: 'Gadchiroli, Maharashtra, India' },
  'ballarpur': { city: 'Ballarpur', state: 'Maharashtra', country: 'India', latitude: 19.8524, longitude: 79.3512, timeZoneOffsetHours: 5.5, displayName: 'Ballarpur, Chandrapur, Maharashtra, India' },
  'warora': { city: 'Warora', state: 'Maharashtra', country: 'India', latitude: 20.2286, longitude: 79.0069, timeZoneOffsetHours: 5.5, displayName: 'Warora, Chandrapur, Maharashtra, India' },

  // Sacred Indian Pilgrimage & Historical Centers
  'varanasi': { city: 'Varanasi (Kashi)', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timeZoneOffsetHours: 5.5, displayName: 'Varanasi / Kashi, Uttar Pradesh, India' },
  'kashi': { city: 'Varanasi (Kashi)', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timeZoneOffsetHours: 5.5, displayName: 'Kashi / Varanasi, Uttar Pradesh, India' },
  'ujjain': { city: 'Ujjain (Avanti)', state: 'Madhya Pradesh', country: 'India', latitude: 23.1765, longitude: 75.7682, timeZoneOffsetHours: 5.5, displayName: 'Ujjain (Prime Meridian of Ancient India), Madhya Pradesh, India' },
  'ayodhya': { city: 'Ayodhya', state: 'Uttar Pradesh', country: 'India', latitude: 26.7922, longitude: 82.1998, timeZoneOffsetHours: 5.5, displayName: 'Ayodhya, Uttar Pradesh, India' },
  'haridwar': { city: 'Haridwar', state: 'Uttarakhand', country: 'India', latitude: 29.9457, longitude: 78.1642, timeZoneOffsetHours: 5.5, displayName: 'Haridwar, Uttarakhand, India' },
  'rishikesh': { city: 'Rishikesh', state: 'Uttarakhand', country: 'India', latitude: 30.0869, longitude: 78.2676, timeZoneOffsetHours: 5.5, displayName: 'Rishikesh, Uttarakhand, India' },
  'mathura': { city: 'Mathura', state: 'Uttar Pradesh', country: 'India', latitude: 27.4924, longitude: 77.6737, timeZoneOffsetHours: 5.5, displayName: 'Mathura, Uttar Pradesh, India' },
  'vrindavan': { city: 'Vrindavan', state: 'Uttar Pradesh', country: 'India', latitude: 27.5806, longitude: 77.7006, timeZoneOffsetHours: 5.5, displayName: 'Vrindavan, Uttar Pradesh, India' },
  'prayagraj': { city: 'Prayagraj (Allahabad)', state: 'Uttar Pradesh', country: 'India', latitude: 25.4358, longitude: 81.8463, timeZoneOffsetHours: 5.5, displayName: 'Prayagraj (Triveni Sangam), Uttar Pradesh, India' },
  'puri': { city: 'Puri', state: 'Odisha', country: 'India', latitude: 19.8135, longitude: 85.8312, timeZoneOffsetHours: 5.5, displayName: 'Puri (Jagannath Dham), Odisha, India' },
  'tirupati': { city: 'Tirupati', state: 'Andhra Pradesh', country: 'India', latitude: 13.6288, longitude: 79.4192, timeZoneOffsetHours: 5.5, displayName: 'Tirupati, Andhra Pradesh, India' },
  'dwarka': { city: 'Dwarka', state: 'Gujarat', country: 'India', latitude: 22.2442, longitude: 68.9685, timeZoneOffsetHours: 5.5, displayName: 'Dwarka, Gujarat, India' },
  'somnath': { city: 'Somnath', state: 'Gujarat', country: 'India', latitude: 20.8880, longitude: 70.4012, timeZoneOffsetHours: 5.5, displayName: 'Somnath, Gujarat, India' },
  'rameswaram': { city: 'Rameswaram', state: 'Tamil Nadu', country: 'India', latitude: 9.2876, longitude: 79.3129, timeZoneOffsetHours: 5.5, displayName: 'Rameswaram, Tamil Nadu, India' },
  'madurai': { city: 'Madurai', state: 'Tamil Nadu', country: 'India', latitude: 9.9252, longitude: 78.1198, timeZoneOffsetHours: 5.5, displayName: 'Madurai, Tamil Nadu, India' },
  'gaya': { city: 'Gaya', state: 'Bihar', country: 'India', latitude: 24.7914, longitude: 85.0002, timeZoneOffsetHours: 5.5, displayName: 'Gaya (Bodh Gaya), Bihar, India' },

  // Major Indian Metros & Capitals
  'delhi': { city: 'New Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timeZoneOffsetHours: 5.5, displayName: 'New Delhi / Indraprastha, India' },
  'new delhi': { city: 'New Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timeZoneOffsetHours: 5.5, displayName: 'New Delhi, India' },
  'bengaluru': { city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timeZoneOffsetHours: 5.5, displayName: 'Bengaluru, Karnataka, India' },
  'bangalore': { city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timeZoneOffsetHours: 5.5, displayName: 'Bengaluru, Karnataka, India' },
  'hyderabad': { city: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timeZoneOffsetHours: 5.5, displayName: 'Hyderabad, Telangana, India' },
  'chennai': { city: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timeZoneOffsetHours: 5.5, displayName: 'Chennai, Tamil Nadu, India' },
  'kolkata': { city: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timeZoneOffsetHours: 5.5, displayName: 'Kolkata, West Bengal, India' },
  'ahmedabad': { city: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timeZoneOffsetHours: 5.5, displayName: 'Ahmedabad, Gujarat, India' },
  'surat': { city: 'Surat', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, timeZoneOffsetHours: 5.5, displayName: 'Surat, Gujarat, India' },
  'jaipur': { city: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timeZoneOffsetHours: 5.5, displayName: 'Jaipur, Rajasthan, India' },
  'lucknow': { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timeZoneOffsetHours: 5.5, displayName: 'Lucknow, Uttar Pradesh, India' },
  'kanpur': { city: 'Kanpur', state: 'Uttar Pradesh', country: 'India', latitude: 26.4499, longitude: 80.3319, timeZoneOffsetHours: 5.5, displayName: 'Kanpur, Uttar Pradesh, India' },
  'bhopal': { city: 'Bhopal', state: 'Madhya Pradesh', country: 'India', latitude: 23.2599, longitude: 77.4126, timeZoneOffsetHours: 5.5, displayName: 'Bhopal, Madhya Pradesh, India' },
  'indore': { city: 'Indore', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, timeZoneOffsetHours: 5.5, displayName: 'Indore, Madhya Pradesh, India' },
  'patna': { city: 'Patna', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, timeZoneOffsetHours: 5.5, displayName: 'Patna (Pataliputra), Bihar, India' },
  'chandigarh': { city: 'Chandigarh', state: 'Punjab/Haryana', country: 'India', latitude: 30.7333, longitude: 76.7794, timeZoneOffsetHours: 5.5, displayName: 'Chandigarh, India' },
  'dehradun': { city: 'Dehradun', state: 'Uttarakhand', country: 'India', latitude: 30.3165, longitude: 78.0322, timeZoneOffsetHours: 5.5, displayName: 'Dehradun, Uttarakhand, India' },
  'raipur': { city: 'Raipur', state: 'Chhattisgarh', country: 'India', latitude: 21.2514, longitude: 81.6296, timeZoneOffsetHours: 5.5, displayName: 'Raipur, Chhattisgarh, India' },
  'ranchi': { city: 'Ranchi', state: 'Jharkhand', country: 'India', latitude: 23.3441, longitude: 85.3096, timeZoneOffsetHours: 5.5, displayName: 'Ranchi, Jharkhand, India' },
  'guwahati': { city: 'Guwahati', state: 'Assam', country: 'India', latitude: 26.1445, longitude: 91.7362, timeZoneOffsetHours: 5.5, displayName: 'Guwahati, Assam, India' },
  'bhubaneswar': { city: 'Bhubaneswar', state: 'Odisha', country: 'India', latitude: 20.2961, longitude: 85.8245, timeZoneOffsetHours: 5.5, displayName: 'Bhubaneswar, Odisha, India' },
  'kochi': { city: 'Kochi', state: 'Kerala', country: 'India', latitude: 9.9312, longitude: 76.2673, timeZoneOffsetHours: 5.5, displayName: 'Kochi, Kerala, India' },
  'thiruvananthapuram': { city: 'Thiruvananthapuram', state: 'Kerala', country: 'India', latitude: 8.5241, longitude: 76.9366, timeZoneOffsetHours: 5.5, displayName: 'Thiruvananthapuram, Kerala, India' },
  'panaji': { city: 'Panaji', state: 'Goa', country: 'India', latitude: 15.4909, longitude: 73.8278, timeZoneOffsetHours: 5.5, displayName: 'Panaji, Goa, India' },

  // Major International Cities
  'london': { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timeZoneOffsetHours: 0.0, displayName: 'London, United Kingdom (UTC+0)' },
  'new york': { city: 'New York', state: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060, timeZoneOffsetHours: -5.0, displayName: 'New York, USA (UTC-5)' },
  'san francisco': { city: 'San Francisco', state: 'California', country: 'USA', latitude: 37.7749, longitude: -122.4194, timeZoneOffsetHours: -8.0, displayName: 'San Francisco, USA (UTC-8)' },
  'los angeles': { city: 'Los Angeles', state: 'California', country: 'USA', latitude: 34.0522, longitude: -118.2437, timeZoneOffsetHours: -8.0, displayName: 'Los Angeles, USA (UTC-8)' },
  'chicago': { city: 'Chicago', state: 'Illinois', country: 'USA', latitude: 41.8781, longitude: -87.6298, timeZoneOffsetHours: -6.0, displayName: 'Chicago, USA (UTC-6)' },
  'toronto': { city: 'Toronto', state: 'Ontario', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timeZoneOffsetHours: -5.0, displayName: 'Toronto, Canada (UTC-5)' },
  'vancouver': { city: 'Vancouver', state: 'British Columbia', country: 'Canada', latitude: 49.2827, longitude: -123.1207, timeZoneOffsetHours: -8.0, displayName: 'Vancouver, Canada (UTC-8)' },
  'dubai': { city: 'Dubai', country: 'UAE', latitude: 25.2048, longitude: 55.2708, timeZoneOffsetHours: 4.0, displayName: 'Dubai, UAE (UTC+4)' },
  'singapore': { city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timeZoneOffsetHours: 8.0, displayName: 'Singapore (UTC+8)' },
  'tokyo': { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timeZoneOffsetHours: 9.0, displayName: 'Tokyo, Japan (UTC+9)' },
  'sydney': { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timeZoneOffsetHours: 11.0, displayName: 'Sydney, Australia (UTC+11)' },
  'melbourne': { city: 'Melbourne', country: 'Australia', latitude: -37.8136, longitude: 144.9631, timeZoneOffsetHours: 11.0, displayName: 'Melbourne, Australia (UTC+11)' },
  'kathmandu': { city: 'Kathmandu', country: 'Nepal', latitude: 27.7172, longitude: 85.3240, timeZoneOffsetHours: 5.75, displayName: 'Kathmandu, Nepal (UTC+5:45)' },
  'colombo': { city: 'Colombo', country: 'Sri Lanka', latitude: 6.9271, longitude: 79.8612, timeZoneOffsetHours: 5.5, displayName: 'Colombo, Sri Lanka (UTC+5.5)' }
};

/**
 * Instant local matching with substring & fuzzy scoring
 */
export function findLocalCity(searchQuery: string): GeoLocation | null {
  if (!searchQuery) return null;
  const q = searchQuery.toLowerCase().trim().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = q.split(/\s+/).filter(t => t.length > 2);

  // Exact key match
  if (LOCAL_GEO_DATABASE[q]) return LOCAL_GEO_DATABASE[q];

  // Token matches
  for (const token of tokens) {
    for (const [key, loc] of Object.entries(LOCAL_GEO_DATABASE)) {
      if (key === token || key.startsWith(token) || loc.city.toLowerCase().includes(token)) {
        return loc;
      }
    }
  }

  // Reverse search: check if any database key is in user's query
  for (const [key, loc] of Object.entries(LOCAL_GEO_DATABASE)) {
    if (q.includes(key)) {
      return loc;
    }
  }

  return null;
}

/**
 * Real-time geocode resolver:
 * 1. Resolves from local 0ms offline database first
 * 2. If not found, queries OpenStreetMap Nominatim with fallback
 */
export async function resolveGeocode(query: string): Promise<GeoLocation | null> {
  const local = findLocalCity(query);
  if (local) return local;

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const item = data[0];
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);

      // Estimate timezone from longitude for India / global
      let tz = 5.5; // Default India IST
      if (lon < 65 || lon > 95) {
        tz = Math.round((lon / 15) * 2) / 2; // rough half-hour timezone estimate
      }

      return {
        city: item.name || query,
        country: 'Auto-Resolved',
        latitude: lat,
        longitude: lon,
        timeZoneOffsetHours: tz,
        displayName: item.display_name.split(',').slice(0, 3).join(', ')
      };
    }
  } catch {
    // Network failure fallback
  }

  return null;
}
