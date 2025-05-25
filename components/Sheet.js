"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { getUserById, updateUserDetails } from "@/services/adminService";
import { Spinner } from "flowbite-react";

const SheetDemo = ({ id }) => {
  const [userDetails, setUserDetails] = useState({});

  // getting user details as page load
  useEffect(() => {
    async function getUserDetails() {
      try {
        const userDetail = await getUserById(id);
        if(userDetail.status === 200){
            const user = userDetail.user;
            setUserDetails(user);
            setValue("username",user.username);
            setValue("email", user.email);
            setValue("role", user.role);
        } else {
            toast.error(userDetail.message,{
                position: "top-right"
            });

            setUserDetails({})
        }
        
      } catch (error) {
        toast.error(error.response?.data?.message || error.message,{
            position: "top-right"
        });
      }
    }

    getUserDetails();
  }, []);

  // setting up react hook form to use
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  // form submit function
  const onSubmit = async (data) => {
    try {
        const updatedUser = await updateUserDetails({id, data})

        if(updatedUser.status === 200 ){
            toast.success(updatedUser.message,{
                position: "top-right"
            })
        } else {
            toast.success(updatedUser.message,{
                position: "top-right"
            })
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message,{
            position: "top-right"
        });
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="bg-linear-to-r from-[#e85e5e] to-[#eea679b0] hover:from-[#eea679b0] hover:to-[#e85e5e] transition-all duration-300 px-3 py-1 rounded cursor-pointer">
        Edit Profile
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 px-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                type={"text"}
                id="username"
                className="col-span-3"
                {...register("username", {
                  required: {
                    value: true,
                    message: "username is required",
                  },
                })}
              />
              {errors.username && (
                <div className="text-red-400 col-span-4 pl-1">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type={"email"}
                id="email"
                className="col-span-3"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-400 col-span-4 pl-1">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Controller
                name="role"
                control={control} // from useForm()
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <div className="text-red-400 col-span-4 pl-1">
                  {errors.role.message}
                </div>
              )}
            </div>
            <SheetFooter>
              <Button type="submit" disabled={isSubmitting} className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>{ isSubmitting ? <Spinner /> : "Save changes" }</Button>
              <SheetClose asChild>
                <Button type="submit" className={"w-full"}>
                  close
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetDemo;
