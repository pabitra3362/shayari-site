"use client";

import { Drawer, DrawerItems } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ToogleModes";
import { toast } from "sonner";
import { userProfile } from "@/services/userService";
import { logoutUserThunk, saveUser } from "@/features/user/userAuthSlice";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

// 🧁 Icons
import { FaHome, FaSearch, FaPenFancy, FaRegPlayCircle, FaRegStar } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiCategory } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { SiPoetry } from "react-icons/si";
import { useDispatch } from "react-redux";

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
  const [user, setUser] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const {data: session } = useSession()
  const dispatch = useDispatch();

  const handleClose = () => setIsOpen(false);

  useEffect(()=>{
      async function fetchProfile(){
        try {
          const data = await userProfile();
  
          
          dispatch(saveUser({user: data.user}))
          setUser(data.user);
        } catch (error) {
          toast.error((error.response?.data?.message || error.message),{
            position: "top-right"
          });
        }
      }
  
      fetchProfile();
      
    },[])


    const handleLogout = async () => {
        dispatch(logoutUserThunk())
        signOut()
        setUser(null);
        handleClose();
      }


  

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
            📝 Shayarspot
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
                    onClick={handleClose}
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
                href="/pages/shayari"
                className="flex items-center gap-3 pl-2 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
              >
                <SiPoetry /> Shayari
              </Link>
            </li>

            <li onClick={handleClose}>
              <Link
                href="/pages/favourites"
                className="flex items-center gap-3 pl-2 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
              >
                <FaRegStar /> Favourites
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


            {
            (session || user) ? (
              <Button
              onClick={handleLogout}
              className="w-full py-1 cursor-pointer">Logout</Button>
            ) : (
              <li>
            <Link onClick={handleClose} href="/pages/login" className="cursor-pointer">
            <Button className="w-full py-1 cursor-pointer">Login</Button>
            </Link>
          </li>
            )
          }

            
          </ul>
        </DrawerItems>
      </Drawer>
    </>
  );
}
