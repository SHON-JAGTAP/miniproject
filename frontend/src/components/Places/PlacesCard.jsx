import React from "react";
import { Link } from "react-router-dom";

const PlacesCard = ({ img, title, location, description, price, type, slug }) => {
  return (
    <Link to="/booking" state={{ img, title, location, description, price, type, slug }}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
        <img src={img} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="mt-2">{description}</p>
          <p className="text-teal-600 font-bold mt-2">{price}</p>
          <p className="text-xs text-gray-500">{type}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlacesCard;
