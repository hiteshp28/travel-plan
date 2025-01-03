import { getPlaceDetails, PHOTO_REF_URL } from "@/service/globalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyTripCard = ({ item, index }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item?.userSelection?.location?.label,
    };
    const result = await getPlaceDetails(data).then((response) => {
      console.log(response.data.places[0].photos[3].name);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[3].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);
  return (
    <Link to={`/view-trip/${item.id}`}>
      <div key={index} className="border rounded-lg hover:scale-105 transition-all hover:shadow-md h-[250px]">
        <img
          src={photoUrl}
          className="mb-2 rounded-t-md object-cover w-full h-[140px]"
        />
        <div>
          <h2 className="text-center font-bold text-lg">
            {item?.userSelection?.location?.label}
          </h2>
          <h2 className="text-center text-sm text-gray-500">
            {item?.userSelection?.noOfDays} Days trip with
            {item?.userSelection?.budget} budget{" "}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default MyTripCard