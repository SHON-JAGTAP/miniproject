import React, { useState } from "react";

const faqData = [
  {
    question: "How do I book a turf?",
    answer:
      "Click on the 'Book Now' button, choose your preferred turf, date, and time slot, then confirm your booking.",
  },
  {
    question: "Do I need to create an account to book?",
    answer:
      "Yes, sign up and login are required to keep track of your bookings and preferences.",
  },
  {
    question: "What facilities are available at the turf?",
    answer:
      "Facilities may include changing rooms, floodlights, parking, and equipment rental.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, cancellation or rescheduling is allowed up to 24 hours before your booking.",
  },
  {
    question: "Is the turf available for night bookings?",
    answer:
      "Yes, most turfs have floodlights and are open late. Night bookings may cost extra.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Force full width and horizontal centering
    <div className="w-screen min-h-screen bg-blue-50 py-16 flex justify-center pt-35">
      {/* Limit width & center FAQ */}
      <div className="w-full max-w-3xl px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 transition-all duration-300 ease-in-out"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left text-lg font-medium focus:outline-none"
                >
                  {item.question}
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
