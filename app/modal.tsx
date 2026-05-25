import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TravelBackdrop } from '@/components/travel-backdrop';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ModalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <TravelBackdrop palette={palette}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, { backgroundColor: palette.primary, borderColor: palette.border }]}>
            <MaterialIcons color="#F8F4EC" name="public" size={28} />
            <Text style={styles.heroTitle}>How this travel helper works</Text>
            <Text style={styles.heroBody}>
              This version uses a curated starter dataset of destinations, hotels, restaurants, and
              experiences so the app can work immediately without external APIs.
            </Text>
          </View>

          <InfoBlock
            body="You can search a destination or describe the style of trip you want. The app matches those choices against destination profiles."
            palette={palette}
            title="1. Match the trip vibe"
          />
          <InfoBlock
            body="The ratings you see are sample seed ratings inside the app, not live ratings pulled from Google, Booking, or Tripadvisor."
            palette={palette}
            title="2. Ratings are curated samples"
          />
          <InfoBlock
            body="The Explore and Plan tabs then turn those suggestions into saved places, itinerary ideas, and trip-prep steps."
            palette={palette}
            title="3. Build the trip plan"
          />

          <View style={[styles.footerCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <Text style={[styles.footerTitle, { color: palette.text }]}>Good next upgrade</Text>
            <Text style={[styles.footerBody, { color: palette.muted }]}>
              If you want real-time places, reviews, and availability next, we should connect a live
              travel or maps API and add a small backend layer for destination search.
            </Text>
            <Link href="/(tabs)" style={[styles.link, { color: palette.secondary }]}>
              Back to travel search
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TravelBackdrop>
  );
}

function InfoBlock({
  body,
  palette,
  title,
}: {
  body: string;
  palette: (typeof Colors)['light'];
  title: string;
}) {
  return (
    <View style={[styles.infoBlock, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <Text style={[styles.infoTitle, { color: palette.text }]}>{title}</Text>
      <Text style={[styles.infoBody, { color: palette.muted }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
    gap: 12,
  },
  heroTitle: {
    color: '#F8F4EC',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  heroBody: {
    color: '#D8ECE7',
    fontSize: 15,
    lineHeight: 23,
  },
  infoBlock: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    gap: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  infoBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  footerCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    gap: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  footerBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  link: {
    fontSize: 14,
    fontWeight: '800',
  },
});
