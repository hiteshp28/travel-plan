import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDailog(false);
        window.location.reload();
        // generateTrip();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <img src="/logo.svg" className="w-15 md:w-30" />
      </Link>
      <div>
        {user ? (
          <div className="flex justify-center items-center gap-1 md:gap-3">
            <Link
              className="no-underline text-black hover:text-black"
              to={"/create-trip"}
            >
              <Button variant="outline" className="rounded-full">
                Create Trips
              </Button>
            </Link>
            <Link
              className="no-underline text-black hover:text-black"
              to={"/my-trips"}
            >
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className="rounded-full h-[35px] w-[35px]"
                />
              </PopoverTrigger>
              <PopoverContent className="w-48 hover:bg-gray-100 cursor-pointer">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Dialog open={openDailog} onOpenChange={setOpenDailog}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <img src="/logo.svg" className="w-10 md:w-12" alt="Logo" />
          </DialogTitle>
          <DialogDescription>
            <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
            <p>Sign in to the app with Google authentication.</p>
            <Button
              className="w-full mt-5 flex items-center gap-2"
              onClick={handleLogin}
            >
              <FcGoogle className="h-5 w-5" /> Sign In with Google
            </Button>
          </DialogDescription>
          <div className="flex justify-end">
            <Button onClick={() => setOpenDailog(false)}>Close</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
        )}
      </div>
    </div>
  );
};

export default Header;
