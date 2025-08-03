import React from "react";
import avatar from "../assets/userAvatar.png";

export default function StudentProfile() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <img src={avatar} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-center">Ashmita Karki</h2>
      <p className="text-center text-gray-600">Student ID: STU12345</p>
      <p className="text-center text-sm text-gray-500">Enrolled: July 2025</p>
    </div>
  );
}
