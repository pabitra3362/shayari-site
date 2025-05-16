"use client";

import { likeShayari } from '@/services/shayariService';
import React, {useState} from 'react';
import { toast } from 'sonner';
import {motion} from 'framer-motion';

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
    <motion.button 
    whileTap={{
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }}
    onClick={handleLike} className=" cursor-pointer flex items-center gap-1 text-sm">
      ❤️ {like} {isLike ? "liked" : "likes" }
    </motion.button>
  );
};


export default LikeButton;
