import React from "react";
import TennisImage from "../../assets/places/TennisInfo.jpg"; // ✅ Ensure image exists

const TennisTurfInfo = () => {
  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto bg-white shadow-md rounded-lg text-center ">
      {/* Full Image */}
      <div className="mb-4">
        <img
          src={TennisImage}
          alt="Tennis Turf"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/booking" // 🔁 Update if booking page changes
          className="bg-white-600 text-blue  px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Book Now
        </a>
      </div>

      {/* Title & Tagline */}
      <h1 className="text-4xl font-bold mb-4 text-blue-800">
        🎾 Star Turf Zone – Tennis Turf
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <em>Precision meets performance at our Tennis Turf!</em>
      </p>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📍 Location</h2>
        <p className="text-gray-700">
          Near NH4 Highway, Satara, Maharashtra 415002
        </p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📞 Contact Us</h2>
        <p className="text-gray-700">
          Phone:{" "}
          <a href="tel:+919888877766" className="text-blue-600 underline">
            +91 98888 77766
          </a>
        </p>
        <p className="text-gray-700">
          Email:{" "}
          <a
            href="mailto:starturfzone@gmail.com"
            className="text-blue-600 underline"
          >
            starturfzone@gmail.com
          </a>
        </p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🕐 Timings & Bookings</h2>
        <p className="text-gray-700">Open Daily: 6:00 AM to 10:00 PM</p>
        <p className="text-gray-700">Booking Slots: Singles | Doubles | Practice</p>
        <p className="text-gray-700">Payments: UPI, Netbanking, Cash</p>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🎾 Turf Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Synthetic grass turf for consistent bounce</li>
          <li>Evening floodlights</li>
          <li>Coaching sessions available</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 Amenities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Changing rooms & lockers</li>
          <li>Seating for spectators</li>
          <li>Refreshments & drinks available</li>
          <li>On-site parking</li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📲 Stay Connected</h2>
        <p className="text-gray-700">
          Instagram:{" "}
          <a href="#" className="text-blue-600 underline">@StarTurfTennis</a>
        </p>
        <p className="text-gray-700">
          Facebook:{" "}
          <a href="#" className="text-blue-600 underline">fb.com/StarTurfTennis</a>
        </p>
      </div>
    </div>
  );
};

export default TennisTurfInfo;
