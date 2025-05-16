// app/shayari/[category]/page.jsx
"use client"
import { getShayariByCategoryService } from '@/services/shayariService';
import ShayariList from '@/components/ShayariList';
import { FaHeartBroken } from 'react-icons/fa';
import { useEffect, useState, use } from 'react';
import { toast } from 'sonner';
import Loader from '@/components/Loder';
import { useSelector } from 'react-redux';

const ShayariCategory = ({ params }) => {
  const { category } = use(params);
  const [shayaries, setShayaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.user);

 useEffect(() => {
  async function fetchShayari() {
    try {
      const response = await getShayariByCategoryService({category, userId: user?.id});
      setShayaries(response.shayaries);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  fetchShayari();
 },[user])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#eea679] via-[#ffa8c3] to-[#eea679] bg-clip-text text-transparent mb-10">
        ❤️ {category.charAt(0).toUpperCase() + category.slice(1)} Shayariyaan ❤️
      </h1>

      {loading ? <div className="h-screen flex justify-center items-center"><Loader /></div> : <div className="max-w-4xl mx-auto"><ShayariList shayaries={shayaries} /></div>}
    </div>
  );
};

export default ShayariCategory;
