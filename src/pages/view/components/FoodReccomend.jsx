import React from 'react';

const FoodReccomend = ({ trip }) => {
  return (
    <div className="p-5 border rounded-lg shadow-lg mt-8">
      <h1 className="font-bold text-2xl mb-5">Food Recommendations</h1>
      <ul className="space-y-3">
        {trip?.tripData?.foodRecommendations.map((item, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-md shadow-sm border-l-4 border-orange-500 hover:bg-orange-100 transition-all"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodReccomend;
