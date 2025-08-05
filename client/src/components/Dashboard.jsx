import React, { useState } from "react";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(""); 
  const progress = 45;

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex">
      <div className="flex flex-grow max-w-full bg-white rounded-none shadow-sm overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-indigo-50 p-4 flex flex-col gap-6">
          {/* Profile */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center mx-auto text-3xl mb-2">
              👤
            </div>
            <h2 className="text-lg font-semibold">Ashmita Karki</h2>
            <p className="text-indigo-700 text-xs font-medium">ID: STU12345</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <button
              className={`py-1 rounded text-sm font-medium ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-700 hover:bg-indigo-200"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`py-1 rounded text-sm font-medium ${
                activeTab === "progress"
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-700 hover:bg-indigo-200"
              }`}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </button>
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-0 overflow-auto">
          {activeTab === "dashboard" && <DashboardContent />}

          {activeTab === "progress" && (
            <div className="text-indigo-900">
              <h3 className="text-lg font-semibold mb-3">Your Progress</h3>
              <div className="w-full bg-indigo-200 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium">{progress}% completed</p>
            </div>
          )}

          {/* {!activeTab && (
            <div className="flex items-center justify-center h-full text-indigo-700 text-base italic">
              <p>Let's start!</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

