import { type User } from "@supabase/supabase-js";
import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabase-client";

interface AuthContextType {
  user: User | null;
  signInWithGitHub: () => void;
  signInWithGoogle: () => void;
  signInWithDiscord: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signUpWithEmail: (
    email: string,
    password: string,
    user_name?: string,
    avatar_url?: string
  ) => Promise<{ error: any }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGitHub = () => supabase.auth.signInWithOAuth({ provider: "github" });
  const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider: "google" });
  const signInWithDiscord = () => supabase.auth.signInWithOAuth({ provider: "discord" });

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    user_name?: string,
    avatar_url?: string
  ) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { 
          user_name,
          avatar_url
        } 
      },
    });

    if (signUpError) return { error: signUpError };

    const user = signUpData?.user;
    if (!user) return { error: new Error("User not created") };

    return { error: null };
  };

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGitHub,
        signInWithGoogle,
        signInWithDiscord,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};