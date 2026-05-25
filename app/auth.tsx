import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { startTransition, useEffect, useState } from 'react';

import { TravelBackdrop } from '@/components/travel-backdrop';
import { buildRecommendations, defaultPreferences } from '@/constants/travel-data';
import { Colors, Fonts } from '@/constants/theme';
import { useSession } from '@/context/session-context';
import { useTravelPlanner } from '@/context/travel-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

type AuthMode = 'signup' | 'login';
type Palette = (typeof Colors)['light'];

const AUTH_DESTINATION = buildRecommendations(defaultPreferences).destinations[2];

function normalizeMode(mode?: string): AuthMode {
  return mode === 'login' ? 'login' : 'signup';
}

export default function AuthScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const params = useLocalSearchParams<{ mode?: string; query?: string }>();
  const {
    accountName,
    hasAccount,
    hydrated,
    isAuthenticated,
    login,
    session,
    signup,
  } = useSession();
  const { setDestinationQuery, setTravelerName } = useTravelPlanner();
  const [mode, setMode] = useState<AuthMode>(normalizeMode(params.mode));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const queuedSearch = typeof params.query === 'string' ? params.query.trim() : '';

  useEffect(() => {
    setMode(normalizeMode(params.mode));
  }, [params.mode]);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [hydrated, isAuthenticated]);

  const submitLabel = mode === 'signup' ? 'Create account' : 'Log in';
  const authTitle = mode === 'signup' ? 'Start your travel profile' : 'Welcome back';
  const authBody =
    mode === 'signup'
      ? 'Create a quick local account so your trip brief, saved places, and itinerary stay with you on this device.'
      : 'Sign in to reopen your saved travel brief and continue building your trip.';

  const handleSubmit = () => {
    const message =
      mode === 'signup'
        ? signup({ name, email, password })
        : login({
            email,
            password,
          });

    if (message) {
      setError(message);
      return;
    }

    const travelerName = mode === 'signup' ? name.trim() : accountName ?? session?.name ?? 'Traveler';
    setTravelerName(travelerName);

    if (queuedSearch) {
      setDestinationQuery(queuedSearch);
    }

    setError(null);
    router.replace(queuedSearch ? '/(tabs)/explore' : '/(tabs)');
  };

  const switchMode = (nextMode: AuthMode) => {
    setError(null);
    startTransition(() => {
      setMode(nextMode);
    });
  };

  if (!hydrated) {
    return (
      <TravelBackdrop palette={palette}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={palette.primary} size="large" />
            <Text style={[styles.loadingText, { color: palette.muted }]}>Loading your login space...</Text>
          </View>
        </SafeAreaView>
      </TravelBackdrop>
    );
  }

  return (
    <TravelBackdrop palette={palette}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Pressable
              onPress={() => router.replace('/')}
              style={({ pressed }) => [
                styles.backButton,
                {
                  borderColor: palette.border,
                  backgroundColor: palette.surface,
                  opacity: pressed ? 0.88 : 1,
                },
              ]}>
              <MaterialIcons color={palette.primary} name="arrow-back" size={18} />
              <Text style={[styles.backButtonText, { color: palette.primary }]}>Back to welcome</Text>
            </Pressable>

            <View style={[styles.heroCard, { backgroundColor: palette.primary, borderColor: palette.border }]}>
              <Image contentFit="cover" source={{ uri: AUTH_DESTINATION.image }} style={styles.heroImage} transition={700} />
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={[styles.heroPill, { backgroundColor: 'rgba(255,255,255,0.14)' }]}>
                  <MaterialIcons color="#FFF9F0" name="public" size={16} />
                  <Text style={styles.heroPillText}>Travel Helper</Text>
                </View>
                <Text style={styles.heroTitle}>Sign in once, then plan beautifully.</Text>
                <Text style={styles.heroBody}>
                  Search by city or let the app recommend the right destination for your style, budget, and
                  trip length. Then turn it into a realistic daily plan.
                </Text>
              </View>
            </View>

            <View style={[styles.formCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <View style={[styles.modeToggle, { backgroundColor: palette.background, borderColor: palette.border }]}>
                <ModeButton
                  active={mode === 'signup'}
                  label="Sign up"
                  onPress={() => switchMode('signup')}
                  palette={palette}
                />
                <ModeButton
                  active={mode === 'login'}
                  label="Log in"
                  onPress={() => switchMode('login')}
                  palette={palette}
                />
              </View>

              <View>
                <Text style={[styles.formTitle, { color: palette.text }]}>{authTitle}</Text>
                <Text style={[styles.formBody, { color: palette.muted }]}>{authBody}</Text>
              </View>

              {queuedSearch ? (
                <View style={[styles.noticeCard, { backgroundColor: palette.background, borderColor: palette.border }]}>
                  <MaterialIcons color={palette.primary} name="travel-explore" size={18} />
                  <Text style={[styles.noticeText, { color: palette.text }]}>
                    Your search for <Text style={styles.noticeStrong}>{queuedSearch}</Text> is ready. After you sign in,
                    the app will open your destination matches.
                  </Text>
                </View>
              ) : null}

              {mode === 'signup' ? (
                <>
                  <FieldLabel icon="person-outline" label="Your name" palette={palette} />
                  <InputShell icon="badge" palette={palette}>
                    <TextInput
                      autoCapitalize="words"
                      onChangeText={setName}
                      placeholder="Nina"
                      placeholderTextColor={palette.tabIconDefault}
                      style={[styles.input, { color: palette.text }]}
                      value={name}
                    />
                  </InputShell>
                </>
              ) : null}

              <FieldLabel icon="mail-outline" label="Email" palette={palette} />
              <InputShell icon="alternate-email" palette={palette}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={palette.tabIconDefault}
                  style={[styles.input, { color: palette.text }]}
                  value={email}
                />
              </InputShell>

              <FieldLabel icon="lock-outline" label="Password" palette={palette} />
              <InputShell icon="lock" palette={palette}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setPassword}
                  placeholder="At least 4 characters"
                  placeholderTextColor={palette.tabIconDefault}
                  secureTextEntry
                  style={[styles.input, { color: palette.text }]}
                  value={password}
                />
              </InputShell>

              {error ? (
                <View style={[styles.noticeCard, { backgroundColor: palette.background, borderColor: palette.border }]}>
                  <MaterialIcons color={palette.secondary} name="info-outline" size={18} />
                  <Text style={[styles.noticeText, { color: palette.text }]}>{error}</Text>
                </View>
              ) : null}

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: palette.secondary, opacity: pressed ? 0.88 : 1 },
                ]}>
                <Text style={styles.primaryButtonText}>{submitLabel}</Text>
                <MaterialIcons color="#132936" name="arrow-forward" size={18} />
              </Pressable>

              <View style={[styles.noteCard, { backgroundColor: palette.background, borderColor: palette.border }]}>
                <MaterialIcons color={palette.primary} name="verified-user" size={18} />
                <Text style={[styles.noteText, { color: palette.muted }]}>
                  {hasAccount
                    ? `This device already has a saved local account${accountName ? ` for ${accountName}` : ''}.`
                    : 'This starter version keeps one local account on the device so the app works without a backend yet.'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TravelBackdrop>
  );
}

function ModeButton({
  active,
  label,
  onPress,
  palette,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  palette: Palette;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.modeButton,
        {
          backgroundColor: active ? palette.primary : 'transparent',
          opacity: pressed ? 0.9 : 1,
        },
      ]}>
      <Text style={[styles.modeButtonText, { color: active ? '#FFF9F0' : palette.muted }]}>{label}</Text>
    </Pressable>
  );
}

function FieldLabel({
  icon,
  label,
  palette,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  palette: Palette;
}) {
  return (
    <View style={styles.fieldLabelRow}>
      <MaterialIcons color={palette.secondary} name={icon} size={16} />
      <Text style={[styles.fieldLabel, { color: palette.muted }]}>{label}</Text>
    </View>
  );
}

function InputShell({
  children,
  icon,
  palette,
}: {
  children: React.ReactNode;
  icon: keyof typeof MaterialIcons.glyphMap;
  palette: Palette;
}) {
  return (
    <View style={[styles.inputShell, { backgroundColor: palette.background, borderColor: palette.border }]}>
      <MaterialIcons color={palette.tabIconDefault} name={icon} size={18} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 28,
  },
  loadingText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 44,
    gap: 18,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 32,
    minHeight: 244,
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(42, 100, 118, 0.52)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    gap: 10,
  },
  heroPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroPillText: {
    color: '#FFF9F0',
    fontSize: 13,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#FFF9F0',
    fontFamily: Fonts.serif,
    fontSize: 35,
    lineHeight: 39,
    fontWeight: '700',
    maxWidth: '92%',
  },
  heroBody: {
    color: '#E3F3F0',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: '92%',
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 18,
    gap: 14,
  },
  modeToggle: {
    borderWidth: 1,
    borderRadius: 999,
    padding: 4,
    flexDirection: 'row',
    gap: 6,
  },
  modeButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 11,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 13,
    fontWeight: '800',
  },
  formTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 27,
    lineHeight: 31,
    fontWeight: '800',
    marginBottom: 6,
  },
  formBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  inputShell: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  noticeCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
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
  primaryButton: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#A45E24',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#132936',
    fontSize: 15,
    fontWeight: '800',
  },
  noteCard: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
});
