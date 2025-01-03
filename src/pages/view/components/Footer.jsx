import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link to={"/"} className="no-underline text-black hover:text-black">
            Trip Planner™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};