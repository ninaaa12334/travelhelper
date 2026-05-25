/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#1F6075';
const tintColorDark = '#1F6075';

export const Colors = {
  light: {
    text: '#173241',
    background: '#F4F8FB',
    tint: tintColorLight,
    icon: '#67818B',
    tabIconDefault: '#8FA1AA',
    tabIconSelected: tintColorLight,
    surface: '#FFFFFF',
    surfaceAlt: '#EAF3F7',
    border: '#D7E3E8',
    primary: '#1F6075',
    secondary: '#F1B262',
    accent: '#8EC8D1',
    muted: '#5B7480',
    success: '#2C8A68',
    sky: '#DCEFF7',
    sand: '#F6E1C6',
    glow: '#FFF1C8',
  },
  dark: {
    text: '#173241',
    background: '#F4F8FB',
    tint: tintColorDark,
    icon: '#67818B',
    tabIconDefault: '#8FA1AA',
    tabIconSelected: tintColorDark,
    surface: '#FFFFFF',
    surfaceAlt: '#EAF3F7',
    border: '#D7E3E8',
    primary: '#1F6075',
    secondary: '#F1B262',
    accent: '#8EC8D1',
    muted: '#5B7480',
    success: '#2C8A68',
    sky: '#DCEFF7',
    sand: '#F6E1C6',
    glow: '#FFF1C8',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
