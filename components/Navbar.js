"use client"
import React from "react";
import { ModeToggle } from "./ToogleModes";
import { Input } from "./ui/input";
import Categories from "./Categories";
import Link from "next/link";
import MyDrawer from "./Drawer";
import logo from "../public/assets/logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {

  const {data: session} = useSession();
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
            session ? (
              <button
              onClick={()=> signOut()}
              className="border border-foreground rounded bg-transparent px-3 py-1 cursor-pointer">Logout</button>
            ) : (
              <li>
            <Link href="/pages/login" className="cursor-pointer">
            <button className="border border-foreground rounded bg-transparent px-3 py-1 cursor-pointer">Login</button>
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
