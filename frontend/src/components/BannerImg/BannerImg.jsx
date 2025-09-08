// src/components/BannerImg/BannerImg.jsx
import React from 'react';

const BannerImg = ({ img }) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "contain",          // ✅ Shows full image
    backgroundRepeat: "no-repeat",      // ✅ Prevent tiling
    backgroundPosition: "center",
    height: "100vh",                    // ✅ Full screen height
    width: "100%",                      // ✅ Full screen width
  };

  return (
    <div data-aos="zoom-in" style={bgImage}>
      {/* You can add overlay/text here if needed */}
    </div>
  );
};

export default BannerImg;
