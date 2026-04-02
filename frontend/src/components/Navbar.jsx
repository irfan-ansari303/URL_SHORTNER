import React from "react";

const Navbar = ({ isLogged, onLogin, onSignup, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 bg-white z-50 border-b-4 border-black">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-black text-black cursor-pointer uppercase tracking-tighter" onClick={() => window.location.reload()}>
          MiniURL
        </div>
        <div className="flex gap-4">
          {!isLogged ? (
            <>
              <button className="bg-white text-black border-2 border-black px-5 py-2 font-extrabold uppercase hover:bg-black hover:text-white transition-all text-sm" onClick={onLogin}>Log In</button>
              <button className="bg-black text-white border-2 border-black px-5 py-2 font-extrabold uppercase hover:bg-white hover:text-black hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-sm" onClick={onSignup}>Sign Up</button>
            </>
          ) : (
            <button className="bg-white text-black border-2 border-black px-5 py-2 font-extrabold uppercase hover:bg-black hover:text-white transition-all text-sm" onClick={onLogout}>Log Out</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
