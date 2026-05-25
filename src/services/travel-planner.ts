import {
  CityProfile,
  CitySpot,
  CitySpotCategory,
  TravelBudgetId,
  TravelInterestId,
  TravelPaceId,
  TripLengthId,
} from '@/src/data/citiesData';
import { travelRepository } from '@/src/services/travel-platform';

export type ChoiceOption = {
  id: string;
  label: string;
  hint: string;
};

export type TravelPreferences = {
  travelerName: string;
  destinationQuery: string;
  budget: TravelBudgetId;
  pace: TravelPaceId;
  tripLength: TripLengthId;
  styles: TravelInterestId[];
};

export type TravelPlace = CitySpot;
export type TravelDestination = CityProfile;

export type DestinationRecommendation = CityProfile & {
  fitScore: number;
  reason: string;
  matchedInterests: TravelInterestId[];
};

export type TravelPlanDay = {
  day: number;
  title: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  dining: string;
  hotelSuggestion?: TravelPlace;
  morningSpots: TravelPlace[];
  afternoonSpots: TravelPlace[];
  eveningSpots: TravelPlace[];
  diningSpots: TravelPlace[];
};

export type ChecklistItem = {
  id: string;
  title: string;
  body: string;
};

export type TravelBundle = {
  destinations: DestinationRecommendation[];
  summary: string;
  questions: string[];
  queryMatchedCount: number;
  queryFallbackUsed: boolean;
  matchedWorldCountryName: string | null;
};

export type GlobalSearchSuggestion = {
  id: string;
  label: string;
  description: string;
  kind: 'city' | 'country';
  supported: boolean;
  featuredDestinationId?: string;
};

export type TravelCategorySummary = {
  id: string;
  label: string;
  hint: string;
  cityNames: string[];
  totalMatches: number;
};

export type FeaturedItineraryCard = {
  id: string;
  city: string;
  country: string;
  image: string;
  summary: string;
  bestMonths: string;
  averageBudget: string;
  suggestedDays: number;
  bestFor: TravelInterestId[];
};

type InterestSignalConfig = {
  keywords: string[];
  preferredCategories: CitySpotCategory[];
};

const DETAILED_CITIES = travelRepository.getDetailedCities();
const WORLD_COUNTRIES = travelRepository.getWorldCountries();

export const STYLE_OPTIONS: ChoiceOption[] = [
  { id: 'beach', label: 'Beach', hint: 'Seaside walks, coastlines, and warm-weather escapes' },
  { id: 'culture', label: 'History', hint: 'Landmarks, museums, and stories behind the city' },
  { id: 'nightlife', label: 'Nightlife', hint: 'Late dinners, bars, and lively evenings' },
  { id: 'nature', label: 'Nature', hint: 'Parks, viewpoints, and outdoor breathing room' },
  { id: 'foodie', label: 'Food', hint: 'Memorable meals, markets, and local specialties' },
  { id: 'shopping', label: 'Shopping', hint: 'Boutiques, design districts, and browsing time' },
  { id: 'budget', label: 'Budget travel', hint: 'High-value destinations and smarter spending' },
  { id: 'luxury', label: 'Luxury', hint: 'Premium stays, polished experiences, and comfort' },
  { id: 'family', label: 'Family trip', hint: 'Easy pacing and activities that work for everyone' },
  { id: 'adventure', label: 'Adventure', hint: 'More movement, bold plans, and active days' },
  { id: 'romantic', label: 'Romantic trip', hint: 'Atmosphere, scenic dinners, and softer pacing' },
];

export const BUDGET_OPTIONS: ChoiceOption[] = [
  { id: 'budget', label: 'Budget', hint: 'Save where possible and focus on value' },
  { id: 'balanced', label: 'Balanced', hint: 'Comfort without overspending everywhere' },
  { id: 'luxury', label: 'Luxury', hint: 'Premium stays and polished dining' },
  { id: 'open', label: 'Flexible', hint: 'Open to spending more for the right fit' },
];

export const PACE_OPTIONS: ChoiceOption[] = [
  { id: 'easy', label: 'Easy', hint: 'Slow mornings and breathing room' },
  { id: 'balanced', label: 'Balanced', hint: 'A few anchors each day, still flexible' },
  { id: 'packed', label: 'Packed', hint: 'See as much as possible' },
];

export const TRIP_LENGTH_OPTIONS: ChoiceOption[] = [
  { id: '1day', label: '1 day', hint: 'A very short stop' },
  { id: '2days', label: '2 days', hint: 'Quick city sampler' },
  { id: '3days', label: '3 days', hint: 'Classic city break' },
  { id: '4days', label: '4 days', hint: 'Room for highlights and local rhythm' },
  { id: '5days', label: '5 days', hint: 'A fuller trip with better pacing' },
  { id: '6days', label: '6 days', hint: 'More neighborhoods and side plans' },
  { id: '7days', label: '7 days', hint: 'One full week in one city' },
];

export const defaultPreferences: TravelPreferences = {
  travelerName: '',
  destinationQuery: '',
  budget: 'balanced',
  pace: 'balanced',
  tripLength: '4days',
  styles: [],
};

const COUNTRY_ALIAS_MAP: Record<string, string[]> = {
  Czechia: ['Czech Republic'],
  'Côte d’Ivoire': ['Ivory Coast'],
  'Myanmar (Burma)': ['Myanmar', 'Burma'],
  'São Tomé & Príncipe': ['Sao Tome and Principe', 'Sao Tome'],
  'Türkiye': ['Turkey'],
  'United Kingdom': ['UK', 'Britain', 'Great Britain'],
  'United States': ['USA', 'US', 'America'],
};

const COUNTRY_SPOTLIGHTS = ['Japan', 'Thailand', 'Australia', 'United States', 'Brazil', 'South Africa'];
const ALL_OPTIONS = [...STYLE_OPTIONS, ...BUDGET_OPTIONS, ...PACE_OPTIONS, ...TRIP_LENGTH_OPTIONS];
const CITY_SUGGESTIONS = buildCitySuggestions();
const COUNTRY_SUGGESTIONS = buildCountrySuggestions();
const SEARCH_SUGGESTIONS = [...CITY_SUGGESTIONS, ...COUNTRY_SUGGESTIONS];
const DEFAULT_SEARCH_SUGGESTIONS = [
  ...CITY_SUGGESTIONS.slice(0, 6),
  ...COUNTRY_SUGGESTIONS.filter((suggestion) => COUNTRY_SPOTLIGHTS.includes(suggestion.label)),
];

export const SUPPORTED_CITY_COUNT = DETAILED_CITIES.length;
export const WORLD_COVERAGE_COUNT = WORLD_COUNTRIES.length;

const INTEREST_SIGNAL_CONFIG: Record<TravelInterestId, InterestSignalConfig> = {
  beach: {
    keywords: ['beach', 'coast', 'seaside', 'bay', 'waterfront', 'island', 'sunset'],
    preferredCategories: ['park', 'activity', 'hotel'],
  },
  culture: {
    keywords: ['museum', 'history', 'historic', 'heritage', 'architecture', 'landmark', 'palace', 'cathedral'],
    preferredCategories: ['museum', 'monument', 'activity'],
  },
  nightlife: {
    keywords: ['nightlife', 'late night', 'cocktail', 'bar', 'club', 'samba', 'music', 'evening'],
    preferredCategories: ['restaurant', 'activity', 'hotel'],
  },
  nature: {
    keywords: ['park', 'garden', 'viewpoint', 'mountain', 'lake', 'forest', 'river', 'green'],
    preferredCategories: ['park', 'activity', 'hotel'],
  },
  foodie: {
    keywords: ['food', 'cuisine', 'market', 'restaurant', 'bistro', 'dining', 'tasting', 'street food'],
    preferredCategories: ['restaurant', 'activity', 'hotel'],
  },
  shopping: {
    keywords: ['shopping', 'boutique', 'boutiques', 'design', 'fashion', 'market', 'markets', 'arcade', 'district'],
    preferredCategories: ['activity', 'hotel', 'restaurant'],
  },
  budget: {
    keywords: ['budget', 'value', 'affordable', 'free', 'smart spending', 'wallet-friendly'],
    preferredCategories: ['hotel', 'restaurant', 'activity'],
  },
  luxury: {
    keywords: ['luxury', 'polished', 'premium', 'fine dining', 'suite', 'elegant', 'designer'],
    preferredCategories: ['hotel', 'restaurant', 'activity'],
  },
  family: {
    keywords: ['family', 'kid', 'playful', 'easy', 'zoo', 'aquarium', 'spacious'],
    preferredCategories: ['park', 'activity', 'hotel'],
  },
  adventure: {
    keywords: ['adventure', 'hike', 'trail', 'climb', 'active', 'surf', 'outdoor', 'cable car'],
    preferredCategories: ['activity', 'park', 'hotel'],
  },
  romantic: {
    keywords: ['romantic', 'sunset', 'scenic', 'intimate', 'candlelit', 'riverfront', 'couples'],
    preferredCategories: ['restaurant', 'hotel', 'activity'],
  },
};

function labelFor(id: string) {
  return ALL_OPTIONS.find((option) => option.id === id)?.label ?? id;
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function buildSuggestionSearchText(label: string, description: string, aliases: string[] = []) {
  return normalize([label, description, ...aliases].join(' '));
}

function includesQuery(destination: CityProfile, query: string) {
  const source = normalize(
    [
      destination.city,
      destination.country,
      destination.region,
      destination.summary,
      ...destination.highlights,
      ...destination.bestFor,
    ].join(' ')
  );

  return source.includes(query);
}

function buildDestinationSignalSource(destination: CityProfile) {
  const itineraryText = destination.suggestedItinerary.flatMap((day) => [
    day.title,
    day.theme,
    day.morning.headline,
    day.morning.details,
    day.afternoon.headline,
    day.afternoon.details,
    day.evening.headline,
    day.evening.details,
    day.dining.headline,
    day.dining.details,
  ]);

  const spotText = flattenDestinationSpots(destination).flatMap((place) => [
    place.name,
    place.neighborhood,
    place.why,
  ]);

  return normalize(
    [
      destination.city,
      destination.country,
      destination.region,
      destination.summary,
      ...destination.highlights,
      ...destination.notes,
      ...spotText,
      ...itineraryText,
    ].join(' ')
  );
}

function flattenDestinationSpots(destination: CityProfile) {
  return [
    ...destination.hotels,
    ...destination.restaurants,
    ...destination.attractions,
    ...destination.monuments,
    ...destination.museums,
    ...destination.parks,
    ...destination.activities,
  ];
}

function getSpotFromDestination(destination: CityProfile, id: string) {
  return flattenDestinationSpots(destination).find((place) => place.id === id);
}

function getInterestSignalScore(destination: CityProfile, selectedStyles: TravelInterestId[]) {
  if (selectedStyles.length === 0) {
    return 0;
  }

  const source = buildDestinationSignalSource(destination);
  const spots = flattenDestinationSpots(destination);

  return selectedStyles.reduce((total, style) => {
    const config = INTEREST_SIGNAL_CONFIG[style];

    if (!config) {
      return total;
    }

    const keywordHits = config.keywords.filter((keyword) => source.includes(normalize(keyword))).length;
    const categoryHits = spots.filter((spot) => config.preferredCategories.includes(spot.category)).length;
    const bestForBoost = destination.bestFor.includes(style) ? 14 : 0;
    const keywordBoost = Math.min(8, keywordHits * 2);
    const categoryBoost = Math.min(6, categoryHits * 0.6);

    return total + bestForBoost + keywordBoost + categoryBoost;
  }, 0);
}

function buildReason(
  destination: CityProfile,
  matchedInterests: TravelInterestId[],
  matchedBudget: boolean,
  matchedPace: boolean,
  matchedQuery: boolean
) {
  const fragments: string[] = [];

  if (matchedInterests.length > 0) {
    fragments.push(matchedInterests.slice(0, 3).map(labelFor).join(', ').toLowerCase());
  }

  if (matchedBudget) {
    fragments.push(`${labelFor(destination.budgetFits[0]).toLowerCase()} spending`);
  }

  if (matchedPace) {
    fragments.push(`${labelFor(destination.paceFits[0]).toLowerCase()} pacing`);
  }

  if (matchedQuery) {
    fragments.push('your search');
  }

  if (fragments.length === 0) {
    return 'A strong all-round city if you want a confident place to begin the trip search.';
  }

  return `A good fit because it matches ${fragments.join(', ')}.`;
}

function buildCitySuggestions(): GlobalSearchSuggestion[] {
  return DETAILED_CITIES.map((destination) => ({
    id: `city-${destination.id}`,
    label: destination.city,
    description: `${destination.country} featured itinerary with hotels, restaurants, landmarks, and day plans.`,
    kind: 'city',
    supported: true,
    featuredDestinationId: destination.id,
  }));
}

function buildCountrySuggestions(): GlobalSearchSuggestion[] {
  return WORLD_COUNTRIES.map((country) => {
    const featuredDestination = DETAILED_CITIES.find(
      (destination) => normalize(destination.country) === normalize(country.name)
    );

    return {
      id: `country-${country.code}`,
      label: country.name,
      description: featuredDestination
        ? `Country search with a featured itinerary that starts in ${featuredDestination.city}.`
        : 'Country directory entry ready for broader live city coverage.',
      kind: 'country' as const,
      supported: Boolean(featuredDestination),
      featuredDestinationId: featuredDestination?.id,
    };
  });
}

export function getChoiceLabel(id: string) {
  return labelFor(id);
}

export function getTripLengthDays(tripLength: TripLengthId | string) {
  switch (tripLength) {
    case '1day':
      return 1;
    case '2days':
      return 2;
    case '3days':
      return 3;
    case '5days':
      return 5;
    case '6days':
      return 6;
    case '7days':
      return 7;
    default:
      return 4;
  }
}

export function getDestinationById(id: string) {
  return DETAILED_CITIES.find((destination) => destination.id === id);
}

export function getPlaceById(id: string) {
  return DETAILED_CITIES.flatMap((destination) => flattenDestinationSpots(destination)).find((place) => place.id === id);
}

export function buildFeaturedItineraryCards(limit = 4): FeaturedItineraryCard[] {
  return DETAILED_CITIES.slice(0, limit).map((destination) => ({
    id: destination.id,
    city: destination.city,
    country: destination.country,
    image: destination.image,
    summary: destination.summary,
    bestMonths: destination.bestMonths,
    averageBudget: destination.averageBudget,
    suggestedDays: getTripLengthDays(destination.tripLengths[1] ?? destination.tripLengths[0] ?? '4days'),
    bestFor: destination.bestFor,
  }));
}

export function buildCategorySummaries(limit = 3): TravelCategorySummary[] {
  return STYLE_OPTIONS.map((option) => {
    const matches = DETAILED_CITIES.filter((destination) => destination.bestFor.includes(option.id as TravelInterestId));

    return {
      id: option.id,
      label: option.label,
      hint: option.hint,
      cityNames: matches.slice(0, limit).map((destination) => destination.city),
      totalMatches: matches.length,
    };
  });
}

export function buildSearchSuggestions(query: string, limit = 10) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return DEFAULT_SEARCH_SUGGESTIONS.slice(0, limit);
  }

  return SEARCH_SUGGESTIONS
    .map((suggestion) => {
      const countryAliases = suggestion.kind === 'country' ? COUNTRY_ALIAS_MAP[suggestion.label] ?? [] : [];
      const searchText = buildSuggestionSearchText(suggestion.label, suggestion.description, countryAliases);
      const prefixScore = normalize(suggestion.label).startsWith(normalizedQuery) ? 8 : 0;
      const supportedScore = suggestion.supported ? 4 : 0;
      const kindScore = suggestion.kind === 'city' ? 2 : 0;
      const matchScore = searchText.includes(normalizedQuery) ? 10 : 0;

      return {
        ...suggestion,
        score: matchScore + prefixScore + supportedScore + kindScore,
        searchText,
      };
    })
    .filter((suggestion) => suggestion.searchText.includes(normalizedQuery))
    .sort((left, right) => right.score - left.score || left.label.localeCompare(right.label))
    .slice(0, limit)
    .map(({ score: _score, searchText: _searchText, ...suggestion }) => suggestion);
}

export function buildRecommendations(preferences: TravelPreferences): TravelBundle {
  const query = normalize(preferences.destinationQuery);
  const selectedStyleCount = preferences.styles.length;
  const matchedWorldCountry =
    query.length > 0
      ? WORLD_COUNTRIES.find((country) => normalize(country.name) === query)
      : undefined;
  const queryMatches = query.length > 0 ? DETAILED_CITIES.filter((destination) => includesQuery(destination, query)) : [];

  const destinations = DETAILED_CITIES.map((destination) => {
    const matchedInterests = preferences.styles.filter((style) => destination.bestFor.includes(style));
    const matchedBudget = preferences.budget === 'open' || destination.budgetFits.includes(preferences.budget);
    const matchedPace = destination.paceFits.includes(preferences.pace);
    const matchedLength = destination.tripLengths.includes(preferences.tripLength);
    const matchedQuery = query.length > 0 && includesQuery(destination, query);
    const exactCityMatch = query.length > 0 && normalize(destination.city) === query;
    const exactCountryMatch = query.length > 0 && normalize(destination.country) === query;
    const interestSignalScore = getInterestSignalScore(destination, preferences.styles);
    const interestCoverageScore =
      selectedStyleCount > 0 ? (matchedInterests.length / selectedStyleCount) * 14 : 0;
    const missingInterestPenalty =
      selectedStyleCount > 0 ? (selectedStyleCount - matchedInterests.length) * 4 : 0;

    const rawScore =
      matchedInterests.length * 10 +
      interestCoverageScore +
      interestSignalScore +
      (matchedBudget ? 2 : 0) +
      (matchedPace ? 2 : 0) +
      (matchedLength ? 2 : 0) +
      (matchedQuery ? 5 : 0) +
      (exactCityMatch ? 6 : 0) +
      (exactCountryMatch ? 6 : 0) -
      missingInterestPenalty;

    return {
      ...destination,
      fitScore: Math.max(18, Math.min(99, 28 + rawScore * 2.6)),
      interestSignalScore,
      matchedInterests,
      reason: buildReason(destination, matchedInterests, matchedBudget, matchedPace, matchedQuery),
    };
  })
    .sort(
      (left, right) =>
        right.fitScore - left.fitScore ||
        right.matchedInterests.length - left.matchedInterests.length ||
        right.interestSignalScore - left.interestSignalScore ||
        right.averageRating - left.averageRating ||
        left.city.localeCompare(right.city)
    )
    .map(({ interestSignalScore: _interestSignalScore, ...destination }) => destination);

  const topDestination = destinations[0];
  const queryFallbackUsed = query.length > 0 && queryMatches.length === 0;
  const summary =
    query.length === 0 && preferences.styles.length === 0
      ? 'Start with a city or pick a few interests and the app will narrow the shortlist for you.'
      : matchedWorldCountry && queryMatches.length > 0
        ? `${topDestination.city} is the featured starting point currently mapped for ${matchedWorldCountry.name}, and it best matches your brief.`
      : queryFallbackUsed
        ? matchedWorldCountry
          ? `${matchedWorldCountry.name} is now searchable in the world directory. Detailed day-by-day planning is currently strongest for featured destinations, so these are the closest matches for now.`
          : `No exact city match for "${preferences.destinationQuery.trim()}". These destinations are the closest fit for your interests, budget, and pace.`
        : `${topDestination.city} is leading because it best matches the trip style you described.`;

  const questions = [
    `Do you want ${topDestination.city} to be landmark-heavy, food-first, or a slower neighborhood trip?`,
    `Which part of ${topDestination.city} fits your budget and pace best?`,
    `What should you reserve early so the trip stays smooth and low-stress?`,
  ];

  return {
    destinations,
    summary,
    questions,
    queryMatchedCount: queryMatches.length,
    queryFallbackUsed,
    matchedWorldCountryName: matchedWorldCountry?.name ?? null,
  };
}

export function buildTripPlan(destination: CityProfile | DestinationRecommendation | undefined, tripLength: string) {
  if (!destination) {
    return [] as TravelPlanDay[];
  }

  const days = getTripLengthDays(tripLength);

  return Array.from({ length: days }, (_, index) => {
    const template = destination.suggestedItinerary[index % destination.suggestedItinerary.length];
    const hotelSuggestion = template.hotelSpotId ? getSpotFromDestination(destination, template.hotelSpotId) : undefined;

    return {
      day: index + 1,
      title: template.title,
      theme: template.theme,
      morning: template.morning.details,
      afternoon: template.afternoon.details,
      evening: template.evening.details,
      dining: template.dining.details,
      hotelSuggestion,
      morningSpots: template.morning.spotIds
        .map((spotId) => getSpotFromDestination(destination, spotId))
        .filter((spot): spot is TravelPlace => Boolean(spot)),
      afternoonSpots: template.afternoon.spotIds
        .map((spotId) => getSpotFromDestination(destination, spotId))
        .filter((spot): spot is TravelPlace => Boolean(spot)),
      eveningSpots: template.evening.spotIds
        .map((spotId) => getSpotFromDestination(destination, spotId))
        .filter((spot): spot is TravelPlace => Boolean(spot)),
      diningSpots: template.dining.spotIds
        .map((spotId) => getSpotFromDestination(destination, spotId))
        .filter((spot): spot is TravelPlace => Boolean(spot)),
    };
  });
}

export function buildPreparationChecklist(
  destination: CityProfile | DestinationRecommendation | undefined,
  preferences: TravelPreferences
) {
  if (!destination) {
    return [] as ChecklistItem[];
  }

  const hotel = destination.hotels[0];
  const restaurant = destination.restaurants[0];
  const days = getTripLengthDays(preferences.tripLength);

  return [
    {
      id: `${destination.id}-stay`,
      title: `Choose your base for ${days} days`,
      body: `Start with ${hotel.name} in ${hotel.neighborhood} and compare it with at least one quieter and one more central option.`,
    },
    {
      id: `${destination.id}-dining`,
      title: 'Reserve one signature meal early',
      body: `If food matters on this trip, reserve ${restaurant.name} or another standout dinner before the best slots disappear.`,
    },
    {
      id: `${destination.id}-timing`,
      title: 'Shape the days around energy',
      body: `Best season here is ${destination.bestMonths}. Use easier mornings, heavier afternoons, and slower evenings to keep the trip feeling good all week.`,
    },
    {
      id: `${destination.id}-logistics`,
      title: 'Lock the practical details',
      body: `Check transfers, neighborhood transport, and whether your route works better by walking, public transit, or a few targeted rides.`,
    },
  ];
}
