// src/pages/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer"; // 👈 Import your footer
import ChatBot from "../components/Chatbot/ChatBot";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow mt-[80px]"> {/* offset for navbar height */}
        <Outlet /> {/* This renders the current page's content */}
      </main>

      <Footer /> {/* 👈 Footer will now be visible on all pages */}
      <ChatBot /> {/* 🤖 AI Chatbot available on all pages */}
    </div>
    
  );
};

export default Layout;
