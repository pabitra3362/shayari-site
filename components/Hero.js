import React from "react";
import Link from "next/link";
import Image from "next/image";
import poetry from "../public/assets/hero.png";

const Hero = () => {
  return (
    <div className="w-full min-h-screen flex flex-col-reverse md:flex-row-reverse items-center justify-center lg:w-[80%] mx-auto px-4 py-10">
      {/* left */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="max-w-[500px] w-full">
          <Image
            src={poetry}
            alt="poetry"
            className="w-full h-auto dark:bg-transparent"
            priority
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>
      

      {/* right */}
      <div className="w-full md:w-1/2">
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#eea679b0] dark:text-[#f9b58cb0] leading-tight">
            Shayari That Speaks Your Heart ❤️
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md">
            Express every emotion with the magic of words. Romantic, sad, funny,
            or deep — find the perfect shayari for every mood.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/pages/reels"
              className="px-6 py-2 rounded-md bg-[#f1af87b0] hover:bg-[#eea679b0] text-white font-semibold shadow-lg transition-all"
            >
              🎥 Explore Reels
            </Link>

            <Link
              href="/pages/submit-shayari"
              className="px-6 py-2 rounded-md border border-[#f1af87b0] text-[#eea679b0] hover:bg-[#eea679b0] hover:text-white font-semibold transition-all"
            >
              ✍️ Submit Shayari
            </Link>
          </div>

          <span className="text-sm text-gray-500 mt-2 italic">
            “Dil ki baat likhi nahi jaati... Mehsoos hoti hai.” 💭
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
