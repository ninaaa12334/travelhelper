import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlobalSearchSuggestion } from '@/constants/travel-data';
import { Colors, Fonts } from '@/constants/theme';

type Palette = (typeof Colors)['light'];

export function SearchSuggestionList({
  onSelect,
  palette,
  suggestions,
}: {
  onSelect: (suggestion: GlobalSearchSuggestion) => void;
  palette: Palette;
  suggestions: GlobalSearchSuggestion[];
}) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: palette.text }]}>Search the world</Text>
        <Text style={[styles.subtitle, { color: palette.muted }]}>Cities with detailed plans plus a global country directory</Text>
      </View>

      <View style={styles.stack}>
        {suggestions.map((suggestion) => {
          const isCity = suggestion.kind === 'city';

          return (
            <Pressable
              key={suggestion.id}
              onPress={() => onSelect(suggestion)}
              style={({ pressed }) => [
                styles.row,
                {
                  backgroundColor: isCity ? '#FFF7EA' : '#F1F8FB',
                  borderColor: isCity ? '#F4D2A2' : '#CDE4EC',
                  opacity: pressed ? 0.84 : 1,
                },
              ]}>
              <View style={[styles.iconWrap, { backgroundColor: isCity ? '#F1B262' : '#1F6075' }]}>
                <MaterialIcons color="#FFFFFF" name={isCity ? 'location-city' : 'public'} size={16} />
              </View>

              <View style={styles.copy}>
                <View style={styles.labelRow}>
                  <Text style={[styles.label, { color: palette.text }]}>{suggestion.label}</Text>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: isCity ? 'rgba(241,178,98,0.18)' : 'rgba(31,96,117,0.14)' },
                    ]}>
                    <Text style={[styles.badgeText, { color: isCity ? '#A86416' : '#1F6075' }]}>
                      {suggestion.kind === 'city' ? 'City' : 'Country'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.description, { color: palette.muted }]}>{suggestion.description}</Text>
              </View>

              <MaterialIcons color={palette.primary} name="arrow-forward-ios" size={16} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 14,
    gap: 12,
  },
  header: {
    gap: 2,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
  },
  stack: {
    gap: 10,
  },
  row: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
  },
});
