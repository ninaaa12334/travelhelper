import { CITY_DATA, CityProfile } from '@/src/data/citiesData';
import { WORLD_COUNTRIES, WorldCountry } from '@/src/data/worldCountries';

export type TravelProviderKind = 'destinations' | 'places' | 'hotels' | 'maps' | 'ai';
export type TravelProviderStatus = 'mock-active' | 'ready-for-integration';

export type TravelProviderDescriptor = {
  id: string;
  kind: TravelProviderKind;
  label: string;
  status: TravelProviderStatus;
  note: string;
};

export const TRAVEL_PROVIDER_ROADMAP: TravelProviderDescriptor[] = [
  {
    id: 'local-curated-database',
    kind: 'destinations',
    label: 'Curated travel database',
    status: 'mock-active',
    note: 'Current source for city guides, search, recommendations, and demo itineraries.',
  },
  {
    id: 'google-places',
    kind: 'places',
    label: 'Google Places API',
    status: 'ready-for-integration',
    note: 'For live landmarks, restaurants, opening hours, and ratings.',
  },
  {
    id: 'geoapify',
    kind: 'maps',
    label: 'Geoapify or OpenStreetMap',
    status: 'ready-for-integration',
    note: 'For geocoding, routing, neighborhoods, and map-based discovery.',
  },
  {
    id: 'booking-hotels',
    kind: 'hotels',
    label: 'Booking or hotel inventory API',
    status: 'ready-for-integration',
    note: 'For live availability, nightly pricing, and property metadata.',
  },
  {
    id: 'openai-itinerary',
    kind: 'ai',
    label: 'OpenAI itinerary engine',
    status: 'ready-for-integration',
    note: 'For personalized day planning on top of verified city and place data.',
  },
];

export const travelRepository = {
  getDetailedCities(): CityProfile[] {
    return CITY_DATA;
  },
  getCityById(id: string): CityProfile | undefined {
    return CITY_DATA.find((city) => city.id === id);
  },
  getWorldCountries(): WorldCountry[] {
    return WORLD_COUNTRIES;
  },
};

export const TRAVEL_BACKEND_ARCHITECTURE = {
  repository: 'local-curated-database',
  itineraryEngine: 'curated-rule-based-generator',
  providerRoadmap: TRAVEL_PROVIDER_ROADMAP,
};
