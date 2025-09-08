import React from "react";
import GolfImage from "../../assets/places/GolfInfo.jpg"; // ✅ Make sure this image exists

const GolfTurfInfo = () => {
  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto bg-white shadow-md rounded-lg text-center">
      {/* Full Image */}
      <div className="mb-4">
        <img
          src={GolfImage}
          alt="Golf Turf"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/booking" // 🔁 Change this to your booking route if needed
          className="bg-white-600  text-blue px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Book Now
        </a>
      </div>

      {/* Title & Tagline */}
      <h1 className="text-4xl font-bold mb-4 text-green-800">
        ⛳ Sunrise Arena – Golf Turf
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <em>Elevate your game on Satara’s finest greens!</em>
      </p>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📍 Location</h2>
        <p className="text-gray-700">
          Mahabaleshwar Road, Satara, Maharashtra 415001
        </p>
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📞 Contact Us</h2>
        <p className="text-gray-700">
          Phone:{" "}
          <a href="tel:+919123456789" className="text-blue-600 underline">
            +91 91234 56789
          </a>
        </p>
        <p className="text-gray-700">
          Email:{" "}
          <a
            href="mailto:sunrisearenagolf@gmail.com"
            className="text-blue-600 underline"
          >
            sunrisearenagolf@gmail.com
          </a>
        </p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🕐 Timings & Bookings</h2>
        <p className="text-gray-700">Open Daily: 5:00 AM to 10:00 PM</p>
        <p className="text-gray-700">Booking Options: Hourly slots | Group bookings | Events</p>
        <p className="text-gray-700">Payments Accepted: UPI, Cash, Online</p>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🌿 Turf Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Smooth and even artificial grass for precise play</li>
          <li>Well-maintained putting greens</li>
          <li>Training and coaching available</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 Amenities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Modern clubhouse & locker rooms</li>
          <li>Ample parking space</li>
          <li>Pro-shop for golf gear</li>
          <li>Refreshments & lounge</li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📲 Stay Connected</h2>
        <p className="text-gray-700">
          Instagram:{" "}
          <a href="#" className="text-blue-600 underline">@SunriseGolfArena</a>
        </p>
        <p className="text-gray-700">
          Facebook:{" "}
          <a href="#" className="text-blue-600 underline">fb.com/SunriseGolfArena</a>
        </p>
      </div>
    </div>
  );
};

export default GolfTurfInfo;
