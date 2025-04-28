"use client"
import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import ShayariCard from "@/components/ShayariCard";
import React from "react";
import Link from "next/link";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useState, useMemo } from "react";
import ALL_SHAYARIES from "@/lib/DummyData";


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