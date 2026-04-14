import React from "react";
import HockeyImage from "../../assets/places/HockeyInfo.jpg"; // ✅ make sure this image exists

const HockeyTurfInfo = () => {
  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto bg-white shadow-md rounded-lg text-center">
      {/* Full Image Section */}
      <div className="mb-4">
        <img
          src={HockeyImage}
          alt="Hockey Turf"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/booking" // Update if needed
          className="bg-white-600 text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Book Now
        </a>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-blue-800">
        🏑 ProPlay Turf – Hockey Ground
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <em>Train like a pro in Satara!</em>
      </p>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📍 Location</h2>
        <p className="text-gray-700">
          Near Shivaji Stadium, Satara, Maharashtra 415002
        </p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📞 Contact Us</h2>
        <p className="text-gray-700">
          Phone:{" "}
          <a href="tel:+919876543211" className="text-blue-600 underline">
            +91 98765 43211
          </a>
        </p>
        <p className="text-gray-700">
          Email:{" "}
          <a
            href="mailto:satarahockeyarena@gmail.com"
            className="text-blue-600 underline"
          >
            satarahockeyarena@gmail.com
          </a>
        </p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🕐 Timings & Bookings</h2>
        <p className="text-gray-700">Open Daily: 6:00 AM to 10:00 PM</p>
        <p className="text-gray-700">Booking: Practice sessions | School tournaments</p>
        <p className="text-gray-700">Payments Accepted: UPI, Card, Cash</p>
      </div>

      {/* Turf Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🌱 Turf Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Water-based synthetic turf approved for official matches</li>
          <li>International standard dimensions</li>
          <li>Stadium-grade lighting</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 Amenities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Locker rooms and clean restrooms</li>
          <li>Water coolers and first-aid facility</li>
          <li>Seating for up to 100 spectators</li>
          <li>Parking for two-wheelers and four-wheelers</li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📷 Stay Connected</h2>
        <p className="text-gray-700">
          Instagram:{" "}
          <a href="#" className="text-blue-600 underline">
            @ProPlayHockeySatara
          </a>
        </p>
        <p className="text-gray-700">
          Facebook:{" "}
          <a href="#" className="text-blue-600 underline">
            fb.com/ProPlayHockeySatara
          </a>
        </p>
      </div>
    </div>
  );
};

export default HockeyTurfInfo;
