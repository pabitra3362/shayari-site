"use client";

import { likeShayari } from '@/services/shayariService';
import React, {useState, useEffect} from 'react';
import { toast } from 'sonner';

const LikeButton = ({ shayariId, likes, isLiked }) => {
  const [like, setLike] = useState(likes);
  const [isLike, setIsLike] = useState(isLiked);
  
  const handleLike =  async (params) => {
    try {
      const response = await likeShayari({shayariId})

      if(response.status === 200){
        isLike ? setLike(like-1) : setLike(like+1);
        setIsLike(!isLike);
      }

      
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }
  

  return (
    <button onClick={handleLike} className=" cursor-pointer flex items-center gap-1 text-sm">
      ❤️ {like} {isLike ? "liked" : "likes" }
    </button>
  );
};


export default LikeButton;
