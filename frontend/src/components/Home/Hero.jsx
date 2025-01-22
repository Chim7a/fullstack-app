import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="max-w-[1000px] mx-auto py-24 text-center px-4">
      <h1 className="text-3xl lg:text-7xl text-green-800 capitalize mb-4">
        Fresh produce, directly from the farm 24hrs/7d
      </h1>
      <p className="max-w-[600px] mx-auto font-light text-lg mb-4">
        Experience the Convenience of Farm-Fresh Quality Delivered Straight to
        Your Door, Anytime, AnyDay. From Our Fields to Your Table
      </p>

      <Link to={"/marketplace"}>
        <button className="bg-green-500 px-10 py-2 animate-pulse font-semibold text-lg text-white rounded-md">
          Order Fresh Produce Now
        </button>
      </Link>
      <img
        className="w-[500px] mx-auto"
        src="/hero.png"
        alt="farm market illustration"
      />
    </div>
  );
};

export default Hero;
