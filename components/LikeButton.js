"use client";

import { likeShayari } from '@/services/shayariService';
import React, {useState, useEffect} from 'react';
import { toast } from 'sonner';

const LikeButton = ({ shayariId, likes, isLiked }) => {
  
// console.log(isLiked);

  const handleLike =  async (params) => {
    try {
      const response = await likeShayari({shayariId})

      console.log(response);
      
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }
  

  return (
    <button onClick={handleLike} className=" cursor-pointer flex items-center gap-1 text-sm">
      ❤️ {likes} {isLiked ? "liked" : "likes" }
    </button>
  );
};


export default LikeButton;
