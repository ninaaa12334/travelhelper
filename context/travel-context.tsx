import * as FileSystem from 'expo-file-system/legacy';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import {
  TravelBudgetId,
  TravelInterestId,
  TravelPaceId,
  TripLengthId,
} from '@/constants/cities-data';
import {
  ChecklistItem,
  DestinationRecommendation,
  TravelBundle,
  TravelPlace,
  TravelPlanDay,
  TravelPreferences,
  buildPreparationChecklist,
  buildRecommendations,
  buildTripPlan,
  BUDGET_OPTIONS,
  defaultPreferences,
  getPlaceById,
  PACE_OPTIONS,
  STYLE_OPTIONS,
  TRIP_LENGTH_OPTIONS,
} from '@/constants/travel-data';

type TravelContextValue = {
  preferences: TravelPreferences;
  recommendations: TravelBundle;
  primaryDestination?: DestinationRecommendation;
  savedDestinations: DestinationRecommendation[];
  savedPlaces: TravelPlace[];
  tripPlan: TravelPlanDay[];
  checklist: ChecklistItem[];
  completionPercent: number;
  hasIntent: boolean;
  hydrated: boolean;
  setTravelerName: (value: string) => void;
  setDestinationQuery: (value: string) => void;
  setBudget: (value: TravelBudgetId) => void;
  setPace: (value: TravelPaceId) => void;
  setTripLength: (value: TripLengthId) => void;
  setStyles: (values: TravelInterestId[]) => void;
  toggleStyle: (value: TravelInterestId) => void;
  setPrimaryDestination: (id: string) => void;
  toggleSavedDestination: (id: string) => void;
  toggleSavedPlace: (id: string) => void;
  resetPlanner: () => void;
  savedDestinationIds: string[];
  savedPlaceIds: string[];
};

type TravelState = {
  preferences: TravelPreferences;
  primaryDestinationId: string | null;
  savedDestinationIds: string[];
  savedPlaceIds: string[];
};

const TravelContext = createContext<TravelContextValue | undefined>(undefined);
const STORAGE_URI = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}travel-helper-state.json`
  : null;

const DEFAULT_STATE: TravelState = {
  preferences: defaultPreferences,
  primaryDestinationId: null,
  savedDestinationIds: [],
  savedPlaceIds: [],
};

const VALID_STYLE_IDS = new Set(STYLE_OPTIONS.map((option) => option.id as TravelInterestId));
const VALID_BUDGET_IDS = new Set(BUDGET_OPTIONS.map((option) => option.id as TravelBudgetId));
const VALID_PACE_IDS = new Set(PACE_OPTIONS.map((option) => option.id as TravelPaceId));
const VALID_TRIP_IDS = new Set(TRIP_LENGTH_OPTIONS.map((option) => option.id as TripLengthId));

function normalizeTripLength(value?: string): TripLengthId {
  if (!value) {
    return defaultPreferences.tripLength;
  }

  if (VALID_TRIP_IDS.has(value as TripLengthId)) {
    return value as TripLengthId;
  }

  if (value === '10days') {
    return '7days';
  }

  return defaultPreferences.tripLength;
}

function toggleValue<T extends string>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function TravelProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TravelState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    const loadState = async () => {
      if (!STORAGE_URI) {
        setHydrated(true);
        return;
      }

      try {
        const info = await FileSystem.getInfoAsync(STORAGE_URI);

        if (!info.exists) {
          return;
        }

        const contents = await FileSystem.readAsStringAsync(STORAGE_URI);
        const parsed = JSON.parse(contents) as Partial<TravelState>;

        if (!active) {
          return;
        }

        setState({
          ...DEFAULT_STATE,
          ...parsed,
          preferences: {
            ...defaultPreferences,
            ...parsed.preferences,
            budget: parsed.preferences?.budget && VALID_BUDGET_IDS.has(parsed.preferences.budget as TravelBudgetId)
              ? (parsed.preferences.budget as TravelBudgetId)
              : defaultPreferences.budget,
            pace: parsed.preferences?.pace && VALID_PACE_IDS.has(parsed.preferences.pace as TravelPaceId)
              ? (parsed.preferences.pace as TravelPaceId)
              : defaultPreferences.pace,
            tripLength: normalizeTripLength(parsed.preferences?.tripLength),
            styles: (parsed.preferences?.styles ?? []).filter(
              (style): style is TravelInterestId => VALID_STYLE_IDS.has(style as TravelInterestId)
            ),
          },
          savedDestinationIds: parsed.savedDestinationIds ?? [],
          savedPlaceIds: parsed.savedPlaceIds ?? [],
        });
      } catch {
      } finally {
        if (active) {
          setHydrated(true);
        }
      }
    };

    loadState();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !STORAGE_URI) {
      return;
    }

    FileSystem.writeAsStringAsync(STORAGE_URI, JSON.stringify(state)).catch(() => {});
  }, [hydrated, state]);

  const recommendations = buildRecommendations(state.preferences);
  const primaryDestination =
    (state.primaryDestinationId
      ? recommendations.destinations.find((destination) => destination.id === state.primaryDestinationId)
      : undefined) ?? recommendations.destinations[0];
  const tripPlan = buildTripPlan(primaryDestination, state.preferences.tripLength);
  const checklist = buildPreparationChecklist(primaryDestination, state.preferences);
  const savedDestinations = state.savedDestinationIds
    .map((id) => recommendations.destinations.find((destination) => destination.id === id))
    .filter((destination): destination is DestinationRecommendation => destination !== undefined);
  const savedPlaces = state.savedPlaceIds
    .map((id) => getPlaceById(id))
    .filter((place): place is TravelPlace => place !== undefined);
  const hasIntent =
    state.preferences.styles.length > 0 || state.preferences.destinationQuery.trim().length > 0;
  const completionPercent = Math.min(
    100,
    30 +
      state.preferences.styles.length * 10 +
      (state.preferences.destinationQuery.trim().length > 0 ? 20 : 0) +
      (state.preferences.travelerName.trim().length > 0 ? 10 : 0)
  );

  const setTravelerName = (value: string) => {
    setState((current) => ({
      ...current,
      preferences: {
        ...current.preferences,
        travelerName: value,
      },
    }));
  };

  const setDestinationQuery = (value: string) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: null,
      preferences: {
        ...current.preferences,
        destinationQuery: value,
      },
    }));
  };

  const setBudget = (value: TravelBudgetId) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: null,
      preferences: {
        ...current.preferences,
        budget: value,
      },
    }));
  };

  const setPace = (value: TravelPaceId) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: null,
      preferences: {
        ...current.preferences,
        pace: value,
      },
    }));
  };

  const setTripLength = (value: TripLengthId) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: null,
      preferences: {
        ...current.preferences,
        tripLength: value,
      },
    }));
  };

  const setStyles = (values: TravelInterestId[]) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: null,
      preferences: {
        ...current.preferences,
        styles: values.filter((value) => VALID_STYLE_IDS.has(value)),
      },
    }));
  };

  const toggleStyle = (value: TravelInterestId) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: null,
      preferences: {
        ...current.preferences,
        styles: toggleValue(current.preferences.styles, value),
      },
    }));
  };

  const setPrimaryDestination = (id: string) => {
    setState((current) => ({
      ...current,
      primaryDestinationId: id,
    }));
  };

  const toggleSavedDestination = (id: string) => {
    setState((current) => ({
      ...current,
      savedDestinationIds: toggleValue(current.savedDestinationIds, id),
    }));
  };

  const toggleSavedPlace = (id: string) => {
    setState((current) => ({
      ...current,
      savedPlaceIds: toggleValue(current.savedPlaceIds, id),
    }));
  };

  const resetPlanner = () => {
    setState({
      ...DEFAULT_STATE,
      preferences: {
        ...defaultPreferences,
        travelerName: state.preferences.travelerName,
      },
    });
  };

  return (
    <TravelContext.Provider
      value={{
        preferences: state.preferences,
        recommendations,
        primaryDestination,
        savedDestinations,
        savedPlaces,
        tripPlan,
        checklist,
        completionPercent,
        hasIntent,
        hydrated,
        setTravelerName,
        setDestinationQuery,
        setBudget,
        setPace,
        setTripLength,
        setStyles,
        toggleStyle,
        setPrimaryDestination,
        toggleSavedDestination,
        toggleSavedPlace,
        resetPlanner,
        savedDestinationIds: state.savedDestinationIds,
        savedPlaceIds: state.savedPlaceIds,
      }}>
      {children}
    </TravelContext.Provider>
  );
}

export function useTravelPlanner() {
  const context = useContext(TravelContext);

  if (!context) {
    throw new Error('useTravelPlanner must be used inside TravelProvider');
  }

  return context;
}
