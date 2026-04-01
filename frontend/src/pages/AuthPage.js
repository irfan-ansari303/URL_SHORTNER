import React from "react";

const AuthPage = ({ isSignup, setIsSignup, authForm, setAuthForm, handleAuth, loading, error }) => {
  return (
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
        {error && <p style={{color: "black", fontWeight: "900", textAlign: "center", marginBottom: "1rem"}}>ERROR: {error}</p>}
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
  );
};

export default AuthPage;
