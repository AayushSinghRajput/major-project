import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressTracker() {
  const progress = 60;

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#6366F1", "#E0E7FF"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center flex justify-center items-center gap-2">
        📊Progress in Biology
      </h2>

      {/* Circular Progress */}
<div
  className="relative w-[150px] h-[150px] mx-auto flex items-center justify-center"
>
  <Doughnut data={doughnutData} />
  <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-indigo-600">
    {progress}%
  </div>
</div>


      {/* Linear Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner mt-8">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-6 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center text-indigo-600 font-semibold mt-2">{progress}% completed</p>
      
    </div>
    

  );
}
