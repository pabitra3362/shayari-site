"use client";

import Loader from "@/components/Loder";
import SheetDemo from "@/components/Sheet";
import { deleteUser, getAllUsers } from "@/services/adminService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateChange, setStateChange] = useState(false);

  
  
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
      } finally {
        setLoading(false);
      }
    } 
    
    fetchUsers();
  }, [stateChange]);
  
  const handleDelete = async (id) => {
    try {
      const result = await deleteUser(id);
      
      if(result.status === 200){
        const updatedUsers = users.filter(user => id!==user.id)
        setUsers(updatedUsers);
        
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
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
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
                <SheetDemo id={user.id} setStateChange={setStateChange} />
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
      )}
    </div>
  );
};

export default UserManagement;
