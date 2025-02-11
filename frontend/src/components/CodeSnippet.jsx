import React from "react";

const CodeSnippet = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white">Integration Code</span>
        <button onClick={copyToClipboard} className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
          Copy
        </button>
      </div>
      <pre className="text-green-400 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
