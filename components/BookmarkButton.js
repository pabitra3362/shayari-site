"use client";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BookmarkButton = ({ shayariId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");

    setIsBookmarked(saved?.includes(shayariId) || false);
  }, [shayariId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const newBookmarks = isBookmarked
      ? bookmarks.filter((id) => id !== shayariId)
      : [...bookmarks, shayariId];

    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <TooltipProvider delayDuration={2000} >
      <Tooltip>
        <TooltipTrigger onClick={toggleBookmark} >
            {isBookmarked ? "🔖" : "📑"}
        </TooltipTrigger>
        <TooltipContent className="bg-foreground">
          <p>Bookmark</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookmarkButton;
