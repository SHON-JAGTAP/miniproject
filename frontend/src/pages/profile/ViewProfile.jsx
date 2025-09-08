// src/pages/profile/ViewProfile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const ViewProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/profile/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error("Profile fetch failed", err));
    }
  }, [user]);

  if (!profile) return <p className="text-center mt-24">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Your Profile</h2>
      <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
      <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
      <p className="mb-2"><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default ViewProfile;
