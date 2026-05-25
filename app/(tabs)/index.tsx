import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { LoadingPanel } from '@/components/loading-panel';
import { SearchSuggestionList } from '@/components/search-suggestion-list';
import { TravelBackdrop } from '@/components/travel-backdrop';
import { TravelRating } from '@/components/travel-rating';
import {
  TravelBudgetId,
  TravelInterestId,
  TravelPaceId,
  TripLengthId,
} from '@/constants/cities-data';
import {
  BUDGET_OPTIONS,
  buildSearchSuggestions,
  DestinationRecommendation,
  GlobalSearchSuggestion,
  PACE_OPTIONS,
  STYLE_OPTIONS,
  SUPPORTED_CITY_COUNT,
  TRIP_LENGTH_OPTIONS,
  WORLD_COVERAGE_COUNT,
  getTripLengthDays,
} from '@/constants/travel-data';
import { Colors, Fonts } from '@/constants/theme';
import { useSession } from '@/context/session-context';
import { useTravelPlanner } from '@/context/travel-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Palette = (typeof Colors)['light'];

const DASHBOARD_NAV = [
  { label: 'Home', route: '/(tabs)' as const },
  { label: 'Explore', route: '/(tabs)/explore' as const },
  { label: 'Trip Planner', route: '/(tabs)/plan' as const },
  { label: 'Recommendations', route: '/(tabs)/explore' as const },
];

const TIMELINE_TIMES = ['09:00', '12:30', '16:00', '19:30'];

export default function PlannerHomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isWide = width >= 1180;
  const isTablet = width >= 820;
  const isMedium = width >= 640;
  const {
    hydrated,
    preferences,
    recommendations,
    primaryDestination,
    tripPlan,
    completionPercent,
    setDestinationQuery,
    setBudget,
    setPace,
    setTripLength,
    toggleStyle,
    setPrimaryDestination,
    toggleSavedDestination,
    savedDestinationIds,
    resetPlanner,
  } = useTravelPlanner();
  const { session, logout } = useSession();
  const [activeDay, setActiveDay] = useState(0);
  const searchSuggestions = buildSearchSuggestions(
    preferences.destinationQuery,
    preferences.destinationQuery.trim() ? 8 : 12
  );

  useEffect(() => {
    if (tripPlan.length === 0) {
      setActiveDay(0);
      return;
    }

    setActiveDay((current) => Math.min(current, tripPlan.length - 1));
  }, [tripPlan.length]);

  if (!hydrated) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingWrap}>
            <LoadingPanel
              body="Gathering the planner, destination library, and itinerary ideas for your next trip."
              palette={palette}
              title="Building your travel dashboard"
            />
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  if (!primaryDestination || recommendations.destinations.length === 0) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingWrap}>
            <EmptyState
              actionLabel="Reset planner"
              body="The planner could not load a destination. Reset the filters and try again."
              onAction={resetPlanner}
              palette={palette}
              title="No destination available"
            />
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  const quickDestinations = recommendations.destinations.slice(0, 10);
  const recommendedList = recommendations.destinations.slice(0, 4);
  const activePlan = tripPlan[activeDay] ?? tripPlan[0];
  const selectedStyles = preferences.styles;
  const isSaved = savedDestinationIds.includes(primaryDestination.id);
  const greetingName = session?.name?.split(' ')[0] ?? 'Traveler';
  const progressValue = Math.max(24, Math.min(100, completionPercent));

  const openSearchResults = () => {
    if (recommendations.destinations[0]) {
      setPrimaryDestination(recommendations.destinations[0].id);
    }

    router.push('/(tabs)/explore');
  };

  const openPlan = () => {
    setPrimaryDestination(primaryDestination.id);
    router.push('/(tabs)/plan');
  };

  const handleSuggestionSelect = (suggestion: GlobalSearchSuggestion) => {
    setDestinationQuery(suggestion.label);

    if (suggestion.featuredDestinationId) {
      setPrimaryDestination(suggestion.featuredDestinationId);
    }

    router.push('/(tabs)/explore');
  };

  const navSpacing = isTablet ? styles.heroNavRowWide : styles.heroNavRow;
  const heroContentSpacing = isWide ? styles.heroBodyWide : styles.heroBody;
  const lowerGridStyle = isWide ? styles.lowerGridWide : styles.lowerGrid;
  const cardsGridStyle = isWide ? styles.cardsGridWide : styles.cardsGrid;
  const recommendationRowStyle = isMedium ? styles.recommendationRowWide : styles.recommendationRow;

  return (
    <TravelBackdrop palette={palette}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.heroCard, { borderColor: palette.border }]}>
            <Image contentFit="cover" source={{ uri: primaryDestination.image }} style={styles.heroImage} transition={500} />
            <View style={styles.heroShade} />
            <View style={styles.heroWarmGlow} />

            <View style={navSpacing}>
              <View style={styles.brandRow}>
                <View style={styles.brandIconWrap}>
                  <MaterialIcons color="#FFFFFF" name="place" size={18} />
                </View>
                <Text style={styles.brandText}>Travel Helper</Text>
              </View>

              <View style={styles.navGroup}>
                {DASHBOARD_NAV.map((item) => (
                  <Pressable
                    key={item.label}
                    onPress={() => router.push(item.route)}
                    style={({ pressed }) => [styles.navPill, { opacity: pressed ? 0.78 : 1 }]}>
                    <Text style={styles.navPillText}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={() => {
                  logout();
                  router.replace('/');
                }}
                style={({ pressed }) => [styles.profilePill, { opacity: pressed ? 0.84 : 1 }]}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.profileAvatarText}>{greetingName.slice(0, 1).toUpperCase()}</Text>
                </View>
                <Text style={styles.profileName}>{greetingName}</Text>
              </Pressable>
            </View>

            <View style={heroContentSpacing}>
              <View style={styles.heroCopy}>
                <Text style={styles.heroEyebrow}>City search, matching, and planning in one place</Text>
                <Text style={styles.heroTitle}>Your Journey,{'\n'}Perfectly Planned</Text>
                <Text style={styles.heroSubtitle}>
                  Search a city you already want, or let the app guide you with interests, budget, and pace before it
                  builds the trip day by day.
                </Text>
              </View>

              <View style={styles.heroStatusColumn}>
                <View style={styles.heroStatusPill}>
                  <Text style={styles.heroStatusText}>{getTripLengthDays(preferences.tripLength)}-day itineraries</Text>
                </View>
                <View style={styles.heroStatusPill}>
                  <Text style={styles.heroStatusText}>{selectedStyles.length || 3}+ matching filters</Text>
                </View>
                <View style={styles.heroStatusPill}>
                  <Text style={styles.heroStatusText}>Hotels, food, landmarks, and activities</Text>
                </View>
              </View>
            </View>

            <View style={[styles.searchPanel, { borderColor: 'rgba(255,255,255,0.24)' }]}>
              <View style={styles.searchPanelHeader}>
                <Text style={styles.searchPanelTitle}>Search from a much bigger travel world</Text>
                <Text style={styles.searchPanelMeta}>
                  {SUPPORTED_CITY_COUNT} guided cities plus {WORLD_COVERAGE_COUNT}+ searchable countries and regions.
                </Text>
              </View>

              <View style={isTablet ? styles.searchTopRowWide : styles.searchTopRow}>
                <View style={styles.searchFieldCard}>
                  <View style={styles.searchFieldIcon}>
                    <MaterialIcons color={palette.primary} name="search" size={18} />
                  </View>
                  <View style={styles.searchFieldBody}>
                    <Text style={styles.searchLabel}>Where do you want to go?</Text>
                    <TextInput
                      autoCapitalize="words"
                      onChangeText={setDestinationQuery}
                      onSubmitEditing={openSearchResults}
                      placeholder="Search a city or country like Berlin, Japan, or Brazil"
                      placeholderTextColor="#7C8F98"
                      style={styles.searchInput}
                      value={preferences.destinationQuery}
                    />
                  </View>
                </View>

                <View style={styles.summaryPillCard}>
                  <Text style={styles.summaryPillLabel}>Trip duration</Text>
                  <Text style={styles.summaryPillValue}>{getTripLengthDays(preferences.tripLength)} days</Text>
                </View>

                <View style={styles.summaryPillCard}>
                  <Text style={styles.summaryPillLabel}>Budget</Text>
                  <Text style={styles.summaryPillValue}>
                    {BUDGET_OPTIONS.find((option) => option.id === preferences.budget)?.label ?? 'Balanced'}
                  </Text>
                </View>

                <Pressable
                  onPress={openSearchResults}
                  style={({ pressed }) => [
                    styles.searchButton,
                    { backgroundColor: palette.primary, opacity: pressed ? 0.88 : 1 },
                  ]}>
                  <Text style={styles.searchButtonText}>Search</Text>
                </Pressable>
              </View>

              <SearchSuggestionList onSelect={handleSuggestionSelect} palette={palette} suggestions={searchSuggestions} />

              <SelectorRow
                compact
                label="Trip duration"
                options={TRIP_LENGTH_OPTIONS}
                palette={palette}
                selectedId={preferences.tripLength}
                onSelect={(value) => setTripLength(value as TripLengthId)}
              />

              {recommendations.queryFallbackUsed ? (
                <View style={styles.noticeCard}>
                  <MaterialIcons color={palette.secondary} name="tips-and-updates" size={18} />
                  <Text style={[styles.noticeText, { color: palette.text }]}>
                    No exact city match for &quot;{preferences.destinationQuery.trim()}&quot;. Showing the closest
                    destinations for your style instead.
                  </Text>
                </View>
              ) : null}

              <View style={styles.popularHeader}>
                <Text style={styles.popularTitle}>World spotlight</Text>
                <Pressable onPress={() => router.push('/(tabs)/explore')}>
                  <Text style={styles.popularAction}>View all</Text>
                </Pressable>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularScroll}>
                {quickDestinations.map((destination) => (
                  <DestinationMiniCard
                    key={destination.id}
                    destination={destination}
                    isSelected={destination.id === primaryDestination.id}
                    onPress={() => {
                      setDestinationQuery(destination.city);
                      setPrimaryDestination(destination.id);
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={cardsGridStyle}>
            <View style={[styles.destinationCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <View style={styles.destinationImageWrap}>
                <Image contentFit="cover" source={{ uri: primaryDestination.image }} style={styles.destinationImage} transition={500} />
                <View style={styles.destinationImageShade} />

                <View style={styles.destinationImageTopRow}>
                  <Pressable
                    onPress={() => {
                      const currentIndex = Math.max(
                        0,
                        recommendations.destinations.findIndex((destination) => destination.id === primaryDestination.id)
                      );
                      const previous = recommendations.destinations[(currentIndex - 1 + recommendations.destinations.length) % recommendations.destinations.length];
                      setPrimaryDestination(previous.id);
                      setDestinationQuery(previous.city);
                    }}
                    style={({ pressed }) => [styles.circleAction, { opacity: pressed ? 0.84 : 1 }]}>
                    <MaterialIcons color="#20374A" name="arrow-back" size={18} />
                  </Pressable>

                  <View style={styles.destinationImageActions}>
                    <Pressable
                      onPress={() => toggleSavedDestination(primaryDestination.id)}
                      style={({ pressed }) => [styles.circleAction, { opacity: pressed ? 0.84 : 1 }]}>
                      <MaterialIcons
                        color={isSaved ? palette.primary : '#20374A'}
                        name={isSaved ? 'favorite' : 'favorite-border'}
                        size={18}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => router.push('/(tabs)/explore')}
                      style={({ pressed }) => [styles.circleAction, { opacity: pressed ? 0.84 : 1 }]}>
                      <MaterialIcons color="#20374A" name="ios-share" size={18} />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.destinationImageBottom}>
                  <Text style={styles.destinationName}>{primaryDestination.city}</Text>
                  <View style={styles.destinationCountryRow}>
                    <Text style={styles.destinationCountry}>{primaryDestination.country}</Text>
                    <View style={styles.dotDivider} />
                    <TravelRating color="#FFD97E" palette={palette} rating={primaryDestination.averageRating} />
                  </View>
                </View>
              </View>

              <View style={styles.destinationBody}>
                <View style={styles.detailGrid}>
                  <DetailChip icon="public" label="Region" value={primaryDestination.region} />
                  <DetailChip icon="schedule" label="Best months" value={primaryDestination.bestMonths} />
                  <DetailChip icon="payments" label="Average budget" value={primaryDestination.averageBudget} />
                  <DetailChip icon="hotel" label="Hotel range" value={primaryDestination.averageNightlyHotel} />
                </View>

                <Text style={[styles.destinationSummary, { color: palette.muted }]}>{primaryDestination.summary}</Text>

                <View style={styles.sectionTitleRow}>
                  <Text style={[styles.cardSectionTitle, { color: palette.text }]}>Plan your trip</Text>
                  <Text style={[styles.cardSectionMeta, { color: palette.primary }]}>{progressValue}% ready</Text>
                </View>

                <SelectorRow
                  label="Budget style"
                  options={BUDGET_OPTIONS}
                  palette={palette}
                  selectedId={preferences.budget}
                  onSelect={(value) => setBudget(value as TravelBudgetId)}
                />

                <SelectorRow
                  label="Trip pace"
                  options={PACE_OPTIONS}
                  palette={palette}
                  selectedId={preferences.pace}
                  onSelect={(value) => setPace(value as TravelPaceId)}
                />

                <View style={styles.primaryActionRow}>
                  <Pressable
                    onPress={openPlan}
                    style={({ pressed }) => [
                      styles.generateButton,
                      { backgroundColor: palette.primary, opacity: pressed ? 0.88 : 1 },
                    ]}>
                    <Text style={styles.generateButtonText}>Generate my plan</Text>
                    <MaterialIcons color="#FFFFFF" name="auto-awesome" size={16} />
                  </Pressable>

                  <Pressable
                    onPress={() => router.push('/(tabs)/explore')}
                    style={({ pressed }) => [
                      styles.secondaryActionButton,
                      { borderColor: palette.border, opacity: pressed ? 0.84 : 1 },
                    ]}>
                    <Text style={[styles.secondaryActionText, { color: palette.text }]}>View details</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={[styles.timelineCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <View style={styles.timelineHeader}>
                <View style={styles.timelineHeaderLeft}>
                  <Pressable
                    onPress={openPlan}
                    style={({ pressed }) => [styles.timelineBackButton, { opacity: pressed ? 0.84 : 1 }]}>
                    <MaterialIcons color={palette.text} name="arrow-back" size={20} />
                  </Pressable>
                  <View>
                    <Text style={[styles.timelineHeading, { color: palette.text }]}>
                      Your {getTripLengthDays(preferences.tripLength)}-day plan for {primaryDestination.city}
                    </Text>
                    <Text style={[styles.timelineSubheading, { color: palette.muted }]}>
                      {recommendations.summary}
                    </Text>
                  </View>
                </View>
              </View>

              <ScrollView
                horizontal
                contentContainerStyle={styles.dayTabsRow}
                showsHorizontalScrollIndicator={false}>
                {tripPlan.map((day, index) => (
                  <Pressable
                    key={day.day}
                    onPress={() => setActiveDay(index)}
                    style={({ pressed }) => [
                      styles.dayTab,
                      index === activeDay
                        ? { backgroundColor: palette.primary, borderColor: palette.primary }
                        : { backgroundColor: palette.surfaceAlt, borderColor: palette.border, opacity: pressed ? 0.88 : 1 },
                    ]}>
                    <Text style={[styles.dayTabText, { color: index === activeDay ? '#FFFFFF' : palette.text }]}>
                      Day {day.day}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              {activePlan ? (
                <View style={styles.timelineBody}>
                  <View style={styles.timelineDayIntro}>
                    <Text style={[styles.timelineDayTitle, { color: palette.text }]}>
                      Day {activePlan.day} - {activePlan.title}
                    </Text>
                    <Text style={[styles.timelineDayTheme, { color: palette.muted }]}>{activePlan.theme}</Text>
                  </View>

                  <View style={styles.timelineList}>
                    <TimelineStop
                      destinationImage={primaryDestination.image}
                      palette={palette}
                      time={TIMELINE_TIMES[0]}
                      title={activePlan.morningSpots[0]?.name ?? 'Morning walk'}
                      body={activePlan.morning}
                      location={activePlan.morningSpots[0]?.neighborhood ?? primaryDestination.city}
                    />
                    <TimelineStop
                      destinationImage={primaryDestination.image}
                      palette={palette}
                      time={TIMELINE_TIMES[1]}
                      title={activePlan.afternoonSpots[0]?.name ?? 'Afternoon stop'}
                      body={activePlan.afternoon}
                      location={activePlan.afternoonSpots[0]?.neighborhood ?? primaryDestination.city}
                    />
                    <TimelineStop
                      destinationImage={primaryDestination.image}
                      palette={palette}
                      time={TIMELINE_TIMES[2]}
                      title={activePlan.eveningSpots[0]?.name ?? 'Evening activity'}
                      body={activePlan.evening}
                      location={activePlan.eveningSpots[0]?.neighborhood ?? primaryDestination.city}
                    />
                    <TimelineStop
                      destinationImage={primaryDestination.image}
                      palette={palette}
                      time={TIMELINE_TIMES[3]}
                      title={activePlan.diningSpots[0]?.name ?? 'Dinner reservation'}
                      body={activePlan.dining}
                      location={activePlan.diningSpots[0]?.neighborhood ?? primaryDestination.city}
                      isLast
                    />
                  </View>

                  <Pressable
                    onPress={() => router.push('/(tabs)/explore')}
                    style={({ pressed }) => [
                      styles.timelineFooterButton,
                      { borderColor: palette.border, opacity: pressed ? 0.84 : 1 },
                    ]}>
                    <MaterialIcons color={palette.primary} name="hotel" size={18} />
                    <Text style={[styles.timelineFooterText, { color: palette.primary }]}>
                      Show hotels near city center
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </View>

          <View style={lowerGridStyle}>
            <View style={[styles.quizCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <View style={styles.quizHeader}>
                <View>
                  <Text style={[styles.quizGreeting, { color: palette.text }]}>Hi, {greetingName}!</Text>
                  <Text style={[styles.quizPrompt, { color: palette.muted }]}>Find your perfect destination</Text>
                </View>
                <View style={[styles.quizProgressBadge, { backgroundColor: palette.surfaceAlt }]}>
                  <Text style={[styles.quizProgressText, { color: palette.primary }]}>{selectedStyles.length}/11</Text>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.max(18, Math.min(100, (selectedStyles.length / STYLE_OPTIONS.length) * 100))}%`,
                      backgroundColor: palette.primary,
                    },
                  ]}
                />
              </View>

              <Text style={[styles.quizTitle, { color: palette.text }]}>I don’t know where to go yet</Text>
              <Text style={[styles.quizBody, { color: palette.muted }]}>
                Choose the travel moods that fit this trip and the app will rank destinations with a clear reason for
                each one.
              </Text>

              <View style={styles.quizChipWrap}>
                {STYLE_OPTIONS.map((option) => {
                  const selected = selectedStyles.includes(option.id as TravelInterestId);

                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => toggleStyle(option.id as TravelInterestId)}
                      style={({ pressed }) => [
                        styles.quizChip,
                        selected
                          ? { backgroundColor: palette.primary, borderColor: palette.primary }
                          : { backgroundColor: palette.surfaceAlt, borderColor: palette.border, opacity: pressed ? 0.86 : 1 },
                      ]}>
                      <Text style={[styles.quizChipText, { color: selected ? '#FFFFFF' : palette.text }]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.quizActions}>
                <Pressable
                  onPress={openSearchResults}
                  style={({ pressed }) => [
                    styles.generateButton,
                    { backgroundColor: palette.primary, opacity: pressed ? 0.88 : 1 },
                  ]}>
                  <Text style={styles.generateButtonText}>Recommend destinations</Text>
                </Pressable>

                <Pressable
                  onPress={resetPlanner}
                  style={({ pressed }) => [
                    styles.secondaryActionButton,
                    { borderColor: palette.border, opacity: pressed ? 0.84 : 1 },
                  ]}>
                  <Text style={[styles.secondaryActionText, { color: palette.text }]}>Clear filters</Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.recommendationCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <View style={styles.recommendationHeader}>
                <View>
                  <Text style={[styles.recommendationTitle, { color: palette.text }]}>Recommended destinations</Text>
                  <Text style={[styles.recommendationBody, { color: palette.muted }]}>
                    {selectedStyles.length > 0
                      ? 'Based on your interests, budget, and pace.'
                      : 'Start with these strong all-round city ideas, then narrow the trip with filters.'}
                  </Text>
                </View>
                <Pressable onPress={() => router.push('/(tabs)/explore')}>
                  <Text style={[styles.recommendationAction, { color: palette.primary }]}>View all</Text>
                </Pressable>
              </View>

              <View style={styles.recommendationList}>
                {recommendedList.map((destination) => (
                  <Pressable
                    key={destination.id}
                    onPress={() => {
                      setDestinationQuery(destination.city);
                      setPrimaryDestination(destination.id);
                    }}
                    style={({ pressed }) => [
                      recommendationRowStyle,
                      {
                        backgroundColor: destination.id === primaryDestination.id ? palette.surfaceAlt : '#FAFCFD',
                        borderColor: palette.border,
                        opacity: pressed ? 0.88 : 1,
                      },
                    ]}>
                    <Image contentFit="cover" source={{ uri: destination.image }} style={styles.recommendationImage} transition={300} />
                    <View style={styles.recommendationTextWrap}>
                      <View style={styles.recommendationTopLine}>
                        <Text style={[styles.recommendationPlace, { color: palette.text }]}>
                          {destination.city}, {destination.country}
                        </Text>
                        <TravelRating palette={palette} rating={destination.averageRating} />
                      </View>

                      <View style={styles.recommendationTags}>
                        {destination.bestFor.slice(0, 3).map((tag) => (
                          <View key={`${destination.id}-${tag}`} style={[styles.tagPill, { backgroundColor: '#EEF4F7' }]}>
                            <Text style={[styles.tagPillText, { color: palette.primary }]}>
                              {STYLE_OPTIONS.find((option) => option.id === tag)?.label ?? tag}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <Text numberOfLines={2} style={[styles.recommendationReason, { color: palette.muted }]}>
                        {destination.reason}
                      </Text>

                      <View style={styles.recommendationMetaRow}>
                        <Text style={[styles.recommendationMeta, { color: palette.secondary }]}>
                          from {destination.averageNightlyHotel} / night
                        </Text>
                        <Text style={[styles.recommendationMetaMuted, { color: palette.muted }]}>{destination.region}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TravelBackdrop>
  );
}

function SelectorRow({
  compact,
  label,
  onSelect,
  options,
  palette,
  selectedId,
}: {
  compact?: boolean;
  label: string;
  onSelect: (value: string) => void;
  options: { id: string; label: string }[];
  palette: Palette;
  selectedId: string;
}) {
  return (
    <View style={compact ? styles.selectorCompactWrap : styles.selectorWrap}>
      <Text style={[compact ? styles.selectorCompactLabel : styles.selectorLabel, { color: compact ? '#5F7480' : palette.text }]}>
        {label}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorRow}>
        {options.map((option) => {
          const selected = option.id === selectedId;

          return (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={({ pressed }) => [
                compact ? styles.selectorChipCompact : styles.selectorChip,
                selected
                  ? { backgroundColor: palette.primary, borderColor: palette.primary }
                  : {
                      backgroundColor: compact ? '#F7FAFC' : palette.surfaceAlt,
                      borderColor: palette.border,
                      opacity: pressed ? 0.84 : 1,
                    },
              ]}>
              <Text style={[compact ? styles.selectorChipCompactText : styles.selectorChipText, { color: selected ? '#FFFFFF' : palette.text }]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function DestinationMiniCard({
  destination,
  isSelected,
  onPress,
}: {
  destination: DestinationRecommendation;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.miniCard, isSelected && styles.miniCardSelected, { opacity: pressed ? 0.88 : 1 }]}>
      <Image contentFit="cover" source={{ uri: destination.image }} style={styles.miniCardImage} transition={300} />
      <View style={styles.miniCardShade} />
      <View style={styles.miniCardBody}>
        <Text style={styles.miniCardCity}>{destination.city}</Text>
        <Text style={styles.miniCardCountry}>{destination.country}</Text>
      </View>
    </Pressable>
  );
}

function DetailChip({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailChip}>
      <View style={styles.detailChipIconWrap}>
        <MaterialIcons color="#1F6075" name={icon} size={14} />
      </View>
      <View style={styles.detailChipTextWrap}>
        <Text style={styles.detailChipLabel}>{label}</Text>
        <Text style={styles.detailChipValue}>{value}</Text>
      </View>
    </View>
  );
}

function TimelineStop({
  body,
  destinationImage,
  isLast,
  location,
  palette,
  time,
  title,
}: {
  body: string;
  destinationImage: string;
  isLast?: boolean;
  location: string;
  palette: Palette;
  time: string;
  title: string;
}) {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineTimeColumn}>
        <Text style={[styles.timelineTime, { color: palette.primary }]}>{time}</Text>
        <View style={styles.timelineRailWrap}>
          <View style={[styles.timelineDot, { backgroundColor: palette.primary }]} />
          {!isLast ? <View style={[styles.timelineLine, { backgroundColor: palette.border }]} /> : null}
        </View>
      </View>

      <View style={[styles.timelineEntryCard, { borderColor: palette.border }]}>
        <Image contentFit="cover" source={{ uri: destinationImage }} style={styles.timelineThumb} transition={300} />
        <View style={styles.timelineEntryBody}>
          <Text style={[styles.timelineEntryTitle, { color: palette.text }]}>{title}</Text>
          <Text style={[styles.timelineEntryBodyText, { color: palette.muted }]}>{body}</Text>
        </View>
        <View style={[styles.timelineLocationCard, { backgroundColor: '#FBFCFD', borderColor: palette.border }]}>
          <MaterialIcons color={palette.success} name="place" size={16} />
          <Text style={[styles.timelineLocationText, { color: palette.text }]}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 132,
    gap: 18,
  },
  heroCard: {
    minHeight: 660,
    borderRadius: 34,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#102D3D',
    shadowOpacity: 0.14,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 6,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 33, 54, 0.42)',
  },
  heroWarmGlow: {
    position: 'absolute',
    right: -60,
    top: 58,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(246, 178, 99, 0.24)',
  },
  heroNavRow: {
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heroNavRowWide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 22,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  navGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  navPillText: {
    color: '#F7FAFF',
    fontSize: 13,
    fontWeight: '600',
  },
  profilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  profileAvatar: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#FFF1DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: '#173241',
    fontSize: 14,
    fontWeight: '800',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  heroBody: {
    gap: 18,
    paddingHorizontal: 24,
    paddingTop: 46,
  },
  heroBodyWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 18,
    paddingHorizontal: 28,
    paddingTop: 58,
  },
  heroCopy: {
    maxWidth: 520,
    gap: 12,
  },
  heroEyebrow: {
    color: '#FFF0C9',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 54,
    lineHeight: 58,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  heroSubtitle: {
    color: '#ECF6FA',
    fontSize: 17,
    lineHeight: 27,
    maxWidth: 500,
  },
  heroStatusColumn: {
    alignItems: 'flex-start',
    gap: 10,
    maxWidth: 280,
  },
  heroStatusPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  heroStatusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  searchPanel: {
    marginTop: 30,
    marginHorizontal: 18,
    marginBottom: 18,
    borderRadius: 28,
    padding: 18,
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  searchPanelHeader: {
    gap: 4,
  },
  searchPanelTitle: {
    color: '#173241',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  searchPanelMeta: {
    color: '#5D7682',
    fontSize: 13,
    lineHeight: 20,
  },
  searchTopRow: {
    gap: 12,
  },
  searchTopRowWide: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'stretch',
  },
  searchFieldCard: {
    flex: 1.8,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7EC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  searchFieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: '#EDF5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFieldBody: {
    flex: 1,
    gap: 2,
  },
  searchLabel: {
    color: '#637A86',
    fontSize: 12,
    fontWeight: '700',
  },
  searchInput: {
    color: '#173241',
    fontSize: 15,
    paddingVertical: 0,
    minHeight: 22,
  },
  summaryPillCard: {
    minWidth: 136,
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  summaryPillLabel: {
    color: '#637A86',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryPillValue: {
    color: '#173241',
    fontSize: 15,
    fontWeight: '800',
  },
  searchButton: {
    minWidth: 132,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  selectorCompactWrap: {
    gap: 8,
  },
  selectorWrap: {
    gap: 8,
  },
  selectorCompactLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  selectorRow: {
    gap: 8,
    paddingRight: 6,
  },
  selectorChipCompact: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectorChip: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  selectorChipCompactText: {
    fontSize: 13,
    fontWeight: '700',
  },
  selectorChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFF8ED',
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  popularHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popularTitle: {
    color: '#173241',
    fontSize: 18,
    fontWeight: '800',
  },
  popularAction: {
    color: '#1F6075',
    fontSize: 13,
    fontWeight: '700',
  },
  popularScroll: {
    gap: 12,
    paddingRight: 4,
  },
  miniCard: {
    width: 118,
    height: 138,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  miniCardSelected: {
    borderColor: '#FFFFFF',
  },
  miniCardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  miniCardShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 45, 60, 0.26)',
  },
  miniCardBody: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
    gap: 2,
  },
  miniCardCity: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 23,
    fontWeight: '800',
    fontFamily: Fonts.serif,
  },
  miniCardCountry: {
    color: '#EDF6FA',
    fontSize: 12,
    fontWeight: '600',
  },
  cardsGrid: {
    gap: 18,
  },
  cardsGridWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 18,
  },
  destinationCard: {
    flex: 0.98,
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#113042',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  destinationImageWrap: {
    height: 330,
  },
  destinationImage: {
    ...StyleSheet.absoluteFillObject,
  },
  destinationImageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 44, 58, 0.18)',
  },
  destinationImageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  destinationImageActions: {
    flexDirection: 'row',
    gap: 10,
  },
  circleAction: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationImageBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 6,
  },
  destinationName: {
    color: '#FFFFFF',
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  destinationCountryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  destinationCountry: {
    color: '#F7FBFD',
    fontSize: 15,
    fontWeight: '700',
  },
  dotDivider: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#F7FBFD',
    opacity: 0.8,
  },
  destinationBody: {
    padding: 18,
    gap: 16,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailChip: {
    minWidth: '47%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  detailChipIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#EDF5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailChipTextWrap: {
    flex: 1,
    gap: 2,
  },
  detailChipLabel: {
    color: '#6B808A',
    fontSize: 11,
    fontWeight: '700',
  },
  detailChipValue: {
    color: '#173241',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  destinationSummary: {
    fontSize: 15,
    lineHeight: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  cardSectionTitle: {
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  cardSectionMeta: {
    fontSize: 13,
    fontWeight: '700',
  },
  primaryActionRow: {
    gap: 10,
  },
  generateButton: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryActionButton: {
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  timelineCard: {
    flex: 1.18,
    borderRadius: 30,
    borderWidth: 1,
    padding: 18,
    gap: 14,
    shadowColor: '#113042',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  timelineHeader: {
    gap: 12,
  },
  timelineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  timelineBackButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: '#EEF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineHeading: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  timelineSubheading: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 520,
  },
  dayTabsRow: {
    gap: 12,
    paddingRight: 6,
  },
  dayTab: {
    minWidth: 94,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dayTabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  timelineBody: {
    gap: 18,
  },
  timelineDayIntro: {
    gap: 4,
  },
  timelineDayTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  timelineDayTheme: {
    fontSize: 14,
    lineHeight: 21,
  },
  timelineList: {
    gap: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },
  timelineTimeColumn: {
    width: 56,
    alignItems: 'center',
  },
  timelineTime: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },
  timelineRailWrap: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 10,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 6,
    borderRadius: 999,
  },
  timelineEntryCard: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    gap: 12,
  },
  timelineThumb: {
    width: 92,
    height: 78,
    borderRadius: 16,
  },
  timelineEntryBody: {
    flex: 1,
    gap: 5,
  },
  timelineEntryTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  timelineEntryBodyText: {
    fontSize: 13,
    lineHeight: 20,
  },
  timelineLocationCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timelineLocationText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  timelineFooterButton: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  timelineFooterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  lowerGrid: {
    gap: 18,
  },
  lowerGridWide: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'flex-start',
  },
  quizCard: {
    flex: 0.92,
    borderRadius: 30,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  quizGreeting: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  quizPrompt: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 21,
  },
  quizProgressBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quizProgressText: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E6EEF2',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  quizTitle: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  quizBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  quizChipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quizChip: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  quizChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  quizActions: {
    gap: 10,
  },
  recommendationCard: {
    flex: 1.08,
    borderRadius: 30,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  recommendationTitle: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  recommendationBody: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 420,
  },
  recommendationAction: {
    fontSize: 13,
    fontWeight: '700',
  },
  recommendationList: {
    gap: 12,
  },
  recommendationRow: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 12,
    gap: 12,
  },
  recommendationRowWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: 24,
    padding: 12,
    gap: 12,
  },
  recommendationImage: {
    width: 132,
    minHeight: 122,
    borderRadius: 18,
  },
  recommendationTextWrap: {
    flex: 1,
    gap: 8,
  },
  recommendationTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  recommendationPlace: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
  },
  recommendationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  recommendationReason: {
    fontSize: 13,
    lineHeight: 20,
  },
  recommendationMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  recommendationMeta: {
    fontSize: 13,
    fontWeight: '700',
  },
  recommendationMetaMuted: {
    fontSize: 12,
    fontWeight: '600',
  },
});
