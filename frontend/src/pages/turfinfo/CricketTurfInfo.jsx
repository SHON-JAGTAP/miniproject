import React from "react";
import CricketImage from "../../assets/places/CricketInfo.jpg";

const CricketTurfInfo = () => {
  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto bg-white shadow-md rounded-lg text-center">
      {/* Full Image Section */}
      <div className="mb-4">
        <img
          src={CricketImage}
          alt="Cricket Turf"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/booking" // 👉 change to your booking page route
          className="bg-white-600 text-blue px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Book Now
        </a>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-blue-800">
         Satara Sports Arena – Cricket Turf
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <em>Where Satara Comes to Play!</em>
      </p>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2"> Location</h2>
        <p className="text-gray-700">
          Near Rajwada Ground, Satara, Maharashtra 415001
        </p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2"> Contact Us</h2>
        <p className="text-gray-700">
          Phone:{" "}
          <a href="tel:+919876543210" className="text-blue-600 underline">
            +91 98765 43210
          </a>
        </p>
        <p className="text-gray-700">
          Email:{" "}
          <a
            href="mailto:sataracricketarena@gmail.com"
            className="text-blue-600 underline"
          >
            sataracricketarena@gmail.com
          </a>
        </p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
           Timings & Bookings
        </h2>
        <p className="text-gray-700">Open Daily: 6:00 AM to 11:00 PM</p>
        <p className="text-gray-700">
          Booking Options: Hourly slots | Full-day events | Tournaments
        </p>
        <p className="text-gray-700">
          Payments Accepted: UPI, Cash, Online Transfers
        </p>
      </div>

      {/* Turf Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🌱 Turf Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            High-performance artificial turf – safe, durable, and weather-resistant
          </li>
          <li>Box cricket-ready dimensions</li>
          <li>Floodlights for evening matches</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 Amenities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Clean changing rooms & restrooms</li>
          <li>On-site parking</li>
          <li>Spectator seating area</li>
          <li>Snacks & beverages available</li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2"> Stay Connected</h2>
        <p className="text-gray-700">
          Instagram:{" "}
          <a href="#" className="text-blue-600 underline">
            @SataraCricketArena
          </a>
        </p>
        <p className="text-gray-700">
          Facebook:{" "}
          <a href="#" className="text-blue-600 underline">
            fb.com/SataraCricketArena
          </a>
        </p>
      </div>
    </div>
  );
};

export default CricketTurfInfo;
