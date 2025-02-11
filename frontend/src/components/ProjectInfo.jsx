import React from "react";

const ProjectInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">About Our Project</h2>
      <div className="space-y-4">
        <p>Create an AI-powered chatbot for your website in minutes! Our service helps you:</p>
        <ul className="list-disc pl-6">
          <li>Generate a custom chatbot trained on your website content</li>
          <li>Easy integration with a simple JavaScript snippet</li>
          <li>Improve user engagement and support</li>
          <li>24/7 automated customer service</li>
        </ul>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">How it works:</h3>
          <ol className="list-decimal pl-6">
            <li>Enter your website domain</li>
            <li>Our AI analyzes your website content</li>
            <li>Get your custom chatbot code</li>
            <li>Add the code to your website</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
