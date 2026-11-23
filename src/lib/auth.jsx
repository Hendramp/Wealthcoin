import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(authUser) {
    const { data: profile } = await supabase
      .from("hub_profiles")
      .select("id, user_id, username, email")
      .eq("user_id", authUser.id)
      .maybeSingle();

    if (!profile) {
      const { data: inserted } = await supabase
        .from("hub_profiles")
        .insert({
          user_id: authUser.id,
          username: authUser.user_metadata?.username || authUser.email?.split("@")[0],
          email: authUser.email,
        })
        .select("id, user_id, username, email")
        .single();

      if (inserted) {
        setUser({
          id: inserted.user_id,
          username: inserted.username,
          email: inserted.email,
        });
        setLoading(false);
        return;
      }
    }

    setUser({
      id: profile.user_id,
      username: profile.username,
      email: profile.email,
    });
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signUp({ username, email, password }) {
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: { data: { username: trimmedUsername } },
    });

    if (error) throw error;
    return { user: data.user };
  }

  async function logIn({ usernameOrEmail, password }) {
    const value = usernameOrEmail.trim().toLowerCase();

    let email = value;
    if (!value.includes("@")) {
      const { data: profile } = await supabase
        .from("hub_profiles")
        .select("email")
        .eq("username", value)
        .maybeSingle();
      if (!profile) throw new Error("No account found with that username.");
      email = profile.email;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error("Incorrect password. Try again.");
  }

  function logOut() {
    supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContext");
  return ctx;
}
