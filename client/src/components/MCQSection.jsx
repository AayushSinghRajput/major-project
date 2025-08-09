import React, { useState } from 'react';

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">
        +2 Nepal MCQ Practice
      </h2>
      
      <div className="space-y-8">
        {questions.map((q) => (
          <div 
            key={q.id} 
            className={`p-6 rounded-xl shadow-md transition-all duration-200 ${submitted && selectedOptions[q.id] === q.correctAnswer ? 'bg-green-50 border-l-4 border-green-500' : submitted && selectedOptions[q.id] !== q.correctAnswer ? 'bg-red-50 border-l-4 border-red-500' : 'bg-white'}`}
          >
            <div className="flex items-start mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mr-3">
                {q.subject}
              </span>
              <p className="text-lg font-semibold text-gray-800 flex-1">{q.question}</p>
            </div>
            
            <div className="space-y-3 ml-10">
              {q.options.map((option) => (
                <label 
                  key={option.id} 
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${!submitted ? 'hover:bg-indigo-50' : ''} ${submitted && option.id === q.correctAnswer ? 'bg-green-100' : submitted && selectedOptions[q.id] === option.id && option.id !== q.correctAnswer ? 'bg-red-100' : ''}`}
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
                    {submitted && option.id === q.correctAnswer && (
                      <span className="ml-2 text-green-600">✓ Correct</span>
                    )}
                    {submitted && selectedOptions[q.id] === option.id && option.id !== q.correctAnswer && (
                      <span className="ml-2 text-red-600">✗ Incorrect</span>
                    )}
                  </span>
                </label>
              ))}
            </div>

            {submitted && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                <span className="font-semibold">Explanation:</span> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Submit Answers
          </button>
        </div>
      ) : (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold mb-2">
            Your Score: {calculateScore()} / {questions.length}
          </h3>
          <p className="text-gray-600">
            {calculateScore() === questions.length ? 'Excellent! Perfect score!' : 
             calculateScore() >= questions.length/2 ? 'Good job! Keep practicing!' : 
             'Keep studying! You can do better!'}
          </p>
          <button
            onClick={() => {
              setSelectedOptions({});
              setSubmitted(false);
            }}
            className="mt-4 px-6 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MCQSection;