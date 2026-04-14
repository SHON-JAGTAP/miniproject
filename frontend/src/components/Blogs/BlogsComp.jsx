// src/components/Blogs/BlogsComp.jsx

import React from 'react';
import BlogsCard from './BlogCard';
import Img1 from '../../assets/places/Cricket.jpg';
import Img2 from '../../assets/places/Football.jpg';

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "The 10 best turfs to visit in Satara",
    description: "Top-rated turfs where you can enjoy cricket, football, and more in Satara!",
    author: "Atharva Chavan",
    date: "June, 2025",
    extraInfo: [
      "1. Satara Sports Arena cricket turf",
      "2. Green Turf Satara Football Turf",
      "3. ProPlay Turf Hockey Turf",
      "4. Atharva Stadium Rugby Turf",
      "5. Sunrise Arena GolfTurf",
      "6. Star Turf Zone Tennis Turf",
      "7. GameOn Turf",
      "8. Velocity Turf",
      "9. UrbanZone Athletic Park",
      "10. Royal Arena Satara"
    ]
  },
  {
    id: 2,
    image: Img2,
    title: "The 10 best turf to visit in Pune",
    description: "Perfect turf locations for cricket and football lovers in Pune!",
    author: "Atharva Chavan",
    date: "June, 2025",
    extraInfo: [
      "1. Turf Up, Kothrud",
      "2. The Game Arena, Baner",
      "3. KheloMore Turf, Viman Nagar",
      "4. XLR8 Arena, Wakad",
      "5. TurfZone, Hadapsar",
      "6. Urban Sports Arena, Balewadi",
      "7. Goalster Turf, FC Road",
      "8. Ground Zero, Shivaji Nagar",
      "9. Elite Sports Arena, Kharadi",
      "10. KickOff Turf, Sinhagad Road"
    ]
  },
];

const BlogsComp = () => {
  return (
    <div className="bg-gray-50 pt-24 px-4">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <h1 className="my-8  py-2 pl-2 text-3xl font-bold text-center text-blue-800">
          Our Latest Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BlogsData.map((blog, index) => (
            <BlogsCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsComp;
