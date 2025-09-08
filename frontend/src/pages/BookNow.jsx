import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Default turf list
const defaultTurfs = [
  { name: "Satara Sports Arena – Cricket Turf", pricePerHour: 1000 },
  { name: "Green Turf Satara – Football Turf", pricePerHour: 1200 },
  { name: "ProPlay Turf – Hockey Turf", pricePerHour: 1000 },
  { name: "Atharva Stadium – Rugby Turf", pricePerHour: 1200 },
  { name: "Sunrise Arena – Golf Turf", pricePerHour: 1300 },
  { name: "Star Turf Zone – Tennis Turf", pricePerHour: 1000 },
];

const BookNow = () => {
  const { user } = useAuth();
  const [turf, setTurf] = useState(defaultTurfs[0].name);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [paid, setPaid] = useState(false);
  const [hours, setHours] = useState(0);
  const [error, setError] = useState("");

  const [bookedSlots, setBookedSlots] = useState([]);

  // Update price and hours
  useEffect(() => {
    const selected = defaultTurfs.find((t) => t.name === turf);
    if (selected && from && to) {
      const fromHour = parseInt(from.split(":")[0]);
      const toHour = parseInt(to.split(":")[0]);
      const duration = toHour - fromHour;

      if (duration > 0) {
        setHours(duration);
        setPrice(duration * selected.pricePerHour);
        setError("");
      } else {
        setHours(0);
        setPrice(0);
        setError("⚠️ Invalid time range (To time must be after From time)");
      }
    }
  }, [turf, from, to]);

  // Fetch already booked slots when turf or date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!turf || !date) return;

      try {
        const res = await axios.get("http://localhost:5000/api/bookings/booked-slots", {
          params: { turfName: turf, date },
        });
        setBookedSlots(res.data); // should return [{ fromTime: "17:00", toTime: "19:00" }]
      } catch (err) {
        console.error("Failed to fetch booked slots:", err);
      }
    };

    fetchBookedSlots();
  }, [turf, date]);

  const handlePayment = () => {
    if (price <= 0) {
      alert("⚠️ Please select a valid time range.");
      return;
    }
    alert(`✅ Payment of ₹${price} successful!`);
    setPaid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paid) {
      alert("⚠️ Please complete the payment first.");
      return;
    }

    // Check for overlapping bookings
    const isOverlap = bookedSlots.some((slot) => {
      return (
        (from >= slot.fromTime && from < slot.toTime) ||
        (to > slot.fromTime && to <= slot.toTime) ||
        (from <= slot.fromTime && to >= slot.toTime)
      );
    });

    if (isOverlap) {
      alert("❌ Selected slot overlaps with an existing booking. Please choose another slot.");
      return;
    }

    const bookingData = {
      userEmail: user.email,
      userName: user.name || "Unknown",
      turfName: turf,
      date,
      fromTime: from,
      toTime: to,
      paid: true,
      status: "Pending",
    };

    try {
      await axios.post("http://localhost:5000/api/bookings", bookingData);
      alert("✅ Booking submitted successfully!");
      setDate("");
      setFrom("");
      setTo("");
      setPaid(false);
      setHours(0);
      setPrice(0);
      setBookedSlots([]); // refresh
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Failed to book turf. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-10">
      <div className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-1">Book a Turf</h2>
        <p className="text-center text-gray-600 mb-6">Select your turf, time and pay</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Select Turf</label>
            <select
              value={turf}
              onChange={(e) => setTurf(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            >
              {defaultTurfs.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name} (₹{option.pricePerHour}/hr)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">From Time</label>
              <input
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border rounded px-4 py-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">To Time</label>
              <input
                type="time"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border rounded px-4 py-2"
                required
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          {hours > 0 && (
            <div className="text-center font-semibold text-blue-600">
              {hours} hour(s) × ₹{price / hours} = ₹{price}
            </div>
          )}

          {/* Show already booked slots */}
          {bookedSlots.length > 0 && (
            <div className="text-sm text-red-600 mt-4">
              <p className="font-semibold">Booked Slots:</p>
              <ul className="list-disc ml-6">
                {bookedSlots.map((slot, i) => (
                  <li key={i}>
                    {slot.fromTime?.slice(0, 5)} - {slot.toTime?.slice(0, 5)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!paid ? (
            <button type="button" onClick={handlePayment} className="w-full bg-green-500 py-3 rounded text-black">
              Pay ₹{price > 0 ? price : "?"}
            </button>
          ) : (
            <div className="text-green-600 text-center font-semibold">✅ Payment Done</div>
          )}

          <button
            type="submit"
            disabled={!paid || price <= 0}
            className={`w-full py-3 rounded ${
              paid && price > 0
                ? "bg-blue-600 text-black"
                : "bg-gray-300 text-black cursor-not-allowed"
            }`}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookNow;
