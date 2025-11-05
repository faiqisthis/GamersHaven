import React from "react";
import HeroBackground from "../assets/ImageSlider/COD-background2.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function Hero() {
  const user=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    headers:{
       'Content-Type':'application/json',
    }
 })
 
  return (
    <>
      <div className=" relative p-[40px] min-h-screen flex max-w-[1440px] mx-auto">
        {/* Background Image Div */}
        {/* <div
          style={{
            backgroundImage: `url(${HeroBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.6, // Set opacity for the background image
          }}
        ></div> */}

        {/* Content */}
        <div className="hero-content  text-gray-300 w-1/2">
          <div>
            <h1 className="md:text-5xl lg:text-[48px] font-bold text-4xl text-primary">
              Level Up Your Gaming Experience!
            </h1>
            <p className="py-6  text-[20px] text-secondary-content ">
              Discover the latest games, consoles, and accessories at unbeatable
              prices!
            </p>
            <Link
              to="/explore"
              className="bg-black px-[20px] py-[14px] rounded-[12px]  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <img
        src={HeroBackground}
        className="w-1/2 object-cover rounded-[12px] "
        />
      </div>
    </>
  );
}

export default Hero;
