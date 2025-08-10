import React, { useState } from "react";
import DashboardContent from "./DashboardContent";
import Service from "../pages/Service";
import ProgressTracker from "./ProgressTracker";
import MCQSection from "./MCQSection";
import NotesSection from "./NotesSection";
import ChatPage from "../pages/Chatpage";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showServiceView, setShowServiceView] = useState(false);

  const handleLearnNowClick = () => {
    setShowServiceView(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-lg md:shadow-xl md:rounded-r-2xl p-6 flex flex-col">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-3 shadow-md">
              👩‍🎓
            </div>
            <h2 className="text-xl font-bold text-gray-800">Ashmita Karki</h2>
            <p className="text-indigo-600 text-sm font-medium mt-1">+2 Science Student</p>
            <div className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full mt-2">
              ID: STU12345
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-1">
            <button
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
              onClick={() => {
                setShowServiceView(false);
                setActiveTab("dashboard");
              }}
            >
              <span className="mr-3 text-lg">📊</span>
              Dashboard
            </button>
            <button
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "progress"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
              onClick={() => {
                setShowServiceView(false);
                setActiveTab("progress");
              }}
            >
              <span className="mr-3 text-lg">📈</span>
              Progress Tracker
            </button>
            <button
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "mcq"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
              onClick={() => {
                setShowServiceView(false);
                setActiveTab("mcq");
              }}
            >
              <span className="mr-3 text-lg">✍️</span>
              Practice MCQs
            </button>
            <button
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "notes"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
              onClick={() => {
                setShowServiceView(false);
                setActiveTab("notes");
              }}
            >
              <span className="mr-3 text-lg">📝</span>
              Study Notes
            </button>
            <button
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
              onClick={() => {
                setShowServiceView(false);
                setActiveTab("chat");
              }}
            >
              <span className="mr-3 text-lg">💬</span>
              Study Assistant
            </button>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="text-center text-xs text-gray-500">
              <p>Nepal +2 Learning Portal</p>
              <p className="mt-1">© 2023 All Rights Reserved</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {showServiceView ? (
            <Service />
          ) : activeTab === "dashboard" ? (
            <DashboardContent onLearnNowClick={handleLearnNowClick} />
          ) : activeTab === "progress" ? (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                  📊
                </span>
                Your Academic Progress
              </h2>
              <ProgressTracker />
            </div>
          ) : activeTab === "mcq" ? (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                  ✍️
                </span>
                +2 MCQ Practice
              </h2>
              <MCQSection />
            </div>
          ) : activeTab === "notes" ? (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                  📝
                </span>
                Study Notes
              </h2>
              <NotesSection />
            </div>
          ) : activeTab === "chat" ? (
            <div className="flex flex-col h-full">
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                    💬
                  </span>
                  Study Assistant
                </h2>
              </div>
              <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
                <ChatPage />
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">👋</div>
              <h3 className="text-2xl font-bold text-indigo-700">Welcome to your learning dashboard!</h3>
              <p className="text-gray-600 mt-2">Select a section to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}