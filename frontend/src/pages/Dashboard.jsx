import React from "react";

const Dashboard = ({ url, setUrl, handleShorten, shortId, API_BASE_URL, history, loading, error }) => {
  const totalClicks = history.reduce((sum, item) => sum + item.visitHistory.length, 0);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="section-kicker">Workspace</span>
          <h1>Slink Dashboard</h1>
          <p className="subtitle">Shorten, copy, and monitor all your important links from one clean place.</p>
        </div>
        <div className="dashboard-stats" aria-label="Dashboard statistics">
          <div>
            <strong>{history.length}</strong>
            <span>Links</span>
          </div>
          <div>
            <strong>{totalClicks}</strong>
            <span>Clicks</span>
          </div>
        </div>
      </section>

      <section className="shortener-panel">
        <form onSubmit={handleShorten} className="input-group">
          <label htmlFor="long-url">Long URL</label>
          <div className="shortener-controls">
            <input
              id="long-url"
              type="text"
              placeholder="https://example.com/very-long-link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>
        </form>

        {error && <p className="dashboard-error">{error}</p>}

        {shortId && (
          <div className="result-card">
            <div>
              <span className="result-label">Your shortened URL</span>
              <div className="result-url">{API_BASE_URL}/{shortId}</div>
            </div>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(`${API_BASE_URL}/${shortId}`);
                alert("Copied to clipboard!");
              }}
            >
              Copy
            </button>
          </div>
        )}
      </section>

      <section className="history-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">History</span>
            <h2>Recent links</h2>
          </div>
          <span className="history-count">{history.length} saved</span>
        </div>

        <div className="history-list">
          {history.map((item) => (
            <article className="history-item" key={item._id}>
              <div className="url-info">
                <a href={`${API_BASE_URL}/${item.shortId}`} target="_blank" className="short-link" rel="noreferrer">
                  {API_BASE_URL}/{item.shortId}
                </a>
                <span className="original-link">{item.redirectUrl}</span>
              </div>
              <div className="clicks">{item.visitHistory.length} clicks</div>
            </article>
          ))}
          {history.length === 0 && (
            <div className="empty-state">
              <strong>No links yet</strong>
              <span>Shorten your first URL and it will show up here.</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
