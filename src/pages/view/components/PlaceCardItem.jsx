import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await getPlaceDetails(data).then((response) => {
      console.log(response.data)
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);
  return (
    <Link
        className="no-underline text-black hover:text-black"
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className=" my-2 border p-3 rounded-xl flex gap-5 hover:scale-105 transition-all hover:shadow-sm cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.png"}
          className="w-[100px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-600">{place.placeDetails}</p>
          <h2 className="mt-2 text-sm">🪙 {place.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
