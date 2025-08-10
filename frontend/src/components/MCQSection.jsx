import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MCQSection = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the SI unit of force?",
      options: [
        { id: 'a', text: "Joule" },
        { id: 'b', text: "Newton" },
        { id: 'c', text: "Watt" },
        { id: 'd', text: "Pascal" }
      ],
      correctAnswer: 'b',
      subject: "Physics",
      explanation: "Force is measured in Newtons (N) in the SI system, named after Sir Isaac Newton."
    },
    {
      id: 2,
      question: "Which of the following is NOT a fundamental accounting equation?",
      options: [
        { id: 'a', text: "Assets = Liabilities + Capital" },
        { id: 'b', text: "Capital = Assets - Liabilities" },
        { id: 'c', text: "Liabilities = Assets + Capital" },
        { id: 'd', text: "Assets - Liabilities = Capital" }
      ],
      correctAnswer: 'c',
      subject: "Accountancy",
      explanation: "The fundamental accounting equation is Assets = Liabilities + Capital. Option C reverses this relationship incorrectly."
    },
    {
      id: 3,
      question: "Which gas is produced during photosynthesis?",
      options: [
        { id: 'a', text: "Carbon dioxide" },
        { id: 'b', text: "Nitrogen" },
        { id: 'c', text: "Oxygen" },
        { id: 'd', text: "Hydrogen" }
      ],
      correctAnswer: 'c',
      subject: "Biology",
      explanation: "During photosynthesis, plants take in carbon dioxide and water to produce glucose and oxygen as byproducts."
    },
    {
      id: 4,
      question: "What is the value of sin²θ + cos²θ?",
      options: [
        { id: 'a', text: "0" },
        { id: 'b', text: "1" },
        { id: 'c', text: "2" },
        { id: 'd', text: "tanθ" }
      ],
      correctAnswer: 'b',
      subject: "Mathematics",
      explanation: "This is the fundamental Pythagorean trigonometric identity which holds true for all values of θ."
    },
    {
      id: 5,
      question: "Which of these is NOT a programming language?",
      options: [
        { id: 'a', text: "Python" },
        { id: 'b', text: "Java" },
        { id: 'c', text: "HTML" },
        { id: 'd', text: "Photoshop" }
      ],
      correctAnswer: 'd',
      subject: "Computer Science",
      explanation: "Photoshop is an image editing software, not a programming language."
    }
  ];

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedOptions[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const button = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(79, 70, 229, 0.4)"
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg"
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-center mb-8 text-indigo-800"
      >
        +2 Nepal MCQ Practice
      </motion.h2>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {questions.map((q) => (
          <motion.div
            key={q.id}
            variants={item}
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-xl shadow-md transition-all duration-200 ${
              submitted && selectedOptions[q.id] === q.correctAnswer 
                ? 'bg-green-50 border-l-4 border-green-500' 
                : submitted && selectedOptions[q.id] !== q.correctAnswer 
                ? 'bg-red-50 border-l-4 border-red-500' 
                : 'bg-white'
            }`}
          >
            <div className="flex items-start mb-4">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mr-3"
              >
                {q.subject}
              </motion.span>
              <p className="text-lg font-semibold text-gray-800 flex-1">{q.question}</p>
            </div>
            
            <motion.div 
              className="space-y-3 ml-10"
              layout
            >
              {q.options.map((option) => (
                <motion.label
                  key={option.id}
                  layout
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    !submitted ? 'hover:bg-indigo-50' : ''
                  } ${
                    submitted && option.id === q.correctAnswer 
                      ? 'bg-green-100' 
                      : submitted && selectedOptions[q.id] === option.id && option.id !== q.correctAnswer 
                      ? 'bg-red-100' 
                      : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option.id}
                    checked={selectedOptions[q.id] === option.id}
                    onChange={() => handleOptionChange(q.id, option.id)}
                    className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    disabled={submitted}
                  />
                  <span className="ml-3 text-gray-700">
                    <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
                    {option.text}
                    <AnimatePresence>
                      {submitted && option.id === q.correctAnswer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 text-green-600"
                        >
                          ✓ Correct
                        </motion.span>
                      )}
                      {submitted && selectedOptions[q.id] === option.id && option.id !== q.correctAnswer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 text-red-600"
                        >
                          ✗ Incorrect
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.label>
              ))}
            </motion.div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 overflow-hidden"
                >
                  <span className="font-semibold">Explanation:</span> {q.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <motion.button
              onClick={handleSubmit}
              variants={button}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-colors"
            >
              Submit Answers
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="mt-8 p-6 bg-white rounded-xl shadow-md text-center"
          >
            <h3 className="text-2xl font-bold mb-2">
              Your Score: {calculateScore()} / {questions.length}
            </h3>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {calculateScore() === questions.length ? 'Excellent! Perfect score!' : 
               calculateScore() >= questions.length/2 ? 'Good job! Keep practicing!' : 
               'Keep studying! You can do better!'}
            </motion.p>
            <motion.button
              onClick={() => {
                setSelectedOptions({});
                setSubmitted(false);
              }}
              variants={button}
              whileHover="hover"
              whileTap="tap"
              className="mt-4 px-6 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MCQSection;