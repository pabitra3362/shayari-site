// app/shayari/[category]/page.jsx
import { getShayariByCategoryService } from '@/services/shayariService';
import ShayariList from '@/components/ShayariList';
import { FaHeartBroken } from 'react-icons/fa';

const ShayariCategory = async ({ params }) => {
  const { category } = params;
  let shayaries = [];

  try {
    const data = await getShayariByCategoryService({ category });
    if (data.status === 200) {
      shayaries = data.shayaries;
    }
  } catch (error) {
    console.error('Error fetching shayari:', error);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#eea679] via-[#ffa8c3] to-[#eea679] bg-clip-text text-transparent mb-10">
        ❤️ {category.charAt(0).toUpperCase() + category.slice(1)} Shayariyaan ❤️
      </h1>

      {shayaries.length > 0 ? (
        <ShayariList shayaries={shayaries} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <FaHeartBroken className="text-pink-400 text-5xl mb-4" />
          <p className="text-lg md:text-xl text-gray-500">Oops... koi shayari nahi mili 🥲</p>
          <p className="text-sm text-gray-400 mt-2">Shayad kisi ne chhupa ke rakhi ho 💔</p>
        </div>
      )}
    </div>
  );
};

export default ShayariCategory;
