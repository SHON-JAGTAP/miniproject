import React from "react";
import Location from "../components/Location/Location";
import { FaRunning, FaFutbol, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen pt-15 bg-gradient-to-br from-white to-blue-50 py-40 px-9 md:px-35  text-center text-gray-800 ">
      <h2 className="text-4xl font-bold mb-8 text-blue-800 px-9 ">About TurfBooking</h2>

      <p className="text-lg leading-8 mb-6">
        At <span className="font-semibold text-blue-700">TurfBooking</span>, we make sports accessible for everyone. Whether
        you’re a footballer, cricketer, or hockey enthusiast, our platform allows you to find and
        book the best turfs around you in just a few clicks. With real-time availability,
        competitive pricing, and verified turf listings, we bring convenience and quality together.
      </p>

      <p className="text-lg leading-8 mb-6">
        We’re committed to promoting <strong>fitness</strong>, <strong>sportsmanship</strong>, and
        community engagement through well-maintained and professionally managed playing surfaces.
        From small 5-a-side arenas to full-size cricket and hockey fields, we cater to all needs.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12">
        <div className="flex flex-col items-center">
          <FaFutbol size={40} className="text-blue-600 mb-2" />
          <h3 className="text-2xl font-bold">50+ Turfs</h3>
          <p className="text-gray-600">Across Maharashtra</p>
        </div>
        <div className="flex flex-col items-center">
          <FaRunning size={40} className="text-green-600 mb-2" />
          <h3 className="text-2xl font-bold">1000+ Bookings</h3>
          <p className="text-gray-600">Made every month</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUsers size={40} className="text-purple-600 mb-2" />
          <h3 className="text-2xl font-bold">5000+ Users</h3>
          <p className="text-gray-600">Trust our platform</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-blue-100 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">
          Ready to Play?
        </h3>
        <p className="text-gray-700 mb-4">
          Explore top-rated turfs, check real-time availability, and book your next match with ease.
        </p>
        <a
          href="/places"
          className="bg-black-600 text-black px-6 py-2 rounded-full hover:bg-blue-700 transition"
        > 
          Find Turfs Now
        </a>
      </div>

      {/* Location Map */}
      <Location />
    </div>
  );
};

export default About;
