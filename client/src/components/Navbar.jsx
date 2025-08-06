import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "./AuthContext";

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
      window.location.href = "/#about";
    }
    closeMenu();
  };

  return (
    <nav className="bg-indigo-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          StudyEd
        </NavLink>

        <div className="hidden md:flex gap-6 items-center">
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

          <button
            onClick={handleScrollToAbout}
            className="text-gray-700 hover:text-indigo-600"
          >
            About
          </button>

          {/* <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold"
                : "text-gray-700 hover:text-indigo-600"
            }
          >
            Contact
          </NavLink> */}

          {!user && (
            <>
              <NavLink to="/login">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="bg-gray-200 text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-300 transition ml-2">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}

          {user && (
            <>
              <span className="text-indigo-700 font-semibold mr-4">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 animate__animated animate__fadeInDown">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Home
          </NavLink>

          <button
            onClick={() => {
              if (location.pathname === "/") {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              } else {
                window.location.href = "/#about";
              }
              closeMenu();
            }}
            className="block w-full text-left text-gray-700 hover:text-indigo-600"
          >
            About
          </button>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Contact
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login" onClick={closeMenu}>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup" onClick={closeMenu}>
                <button className="w-full bg-gray-200 text-indigo-600 py-2 rounded-full hover:bg-gray-300 transition">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}

          {user && (
            <>
              <span className="block px-2 py-1 text-indigo-700 font-semibold">
                Hi, {user.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
