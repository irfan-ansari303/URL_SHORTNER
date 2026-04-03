import React, { useState, useEffect } from "react";
import "./App.css";
import * as authService from "./api/auth";
import * as urlService from "./api/url";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

const API_BASE_URL = "";


function App() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [history, setHistory] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [isLogged]);

  const fetchHistory = async () => {
    try {
      const response = await urlService.getHistory();
      setHistory(response.data.urls);
      setIsLogged(true);
    } catch (err) {
      if (err.response?.status === 401) {
        setIsLogged(false);
      }
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
      } else {
        await authService.login(authForm);
      }
      setIsLogged(true);
      setAuthForm({ email: "", password: "", name: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Auth failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear cookies/token logic if any (optional based on your backend auth)
    setIsLogged(false);
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
          API_BASE_URL={API_BASE_URL}
          history={history}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;

