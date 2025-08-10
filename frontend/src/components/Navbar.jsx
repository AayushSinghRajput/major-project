import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/logo.jpg'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleScrollToAbout = () => {
    if (location.pathname === "/") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/about";
    }
    closeMenu();
  };

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: { opacity: 0, y: -20 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(79, 70, 229, 0.3)" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-indigo-100 shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <img 
            src={logo} 
            alt="StudyEd Logo" 
            className="h-10 w-10 mr-3 rounded-lg shadow-lg" 
          />
          <NavLink 
            to="/" 
            className="text-2xl font-bold text-indigo-600 flex items-center"
          >
            StudyEd
          </NavLink>
        </motion.div>

        <div className="hidden md:flex gap-6 items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }
            >
              Home
            </NavLink>
          </motion.div>

          <motion.button
            onClick={handleScrollToAbout}
            className="text-gray-700 hover:text-indigo-600"
            whileHover={{ scale: 1.05 }}
          >
            About
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }
            >
              Contact
            </NavLink>
          </motion.div>

          {!user && (
            <>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <NavLink to="/login">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                    Login
                  </button>
                </NavLink>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <NavLink to="/signup">
                  <button className="bg-gray-200 text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-300 transition ml-2">
                    Sign Up
                  </button>
                </NavLink>
              </motion.div>
            </>
          )}

          {user && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <motion.span 
                className="text-indigo-700 font-semibold mr-4"
                whileHover={{ scale: 1.05 }}
              >
                Hi, {user.name.split("@")[0]}
              </motion.span>
              <motion.button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Logout
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden px-6 pb-4 space-y-4"
          >
            <motion.div variants={itemVariants}>
              <NavLink
                to="/"
                onClick={closeMenu}
                className="block text-gray-700 hover:text-indigo-600 py-2"
              >
                Home
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={handleScrollToAbout}
                className="block w-full text-left text-gray-700 hover:text-indigo-600 py-2"
              >
                About
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="block text-gray-700 hover:text-indigo-600 py-2"
              >
                Contact
              </NavLink>
            </motion.div>

            {!user && (
              <>
                <motion.div variants={itemVariants}>
                  <NavLink to="/login" onClick={closeMenu}>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                      Login
                    </button>
                  </NavLink>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <NavLink to="/signup" onClick={closeMenu}>
                    <button className="w-full bg-gray-200 text-indigo-600 py-2 rounded-full hover:bg-gray-300 transition mt-2">
                      Sign Up
                    </button>
                  </NavLink>
                </motion.div>
              </>
            )}

            {user && (
              <>
                <motion.div variants={itemVariants}>
                  <span className="block px-2 py-1 text-indigo-700 font-semibold">
                    Hi, {user.name}
                  </span>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}