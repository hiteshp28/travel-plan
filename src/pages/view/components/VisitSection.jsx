import React from 'react';
import { Link } from 'react-router-dom';
import PlaceCardItem from './PlaceCardItem';

function VisitSection({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl my-5">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([dayKey, dayData], index) => (
            <div key={index}>
              <h2 className="font-medium text-lg">{dayKey.replace('day', 'Day ')} :</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3 gap-5">
                {dayData.activities.map((place, index) => (
                  <div className="my-2" key={index}>
                    <h2 className="font-medium text-sm text-orange-600">
                      {place.timeTravel || 'Time not specified'}
                    </h2>
                    <PlaceCardItem place={place}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default VisitSection;
