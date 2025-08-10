import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopViewedBooks() {
  const [showAll, setShowAll] = useState(false);

  const books = [
    {
      id: 1,
      title: "Physics Grade 11",
      author: "HSEB Curriculum",
      views: "1.2k views",
      rating: "4.8",
      img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Chemistry Grade 12",
      author: "HSEB Curriculum",
      views: "980 views",
      rating: "4.6",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQowwXb7JZ9B-qg76SlPAbA2dn3H9AYQpIbKw&s",
    },
    {
      id: 3,
      title: "Mathematics Grade 11",
      author: "HSEB Curriculum",
      views: "1.5k views",
      rating: "4.9",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimPNxHu9S4avAh1STMih2to2eOKt_cRtRXQ&s",
    },
    {
      id: 4,
      title: "Biology Grade 12",
      author: "HSEB Curriculum",
      views: "850 views",
      rating: "4.5",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYs4RavgFv8CDY6zPbBdMVVdSxvQRruFoWQ&s",
    },
    {
      id: 5,
      title: "English Grade 12",
      author: "HSEB Curriculum",
      views: "720 views",
      rating: "4.3",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69csQGVOduWBt61AYbyIrssQZkbamui0LJg&s",
    },
    {
      id: 6,
      title: "Computer Science Grade 11",
      author: "HSEB Curriculum",
      views: "1.1k views",
      rating: "4.7",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const visibleBooks = showAll ? books : books.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    hover: { scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-2xl shadow-lg max-w-6xl mx-auto border border-gray-100"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.h2 
          className="text-3xl font-bold text-indigo-800 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          📚 Top Viewed Books
        </motion.h2>
        <motion.p 
          className="text-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          For +2 Students in Nepal
        </motion.p>
      </motion.div>

      {/* Books Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {visibleBooks.map((book) => (
            <motion.div
              key={book.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <motion.img
                  src={book.img}
                  alt={book.title}
                  className="h-52 w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-indigo-700 flex items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                >
                  ⭐ {book.rating}
                </motion.div>
              </div>
              <div className="p-5">
                <motion.h3 
                  className="text-xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {book.title}
                </motion.h3>
                <motion.p 
                  className="text-sm text-gray-600 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {book.author}
                </motion.p>
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.span 
                    className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    👁️ {book.views}
                  </motion.span>
                  <motion.button 
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More Button */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={toggleShowAll}
          variants={button}
          whileHover="hover"
          whileTap="tap"
          className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
        >
          {showAll ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Show Less
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              View More ({books.length - 3})
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}