"use client"

import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ToogleModes";
import { Input } from "./ui/input";
import Categories from "./Categories";
import Link from "next/link";
import MyDrawer from "./Drawer";
import logo from "../public/assets/logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logoutUserThunk, saveUser } from "@/features/user/userAuthSlice";
import { userProfile } from "@/services/userService";
import { toast } from "sonner";
import { Button } from "./ui/button";

const Navbar = () => {

  const [user, setUser] = useState(null);
  const {data: session} = useSession();
  
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    async function fetchProfile(){
      try {
        const response = await userProfile();
        
        dispatch(saveUser({user: response?.user || session?.user}))
        setUser(response?.user || session?.user);
      } catch (error) {
        toast.error((error.response?.data?.message || error.message),{
          position: "top-right"
        });
      }
    }

    fetchProfile();
    
  },[session])

  


  const handleLogout = async () => {
    if(session){
      signOut().then(dispatch(logoutUserThunk()))
    } else {
      dispatch(logoutUserThunk())
    }
    setUser(null);
  }

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 bg-[#eea679b0] py-2">
      <div className="left flex items-center gap-x-2">
        <Image
          className="w-10 h-10 lg:w-14 lg:h-14 object-fill rounded-full border-2 border-black"
          src={logo}
          alt="logo"
          width={56} // width and height in pixels (10 * 4 = 40, but better match actual size)
          height={56}
          priority
        />

        <p className="italic font-extrabold leading-[0.25rem] text-shadow-md lg:text-2xl">
          Shayarspot
        </p>
      </div>
      <div className="right hidden lg:block">
        <ul className="flex justify-center items-center gap-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Categories />
          </li>
          <li>
            <Link href={'/pages/shayari'}>Shayari</Link>
          </li>
          <li>
            <Link href={'/pages/favourites'}>Favourites</Link>
          </li>
          <li>
            <Link href="/pages/submit-shayari">Submit Shayari</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
          {
            (session || user) ? (
              <Button
              onClick={handleLogout}
              className="w-fit px-3 py-1 cursor-pointer">Logout</Button>
            ) : (
              <li>
            <Link href="/pages/login" className="cursor-pointer">
            <Button className="w-fit px-3 py-1 cursor-pointer">Login</Button>
            </Link>
          </li>
            )
          }
          
        </ul>
      </div>

      <div className="right lg:hidden">
        <MyDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
