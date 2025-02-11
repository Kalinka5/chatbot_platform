import React from "react";
import { useLocation, Link } from "react-router-dom";
import CodeSnippet from "../components/CodeSnippet";

const EmbedCodePage = () => {
  const { state } = useLocation();
  const { embedCode } = state || { embedCode: "" };

  if (!state || !embedCode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
          <p className="text-red-400 text-xl">No embed code found. Please return to home page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Success Message */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-400">Chatbot Successfully Created!</h2>
              <p className="text-gray-400 mt-1">Your AI chatbot is ready to be integrated into your website.</p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <h1 className="text-3xl font-bold text-white mb-4">Integration Instructions</h1>
            <p className="text-gray-300">Follow these steps to add the chatbot to your website:</p>
          </div>

          {/* Steps */}
          <div className="p-8 space-y-6">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Copy the Code</h3>
                <p className="text-gray-400 mb-4">
                  Copy the following code snippet and paste it into your website's HTML, just before the closing {"</body>"} tag:
                </p>
                <div className="bg-black/30 rounded-2xl p-1">
                  <CodeSnippet code={embedCode} />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Test the Integration</h3>
                <p className="text-gray-400">
                  After adding the code, refresh your website. You should see a chat icon in the bottom-right corner of your page.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Start Chatting</h3>
                <p className="text-gray-400">Click the chat icon to open the chatbot and start interacting with your AI assistant.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-white/5 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                Need help? Check out our{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  documentation
                </a>
              </p>
              <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Another Chatbot</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedCodePage;
