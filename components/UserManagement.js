"use client";

import { deleteUser, getAllUsers } from "@/services/adminService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await getAllUsers();
        const users = result.users;
        const newArray = users.map((user, index) => ({
          ...user,
          srno: index + 1,
        }));
        
        setUsers(newArray);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
          position: "top-right",
        });
      }
    }
    
    fetchUsers();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      const result = await deleteUser(id);
      console.log(result);
      
      if(result.status === 200){
        toast.success(result.message,{
          position: "top-right"
        })
      }else{
        toast.error(result.message,{
          position: "top-right"
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
          position: "top-right",
        });
    }
  }


  return (
    <div className="w-full min-h-screen p-4 bg-background">
      <table className=" w-full table-auto">
        <thead>
          <tr className="bg-muted text-left ">
            <th className="border px-4 py-2">Sr No.</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="even:bg-muted/50">
              <td className="border px-4 py-2">{user.srno}</td>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 flex gap-5  items-center">
                <button className="bg-linear-to-r from-[#e85e5e] to-[#eea679b0] hover:from-[#eea679b0] hover:to-[#e85e5e] transition-all duration-300 px-3 py-1 rounded cursor-pointer"
                
                >
                  Change Role
                </button>
                <button className="bg-red-600 px-3 py-1 rounded cursor-pointer"
                onClick={()=>handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
