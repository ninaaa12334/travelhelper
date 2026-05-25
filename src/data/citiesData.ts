export type TravelInterestId =
  | 'beach'
  | 'culture'
  | 'nightlife'
  | 'nature'
  | 'foodie'
  | 'shopping'
  | 'budget'
  | 'luxury'
  | 'family'
  | 'adventure'
  | 'romantic';

export type TravelBudgetId = 'budget' | 'balanced' | 'luxury' | 'open';
export type TravelPaceId = 'easy' | 'balanced' | 'packed';
export type TripLengthId = '1day' | '2days' | '3days' | '4days' | '5days' | '6days' | '7days';

export type CitySpotCategory = 'hotel' | 'restaurant' | 'monument' | 'museum' | 'park' | 'activity';

export type CitySpot = {
  id: string;
  name: string;
  category: CitySpotCategory;
  neighborhood: string;
  estimatedCost: string;
  priceGuide: string;
  rating: number;
  why: string;
};

export type CityItinerarySegment = {
  headline: string;
  details: string;
  spotIds: string[];
};

export type CityItineraryTemplate = {
  title: string;
  theme: string;
  morning: CityItinerarySegment;
  afternoon: CityItinerarySegment;
  evening: CityItinerarySegment;
  dining: CityItinerarySegment;
  hotelSpotId?: string;
};

export type CityProfile = {
  id: string;
  city: string;
  country: string;
  region: string;
  image: string;
  summary: string;
  bestMonths: string;
  averageRating: number;
  averageBudget: string;
  averageNightlyHotel: string;
  budgetFits: TravelBudgetId[];
  paceFits: TravelPaceId[];
  tripLengths: TripLengthId[];
  bestFor: TravelInterestId[];
  highlights: string[];
  notes: string[];
  hotels: CitySpot[];
  restaurants: CitySpot[];
  attractions: CitySpot[];
  monuments: CitySpot[];
  museums: CitySpot[];
  parks: CitySpot[];
  activities: CitySpot[];
  suggestedItinerary: CityItineraryTemplate[];
};

function spot(
  id: string,
  name: string,
  category: CitySpotCategory,
  neighborhood: string,
  estimatedCost: string,
  priceGuide: string,
  rating: number,
  why: string
): CitySpot {
  return {
    id,
    name,
    category,
    neighborhood,
    estimatedCost,
    priceGuide,
    rating,
    why,
  };
}

function segment(headline: string, details: string, spotIds: string[]): CityItinerarySegment {
  return {
    headline,
    details,
    spotIds,
  };
}

function itineraryDay(
  title: string,
  theme: string,
  morning: CityItinerarySegment,
  afternoon: CityItinerarySegment,
  evening: CityItinerarySegment,
  dining: CityItinerarySegment,
  hotelSpotId?: string
): CityItineraryTemplate {
  return {
    title,
    theme,
    morning,
    afternoon,
    evening,
    dining,
    hotelSpotId,
  };
}

const FEATURED_CITY_DATA: CityProfile[] = [
  {
    id: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    region: 'Central Europe',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Berlin mixes history, creative neighborhoods, excellent museums, and a nightlife scene that can be as polished or as underground as you want.',
    bestMonths: 'May to September',
    averageRating: 4.7,
    averageBudget: '$140 to $250 per day',
    averageNightlyHotel: '$120 to $220',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['balanced', 'packed'],
    tripLengths: ['3days', '4days', '5days', '6days', '7days'],
    bestFor: ['culture', 'nightlife', 'budget', 'shopping'],
    highlights: ['museum island', 'creative districts', 'history-heavy landmarks', 'late-night energy'],
    notes: ['Public transport is excellent', 'Book museum slots in advance during peak weekends'],
    hotels: [
      spot(
        'berlin-hotel-1',
        'Hotel Luc Mitte',
        'hotel',
        'Mitte',
        '$195 per night',
        '$$$',
        4.7,
        'A sleek central stay within easy reach of Museum Island, Unter den Linden, and evening walks.'
      ),
      spot(
        'berlin-hotel-2',
        'Motel One Alexanderplatz',
        'hotel',
        'Alexanderplatz',
        '$145 per night',
        '$$',
        4.5,
        'Great for first-time visitors who want direct transit links and a practical home base near the center.'
      ),
    ],
    restaurants: [
      spot(
        'berlin-restaurant-1',
        'Katz Orange',
        'restaurant',
        'Mitte',
        '$45 to $70 per person',
        '$$$',
        4.6,
        'Warm industrial interiors and a polished seasonal menu make this an easy signature dinner.'
      ),
      spot(
        'berlin-restaurant-2',
        'Markthalle Neun Food Hall',
        'restaurant',
        'Kreuzberg',
        '$18 to $30 per person',
        '$$',
        4.7,
        'One of the easiest places to sample Berlin food culture without overplanning.'
      ),
    ],
    attractions: [
      spot(
        'berlin-attraction-1',
        'East Side Gallery Walk',
        'activity',
        'Friedrichshain',
        'Free to $10',
        '$',
        4.7,
        'A visual and historic introduction to the city, especially strong on a first full day.'
      ),
      spot(
        'berlin-attraction-2',
        'Spree River Evening Cruise',
        'activity',
        'Mitte',
        '$22 to $35',
        '$$',
        4.5,
        'Good for seeing key parts of central Berlin with less walking at the end of the day.'
      ),
    ],
    monuments: [
      spot(
        'berlin-monument-1',
        'Brandenburg Gate',
        'monument',
        'Pariser Platz',
        'Free',
        '$',
        4.8,
        'Berlin icon and an easy anchor for a walking route through the historic core.'
      ),
      spot(
        'berlin-monument-2',
        'Memorial to the Murdered Jews of Europe',
        'monument',
        'Mitte',
        'Free',
        '$',
        4.8,
        'Powerful, reflective, and essential for understanding Berlin beyond the postcard version.'
      ),
    ],
    museums: [
      spot(
        'berlin-museum-1',
        'Pergamon Panorama and Museum Island Pass',
        'museum',
        'Museum Island',
        '$22',
        '$$',
        4.7,
        'A strong museum option when you want one deep cultural block rather than many small stops.'
      ),
      spot(
        'berlin-museum-2',
        'Topography of Terror',
        'museum',
        'Kreuzberg edge',
        'Free',
        '$',
        4.8,
        'Sharp, well-curated, and one of the most accessible ways to understand twentieth-century Berlin.'
      ),
    ],
    parks: [
      spot(
        'berlin-park-1',
        'Tiergarten',
        'park',
        'Central Berlin',
        'Free',
        '$',
        4.7,
        'Perfect for a softer reset between monuments and museums.'
      ),
      spot(
        'berlin-park-2',
        'Tempelhofer Feld',
        'park',
        'Tempelhof',
        'Free',
        '$',
        4.7,
        'A former airport turned public space that feels uniquely Berlin and works well for an open afternoon.'
      ),
    ],
    activities: [
      spot(
        'berlin-activity-1',
        'Kreuzberg and Graffiti Backstreets Walk',
        'activity',
        'Kreuzberg',
        '$0 to $18',
        '$',
        4.6,
        'A good way to tap into Berlin street culture, independent shops, and more local energy.'
      ),
      spot(
        'berlin-activity-2',
        'Rooftop drinks at Klunkerkranich',
        'activity',
        'Neukolln',
        '$12 to $25',
        '$$',
        4.5,
        'An easy evening activity with skyline views and a social mood.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Historic Berlin opener',
        'Monuments and orientation',
        segment('Start in the historic center', 'Walk from Brandenburg Gate toward the memorial district while the city is still quiet.', [
          'berlin-monument-1',
          'berlin-monument-2',
        ]),
        segment('Add one major cultural stop', 'Use the afternoon for Museum Island or a nearby deep-dive exhibit.', [
          'berlin-museum-1',
        ]),
        segment('Wind down with a central river view', 'Keep the first evening scenic and easy so the trip starts smoothly.', [
          'berlin-attraction-2',
        ]),
        segment('Book a polished first dinner', 'Choose a stylish meal that still feels relaxed after a long travel day.', [
          'berlin-restaurant-1',
        ]),
        'berlin-hotel-1'
      ),
      itineraryDay(
        'Creative neighborhoods day',
        'Street culture and food',
        segment('Explore Kreuzberg at cafe pace', 'Start with a neighborhood wander through streets that feel more local than monumental.', [
          'berlin-activity-1',
        ]),
        segment('Sample Berlin food culture', 'Use the afternoon around market halls, indie stores, and low-pressure browsing.', [
          'berlin-restaurant-2',
        ]),
        segment('Take the evening somewhere social', 'A roof or canal-side stop works well after a food-first day.', [
          'berlin-activity-2',
        ]),
        segment('Keep dinner flexible', 'Street food or a second casual dinner works better than overbooking here.', [
          'berlin-restaurant-2',
        ]),
        'berlin-hotel-2'
      ),
      itineraryDay(
        'Museum and memory day',
        'History with breathing room',
        segment('Begin with a focused history block', 'Choose a museum or documentation center before crowds build.', [
          'berlin-museum-2',
        ]),
        segment('Take a reset in green space', 'Break up the day with open air so the trip never feels too heavy.', [
          'berlin-park-1',
        ]),
        segment('End with a calmer city view', 'A walk or river moment helps balance the intensity of the day.', [
          'berlin-attraction-2',
        ]),
        segment('Choose dinner near your base', 'Keep the evening efficient if you have a bigger next day planned.', [
          'berlin-restaurant-1',
        ]),
        'berlin-hotel-1'
      ),
      itineraryDay(
        'Open Berlin finale',
        'Flexible mix of parks, shopping, and local favorites',
        segment('Pick the city mood you want more of', 'Use the morning for another museum, shopping stretch, or a second favorite neighborhood.', [
          'berlin-park-2',
        ]),
        segment('Leave room for slower discovery', 'This is the day to browse concept stores, bookshops, or local corners.', [
          'berlin-activity-1',
        ]),
        segment('Finish with one more memorable view', 'A light final evening keeps your departure day calmer.', [
          'berlin-activity-2',
        ]),
        segment('Go for a final meal with atmosphere', 'End on one place you will still remember a month later.', [
          'berlin-restaurant-1',
        ]),
        'berlin-hotel-1'
      ),
    ],
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    region: 'Western Europe',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Paris delivers classic boulevards, museum days, pastry mornings, and dinner rooms that still feel cinematic even on a short trip.',
    bestMonths: 'April to June and September to October',
    averageRating: 4.8,
    averageBudget: '$190 to $340 per day',
    averageNightlyHotel: '$180 to $320',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['easy', 'balanced'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days', '7days'],
    bestFor: ['romantic', 'foodie', 'culture', 'luxury', 'shopping'],
    highlights: ['river walks', 'museum classics', 'fashion streets', 'bistro dinners'],
    notes: ['Reserve major museums early', 'Neighborhood choice shapes the mood of the whole trip'],
    hotels: [
      spot(
        'paris-hotel-1',
        'Hotel des Grands Voyageurs',
        'hotel',
        'Saint-Germain',
        '$295 per night',
        '$$$',
        4.8,
        'A polished Left Bank stay that makes it easy to split time between galleries, cafes, and the river.'
      ),
      spot(
        'paris-hotel-2',
        'Le Grand Quartier',
        'hotel',
        'Canal Saint-Martin',
        '$215 per night',
        '$$',
        4.6,
        'A lighter, younger-feeling base that still stays well connected to classic sights.'
      ),
    ],
    restaurants: [
      spot(
        'paris-restaurant-1',
        'Bistrot Paul Bert',
        'restaurant',
        '11th arrondissement',
        '$45 to $75 per person',
        '$$$',
        4.7,
        'A classic Paris dinner room that feels worth reserving ahead.'
      ),
      spot(
        'paris-restaurant-2',
        'Breizh Cafe',
        'restaurant',
        'Le Marais',
        '$20 to $35 per person',
        '$$',
        4.6,
        'Reliable, central, and great for a lower-stress lunch or easy dinner.'
      ),
    ],
    attractions: [
      spot(
        'paris-attraction-1',
        'Seine river cruise',
        'activity',
        'Central Paris',
        '$18 to $28',
        '$$',
        4.6,
        'An easy overview activity that works especially well on a first or final evening.'
      ),
      spot(
        'paris-attraction-2',
        'Montmartre street wander',
        'activity',
        'Montmartre',
        'Free to $12',
        '$',
        4.7,
        'Best when you want atmosphere, views, and a less structured block of time.'
      ),
    ],
    monuments: [
      spot(
        'paris-monument-1',
        'Eiffel Tower district',
        'monument',
        '7th arrondissement',
        'Free to $35',
        '$$',
        4.8,
        'Still worth doing once, especially when paired with nearby river walks.'
      ),
      spot(
        'paris-monument-2',
        'Arc de Triomphe',
        'monument',
        '8th arrondissement',
        '$18',
        '$$',
        4.7,
        'A strong city-view stop if you want a classic Paris panorama.'
      ),
    ],
    museums: [
      spot(
        'paris-museum-1',
        'Musee d Orsay',
        'museum',
        'Left Bank',
        '$18',
        '$$',
        4.8,
        'A more manageable museum day than the Louvre for many travelers, with a very rewarding collection.'
      ),
      spot(
        'paris-museum-2',
        'Louvre Museum',
        'museum',
        '1st arrondissement',
        '$24',
        '$$',
        4.7,
        'Best when you commit to a focused route instead of trying to see everything.'
      ),
    ],
    parks: [
      spot(
        'paris-park-1',
        'Luxembourg Gardens',
        'park',
        '6th arrondissement',
        'Free',
        '$',
        4.8,
        'Ideal for slowing the trip down and balancing museum-heavy days.'
      ),
      spot(
        'paris-park-2',
        'Tuileries Garden',
        'park',
        '1st arrondissement',
        'Free',
        '$',
        4.7,
        'A practical and beautiful reset between central monuments and museums.'
      ),
    ],
    activities: [
      spot(
        'paris-activity-1',
        'Le Marais shopping walk',
        'activity',
        'Le Marais',
        '$0 to $50',
        '$$',
        4.6,
        'A good fit when you want style, food, and browsing to blend together naturally.'
      ),
      spot(
        'paris-activity-2',
        'Late aperitif in Saint-Germain',
        'activity',
        'Saint-Germain',
        '$12 to $25',
        '$$',
        4.6,
        'Simple, classic, and especially good for romantic trips.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Classic Paris opener',
        'Icons and river atmosphere',
        segment('Start with a pastry and one iconic view', 'Use the morning for a classic monument without rushing the entire day.', [
          'paris-monument-1',
        ]),
        segment('Build in art or a garden stop', 'Keep the afternoon elegant rather than overpacked.', [
          'paris-museum-1',
          'paris-park-2',
        ]),
        segment('Move toward the river at golden hour', 'This is the easiest way to make the city feel cinematic immediately.', [
          'paris-attraction-1',
        ]),
        segment('Choose a warm first-night dinner', 'Book one dinner that feels unmistakably Paris.', [
          'paris-restaurant-1',
        ]),
        'paris-hotel-1'
      ),
      itineraryDay(
        'Art and style day',
        'Museums, shopping, and cafe pace',
        segment('Go early for a focused museum route', 'Choose one museum and do it properly instead of stacking too many tickets.', [
          'paris-museum-2',
        ]),
        segment('Shift toward neighborhood browsing', 'Use the afternoon for shops, pastries, and a more relaxed rhythm.', [
          'paris-activity-1',
        ]),
        segment('Keep the evening soft and social', 'Aperitif plus a scenic walk works better than another major attraction.', [
          'paris-activity-2',
        ]),
        segment('Make dinner feel local, not touristy', 'A smaller room with strong food is usually the better Paris memory.', [
          'paris-restaurant-2',
        ]),
        'paris-hotel-2'
      ),
      itineraryDay(
        'Romantic Paris day',
        'Gardens and elegant neighborhoods',
        segment('Start in a calm green space', 'Slow the morning down so the trip feels lived-in rather than checked-off.', [
          'paris-park-1',
        ]),
        segment('Layer in a central monument or boulevard walk', 'Keep the route beautiful but not too rigid.', [
          'paris-monument-2',
        ]),
        segment('Use sunset for Montmartre or the river', 'Both work well if you want atmosphere without overplanning.', [
          'paris-attraction-2',
          'paris-attraction-1',
        ]),
        segment('Reserve one standout dinner', 'This is the night to do the polished dinner room if you want one.', [
          'paris-restaurant-1',
        ]),
        'paris-hotel-1'
      ),
      itineraryDay(
        'Soft landing finale',
        'Flexible favorites and final recommendations',
        segment('Revisit the part of Paris you liked most', 'Use the final morning for the neighborhood that best matched your trip mood.', [
          'paris-activity-1',
        ]),
        segment('Leave room for gifts and one more cafe stop', 'The best last day plans still feel spacious.', [
          'paris-park-2',
        ]),
        segment('Keep the evening simple if you are departing soon', 'A small walk and a view usually beats one more rushed museum ticket.', [
          'paris-attraction-1',
        ]),
        segment('Pick an easy closing meal', 'Stay close to your route or hotel and let the day breathe.', [
          'paris-restaurant-2',
        ]),
        'paris-hotel-2'
      ),
    ],
  },
  {
    id: 'rome',
    city: 'Rome',
    country: 'Italy',
    region: 'Southern Europe',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Rome is ideal when you want ancient monuments, long dinners, easy walking, and a city that feels dramatic even without over-scheduling.',
    bestMonths: 'April to June and September to October',
    averageRating: 4.7,
    averageBudget: '$160 to $300 per day',
    averageNightlyHotel: '$150 to $260',
    budgetFits: ['balanced', 'open', 'luxury'],
    paceFits: ['easy', 'balanced'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days'],
    bestFor: ['culture', 'foodie', 'family', 'romantic'],
    highlights: ['ancient landmarks', 'piazza evenings', 'classic pasta', 'walkable neighborhoods'],
    notes: ['Buy landmark tickets early', 'Stay central if you want better evenings without taxis'],
    hotels: [
      spot(
        'rome-hotel-1',
        'Palazzo Navona Hotel',
        'hotel',
        'Centro Storico',
        '$240 per night',
        '$$$',
        4.7,
        'A polished central base that makes landmark-heavy days much smoother.'
      ),
      spot(
        'rome-hotel-2',
        'Trastevere Suites',
        'hotel',
        'Trastevere',
        '$165 per night',
        '$$',
        4.5,
        'Better if you want neighborhood energy and an easier dinner scene right outside.'
      ),
    ],
    restaurants: [
      spot(
        'rome-restaurant-1',
        'Roscioli',
        'restaurant',
        'Centro Storico',
        '$35 to $65 per person',
        '$$$',
        4.7,
        'One of the easiest high-quality food reservations to build a Rome trip around.'
      ),
      spot(
        'rome-restaurant-2',
        'Da Enzo al 29',
        'restaurant',
        'Trastevere',
        '$20 to $35 per person',
        '$$',
        4.6,
        'A classic Roman meal that feels very rewarding without being too formal.'
      ),
    ],
    attractions: [
      spot(
        'rome-attraction-1',
        'Evening walk through Piazza Navona and Campo de Fiori',
        'activity',
        'Historic center',
        'Free to $15',
        '$',
        4.7,
        'An easy first-evening route that immediately gives the city some romance and rhythm.'
      ),
      spot(
        'rome-attraction-2',
        'Trastevere golden hour walk',
        'activity',
        'Trastevere',
        'Free',
        '$',
        4.8,
        'A favorite for travelers who want atmosphere, food stops, and a lighter planning block.'
      ),
    ],
    monuments: [
      spot(
        'rome-monument-1',
        'Colosseum',
        'monument',
        'Ancient Rome',
        '$20 to $28',
        '$$',
        4.8,
        'The landmark that anchors almost every first Rome itinerary for good reason.'
      ),
      spot(
        'rome-monument-2',
        'Pantheon',
        'monument',
        'Centro Storico',
        '$6',
        '$',
        4.8,
        'Easy to slot into a central walking day and still surprisingly impressive in person.'
      ),
    ],
    museums: [
      spot(
        'rome-museum-1',
        'Vatican Museums',
        'museum',
        'Vatican area',
        '$25 to $35',
        '$$',
        4.7,
        'Best when booked early and treated like the main event of the day.'
      ),
      spot(
        'rome-museum-2',
        'Capitoline Museums',
        'museum',
        'Campidoglio',
        '$15',
        '$$',
        4.6,
        'A strong culture choice when you want excellent art without Vatican-level crowds.'
      ),
    ],
    parks: [
      spot(
        'rome-park-1',
        'Villa Borghese Gardens',
        'park',
        'Borghese',
        'Free',
        '$',
        4.7,
        'Perfect for slowing the trip down after a monument-heavy morning.'
      ),
      spot(
        'rome-park-2',
        'Orange Garden',
        'park',
        'Aventine Hill',
        'Free',
        '$',
        4.7,
        'A small, high-reward stop with a memorable city view near sunset.'
      ),
    ],
    activities: [
      spot(
        'rome-activity-1',
        'Espresso and street wandering in Monti',
        'activity',
        'Monti',
        '$10 to $25',
        '$',
        4.6,
        'A good way to build in style, coffee, and less structured walking time.'
      ),
      spot(
        'rome-activity-2',
        'Aperitivo by the Tiber',
        'activity',
        'Tiber side',
        '$12 to $22',
        '$$',
        4.5,
        'Simple, affordable, and very effective for rounding out a Rome day.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Ancient Rome opener',
        'Landmarks and central dinner',
        segment('Start with Rome at full scale', 'Use the morning for the citys most iconic ancient landmark while your energy is high.', [
          'rome-monument-1',
        ]),
        segment('Continue through the historic core', 'Keep walking through the center instead of jumping across the city.', [
          'rome-monument-2',
          'rome-activity-1',
        ]),
        segment('Let the evening stay scenic', 'A central piazza route works better than too many formal stops.', [
          'rome-attraction-1',
        ]),
        segment('Lock in a strong first dinner', 'Choose a classic Roman meal in the center.', [
          'rome-restaurant-1',
        ]),
        'rome-hotel-1'
      ),
      itineraryDay(
        'Culture and Vatican day',
        'Museum focus with a softer finish',
        segment('Do the major museum early', 'This is the day to commit to one deep culture block.', [
          'rome-museum-1',
        ]),
        segment('Recover in open air', 'Add a park or slower lunch so the day stays enjoyable.', [
          'rome-park-1',
        ]),
        segment('Shift toward aperitivo pace', 'A small view or evening drink makes the day feel less intense.', [
          'rome-activity-2',
        ]),
        segment('Keep dinner approachable', 'A neighborhood trattoria usually feels right after a long museum day.', [
          'rome-restaurant-2',
        ]),
        'rome-hotel-2'
      ),
      itineraryDay(
        'Neighborhood flavor day',
        'Trastevere, cafes, and atmosphere',
        segment('Start in a neighborhood with character', 'Use the morning for coffee, side streets, and slower local pacing.', [
          'rome-activity-1',
        ]),
        segment('Spend the afternoon in Trastevere or Monti', 'This is the most flexible day for food, shops, and wandering.', [
          'rome-attraction-2',
        ]),
        segment('Take one more city view', 'A short hilltop stop keeps the day photogenic without stress.', [
          'rome-park-2',
        ]),
        segment('Book the pasta night', 'This is a great night for the classic Roman dinner you were waiting for.', [
          'rome-restaurant-2',
        ]),
        'rome-hotel-2'
      ),
      itineraryDay(
        'Soft Rome finale',
        'Favorites, gifts, and final recommendations',
        segment('Revisit your favorite central area', 'Give the last morning to the part of Rome you want one more time.', [
          'rome-monument-2',
        ]),
        segment('Keep the afternoon open', 'Use it for shopping, a second museum, or a long lunch depending on energy.', [
          'rome-museum-2',
        ]),
        segment('Finish with one last gentle walk', 'Do not overfill the final evening if departure is close.', [
          'rome-attraction-1',
        ]),
        segment('Choose a convenient closing meal', 'Stay central and easy if you are moving on soon.', [
          'rome-restaurant-1',
        ]),
        'rome-hotel-1'
      ),
    ],
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    region: 'Northern Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80',
    summary:
      'London works especially well for city travelers who want museums, neighborhoods, shopping, and a trip that can be packed or relaxed without losing quality.',
    bestMonths: 'May to September',
    averageRating: 4.7,
    averageBudget: '$210 to $360 per day',
    averageNightlyHotel: '$210 to $340',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['balanced', 'packed'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days', '7days'],
    bestFor: ['shopping', 'culture', 'family', 'nightlife'],
    highlights: ['museum access', 'classic royal landmarks', 'shopping streets', 'neighborhood variety'],
    notes: ['Transit is easy with contactless payments', 'Mix major sights with neighborhood time to avoid fatigue'],
    hotels: [
      spot(
        'london-hotel-1',
        'The Resident Covent Garden',
        'hotel',
        'Covent Garden',
        '$290 per night',
        '$$$',
        4.7,
        'An excellent location for first-timers who want theater, dining, and walkable central routes.'
      ),
      spot(
        'london-hotel-2',
        'Ruby Stella Hotel',
        'hotel',
        'Clerkenwell',
        '$205 per night',
        '$$',
        4.5,
        'Modern and practical, with a slightly more local feel than the busiest tourist zones.'
      ),
    ],
    restaurants: [
      spot(
        'london-restaurant-1',
        'Dishoom Covent Garden',
        'restaurant',
        'Covent Garden',
        '$25 to $45 per person',
        '$$',
        4.7,
        'Reliable, central, and great for travelers who want something memorable without overcomplicating dinner.'
      ),
      spot(
        'london-restaurant-2',
        'Borough Market grazing route',
        'restaurant',
        'Southwark',
        '$18 to $35 per person',
        '$$',
        4.8,
        'A perfect lunch strategy when you want variety, speed, and local energy.'
      ),
    ],
    attractions: [
      spot(
        'london-attraction-1',
        'South Bank walk',
        'activity',
        'South Bank',
        'Free',
        '$',
        4.8,
        'One of the best first-day orientation routes in Europe.'
      ),
      spot(
        'london-attraction-2',
        'West End show evening',
        'activity',
        'West End',
        '$45 to $120',
        '$$$',
        4.7,
        'A very easy way to make the city feel like an event without adding more daytime pressure.'
      ),
    ],
    monuments: [
      spot(
        'london-monument-1',
        'Tower Bridge and Tower of London area',
        'monument',
        'Tower Hamlets',
        '$0 to $45',
        '$$',
        4.8,
        'A classic history block with some of the strongest skyline views in London.'
      ),
      spot(
        'london-monument-2',
        'Big Ben and Westminster',
        'monument',
        'Westminster',
        'Free',
        '$',
        4.8,
        'A major icon and an easy anchor for first-day routes.'
      ),
    ],
    museums: [
      spot(
        'london-museum-1',
        'British Museum',
        'museum',
        'Bloomsbury',
        'Free',
        '$',
        4.7,
        'One of the best museum values in the city if you approach it with a focused plan.'
      ),
      spot(
        'london-museum-2',
        'Victoria and Albert Museum',
        'museum',
        'South Kensington',
        'Free',
        '$',
        4.8,
        'A strong pick for design, fashion, and travelers who want a beautiful museum rather than just a famous one.'
      ),
    ],
    parks: [
      spot(
        'london-park-1',
        'Hyde Park',
        'park',
        'Central London',
        'Free',
        '$',
        4.7,
        'Great for breaking up packed sightseeing days with a calmer block.'
      ),
      spot(
        'london-park-2',
        'Regents Park',
        'park',
        'Marylebone',
        'Free',
        '$',
        4.7,
        'A more elegant green reset if your trip includes shopping or nearby museums.'
      ),
    ],
    activities: [
      spot(
        'london-activity-1',
        'Covent Garden and Seven Dials shopping loop',
        'activity',
        'Covent Garden',
        '$0 to $80',
        '$$',
        4.6,
        'Easy for style, gifts, and lively city energy without needing much planning.'
      ),
      spot(
        'london-activity-2',
        'Notting Hill and Portobello stroll',
        'activity',
        'Notting Hill',
        '$0 to $30',
        '$$',
        4.6,
        'Works well when you want neighborhood charm and a slightly softer pace.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Classic London opener',
        'Landmarks and riverside orientation',
        segment('Open with Westminster', 'Start at a landmark-heavy area before moving into a more fluid walk.', [
          'london-monument-2',
        ]),
        segment('Follow the river route', 'Use the afternoon along the South Bank to avoid too much transit early in the trip.', [
          'london-attraction-1',
        ]),
        segment('End the evening with London as an event', 'A theater night is a very easy win here.', [
          'london-attraction-2',
        ]),
        segment('Keep dinner central and easy', 'Stay near the West End so the day remains smooth.', [
          'london-restaurant-1',
        ]),
        'london-hotel-1'
      ),
      itineraryDay(
        'Museum and market day',
        'Culture with food built in',
        segment('Choose one major museum', 'Do one museum well instead of racing through three.', [
          'london-museum-1',
          'london-museum-2',
        ]),
        segment('Build lunch around a market or food hall', 'It keeps the middle of the day more flexible and more interesting.', [
          'london-restaurant-2',
        ]),
        segment('Take a park break or shopping loop', 'This is the right time to introduce some breathing room.', [
          'london-park-1',
          'london-activity-1',
        ]),
        segment('Book a warm, reliable dinner', 'Choose something central so the evening stays easy.', [
          'london-restaurant-1',
        ]),
        'london-hotel-2'
      ),
      itineraryDay(
        'Neighborhoods and shopping day',
        'Style, side streets, and local rhythm',
        segment('Spend the morning in a strong neighborhood', 'This day works best when it feels less formal and more exploratory.', [
          'london-activity-2',
        ]),
        segment('Layer in shopping or another museum', 'Use the afternoon according to energy and interests.', [
          'london-activity-1',
          'london-park-2',
        ]),
        segment('Finish with skyline or theater energy', 'Pick the more social route if you still have energy.', [
          'london-attraction-2',
        ]),
        segment('Leave dinner near your evening plan', 'Keep transit light on the busiest day.', [
          'london-restaurant-1',
        ]),
        'london-hotel-1'
      ),
      itineraryDay(
        'Flexible London finale',
        'Favorites, royal landmarks, and final recommendations',
        segment('Use the morning for anything you missed', 'This could be Tower Bridge, another museum, or one more district walk.', [
          'london-monument-1',
        ]),
        segment('Keep the afternoon realistic', 'If your trip is ending soon, resist overbooking this block.', [
          'london-park-1',
        ]),
        segment('Wrap with one easy scenic route', 'A short walk or final drink is usually the best last move.', [
          'london-attraction-1',
        ]),
        segment('Choose a convenient final meal', 'Stay close to your route and let the trip finish calmly.', [
          'london-restaurant-2',
        ]),
        'london-hotel-2'
      ),
    ],
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    region: 'Southern Europe',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Barcelona is ideal when you want beach energy, food, architecture, and a trip that naturally flows between city blocks and slower coastal time.',
    bestMonths: 'May to October',
    averageRating: 4.7,
    averageBudget: '$150 to $290 per day',
    averageNightlyHotel: '$150 to $260',
    budgetFits: ['balanced', 'open', 'luxury'],
    paceFits: ['easy', 'balanced', 'packed'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days', '7days'],
    bestFor: ['beach', 'foodie', 'nightlife', 'romantic', 'shopping'],
    highlights: ['gaudi landmarks', 'beach access', 'late dinners', 'lively neighborhoods'],
    notes: ['Major landmarks sell out quickly', 'Plan around midday heat in summer'],
    hotels: [
      spot(
        'barcelona-hotel-1',
        'Hotel Rec Barcelona',
        'hotel',
        'El Born',
        '$190 per night',
        '$$',
        4.6,
        'A central and stylish base near old-city lanes, tapas, and easy evening wandering.'
      ),
      spot(
        'barcelona-hotel-2',
        'Seventy Barcelona',
        'hotel',
        'Eixample',
        '$250 per night',
        '$$$',
        4.7,
        'A more polished stay for travelers who want comfort and an easy Eixample location.'
      ),
    ],
    restaurants: [
      spot(
        'barcelona-restaurant-1',
        'Bar Canete',
        'restaurant',
        'El Raval',
        '$35 to $65 per person',
        '$$$',
        4.7,
        'A great signature dinner if food is one of the reasons you picked Barcelona.'
      ),
      spot(
        'barcelona-restaurant-2',
        'Tapeo del Born',
        'restaurant',
        'El Born',
        '$22 to $40 per person',
        '$$',
        4.6,
        'A reliable tapas stop that fits easily into a central walking day.'
      ),
    ],
    attractions: [
      spot(
        'barcelona-attraction-1',
        'Barceloneta beach walk',
        'activity',
        'Barceloneta',
        'Free to $20',
        '$',
        4.6,
        'The easiest way to bring the seaside into the trip without turning the whole day into a beach day.'
      ),
      spot(
        'barcelona-attraction-2',
        'Bunkers del Carmel sunset',
        'activity',
        'Carmel',
        'Free',
        '$',
        4.7,
        'A memorable city view and a strong evening anchor for relaxed travelers.'
      ),
    ],
    monuments: [
      spot(
        'barcelona-monument-1',
        'Sagrada Familia',
        'monument',
        'Eixample',
        '$30 to $40',
        '$$',
        4.8,
        'The citys essential architecture stop and worth planning properly.'
      ),
      spot(
        'barcelona-monument-2',
        'Park Guell monumental zone',
        'monument',
        'Gracia edge',
        '$13',
        '$$',
        4.6,
        'A strong mix of design and city views, especially if you want a half-day experience.'
      ),
    ],
    museums: [
      spot(
        'barcelona-museum-1',
        'Picasso Museum',
        'museum',
        'El Born',
        '$16',
        '$$',
        4.6,
        'A good culture block that still keeps you in one of Barcelonas best neighborhoods.'
      ),
      spot(
        'barcelona-museum-2',
        'Moco Museum Barcelona',
        'museum',
        'El Born',
        '$18',
        '$$',
        4.5,
        'Best for travelers who prefer a faster, more contemporary museum experience.'
      ),
    ],
    parks: [
      spot(
        'barcelona-park-1',
        'Ciutadella Park',
        'park',
        'El Born',
        'Free',
        '$',
        4.6,
        'Useful for a green break between old-city walking and museum stops.'
      ),
      spot(
        'barcelona-park-2',
        'Montjuic gardens and viewpoints',
        'park',
        'Montjuic',
        'Free to $14',
        '$',
        4.7,
        'One of the best areas for a slower half-day with views.'
      ),
    ],
    activities: [
      spot(
        'barcelona-activity-1',
        'Passeig de Gracia shopping loop',
        'activity',
        'Eixample',
        '$0 to $80',
        '$$',
        4.6,
        'Good for style, architecture, and a polished city feel in one block.'
      ),
      spot(
        'barcelona-activity-2',
        'Late tapas and cocktail circuit',
        'activity',
        'El Born',
        '$20 to $45',
        '$$',
        4.6,
        'A natural fit for travelers who picked Barcelona for the social energy.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Gaudi and city icons',
        'Architecture first, then neighborhood pace',
        segment('Start with the landmark that defines the city', 'Book an early slot so the first major stop feels easier and calmer.', [
          'barcelona-monument-1',
        ]),
        segment('Continue with architecture or a design district walk', 'Use the afternoon for an elegant central route.', [
          'barcelona-activity-1',
        ]),
        segment('Keep the evening scenic and social', 'A light sunset stop or central stroll works well here.', [
          'barcelona-attraction-2',
        ]),
        segment('Reserve your signature tapas dinner', 'Food is a core part of the city experience, so make the first dinner count.', [
          'barcelona-restaurant-1',
        ]),
        'barcelona-hotel-2'
      ),
      itineraryDay(
        'Beach and old-city day',
        'Coastline with food and wandering',
        segment('Start with the sea', 'Use the morning for beach air or an easy promenade walk.', [
          'barcelona-attraction-1',
        ]),
        segment('Move into the old city or a museum', 'This keeps the day varied without feeling overbuilt.', [
          'barcelona-museum-1',
          'barcelona-park-1',
        ]),
        segment('Let the evening stay social', 'This is a good night for a little more nightlife if you want it.', [
          'barcelona-activity-2',
        ]),
        segment('Keep dinner near the old city', 'Stay where the city already feels alive after dark.', [
          'barcelona-restaurant-2',
        ]),
        'barcelona-hotel-1'
      ),
      itineraryDay(
        'Views and culture day',
        'Parks, museums, and hidden pockets',
        segment('Open with a view-heavy area', 'A slower scenic morning helps balance the busier parts of Barcelona.', [
          'barcelona-park-2',
        ]),
        segment('Choose your museum or second major sight', 'Keep the afternoon focused rather than stacking too many tickets.', [
          'barcelona-museum-2',
          'barcelona-monument-2',
        ]),
        segment('Finish with one more photogenic route', 'A short design district walk works well before dinner.', [
          'barcelona-activity-1',
        ]),
        segment('Pick the easy neighborhood dinner', 'This day does not need an overcomplicated reservation.', [
          'barcelona-restaurant-2',
        ]),
        'barcelona-hotel-1'
      ),
      itineraryDay(
        'Flexible Barcelona finale',
        'Favorites, shopping, and final recommendations',
        segment('Revisit your favorite city mood', 'Use the last morning for the beach, architecture, or local streets you liked most.', [
          'barcelona-attraction-1',
        ]),
        segment('Leave time for gifts and one more local meal', 'Do not overfill the last afternoon.', [
          'barcelona-activity-1',
        ]),
        segment('Use sunset for one final city view', 'A gentle ending usually feels better than another landmark queue.', [
          'barcelona-attraction-2',
        ]),
        segment('Choose your closing dinner based on energy', 'Go polished or easy depending on how full the trip already feels.', [
          'barcelona-restaurant-1',
          'barcelona-restaurant-2',
        ]),
        'barcelona-hotel-2'
      ),
    ],
  },
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    region: 'Eastern Europe and Western Asia',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Istanbul is strongest for travelers who want layered history, food, bazaars, and a city that feels visually rich from morning until late evening.',
    bestMonths: 'April to June and September to November',
    averageRating: 4.7,
    averageBudget: '$120 to $240 per day',
    averageNightlyHotel: '$110 to $210',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['balanced', 'packed'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days', '7days'],
    bestFor: ['culture', 'foodie', 'shopping', 'budget', 'romantic'],
    highlights: ['mosque silhouettes', 'bosphorus views', 'bazaars', 'tea and meze culture'],
    notes: ['Traffic can be heavy', 'Choose neighborhoods carefully so the trip feels smoother'],
    hotels: [
      spot(
        'istanbul-hotel-1',
        'Hotel Sultania',
        'hotel',
        'Sirkeci',
        '$165 per night',
        '$$$',
        4.6,
        'Convenient for first-time visitors who want to focus on the historic core.'
      ),
      spot(
        'istanbul-hotel-2',
        'The Bank Hotel',
        'hotel',
        'Karakoy',
        '$210 per night',
        '$$$',
        4.7,
        'Better if you want a more design-forward stay with easy access to cafes and nightlife.'
      ),
    ],
    restaurants: [
      spot(
        'istanbul-restaurant-1',
        'Hamdi Restaurant',
        'restaurant',
        'Eminonu',
        '$25 to $45 per person',
        '$$',
        4.7,
        'A reliable first signature meal with skyline and mosque views.'
      ),
      spot(
        'istanbul-restaurant-2',
        'Karakoy Lokantasi',
        'restaurant',
        'Karakoy',
        '$20 to $38 per person',
        '$$',
        4.7,
        'A polished but still approachable dinner that fits many trip styles.'
      ),
    ],
    attractions: [
      spot(
        'istanbul-attraction-1',
        'Bosphorus ferry ride',
        'activity',
        'Bosphorus',
        '$3 to $20',
        '$',
        4.8,
        'One of the best value experiences in the city and a perfect pacing tool.'
      ),
      spot(
        'istanbul-attraction-2',
        'Grand Bazaar wander',
        'activity',
        'Fatih',
        'Free to $40',
        '$$',
        4.6,
        'Best when you want shopping, color, and a very distinct city atmosphere.'
      ),
    ],
    monuments: [
      spot(
        'istanbul-monument-1',
        'Hagia Sophia',
        'monument',
        'Sultanahmet',
        'Free',
        '$',
        4.8,
        'The landmark most visitors build the entire first day around.'
      ),
      spot(
        'istanbul-monument-2',
        'Blue Mosque',
        'monument',
        'Sultanahmet',
        'Free',
        '$',
        4.8,
        'An easy pairing with Hagia Sophia and the nearby square.'
      ),
    ],
    museums: [
      spot(
        'istanbul-museum-1',
        'Topkapi Palace Museum',
        'museum',
        'Sultanahmet',
        '$20 to $30',
        '$$',
        4.7,
        'A strong half-day history stop with excellent views.'
      ),
      spot(
        'istanbul-museum-2',
        'Istanbul Modern',
        'museum',
        'Karakoy',
        '$18',
        '$$',
        4.5,
        'Best for travelers who want to mix classic history with contemporary culture.'
      ),
    ],
    parks: [
      spot(
        'istanbul-park-1',
        'Gulhane Park',
        'park',
        'Sultanahmet',
        'Free',
        '$',
        4.6,
        'Very useful for a break during a monument-heavy first day.'
      ),
      spot(
        'istanbul-park-2',
        'Macka Democracy Park',
        'park',
        'Nisantasi edge',
        'Free',
        '$',
        4.5,
        'A lighter green option if your day is based on modern neighborhoods rather than old Istanbul.'
      ),
    ],
    activities: [
      spot(
        'istanbul-activity-1',
        'Galata and Karakoy cafe route',
        'activity',
        'Karakoy',
        '$10 to $28',
        '$$',
        4.6,
        'A strong neighborhood block when you want design, coffee, and a more modern city mood.'
      ),
      spot(
        'istanbul-activity-2',
        'Rooftop tea or dinner with mosque skyline',
        'activity',
        'Beyoglu',
        '$15 to $35',
        '$$',
        4.6,
        'A high-reward evening move for both romantic and first-time trips.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Old Istanbul opener',
        'Major monuments and palace history',
        segment('Start with the essential skyline district', 'Use the morning for the citys most important historic core.', [
          'istanbul-monument-1',
          'istanbul-monument-2',
        ]),
        segment('Continue with palace history', 'Keep the afternoon in the same area to reduce friction and extra travel.', [
          'istanbul-museum-1',
          'istanbul-park-1',
        ]),
        segment('End with a softer view', 'A skyline drink or slow evening makes the day feel complete.', [
          'istanbul-activity-2',
        ]),
        segment('Choose dinner with scenery', 'Make the first dinner feel specific to Istanbul rather than generic.', [
          'istanbul-restaurant-1',
        ]),
        'istanbul-hotel-1'
      ),
      itineraryDay(
        'Bosphorus and bazaars day',
        'Movement, markets, and food',
        segment('Start with the water', 'A ferry ride gives context and helps the city feel less overwhelming.', [
          'istanbul-attraction-1',
        ]),
        segment('Use the afternoon for markets and shopping', 'Build the middle of the day around browsing and local texture.', [
          'istanbul-attraction-2',
        ]),
        segment('Keep the evening modern', 'Shift toward Karakoy or Beyoglu for more contrast.', [
          'istanbul-activity-1',
        ]),
        segment('Book dinner in a neighborhood with nightlife', 'This is the day to go a little more social if you want it.', [
          'istanbul-restaurant-2',
        ]),
        'istanbul-hotel-2'
      ),
      itineraryDay(
        'Modern Istanbul day',
        'Contemporary culture and neighborhoods',
        segment('Begin with a calmer museum block', 'Use the morning for a different side of the city.', [
          'istanbul-museum-2',
        ]),
        segment('Add cafes and local streets', 'This afternoon works best when it stays flexible and neighborhood-based.', [
          'istanbul-activity-1',
          'istanbul-park-2',
        ]),
        segment('Take one final skyline moment', 'Istanbul rewards slower evening viewing just as much as landmarks.', [
          'istanbul-activity-2',
        ]),
        segment('Keep dinner stylish but approachable', 'A strong neighborhood dinner fits this day better than a formal tasting route.', [
          'istanbul-restaurant-2',
        ]),
        'istanbul-hotel-2'
      ),
      itineraryDay(
        'Flexible finale',
        'Favorites, shopping, and final recommendations',
        segment('Revisit the side of Istanbul you liked most', 'Use the last morning to choose between the historic core and modern districts.', [
          'istanbul-monument-1',
          'istanbul-activity-1',
        ]),
        segment('Leave room for final shopping or tea', 'Do not let the last day become a rush of unnecessary tickets.', [
          'istanbul-attraction-2',
        ]),
        segment('Keep the evening easy if departure is close', 'One more view is enough to close the trip well.', [
          'istanbul-attraction-1',
        ]),
        segment('Choose a convenient closing meal', 'Stay close to your route and avoid a complicated final transfer.', [
          'istanbul-restaurant-1',
        ]),
        'istanbul-hotel-1'
      ),
    ],
  },
  {
    id: 'vienna',
    city: 'Vienna',
    country: 'Austria',
    region: 'Central Europe',
    image: 'https://images.unsplash.com/photo-1516550893885-985bf2d7c803?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Vienna is excellent for elegant city breaks with museums, classical architecture, coffeehouse pauses, and a gentler pace that still feels rich.',
    bestMonths: 'April to June and September to December',
    averageRating: 4.7,
    averageBudget: '$170 to $300 per day',
    averageNightlyHotel: '$170 to $280',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['easy', 'balanced'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days'],
    bestFor: ['culture', 'luxury', 'romantic', 'family'],
    highlights: ['coffeehouse culture', 'imperial landmarks', 'concert evenings', 'elegant museums'],
    notes: ['Museum districts are easy to cluster', 'Vienna rewards slow mornings and reservations for concerts'],
    hotels: [
      spot(
        'vienna-hotel-1',
        'The Leo Grand',
        'hotel',
        'Innere Stadt',
        '$280 per night',
        '$$$',
        4.8,
        'A refined old-center stay that keeps most of the citys highlights within reach.'
      ),
      spot(
        'vienna-hotel-2',
        'Hotel Motto',
        'hotel',
        'Mariahilf',
        '$220 per night',
        '$$$',
        4.7,
        'A more design-led option with strong shopping and cafe access.'
      ),
    ],
    restaurants: [
      spot(
        'vienna-restaurant-1',
        'Plachutta Wollzeile',
        'restaurant',
        'Innere Stadt',
        '$35 to $60 per person',
        '$$$',
        4.6,
        'A classic Vienna meal in a central location that feels appropriately old-world.'
      ),
      spot(
        'vienna-restaurant-2',
        'Cafe Sperl',
        'restaurant',
        'Wieden',
        '$15 to $28 per person',
        '$$',
        4.5,
        'A strong pick when you want the coffeehouse part of Vienna to be more than just a quick stop.'
      ),
    ],
    attractions: [
      spot(
        'vienna-attraction-1',
        'Classical concert evening',
        'activity',
        'Innere Stadt',
        '$35 to $95',
        '$$$',
        4.6,
        'An easy way to make Vienna feel special without needing late-night energy.'
      ),
      spot(
        'vienna-attraction-2',
        'Naschmarkt stroll',
        'activity',
        'Mariahilf',
        '$0 to $30',
        '$$',
        4.5,
        'Useful for food, browsing, and a more local texture between bigger sights.'
      ),
    ],
    monuments: [
      spot(
        'vienna-monument-1',
        'St Stephens Cathedral',
        'monument',
        'Innere Stadt',
        'Free to $8',
        '$',
        4.8,
        'A central landmark that is easy to fold into almost any Vienna walking route.'
      ),
      spot(
        'vienna-monument-2',
        'Schonbrunn Palace',
        'monument',
        'Schonbrunn',
        '$22 to $32',
        '$$',
        4.8,
        'A half-day imperial anchor and one of the clearest reasons to give Vienna enough time.'
      ),
    ],
    museums: [
      spot(
        'vienna-museum-1',
        'Belvedere Museum',
        'museum',
        'Landstrasse',
        '$19',
        '$$',
        4.7,
        'A strong culture block with art and palace architecture in one place.'
      ),
      spot(
        'vienna-museum-2',
        'Leopold Museum',
        'museum',
        'MuseumsQuartier',
        '$18',
        '$$',
        4.6,
        'An excellent museum if you want something focused and very walkable with other nearby stops.'
      ),
    ],
    parks: [
      spot(
        'vienna-park-1',
        'Stadtpark',
        'park',
        'Landstrasse',
        'Free',
        '$',
        4.6,
        'A graceful pause between museum or shopping blocks.'
      ),
      spot(
        'vienna-park-2',
        'Prater',
        'park',
        'Leopoldstadt',
        'Free to $15',
        '$',
        4.6,
        'Good if you want open space, family options, or a lighter final afternoon.'
      ),
    ],
    activities: [
      spot(
        'vienna-activity-1',
        'MuseumsQuartier and design stroll',
        'activity',
        'Neubau',
        '$0 to $25',
        '$$',
        4.5,
        'A strong neighborhood block for travelers who like design, bookshops, and quieter browsing.'
      ),
      spot(
        'vienna-activity-2',
        'Kartner Strasse shopping loop',
        'activity',
        'Innere Stadt',
        '$0 to $70',
        '$$',
        4.5,
        'An easy central shopping route if you want a polished city day.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Elegant Vienna opener',
        'Old center and coffeehouse rhythm',
        segment('Start in the imperial core', 'Use the morning for the old center while the streets still feel calmer.', [
          'vienna-monument-1',
          'vienna-activity-2',
        ]),
        segment('Add one museum or market block', 'Keep the afternoon focused so the day still feels graceful.', [
          'vienna-attraction-2',
          'vienna-museum-2',
        ]),
        segment('Use the evening for music or a gentle stroll', 'Vienna rewards softer evenings rather than rushing another major attraction.', [
          'vienna-attraction-1',
        ]),
        segment('Choose a classic local dinner', 'Book something that feels tied to the citys food identity.', [
          'vienna-restaurant-1',
        ]),
        'vienna-hotel-1'
      ),
      itineraryDay(
        'Palace and gardens day',
        'Imperial architecture with breathing room',
        segment('Give the morning to Schonbrunn', 'This is the day for the big palace block.', [
          'vienna-monument-2',
        ]),
        segment('Balance it with gardens or a museum', 'Do not try to stack too much after a long palace route.', [
          'vienna-park-1',
          'vienna-museum-1',
        ]),
        segment('Keep the evening central and easy', 'A short walk or music plan closes the day well.', [
          'vienna-attraction-1',
        ]),
        segment('Let dinner stay relaxed', 'A classic dining room usually fits the Vienna mood best.', [
          'vienna-restaurant-2',
        ]),
        'vienna-hotel-1'
      ),
      itineraryDay(
        'Culture and design day',
        'Museums, shopping, and cafe time',
        segment('Open with a museum district block', 'This morning works best when you stay in one cultural cluster.', [
          'vienna-museum-2',
          'vienna-activity-1',
        ]),
        segment('Use the afternoon for style and slower browsing', 'Shopping or another cafe-heavy route keeps the pace friendly.', [
          'vienna-activity-2',
        ]),
        segment('Take one final calm city pause', 'Use a park or short city walk to keep the day from feeling too full.', [
          'vienna-park-2',
        ]),
        segment('Choose an easy dinner near your base', 'A softer plan works well if you have already done a concert night.', [
          'vienna-restaurant-2',
        ]),
        'vienna-hotel-2'
      ),
      itineraryDay(
        'Flexible Vienna finale',
        'Favorites, gifts, and final recommendations',
        segment('Return to your favorite style of Vienna morning', 'Pick coffeehouse, palace area, or museum district depending on your mood.', [
          'vienna-attraction-2',
        ]),
        segment('Keep the afternoon open', 'Use it for gifts or one final museum rather than building another heavy route.', [
          'vienna-museum-1',
        ]),
        segment('Finish with one beautiful last walk', 'Even a short final stroll feels rewarding in Vienna.', [
          'vienna-park-1',
        ]),
        segment('Make the last meal convenient', 'Stay central and let the trip end smoothly.', [
          'vienna-restaurant-1',
        ]),
        'vienna-hotel-2'
      ),
    ],
  },
  {
    id: 'prague',
    city: 'Prague',
    country: 'Czech Republic',
    region: 'Central Europe',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Prague is great for travelers who want architecture, romance, good value, and a city that feels magical without demanding a huge budget.',
    bestMonths: 'April to June and September to December',
    averageRating: 4.7,
    averageBudget: '$110 to $220 per day',
    averageNightlyHotel: '$100 to $180',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['easy', 'balanced'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days'],
    bestFor: ['culture', 'romantic', 'budget', 'nightlife'],
    highlights: ['storybook streets', 'castle views', 'old town atmosphere', 'strong value'],
    notes: ['Early mornings are best for the busiest icons', 'The center is very walkable'],
    hotels: [
      spot(
        'prague-hotel-1',
        'Mosaic House Design Hotel',
        'hotel',
        'New Town',
        '$145 per night',
        '$$',
        4.6,
        'A smart value base with style and strong walking access.'
      ),
      spot(
        'prague-hotel-2',
        'Hotel Pod Vezi',
        'hotel',
        'Lesser Town',
        '$175 per night',
        '$$$',
        4.7,
        'Excellent if you want to wake up close to the bridge and castle-side atmosphere.'
      ),
    ],
    restaurants: [
      spot(
        'prague-restaurant-1',
        'Eska',
        'restaurant',
        'Karlin',
        '$30 to $55 per person',
        '$$$',
        4.7,
        'A good signature dinner that feels more modern than old-town tourist routes.'
      ),
      spot(
        'prague-restaurant-2',
        'Lokal Dlouha',
        'restaurant',
        'Old Town',
        '$15 to $28 per person',
        '$$',
        4.6,
        'One of the easiest ways to try local classics without overpaying.'
      ),
    ],
    attractions: [
      spot(
        'prague-attraction-1',
        'Charles Bridge sunrise walk',
        'activity',
        'Old Town to Lesser Town',
        'Free',
        '$',
        4.8,
        'The best way to experience the citys signature postcard without the daytime crowds.'
      ),
      spot(
        'prague-attraction-2',
        'Vltava river evening cruise',
        'activity',
        'Central Prague',
        '$18 to $30',
        '$$',
        4.5,
        'A relaxed evening option if you want views without more walking.'
      ),
    ],
    monuments: [
      spot(
        'prague-monument-1',
        'Prague Castle complex',
        'monument',
        'Hradcany',
        '$18 to $28',
        '$$',
        4.8,
        'A high-value half-day with architecture, views, and history all at once.'
      ),
      spot(
        'prague-monument-2',
        'Old Town Square and Astronomical Clock',
        'monument',
        'Old Town',
        'Free',
        '$',
        4.7,
        'Classic first-day Prague and easy to combine with surrounding lanes.'
      ),
    ],
    museums: [
      spot(
        'prague-museum-1',
        'Jewish Museum in Prague',
        'museum',
        'Josefov',
        '$20',
        '$$',
        4.7,
        'One of the most meaningful museum routes in the city.'
      ),
      spot(
        'prague-museum-2',
        'DOX Centre for Contemporary Art',
        'museum',
        'Holesovice',
        '$14',
        '$$',
        4.5,
        'Best for travelers who want a modern contrast to the historic core.'
      ),
    ],
    parks: [
      spot(
        'prague-park-1',
        'Letna Park',
        'park',
        'Letna',
        'Free',
        '$',
        4.7,
        'A strong city-view and reset stop that pairs well with an easy afternoon.'
      ),
      spot(
        'prague-park-2',
        'Petrin Hill',
        'park',
        'Lesser Town',
        'Free to $8',
        '$',
        4.6,
        'Ideal when you want a more romantic, slower half-day.'
      ),
    ],
    activities: [
      spot(
        'prague-activity-1',
        'Cafe and bookshop loop in Mala Strana',
        'activity',
        'Lesser Town',
        '$8 to $25',
        '$',
        4.5,
        'A softer neighborhood block for travelers who do not want every hour packed with landmarks.'
      ),
      spot(
        'prague-activity-2',
        'Cocktail bars and hidden courtyards',
        'activity',
        'Old Town edge',
        '$15 to $35',
        '$$',
        4.5,
        'A flexible nightlife option that still feels polished.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Postcard Prague opener',
        'Bridge, old town, and first views',
        segment('Start before the crowds', 'An early bridge walk gives Prague its full effect immediately.', [
          'prague-attraction-1',
        ]),
        segment('Continue into the old city', 'Use the afternoon in the historic core without leaving the center too early.', [
          'prague-monument-2',
        ]),
        segment('Add an easy city-view block', 'A park or short river route keeps the evening scenic.', [
          'prague-park-1',
          'prague-attraction-2',
        ]),
        segment('Book an approachable local dinner', 'Keep the first meal rewarding but not overly formal.', [
          'prague-restaurant-2',
        ]),
        'prague-hotel-2'
      ),
      itineraryDay(
        'Castle and culture day',
        'Major history with room to breathe',
        segment('Give the morning to the castle district', 'This is the clear anchor for the day.', [
          'prague-monument-1',
        ]),
        segment('Use the afternoon for a meaningful museum or slower side streets', 'Do not add too many extra tickets after the castle.', [
          'prague-museum-1',
          'prague-activity-1',
        ]),
        segment('Keep the evening romantic or low-key', 'A short river or courtyard evening is enough.', [
          'prague-attraction-2',
        ]),
        segment('Choose a stronger signature dinner', 'A modern restaurant gives good contrast to the old-world sights.', [
          'prague-restaurant-1',
        ]),
        'prague-hotel-1'
      ),
      itineraryDay(
        'Neighborhoods and viewpoints day',
        'Slower Prague with local texture',
        segment('Start with a hill or garden route', 'This helps break up the city-center intensity.', [
          'prague-park-2',
        ]),
        segment('Move into a quieter museum or district', 'Use the middle of the day for something more local or contemporary.', [
          'prague-museum-2',
        ]),
        segment('Use the evening for cocktails or courtyards', 'Good if you want a little nightlife without going too hard.', [
          'prague-activity-2',
        ]),
        segment('Let dinner stay simple', 'A lighter dinner can work well after a more open day.', [
          'prague-restaurant-2',
        ]),
        'prague-hotel-1'
      ),
      itineraryDay(
        'Flexible Prague finale',
        'Favorites, shopping, and final recommendations',
        segment('Return to your favorite part of town', 'The last morning is best spent on the mood of Prague you liked most.', [
          'prague-attraction-1',
          'prague-activity-1',
        ]),
        segment('Leave room for gifts and one last scenic block', 'Do not overfill the end of a short city break.', [
          'prague-park-1',
        ]),
        segment('Choose one final city view', 'A short viewpoint or river route is enough to close the trip well.', [
          'prague-attraction-2',
        ]),
        segment('Keep the final meal easy and central', 'Convenience is worth a lot on the last day.', [
          'prague-restaurant-1',
        ]),
        'prague-hotel-2'
      ),
    ],
  },
  {
    id: 'amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    region: 'Western Europe',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Amsterdam is a very easy city for canal walks, museums, design neighborhoods, and a trip that feels stylish without becoming too formal.',
    bestMonths: 'April to September',
    averageRating: 4.7,
    averageBudget: '$180 to $320 per day',
    averageNightlyHotel: '$180 to $300',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['easy', 'balanced'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days'],
    bestFor: ['shopping', 'foodie', 'nightlife', 'family', 'romantic'],
    highlights: ['canal scenery', 'museum district', 'bike-friendly neighborhoods', 'design shopping'],
    notes: ['Reserve major museums early', 'Hotels can sell out fast on weekends'],
    hotels: [
      spot(
        'amsterdam-hotel-1',
        'The Hoxton Amsterdam',
        'hotel',
        'Canal Belt',
        '$285 per night',
        '$$$',
        4.7,
        'Great for travelers who want classic canal scenery with polished hotel energy.'
      ),
      spot(
        'amsterdam-hotel-2',
        'Hotel V Fizeaustraat',
        'hotel',
        'East Amsterdam',
        '$195 per night',
        '$$',
        4.6,
        'A good modern option if you want value and are fine using transit for a few hops.'
      ),
    ],
    restaurants: [
      spot(
        'amsterdam-restaurant-1',
        'De Kas',
        'restaurant',
        'Park Frankendael',
        '$55 to $85 per person',
        '$$$',
        4.7,
        'A special-occasion dinner that feels distinctly Dutch and design-conscious.'
      ),
      spot(
        'amsterdam-restaurant-2',
        'Foodhallen',
        'restaurant',
        'Oud-West',
        '$18 to $35 per person',
        '$$',
        4.6,
        'Easy for variety, flexible pacing, and lower-pressure meal planning.'
      ),
    ],
    attractions: [
      spot(
        'amsterdam-attraction-1',
        'Canal cruise',
        'activity',
        'Canal Belt',
        '$18 to $28',
        '$$',
        4.6,
        'A near-perfect first-day overview that also reduces walking.'
      ),
      spot(
        'amsterdam-attraction-2',
        'Jordaan wandering route',
        'activity',
        'Jordaan',
        'Free to $20',
        '$',
        4.7,
        'Ideal if your favorite city memories tend to come from side streets rather than queue-heavy stops.'
      ),
    ],
    monuments: [
      spot(
        'amsterdam-monument-1',
        'Dam Square and Royal Palace area',
        'monument',
        'City center',
        'Free to $15',
        '$',
        4.5,
        'A practical orientation block for the very center of the city.'
      ),
      spot(
        'amsterdam-monument-2',
        'Westerkerk and canal belt facades',
        'monument',
        'Jordaan',
        'Free',
        '$',
        4.6,
        'More subtle than a giant landmark, but very strong for atmosphere.'
      ),
    ],
    museums: [
      spot(
        'amsterdam-museum-1',
        'Rijksmuseum',
        'museum',
        'Museumplein',
        '$24',
        '$$',
        4.8,
        'The major art and history anchor for the city.'
      ),
      spot(
        'amsterdam-museum-2',
        'Van Gogh Museum',
        'museum',
        'Museumplein',
        '$24',
        '$$',
        4.8,
        'A top-tier museum that works best with a timed entry and a focused visit.'
      ),
    ],
    parks: [
      spot(
        'amsterdam-park-1',
        'Vondelpark',
        'park',
        'Museum Quarter',
        'Free',
        '$',
        4.7,
        'An easy green pause between museum and shopping plans.'
      ),
      spot(
        'amsterdam-park-2',
        'Amsterdamse Bos',
        'park',
        'South edge',
        'Free to $15',
        '$',
        4.6,
        'Best if you want to add more space and nature to a longer city stay.'
      ),
    ],
    activities: [
      spot(
        'amsterdam-activity-1',
        'Nine Streets shopping loop',
        'activity',
        'Canal Belt',
        '$0 to $80',
        '$$',
        4.6,
        'One of the strongest city-center shopping and browsing areas.'
      ),
      spot(
        'amsterdam-activity-2',
        'Bike and brunch route through De Pijp',
        'activity',
        'De Pijp',
        '$15 to $35',
        '$$',
        4.5,
        'A great match if you want the city to feel more local than touristy.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Canal Amsterdam opener',
        'Water, neighborhoods, and easy pacing',
        segment('Start with the city at canal speed', 'A cruise or waterside route gives a very efficient introduction.', [
          'amsterdam-attraction-1',
        ]),
        segment('Move into central neighborhoods', 'Keep the afternoon built around canals, shopping, and cafe stops.', [
          'amsterdam-activity-1',
          'amsterdam-monument-2',
        ]),
        segment('Let the evening stay atmospheric', 'A short Jordaan wander is a better first-night move than stacking too many tickets.', [
          'amsterdam-attraction-2',
        ]),
        segment('Choose an easy dinner with variety', 'This is a great first night for a casual but satisfying food hall or multi-stop meal.', [
          'amsterdam-restaurant-2',
        ]),
        'amsterdam-hotel-1'
      ),
      itineraryDay(
        'Museum district day',
        'Art, parks, and central dinner',
        segment('Use the morning for one major museum', 'Pick one museum and protect your energy for it.', [
          'amsterdam-museum-1',
          'amsterdam-museum-2',
        ]),
        segment('Take a park break and local lunch', 'A green reset keeps the day enjoyable rather than relentless.', [
          'amsterdam-park-1',
        ]),
        segment('Choose a polished evening block', 'Good for a nicer dinner or canal-side drinks.', [
          'amsterdam-monument-1',
        ]),
        segment('Book the special dinner tonight if food matters most', 'This is a good night for the stronger reservation.', [
          'amsterdam-restaurant-1',
        ]),
        'amsterdam-hotel-1'
      ),
      itineraryDay(
        'Local Amsterdam day',
        'De Pijp, design, and a slower rhythm',
        segment('Start with a neighborhood-led morning', 'This day works best when it feels less like a checklist.', [
          'amsterdam-activity-2',
        ]),
        segment('Use the afternoon for parks or one more museum', 'Keep the route open enough for spontaneous stops.', [
          'amsterdam-park-2',
        ]),
        segment('Finish with canals or nightlife', 'Go as social or as quiet as your energy allows.', [
          'amsterdam-attraction-2',
        ]),
        segment('Keep dinner easy and nearby', 'Choose a meal that supports the mood instead of forcing a detour.', [
          'amsterdam-restaurant-2',
        ]),
        'amsterdam-hotel-2'
      ),
      itineraryDay(
        'Flexible finale',
        'Favorites, gifts, and final recommendations',
        segment('Repeat your favorite city mood', 'Use the last morning for the route that made Amsterdam click for you.', [
          'amsterdam-activity-1',
          'amsterdam-attraction-2',
        ]),
        segment('Keep the afternoon realistic', 'Do not overbook the end of a canal city break.', [
          'amsterdam-park-1',
        ]),
        segment('Take one more view or waterside walk', 'A short final evening is usually enough here.', [
          'amsterdam-attraction-1',
        ]),
        segment('Choose a convenient closing meal', 'Stay close to your route and finish cleanly.', [
          'amsterdam-restaurant-1',
        ]),
        'amsterdam-hotel-2'
      ),
    ],
  },
  {
    id: 'budapest',
    city: 'Budapest',
    country: 'Hungary',
    region: 'Central Europe',
    image: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Budapest is strong for value, thermal baths, river views, architecture, and evenings that can be either romantic or lively without much effort.',
    bestMonths: 'April to June and September to December',
    averageRating: 4.7,
    averageBudget: '$100 to $220 per day',
    averageNightlyHotel: '$95 to $190',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['easy', 'balanced'],
    tripLengths: ['2days', '3days', '4days', '5days', '6days', '7days'],
    bestFor: ['budget', 'nightlife', 'culture', 'romantic'],
    highlights: ['thermal baths', 'parliament views', 'ruin bars', 'danube sunsets'],
    notes: ['Split your plan between Buda and Pest', 'Book bath tickets during busy weekends'],
    hotels: [
      spot(
        'budapest-hotel-1',
        'Hotel Rum Budapest',
        'hotel',
        'Belvaros',
        '$155 per night',
        '$$',
        4.6,
        'A very central, design-forward base that makes it easy to move between both sides of the city.'
      ),
      spot(
        'budapest-hotel-2',
        'Monastery Boutique Hotel',
        'hotel',
        'Castle District',
        '$185 per night',
        '$$$',
        4.7,
        'Great if you want quieter evenings and dramatic architecture close by.'
      ),
    ],
    restaurants: [
      spot(
        'budapest-restaurant-1',
        'Menza',
        'restaurant',
        'District VI',
        '$18 to $35 per person',
        '$$',
        4.6,
        'A reliable Budapest classic that fits many itineraries without much friction.'
      ),
      spot(
        'budapest-restaurant-2',
        'Stand25 Bisztro',
        'restaurant',
        'Belvaros',
        '$25 to $45 per person',
        '$$',
        4.7,
        'A stronger local food pick when you want one more curated meal.'
      ),
    ],
    attractions: [
      spot(
        'budapest-attraction-1',
        'Danube evening cruise',
        'activity',
        'Danube river',
        '$16 to $30',
        '$$',
        4.7,
        'A high-value way to see the city at its most dramatic.'
      ),
      spot(
        'budapest-attraction-2',
        'Ruin bar evening in the Jewish Quarter',
        'activity',
        'District VII',
        '$12 to $28',
        '$$',
        4.6,
        'A signature Budapest nightlife experience without needing an all-night plan.'
      ),
    ],
    monuments: [
      spot(
        'budapest-monument-1',
        'Hungarian Parliament area',
        'monument',
        'District V',
        '$0 to $30',
        '$$',
        4.8,
        'The citys most iconic riverside monument and a natural first-day anchor.'
      ),
      spot(
        'budapest-monument-2',
        'Fishermans Bastion',
        'monument',
        'Castle District',
        '$0 to $12',
        '$',
        4.8,
        'A strong viewpoint and one of the easiest ways to make Budapest feel romantic.'
      ),
    ],
    museums: [
      spot(
        'budapest-museum-1',
        'House of Terror Museum',
        'museum',
        'Andrassy Avenue',
        '$15',
        '$$',
        4.5,
        'A meaningful history stop if you want deeper context for the city.'
      ),
      spot(
        'budapest-museum-2',
        'Hungarian National Gallery',
        'museum',
        'Castle District',
        '$14',
        '$$',
        4.5,
        'Useful if you want to pair culture with castle views in one part of the city.'
      ),
    ],
    parks: [
      spot(
        'budapest-park-1',
        'Margaret Island',
        'park',
        'Danube island',
        'Free to $8',
        '$',
        4.7,
        'A very good mid-trip reset with river air and low planning pressure.'
      ),
      spot(
        'budapest-park-2',
        'City Park',
        'park',
        'District XIV',
        'Free',
        '$',
        4.6,
        'Great for baths, museum pairings, and an easier family-friendly afternoon.'
      ),
    ],
    activities: [
      spot(
        'budapest-activity-1',
        'Szechenyi thermal bath session',
        'activity',
        'City Park',
        '$28 to $42',
        '$$',
        4.7,
        'One of the citys most distinct experiences and a smart way to pace the trip.'
      ),
      spot(
        'budapest-activity-2',
        'Andrassy Avenue cafe and shopping walk',
        'activity',
        'District VI',
        '$10 to $40',
        '$$',
        4.5,
        'An easy route for style, coffee, and some slower daytime browsing.'
      ),
    ],
    suggestedItinerary: [
      itineraryDay(
        'Classic Budapest opener',
        'River icons and a strong first evening',
        segment('Start with the Danube side of the city', 'Use the morning for the citys most photogenic and central monument zone.', [
          'budapest-monument-1',
        ]),
        segment('Cross toward Buda for views', 'Keep the day scenic without too much extra transit.', [
          'budapest-monument-2',
        ]),
        segment('Use the evening for the river', 'Budapest is at its best after dark around the water.', [
          'budapest-attraction-1',
        ]),
        segment('Choose a strong first dinner', 'Make the opening night feel local but not overly formal.', [
          'budapest-restaurant-2',
        ]),
        'budapest-hotel-1'
      ),
      itineraryDay(
        'Baths and city life day',
        'Relaxation with neighborhood energy',
        segment('Start with a signature Budapest experience', 'Thermal baths are a smart pacing tool and a real city differentiator.', [
          'budapest-activity-1',
        ]),
        segment('Keep the afternoon lighter', 'Add a park or avenue stroll instead of another heavy ticket.', [
          'budapest-park-2',
          'budapest-activity-2',
        ]),
        segment('Decide whether you want romance or nightlife', 'This is the night for a river view or a ruin-bar block.', [
          'budapest-attraction-2',
        ]),
        segment('Keep dinner in the same area', 'Let the evening flow instead of building extra logistics.', [
          'budapest-restaurant-1',
        ]),
        'budapest-hotel-1'
      ),
      itineraryDay(
        'Culture and slower pacing day',
        'Museums, parks, and final views',
        segment('Use the morning for one museum', 'Choose the type of history or art that best fits your interests.', [
          'budapest-museum-1',
          'budapest-museum-2',
        ]),
        segment('Take a park or island reset', 'A softer middle of the day keeps Budapest enjoyable and balanced.', [
          'budapest-park-1',
        ]),
        segment('Finish with one more beautiful city block', 'A short final skyline or neighborhood route works well here.', [
          'budapest-attraction-1',
        ]),
        segment('Book your easier dinner tonight', 'A central, reliable meal often feels best after a more cultural day.', [
          'budapest-restaurant-1',
        ]),
        'budapest-hotel-2'
      ),
      itineraryDay(
        'Flexible Budapest finale',
        'Favorites, shopping, and final recommendations',
        segment('Revisit the side of Budapest you enjoyed most', 'Choose between baths, river views, castle routes, or cafes.', [
          'budapest-activity-2',
          'budapest-monument-2',
        ]),
        segment('Keep the afternoon open for gifts or one last stop', 'A slower ending usually serves this city well.', [
          'budapest-park-1',
        ]),
        segment('Use the evening for one final memorable look at the city', 'Even a short final walk feels rewarding here.', [
          'budapest-attraction-1',
        ]),
        segment('Pick a convenient closing meal', 'Stay central and let the trip finish smoothly.', [
          'budapest-restaurant-2',
        ]),
        'budapest-hotel-2'
      ),
    ],
  },
];

type CompactPlaceSeed = {
  name: string;
  neighborhood: string;
  estimatedCost: string;
  priceGuide: string;
  rating: number;
  why: string;
};

type CompactCitySeed = {
  id: string;
  city: string;
  country: string;
  region: string;
  image: string;
  summary: string;
  bestMonths: string;
  averageRating: number;
  averageBudget: string;
  averageNightlyHotel: string;
  budgetFits: TravelBudgetId[];
  paceFits: TravelPaceId[];
  tripLengths?: TripLengthId[];
  bestFor: TravelInterestId[];
  highlights: string[];
  notes: string[];
  hotels: [CompactPlaceSeed, CompactPlaceSeed];
  restaurants: [CompactPlaceSeed, CompactPlaceSeed];
  attractions: [CompactPlaceSeed, CompactPlaceSeed];
  monuments: [CompactPlaceSeed, CompactPlaceSeed];
  museums: [CompactPlaceSeed, CompactPlaceSeed];
  parks: [CompactPlaceSeed, CompactPlaceSeed];
  activities: [CompactPlaceSeed, CompactPlaceSeed];
};

function compactSpot(cityId: string, category: CitySpotCategory, index: number, seed: CompactPlaceSeed) {
  return spot(
    `${cityId}-${category}-${index + 1}`,
    seed.name,
    category,
    seed.neighborhood,
    seed.estimatedCost,
    seed.priceGuide,
    seed.rating,
    seed.why
  );
}

function createCompactCityProfile(seed: CompactCitySeed): CityProfile {
  const hotels = seed.hotels.map((item, index) => compactSpot(seed.id, 'hotel', index, item));
  const restaurants = seed.restaurants.map((item, index) => compactSpot(seed.id, 'restaurant', index, item));
  const attractions = seed.attractions.map((item, index) => compactSpot(seed.id, 'activity', index + 20, item));
  const monuments = seed.monuments.map((item, index) => compactSpot(seed.id, 'monument', index, item));
  const museums = seed.museums.map((item, index) => compactSpot(seed.id, 'museum', index, item));
  const parks = seed.parks.map((item, index) => compactSpot(seed.id, 'park', index, item));
  const activities = seed.activities.map((item, index) => compactSpot(seed.id, 'activity', index, item));

  return {
    id: seed.id,
    city: seed.city,
    country: seed.country,
    region: seed.region,
    image: seed.image,
    summary: seed.summary,
    bestMonths: seed.bestMonths,
    averageRating: seed.averageRating,
    averageBudget: seed.averageBudget,
    averageNightlyHotel: seed.averageNightlyHotel,
    budgetFits: seed.budgetFits,
    paceFits: seed.paceFits,
    tripLengths: seed.tripLengths ?? ['2days', '3days', '4days', '5days', '6days', '7days'],
    bestFor: seed.bestFor,
    highlights: seed.highlights,
    notes: seed.notes,
    hotels,
    restaurants,
    attractions,
    monuments,
    museums,
    parks,
    activities,
    suggestedItinerary: [
      itineraryDay(
        `${seed.city} first highlights`,
        'Icons, food, and orientation',
        segment('Start with a major landmark block', `Use the first morning to anchor the trip around ${monuments[0].name}.`, [
          monuments[0].id,
        ]),
        segment('Add one strong city overview', `Build the afternoon around ${attractions[0].name} so the city feels legible early.`, [
          attractions[0].id,
        ]),
        segment('Keep the evening scenic and easy', `Choose a softer evening route around ${activities[0].name}.`, [
          activities[0].id,
        ]),
        segment('Reserve one confident first meal', `Book or plan around ${restaurants[0].name} to start the trip well.`, [
          restaurants[0].id,
        ]),
        hotels[0].id
      ),
      itineraryDay(
        `${seed.city} culture day`,
        'Museums and neighborhood rhythm',
        segment('Give the morning to one major cultural stop', `A focused visit to ${museums[0].name} works better than stacking too many tickets.`, [
          museums[0].id,
        ]),
        segment('Use the afternoon to explore the neighborhood around it', `Pair the cultural block with time around ${parks[0].name} or nearby streets.`, [
          parks[0].id,
        ]),
        segment('Shift into a more local evening', `Let ${activities[1].name} or another neighborhood route set the evening mood.`, [
          activities[1].id,
        ]),
        segment('Keep dinner local to the route', `Use ${restaurants[1].name} as the easy, lower-friction dinner plan.`, [
          restaurants[1].id,
        ]),
        hotels[0].id
      ),
      itineraryDay(
        `${seed.city} deeper discovery`,
        'Hidden gems, design, and local life',
        segment('Use the morning for a second signature sight', `This is the right time for ${monuments[1].name} or another high-value landmark.`, [
          monuments[1].id,
        ]),
        segment('Leave the afternoon open enough for spontaneous stops', `A route around ${attractions[1].name} gives you discovery without overscheduling.`, [
          attractions[1].id,
        ]),
        segment('Let the evening match your trip style', `Choose between nightlife, markets, or relaxed views around ${activities[1].name}.`, [
          activities[1].id,
        ]),
        segment('Make the meal feel memorable but practical', `Close the day with a meal near ${restaurants[1].name}.`, [
          restaurants[1].id,
        ]),
        hotels[1].id
      ),
      itineraryDay(
        `${seed.city} final recommendations`,
        'Relaxed pacing and best final picks',
        segment('Start in open air or a slower district', `Use ${parks[1].name} or a quieter neighborhood loop to keep the final day light.`, [
          parks[1].id,
        ]),
        segment('Revisit the city mood you liked most', `This is a good time to return to the area around ${attractions[0].name} or a favorite cafe district.`, [
          attractions[0].id,
        ]),
        segment('Leave the last evening flexible', `A final block around ${activities[0].name} keeps the trip memorable without adding pressure.`, [
          activities[0].id,
        ]),
        segment('Finish with your easiest polished meal', `End around ${restaurants[0].name} or another nearby favorite.`, [
          restaurants[0].id,
        ]),
        hotels[1].id
      ),
    ],
  };
}

const EXPANDED_CITY_DATA: CityProfile[] = [
  createCompactCityProfile({
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Tokyo is ideal for travelers who want precise city energy, standout food districts, shrines, design neighborhoods, and a polished mix of tradition and futurism.',
    bestMonths: 'March to May and October to November',
    averageRating: 4.8,
    averageBudget: '$180 to $340 per day',
    averageNightlyHotel: '$160 to $290',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['balanced', 'packed'],
    bestFor: ['foodie', 'shopping', 'culture', 'nightlife'],
    highlights: ['temples and shrines', 'district-based food scenes', 'design shopping', 'late-night city energy'],
    notes: ['Transit is excellent', 'Neighborhood choice shapes the mood of the trip'],
    hotels: [
      {
        name: 'Shinjuku central stay options',
        neighborhood: 'Shinjuku',
        estimatedCost: '$180 to $290 per night',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'A strong base for first-time visitors who want transport links, evening energy, and easy city reach.',
      },
      {
        name: 'Asakusa boutique stay options',
        neighborhood: 'Asakusa',
        estimatedCost: '$150 to $230 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A softer home base if you want older Tokyo character, riverside walks, and easier mornings.',
      },
    ],
    restaurants: [
      {
        name: 'Shibuya food crawl',
        neighborhood: 'Shibuya',
        estimatedCost: '$20 to $45 per person',
        priceGuide: '$$',
        rating: 4.7,
        why: 'A flexible dinner zone for ramen, izakaya stops, and people-watching without rigid reservations.',
      },
      {
        name: 'Tsukiji market lunch route',
        neighborhood: 'Tsukiji',
        estimatedCost: '$18 to $40 per person',
        priceGuide: '$$',
        rating: 4.7,
        why: 'An easy way to prioritize seafood, local specialties, and short-form tasting rather than one long meal.',
      },
    ],
    attractions: [
      {
        name: 'Tokyo Skytree observation deck',
        neighborhood: 'Sumida',
        estimatedCost: '$18 to $30',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A strong overview activity that helps the city feel more navigable early in the trip.',
      },
      {
        name: 'Shibuya Crossing and Hachiko loop',
        neighborhood: 'Shibuya',
        estimatedCost: 'Free to $10',
        priceGuide: '$',
        rating: 4.7,
        why: 'A fast way to tap into Tokyos signature urban energy and pair it with shopping or cafe stops.',
      },
    ],
    monuments: [
      {
        name: 'Sensō-ji Temple',
        neighborhood: 'Asakusa',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'A clear first-stop landmark that grounds the trip in traditional Tokyo atmosphere.',
      },
      {
        name: 'Meiji Jingu Shrine',
        neighborhood: 'Harajuku',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'A calm, high-value landmark that pairs especially well with nearby design districts.',
      },
    ],
    museums: [
      {
        name: 'Tokyo National Museum',
        neighborhood: 'Ueno',
        estimatedCost: '$7 to $12',
        priceGuide: '$',
        rating: 4.7,
        why: 'A rewarding cultural anchor if you want deeper historical context without overcomplicating the day.',
      },
      {
        name: 'teamLab Planets',
        neighborhood: 'Toyosu',
        estimatedCost: '$24 to $32',
        priceGuide: '$$',
        rating: 4.6,
        why: 'Best for travelers who want one visually immersive modern-art block during the trip.',
      },
    ],
    parks: [
      {
        name: 'Ueno Park',
        neighborhood: 'Ueno',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'Useful for slowing the pace between museum visits and city-center transit hops.',
      },
      {
        name: 'Shinjuku Gyoen',
        neighborhood: 'Shinjuku',
        estimatedCost: '$4 to $8',
        priceGuide: '$',
        rating: 4.8,
        why: 'A polished reset when Tokyo starts feeling too dense or too fast.',
      },
    ],
    activities: [
      {
        name: 'Golden Gai evening wander',
        neighborhood: 'Shinjuku',
        estimatedCost: '$12 to $30',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Great if you want atmosphere, small bars, and a memorable nighttime neighborhood route.',
      },
      {
        name: 'Yanaka neighborhood walk',
        neighborhood: 'Yanaka',
        estimatedCost: 'Free to $12',
        priceGuide: '$',
        rating: 4.6,
        why: 'A softer side of Tokyo with independent shops and a slower local rhythm.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'new-york',
    city: 'New York',
    country: 'United States',
    region: 'North America',
    image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1400&q=80',
    summary:
      'New York works best when you want iconic skyline moments, neighborhood food, museums, and a trip that can move from polished to energetic fast.',
    bestMonths: 'April to June and September to November',
    averageRating: 4.8,
    averageBudget: '$220 to $420 per day',
    averageNightlyHotel: '$220 to $360',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['balanced', 'packed'],
    bestFor: ['nightlife', 'foodie', 'shopping', 'culture'],
    highlights: ['skyline viewpoints', 'museum heavyweights', 'neighborhood dining', 'broadway district energy'],
    notes: ['Plan neighborhoods by day', 'Transit makes cross-city routes easier than frequent taxis'],
    hotels: [
      {
        name: 'Midtown central stay options',
        neighborhood: 'Midtown Manhattan',
        estimatedCost: '$240 to $360 per night',
        priceGuide: '$$$',
        rating: 4.6,
        why: 'A practical base for first trips if you want major landmarks, subway access, and walkable evenings.',
      },
      {
        name: 'Lower Manhattan design stays',
        neighborhood: 'Tribeca and Financial District',
        estimatedCost: '$220 to $340 per night',
        priceGuide: '$$$',
        rating: 4.6,
        why: 'Good for travelers who want a calmer hotel rhythm with stronger food neighborhoods nearby.',
      },
    ],
    restaurants: [
      {
        name: 'West Village dinner circuit',
        neighborhood: 'West Village',
        estimatedCost: '$30 to $70 per person',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'A high-confidence evening area for intimate dinners, cocktails, and polished neighborhood energy.',
      },
      {
        name: 'Chelsea Market tasting route',
        neighborhood: 'Chelsea',
        estimatedCost: '$18 to $35 per person',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A flexible plan when you want variety without a hard reservation schedule.',
      },
    ],
    attractions: [
      {
        name: 'Top of the Rock',
        neighborhood: 'Midtown Manhattan',
        estimatedCost: '$35 to $45',
        priceGuide: '$$',
        rating: 4.7,
        why: 'One of the cleanest skyline-view choices if you want a first-day overview.',
      },
      {
        name: 'Brooklyn Bridge walk',
        neighborhood: 'Lower Manhattan and DUMBO',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'Best when you want a memorable city-scale walk that can lead into food or waterfront time.',
      },
    ],
    monuments: [
      {
        name: 'Statue of Liberty and Battery Park',
        neighborhood: 'Lower Manhattan',
        estimatedCost: 'Free to $25',
        priceGuide: '$$',
        rating: 4.7,
        why: 'A classic first-time landmark route that still feels worth it if timed well.',
      },
      {
        name: 'Grand Central Terminal',
        neighborhood: 'Midtown Manhattan',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'A surprisingly strong architectural stop and practical anchor for Midtown routing.',
      },
    ],
    museums: [
      {
        name: 'The Metropolitan Museum of Art',
        neighborhood: 'Upper East Side',
        estimatedCost: '$30',
        priceGuide: '$$',
        rating: 4.8,
        why: 'A major museum day that rewards a focused route instead of trying to cover everything.',
      },
      {
        name: 'Museum of Modern Art',
        neighborhood: 'Midtown Manhattan',
        estimatedCost: '$30',
        priceGuide: '$$',
        rating: 4.7,
        why: 'Strong if you want one clean modern-art block without leaving the city center.',
      },
    ],
    parks: [
      {
        name: 'Central Park',
        neighborhood: 'Upper Manhattan',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'The best reset when the trip needs open space, calmer pacing, or a lighter midday block.',
      },
      {
        name: 'Bryant Park',
        neighborhood: 'Midtown Manhattan',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A practical pause between museums, shopping, and Midtown evening plans.',
      },
    ],
    activities: [
      {
        name: 'High Line stroll',
        neighborhood: 'Chelsea',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'A low-stress way to blend city views, design stops, and neighborhood wandering.',
      },
      {
        name: 'Broadway district evening',
        neighborhood: 'Theater District',
        estimatedCost: '$20 to $120',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A strong evening choice when you want New York energy without overthinking the route.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    region: 'Southern Europe',
    image: 'https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Lisbon is a strong choice for hilltop views, tram rides, food neighborhoods, and a city break that feels warm, walkable, and atmospheric.',
    bestMonths: 'March to June and September to October',
    averageRating: 4.7,
    averageBudget: '$130 to $240 per day',
    averageNightlyHotel: '$120 to $210',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['foodie', 'romantic', 'budget', 'culture'],
    highlights: ['miradouros', 'tram routes', 'fado evenings', 'belem landmarks'],
    notes: ['Expect hills', 'Neighborhood choice changes the tempo of the trip'],
    hotels: [
      {
        name: 'Baixa and Chiado stay options',
        neighborhood: 'Baixa and Chiado',
        estimatedCost: '$140 to $210 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A practical base for first trips because it keeps sightseeing, food, and tram connections simple.',
      },
      {
        name: 'Alfama boutique stay options',
        neighborhood: 'Alfama',
        estimatedCost: '$120 to $190 per night',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Best if you want older Lisbon atmosphere, scenic mornings, and a more romantic local mood.',
      },
    ],
    restaurants: [
      {
        name: 'Time Out Market tasting route',
        neighborhood: 'Cais do Sodré',
        estimatedCost: '$18 to $35 per person',
        priceGuide: '$$',
        rating: 4.5,
        why: 'A flexible way to sample Portuguese flavors without building the entire day around one reservation.',
      },
      {
        name: 'Alfama fado dinner circuit',
        neighborhood: 'Alfama',
        estimatedCost: '$25 to $55 per person',
        priceGuide: '$$',
        rating: 4.6,
        why: 'Strong when you want atmosphere, local music, and one memorable Lisbon evening.',
      },
    ],
    attractions: [
      {
        name: 'Tram 28 scenic ride',
        neighborhood: 'Historic center',
        estimatedCost: '$4 to $10',
        priceGuide: '$',
        rating: 4.5,
        why: 'A practical and photogenic introduction that helps connect major districts early.',
      },
      {
        name: 'Miradouro da Senhora do Monte',
        neighborhood: 'Graça',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'One of the highest-value city viewpoints for sunset or a lighter final block.',
      },
    ],
    monuments: [
      {
        name: 'Belém Tower',
        neighborhood: 'Belém',
        estimatedCost: '$8 to $12',
        priceGuide: '$',
        rating: 4.6,
        why: 'A signature Lisbon landmark that works well when paired with the wider Belém district.',
      },
      {
        name: 'Jerónimos Monastery',
        neighborhood: 'Belém',
        estimatedCost: '$12 to $18',
        priceGuide: '$$',
        rating: 4.7,
        why: 'A high-impact heritage stop that adds historical weight without overcomplicating the route.',
      },
    ],
    museums: [
      {
        name: 'MAAT',
        neighborhood: 'Belém',
        estimatedCost: '$10 to $15',
        priceGuide: '$',
        rating: 4.5,
        why: 'Useful when you want a modern architecture-and-design stop instead of another older monument.',
      },
      {
        name: 'Calouste Gulbenkian Museum',
        neighborhood: 'Avenidas Novas',
        estimatedCost: '$12 to $16',
        priceGuide: '$',
        rating: 4.7,
        why: 'A strong quieter museum choice if you want one calmer cultural afternoon.',
      },
    ],
    parks: [
      {
        name: 'Eduardo VII Park',
        neighborhood: 'Marquês de Pombal',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'A simple way to break up the hills and give the trip a wider city view.',
      },
      {
        name: 'Jardim do Torel',
        neighborhood: 'Santo António',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'A softer garden stop when you want local calm rather than another big landmark.',
      },
    ],
    activities: [
      {
        name: 'LX Factory browse',
        neighborhood: 'Alcântara',
        estimatedCost: 'Free to $20',
        priceGuide: '$',
        rating: 4.5,
        why: 'Good for design shops, cafes, and a less formal creative district block.',
      },
      {
        name: 'Alfama lane and terrace walk',
        neighborhood: 'Alfama',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'One of the most natural ways to let the city feel lived-in rather than checklist-heavy.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Bangkok suits travelers who want temples, food markets, rooftop energy, river routes, and a city that can feel both intense and rewarding in the same day.',
    bestMonths: 'November to February',
    averageRating: 4.7,
    averageBudget: '$90 to $210 per day',
    averageNightlyHotel: '$80 to $170',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['balanced', 'packed'],
    bestFor: ['foodie', 'adventure', 'nightlife', 'budget'],
    highlights: ['temples', 'rooftop evenings', 'market culture', 'river routes'],
    notes: ['Heat changes pacing', 'Use riverside and transit routes to reduce friction'],
    hotels: [
      {
        name: 'Riverside stay options',
        neighborhood: 'Chao Phraya riverside',
        estimatedCost: '$95 to $170 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A good match for scenic evenings, easier boat access, and a more polished city rhythm.',
      },
      {
        name: 'Sukhumvit design stay options',
        neighborhood: 'Sukhumvit',
        estimatedCost: '$80 to $150 per night',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Best if nightlife, dining variety, and transit convenience matter most.',
      },
    ],
    restaurants: [
      {
        name: 'Yaowarat street-food route',
        neighborhood: 'Chinatown',
        estimatedCost: '$10 to $28 per person',
        priceGuide: '$',
        rating: 4.8,
        why: 'One of the easiest ways to make Bangkok food culture a central part of the trip.',
      },
      {
        name: 'Sukhumvit evening dining circuit',
        neighborhood: 'Sukhumvit',
        estimatedCost: '$18 to $45 per person',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A reliable option when you want restaurants, bars, and easier logistics in one zone.',
      },
    ],
    attractions: [
      {
        name: 'Chao Phraya river cruise',
        neighborhood: 'Riverside',
        estimatedCost: '$12 to $28',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A strong overview route and an especially effective first or final evening activity.',
      },
      {
        name: 'Chinatown evening walk',
        neighborhood: 'Yaowarat',
        estimatedCost: 'Free to $12',
        priceGuide: '$',
        rating: 4.7,
        why: 'Best when you want food, movement, and sensory energy without rigid scheduling.',
      },
    ],
    monuments: [
      {
        name: 'Grand Palace',
        neighborhood: 'Rattanakosin',
        estimatedCost: '$14 to $20',
        priceGuide: '$$',
        rating: 4.7,
        why: 'A signature Bangkok stop that is easiest to enjoy when it anchors the first half of the day.',
      },
      {
        name: 'Wat Pho',
        neighborhood: 'Old City',
        estimatedCost: '$8 to $12',
        priceGuide: '$',
        rating: 4.8,
        why: 'A high-value cultural stop that works especially well after the palace district.',
      },
    ],
    museums: [
      {
        name: 'Jim Thompson House Museum',
        neighborhood: 'Siam',
        estimatedCost: '$6 to $10',
        priceGuide: '$',
        rating: 4.6,
        why: 'A manageable cultural stop that adds design and city history without requiring a whole day.',
      },
      {
        name: 'Bangkok National Museum',
        neighborhood: 'Old City',
        estimatedCost: '$6 to $10',
        priceGuide: '$',
        rating: 4.5,
        why: 'Best if you want a deeper historical layer after the landmark-heavy districts.',
      },
    ],
    parks: [
      {
        name: 'Lumpini Park',
        neighborhood: 'Silom',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'A useful reset when you need quieter pacing between dense city blocks.',
      },
      {
        name: 'Benjakitti Park',
        neighborhood: 'Asok',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A modern green pause that works well before dinner or a later evening route.',
      },
    ],
    activities: [
      {
        name: 'Chatuchak market browse',
        neighborhood: 'Chatuchak',
        estimatedCost: 'Free to $25',
        priceGuide: '$',
        rating: 4.6,
        why: 'Strong for shopping, design finds, and a more exploratory daytime block.',
      },
      {
        name: 'Sukhumvit rooftop evening',
        neighborhood: 'Sukhumvit',
        estimatedCost: '$15 to $35',
        priceGuide: '$$',
        rating: 4.5,
        why: 'An easy way to give the trip a polished skyline finish without overplanning.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Singapore is strong for sleek city design, food culture, gardens, and a very low-friction trip where the days can feel efficient without being rushed.',
    bestMonths: 'February to April',
    averageRating: 4.8,
    averageBudget: '$170 to $320 per day',
    averageNightlyHotel: '$170 to $290',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['foodie', 'family', 'luxury', 'nature'],
    highlights: ['marina skyline', 'hawker food', 'gardens', 'clean easy logistics'],
    notes: ['Neighborhood routing is easy', 'Great for travelers who value low-stress movement'],
    hotels: [
      {
        name: 'Marina Bay stay options',
        neighborhood: 'Marina Bay',
        estimatedCost: '$220 to $290 per night',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'A premium base for skyline views, polished service, and smoother first-time logistics.',
      },
      {
        name: 'Tiong Bahru boutique stay options',
        neighborhood: 'Tiong Bahru',
        estimatedCost: '$170 to $240 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A better fit if you want a little more neighborhood character without losing comfort.',
      },
    ],
    restaurants: [
      {
        name: 'Maxwell hawker tasting route',
        neighborhood: 'Chinatown',
        estimatedCost: '$10 to $22 per person',
        priceGuide: '$',
        rating: 4.7,
        why: 'One of the easiest ways to build real food variety into the trip without formal reservations.',
      },
      {
        name: 'Kampong Glam cafe and dinner loop',
        neighborhood: 'Kampong Glam',
        estimatedCost: '$18 to $40 per person',
        priceGuide: '$$',
        rating: 4.6,
        why: 'Good for style, cafe stops, and a more design-forward evening area.',
      },
    ],
    attractions: [
      {
        name: 'Marina Bay skyline loop',
        neighborhood: 'Marina Bay',
        estimatedCost: 'Free to $18',
        priceGuide: '$',
        rating: 4.8,
        why: 'A near-essential overview route that makes the city feel instantly coherent.',
      },
      {
        name: 'Singapore River cruise',
        neighborhood: 'Boat Quay',
        estimatedCost: '$15 to $25',
        priceGuide: '$$',
        rating: 4.5,
        why: 'A simple way to connect the central districts while giving the trip a scenic evening block.',
      },
    ],
    monuments: [
      {
        name: 'Merlion Park',
        neighborhood: 'Marina Bay',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'A lightweight but practical first landmark when orienting around the bay.',
      },
      {
        name: 'Sultan Mosque',
        neighborhood: 'Kampong Glam',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A good cultural stop if you want a neighborhood with distinct architecture and food nearby.',
      },
    ],
    museums: [
      {
        name: 'National Gallery Singapore',
        neighborhood: 'Civic District',
        estimatedCost: '$12 to $18',
        priceGuide: '$',
        rating: 4.7,
        why: 'A polished museum choice when you want one substantial cultural block.',
      },
      {
        name: 'ArtScience Museum',
        neighborhood: 'Marina Bay',
        estimatedCost: '$18 to $25',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Best for travelers who want one more visually immersive or design-focused stop.',
      },
    ],
    parks: [
      {
        name: 'Gardens by the Bay',
        neighborhood: 'Marina Bay',
        estimatedCost: 'Free to $20',
        priceGuide: '$$',
        rating: 4.8,
        why: 'A signature Singapore experience that is easy to shape into day or evening plans.',
      },
      {
        name: 'Singapore Botanic Gardens',
        neighborhood: 'Tanglin',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'Great for a softer half-day when the trip needs more air and less city density.',
      },
    ],
    activities: [
      {
        name: 'Clarke Quay evening',
        neighborhood: 'Clarke Quay',
        estimatedCost: '$15 to $35',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Works well if you want drinks, movement, and an easy central nightlife option.',
      },
      {
        name: 'Joo Chiat neighborhood wander',
        neighborhood: 'Joo Chiat',
        estimatedCost: 'Free to $15',
        priceGuide: '$',
        rating: 4.5,
        why: 'A useful way to add a more local, colorful district beyond the postcard skyline.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'seoul',
    city: 'Seoul',
    country: 'South Korea',
    region: 'East Asia',
    image: 'https://images.unsplash.com/photo-1538485399081-7c897f8d9a7f?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Seoul is best for travelers who want palaces, cafe districts, design neighborhoods, night markets, and a city that shifts fast between tradition and modern energy.',
    bestMonths: 'April to May and September to October',
    averageRating: 4.7,
    averageBudget: '$130 to $250 per day',
    averageNightlyHotel: '$120 to $210',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['balanced', 'packed'],
    bestFor: ['nightlife', 'shopping', 'foodie', 'culture'],
    highlights: ['palace districts', 'hanok streets', 'k-food routes', 'river evenings'],
    notes: ['Cluster neighborhoods together', 'Nighttime districts can be as important as daytime sights'],
    hotels: [
      {
        name: 'Myeongdong stay options',
        neighborhood: 'Myeongdong',
        estimatedCost: '$130 to $210 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A practical base if you want transit, shopping, and quick access to major central districts.',
      },
      {
        name: 'Hongdae design stay options',
        neighborhood: 'Hongdae',
        estimatedCost: '$120 to $190 per night',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Best if nightlife, cafes, and a younger neighborhood mood matter most.',
      },
    ],
    restaurants: [
      {
        name: 'Gwangjang Market food route',
        neighborhood: 'Jongno',
        estimatedCost: '$12 to $28 per person',
        priceGuide: '$',
        rating: 4.7,
        why: 'One of the easiest ways to make local food central to the trip without formal planning.',
      },
      {
        name: 'Myeongdong street-food evening',
        neighborhood: 'Myeongdong',
        estimatedCost: '$10 to $25 per person',
        priceGuide: '$',
        rating: 4.6,
        why: 'A good backup or casual dinner strategy when you want flexibility and energy.',
      },
    ],
    attractions: [
      {
        name: 'N Seoul Tower outlook',
        neighborhood: 'Namsan',
        estimatedCost: '$12 to $20',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A clean city-overview activity that works well at sunset or on a first afternoon.',
      },
      {
        name: 'Cheonggyecheon evening walk',
        neighborhood: 'Central Seoul',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A lower-stress evening route that pairs well with food districts and central hotels.',
      },
    ],
    monuments: [
      {
        name: 'Gyeongbokgung Palace',
        neighborhood: 'Jongno',
        estimatedCost: '$3 to $6',
        priceGuide: '$',
        rating: 4.8,
        why: 'The most direct way to anchor the trip in royal history and older Seoul architecture.',
      },
      {
        name: 'Bukchon Hanok Village',
        neighborhood: 'Jongno',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'Useful when you want a district walk that feels cultural without needing another museum ticket.',
      },
    ],
    museums: [
      {
        name: 'National Museum of Korea',
        neighborhood: 'Yongsan',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'A very strong museum day choice if you want deeper context and a large but manageable collection.',
      },
      {
        name: 'Leeum Museum of Art',
        neighborhood: 'Itaewon',
        estimatedCost: '$8 to $15',
        priceGuide: '$',
        rating: 4.6,
        why: 'A polished modern-art stop if you want culture with a more contemporary lens.',
      },
    ],
    parks: [
      {
        name: 'Yeouido Hangang Park',
        neighborhood: 'Yeouido',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'Great for decompressing around the river after denser shopping or palace routes.',
      },
      {
        name: 'Namsan Park',
        neighborhood: 'Namsan',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A practical way to add greenery and city views without leaving the core of the trip.',
      },
    ],
    activities: [
      {
        name: 'Hongdae nightlife loop',
        neighborhood: 'Hongdae',
        estimatedCost: '$15 to $35',
        priceGuide: '$$',
        rating: 4.6,
        why: 'Best if you want music, youth energy, and a more social evening route.',
      },
      {
        name: 'Ikseon-dong cafe and design walk',
        neighborhood: 'Ikseon-dong',
        estimatedCost: '$8 to $22',
        priceGuide: '$',
        rating: 4.5,
        why: 'A strong mid-trip neighborhood block for cafe stops, boutiques, and slower discovery.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Dubai fits travelers who want polished hotels, skyline icons, beach access, desert activities, and a high-comfort city trip with dramatic visuals.',
    bestMonths: 'November to March',
    averageRating: 4.7,
    averageBudget: '$190 to $380 per day',
    averageNightlyHotel: '$180 to $330',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['luxury', 'family', 'adventure', 'shopping'],
    highlights: ['skyline icons', 'resort comfort', 'desert experiences', 'waterfront evenings'],
    notes: ['Heat changes daytime pacing', 'Use neighborhoods to separate old and new Dubai'],
    hotels: [
      {
        name: 'Downtown Dubai stay options',
        neighborhood: 'Downtown Dubai',
        estimatedCost: '$220 to $330 per night',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'A polished base if you want skyline landmarks, shopping, and easy polished evenings.',
      },
      {
        name: 'Dubai Marina resort stays',
        neighborhood: 'Dubai Marina',
        estimatedCost: '$180 to $300 per night',
        priceGuide: '$$$',
        rating: 4.6,
        why: 'Best for travelers who want beach-adjacent days, marina walks, and more resort-like energy.',
      },
    ],
    restaurants: [
      {
        name: 'Dubai Marina dinner route',
        neighborhood: 'Dubai Marina',
        estimatedCost: '$25 to $60 per person',
        priceGuide: '$$$',
        rating: 4.6,
        why: 'An easy zone for polished dinners and waterfront evenings without long transfers.',
      },
      {
        name: 'Al Seef old-dubai dining loop',
        neighborhood: 'Dubai Creek',
        estimatedCost: '$18 to $40 per person',
        priceGuide: '$$',
        rating: 4.5,
        why: 'A useful contrast to the newer skyline districts if you want one more atmospheric dinner area.',
      },
    ],
    attractions: [
      {
        name: 'Dubai Marina promenade',
        neighborhood: 'Dubai Marina',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A low-pressure evening activity that still feels distinctly Dubai.',
      },
      {
        name: 'Abra ride on Dubai Creek',
        neighborhood: 'Dubai Creek',
        estimatedCost: '$1 to $5',
        priceGuide: '$',
        rating: 4.5,
        why: 'A quick high-value activity that adds a more local texture to the trip.',
      },
    ],
    monuments: [
      {
        name: 'Burj Khalifa',
        neighborhood: 'Downtown Dubai',
        estimatedCost: '$35 to $60',
        priceGuide: '$$',
        rating: 4.7,
        why: 'Still the most obvious skyline anchor when you want one signature view on the trip.',
      },
      {
        name: 'Al Fahidi Historical District',
        neighborhood: 'Al Fahidi',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'Strong for balancing the ultra-modern skyline with older Gulf architecture and alleys.',
      },
    ],
    museums: [
      {
        name: 'Museum of the Future',
        neighborhood: 'Trade Centre',
        estimatedCost: '$40 to $50',
        priceGuide: '$$$',
        rating: 4.5,
        why: 'Best when you want one major signature museum-style stop with strong visual impact.',
      },
      {
        name: 'Al Shindagha Museum',
        neighborhood: 'Dubai Creek',
        estimatedCost: '$8 to $15',
        priceGuide: '$',
        rating: 4.4,
        why: 'Useful for adding historical context to a city better known for its newer image.',
      },
    ],
    parks: [
      {
        name: 'Jumeirah Beach',
        neighborhood: 'Jumeirah',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'An easy reset day choice if you want sun, water, and more breathing room.',
      },
      {
        name: 'Safa Park',
        neighborhood: 'Al Safa',
        estimatedCost: '$2 to $5',
        priceGuide: '$',
        rating: 4.4,
        why: 'A lighter green-space option if you want a calmer daytime block between landmarks.',
      },
    ],
    activities: [
      {
        name: 'Desert safari departure',
        neighborhood: 'Outer Dubai',
        estimatedCost: '$45 to $90',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'One of the clearest adventure add-ons if you want the city trip to feel broader than urban sightseeing.',
      },
      {
        name: 'Souk Madinat evening',
        neighborhood: 'Madinat Jumeirah',
        estimatedCost: '$12 to $35',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Works well for an atmospheric dinner-adjacent evening without a full nightlife plan.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'cape-town',
    city: 'Cape Town',
    country: 'South Africa',
    region: 'Southern Africa',
    image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8b?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Cape Town is excellent for travelers who want scenery, coastal drives, urban food, mountains, and a trip that mixes nature with city culture well.',
    bestMonths: 'November to March',
    averageRating: 4.8,
    averageBudget: '$120 to $260 per day',
    averageNightlyHotel: '$110 to $220',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['nature', 'adventure', 'foodie', 'romantic'],
    highlights: ['table mountain', 'waterfront views', 'beaches', 'creative districts'],
    notes: ['Use weather windows for mountain plans', 'Split days between coast and city'],
    hotels: [
      {
        name: 'V&A Waterfront stay options',
        neighborhood: 'V&A Waterfront',
        estimatedCost: '$150 to $220 per night',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'A polished base if you want walkable evenings, harbor views, and smoother first-time logistics.',
      },
      {
        name: 'Sea Point boutique stays',
        neighborhood: 'Sea Point',
        estimatedCost: '$110 to $180 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'Best if you want ocean access, a more local promenade, and easier outdoor pacing.',
      },
    ],
    restaurants: [
      {
        name: 'Kloof Street dining route',
        neighborhood: 'Gardens',
        estimatedCost: '$18 to $45 per person',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A reliable dinner zone with range, atmosphere, and lower planning friction.',
      },
      {
        name: 'Woodstock food and coffee loop',
        neighborhood: 'Woodstock',
        estimatedCost: '$12 to $30 per person',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Useful if you want creative-district energy and a less formal food block.',
      },
    ],
    attractions: [
      {
        name: 'V&A Waterfront',
        neighborhood: 'Waterfront',
        estimatedCost: 'Free to $20',
        priceGuide: '$',
        rating: 4.6,
        why: 'An easy orientation and evening zone that connects food, shopping, and harbor views.',
      },
      {
        name: 'Table Mountain cableway',
        neighborhood: 'Table Mountain',
        estimatedCost: '$20 to $28',
        priceGuide: '$$',
        rating: 4.8,
        why: 'The clearest signature activity if weather allows and you want a memorable overview.',
      },
    ],
    monuments: [
      {
        name: 'Bo-Kaap',
        neighborhood: 'Bo-Kaap',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A strong cultural district stop with color, history, and easy links to the city center.',
      },
      {
        name: 'Castle of Good Hope',
        neighborhood: 'City Centre',
        estimatedCost: '$3 to $6',
        priceGuide: '$',
        rating: 4.3,
        why: 'A useful historical counterweight to the citys more scenic and food-led experiences.',
      },
    ],
    museums: [
      {
        name: 'Zeitz MOCAA',
        neighborhood: 'Waterfront',
        estimatedCost: '$12 to $18',
        priceGuide: '$',
        rating: 4.5,
        why: 'A strong modern-art stop that pairs well with a waterfront day.',
      },
      {
        name: 'District Six Museum',
        neighborhood: 'City Centre',
        estimatedCost: '$5 to $10',
        priceGuide: '$',
        rating: 4.6,
        why: 'Important if you want deeper context on the city beyond the landscape and food scene.',
      },
    ],
    parks: [
      {
        name: 'Kirstenbosch National Botanical Garden',
        neighborhood: 'Newlands',
        estimatedCost: '$6 to $12',
        priceGuide: '$',
        rating: 4.8,
        why: 'One of the strongest softer half-day plans if you want scenery without a full hike.',
      },
      {
        name: 'Green Point Urban Park',
        neighborhood: 'Green Point',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'An easy urban green stop near the coast when the trip needs a lighter block.',
      },
    ],
    activities: [
      {
        name: 'Camps Bay sunset block',
        neighborhood: 'Camps Bay',
        estimatedCost: 'Free to $20',
        priceGuide: '$',
        rating: 4.7,
        why: 'One of the simplest ways to give the trip a memorable romantic or scenic finish.',
      },
      {
        name: 'Woodstock design district walk',
        neighborhood: 'Woodstock',
        estimatedCost: 'Free to $15',
        priceGuide: '$',
        rating: 4.5,
        why: 'Adds creative energy and local browsing without turning the day into a heavy museum route.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8dca8?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Sydney blends harbor icons, beach access, coastal walks, and polished city neighborhoods into one of the easier long-haul city breaks to pace well.',
    bestMonths: 'October to April',
    averageRating: 4.8,
    averageBudget: '$200 to $360 per day',
    averageNightlyHotel: '$190 to $320',
    budgetFits: ['balanced', 'luxury', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['nature', 'family', 'romantic', 'luxury'],
    highlights: ['harbor views', 'coastal walks', 'beach time', 'easy outdoor pacing'],
    notes: ['Balance harbor and beach days', 'Public transport makes split-neighborhood itineraries manageable'],
    hotels: [
      {
        name: 'Circular Quay stay options',
        neighborhood: 'Circular Quay',
        estimatedCost: '$220 to $320 per night',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'Ideal for first stays if you want the big harbor icons, ferries, and easier sightseeing starts.',
      },
      {
        name: 'Surry Hills boutique stay options',
        neighborhood: 'Surry Hills',
        estimatedCost: '$190 to $270 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A better fit if you want food, design streets, and a less tourist-heavy evening mood.',
      },
    ],
    restaurants: [
      {
        name: 'Surry Hills dining route',
        neighborhood: 'Surry Hills',
        estimatedCost: '$25 to $60 per person',
        priceGuide: '$$$',
        rating: 4.6,
        why: 'One of the strongest dinner neighborhoods if food quality and atmosphere matter most.',
      },
      {
        name: 'Barangaroo waterfront dining loop',
        neighborhood: 'Barangaroo',
        estimatedCost: '$20 to $45 per person',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Good when you want polished harbor evenings without overcomplicating the route.',
      },
    ],
    attractions: [
      {
        name: 'Sydney Harbour ferry loop',
        neighborhood: 'Harbour',
        estimatedCost: '$8 to $18',
        priceGuide: '$',
        rating: 4.8,
        why: 'An efficient first-day overview that also feels like a proper local city experience.',
      },
      {
        name: 'Bondi to Coogee coastal walk',
        neighborhood: 'Eastern Beaches',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'The clearest signature half-day if you want movement, views, and a more outdoorsy pace.',
      },
    ],
    monuments: [
      {
        name: 'Sydney Opera House',
        neighborhood: 'Circular Quay',
        estimatedCost: 'Free to $35',
        priceGuide: '$$',
        rating: 4.8,
        why: 'The obvious first-day anchor and still worth it when paired with the broader harbor route.',
      },
      {
        name: 'Sydney Harbour Bridge',
        neighborhood: 'The Rocks',
        estimatedCost: 'Free to $120',
        priceGuide: '$$',
        rating: 4.7,
        why: 'A strong icon whether you choose a simple walk or a bigger bucket-list activity.',
      },
    ],
    museums: [
      {
        name: 'Art Gallery of New South Wales',
        neighborhood: 'The Domain',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'A clean cultural anchor if you want one art-heavy afternoon without too much friction.',
      },
      {
        name: 'Museum of Contemporary Art Australia',
        neighborhood: 'Circular Quay',
        estimatedCost: '$10 to $18',
        priceGuide: '$',
        rating: 4.5,
        why: 'Useful if you want another museum stop close to the harbor icons.',
      },
    ],
    parks: [
      {
        name: 'Royal Botanic Garden',
        neighborhood: 'Farm Cove',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'A very easy green break with some of the best harbor-adjacent walking in the city.',
      },
      {
        name: 'Barangaroo Reserve',
        neighborhood: 'Barangaroo',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.6,
        why: 'A lower-pressure pause if you want views without a longer excursion.',
      },
    ],
    activities: [
      {
        name: 'Manly afternoon by ferry',
        neighborhood: 'Manly',
        estimatedCost: '$10 to $25',
        priceGuide: '$',
        rating: 4.7,
        why: 'A strong option when you want beach air and a lighter harbor-focused day.',
      },
      {
        name: 'The Rocks evening wander',
        neighborhood: 'The Rocks',
        estimatedCost: 'Free to $18',
        priceGuide: '$',
        rating: 4.5,
        why: 'A simple evening route if you want heritage streets and harbor lights without a fixed event.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'mexico-city',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'North America',
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Mexico City is a great fit for culture-heavy travelers who want museums, design neighborhoods, park space, and standout food all in one city break.',
    bestMonths: 'March to May and October to November',
    averageRating: 4.7,
    averageBudget: '$110 to $240 per day',
    averageNightlyHotel: '$100 to $190',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['foodie', 'culture', 'budget', 'shopping'],
    highlights: ['museum density', 'design neighborhoods', 'street life', 'food-first days'],
    notes: ['Cluster neighborhoods by day', 'Leave room for longer meals and cafe stops'],
    hotels: [
      {
        name: 'Roma Norte stay options',
        neighborhood: 'Roma Norte',
        estimatedCost: '$120 to $190 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A strong base for food, design streets, and a more modern neighborhood rhythm.',
      },
      {
        name: 'Historic Center stay options',
        neighborhood: 'Centro Histórico',
        estimatedCost: '$100 to $170 per night',
        priceGuide: '$$',
        rating: 4.5,
        why: 'Best if your priority is landmarks, museums, and easier first-time orientation.',
      },
    ],
    restaurants: [
      {
        name: 'Roma Norte dining circuit',
        neighborhood: 'Roma Norte',
        estimatedCost: '$18 to $40 per person',
        priceGuide: '$$',
        rating: 4.7,
        why: 'A reliable dinner zone if you want range, atmosphere, and a more contemporary city feel.',
      },
      {
        name: 'Coyoacán food and cafe route',
        neighborhood: 'Coyoacán',
        estimatedCost: '$12 to $28 per person',
        priceGuide: '$',
        rating: 4.6,
        why: 'Good for a slower day built around strolling, patios, and easier lunch pacing.',
      },
    ],
    attractions: [
      {
        name: 'Xochimilco canal ride',
        neighborhood: 'Xochimilco',
        estimatedCost: '$12 to $30',
        priceGuide: '$$',
        rating: 4.5,
        why: 'A lively signature experience if you want one more playful or social half-day.',
      },
      {
        name: 'Roma and Condesa walking loop',
        neighborhood: 'Roma and Condesa',
        estimatedCost: 'Free to $15',
        priceGuide: '$',
        rating: 4.6,
        why: 'A good route for cafe stops, design shops, and a more neighborhood-led afternoon.',
      },
    ],
    monuments: [
      {
        name: 'Zócalo and Metropolitan Cathedral',
        neighborhood: 'Centro Histórico',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'The clearest first-day anchor if you want historical scale and easy city orientation.',
      },
      {
        name: 'Palacio de Bellas Artes',
        neighborhood: 'Centro Histórico',
        estimatedCost: '$5 to $12',
        priceGuide: '$',
        rating: 4.7,
        why: 'A high-value landmark for architecture and central city atmosphere.',
      },
    ],
    museums: [
      {
        name: 'National Museum of Anthropology',
        neighborhood: 'Chapultepec',
        estimatedCost: '$6 to $12',
        priceGuide: '$',
        rating: 4.8,
        why: 'One of the strongest museum anchors in the city and worth protecting time for.',
      },
      {
        name: 'Frida Kahlo Museum',
        neighborhood: 'Coyoacán',
        estimatedCost: '$12 to $20',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A high-demand stop if you want one more personal, artist-led cultural block.',
      },
    ],
    parks: [
      {
        name: 'Bosque de Chapultepec',
        neighborhood: 'Chapultepec',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.8,
        why: 'A key reset zone that helps the city feel less dense between museums and avenues.',
      },
      {
        name: 'Parque México',
        neighborhood: 'Condesa',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.5,
        why: 'Good if you want a softer block tied to cafes and neighborhood strolling.',
      },
    ],
    activities: [
      {
        name: 'Coyoacán neighborhood walk',
        neighborhood: 'Coyoacán',
        estimatedCost: 'Free to $12',
        priceGuide: '$',
        rating: 4.6,
        why: 'A slower district walk that helps balance heavier museum or landmark days.',
      },
      {
        name: 'Condesa evening dining and bars',
        neighborhood: 'Condesa',
        estimatedCost: '$15 to $35',
        priceGuide: '$$',
        rating: 4.5,
        why: 'An easy evening choice if you want social energy without overplanning.',
      },
    ],
  }),
  createCompactCityProfile({
    id: 'rio-de-janeiro',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'South America',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Rio de Janeiro is ideal for travelers who want beaches, dramatic viewpoints, nightlife, and a trip that mixes city energy with outdoorsy moments.',
    bestMonths: 'May to October',
    averageRating: 4.8,
    averageBudget: '$120 to $260 per day',
    averageNightlyHotel: '$110 to $220',
    budgetFits: ['budget', 'balanced', 'open'],
    paceFits: ['easy', 'balanced'],
    bestFor: ['beach', 'nightlife', 'romantic', 'adventure', 'nature'],
    highlights: ['iconic beaches', 'mountain views', 'samba nightlife', 'sunset lookouts'],
    notes: ['Split your time between beach and central districts', 'Weather and sunsets shape the best pacing'],
    hotels: [
      {
        name: 'Copacabana stay options',
        neighborhood: 'Copacabana',
        estimatedCost: '$120 to $210 per night',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A strong base if you want beach access, easy first-time logistics, and classic Rio energy.',
      },
      {
        name: 'Ipanema boutique stay options',
        neighborhood: 'Ipanema',
        estimatedCost: '$150 to $220 per night',
        priceGuide: '$$$',
        rating: 4.7,
        why: 'Best if you want a slightly more polished stay with strong dining and a premium beach atmosphere.',
      },
    ],
    restaurants: [
      {
        name: 'Ipanema dinner route',
        neighborhood: 'Ipanema',
        estimatedCost: '$18 to $45 per person',
        priceGuide: '$$',
        rating: 4.6,
        why: 'A reliable area for seafood, modern Brazilian dining, and easier evening plans.',
      },
      {
        name: 'Lapa samba and bites circuit',
        neighborhood: 'Lapa',
        estimatedCost: '$12 to $30 per person',
        priceGuide: '$',
        rating: 4.5,
        why: 'A good option when you want music, casual food, and more nightlife energy in one zone.',
      },
    ],
    attractions: [
      {
        name: 'Sugarloaf cable car',
        neighborhood: 'Urca',
        estimatedCost: '$25 to $35',
        priceGuide: '$$',
        rating: 4.8,
        why: 'One of the cleanest ways to get a dramatic overview of the city and coastline.',
      },
      {
        name: 'Selarón Steps and Santa Teresa route',
        neighborhood: 'Santa Teresa',
        estimatedCost: 'Free to $12',
        priceGuide: '$',
        rating: 4.6,
        why: 'A strong route when you want color, neighborhood texture, and a less beach-led afternoon.',
      },
    ],
    monuments: [
      {
        name: 'Christ the Redeemer',
        neighborhood: 'Corcovado',
        estimatedCost: '$20 to $30',
        priceGuide: '$$',
        rating: 4.8,
        why: 'The clearest signature Rio landmark and a natural anchor for one of the trip mornings.',
      },
      {
        name: 'Arcos da Lapa',
        neighborhood: 'Lapa',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.4,
        why: 'Useful if you want one historic urban stop before shifting into nightlife or neighborhood wandering.',
      },
    ],
    museums: [
      {
        name: 'Museum of Tomorrow',
        neighborhood: 'Porto Maravilha',
        estimatedCost: '$8 to $14',
        priceGuide: '$',
        rating: 4.6,
        why: 'A good modern museum stop if you want something more design-forward and lighter than a full history day.',
      },
      {
        name: 'MAR Rio',
        neighborhood: 'Porto Maravilha',
        estimatedCost: '$6 to $12',
        priceGuide: '$',
        rating: 4.4,
        why: 'Useful for adding one more cultural layer near the waterfront redevelopment district.',
      },
    ],
    parks: [
      {
        name: 'Parque Lage',
        neighborhood: 'Jardim Botânico',
        estimatedCost: 'Free',
        priceGuide: '$',
        rating: 4.7,
        why: 'A beautiful slower block if you want greenery, a cafe break, and a softer pace between landmarks.',
      },
      {
        name: 'Tijuca National Park viewpoints',
        neighborhood: 'Tijuca',
        estimatedCost: 'Free to $12',
        priceGuide: '$',
        rating: 4.7,
        why: 'A strong option when you want more nature and a break from the beachfront rhythm.',
      },
    ],
    activities: [
      {
        name: 'Copacabana and Ipanema sunset block',
        neighborhood: 'South Zone',
        estimatedCost: 'Free to $15',
        priceGuide: '$',
        rating: 4.8,
        why: 'An easy way to give the trip a memorable ending without overplanning.',
      },
      {
        name: 'Lapa nightlife and samba evening',
        neighborhood: 'Lapa',
        estimatedCost: '$15 to $35',
        priceGuide: '$$',
        rating: 4.6,
        why: 'Best if nightlife is a real part of the travel personality you want this trip to have.',
      },
    ],
  }),
];

export const CITY_DATA: CityProfile[] = [...FEATURED_CITY_DATA, ...EXPANDED_CITY_DATA];
