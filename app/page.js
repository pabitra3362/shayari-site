import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import React from "react";


const Page = () => {
  return (
    <div>
      <Hero />
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </div>
  );
};

export default Page;
