import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/signin`, form);

      if (res.data && res.data.user) {
        const userData = res.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

// ✅ Role-based redirection
if (userData.role === "user") {
  navigate("/home");
} else if (userData.role === "owner") {
  navigate("/dashboard-owner"); // ✅ Correct route
} else {
  alert("Unknown user role!");
}

      } else {
        alert("Invalid response from server");
      }
    } catch (err) {
      console.error("Signin Error:", err);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-pink-200">
      <form
        onSubmit={handleSignin}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl px-8 py-10 rounded-2xl flex flex-col items-center"
      >
        <div className="bg-blue-600 p-3 rounded-full shadow-md mb-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Sign In</h2>
        <p className="text-gray-500 mb-6 text-center">
          Welcome back! Please login to your account.
        </p>

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
          className="w-full mb-4 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-pink-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition active:scale-95"
        >
          Sign In
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold underline hover:text-pink-600 transition">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;