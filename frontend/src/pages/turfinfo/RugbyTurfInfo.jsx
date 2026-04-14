// src/pages/turfinfo/RugbyTurfInfo.jsx
import React from "react";
import RugbyImage from "../../assets/places/Rugby.jpg"; // ✅ Ensure image name and path is correct

const RugbyTurfInfo = () => {
  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto bg-white shadow-md rounded-lg text-center">
      
      {/* Full Image Section */}
      <div className="mb-4">
        <img
          src={RugbyImage}
          alt="Rugby Turf"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/booking" // 👉 Update this if you have a specific booking route
          className="bg-white-600 text-blue px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Book Now
        </a>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-blue-800">
        🏉 Atharva Stadium – Rugby Turf
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <em>Play Strong. Play Safe.</em>
      </p>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📍 Location</h2>
        <p className="text-gray-700">
          Near Mahadji Park, Satara, Maharashtra 415002
        </p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📞 Contact Us</h2>
        <p className="text-gray-700">
          Phone: <a href="tel:+919812345678" className="text-blue-600 underline">+91 98123 45678</a>
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:satararugbyarena@gmail.com" className="text-blue-600 underline">satararugbyarena@gmail.com</a>
        </p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🕐 Timings & Bookings</h2>
        <p className="text-gray-700">Open Daily: 5:30 AM to 10:30 PM</p>
        <p className="text-gray-700">Booking Options: Hourly, Match Days, Full Day</p>
        <p className="text-gray-700">Payments Accepted: UPI, Cash, Cards</p>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🌱 Turf Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Shock-absorbing synthetic turf for safe tackles</li>
          <li>Regulation rugby field size</li>
          <li>Floodlights for night training</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 Amenities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>First-aid and physiotherapy station</li>
          <li>Separate changing rooms for teams</li>
          <li>Ample vehicle parking</li>
          <li>Drinks & refreshments kiosk</li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📷 Stay Connected</h2>
        <p className="text-gray-700">
          Instagram: <a href="#" className="text-blue-600 underline">@AtharvaRugbyTurf</a>
        </p>
        <p className="text-gray-700">
          Facebook: <a href="#" className="text-blue-600 underline">fb.com/AtharvaRugbyTurf</a>
        </p>
      </div>
    </div>
  );
};

export default RugbyTurfInfo;
