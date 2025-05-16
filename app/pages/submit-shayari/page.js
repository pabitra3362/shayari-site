"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "flowbite-react";
import { submitShayari } from "@/services/shayariService";
import { toast } from "sonner";
import { Spinner } from "flowbite-react";

const categories = [
  "Select", "Love", "Birthday", "Breakup", "Cute", "Diwali", "Dosti",
  "Friendship", "Funny", "Good Night", "Miss You", "Romantic", "Sad",
  "Sorry", "Anniversary",
];

const SubmitShayari = () => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      category: "Select",
    }
  });

  const onSubmit = async (data) => {
    if(!user) return alert("Please login to submit shayari");

    try {
      const response = await submitShayari({shayaries: [{...data, isValid: false}]})
      console.log(response);
      

      if(response.status === 200) {
        toast.success("Shayari submitted successfully", {position: "top-right"});
        reset();
      }

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl bg-background text-foreground shadow-2xl rounded-2xl">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-3xl font-bold text-center text-[#f1af87]">
            ✍️ Submit Your Shayari
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label className="text-[#f1af87]">Title</Label>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter Shayari Title"
                className="mt-1 bg-background text-foreground border-[#f1af87]"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label className="text-[#f1af87]">Category</Label>
              <Select
                {...register("category", { required: "Category is required",
                  validate: (value)=> value !== "Select" || "Please select a category"
                 })}
                className="mt-1 bg-background text-foreground border-[#f1af87]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-foreground text-background font-bold border-[#f1af87]">
                    {cat}
                  </option>
                ))}
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label className="text-[#f1af87]">Shayari</Label>
              <Textarea
                {...register("content", {
                  required: "Shayari content is required",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                })}
                placeholder="Dil ki baat yahan likho..."
                rows={5}
                className="mt-1 bg-background text-foreground border-[#f1af87]"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} bg-[#f1af87] text-black font-semibold hover:bg-[#ff9067] transition-all`}
            >
              {isSubmitting ? <Spinner size="sm" /> : "❤️ Submit Shayari"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitShayari;
