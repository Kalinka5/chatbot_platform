import React, { useState } from "react";

const DomainForm = ({ onSubmit, loading, error }) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(domain);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Enter Your Website Domain</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="https://example.com"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
          disabled={loading}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Chatbot"
          )}
        </button>
      </form>
    </div>
  );
};

export default DomainForm;
