"use client"
import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import ShayariCard from "@/components/ShayariCard";
import React from "react";
import Link from "next/link";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useState, useMemo } from "react";

// Moved dummy data outside component to prevent recreation on re-render
const ALL_SHAYARIES = [
  {
    title: "Tanhaai",
    content:
      "Tere bina raat adhuri si lagti hai,\nTere khayal mein har subah jagti hai...",
    category: "Breakup",
  },
  {
    title: "Dosti",
    content:
      "Dosti ka jo rishta hai, vo sabse khaas hota hai,\nDil se dil ka jo rishta hai, vo kabhi na door hota hai.",
    category: "Dosti",
  },
  {
    title: "Love",
    content:
      "Tere bina zindagi adhuri hai,\nMeri har ek saans mein tu samayi hai...",
    category: "Love",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
  {
    title: "Sad",
    content:
      "Dil ki baat kehna mushkil ho gaya hai,\nHar khushi ke baad dard mil gaya hai.",
    category: "Sad",
  },
];

const PAGE_SIZE = 4; // Number of items to load each time

const Page = () => {
  const [page, setPage] = useState(1);
  
  // Calculate visible shayaris based on current page
  const visibleShayaries = useMemo(() => {
    return ALL_SHAYARIES.slice(0, page * PAGE_SIZE);
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <Hero />
      <RollingGallery autoplay={true} pauseOnHover={true} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="">Today's Top Shayaris:</h1>
        <hr className="bg-foreground my-5" />
        
        {visibleShayaries.map((shayari, index) => (
          <ShayariCard key={`${shayari.title}-${index}`} shayari={shayari} />
        ))}

        {/* Only show InfiniteScroll if there are more items to load */}
        {visibleShayaries.length < ALL_SHAYARIES.length && (
          <InfiniteScroll loadMore={loadMore} />
        )}

        <Link href="/pages/shayari" className="flex justify-center md:justify-start items-center">
          <button className="px-6 my-1 py-2 rounded-md bg-[#f1af87b0] hover:bg-purple-600 text-white font-semibold shadow-lg transition-all duration-300 cursor-pointer">
            See All Shayaries ➡️
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;