// src/pages/profile/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/profile/${user.email}`)
        .then((res) => setName(res.data.name))
        .catch((err) => console.error("Failed to fetch profile", err));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/profile/${user.email}`, { name })
      .then(() => {
        alert("Profile updated successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Update failed.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">Name</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-black p-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
