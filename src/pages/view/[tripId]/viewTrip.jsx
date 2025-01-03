import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import HotelSection from "../components/HotelSection";
import VisitSection from "../components/VisitSection";
import MustCarry from "../components/MustCarry";
import FoodReccomend from "../components/FoodReccomend";

function ViewTrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);
  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTripData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast("No Trip Found");
    }
  };
  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);
  return (
      <div className="p-10 md:px-20 lg:px-40 xl:px-30">
        {/* Information Section */}
        <InfoSection trip={tripData} />
        {/* Hotels */}
        <HotelSection trip={tripData} />
        {/* Daily plan */}
        <VisitSection trip={tripData} />
        {/* Food Recommendation */}
        <FoodReccomend trip={tripData} />
        {/* Must Carry Items */}
        <MustCarry trip={tripData} />
      </div>
  );
}

export default ViewTrip;
