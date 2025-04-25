"use client";

import { Drawer, DrawerItems } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./ToogleModes";
import { Input } from "./ui/input";

// 🧁 Icons
import { FaHome, FaSearch, FaPenFancy, FaRegPlayCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCategory } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const categoryArray = [
  { title: "Love", link: "/love", color: "text-red-400" },
  { title: "Birthday", link: "/birthday", color: "text-yellow-400" },
  { title: "Breakup", link: "/breakup", color: "text-gray-400" },
  { title: "Cute", link: "/cute", color: "text-pink-400" },
  { title: "Diwali", link: "/diwali", color: "text-orange-400" },
  { title: "Dosti", link: "/dosti", color: "text-green-400" },
  { title: "Friendship", link: "/friendship", color: "text-emerald-400" },
  { title: "Funny", link: "/funny", color: "text-yellow-300" },
  { title: "Good Night", link: "/good-night", color: "text-indigo-400" },
  { title: "Miss You", link: "/miss-you", color: "text-purple-400" },
  { title: "Romantic", link: "/romantic", color: "text-rose-400" },
  { title: "Sad", link: "/sad", color: "text-blue-400" },
  { title: "Sorry", link: "/sorry", color: "text-sky-400" },
  { title: "Anniversary", link: "/anniversary", color: "text-fuchsia-400" },
];


export default function MyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleClose = () => setIsOpen(false);


  

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className="bg-black p-2 rounded-md text-white hover:bg-gray-800 transition-all shadow-md"
          onClick={() => setIsOpen(true)}
        >
          {!isOpen ? <RxHamburgerMenu size={22} /> : <IoClose size={22} />}
        </button>
      </div>

      <Drawer open={isOpen} onClose={handleClose} className="!bg-[#1E1E2F]">
        {/* 🧠 Header Section */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <span className="text-white text-xl font-semibold flex items-center gap-2">
            📝 Shayarify
          </span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={handleClose}
              className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition"
              aria-label="Close"
            >
              <IoClose size={22} />
            </button>
          </div>
        </div>

        {/* 🌈 Drawer Content */}
        <DrawerItems>
          <ul className="flex flex-col gap-4 text-gray-300 px-4 py-6 text-base">
            <li onClick={handleClose}>
              <Link
                href="/"
                className="flex items-center gap-3 pl-2 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaHome /> Home
              </Link>
            </li>

            <li className="flex items-top gap-3 pl-2 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all w-full">
              <BiCategory className="mt-1.5" />
              <div
                className={`grid grid-cols-2 gap-x-12 overflow-y-hidden ${
                  categoryOpen ? "h-72" : "h-7"
                } duration-300`}
              >
                <div
                  className="col-span-2"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                >
                  <span className="flex items-center gap-x-1.5">
                    Categories{" "}
                    <IoIosArrowDown
                      className={`transition-transform duration-300 mt-1.5 ${
                        categoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
                {categoryArray.map((item, index) => (
                  <Link
                    className={`text-wrap text-sm ${item.color ? item.color : "text-foreground"}`}
                    key={index}
                    href={`/pages/shayari/${item.link}`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </li>

            <li onClick={handleClose}>
              <Link
                href="/pages/reels"
                className="flex items-center gap-3 pl-2 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaRegPlayCircle /> Reels
              </Link>
            </li>

            <li onClick={handleClose}>
              <Link
                href="/pages/submit-shayari"
                className="flex items-center gap-3 pl-2 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaPenFancy /> Submit Shayari
              </Link>
            </li>

            <li className="px-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = e.target.search.value;
                  console.log("Searching:", query); // 🪄 Replace with actual search logic
                }}
              >
                <div className="flex items-center gap-2 bg-[#2c2c3f] rounded-md px-2 py-1 border border-gray-600 focus-within:ring-purple-500">
                  <FaSearch className="text-gray-400" />
                  <Input
                    name="search"
                    type="text"
                    placeholder="Search"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 border-0 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-sm bg-[#eea679b0] hover:bg-[#eea679b0] text-white px-3 py-1 rounded-md transition"
                  >
                    Go
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </DrawerItems>
      </Drawer>
    </>
  );
}
