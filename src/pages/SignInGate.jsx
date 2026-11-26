import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function SignInGate() {
  const { signUp, logIn } = useAuth();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "signup") {
        await signUp({ username, email, password });
      } else {
        await logIn({ usernameOrEmail: username || email, password });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-accent transition hover:text-accent-hover"
      >
        ← Back to WealthCoin
      </Link>

      <h2 className="font-display text-2xl font-bold">
        {mode === "login" ? "Welcome back" : "Join the Circle"}
      </h2>
      <p className="mt-2 text-secondary">
        {mode === "login"
          ? "Sign in to join the community discussion."
          : "Create an account to post, reply,and list in the marketplace."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-secondary">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-secondary focus:border-accent/50 focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-secondary">
            {mode === "login" ? "Username or email" : "Email"}
          </label>
          <input
            type={mode === "login" ? "text" : "email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={mode === "login" ? "you@example.com or username" : "you@example.com"}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-secondary focus:border-accent/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-secondary">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pr-12 text-white placeholder:text-secondary focus:border-accent/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary transition hover:text-accent"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // eye-off icon — password visible, click to hide
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a13.45 13.45 0 0 1 5.07-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a13.67 13.67 0 0 1-1.7 2.32" />
                  <path d="M1 1l22 22" />
                </svg>
              ) : (
                // eye icon — password hidden, click to reveal
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-accent-hover">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-gold w-full min-h-[48px] rounded-xl px-5 py-3 font-bold disabled:opacity-50"
        >
          {submitting
            ? "One sec…"
            : mode === "login"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-secondary">
        {mode === "login" ? (
          <>
            No account yet?{" "}
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(""); }}
              className="font-bold text-accent transition hover:text-accent-hover"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              className="font-bold text-accent transition hover:text-accent-hover"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
