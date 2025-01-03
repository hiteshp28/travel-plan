import React from 'react';

const MustCarry = ({ trip }) => {
  return (
    <div className="mt-7 p-5 border rounded-lg shadow-lg">
      <h1 className="font-bold text-2xl  mb-5">Must Carry Items</h1>
      <ul className="space-y-3">
        {trip?.tripData?.mustCarryItems.map((item, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500 hover:bg-blue-100 transition-all"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MustCarry;
