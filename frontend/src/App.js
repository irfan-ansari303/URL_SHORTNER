import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "";

// Axios defaults for credentials (cookies)
axios.defaults.withCredentials = true;

function App() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [history, setHistory] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" });
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [isLogged]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/url`, {
        headers: { Accept: "application/json" }
      });
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
      const response = await axios.post(`${API_BASE_URL}/url`, 
        { url: url },
        { headers: { Accept: "application/json" } }
      );
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
    const endpoint = isSignup ? "/user/signup" : "/user/login";
    try {
      await axios.post(`${API_BASE_URL}${endpoint}`, authForm, {
        headers: { Accept: "application/json" }
      });
      setIsLogged(true);
      setAuthForm({ email: "", password: "", name: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Auth failed. Check your credentials.");
      // Even if it returns HTML error, we'll try to handle it.
    } finally {
      setLoading(false);
    }
  };

  if (!isLogged) {
    return (
      <div className="App">
        <div className="container">
          <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="subtitle">{isSignup ? "Sign up to start shortening links" : "Sign in to access your dashboard"}</p>
          
          <form className="auth-form" onSubmit={handleAuth}>
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.name}
                onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
              required
            />
            {error && <p style={{color: "#f87171", textAlign: "center", marginBottom: "1rem"}}>{error}</p>}
            <button type="submit" style={{width: "100%"}} disabled={loading}>
              {loading ? "Processing..." : (isSignup ? "Sign Up" : "Sign In")}
            </button>
          </form>
          
          <p style={{textAlign: "center", marginTop: "1.5rem", color: "var(--text-muted)"}}>
            {isSignup ? "Already have an account?" : "New here?"} {" "}
            <span 
              onClick={() => setIsSignup(!isSignup)} 
              style={{color: "var(--primary)", cursor: "pointer", fontWeight: 600}}>
              {isSignup ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1>MiniURL</h1>
        <p className="subtitle">Powerful link shortener with detailed analytics</p>

        <form onSubmit={handleShorten} className="input-group">
          <input
            type="text"
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>

        {error && <p style={{color: "#f87171", marginBottom: "1rem"}}>{error}</p>}

        {shortId && (
          <div className="result-card">
            <div>
              <p style={{fontSize: "0.875rem", marginBottom: "0.5rem", color: "white"}}>Your Shortened URL:</p>
              <div className="result-url">{API_BASE_URL}/{shortId}</div>
            </div>
            <button 
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(`${API_BASE_URL}/${shortId}`);
                alert("Copied to clipboard!");
              }}>
              Copy
            </button>
          </div>
        )}

        <div className="history-section">
          <h2>Recent Links</h2>
          <div className="history-list">
            {history.map((item) => (
              <div className="history-item" key={item._id}>
                <div className="url-info">
                  <a href={`${API_BASE_URL}/${item.shortId}`} target="_blank" className="short-link" rel="noreferrer">
                    {API_BASE_URL}/{item.shortId}
                  </a>
                  <span className="original-link">{item.redirectUrl}</span>
                </div>
                <div className="clicks">{item.visitHistory.length} clicks</div>
              </div>
            ))}
            {history.length === 0 && <p style={{textAlign: "center", color: "var(--text-muted)", padding: "2rem"}}>No links created yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
