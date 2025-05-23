"use client";

import React, { useEffect, useState } from "react";
import UserManagement from "@/components/UserManagement";
import ShayariManagement from "@/components/ShayariManagement";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AdminOverview from "@/components/AdminOverview";

const Admin = () => {
  const [current, setCurrent] = useState();
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
          <div onClick={() => setCurrent(<AdminOverview />)} className=" pl-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 hover:cursor-pointer">
            Overview
          </div>
          <div onClick={() => setCurrent(<UserManagement />)} className=" pl-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 hover:cursor-pointer">
            User Management
          </div>
          <div onClick={() => setCurrent(<ShayariManagement />)} className=" pl-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-700 hover:cursor-pointer">
            Shayari Management
          </div>
        </div>
      </div>

      <div className="w-full">{current}</div>
    </div>
  );
};

export default Admin;
