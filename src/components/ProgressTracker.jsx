import React from "react";

export default function ProgressTracker() {
  const progress = 60; // example

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">📊 Course Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-indigo-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
    </div>
  );
}
