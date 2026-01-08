import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentButton from '../components/Payment/PaymentButton';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    navigate('/booking');
    return null;
  }

  const handlePaymentSuccess = (response) => {
    // Save booking with payment details
    const completeBooking = {
      ...bookingData,
      paymentId: response.razorpay_payment_id,
      paid: true,
      status: 'Confirmed'
    };
    
    // Navigate to success page or back to dashboard
    navigate('/dashboard-user', { 
      state: { 
        message: 'Booking confirmed successfully!',
        booking: completeBooking 
      }
    });
  };

  const handlePaymentError = (error) => {
    alert('Payment failed: ' + error);
    navigate('/booking');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Complete Payment</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Turf:</span>
            <span className="font-medium">{bookingData.turfName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span>{bookingData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span>{bookingData.fromTime} - {bookingData.toTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span>{bookingData.hours} hour(s)</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-blue-600">₹{bookingData.amount}</span>
          </div>
        </div>

        <PaymentButton
          amount={bookingData.amount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
        
        <button
          onClick={() => navigate('/booking')}
          className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;