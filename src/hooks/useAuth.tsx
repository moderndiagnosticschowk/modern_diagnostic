import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, type AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const ADMIN_MODE = import.meta.env.VITE_ADMIN_MODE;
  const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

  useEffect(() => {
    if (ADMIN_MODE === 'local') {
      const localFlag = localStorage.getItem('local_admin') === 'true';
      if (localFlag) {
        setIsAdmin(true);
        setUser({ id: 'local', email: 'localadmin@localhost' } as unknown as User);
      } else {
        setIsAdmin(false);
        setUser(null);
      }
      setSession(null);
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        checkAdminStatus(s.user.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    if (ADMIN_MODE === 'local') {
      setIsAdmin(localStorage.getItem('local_admin') === 'true');
      return;
    }
    try {
      const { data } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      setIsAdmin(!!data);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (ADMIN_MODE === 'local') {
      if (ADMIN_SECRET && password === ADMIN_SECRET) {
        localStorage.setItem('local_admin', 'true');
        setIsAdmin(true);
        setUser({ id: 'local', email: email || 'localadmin@localhost' } as unknown as User);
        return { error: null };
      }
      return { error: { message: 'Invalid admin secret', name: 'AuthApiError', status: 401 } as AuthError };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (ADMIN_MODE === 'local') {
      return { error: { message: 'Sign up disabled in local admin mode', name: 'AuthApiError', status: 400 } as AuthError };
    }
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signOut = async () => {
    if (ADMIN_MODE === 'local') {
      localStorage.removeItem('local_admin');
      setIsAdmin(false);
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
