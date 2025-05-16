"use client"
import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import Loader from "@/components/Loder";
import { getTopShayaries } from "@/services/shayariService";
import ShayariList from "@/components/ShayariList";
import { useSelector } from "react-redux";



const Home = () => {
const [shayaries, setShayaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.user);

  useEffect(()=>{
    async function fetchShayari(){
      try {
        const response = await getTopShayaries({userId: user?.id});

        setShayaries(response.shayaries);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message,{
          position: "top-right"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchShayari();
  },[user])

  return (
    <div>
      <Hero />
      <RollingGallery autoplay={true} pauseOnHover={true} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="">Today's Top Shayaris:</h1>
        <hr className="bg-foreground my-5" />

        
        {loading ? <div className="w-fit mx-auto"><Loader /></div> : <ShayariList shayaries={shayaries} />}

        <Link href="/pages/shayari" className="flex justify-center md:justify-start items-center">
          <button className="px-6 my-1 py-2 rounded-md bg-[#f1af87b0] hover:bg-purple-600 text-white font-semibold shadow-lg transition-all duration-300 cursor-pointer">
            See All Shayaries ➡️
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;