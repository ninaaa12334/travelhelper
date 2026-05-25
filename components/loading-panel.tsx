import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Palette = (typeof Colors)['light'];

export function LoadingPanel({
  body,
  palette,
  title,
}: {
  body: string;
  palette: Palette;
  title: string;
}) {
  return (
    <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <ActivityIndicator color={palette.primary} size="large" />
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      <Text style={[styles.body, { color: palette.muted }]}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 320,
  },
});
