import { Button } from '@/components/ui/button'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({trip}) {
  const [photoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    const data = {
        textQuery: trip?.userSelection?.location?.label
    };
    if (!data.textQuery) {
      data.textQuery="Any Famous Place"
    }
    const result = await getPlaceDetails(data).then((response) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[6].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  return (
    <div>
      <img className="h-[340px] w-full object-cover rounded-xl" src={photoUrl ? photoUrl : "/placeholder.png"}  alt="" />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3  ">
            <h2 className="p-1 px-1 md:px-3 bg-gray-200 rounded-full text-gray-500">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🧳 No. Of Traveler: {trip?.userSelection?.people}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend/>
        </Button>
      </div>
    </div>
  )
}

export default InfoSection
