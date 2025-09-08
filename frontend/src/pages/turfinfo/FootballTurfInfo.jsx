import React from "react";
import FootballImage from "../../assets/places/FootballInfo.jpg";

const FootballTurfInfo = () => {
  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto bg-white shadow-md rounded-lg text-center">
      {/* Full Image */}
      <div className="mb-6">
        <img
          src={FootballImage}
          alt="Football Turf"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center mb-8">
        <a
          href="/booking" // 👉 Change this if you have a specific booking route
          className="bg-white-600 text-blue px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Book Now
        </a>
      </div>

      {/* Title & Tagline */}
      <h1 className="text-4xl font-bold mb-4 text-blue-800">
        ⚽ Green Turf Satara – Football Turf
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        <em>Kick off your best game in Satara's premium turf ground!</em>
      </p>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📍 Location</h2>
        <p className="text-gray-700">
          Stadium Road, near New College, Satara, Maharashtra 415002
        </p>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📞 Contact Us</h2>
        <p className="text-gray-700">
          Phone: <a href="tel:+919812345678" className="text-blue-600 underline">+91 98123 45678</a>
        </p>
        <p className="text-gray-700">
          Email: <a href="mailto:footballarena@satara.com" className="text-blue-600 underline">footballarena@satara.com</a>
        </p>
      </div>

      {/* Timings */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🕐 Timings & Bookings</h2>
        <p className="text-gray-700">Open Daily: 5:00 AM – 10:00 PM</p>
        <p className="text-gray-700">Booking Slots: Hourly / Match Day Events / Tournaments</p>
        <p className="text-gray-700">Payments: UPI, Cards, Netbanking, Cash</p>
      </div>

      {/* Turf Features */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🌱 Turf Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Premium synthetic turf – anti-slip, shock absorbent</li>
          <li>FIFA-size turf for full-field matches</li>
          <li>Advanced drainage system – all-weather play</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 Amenities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Changing rooms with lockers</li>
          <li>Shaded seating gallery for viewers</li>
          <li>First-aid and physio support</li>
          <li>Refreshments & energy drinks counter</li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📲 Connect with Us</h2>
        <p className="text-gray-700">
          Instagram: <a href="#" className="text-blue-600 underline">@SataraFootballArena</a>
        </p>
        <p className="text-gray-700">
          Facebook: <a href="#" className="text-blue-600 underline">fb.com/SataraFootballArena</a>
        </p>
      </div>
    </div>
  );
};

export default FootballTurfInfo;
