import React from "react";
import HotelCard from "./HotelCard.jsx";

const HotelSection = ({ trip }) => {
  console.log(trip);
  return (
    <div>
      <h2 className="font-bold text-xl my-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {trip?.tripData?.hotelOptions?.map((item, index) => (
          <HotelCard key={index} item={item} index={index}/>
        ))}
      </div>
    </div>
  );
};
export default HotelSection;