import React, { useState } from "react";
import DomainForm from "../components/DomainForm";
import ProjectInfo from "../components/ProjectInfo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDomainSubmit = async (domain) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiUrl}/generate-urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/urls", {
          state: { urls: data.urls, domain },
        });
      } else {
        setError("Failed to generate URLs. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while generating URLs.");
      console.error("Error generating URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0" style={{ backgroundColor: "#000000a8" }}></div>

        {/* Main Container */}
        <div className="relative z-10 h-screen">
          {/* Content Section */}
          <div className="h-1/2 flex items-center justify-center px-20 py-10">
            <div className="max-w-4xl w-full bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-6">
                  Website to
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"> AI Chatbot</span>
                </h1>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  Transform your website content into an intelligent AI assistant. Just enter your domain and let us do the magic.
                </p>
                <div className="max-w-xl mx-auto">
                  <DomainForm onSubmit={handleDomainSubmit} loading={loading} error={error} />
                </div>
              </div>
            </div>
          </div>

          {/* Features and Steps Container */}
          <div className="h-1/2 grid grid-cols-2 gap-8 px-20 py-10">
            {/* Features Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Features</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="group relative bg-black/20 rounded-2xl p-6 hover:bg-black/40 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="text-blue-400 mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Steps</h2>
              </div>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="group relative bg-black/20 rounded-2xl p-6 hover:bg-black/40 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mr-6 text-purple-400 text-2xl font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Features data
const features = [
  {
    title: "Instant Setup",
    description: "Get your chatbot running in minutes without any coding.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "AI-Powered",
    description: "Smart responses based on your website content.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Always available to help your customers.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    title: "Easy Integration",
    description: "Simple copy-paste installation on any website.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

// Steps data
const steps = [
  {
    title: "Enter Your Domain",
    description: "Paste your website URL to begin the setup process.",
  },
  {
    title: "AI Analysis",
    description: "Our system automatically scans your website content.",
  },
  {
    title: "Deploy Chatbot",
    description: "Add the generated code to your site and go live.",
  },
];

export default Home;
