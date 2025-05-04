"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "@/public/assets/logo.png";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { forgetPassword } from "@/services/userService";
import { toast } from "sonner";

const ForgetPassword = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [whileSubmitting, setWhileSubmitting] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const email = watch("email");


  // timer for 30 second cooldown
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(countdown); // Cleanup interval when timer reaches 0 or component unmounts
  }, [timer]);

  const onSubmit = async (data) => {
    setWhileSubmitting(true)

    if (timer > 0) return;

    try {
        const result = await forgetPassword({email: email});
        toast.success(result.message,{
          position: 'top-right'
        });
        setSuccess(true);
        setWhileSubmitting(false);
        setTimer(30)
    } catch (error) {
        console.error(error.message);
        setSuccess(false)
        
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center px-3">
      <div className="w-96 shadow-md shadow-foreground rounded-lg relative p-2">
        {/* close button */}
        <button
          onClick={() => router.back()}
          className="absolute top-0 right-0 text-[15px] w-[40px] h-[40px] rounded-full hover:text-[#eea679b0] hover:bg-foreground text-xl cursor-pointer transition-all duration-300"
        >
          ✕
        </button>

        {!success ? (
          <div>
            {/* image */}
            <div className="w-full mt-8">
              <Image
                src={Logo}
                alt="logo image"
                height={20}
                width={20}
                className="h-16 w-fit rounded-full object-cover mx-auto"
              />
            </div>

            <h1 className="text-foreground text-2xl text-center my-3">
              Forgot Your Password
            </h1>
            <p className="text-foreground text-center mt-3">
              Enter your email address and we will send you instructions to
              reset your password.
            </p>

            {/* Form Section */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 px-3 my-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Enter your email:
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#eea679b0] focus:border-[#eea679b0] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Please enter a valid Email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e38a53b0] py-2 px-4 rounded-md cursor-pointer text-foreground font-semibold hover:bg-foreground hover:text-background transition-all ease-in-out duration-300"
              >
                {isSubmitting ? <Spinner color="success" /> : "Continue"}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-full mt-8">
              <Image
                src={Logo}
                alt="logo image"
                height={20}
                width={20}
                className="h-16 w-fit rounded-full object-cover mx-auto"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold black mb-4">
              Check Your Email
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Instructions to reset your password have been sent to your email.
            </p>

            <div className="p-5">
              <button
                type="button"
                onClick={onSubmit}
                disabled={timer > 0 || whileSubmitting}
                className={`w-full font-bold py-2 px-4 rounded-md transition duration-500 focus:outline-none ${
                  timer > 0 || whileSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "w-full bg-[#e38a53b0] py-2 px-4 rounded-md cursor-pointer text-foreground font-semibold hover:bg-foreground hover:text-background transition-all ease-in-out duration-300"
                }`}
              >
                {whileSubmitting ? (
                  <Spinner color="success" />
                ) : timer > 0 ? (
                  `Resend in ${timer}s`
                ) : (
                  "Resend Email"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
