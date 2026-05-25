import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

type Palette = (typeof Colors)['light'];

export function TravelRating({
  color,
  palette,
  rating,
  subtle,
}: {
  color?: string;
  palette: Palette;
  rating: number;
  subtle?: boolean;
}) {
  const starColor = color ?? palette.secondary;
  const labelColor = subtle ? palette.muted : palette.text;

  return (
    <View style={styles.row}>
      <View style={styles.stars}>
        {[0, 1, 2, 3, 4].map((index) => (
          <MaterialIcons key={index} color={starColor} name="star" size={14} />
        ))}
      </View>
      <Text style={[styles.label, { color: labelColor }]}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
