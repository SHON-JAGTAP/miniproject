import React from 'react';

const Location = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="inline-block border-l-8 border-primary/50 py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl">
          Location to visit
        </h1>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0108334278175!2d73.99923137507253!3d17.688858695199804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc237ef1e72e44b%3A0x65b2c4ff9a1c1dd4!2sSatara%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718627143720!5m2!1sen!2sin"
            frameBorder="0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[400px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
