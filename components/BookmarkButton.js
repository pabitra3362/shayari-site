"use client";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { bookmarkShayari } from "@/services/shayariService";
import { toast } from "sonner";

const BookmarkButton = ({ shayariId, isBookmarked }) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);

  const toggleBookmark = async () => {
    try {
      const response = await bookmarkShayari({shayariId})

      if(response.status === 200){
        setIsBookmark(!isBookmark);
      }

      
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }
  

  return (
    <TooltipProvider delayDuration={2000} >
      <Tooltip>
        <TooltipTrigger onClick={toggleBookmark} >
            {isBookmark ? "🔖" : "📑"}
        </TooltipTrigger>
        <TooltipContent className="bg-foreground">
          <p>Bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookmarkButton;
