import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { startTransition, useEffect, useState } from 'react';

import { SearchSuggestionList } from '@/components/search-suggestion-list';
import { TravelInterestId, TripLengthId } from '@/constants/cities-data';
import { TravelBackdrop } from '@/components/travel-backdrop';
import {
  buildRecommendations,
  buildCategorySummaries,
  buildFeaturedItineraryCards,
  buildSearchSuggestions,
  defaultPreferences,
  GlobalSearchSuggestion,
  SUPPORTED_CITY_COUNT,
  TRIP_LENGTH_OPTIONS,
  WORLD_COVERAGE_COUNT,
} from '@/constants/travel-data';
import { Colors, Fonts } from '@/constants/theme';
import { useSession } from '@/context/session-context';
import { useTravelPlanner } from '@/context/travel-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

const LANDING_DESTINATIONS = buildRecommendations(defaultPreferences).destinations.slice(0, 5);
const FEATURED_ITINERARIES = buildFeaturedItineraryCards(4);
const CATEGORY_SUMMARIES = buildCategorySummaries(3);
const FEATURE_STEPS = [
  {
    icon: 'travel-explore',
    title: 'Search a real place',
    body: 'Type the city you already want, or search by a feeling like foodie, beach, luxury, or culture.',
  },
  {
    icon: 'tune',
    title: 'Refine by budget and vibe',
    body: 'Tell the app how much you want to spend, how full the days should feel, and what kind of trip you want.',
  },
  {
    icon: 'route',
    title: 'Get a day-by-day plan',
    body: 'Once you choose a city, the app builds your trip with food, stays, and ideas for each day.',
  },
];

const WIDGET_LABELS = ['Popular right now', 'Boutique stay energy'];

type Palette = (typeof Colors)['light'];

export default function WelcomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const { accountName, hasAccount, hydrated, isAuthenticated, session, logout } = useSession();
  const { preferences, setDestinationQuery, setStyles, setTripLength } = useTravelPlanner();
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % LANDING_DESTINATIONS.length);
      });
    }, 4200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const mainDestination = LANDING_DESTINATIONS[activeIndex];
  const widgetDestinations = [1, 2].map(
    (offset) => LANDING_DESTINATIONS[(activeIndex + offset) % LANDING_DESTINATIONS.length]
  );
  const searchSuggestions = buildSearchSuggestions(searchQuery, searchQuery.trim() ? 8 : 10);

  const openPlanner = (query: string, mode: 'search' | 'match') => {
    const normalizedQuery = query.trim();

    if (mode === 'match') {
      setDestinationQuery('');
    } else if (normalizedQuery) {
      setDestinationQuery(normalizedQuery);
    }

    if (isAuthenticated) {
      router.replace(mode === 'search' && normalizedQuery ? '/(tabs)/explore' : '/(tabs)');
      return;
    }

    router.push({
      pathname: '/auth',
      params: {
        mode: hasAccount ? 'login' : 'signup',
        query: normalizedQuery || undefined,
      },
    });
  };

  const handleSuggestionSelect = (suggestion: GlobalSearchSuggestion) => {
    setSearchQuery(suggestion.label);
    openPlanner(suggestion.label, 'search');
  };

  const handleFeaturedCityPress = (city: string) => {
    setStyles([]);
    setSearchQuery(city);
    openPlanner(city, 'search');
  };

  const handleCategoryPress = (styleId: TravelInterestId) => {
    setStyles([styleId]);
    setSearchQuery('');
    openPlanner('', 'match');
  };

  if (!hydrated) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={palette.primary} size="large" />
            <Text style={[styles.loadingText, { color: palette.muted }]}>Preparing your travel world...</Text>
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  return (
    <TravelBackdrop palette={palette}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={[styles.heroFrame, { borderColor: palette.border }]}>
            <Image contentFit="cover" source={{ uri: mainDestination.image }} style={styles.heroImage} transition={800} />
            <View style={styles.heroOverlay} />

            <View style={styles.heroTopRow}>
              <View style={[styles.brandPill, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
                <MaterialIcons color="#FFF9F0" name="flight-takeoff" size={16} />
                <Text style={styles.brandPillText}>Travel Helper</Text>
              </View>

              {isAuthenticated ? (
                <Pressable
                  onPress={() => {
                    logout();
                    router.replace('/');
                  }}
                  style={({ pressed }) => [
                    styles.heroGhostButton,
                    { opacity: pressed ? 0.84 : 1 },
                  ]}>
                  <Text style={styles.heroGhostButtonText}>Log out</Text>
                </Pressable>
              ) : null}
            </View>

            <View style={styles.heroCenter}>
              <Text style={styles.heroEyebrow}>Search, match, and plan in one place</Text>
              <Text style={styles.heroTitle}>Travel Helper</Text>
              <Text style={styles.heroBody}>
                Search a city you already love, or let the app help you choose one based on your travel style,
                budget, and pace.
              </Text>

              <View style={styles.heroStatusRow}>
                <StatusPill
                  label={isAuthenticated ? `Welcome back, ${session?.name ?? 'Traveler'}` : 'Professional trip planning'}
                />
                <StatusPill
                  label={hasAccount && !isAuthenticated ? `Saved account: ${accountName}` : '1 to 7 day itineraries'}
                />
              </View>
            </View>

            <View style={styles.searchDock}>
              <Text style={styles.searchDockLabel}>Search your next destination</Text>
              <Text style={styles.searchDockBody}>
                Search {SUPPORTED_CITY_COUNT} guided cities, explore {WORLD_COVERAGE_COUNT}+ country entries, or type
                a travel vibe like beach reset, foodie weekend, or culture trip.
              </Text>

              <View style={styles.searchField}>
                <MaterialIcons color="#6E8893" name="search" size={20} />
                <TextInput
                  autoCapitalize="words"
                  onChangeText={setSearchQuery}
                  onSubmitEditing={() => openPlanner(searchQuery, 'search')}
                  placeholder="Where do you want to travel?"
                  placeholderTextColor="#7E97A1"
                  style={styles.searchInput}
                  value={searchQuery}
                />
              </View>

              <View style={styles.durationBlock}>
                <Text style={styles.durationLabel}>Trip duration</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.durationRow}>
                  {TRIP_LENGTH_OPTIONS.map((option) => {
                    const selected = preferences.tripLength === option.id;

                    return (
                      <Pressable
                        key={option.id}
                        onPress={() => setTripLength(option.id as TripLengthId)}
                        style={({ pressed }) => [
                          styles.durationChip,
                          selected
                            ? styles.durationChipActive
                            : { opacity: pressed ? 0.84 : 1 },
                        ]}>
                        <Text
                          style={[
                            styles.durationChipText,
                            selected ? styles.durationChipTextActive : null,
                          ]}>
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              <SearchSuggestionList onSelect={handleSuggestionSelect} palette={palette} suggestions={searchSuggestions} />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickSearchWrap}>
                {searchSuggestions.slice(0, 8).map((item) => (
                  <QuickSearchChip key={item.id} label={item.label} onPress={() => setSearchQuery(item.label)} />
                ))}
              </ScrollView>

              <View style={styles.heroActionColumn}>
                <Pressable
                  onPress={() => openPlanner(searchQuery, 'search')}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: palette.secondary, opacity: pressed ? 0.88 : 1 },
                  ]}>
                  <Text style={styles.primaryButtonText}>Search destinations</Text>
                  <MaterialIcons color="#132936" name="arrow-forward" size={18} />
                </Pressable>

                <Pressable
                  onPress={() => openPlanner('', 'match')}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    { opacity: pressed ? 0.88 : 1 },
                  ]}>
                  <Text style={styles.secondaryButtonText}>Help me choose where to go</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Popular destinations</Text>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>Trending city ideas from the travel planner</Text>
          </View>

          <View style={isWide ? styles.widgetRowWide : styles.widgetRow}>
            {widgetDestinations.map((destination, index) => (
              <Pressable
                key={destination.id}
                onPress={() => handleFeaturedCityPress(destination.city)}
                style={({ pressed }) => [
                  styles.widgetCard,
                  {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}>
                <Image contentFit="cover" source={{ uri: destination.image }} style={styles.widgetImage} transition={800} />
                <View style={styles.widgetShade} />
                <View style={styles.widgetContent}>
                  <Text style={styles.widgetLabel}>{WIDGET_LABELS[index]}</Text>
                  <Text style={styles.widgetTitle}>{destination.city}</Text>
                  <Text style={styles.widgetBody}>{destination.highlights[0]}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Featured itineraries</Text>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              Ready-to-demo city plans with real travel structure
            </Text>
          </View>

          <View style={isWide ? styles.itineraryGridWide : styles.itineraryGrid}>
            {FEATURED_ITINERARIES.map((item) => (
              <FeaturedItineraryPreview
                key={item.id}
                item={item}
                onPress={() => handleFeaturedCityPress(item.city)}
              />
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Travel categories</Text>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              Start from a travel mood when you do not know the destination yet
            </Text>
          </View>

          <View style={isWide ? styles.categoryGridWide : styles.categoryGrid}>
            {CATEGORY_SUMMARIES.map((item) => (
              <CategoryShowcaseCard
                key={item.id}
                item={item}
                onPress={() => handleCategoryPress(item.id as TravelInterestId)}
              />
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Why it feels easier</Text>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              A more guided travel app, not just a list of places
            </Text>
          </View>

          <View style={isWide ? styles.featureStackWide : styles.featureStack}>
            {FEATURE_STEPS.map((item, index) => (
              <FeatureCard key={item.title} index={index + 1} item={item} palette={palette} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TravelBackdrop>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <View style={styles.statusPill}>
      <Text style={styles.statusPillText}>{label}</Text>
    </View>
  );
}

function QuickSearchChip({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickSearchChip, { opacity: pressed ? 0.84 : 1 }]}>
      <Text style={styles.quickSearchChipText}>{label}</Text>
    </Pressable>
  );
}

function FeatureCard({
  index,
  item,
  palette,
}: {
  index: number;
  item: { icon: string; title: string; body: string };
  palette: Palette;
}) {
  return (
    <View style={[styles.featureCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <View style={styles.featureHeader}>
        <View style={[styles.featureNumber, { backgroundColor: palette.surfaceAlt }]}>
          <Text style={[styles.featureNumberText, { color: palette.primary }]}>{index}</Text>
        </View>
        <View style={[styles.featureIcon, { backgroundColor: palette.background }]}>
          <MaterialIcons color={palette.secondary} name={item.icon as keyof typeof MaterialIcons.glyphMap} size={18} />
        </View>
      </View>
      <Text style={[styles.featureTitle, { color: palette.text }]}>{item.title}</Text>
      <Text style={[styles.featureBody, { color: palette.muted }]}>{item.body}</Text>
    </View>
  );
}

function FeaturedItineraryPreview({
  item,
  onPress,
}: {
  item: (typeof FEATURED_ITINERARIES)[number];
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.itineraryCard, { opacity: pressed ? 0.9 : 1 }]}>
      <Image contentFit="cover" source={{ uri: item.image }} style={styles.itineraryImage} transition={500} />
      <View style={styles.itineraryShade} />
      <View style={styles.itineraryContent}>
        <View style={styles.itineraryBadge}>
          <Text style={styles.itineraryBadgeText}>{item.suggestedDays} days</Text>
        </View>
        <Text style={styles.itineraryTitle}>
          {item.city}, {item.country}
        </Text>
        <Text numberOfLines={3} style={styles.itineraryBody}>
          {item.summary}
        </Text>
        <Text style={styles.itineraryMeta}>{item.averageBudget}</Text>
      </View>
    </Pressable>
  );
}

function CategoryShowcaseCard({
  item,
  onPress,
}: {
  item: (typeof CATEGORY_SUMMARIES)[number];
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.categoryCard, { opacity: pressed ? 0.9 : 1 }]}>
      <View style={styles.categoryTopRow}>
        <Text style={styles.categoryTitle}>{item.label}</Text>
        <View style={styles.categoryCountPill}>
          <Text style={styles.categoryCountText}>{item.totalMatches}</Text>
        </View>
      </View>
      <Text style={styles.categoryBody}>{item.hint}</Text>
      <View style={styles.categoryCityWrap}>
        {item.cityNames.map((city) => (
          <View key={`${item.id}-${city}`} style={styles.categoryCityPill}>
            <Text style={styles.categoryCityText}>{city}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.categoryAction}>See matching destinations</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 28,
  },
  loadingText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 44,
    gap: 18,
  },
  heroFrame: {
    borderWidth: 1,
    borderRadius: 36,
    overflow: 'hidden',
    minHeight: 640,
    shadowColor: '#123042',
    shadowOpacity: 0.14,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 5,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 43, 55, 0.32)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  brandPillText: {
    color: '#FFF9F0',
    fontSize: 13,
    fontWeight: '800',
  },
  heroGhostButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  heroGhostButtonText: {
    color: '#FFF9F0',
    fontSize: 13,
    fontWeight: '700',
  },
  heroCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
    paddingTop: 54,
    gap: 12,
  },
  heroEyebrow: {
    color: '#FFE8BF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  heroTitle: {
    color: '#FFF9F0',
    fontFamily: Fonts.serif,
    fontSize: 50,
    lineHeight: 54,
    fontWeight: '700',
    textAlign: 'center',
  },
  heroBody: {
    color: '#E8F5F2',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 310,
  },
  heroStatusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  statusPill: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  statusPillText: {
    color: '#FFF9F0',
    fontSize: 12,
    fontWeight: '700',
  },
  searchDock: {
    marginTop: 40,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    gap: 12,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  searchDockLabel: {
    color: '#173241',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  searchDockBody: {
    color: '#617A84',
    fontSize: 14,
    lineHeight: 21,
  },
  durationBlock: {
    gap: 8,
  },
  durationLabel: {
    color: '#173241',
    fontSize: 13,
    fontWeight: '800',
  },
  durationRow: {
    gap: 8,
    paddingRight: 4,
  },
  durationChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#EFF5F8',
    borderWidth: 1,
    borderColor: '#D5E1E6',
  },
  durationChipActive: {
    backgroundColor: '#1F6075',
    borderColor: '#1F6075',
  },
  durationChipText: {
    color: '#173241',
    fontSize: 12,
    fontWeight: '700',
  },
  durationChipTextActive: {
    color: '#FFFFFF',
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#D5E1E6',
    backgroundColor: '#F6FAFC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#173241',
    fontSize: 15,
    paddingVertical: 0,
  },
  quickSearchWrap: {
    gap: 10,
    paddingRight: 4,
  },
  quickSearchChip: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: '#EDF4F7',
  },
  quickSearchChipText: {
    color: '#1F6075',
    fontSize: 12,
    fontWeight: '700',
  },
  heroActionColumn: {
    gap: 10,
    marginTop: 2,
  },
  primaryButton: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#A45E24',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#132936',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5E1E6',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#173241',
    fontSize: 14,
    fontWeight: '700',
  },
  widgetRow: {
    gap: 12,
  },
  widgetRowWide: {
    flexDirection: 'row',
    gap: 12,
  },
  itineraryGrid: {
    gap: 12,
  },
  itineraryGridWide: {
    flexDirection: 'row',
    gap: 12,
  },
  itineraryCard: {
    flex: 1,
    minHeight: 230,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#123042',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  itineraryImage: {
    ...StyleSheet.absoluteFillObject,
  },
  itineraryShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 40, 54, 0.34)',
  },
  itineraryContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    gap: 8,
  },
  itineraryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  itineraryBadgeText: {
    color: '#FFF7ED',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  itineraryTitle: {
    color: '#FFF9F0',
    fontSize: 28,
    lineHeight: 31,
    fontWeight: '700',
    fontFamily: Fonts.serif,
  },
  itineraryBody: {
    color: '#E8F5F2',
    fontSize: 13,
    lineHeight: 20,
  },
  itineraryMeta: {
    color: '#FFE8BF',
    fontSize: 12,
    fontWeight: '800',
  },
  categoryGrid: {
    gap: 12,
  },
  categoryGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: 220,
    borderRadius: 26,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E6EC',
    shadowColor: '#123042',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    gap: 10,
  },
  categoryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  categoryTitle: {
    color: '#173241',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  categoryCountPill: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: '#EDF5F8',
  },
  categoryCountText: {
    color: '#1F6075',
    fontSize: 11,
    fontWeight: '800',
  },
  categoryBody: {
    color: '#617A84',
    fontSize: 13,
    lineHeight: 20,
  },
  categoryCityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCityPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#FFF5E7',
  },
  categoryCityText: {
    color: '#9B651A',
    fontSize: 11,
    fontWeight: '700',
  },
  categoryAction: {
    color: '#1F6075',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  widgetCard: {
    borderWidth: 1,
    borderRadius: 28,
    minHeight: 162,
    overflow: 'hidden',
    shadowColor: '#103040',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    flex: 1,
  },
  widgetImage: {
    ...StyleSheet.absoluteFillObject,
  },
  widgetShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 45, 58, 0.24)',
  },
  widgetContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    gap: 4,
  },
  widgetLabel: {
    color: '#E6F4F1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  widgetTitle: {
    color: '#FFF9F0',
    fontFamily: Fonts.serif,
    fontSize: 28,
    lineHeight: 31,
    fontWeight: '700',
  },
  widgetBody: {
    color: '#F2FAF7',
    fontSize: 13,
    lineHeight: 19,
  },
  sectionHeader: {
    gap: 6,
    paddingHorizontal: 2,
  },
  sectionKicker: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '800',
  },
  featureStack: {
    gap: 12,
  },
  featureStackWide: {
    flexDirection: 'row',
    gap: 12,
  },
  featureCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 18,
    gap: 10,
    flex: 1,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureNumber: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureNumberText: {
    fontSize: 13,
    fontWeight: '800',
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
  },
  featureBody: {
    fontSize: 13,
    lineHeight: 20,
  },
});
