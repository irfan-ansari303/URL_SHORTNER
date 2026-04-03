import React from "react";

const AuthPage = ({ isSignup, setIsSignup, authForm, setAuthForm, handleAuth, loading, error }) => {
  return (
    <div className="bg-white border-4 border-black rounded-[24px] p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fadeIn max-w-[500px] mx-auto mt-32 mb-8">
      <h1 className="text-4xl font-black mb-2 text-black text-center uppercase">{isSignup ? "Create Account" : "Welcome Back"}</h1>
      <p className="text-gray-600 text-center mb-10">{isSignup ? "Sign up to start shortening links" : "Sign in to access your dashboard"}</p>
      
      <form className="flex flex-col gap-4" onSubmit={handleAuth}>
        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-white border-2 border-black rounded-sm p-4 text-black text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
            value={authForm.name}
            onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white border-2 border-black rounded-sm p-4 text-black text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
          value={authForm.email}
          onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white border-2 border-black rounded-sm p-4 text-black text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
          value={authForm.password}
          onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
          required
        />
        {error && <p className="text-black font-black text-center mb-4 uppercase text-sm">ERROR: {error}</p>}
        <button 
          type="submit" 
          className="w-full bg-black text-white border-2 border-black p-4 font-black text-lg uppercase hover:bg-white hover:text-black hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50" 
          disabled={loading}
        >
          {loading ? "Processing..." : (isSignup ? "Sign Up" : "Sign In")}
        </button>
      </form>
      
      <p className="text-center mt-6 text-gray-600">
        {isSignup ? "Already have an account?" : "New here?"} {" "}
        <span 
          onClick={() => setIsSignup(!isSignup)} 
          className="text-black cursor-pointer font-bold underline">
          {isSignup ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
