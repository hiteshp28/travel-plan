import { getPlaceDetails, PHOTO_REF_URL } from "@/service/globalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ item, index }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    const data = {
        textQuery: item?.hotelName
    };
    const result = await getPlaceDetails(data).then((response) => {

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[4].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);
  return (
    <Link
    className="no-underline text-black hover:text-black"
      to={`https://www.google.com/maps/search/?api=1&query=${item?.hotelName}${item?.hotelAddress}`}
      target="_blank"
    >
      <div id={index} className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.png"}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{item?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {item?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {item?.price}</h2>
          <h2 className="text-sm">⭐ {item?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};
export default HotelCard;