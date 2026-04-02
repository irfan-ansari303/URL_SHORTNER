import React from "react";

const Dashboard = ({ url, setUrl, handleShorten, shortId, API_BASE_URL, history, loading, error }) => {
  return (
    <div className="bg-white border-4 border-black rounded-[24px] p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fadeIn max-w-[800px] mx-auto mt-32 mb-8">
      <h1 className="text-4xl font-black mb-2 text-black text-center uppercase tracking-tighter">MiniURL</h1>
      <p className="text-gray-600 text-center mb-10">Powerful link shortener with detailed analytics</p>

      <form onSubmit={handleShorten} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Paste your long link here..."
          className="flex-1 bg-white border-2 border-black rounded-sm p-4 text-black text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-black text-white border-2 border-black px-8 py-4 font-black text-lg uppercase hover:bg-white hover:text-black hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p className="text-red-500 font-bold mb-4">{error}</p>}

      {shortId && (
        <div className="bg-white border-4 border-black rounded-sm p-6 mb-8 flex justify-between items-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-slideIn">
          <div>
            <p className="text-sm font-bold mb-2 text-black uppercase">Your Shortened URL:</p>
            <div className="font-mono text-xl font-bold text-black">{API_BASE_URL}/{shortId}</div>
          </div>
          <button 
            className="bg-gray-100 text-black border-2 border-black px-4 py-2 font-bold text-sm uppercase hover:bg-black hover:text-white transition-all"
            onClick={() => {
              navigator.clipboard.writeText(`${API_BASE_URL}/${shortId}`);
              alert("Copied to clipboard!");
            }}>
            Copy
          </button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-black mb-6 text-gray-500 uppercase">Recent Links</h2>
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div className="bg-white p-4 px-6 border-2 border-black rounded-sm flex justify-between items-center transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" key={item._id}>
              <div className="flex flex-col">
                <a href={`${API_BASE_URL}/${item.shortId}`} target="_blank" className="text-black font-black underline" rel="noreferrer">
                  {API_BASE_URL}/{item.shortId}
                </a>
                <span className="text-xs text-gray-500 max-w-[300px] truncate">{item.redirectUrl}</span>
              </div>
              <div className="text-sm font-black text-white bg-black px-3 py-1 rounded-sm">{item.visitHistory.length} clicks</div>
            </div>
          ))}
          {history.length === 0 && <p className="text-center text-gray-400 py-8">No links created yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
