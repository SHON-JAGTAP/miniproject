import React, { useState } from 'react';
import DynamicPricing from '../components/Pricing/DynamicPricing';

const PricingTest = () => {
  const [customTest, setCustomTest] = useState({
    turfId: '1759600312644',
    city: 'Mumbai',
    timeSlot: 'morning'
  });
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dynamic Pricing Test</h1>
      
      {/* Custom Test Form */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <button 
          onClick={() => setShowCustom(!showCustom)}
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          {showCustom ? 'Hide' : 'Show'} Custom Price Check
        </button>
        
        {showCustom && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <select 
              value={customTest.turfId}
              onChange={(e) => setCustomTest({...customTest, turfId: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="1759600312644">Turf 1</option>
              <option value="1759682644514">Turf 2</option>
            </select>
            
            <input 
              type="text"
              placeholder="City"
              value={customTest.city}
              onChange={(e) => setCustomTest({...customTest, city: e.target.value})}
              className="p-2 border rounded"
            />
            
            <select 
              value={customTest.timeSlot}
              onChange={(e) => setCustomTest({...customTest, timeSlot: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        )}
        
        {showCustom && (
          <DynamicPricing 
            turfId={customTest.turfId}
            city={customTest.city}
            timeSlot={customTest.timeSlot}
          />
        )}
      </div>
      
      {/* Default Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DynamicPricing 
          turfId="1759600312644" 
          city="Mumbai" 
          timeSlot="morning" 
        />
        
        <DynamicPricing 
          turfId="1759682644514" 
          city="Delhi" 
          timeSlot="afternoon" 
        />
      </div>
    </div>
  );
};

export default PricingTest;