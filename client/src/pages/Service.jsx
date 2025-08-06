import React, { useState } from "react";
import chapterData from "../assets/data/Chapters.json";
import { FiBookOpen } from "react-icons/fi";
import Markdown from "react-markdown";

export default function Service() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const parsedData = chapterData[0]; // JSON is an array with a single object

  const handleDayClick = (dayKey) => {
    if (expandedDay === dayKey) {
      setExpandedDay(null);
      setExpandedChapter(null);
      setSelectedSubtopic(null);
    } else {
      setExpandedDay(dayKey);
      setExpandedChapter(null);
      setSelectedSubtopic(null);
    }
  };

  const handleChapterClick = (chapterKey) => {
    if (expandedChapter === chapterKey) {
      setExpandedChapter(null);
      setSelectedSubtopic(null);
    } else {
      setExpandedChapter(chapterKey);
      setSelectedSubtopic(null);
    }
  };

  const handleSubtopicClick = (subtopicKey) => {
    setSelectedSubtopic(subtopicKey);
  };

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 overflow-y-auto bg-indigo-50">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiBookOpen className="text-indigo-600" />
          Schedule
        </h2>

        {/* Days */}
        <ul>
          {Object.keys(parsedData).map((dayKey) => (
            <li key={dayKey}>
              <div
                onClick={() => handleDayClick(dayKey)}
                className={`cursor-pointer px-3 py-2 rounded-lg mb-1 ${
                  expandedDay === dayKey
                    ? "bg-indigo-300 text-white"
                    : "hover:bg-indigo-100"
                }`}
              >
                {dayKey.toUpperCase()}
              </div>

              {/* Chapters (only if day is expanded) */}
              {expandedDay === dayKey && (
                <ul className="ml-4 mt-2">
                  {Object.entries(parsedData[dayKey]).map(
                    ([chapterKey, chapter]) => (
                      <li key={chapterKey}>
                        <div
                          onClick={() => handleChapterClick(chapterKey)}
                          className={`cursor-pointer px-3 py-2 rounded-lg mb-1 ${
                            expandedChapter === chapterKey
                              ? "bg-indigo-200"
                              : "hover:bg-indigo-100"
                          }`}
                        >
                          {chapter.title}
                        </div>

                        {/* Subtopics */}
                        {expandedChapter === chapterKey && (
                          <ul className="ml-4 mt-2">
                            {Object.entries(chapter.subtopics).map(
                              ([subtopicKey, subtopic]) => (
                                <li
                                  key={subtopicKey}
                                  onClick={() =>
                                    handleSubtopicClick(subtopicKey)
                                  }
                                  className={`cursor-pointer px-3 py-2 rounded-lg mb-1 ${
                                    selectedSubtopic === subtopicKey
                                      ? "bg-indigo-100"
                                      : "hover:bg-indigo-50"
                                  }`}
                                >
                                  {subtopic.title}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="w-3/4 p-6 overflow-y-auto">
        {expandedDay &&
        expandedChapter &&
        selectedSubtopic &&
        parsedData[expandedDay][expandedChapter].subtopics[selectedSubtopic] ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              {
                parsedData[expandedDay][expandedChapter].subtopics[
                  selectedSubtopic
                ].title
              }
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              <Markdown>
                {
                  parsedData[expandedDay][expandedChapter].subtopics[
                    selectedSubtopic
                  ].context
                }
              </Markdown>
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">
            Select a subtopic to view its content.
          </p>
        )}
      </div>
    </div>
  );
}
