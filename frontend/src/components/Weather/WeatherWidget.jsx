import React, { useState, useEffect } from 'react';

const WeatherWidget = ({ city = 'Mumbai' }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch current weather
      const currentResponse = await fetch(`http://localhost:5000/api/weather/current?city=${city}`);
      if (!currentResponse.ok) {
        throw new Error(`Weather API error: ${currentResponse.status}`);
      }
      const currentData = await currentResponse.json();
      console.log('Weather data:', currentData);
      
      // Fetch forecast
      const forecastResponse = await fetch(`http://localhost:5000/api/weather/forecast?city=${city}`);
      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`);
      }
      const forecastData = await forecastResponse.json();
      console.log('Forecast data:', forecastData);
      
      setWeather(currentData);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-100 p-4 rounded-lg">
        <div className="animate-pulse">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg border border-red-300">
        <div className="text-red-700">Error: {error}</div>
        <button 
          onClick={fetchWeather}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg border">
      {weather ? (
        <div className="mb-4">
          <h3 className="text-lg font-bold">{weather.city || city} Weather</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {weather.temperature ? Math.round(weather.temperature) : 'N/A'}°C
              </div>
              <div className="capitalize">{weather.description || 'No data'}</div>
              <div className="text-sm">Humidity: {weather.humidity || 'N/A'}%</div>
            </div>
            <div>
              {weather.icon && (
                <img 
                  src={`https://openweathermap.org/img/w/${weather.icon}.png`}
                  alt={weather.description}
                  className="w-16 h-16"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 text-gray-500">No weather data available</div>
      )}
      
      {forecast && forecast.forecast ? (
        <div>
          <h4 className="font-semibold mb-2">5-Hour Forecast</h4>
          <div className="grid grid-cols-5 gap-2 text-xs">
            {forecast.forecast.map((item, index) => (
              <div key={index} className="text-center bg-gray-100 rounded p-2">
                <div>{item.time ? item.time.split(':')[0] + ':00' : 'N/A'}</div>
                {item.icon && (
                  <img 
                    src={`https://openweathermap.org/img/w/${item.icon}.png`}
                    alt={item.description}
                    className="w-8 h-8 mx-auto"
                  />
                )}
                <div>{item.temperature ? Math.round(item.temperature) : 'N/A'}°</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No forecast data available</div>
      )}
    </div>
  );
};

export default WeatherWidget;