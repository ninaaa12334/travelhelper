import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Palette = (typeof Colors)['light'];

export function EmptyState({
  actionLabel,
  body,
  onAction,
  palette,
  title,
}: {
  actionLabel?: string;
  body: string;
  onAction?: () => void;
  palette: Palette;
  title: string;
}) {
  return (
    <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: palette.surfaceAlt }]}>
        <MaterialIcons color={palette.secondary} name="travel-explore" size={24} />
      </View>
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      <Text style={[styles.body, { color: palette.muted }]}>{body}</Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: palette.secondary,
              opacity: pressed ? 0.88 : 1,
            },
          ]}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 26,
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    marginTop: 4,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  buttonText: {
    color: '#132936',
    fontSize: 14,
    fontWeight: '800',
  },
});
