import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const courseData = [
  {
    id: 1,
    name: "Physics - Grade 11",
    category: "Science",
    progress: 65,
    duration: "Academic Year",
    lessonsCompleted: 13,
    totalLessons: 20,
    icon: "🔬"
  },
  {
    id: 2,
    name: "Chemistry - Grade 12",
    category: "Science",
    progress: 40,
    duration: "Academic Year",
    lessonsCompleted: 8,
    totalLessons: 20,
    icon: "🧪"
  },
  {
    id: 3,
    name: "Mathematics - Grade 11",
    category: "Science/Management",
    progress: 75,
    duration: "Academic Year",
    lessonsCompleted: 15,
    totalLessons: 20,
    icon: "🧮"
  },
  {
    id: 4,
    name: "Biology - Grade 12",
    category: "Science",
    progress: 30,
    duration: "Academic Year",
    lessonsCompleted: 6,
    totalLessons: 20,
    icon: "🧬"
  },
  {
    id: 5,
    name: "Accountancy - Grade 12",
    category: "Management",
    progress: 55,
    duration: "Academic Year",
    lessonsCompleted: 11,
    totalLessons: 20,
    icon: "📊"
  },
  {
    id: 6,
    name: "Nepali - Grade 11",
    category: "Compulsory",
    progress: 85,
    duration: "Academic Year",
    lessonsCompleted: 17,
    totalLessons: 20,
    icon: "📜"
  },
  {
    id: 7,
    name: "English - Grade 12",
    category: "Compulsory",
    progress: 60,
    duration: "Academic Year",
    lessonsCompleted: 12,
    totalLessons: 20,
    icon: "📚"
  },
  {
    id: 8,
    name: "Computer Science - Grade 11",
    category: "Elective",
    progress: 45,
    duration: "Academic Year",
    lessonsCompleted: 9,
    totalLessons: 20,
    icon: "💻"
  }
];

function ProgressCard({ course }) {
  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [course.progress, 100 - course.progress],
        backgroundColor: ["#6366F1", "#E0E7FF"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-xl">{course.icon}</span>
            {course.name}
          </h2>
          <p className="text-sm text-gray-500 ml-8">{course.category}</p>
        </div>
        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
          {course.duration}
        </span>
      </div>

      <div className="relative w-[150px] h-[150px] mx-auto flex items-center justify-center mb-4">
        <Doughnut data={doughnutData} />
        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-indigo-600">
          {course.progress}%
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-6 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-indigo-600 font-semibold">{course.progress}% completed</span>
        <span className="text-gray-500">{course.lessonsCompleted}/{course.totalLessons} units</span>
      </div>
    </div>
  );
}

export default function ProgressTracker() {
  const [showAll, setShowAll] = useState(false);
  const visibleCourses = showAll ? courseData : courseData.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center flex justify-center items-center gap-2">
        📊 Your +2 Academic Progress (Nepal)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCourses.map(course => (
          <ProgressCard key={course.id} course={course} />
        ))}
      </div>
      
      {courseData.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md"
          >
            {showAll ? 'Show Less' : `View All Courses (${courseData.length})`}
          </button>
        </div>
      )}
    </div>
  );
}