"use client";
import React from 'react'

const ShayariCard = ({ shayari }) => {
    const handleShare = () => {
        navigator.clipboard.writeText(shayari.content)
    }
  return (
    <div className="rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition my-3">
  <h3 className="text-xl font-semibold text-pink-600">{shayari.title}</h3>
  <p className="text-gray-700 mt-2 line-clamp-3">{shayari.content}</p>

  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
    <span>❤️ 10 Likes</span>
    <button className='cursor-pointer hover:text-[#eea679b0] transition-all duration-300' onClick={handleShare}>🔗 Share</button>
  </div>
</div>

  )
}

export default ShayariCard