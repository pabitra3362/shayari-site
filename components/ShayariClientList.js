"use client";
import { useEffect, useState } from "react";
import ShayariCard from "./ShayariCard";
import { toast } from "sonner";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const categories = [
  "All", "Love", "Birthday", "Breakup", "Cute", "Diwali", "Dosti", "Friendship",
  "Funny", "Good Night", "Miss You", "Romantic", "Sad", "Sorry", "Anniversary",
];

export default function ShayariClientList({ shayaries }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  

  
  const filtered = shayaries.filter(item => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.content.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });


  const handleCopybtn = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => toast.success("Copied to clipboard 💖", {
        position: "top-right",
      }));
  };

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Shayari..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 border border-foreground focus:border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#eea679b0] transition-all duration-300"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border 
              ${activeCategory === cat ? 'bg-[#eea679b0] text-white' : 'bg-white text-[#eea679b0] border-[#f6b287b0]'} 
              transition hover:scale-105`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shayari Cards */}
      {filtered?.length === 0 ? (
        <p className="text-center text-gray-500">Koi Shayari nahi mili, sorry 💔</p>
      ) : (
        <div className="min-h-screen w-full">
          <AutoSizer>
            {({ height, width }) => (
              <List
                itemCount={filtered?.length}
                itemSize={220} // Adjust based on card height
                height={height}
                width={width}
              >
                {({ index, style }) => (
                  <div style={style} className="px-2">
                    <ShayariCard
                      key={filtered[index].id || index}
                      shayari={filtered[index]}
                      onCopy={handleCopybtn}
                    />
                  </div>
                )}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </>
  );
}