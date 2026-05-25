import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

type Palette = (typeof Colors)['light'];

const SKYLINE_BLOCKS = [52, 78, 44, 90, 58, 38, 86, 60, 94, 40, 70, 48, 88];

export function TravelBackdrop({
  children,
  palette,
}: PropsWithChildren<{ palette: Palette }>) {
  const skylineDrift = useRef(new Animated.Value(0)).current;
  const hazeFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const skylineLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(skylineDrift, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(skylineDrift, {
          toValue: 0,
          duration: 12000,
          useNativeDriver: true,
        }),
      ])
    );

    const hazeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(hazeFloat, {
          toValue: 1,
          duration: 5600,
          useNativeDriver: true,
        }),
        Animated.timing(hazeFloat, {
          toValue: 0,
          duration: 5600,
          useNativeDriver: true,
        }),
      ])
    );

    skylineLoop.start();
    hazeLoop.start();

    return () => {
      skylineLoop.stop();
      hazeLoop.stop();
    };
  }, [hazeFloat, skylineDrift]);

  const skylineTranslate = skylineDrift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -24],
  });

  const hazeTranslate = hazeFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const hazeOpacity = hazeFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.34],
  });

  return (
    <View style={[styles.canvas, { backgroundColor: palette.background }]}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.topGlow, { backgroundColor: palette.sky }]} />
        <View style={styles.coralOrb} />
        <View style={styles.mintOrb} />
        <Animated.View
          style={[
            styles.hazeBand,
            {
              backgroundColor: palette.surfaceAlt,
              opacity: hazeOpacity,
              transform: [{ translateY: hazeTranslate }],
            },
          ]}
        />
        <View style={[styles.sunHalo, { backgroundColor: palette.glow }]} />
        <View style={[styles.sunCore, { backgroundColor: palette.secondary }]} />
        <View style={[styles.route, { borderColor: palette.accent }]} />
        <View style={[styles.routeLoop, { borderColor: palette.primary }]} />
        <View style={[styles.routeDot, { backgroundColor: palette.secondary }]} />
        <View style={[styles.routeDotSecondary, { backgroundColor: palette.accent }]} />

        <Animated.View
          style={[
            styles.skylineWrap,
            {
              transform: [{ translateX: skylineTranslate }],
            },
          ]}>
          {SKYLINE_BLOCKS.map((height, index) => (
            <View
              key={`${height}-${index}`}
              style={[
                styles.building,
                {
                  height,
                  backgroundColor: index % 2 === 0 ? 'rgba(31,96,117,0.14)' : 'rgba(142,200,209,0.18)',
                },
              ]}
            />
          ))}
          {SKYLINE_BLOCKS.map((height, index) => (
            <View
              key={`clone-${height}-${index}`}
              style={[
                styles.building,
                {
                  height,
                  backgroundColor: index % 2 === 0 ? 'rgba(31,96,117,0.14)' : 'rgba(142,200,209,0.18)',
                },
              ]}
            />
          ))}
        </Animated.View>

        <View style={[styles.waveLarge, { backgroundColor: palette.surfaceAlt }]} />
        <View style={[styles.waveSmall, { backgroundColor: palette.surface }]} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  topGlow: {
    position: 'absolute',
    top: -140,
    left: -60,
    right: -70,
    height: 360,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    opacity: 0.52,
  },
  coralOrb: {
    position: 'absolute',
    top: 104,
    left: -46,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 170, 117, 0.22)',
  },
  mintOrb: {
    position: 'absolute',
    bottom: 148,
    right: 8,
    width: 210,
    height: 210,
    borderRadius: 999,
    backgroundColor: 'rgba(113, 225, 205, 0.16)',
  },
  hazeBand: {
    position: 'absolute',
    top: 84,
    left: 18,
    right: 18,
    height: 120,
    borderRadius: 30,
  },
  sunHalo: {
    position: 'absolute',
    top: 34,
    right: -24,
    width: 250,
    height: 250,
    borderRadius: 999,
    opacity: 0.3,
  },
  sunCore: {
    position: 'absolute',
    top: 108,
    right: 46,
    width: 94,
    height: 94,
    borderRadius: 999,
    opacity: 0.24,
  },
  route: {
    position: 'absolute',
    top: 92,
    left: 24,
    width: 136,
    height: 64,
    borderRadius: 999,
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.18,
    transform: [{ rotate: '-10deg' }],
  },
  routeLoop: {
    position: 'absolute',
    top: 182,
    right: 30,
    width: 104,
    height: 54,
    borderRadius: 999,
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.12,
    transform: [{ rotate: '16deg' }],
  },
  routeDot: {
    position: 'absolute',
    top: 102,
    left: 22,
    width: 10,
    height: 10,
    borderRadius: 999,
    opacity: 0.9,
  },
  routeDotSecondary: {
    position: 'absolute',
    top: 214,
    right: 28,
    width: 12,
    height: 12,
    borderRadius: 999,
    opacity: 0.62,
  },
  skylineWrap: {
    position: 'absolute',
    left: -12,
    right: -12,
    bottom: 138,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    opacity: 0.8,
  },
  building: {
    width: 26,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  waveLarge: {
    position: 'absolute',
    left: -80,
    right: -80,
    bottom: -46,
    height: 250,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    opacity: 0.78,
  },
  waveSmall: {
    position: 'absolute',
    left: -28,
    right: -28,
    bottom: -62,
    height: 170,
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
    opacity: 0.98,
  },
});
