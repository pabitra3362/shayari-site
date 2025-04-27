"use client";
import ShayariCard from "@/components/ShayariCard";
import { useState } from "react";
import { toast } from "sonner";

const dummyData = [
  { title: "Tanhaai", content: "Tere bina raat adhuri lagti hai,\nTere khayalon mein har subah jagti hai...", category: "Breakup" },
  { title: "Muskaan", content: "Teri hansi meri jaan ban gayi,\nTere bina zindagi veeran ban gayi...", category: "Romantic" },
  { title: "Judai", content: "Judai mein bhi tera ehsaas rehta hai,\nHar lamha bas tera saath rehta hai...", category: "Sad" },
  { title: "Hasi", content: "Teri hasi meri zindagi ka sukoon hai,\nTere bina har pal mein dard ka junoon hai...", category: "Romantic" },
];

const categories = [
  "All",
  "Love",
  "Birthday",
  "Breakup",
  "Cute",
  "Diwali",
  "Dosti",
  "Friendship",
  "Funny",
  "Good Night",
  "Miss You",
  "Romantic",
  "Sad",
  "Sorry",
  "Anniversary",
];

export default function ShayariPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filtered = dummyData.filter(item => {
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.content.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCopybtn = (content) => {
    navigator.clipboard.writeText(content)
    .then(() => (
      toast.success("Copied to clipboard",{
        position: "top-right",
      })
    ));
  }
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#eea679b0] mb-6 text-center">Explore Shayaris</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Shayari..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 border border-foreground focus:border-none rounded-full  focus:outline-none focus:ring-2 focus:ring-[#eea679b0] transition-all duration-300"
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
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Koi Shayari nahi mili, sorry 💔</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {
            filtered.map((shayari, index) => (
              <ShayariCard key={`${shayari}-${index}`} shayari={shayari}/>
            ))
          }
        </div>
      )}
    </div>
  );
}
