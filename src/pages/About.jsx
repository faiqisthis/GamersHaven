import React from "react";
import ForzaBackground from "../assets/ImageSlider/COD-background.jpg";

function About() {
  return (
    <div className="hero min-h-screen" style={{ position: 'relative', zIndex: 0 }}>
      {/* Background Image Div */}
      <div
        style={{
          backgroundImage: `url(${ForzaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.5, // Set opacity for background image
        }}
      ></div>

      {/* Content */}
      <div className="hero-content text-justify flex-col text-gray-300">
        <div>
          <h1 className="md:text-6xl text-5xl font-bold text-center md:text-left">About Us</h1>
          <p className="py-6 mx-3 md:text-2xl text-lg ">
            Welcome to Gamer's Haven, the ultimate destination for gamers around
            the world! Whether you’re a hardcore gamer, a casual player, or just
            getting started, we’re here to fuel your passion for gaming with the
            best products, support, and community.
          </p>
        </div>
        <div>
          <h1 className="md:text-6xl text-5xl font-bold text-center md:text-left">Our Story</h1>
          <p className="py-6 mx-3 md:text-2xl text-lg">
            Born from a shared love of gaming, Gamer's Haven was founded with a mission:
            <br />
            To bring the best gaming products, accessories, and hardware to players
            everywhere. We’ve been gamers since the days of pixelated screens and wired
            controllers, and over the years, our passion has evolved with the industry.
            What started as a small team of gaming enthusiasts has now grown into a thriving
            store that serves gamers of all kinds, from retro lovers to competitive eSports pros.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
