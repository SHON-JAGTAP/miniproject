import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [price, setPrice] = useState(2000);
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const turfList = [
    { name: "Satara Sports Arena Cricket Turf", route: "/turf/cricket", price: 1000 },
    { name: "Green Turf Satara Football Turf", route: "/turf/football", price: 1200 },
    { name: "ProPlay Turf Hockey Turf", route: "/turf/hockey", price: 1000 },
    { name: "Atharva Stadium Rugby Turf", route: "/turf/rugby", price: 1200 },
    { name: "Sunrise Arena Golf Turf", route: "/turf/golf", price: 1300 },
    { name: "Star Turf Zone Tennis Turf", route: "/turf/tennis", price: 1000 },
  ];

  const handleSearch = () => {
    const input = searchText.toLowerCase();
    const match = turfList.find(
      (turf) =>
        input.includes(turf.name.toLowerCase()) && turf.price <= price
    );
    if (match) {
      navigate(match.route);
    } else {
      alert("Turf not found or exceeds your budget. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white/80 backdrop-blur-md text-black px-8 py-10 rounded-xl shadow-2xl w-[95%] max-w-[700px]">
        <div className="text-center mb-6">
          <p className="text-sm text-teal-600 tracking-wide">Premium Turf</p>
          <h1 className="text-3xl font-bold text-gray-800">Book Your Turf</h1>
          <p className="text-gray-600 mt-1 text-sm">Search turf.</p>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <input
            type="text"
            placeholder="e.g. Satara Sports Arena Cricket Turf"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-3 w-full"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 w-full"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-gray-700 font-medium">Max Price</label>
              <span className="text-teal-600 font-semibold">₹{price}</span>
            </div>
            <input
              type="range"
              min={0}
              max={2000}
              step={100}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full accent-red-700"
            />
          </div>
                
          <div className="text-center mt-4">
            <button
              onClick={handleSearch}
              className="bg-red-500 hover:bg-red-600 text-black px-8 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;