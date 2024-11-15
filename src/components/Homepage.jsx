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
      <div className="hero relative min-h-screen">
        {/* Background Image Div */}
        <div
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
        ></div>

        {/* Content */}
        <div className="hero-content text-center relative z-10 text-gray-300">
          <div>
            <h1 className="md:text-6xl font-bold text-3xl">
              Level Up Your Gaming Experience!
            </h1>
            <p className="py-6 text-2xl">
              Discover the latest games, consoles, and accessories at unbeatable
              prices!
            </p>
            <Link
              to="/explore"
              className="btn btn-lg btn-primary transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
