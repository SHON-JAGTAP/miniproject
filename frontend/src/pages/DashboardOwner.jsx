import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardOwner = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
         Booking Requests
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No booking requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Turf</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4 font-medium">{booking.userName}</td>
                  <td className="px-6 py-4">{booking.userEmail}</td>
                  <td className="px-6 py-4">{booking.turfName}</td>
                  <td className="px-6 py-4">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(`2000-01-01T${booking.fromTime}`).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(`2000-01-01T${booking.toTime}`).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${
                        booking.status === "Accepted"
                          ? "text-green-600"
                          : booking.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(booking.id, "Accepted")}
                          className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "Rejected")}
                          className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardOwner;
