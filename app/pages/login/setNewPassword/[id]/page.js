"use client";

import React, { useState } from "react";
import { Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import Logo from "@/public/assets/logo.png";
import { toast } from "sonner";
import { setNewPassword } from "@/services/userService";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const SetNewPassword = () => {
  const [isPwdOpen, setIsPwdOpen] = useState(true);
  const [isCnfOpen, setIsCnfOpen] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {

    try {
      
      const response = await setNewPassword({ id, password });
      toast.success(response.message,{
        position: 'top-right',
        onAutoClose: () => {
          router.push(`${process.env.NEXT_PUBLIC_BASEURL}/pages/login`)
        }
      })

      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      reset() // reset form values after submit
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background p-4">
      <div className="resetPassword w-full max-w-md bg-background p-6 rounded-lg shadow-md shadow-foreground relative">
        {/* Close Button */}
        <button
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEURL}/pages/login`)}
          className="absolute top-0 right-0 text-foreground text-[15px] w-[30px] h-[30px] rounded-full hover:bg-foreground hover:text-[#e2b69bb0]  text-xl cursor-pointer transition-all duration-300"
        >
          ✕
        </button>
        {/* Safar Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src={Logo}
            alt="Safar Logo"
            className="h-16 w-fit rounded-full object-cover"
            height={20}
            width={20}
            quality={100}
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          {/* password */}
          <div className="password">
            <div className="relative flex items-center">
              <input
                type={isPwdOpen ? "password" : "text"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters"
                  },
                  validate: (value) => {
                    if (!/[A-Z]/.test(value))
                      return "Password must contain at least one uppercase letter";
                    if (!/[0-9]/.test(value))
                      return "Password must contain at least one number";
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                      return "Password must contain at least one special character";
                    return true;
                  },
                })}
                className="w-full border border-foreground focus:border-none focus:ring-2 focus:ring-[#d3946db0] placeholder:focus:text-[#e09f76b0] rounded-md transition-all duration-300 pr-10 px-3 py-2"
                placeholder="New password"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <Image
                  src={
                    isPwdOpen
                      ? "https://www.svgrepo.com/show/108619/eye-close-up.svg"
                      : "https://www.svgrepo.com/show/391829/eye-close.svg"
                  }
                  height={20}
                  width={20}
                  className="size-6 duration-200 rounded-full dark:bg-foreground"
                  onClick={() => setIsPwdOpen((prev) => !prev)}
                  alt="Toggle Password Visibility"
                />
              </span>
            </div>

            {/* Error Message */}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="cnfPassword">
            <div className="relative flex items-center">
              <input
                type={isCnfOpen ? "password" : "text"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full border border-foreground focus:border-none focus:ring-2 focus:ring-[#c18560b0] placeholder:focus:text-[#d99a73b0] rounded-md transition-all duration-300 pr-10 px-3 py-2"
                placeholder="Re-enter new password"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  src={
                    isCnfOpen
                      ? "https://www.svgrepo.com/show/108619/eye-close-up.svg"
                      : "https://www.svgrepo.com/show/391829/eye-close.svg"
                  }
                  height={20}
                  width={20}
                  className="size-6 duration-200 rounded-full dark:bg-foreground"
                  onClick={() => setIsCnfOpen((prev) => !prev)}
                  alt="Toggle Password Visibility"
                />
              </span>
            </div>

            {/* Error Message */}
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[#eb915ab0] text-foreground font-semibold rounded-md hover:bg-foreground
      hover:text-background duration-500"
          >
            {isSubmitting ? (
              <Spinner aria-label="Default status example" color="white" />
            ) : (
              "Reset password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;