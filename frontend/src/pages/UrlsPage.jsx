import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UrlsPage = () => {
  const { state } = useLocation();
  const { urls, domain } = state || { urls: [], domain: "" };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleScrapeData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}/scrape-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain, urls }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/embed-code", {
          state: { embedCode: data.embed_code },
        });
      } else {
        setError("Failed to scrape data. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while scraping data.");
      console.error("Error scraping data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!state || !urls.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
          <p className="text-red-400 text-xl">No URLs found. Please return to home page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-black">
      {/* Stats Card */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium text-gray-400">Domain</h2>
              <p className="text-3xl font-bold text-white mt-2">{domain}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-400">URLs Found</h2>
              <p className="text-3xl font-bold text-white mt-2">{urls.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* URLs List Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Found URLs</h1>
            <button
              onClick={handleScrapeData}
              disabled={loading}
              className="px-8 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                       disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-all duration-300
                       flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Scrape Data</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
            {urls.map((url, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <p className="text-gray-300 font-medium truncate">{url}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlsPage;
