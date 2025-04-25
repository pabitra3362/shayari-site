"use client";
import { useState } from "react";

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

  const filtered = activeCategory === "All"
    ? dummyData
    : dummyData.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#eea679b0] mb-6 text-center">Explore Shayaris</h1>

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
      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="text-sm text-[#eca070b0] mb-2">{item.category}</div>
            <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-600 mt-2 whitespace-pre-line">{item.content}</p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>❤️ 12 Likes</span>
              <button
                onClick={() => navigator.clipboard.writeText(item.content)}
                className="hover:text-[#eea679b0] transition-all duration-300"
              >
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
