import React from "react";

const AuthPage = ({ isSignup, setIsSignup, authForm, setAuthForm, handleAuth, loading, error }) => {
  return (
    <main className="auth-page">
      <section className="auth-hero" aria-label="Slink authentication">
        <div className="auth-badge">Slink Access</div>
        <h1>{isSignup ? "Create your workspace" : "Welcome back"}</h1>
        <p>
          {isSignup
            ? "Start managing cleaner links, sharper campaigns, and simple click insights in one place."
            : "Sign in to shorten links, review performance, and keep your best URLs close at hand."}
        </p>

        <div className="auth-preview" aria-hidden="true">
          <div className="preview-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="preview-link">slink.io/summer-drop</div>
          <div className="preview-stats">
            <div>
              <strong>12.8k</strong>
              <span>Clicks</span>
            </div>
            <div>
              <strong>99%</strong>
              <span>Uptime</span>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-card-header">
          <span>{isSignup ? "Get started" : "Account login"}</span>
          <h2>{isSignup ? "Sign up" : "Sign in"}</h2>
          <p>{isSignup ? "Create an account in a few seconds." : "Use your email and password to continue."}</p>
        </div>

        <form className="auth-form" onSubmit={handleAuth}>
          {isSignup && (
            <label className="form-field">
              <span>Full name</span>
              <input
                type="text"
                placeholder="Alex Morgan"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                required
              />
            </label>
          )}

          <label className="form-field">
            <span>Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              required
            />
          </label>

          {error && <p className="auth-error">ERROR: {error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Processing..." : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button type="button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign in" : "Create an account"}
          </button>
        </p>
      </section>
    </main>
  );
};

export default AuthPage;
