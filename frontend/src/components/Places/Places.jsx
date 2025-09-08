import React, { useEffect, useState } from "react";
import Img1 from "../../assets/places/Cricket.jpg";
import Img2 from "../../assets/places/Football.jpg";
import Img3 from "../../assets/places/Hockey.jpg";
import Img4 from "../../assets/places/Rugby.jpg";
import Img5 from "../../assets/places/Golf.jpg";
import Img6 from "../../assets/places/Tennis.jpg";

import PlacesCard from "./PlacesCard";

const defaultPlacesData = [
  {
    img: Img1,
    title: "Satara Sports Arena Cricket Turf",
    location: "Satara1",
    description: "Spacious turf for league and practice cricket matches.",
    price: "₹1000",
    type: "Natural Grass",
    slug: "cricket",
  },
  {
    img: Img2,
    title: "Green Turf Satara Football Turf",
    location: "Satara2",
    description: "Premium synthetic turf ideal for fast-paced football.",
    price: "₹1200",
    type: "Hybrid Grass",
    slug: "football",
  },
  {
    img: Img3,
    title: "ProPlay Turf Hockey Turf",
    location: "Satara3",
    description: "Professional water-based hockey turf for matches .",
    price: "₹1000",
    type: "Water-Based Turf",
    slug: "hockey",
  },
  {
    img: Img4,
    title: "Atharva Stadium Rugby Turf",
    location: "Satara4",
    description: "Robust and spacious turf suited for contact sports like rugby.",
    price: "₹1200",
    type: "Synthetic Turf",
    slug: "rugby",
  },
  {
    img: Img5,
    title: "Sunrise Arena Golf Turf",
    location: "Satara5",
    description: "Smooth, lush green designed for golf training and events.",
    price: "₹1300",
    type: "Artificial Turf",
    slug: "golf",
  },
  {
    img: Img6,
    title: "Star Turf Zone Tennis Turf",
    location: "Satara6",
    description: "Well-maintained turf with bounce control for tennis matches.",
    price: "₹1000",
    type: "Synthetic Grass",
    slug: "tennis",
  },
];

const Places = () => {
  const [places, setPlaces] = useState(defaultPlacesData);

  useEffect(() => {
    const addedByOwner = JSON.parse(localStorage.getItem("turfList")) || [];
    if (addedByOwner.length > 0) {
      setPlaces([...defaultPlacesData, ...addedByOwner]);
    }
  }, []);

  return (
    <div className="bg-gray-100 pt-24 pb-10 ">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6  text-center text-blue-800 ">Best Turf to Visit</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.map((item, index) => (
            <PlacesCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Places;
