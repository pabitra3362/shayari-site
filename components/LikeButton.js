"use client";

const { useState, useEffect } = require("react");

const LikeButton = ({ shayariId }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes-${shayariId}`);

    if (savedLikes) setLikes(parseInt(savedLikes));
  }, [shayariId]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${shayariId}`, newLikes);
  };

  return (
    <button onClick={handleLike} className=" cursor-pointer flex items-center gap-1 text-sm">
      ❤️ {likes} Likes
    </button>
  );
};


export default LikeButton;
