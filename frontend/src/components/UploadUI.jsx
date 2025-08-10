// UploadUI.jsx
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function UploadUI({ onLearnNowClick }) {
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploaded(true);
      setFilename(file.name);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!uploaded ? (
        <>
          <FiUploadCloud className="text-6xl text-indigo-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">
            Upload Your Study Notes (PDF)
          </h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block mx-auto text-sm text-gray-700"
          />
          <p className="text-sm text-indigo-600 mt-4">
            Choose a PDF file or drag it here
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            ✅ {filename} Uploaded
          </h2>
          <p className="text-gray-600 mb-6">What would you like to do next?</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
              onClick={onLearnNowClick}
            >
              <FaBookOpen />
              Learn Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-300 px-6 py-3 rounded-full hover:bg-indigo-100 transition"
            >
              <FaQuestionCircle />
              Generate MCQs
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}
