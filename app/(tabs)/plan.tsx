import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { CitySpotCard } from '@/components/city-spot-card';
import { EmptyState } from '@/components/empty-state';
import { LoadingPanel } from '@/components/loading-panel';
import { TravelBackdrop } from '@/components/travel-backdrop';
import { TravelPlanDay } from '@/constants/travel-data';
import { Colors, Fonts } from '@/constants/theme';
import { useTravelPlanner } from '@/context/travel-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Palette = (typeof Colors)['light'];

export default function PlanScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const {
    checklist,
    hydrated,
    preferences,
    primaryDestination,
    savedPlaces,
    tripPlan,
  } = useTravelPlanner();

  const savedHotels = savedPlaces.filter((place) => place.category === 'hotel');
  const savedRestaurants = savedPlaces.filter((place) => place.category === 'restaurant');
  const savedExperiences = savedPlaces.filter((place) => place.category !== 'hotel' && place.category !== 'restaurant');

  if (!hydrated) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerWrap}>
            <LoadingPanel
              body="Generating your day-by-day route, matching it to saved places, and organizing the final plan."
              palette={palette}
              title="Building your itinerary"
            />
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  if (!primaryDestination || tripPlan.length === 0) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerWrap}>
            <EmptyState
              actionLabel="Choose a destination"
              body="Search for a city or pick a recommendation first, then the app will build a travel plan here."
              onAction={() => router.push('/(tabs)/explore')}
              palette={palette}
              title="No itinerary yet"
            />
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  return (
    <TravelBackdrop palette={palette}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.eyebrow, { color: palette.secondary }]}>Trip planner</Text>
              <Text style={[styles.title, { color: palette.text }]}>
                {primaryDestination.city} {getDayLabel(tripPlan.length)} plan
              </Text>
            </View>

            <Pressable
              onPress={() => router.push('/(tabs)/explore')}
              style={({ pressed }) => [
                styles.headerButton,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                  opacity: pressed ? 0.88 : 1,
                },
              ]}>
              <Text style={[styles.headerButtonText, { color: palette.text }]}>See recommendations</Text>
            </Pressable>
          </View>

          <View style={[styles.summaryCard, { borderColor: palette.border }]}>
            <Image source={{ uri: primaryDestination.image }} style={styles.summaryImage} contentFit="cover" />
            <View style={styles.summaryOverlay} />

            <View style={styles.summaryTopRow}>
              <View>
                <Text style={styles.summaryLabel}>Primary destination</Text>
                <Text style={styles.summaryTitle}>
                  {primaryDestination.city}, {primaryDestination.country}
                </Text>
              </View>
              <View style={styles.summaryStamp}>
                <Text style={styles.summaryStampText}>{tripPlan.length} days</Text>
              </View>
            </View>

            <Text style={styles.summaryBody}>
              Built around {preferences.pace} pacing, {preferences.tripLength.replace('days', ' days').replace('1day', '1 day')} timing,
              and a mix of food, landmarks, and practical hotel suggestions.
            </Text>

            <View style={styles.summaryMetaWrap}>
              <SummaryMeta label="Average budget" value={primaryDestination.averageBudget} />
              <SummaryMeta label="Hotel range" value={primaryDestination.averageNightlyHotel} />
              <SummaryMeta label="Best months" value={primaryDestination.bestMonths} />
            </View>
          </View>

          <View style={isWide ? styles.splitLayout : styles.singleLayout}>
            <View style={styles.mainColumn}>
              <View style={[styles.sectionCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Suggested itinerary</Text>
                <Text style={[styles.cardTitle, { color: palette.text }]}>Day-by-day trip plan</Text>
                <View style={styles.planStack}>
                  {tripPlan.map((day) => (
                    <DayPlanCard day={day} key={`${day.day}-${day.title}`} palette={palette} />
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.sideColumn}>
              <View style={[styles.sectionCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <Text style={[styles.sectionKicker, { color: palette.secondary }]}>Before you go</Text>
                <Text style={[styles.cardTitle, { color: palette.text }]}>Checklist</Text>
                <View style={styles.checklist}>
                  {checklist.map((item) => (
                    <View
                      key={item.id}
                      style={[styles.checkItem, { backgroundColor: palette.background, borderColor: palette.border }]}>
                      <View style={[styles.checkDot, { backgroundColor: palette.surfaceAlt }]}>
                        <MaterialIcons color={palette.secondary} name="done" size={16} />
                      </View>
                      <View style={styles.checkCopy}>
                        <Text style={[styles.checkTitle, { color: palette.text }]}>{item.title}</Text>
                        <Text style={[styles.checkBody, { color: palette.muted }]}>{item.body}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <SavedPlacesSection items={savedHotels} palette={palette} title="Saved hotels" />
              <SavedPlacesSection items={savedRestaurants} palette={palette} title="Saved restaurants" />
              <SavedPlacesSection items={savedExperiences} palette={palette} title="Saved monuments, museums, parks, and activities" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TravelBackdrop>
  );
}

function getDayLabel(days: number) {
  return days === 1 ? '1-day' : `${days}-day`;
}

function SummaryMeta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryMetaCard}>
      <Text style={styles.summaryMetaLabel}>{label}</Text>
      <Text style={styles.summaryMetaValue}>{value}</Text>
    </View>
  );
}

function DayPlanCard({ day, palette }: { day: TravelPlanDay; palette: Palette }) {
  return (
    <View style={[styles.dayCard, { backgroundColor: palette.background, borderColor: palette.border }]}>
      <View style={styles.dayHeader}>
        <View style={[styles.dayBadge, { backgroundColor: palette.surfaceAlt }]}>
          <Text style={[styles.dayBadgeText, { color: palette.primary }]}>{day.day}</Text>
        </View>
        <View style={styles.dayTitleBlock}>
          <Text style={[styles.dayTitle, { color: palette.text }]}>{day.title}</Text>
          <Text style={[styles.dayTheme, { color: palette.muted }]}>{day.theme}</Text>
        </View>
      </View>

      {day.hotelSuggestion ? (
        <View style={[styles.hotelSuggestion, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <MaterialIcons color={palette.secondary} name="hotel" size={16} />
          <Text style={[styles.hotelSuggestionText, { color: palette.text }]}>
            Hotel suggestion: {day.hotelSuggestion.name} in {day.hotelSuggestion.neighborhood}
          </Text>
        </View>
      ) : null}

      <TimeBlock icon="account-balance" label="Morning" palette={palette} value={day.morning} spots={day.morningSpots} />
      <TimeBlock icon="museum" label="Afternoon" palette={palette} value={day.afternoon} spots={day.afternoonSpots} />
      <TimeBlock icon="nightlife" label="Evening" palette={palette} value={day.evening} spots={day.eveningSpots} />
      <TimeBlock icon="restaurant" label="Dining" palette={palette} value={day.dining} spots={day.diningSpots} />
    </View>
  );
}

function TimeBlock({
  icon,
  label,
  palette,
  spots,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  palette: Palette;
  spots: TravelPlanDay['morningSpots'];
  value: string;
}) {
  return (
    <View style={styles.timeBlock}>
      <View style={styles.timeHeader}>
        <MaterialIcons color={palette.secondary} name={icon} size={16} />
        <Text style={[styles.timeLabel, { color: palette.muted }]}>{label}</Text>
      </View>
      <Text style={[styles.timeValue, { color: palette.text }]}>{value}</Text>
      {spots.length > 0 ? (
        <View style={styles.spotPillWrap}>
          {spots.map((spot) => (
            <View key={spot.id} style={[styles.spotPill, { backgroundColor: palette.surface }]}>
              <Text style={[styles.spotPillText, { color: palette.primary }]}>{spot.name}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function SavedPlacesSection({
  items,
  palette,
  title,
}: {
  items: ReturnType<typeof useTravelPlanner>['savedPlaces'];
  palette: Palette;
  title: string;
}) {
  return (
    <View style={[styles.sectionCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <Text style={[styles.sectionKicker, { color: palette.secondary }]}>{title}</Text>
      <Text style={[styles.cardTitle, { color: palette.text }]}>Shortlisted for the final plan</Text>
      {items.length === 0 ? (
        <Text style={[styles.emptyText, { color: palette.muted }]}>
          Save places from the recommendation screen and they will appear here.
        </Text>
      ) : (
        <View style={styles.savedStack}>
          {items.map((item) => (
            <CitySpotCard key={item.id} palette={palette} place={item} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 44,
    gap: 18,
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
  summaryCard: {
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
  summaryImage: {
    ...StyleSheet.absoluteFillObject,
  },
  summaryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 54, 69, 0.7)',
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  summaryLabel: {
    color: '#F8D7B1',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  summaryTitle: {
    color: '#FFF9F0',
    fontFamily: Fonts.serif,
    fontSize: 31,
    lineHeight: 35,
    fontWeight: '700',
    maxWidth: 240,
  },
  summaryStamp: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  summaryStampText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  summaryBody: {
    color: '#E6F4F0',
    fontSize: 14,
    lineHeight: 21,
  },
  summaryMetaWrap: {
    gap: 10,
  },
  summaryMetaCard: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    gap: 4,
  },
  summaryMetaLabel: {
    color: '#CFE8E1',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  summaryMetaValue: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  singleLayout: {
    gap: 18,
  },
  splitLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  mainColumn: {
    flex: 1.5,
  },
  sideColumn: {
    flex: 1,
    gap: 16,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 18,
    gap: 14,
  },
  sectionKicker: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
  },
  checklist: {
    gap: 10,
  },
  checkItem: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkDot: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkCopy: {
    flex: 1,
    gap: 4,
  },
  checkTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  checkBody: {
    fontSize: 13,
    lineHeight: 20,
  },
  planStack: {
    gap: 12,
  },
  dayCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 12,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayBadge: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  dayTitleBlock: {
    flex: 1,
  },
  dayTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '800',
  },
  dayTheme: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
  },
  hotelSuggestion: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  hotelSuggestionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  timeBlock: {
    gap: 6,
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  timeValue: {
    fontSize: 14,
    lineHeight: 21,
  },
  spotPillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  spotPill: {
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  spotPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
  },
  savedStack: {
    gap: 10,
  },
});
