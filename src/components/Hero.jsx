import React from "react";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function Hero() {
  const user = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <>
      <div className="bg-[#fefae0]  relative">
        <div className=" py-[64px] flex max-w-[1440px] mx-auto  ">
          {/* Background Image Div */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1635372730136-06b29022281c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwZXNwb3J0c3xlbnwxfHx8fDE3NjMxNDU0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
            }}
          ></div>

          {/* Content */}
          <div className="flex  flex-col max-w-[900px] gap-[20px] p-[64px]">
        
              <div className="px-4 py-2 bg-[#bc6c25] w-max text-[#fefae0] rounded-full text-[18px]">
                Winter Sale - Up to 60% Off
              </div>
              <div>
              <span className=" lg:text-[64px] font-medium  text-[#283618]">
                Level Up Your
              </span>
              <span className="lg:text-[64px] text-[#bc6c25]">
                {" "}
                Gaming Experience!
              </span>
                </div>
              <p className=" text-[20px] text-[#606c38] ">
                Discover the latest games, consoles, and accessories at
                unbeatable prices!
              </p>
              <Link
                to="/explore"
                className="bg-[#606c38] text-[#fefae0] px-[20px]  py-[14px] w-max  rounded-[12px]  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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
