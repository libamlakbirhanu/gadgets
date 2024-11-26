import { createContext, useContext, useEffect, useState } from "react";
import { Session, User, UserMetadata } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useError } from "./error-provider";

interface UserProfile {
  id: string;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
  updated_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: UserMetadata | undefined;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserMetadata | undefined>();
  const [loading, setLoading] = useState(true);
  const { handleError } = useError();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile when session changes
  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!user) {
          setUser(undefined);
          return;
        }

        const { data, error, status } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.sub)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUser(data);
        }
      } catch (error) {
        handleError(error, "Error loading user profile");
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [user, handleError]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(undefined);
    } catch (error) {
      handleError(error, "Error signing out");
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
