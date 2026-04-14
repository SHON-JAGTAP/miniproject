import React from "react";
import Hero from "../components/Hero/Hero";
import Places from "../components/Places/Places";
import BannerImg from "../components/BannerImg/BannerImg";
import Poster from "../assets/Poster.jpg";
import Blogs from "../pages/Blogs";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import WeatherWidget from "../components/Weather/WeatherWidget";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-green-400 via-teal-400 to-cyan-500">
      
      <div className="absolute inset-0 animate-gradient opacity-80 z-0" />
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-30 glow-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 70 + 40}px`,
              height: `${Math.random() * 70 + 40}px`,
              background: `radial-gradient(circle, rgba(66,255,176,0.6) 0%, rgba(0,0,0,0.0) 70%)`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Hero + Welcome Section */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-[92vh] px-4 text-center text-white">
        <Hero />
        {user && (
          <div className="mt-8 max-w-md bg-white/20 backdrop-blur-xl border border-white/30 text-white p-6 rounded-2xl shadow-xl transition-all duration-300">
            <p className="text-xl font-semibold tracking-wide">
              Welcome, <span className="text-yellow-300 font-bold capitalize">{user.name}</span>!
            </p>
            <Link
              to={user.role === "owner" ? "/dashboard-owner" : "/dashboard-user"}
              className="mt-4 inline-block bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 text-shadow-white font-bold px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <p className="text-xl text-white font-semibold tracking-wide">  Go to {user.role} Dashboard</p>
              
            </Link>
          </div>
        )}
      </div>

      {/* 🏞️ Floating Wave Transition */}
      <div className="relative z-30 overflow-hidden">
        <svg
          className="absolute top-[-1px] w-full h-24 text-white"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L80,122.7C160,117,320,107,480,133.3C640,160,800,224,960,240C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Places, Banner, Blogs */}
      <div className="relative z-30 bg-white/90 backdrop-blur-md rounded-t-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-14">
          {/* Weather Widget */}
          <div className="mb-8">
            <WeatherWidget city="Mumbai" />
          </div>
          <Places />
          <div className="my-12">
            <BannerImg img={Poster} />
          </div>
          <Blogs />
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .animate-gradient {
            background: linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(9,9,121,0.18) 60%, rgba(0,0,0,0.25) 100%);
            background-size: 200% 200%;
            animation: gradientMove 14s ease-in-out infinite;
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .glow-particle {
            animation: particleMove 10s linear infinite alternate;
            filter: blur(3px);
            mix-blend-mode: screen;
          }

          @keyframes particleMove {
            from { transform: translateY(0) scale(1); }
            to { transform: translateY(-40px) scale(1.1); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
