// src/components/Blogs/BlogCard.js
import React, { useState } from 'react';

const BlogsCard = ({ image, title, description, author, date, extraInfo }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 overflow-hidden max-w-xl mx-auto">
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-[250px] object-cover"
      />

      {/* Blog Content */}
      <div className="p-4 space-y-3">
        {/* Date and Author */}
        <div className="flex justify-between text-sm text-gray-500">
          <p>{date}</p>
          <p className="italic">by {author}</p>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600">
          {description}
        </p>

        {/* Extra Info Toggle */}
        {showMore && (
          <div className="text-gray-700 mt-2 border-t pt-2 text-sm">
            <ul className="list-disc list-inside space-y-1">
              {extraInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Read More Button */}
        <div className="pt-2 text-right">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {showMore ? 'Show Less ←' : 'Read More →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
