import * as FileSystem from 'expo-file-system/legacy';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type RegisteredUser = {
  name: string;
  email: string;
  password: string;
};

type SessionUser = {
  name: string;
  email: string;
};

type SessionState = {
  registeredUser: RegisteredUser | null;
  session: SessionUser | null;
};

type SessionContextValue = {
  hydrated: boolean;
  isAuthenticated: boolean;
  hasAccount: boolean;
  accountName: string | null;
  session: SessionUser | null;
  signup: (input: RegisteredUser) => string | null;
  login: (input: { email: string; password: string }) => string | null;
  logout: () => void;
};

const STORAGE_URI = FileSystem.documentDirectory
  ? `${FileSystem.documentDirectory}travel-helper-session.json`
  : null;

const DEFAULT_STATE: SessionState = {
  registeredUser: null,
  session: null,
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(DEFAULT_STATE);
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
        const parsed = JSON.parse(contents) as Partial<SessionState>;

        if (!active) {
          return;
        }

        setState({
          registeredUser: parsed.registeredUser ?? null,
          session: parsed.session ?? null,
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

  const signup = (input: RegisteredUser) => {
    const name = input.name.trim();
    const email = normalizeEmail(input.email);
    const password = input.password.trim();

    if (!name || !email || !password) {
      return 'Please fill in your name, email, and password.';
    }

    if (!email.includes('@')) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 4) {
      return 'Use at least 4 characters for the password.';
    }

    setState({
      registeredUser: {
        name,
        email,
        password,
      },
      session: {
        name,
        email,
      },
    });

    return null;
  };

  const login = (input: { email: string; password: string }) => {
    const email = normalizeEmail(input.email);
    const password = input.password.trim();

    if (!state.registeredUser) {
      return 'No local account exists yet on this device. Please sign up first.';
    }

    if (state.registeredUser.email !== email || state.registeredUser.password !== password) {
      return 'That email or password does not match the saved local account.';
    }

    setState((current) => ({
      ...current,
      session: {
        name: current.registeredUser?.name ?? 'Traveler',
        email: current.registeredUser?.email ?? email,
      },
    }));

    return null;
  };

  const logout = () => {
    setState((current) => ({
      ...current,
      session: null,
    }));
  };

  return (
    <SessionContext.Provider
      value={{
        hydrated,
        isAuthenticated: state.session !== null,
        hasAccount: state.registeredUser !== null,
        accountName: state.registeredUser?.name ?? null,
        session: state.session,
        signup,
        login,
        logout,
      }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used inside SessionProvider');
  }

  return context;
}
