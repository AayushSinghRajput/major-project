import React from "react";

const chapters = [
  { title: "Introduction to Signals", completed: true, date: "July 20" },
  { title: "Fourier Series", completed: true, date: "July 23" },
  { title: "DTFT Basics", completed: false },
];

export default function ChaptersLearned() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">📚 Chapters Learned</h2>
      <ul className="space-y-3">
        {chapters.map((chapter, idx) => (
          <li
            key={idx}
            className={`flex justify-between items-center p-3 rounded-xl ${
              chapter.completed ? "bg-green-50" : "bg-yellow-50"
            }`}
          >
            <div>
              <h3 className="font-medium">{chapter.title}</h3>
              {chapter.date && <p className="text-xs text-gray-500">Completed on {chapter.date}</p>}
            </div>
            <span className="text-sm">
              {chapter.completed ? "✅" : "⏳"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
