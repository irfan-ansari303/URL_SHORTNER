import React from "react";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="hero-badge">A Better Connection</div>
        <h1 className="hero-title">Shorten Your Links, <br />Expand Your Reach.</h1>
        <p className="hero-subtitle">
          Scale your brand, track your progress, and get actionable insights 
          with our professional link management platform.
        </p>
        <button className="get-started-btn" onClick={onGetStarted}>
          Get Started for Free
        </button>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast & Reliable</h3>
          <p>Instantly shorten your long URLs with our lightning-fast infrastructure.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Analytics</h3>
          <p>Get real-time insights into your link performance and track engagement.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Your data is protected with industry-standard encryption and security.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
