"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ShayariClientList from "./ShayariClientList";
import Loader from "./Loder";
import ShayariList from "./ShayariList";

const ClientSideFetcher = ({ fetchFunction, params = {}, isShayari }) => {
  const [shayaries, setShayaries] = useState([]);
  const { user } = useSelector((state) => state.user) || null;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function getShayaris() {
      try {
        const response = await fetchFunction({ userId: user?.id, ...params });
        setShayaries(response.shayaries);
        
      } catch (error) {
        toast.error(error.response?.data?.error || error.message, {
          position: "top-right",
        });
      } finally {
        setLoader(false);
      }
    }

    getShayaris();
  }, [fetchFunction, user]);
  return (
    <div>
      {loader ? (
        <div className="w-full flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        isShayari ? <ShayariClientList shayaris={shayaries} /> : <ShayariList shayaries={shayaries} />
      )}
    </div>
  );
};

export default ClientSideFetcher;
