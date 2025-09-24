// app/shayari/page.js
"use client";
import ShayariClientList from "@/components/ShayariClientList";
import { getAllShayari } from "@/services/shayariService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "@/components/Loder";

export default function ShayariPage() {
  const [shayaries, setShayaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchShayari() {
      try {
        const response = await getAllShayari({ userId: user?.id });

        setShayaries(response.shayaries);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchShayari();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#eea679b0] mb-6 text-center">
        Explore Shayaris
      </h1>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <ShayariClientList shayaries={shayaries} />
        </div>
      )}
    </div>
  );
}
