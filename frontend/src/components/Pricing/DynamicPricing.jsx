import React, { useState, useEffect } from 'react';
import PaymentButton from '../Payment/PaymentButton';

const DynamicPricing = ({ turfId, city, timeSlot }) => {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (turfId && city && timeSlot) {
      fetchDynamicPrice();
    }
  }, [turfId, city, timeSlot]);

  const fetchDynamicPrice = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/pricing/dynamic?turfId=${turfId}&city=${city}&timeSlot=${timeSlot}`
      );
      const data = await response.json();
      setPricing(data);
    } catch (error) {
      console.error('Error fetching dynamic price:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading pricing...</div>;
  }

  if (!pricing) {
    return <div className="text-gray-500">Price not available</div>;
  }

  const getPriceColor = (condition) => {
    switch (condition) {
      case 'perfect': return 'text-green-600';
      case 'rainy': return 'text-blue-600';
      case 'hot': case 'cold': return 'text-orange-600';
      default: return 'text-gray-800';
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'perfect': return '☀️';
      case 'rainy': return '🌧️';
      case 'cloudy': return '☁️';
      case 'hot': return '🔥';
      case 'cold': return '❄️';
      default: return '🌤️';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Dynamic Pricing</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchDynamicPrice}
            className="bg-blue-500 text-black px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Check Price
          </button>
          <span className="text-2xl">{getWeatherIcon(pricing.weatherCondition)}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Weather:</span>
          <span className="capitalize">{pricing.currentWeather}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Temperature:</span>
          <span>{Math.round(pricing.temperature)}°C</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Base Price:</span>
          <span>₹{pricing.priceDetails.basePrice}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Weather Multiplier:</span>
          <span className={getPriceColor(pricing.weatherCondition)}>
            {pricing.priceDetails.weatherMultiplier}x
          </span>
        </div>
        
        <hr className="my-2" />
        
        <div className="flex justify-between items-center">
          <span className="font-semibold">Final Price:</span>
          <span className={`text-xl font-bold ${getPriceColor(pricing.weatherCondition)}`}>
            ₹{Math.round(pricing.dynamicPrice)}
          </span>
        </div>
        
        {pricing.priceDetails.weatherMultiplier !== 1.0 && (
          <div className="text-sm text-center mt-2 p-2 bg-gray-50 rounded">
            {pricing.priceDetails.weatherMultiplier > 1.0 
              ? `🌟 Premium pricing for perfect weather!`
              : `💰 Discounted due to ${pricing.weatherCondition} conditions`
            }
          </div>
        )}
        
        <div className="mt-4">
          <PaymentButton
            amount={Math.round(pricing.dynamicPrice)}
            onSuccess={(response) => {
              alert('Payment successful! Booking confirmed.');
              console.log('Payment response:', response);
            }}
            onError={(error) => {
              alert('Payment failed: ' + error);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicPricing;