import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { registerForPushNotificationsAsync } from '@/shared/lib/notifications';
import { markAuthSessionReady, supabase } from '@/shared/lib/supabase';

export type AuthSessionValue = {
  session: Session | null;
  isRestoringSession: boolean;
  /** Inverse of isRestoringSession — kept for existing call sites. */
  isReady: boolean;
  isAuthenticated: boolean;
  userId: string | null;
};

const AuthContext = createContext<AuthSessionValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

async function savePushToken(userId: string) {
  try {
    const token = await registerForPushNotificationsAsync();
    if (!token) {
      return;
    }

    const { error } = await supabase.from('push_tokens').upsert(
      {
        user_id: userId,
        token,
      },
      { onConflict: 'user_id' },
    );

    if (error) {
      console.warn('Failed to save push token', error.message);
    }
  } catch (error) {
    console.warn('Failed to save push token', error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }
        setSession(data.session);
      })
      .catch((error) => {
        console.warn('Failed to restore auth session', error);
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }
        setIsRestoringSession(false);
        markAuthSessionReady();
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // Update session only — do not clear isRestoringSession here.
      // That flag must wait for getSession() so Stack.Protected does not
      // briefly treat a cold start as signed-out (REMOVE_ROUTES /login flash).
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (!userId || isRestoringSession) {
      return;
    }

    void savePushToken(userId);
  }, [userId, isRestoringSession]);

  const value = useMemo<AuthSessionValue>(
    () => ({
      session,
      isRestoringSession,
      isReady: !isRestoringSession,
      isAuthenticated: session != null,
      userId,
    }),
    [session, isRestoringSession, userId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error('useAuthSession must be used within AuthProvider');
  }

  return context;
}
