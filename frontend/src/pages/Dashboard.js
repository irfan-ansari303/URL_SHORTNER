import React from "react";

const Dashboard = ({ url, setUrl, handleShorten, shortId, API_BASE_URL, history, loading, error }) => {
  return (
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
  );
};

export default Dashboard;
