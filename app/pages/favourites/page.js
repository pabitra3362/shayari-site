"use client"

import { getBookmarkedShayaries } from '@/services/shayariService';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import Loader from '@/components/Loder';
import ShayariList from '@/components/ShayariList';

const Favourites = () => {
  const [shayaries, setShayaries] = useState([]);
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function fetchShayaries(){
      try {
        const response = await getBookmarkedShayaries();
         setShayaries(response.shayaries);

      } catch (error) {
        toast.error(error.response?.data?.error || error.message),{
          position: "top-right"
        };
      } finally {
        setLoading(false);
      }
    }

    fetchShayaries();
  },[user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#1f1c2c] dark:to-[#928dab] py-10 px-4 transition-colors duration-300">
  <div className="backdrop-blur-xl bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-2xl p-6 max-w-5xl mx-auto shadow-2xl">
    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8 text-center drop-shadow-lg">
      Your Favourites 💖
    </h1>

    {user ? (
      loading ? (
        <div className="h-64 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="transition-all duration-300">
          <ShayariList shayaries={shayaries} />
        </div>
      )
    ) : (
      <div className="text-gray-700 dark:text-gray-200 text-lg text-center mt-10 font-medium">
        You don't have any favourites yet 😢
      </div>
    )}
  </div>
</div>


  )
}

export default Favourites