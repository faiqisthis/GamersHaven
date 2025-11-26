import React from "react";
import { ArrowRight } from "lucide-react";
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
      <div className="bg-[#fefae0]  relative ">
        <div className=" lg:py-[64px] py-[20px] flex flex-col md:flex-row max-w-[1440px] justify-between mx-auto  ">
          {/* Background Image Div */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1635372730136-06b29022281c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwZXNwb3J0c3xlbnwxfHx8fDE3NjMxNDU0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
            }}
          ></div>

          {/* Content */}
          <div className="flex  flex-col md:w-1/2 gap-[20px] lg:p-[64px] p-[20px] ">
            <div className="px-4 py-2 text-[#bc6c25] w-max bg-[#e9d7b1] rounded-full text-[18px]">
              Winter Sale - Up to 60% Off
            </div>
            <div>
              <span className=" lg:text-[64px] text-[48px] font-medium  text-[#283618]">
                Level Up Your
              </span>
              <span className="lg:text-[64px] text-[48px] text-[#283618]">
                {" "}
                Gaming Experience!
              </span>
            </div>
            <p className=" lg:text-[20px] text-[24px] text-[#606c38] ">
              Discover the latest games, consoles, and accessories at unbeatable
              prices!
            </p>
            <Link
              to="/explore"
              className="group flex gap-[4px] bg-[#606c38] text-[#fefae0] px-[20px]  py-[14px] w-max  rounded-[12px] cursor-pointer  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Shop Now
              <ArrowRight className="ml-2 h-6 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-[20px] lg:p-[0px] md:w-1/2 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NjMxMTg1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              className="  rounded-2xl  object-cover h-[400px] md:h-[500px] md:max-w-[600px] lg:h-[600px] w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
