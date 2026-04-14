import React from "react";

const turfContacts = [
  {
    name: " Satara Sports Arena cricket turf",
    phone: "+91 1234567890",
    email: "cricket@satara1.com",
    location: "Satara1",
  },
  {
    name: "Green Turf Satara Football Turf",
    phone: "+91 1234567890",
    email: "football@satara2.com",
    location: "Satara2",
  },
  {
    name: "ProPlay Turf Hockey Turf",
    phone: "+91 1234567890",
    email: "hockey@satara3.com",
    location: "Satara3",
  },
    {
    name: "Sunrise Arena GolfTurf",
    phone: "+91 1234567890",
    email: "golf@satara5.com",
    location: "Satara5",
  },
  // ➕ Add more turf contacts here
];

const TurfContacts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center pt-10">Turf Contacts</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {turfContacts.map((turf, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg  transition duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">{turf.name}</h3>
            <p className="text-gray-600"> Location = {turf.location}</p>
            <p className="text-gray-600"> Phone.No ={turf.phone}</p>
            <p className="text-gray-600"> Email = {turf.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurfContacts;
