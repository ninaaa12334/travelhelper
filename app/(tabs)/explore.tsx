import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useEffect, useState } from 'react';

import { CitySpotCard } from '@/components/city-spot-card';
import { EmptyState } from '@/components/empty-state';
import { LoadingPanel } from '@/components/loading-panel';
import { TravelBackdrop } from '@/components/travel-backdrop';
import { TravelRating } from '@/components/travel-rating';
import { TravelPlace } from '@/constants/travel-data';
import { Colors, Fonts } from '@/constants/theme';
import { useTravelPlanner } from '@/context/travel-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Palette = (typeof Colors)['light'];

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const {
    hasIntent,
    hydrated,
    preferences,
    primaryDestination,
    recommendations,
    savedDestinationIds,
    savedPlaceIds,
    setPrimaryDestination,
    toggleSavedDestination,
    toggleSavedPlace,
  } = useTravelPlanner();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const stylesKey = preferences.styles.join('|');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRefreshing(false);
    }, 260);

    return () => {
      clearTimeout(timer);
    };
  }, [
    preferences.destinationQuery,
    preferences.budget,
    preferences.pace,
    preferences.tripLength,
    stylesKey,
    primaryDestination?.id,
  ]);

  const focusedDestination = primaryDestination ?? recommendations.destinations[0];

  if (!hydrated || isRefreshing) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <LoadingPanel
              body="Finding the best city matches, center stays, food spots, and day-by-day planning ideas."
              palette={palette}
              title="Building your travel shortlist"
            />
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  if (!focusedDestination) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <EmptyState
              actionLabel="Back to search"
              body="Try a city name or pick a few interests so the app can build recommendations."
              onAction={() => router.push('/(tabs)')}
              palette={palette}
              title="No destinations yet"
            />
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  const alternativeDestinations = recommendations.destinations
    .filter((destination) => destination.id !== focusedDestination.id)
    .slice(0, 4);
  const neighborhoodHighlights = Array.from(
    new Set(
      [
        ...focusedDestination.hotels,
        ...focusedDestination.restaurants,
        ...focusedDestination.monuments,
        ...focusedDestination.activities,
      ].map((place) => place.neighborhood)
    )
  ).slice(0, 6);
  const infoLayout = isWide ? styles.twoColumnLayout : styles.singleColumnLayout;

  return (
    <TravelBackdrop palette={palette}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.eyebrow, { color: palette.secondary }]}>Destination board</Text>
              <Text style={[styles.title, { color: palette.text }]}>
                {preferences.travelerName ? `${preferences.travelerName}'s` : 'Your'} travel matches
              </Text>
            </View>

            <Pressable
              onPress={() => router.push('/(tabs)')}
              style={({ pressed }) => [
                styles.headerButton,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                  opacity: pressed ? 0.88 : 1,
                },
              ]}>
              <Text style={[styles.headerButtonText, { color: palette.text }]}>Edit brief</Text>
            </Pressable>
          </View>

          {recommendations.queryFallbackUsed ? (
            <View style={[styles.noticeCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <MaterialIcons color={palette.secondary} name="info-outline" size={18} />
              <Text style={[styles.noticeText, { color: palette.text }]}>
                {recommendations.matchedWorldCountryName ? (
                  <>
                    We found <Text style={styles.noticeStrong}>{recommendations.matchedWorldCountryName}</Text> in the
                    world directory. Full instant itineraries are currently strongest for featured destinations, so
                    these are your closest current matches.
                  </>
                ) : (
                  <>
                    No exact dataset match for <Text style={styles.noticeStrong}>{preferences.destinationQuery}</Text>.
                    These are the closest destinations based on your interests, budget, and pace.
                  </>
                )}
              </Text>
            </View>
          ) : null}

          <View style={[styles.heroCard, { borderColor: palette.border }]}>
            <Image source={{ uri: focusedDestination.image }} style={styles.heroImage} contentFit="cover" />
            <View style={styles.heroOverlay} />
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroLabel}>{hasIntent ? 'Best current match' : 'Featured city'}</Text>
                <Text style={styles.heroTitle}>
                  {focusedDestination.city}, {focusedDestination.country}
                </Text>
              </View>

              <Pressable
                onPress={() => toggleSavedDestination(focusedDestination.id)}
                style={({ pressed }) => [
                  styles.saveCityButton,
                  { opacity: pressed ? 0.86 : 1 },
                ]}>
                <MaterialIcons
                  color={savedDestinationIds.includes(focusedDestination.id) ? '#F1B262' : '#FFFFFF'}
                  name={savedDestinationIds.includes(focusedDestination.id) ? 'bookmark' : 'bookmark-border'}
                  size={18}
                />
              </Pressable>
            </View>

            <Text style={styles.heroBody}>{focusedDestination.summary}</Text>
            <Text style={styles.heroReason}>{focusedDestination.reason}</Text>

            <View style={styles.heroMetaRow}>
              <TravelRating color="#FFD18D" palette={palette} rating={focusedDestination.averageRating} />
              <Text style={styles.heroMetaText}>{focusedDestination.averageBudget}</Text>
              <Text style={styles.heroMetaText}>{focusedDestination.averageNightlyHotel}</Text>
              <Text style={styles.heroMetaText}>{focusedDestination.bestMonths}</Text>
            </View>

            <View style={styles.heroTagWrap}>
              {focusedDestination.highlights.slice(0, 4).map((item) => (
                <View key={item} style={styles.heroTag}>
                  <Text style={styles.heroTagText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.heroActionRow}>
              <Pressable
                onPress={() => {
                  setPrimaryDestination(focusedDestination.id);
                  router.push('/(tabs)/plan');
                }}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: palette.secondary, opacity: pressed ? 0.88 : 1 },
                ]}>
                <Text style={styles.primaryButtonText}>Build {focusedDestination.city} itinerary</Text>
                <MaterialIcons color="#132936" name="arrow-forward" size={18} />
              </Pressable>

              <Pressable
                onPress={() => router.push('/(tabs)')}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.18)',
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}>
                <Text style={styles.secondaryButtonText}>Refine search</Text>
              </Pressable>
            </View>
          </View>

          <View style={infoLayout}>
            <View style={styles.mainColumn}>
              <SpotSection
                items={focusedDestination.hotels}
                palette={palette}
                savedPlaceIds={savedPlaceIds}
                title="Hotels near the center"
                onToggleSave={toggleSavedPlace}
              />
              <SpotSection
                items={focusedDestination.restaurants}
                palette={palette}
                savedPlaceIds={savedPlaceIds}
                title="Restaurants to book"
                onToggleSave={toggleSavedPlace}
              />
              <SpotSection
                items={focusedDestination.attractions}
                palette={palette}
                savedPlaceIds={savedPlaceIds}
                title="Headline attractions"
                onToggleSave={toggleSavedPlace}
              />
              <SpotSection
                items={focusedDestination.monuments}
                palette={palette}
                savedPlaceIds={savedPlaceIds}
                title="Monuments and major sights"
                onToggleSave={toggleSavedPlace}
              />
              <SpotSection
                items={focusedDestination.museums}
                palette={palette}
                savedPlaceIds={savedPlaceIds}
                title="Museums worth your time"
                onToggleSave={toggleSavedPlace}
              />
              <SpotSection
                items={[...focusedDestination.parks, ...focusedDestination.activities].slice(0, 4)}
                palette={palette}
                savedPlaceIds={savedPlaceIds}
                title="Parks and activities"
                onToggleSave={toggleSavedPlace}
              />
            </View>

            <View style={styles.sideColumn}>
              <View style={[styles.sideCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Why it fits</Text>
                <Text style={[styles.sideTitle, { color: palette.text }]}>Trip match summary</Text>
                <Text style={[styles.sideBody, { color: palette.muted }]}>{recommendations.summary}</Text>

                <View style={styles.sideBulletStack}>
                  {recommendations.questions.map((question) => (
                    <View key={question} style={styles.sideBulletRow}>
                      <MaterialIcons color={palette.secondary} name="check-circle" size={16} />
                      <Text style={[styles.sideBulletText, { color: palette.text }]}>{question}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[styles.sideCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Best areas</Text>
                <Text style={[styles.sideTitle, { color: palette.text }]}>Neighborhoods worth focusing on</Text>
                <View style={styles.areaWrap}>
                  {neighborhoodHighlights.map((area) => (
                    <View key={area} style={[styles.areaPill, { backgroundColor: palette.background }]}>
                      <Text style={[styles.areaPillText, { color: palette.primary }]}>{area}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.sideBulletStack}>
                  {focusedDestination.notes.map((note) => (
                    <View key={note} style={styles.sideBulletRow}>
                      <MaterialIcons color={palette.secondary} name="star-outline" size={16} />
                      <Text style={[styles.sideBulletText, { color: palette.text }]}>{note}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[styles.sideCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <Text style={[styles.sectionKicker, { color: palette.secondary }]}>More destinations</Text>
                <Text style={[styles.sideTitle, { color: palette.text }]}>3 to 5 ideas that also fit</Text>
                <View style={styles.altStack}>
                  {alternativeDestinations.map((destination) => (
                    <Pressable
                      key={destination.id}
                      onPress={() => setPrimaryDestination(destination.id)}
                      style={({ pressed }) => [
                        styles.altCard,
                        {
                          backgroundColor: palette.background,
                          borderColor: palette.border,
                          opacity: pressed ? 0.9 : 1,
                        },
                      ]}>
                      <Image source={{ uri: destination.image }} style={styles.altImage} contentFit="cover" />
                      <View style={styles.altCopy}>
                        <Text style={[styles.altTitle, { color: palette.text }]}>
                          {destination.city}, {destination.country}
                        </Text>
                        <Text style={[styles.altBody, { color: palette.muted }]}>{destination.reason}</Text>
                        <Text style={[styles.altMeta, { color: palette.primary }]}>{destination.fitScore}% fit</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TravelBackdrop>
  );
}

function SpotSection({
  items,
  onToggleSave,
  palette,
  savedPlaceIds,
  title,
}: {
  items: TravelPlace[];
  onToggleSave: (id: string) => void;
  palette: Palette;
  savedPlaceIds: string[];
  title: string;
}) {
  return (
    <View style={[styles.sectionCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <Text style={[styles.sectionKicker, { color: palette.secondary }]}>{title}</Text>
      <View style={styles.spotStack}>
        {items.map((place) => (
          <CitySpotCard
            key={place.id}
            onToggleSave={onToggleSave}
            palette={palette}
            place={place}
            saved={savedPlaceIds.includes(place.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 44,
    gap: 18,
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 33,
    lineHeight: 38,
    fontWeight: '700',
    maxWidth: 260,
  },
  headerButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  noticeCard: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
  noticeStrong: {
    fontWeight: '800',
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 32,
    padding: 20,
    gap: 14,
    overflow: 'hidden',
    shadowColor: '#10242F',
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 54, 69, 0.66)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  heroLabel: {
    color: '#F8D7B1',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  heroTitle: {
    color: '#FFF9F0',
    fontFamily: Fonts.serif,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    maxWidth: 240,
  },
  saveCityButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  heroBody: {
    color: '#EEF8F6',
    fontSize: 14,
    lineHeight: 21,
  },
  heroReason: {
    color: '#D9ECE7',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  heroMetaText: {
    color: '#E6F5F0',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroTag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  heroTagText: {
    color: '#FFF9F0',
    fontSize: 12,
    fontWeight: '700',
  },
  heroActionRow: {
    gap: 10,
  },
  primaryButton: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: '#132936',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFF9F0',
    fontSize: 14,
    fontWeight: '700',
  },
  singleColumnLayout: {
    gap: 18,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  mainColumn: {
    flex: 1.6,
    gap: 16,
  },
  sideColumn: {
    flex: 1,
    gap: 16,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 16,
    gap: 12,
  },
  sectionKicker: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  spotStack: {
    gap: 10,
  },
  sideCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 16,
    gap: 12,
  },
  sideTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 23,
    lineHeight: 27,
    fontWeight: '800',
  },
  sideBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  sideBulletStack: {
    gap: 10,
  },
  sideBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  sideBulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  areaWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  areaPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  areaPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  altStack: {
    gap: 10,
  },
  altCard: {
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  altImage: {
    width: '100%',
    height: 110,
  },
  altCopy: {
    padding: 12,
    gap: 6,
  },
  altTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  altBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  altMeta: {
    fontSize: 12,
    fontWeight: '800',
  },
});
