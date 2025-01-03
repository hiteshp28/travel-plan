import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "@/service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
  }, [formData]);

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip = async () => {
    
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.noOfDays ||
      !formData?.people
    ) {
      toast.warn(`Enter all details to continue`, { autoClose: 1500 });
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip=async (TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false); 
    navigate('/view-trip/'+docId)
  }

  const getUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:`Application/json`
      }
    }).then((resp)=>{
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences ⛱️ 🌴{" "}
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div>
        <div className="mt-10 flex flex-col gap-10">
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            min="1"
            max="5"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">What is Your Budget ?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg 
                hover:shadow-lg
                ${formData?.budget === item.title && "shadow-lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure ?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("people", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.people === item.people && "shadow-lg border-black"
                  }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateTrip} disabled={loading} >
        {loading?<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />:'Generate Trip'}
        </Button>
      </div>
      <Dialog open={openDialog} hideCloseButton>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" className="w-10 md:w-12" alt="Logo" />
            </DialogTitle>
            <div className="mt-2">
              <h2 className="font-bold text-lg">Sign In with Google</h2>
              <p>Sign in to the app with Google authentication.</p>
              <Button className="w-full mt-5 flex items-center gap-2 mb-3" onClick={login}>
                <FcGoogle className="h-5 w-5" /> Sign In with Google
              </Button>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
