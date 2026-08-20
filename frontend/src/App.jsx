import React, { useState, useEffect } from "react";
import "./App.css";
import * as authService from "./api/auth";
import * as urlService from "./api/url";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";

// Short links are resolved by the Express server, not the Vite dev server.
const SHORT_LINK_BASE = import.meta.env.DEV
  ? "http://localhost:8000"
  : window.location.origin;

function App() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [history, setHistory] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await urlService.getHistory();
      setHistory(response.data.urls);
      setIsLogged(true);
    } catch (err) {
      setIsLogged(false);
      setHistory([]);
    } finally {
      setCheckingSession(false);
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");

    try {
      const response = await urlService.createShortUrl(url);
      setShortId(response.data.id);
      setHistory(response.data.urls);
      setUrl("");
    } catch (err) {
      setError("Failed to shorten URL. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        await authService.signup(authForm);
        await fetchHistory();
      } else {
        const response = await authService.login(authForm);
        setHistory(response.data.urls || []);
        setIsLogged(true);
      }
      setAuthForm({ email: "", password: "", name: "" });
      setShowAuth(false);
    } catch (err) {
      setError(err.response?.data?.error || "Auth failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Still clear local state even if the request fails
    }
    setIsLogged(false);
    setHistory([]);
    setShortId("");
    setShowAuth(false);
  };

  const openLogin = () => {
    setIsSignup(false);
    setShowAuth(true);
    setError("");
  };

  const openSignup = () => {
    setIsSignup(true);
    setShowAuth(true);
    setError("");
  };

  if (checkingSession) {
    return (
      <div className="App">
        <Navbar isLogged={false} onLogin={openLogin} onSignup={openSignup} onLogout={handleLogout} />
        <main className="landing-container">
          <p className="subtitle">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar
        isLogged={isLogged}
        onLogin={openLogin}
        onSignup={openSignup}
        onLogout={handleLogout}
      />

      {!isLogged ? (
        !showAuth ? (
          <LandingPage onGetStarted={openSignup} />
        ) : (
          <AuthPage
            isSignup={isSignup}
            setIsSignup={setIsSignup}
            authForm={authForm}
            setAuthForm={setAuthForm}
            handleAuth={handleAuth}
            loading={loading}
            error={error}
          />
        )
      ) : (
        <Dashboard
          url={url}
          setUrl={setUrl}
          handleShorten={handleShorten}
          shortId={shortId}
          API_BASE_URL={SHORT_LINK_BASE}
          history={history}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;
