import React from "react";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="pt-32 w-full max-w-6xl mx-auto text-center px-6">
      <div className="max-w-3xl mx-auto mb-20 animate-fadeIn">
        <div className="inline-block bg-black text-white px-6 py-2 font-black text-sm mb-6 uppercase border-2 border-black">
          A Better Connection
        </div>
        <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-6 text-black tracking-tighter">
          Shorten Your Links, <br />Expand Your Reach.
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-10">
          Scale your brand, track your progress, and get actionable insights 
          with our professional link management platform.
        </p>
        <button 
          className="bg-black text-white border-2 border-black px-10 py-4 font-extrabold text-lg uppercase hover:bg-white hover:text-black hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          onClick={onGetStarted}
        >
          Get Started for Free
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-12 border-4 border-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left">
          <div className="text-4xl mb-6">🚀</div>
          <h3 className="font-black text-2xl mb-4 uppercase">Fast & Reliable</h3>
          <p className="text-gray-600 leading-relaxed">Instantly shorten your long URLs with our lightning-fast infrastructure.</p>
        </div>
        <div className="bg-white p-12 border-4 border-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left">
          <div className="text-4xl mb-6">📈</div>
          <h3 className="font-black text-2xl mb-4 uppercase">Analytics</h3>
          <p className="text-gray-600 leading-relaxed">Get real-time insights into your link performance and track engagement.</p>
        </div>
        <div className="bg-white p-12 border-4 border-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left">
          <div className="text-4xl mb-6">🔒</div>
          <h3 className="font-black text-2xl mb-4 uppercase">Secure</h3>
          <p className="text-gray-600 leading-relaxed">Your data is protected with industry-standard encryption and security.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
