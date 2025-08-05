import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import Lottie from "lottie-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import chatbotAnimation from "./animations/chatbot.json";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/AuthContext";
import RefreshRedirectWrapper from "./components/RefreshRedirectWrapper"; // import the wrapper


function HomeHero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 py-20 gap-12">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold mb-6 animate__animated animate__fadeInLeft">
          Welcome to StudyEd
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed animate__animated animate__fadeInLeft animate__delay-1s">
          StudyEd empowers students with AI tools to study smarter, not harder.
          From flashcards to note-taking, we simplify learning using modern AI.
        </p>
        <button
          onClick={handleGetStarted}
          className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition animate__animated animate__pulse animate__infinite"
        >
          Get Started
        </button>
      </div>
      <div className="md:w-1/2 aspect-square" data-aos="fade-left">
        <Lottie
          animationData={chatbotAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* Wrap Routes with RefreshRedirectWrapper */}
      <RefreshRedirectWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeHero />
                <section id="about">
                  <About />
                </section>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          
        </Routes>
      </RefreshRedirectWrapper>
    </BrowserRouter>
  );
}
