import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",   // changed from name to username as backend expects username
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/api/signup`, form);
      alert("Signup successful! Please login.");
      navigate("/signin");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(`Signup failed: ${err.response.data.error}`);
      } else {
        alert("Signup failed. Try again.");
      }
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-pink-200">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl px-8 py-10 rounded-2xl flex flex-col items-center"
      >
        <div className="bg-blue-600 p-3 rounded-full shadow-md mb-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Create Account</h2>
        <p className="text-gray-500 mb-6 text-center">
          Join us for a better experience!
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="w-full mb-4 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition active:scale-95"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-bold underline hover:text-pink-600 transition">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
