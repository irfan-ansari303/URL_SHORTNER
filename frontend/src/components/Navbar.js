import React from "react";

const Navbar = ({ isLogged, onLogin, onSignup, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => (window.location.href = "/")}>
          <img src="/logo.webp" alt="Slink Logo" className="logo-img" />
          <span>Slink</span>
        </div>
        <div className="navbar-links">
          {!isLogged ? (
            <>
              <button className="nav-btn secondary" onClick={onLogin}>Log In</button>
              <button className="nav-btn primary" onClick={onSignup}>Sign Up</button>
            </>
          ) : (
            <button className="nav-btn secondary" onClick={onLogout}>Log Out</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
