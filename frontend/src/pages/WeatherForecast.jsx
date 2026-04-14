import React from 'react';
import WeatherWidget from '../components/Weather/WeatherWidget';

const WeatherForecast = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Forecast</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherWidget city="Mumbai" />
        <WeatherWidget city="Delhi" />
        <WeatherWidget city="Pune" />
        <WeatherWidget city="Bangalore" />
        <WeatherWidget city="Chennai" />
        <WeatherWidget city="Kolkata" />
      </div>
    </div>
  );
};

export default WeatherForecast;