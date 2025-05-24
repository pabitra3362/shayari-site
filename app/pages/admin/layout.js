"use client"


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";


export default function AdminLayout({ children }) {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if(user){
      if (user.role !== "admin") {
      router.push("/");
    }
    }
  }, [user]);


  return (
    <div className="min-h-screen flex">
      <div className="left  min-h-screen bg-slate-200 dark:bg-slate-800 w-72">
        <h1 className=" mx-auto w-full text-3xl hover:bg-slate-300 dark:hover:bg-slate-700 h-20 flex justify-center items-center transition-all duration-300 font-sans">
          Admin panel
        </h1>
        <hr className="h-0.5 bg-foreground w-full mb-4" />
        <div className="grid gap-1 text-lg">
          <Link
            href={"/pages/admin"}
            className=" pl-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 hover:cursor-pointer"
          >
            Overview
          </Link>
          <Link
            href={"/pages/admin/UserManagement"}
            className=" pl-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 hover:cursor-pointer"
          >
            User Management
          </Link>
          <Link
            href={"/pages/admin/ShayariManagement"}
            className=" pl-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 hover:cursor-pointer"
          >
            Shayari Management
          </Link>
        </div>
      </div>

      <main className="w-full">{children}</main>
    </div>
  );
}
