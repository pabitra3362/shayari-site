"use client";
import React from "react";
import { MdCopyAll } from "react-icons/md";
import { toast } from "sonner";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

const ShayariCard = ({ shayari }) => {
  const handleShare = () => {
    navigator.clipboard.writeText(shayari.content).then(() =>
      toast.success("Copied to clipboard", {
        position: "top-right",
      })
    );
  };
  return (
    <div
      id={`shayari-${shayari.title}-${shayari.content}`}
      className="rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition my-3"
    >
      <div className="text-sm text-[#eca070b0] mb-2">{shayari.category}</div>
      <h3 className="text-xl font-semibold text-pink-600">{shayari.title}</h3>
      <p className="text-gray-700 mt-2 line-clamp-3">{shayari.content}</p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>
          <LikeButton shayariId={`${shayari.title}-${shayari.content}`} />
        </span>
        <div className="flex items-center gap-3">
        <button
          className="cursor-pointer hover:text-[#eea679b0] transition-all duration-300 flex flex-wrap items-center"
          onClick={handleShare}
        >
          <MdCopyAll size={20} /> Copy
        </button>
        <ShareButton shayariId={`${shayari.title}-${shayari.content}`} />
        </div>
      </div>
    </div>
  );
};

export default ShayariCard;
