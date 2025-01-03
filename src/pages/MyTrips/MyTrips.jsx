
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTripCard from "../view/components/MyTripCard";
import { db } from "@/service/firebaseConfig";

 const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const getUsertrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getUsertrips();
  }, []);
  return (
    <div>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-2xl">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {userTrips?.length > 0
            ? userTrips.map((item, index) => (
                <MyTripCard item={item} index={index} />
              ))
            : [1, 2, 3,4,5,6].map((item, index) => (
                <div
                  key={index}
                  className="h-[250px] w-full bg-slate-200 animate-pulse rounded-md"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;