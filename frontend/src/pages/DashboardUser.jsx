import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const DashboardUser = () => {
  const { user } = useAuth();
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings")
      .then((res) => {
        const userBookings = res.data.filter((b) => b.userEmail === user.email);
        setMyBookings(userBookings);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [user]);

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700"> My Bookings</h2>

      {myBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="px-6 py-3 text-left">Turf Name</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking) => (
                <tr key={booking.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4 font-medium">{booking.turfName}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
