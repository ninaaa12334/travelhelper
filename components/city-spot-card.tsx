import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TravelRating } from '@/components/travel-rating';
import { TravelPlace } from '@/constants/travel-data';
import { Colors } from '@/constants/theme';

type Palette = (typeof Colors)['light'];

const CATEGORY_META: Record<
  TravelPlace['category'],
  { icon: keyof typeof MaterialIcons.glyphMap; label: string }
> = {
  hotel: { icon: 'hotel', label: 'Hotel' },
  restaurant: { icon: 'restaurant', label: 'Restaurant' },
  monument: { icon: 'account-balance', label: 'Monument' },
  museum: { icon: 'museum', label: 'Museum' },
  park: { icon: 'park', label: 'Park' },
  activity: { icon: 'explore', label: 'Activity' },
};

export function CitySpotCard({
  onToggleSave,
  palette,
  place,
  saved,
}: {
  onToggleSave?: (id: string) => void;
  palette: Palette;
  place: TravelPlace;
  saved?: boolean;
}) {
  const meta = CATEGORY_META[place.category];

  return (
    <View style={[styles.card, { backgroundColor: palette.background, borderColor: palette.border }]}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <View style={[styles.iconWrap, { backgroundColor: palette.surfaceAlt }]}>
            <MaterialIcons color={palette.secondary} name={meta.icon} size={16} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.categoryLabel, { color: palette.muted }]}>{meta.label}</Text>
            <Text style={[styles.name, { color: palette.text }]}>{place.name}</Text>
          </View>
        </View>

        {onToggleSave ? (
          <Pressable onPress={() => onToggleSave(place.id)}>
            <MaterialIcons
              color={saved ? palette.secondary : palette.muted}
              name={saved ? 'bookmark' : 'bookmark-border'}
              size={18}
            />
          </Pressable>
        ) : null}
      </View>

      <Text style={[styles.body, { color: palette.muted }]}>{place.why}</Text>

      <View style={styles.metaRow}>
        <TravelRating palette={palette} rating={place.rating} subtle />
        <Text style={[styles.metaText, { color: palette.primary }]}>{place.priceGuide}</Text>
      </View>

      <View style={styles.metaWrap}>
        <View style={[styles.metaPill, { backgroundColor: palette.surface }]}>
          <MaterialIcons color={palette.secondary} name="place" size={14} />
          <Text style={[styles.metaPillText, { color: palette.text }]}>{place.neighborhood}</Text>
        </View>
        <View style={[styles.metaPill, { backgroundColor: palette.surface }]}>
          <MaterialIcons color={palette.secondary} name="payments" size={14} />
          <Text style={[styles.metaPillText, { color: palette.text }]}>{place.estimatedCost}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  copy: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '800',
  },
  body: {
    fontSize: 13,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metaWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
