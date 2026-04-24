import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [profile, setProfile] = useState(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === undefined) return; // still loading auth
    if (!session) {
      setProfile(null);
      return;
    }
    setProfile(undefined);
    supabase
      .from('profiles')
      .select('user_id, role')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error('Profile load error:', error);
          setProfile(null);
        } else {
          // If no profile row exists yet (shouldn't happen post-migration,
          // but stay defensive), treat as ambassador.
          setProfile(data ?? { user_id: session.user.id, role: 'ambassador' });
        }
      });
  }, [session]);

  const role = profile?.role ?? null;
  const isAdmin = role === 'admin';
  const isAmbassador = role === 'ambassador';
  const loading = session === undefined || (!!session && profile === undefined);

  return (
    <AuthContext.Provider value={{ session, profile, role, isAdmin, isAmbassador, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
