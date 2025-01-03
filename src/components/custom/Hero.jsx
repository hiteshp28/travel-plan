import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div className=" flex flex-col items-center mx-10 md:mx-56 gap-9 mt-16">
      <h1 className="font-extrabold text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        <span className="text-[#DFAA2F] ">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <img
        className="h-[70vh] mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out "
        src="https://blog.solguruz.com/wp-content/uploads/2024/05/How-to-Build-an-AI-powered-Trip-Planner-App.png"
        alt="Home Image"
      />
      <p className="text-xl text-gray-600 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      
      <Link to={"/create-trip"}>
        <Button className="mb-12">Get Started, It's Free</Button>
      </Link>
      <img className='h-[90%]' src="/image.png" alt="" />
      
    </div>
  )
}

export default Hero
