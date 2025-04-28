"use client";
import ShayariCard from '@/components/ShayariCard';
import React, { useEffect, useState } from 'react'
import ALL_SHAYARIES from '@/lib/DummyData';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setFavourites(ALL_SHAYARIES.filter(s => bookmarks.includes(`${s.id}`)));
    },[])

    console.log(favourites);
    

  return (
    <div className="max-w-6xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6">Your Favorite Shayaris</h1>
    {favourites.length > 0 && favourites.map(shayari => (
      <ShayariCard key={`${shayari.id}`} shayari={shayari} />
    ))}
  </div>
  )
}

export default Favourites