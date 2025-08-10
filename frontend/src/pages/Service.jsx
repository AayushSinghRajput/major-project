import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import chapterData from '../assets/data/content_all_say.json';



export default function Service() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  // Parse markdown content to HTML
  const parseMarkdown = (text) => {
    if (!text) return "";
    
    // Split into lines for processing
    const lines = text.split('\n');
    const htmlLines = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Skip empty lines
      if (line.trim() === '') {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push('<br/>');
        continue;
      }
      
      // Handle headers
      if (line.startsWith('### ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push(`<h3 class="text-lg font-semibold mb-3 text-indigo-600 mt-6">${line.replace('### ', '')}</h3>`);
      } else if (line.startsWith('## ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push(`<h2 class="text-xl font-bold mb-4 text-indigo-700 mt-8">${line.replace('## ', '')}</h2>`);
      } else if (line.startsWith('# ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push(`<h1 class="text-2xl font-bold mb-4 text-indigo-800 mt-8">${line.replace('# ', '')}</h1>`);
      }
      // Handle bullet points
      else if (line.trim().startsWith('* ')) {
        if (!inList) {
          htmlLines.push('<ul class="mb-4 ml-6 space-y-2 list-disc">');
          inList = true;
        }
        const content = line.trim().replace('* ', '');
        // Handle bold text within list items
        const processedContent = content
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-indigo-900">$1</strong>')
          .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em class="italic">$1</em>');
        htmlLines.push(`<li class="mb-2 leading-relaxed">${processedContent}</li>`);
      }
      // Handle numbered lists
      else if (line.trim().match(/^\d+\.\s/)) {
        if (inList && htmlLines[htmlLines.length - 1] !== '<ol class="mb-4 ml-6 space-y-2 list-decimal">') {
          htmlLines.push('</ul>');
          htmlLines.push('<ol class="mb-4 ml-6 space-y-2 list-decimal">');
        } else if (!inList) {
          htmlLines.push('<ol class="mb-4 ml-6 space-y-2 list-decimal">');
          inList = true;
        }
        const content = line.trim().replace(/^\d+\.\s/, '');
        const processedContent = content
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-indigo-900">$1</strong>')
          .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em class="italic">$1</em>');
        htmlLines.push(`<li class="mb-2 leading-relaxed">${processedContent}</li>`);
      }
      // Handle regular paragraphs
      else {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        // Process bold and italic text
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-indigo-900">$1</strong>')
          .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em class="italic">$1</em>');
        htmlLines.push(`<p class="mb-4 leading-relaxed">${processedLine}</p>`);
      }
    }
    
    // Close any open list
    if (inList) {
      htmlLines.push('</ul>');
    }
    
    return htmlLines.join('\n');
  };

  // Combine all days into a single object for easier access
  const allDaysData = chapterData.reduce((acc, dayObj) => {
    return { ...acc, ...dayObj };
  }, {});

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

  const getSelectedContent = () => {
    if (expandedDay && expandedChapter && selectedSubtopic && allDaysData[expandedDay]) {
      const chapter = allDaysData[expandedDay][expandedChapter];
      if (chapter && chapter.subtopics[selectedSubtopic]) {
        return chapter.subtopics[selectedSubtopic];
      }
    }
    return null;
  };

  const selectedContent = getSelectedContent();

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 overflow-y-auto bg-indigo-50">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="text-indigo-600" />
          Schedule
        </h2>

        {/* Days */}
        <ul>
          {Object.keys(allDaysData).map((dayKey) => (
            <li key={dayKey}>
              <div
                onClick={() => handleDayClick(dayKey)}
                className={`cursor-pointer px-3 py-2 rounded-lg mb-1 transition-colors ${
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
                  {Object.entries(allDaysData[dayKey]).map(
                    ([chapterKey, chapter]) => (
                      <li key={chapterKey}>
                        <div
                          onClick={() => handleChapterClick(chapterKey)}
                          className={`cursor-pointer px-3 py-2 rounded-lg mb-1 transition-colors ${
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
                                  className={`cursor-pointer px-3 py-2 rounded-lg mb-1 transition-colors ${
                                    selectedSubtopic === subtopicKey
                                      ? "bg-indigo-100 border-l-4 border-indigo-400"
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
        {selectedContent ? (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="mb-4">
              <span className="text-sm text-indigo-600 font-medium">
                {expandedDay.toUpperCase()} • {allDaysData[expandedDay][expandedChapter].title}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              {selectedContent.title}
            </h2>
            
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ 
                __html: parseMarkdown(selectedContent.context || selectedContent.content) 
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                Select a subtopic to view its content
              </p>
              <p className="text-gray-400 text-sm">
                Choose a day, then a chapter, then a subtopic from the sidebar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}