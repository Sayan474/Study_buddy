import { useMemo, useState } from "react";
import { login, signup } from "../api";

const initialLogin = { email: "", password: "" };
const initialSignup = { username: "", email: "", password: "" };

export default function AuthPanel({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const heading = useMemo(
    () => (mode === "login" ? "Welcome Back, Scholar" : "Create Your Scholar Profile"),
    [mode]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response =
        mode === "login"
          ? await login(loginForm)
          : await signup(signupForm);
      onAuthSuccess(response.user); 
      if (mode === "signup") {
        setSignupForm(initialSignup);
      }
      if (mode === "login") {
        setLoginForm(initialLogin);
      }
    } catch (requestError) {
      setError(requestError.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-tabs">
        <button
          type="button"
          className={mode === "login" ? "tab active" : "tab"}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={mode === "signup" ? "tab active" : "tab"}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      <h1>{heading}</h1>
      <p className="subtitle">
        Your AI study companion for concepts, problem-solving, and exam prep.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {mode === "signup" && (
          <label>
            Username
            <input
              type="text"
              required
              minLength={3}
              value={signupForm.username}
              onChange={(event) =>
                setSignupForm((prev) => ({ ...prev, username: event.target.value }))
              }
              placeholder="Choose a unique username"
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            required
            value={mode === "login" ? loginForm.email : signupForm.email}
            onChange={(event) => {
              const value = event.target.value;
              if (mode === "login") {
                setLoginForm((prev) => ({ ...prev, email: value }));
              } else {
                setSignupForm((prev) => ({ ...prev, email: value }));
              }
            }}
            placeholder="student@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={mode === "login" ? loginForm.password : signupForm.password}
            onChange={(event) => {
              const value = event.target.value;
              if (mode === "login") {
                setLoginForm((prev) => ({ ...prev, password: value }));
              } else {
                setSignupForm((prev) => ({ ...prev, password: value }));
              }
            }}
            placeholder="At least 6 characters"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="action-btn" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Enter Lab" : "Create Account"}
        </button>
      </form>

      <div className="auth-footnote">
        <span>Physics</span>
        <span>Chemistry</span>
        <span>Math</span>
        <span>Computer Science</span>
      </div>
    </section>
  );
}
