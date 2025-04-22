"use client";
import Slider from "react-slick";

const items = [
  { title: "Love Shayari", content: "Tere bina adhura hoon main 💔" },
  { title: "Dosti Shayari", content: "Dost wahi jo har haal me saath ho 🤝" },
  { title: "Sad Shayari", content: "Muskurana toh chhod diya hai maine... 😢" },
  { title: "Romantic Shayari", content: "Tere bina zindagi adhuri lagti hai ❤️" },
  { title: "Attitude Shayari", content: "Hum se jalne wale bhi kamal ke hote hain 😎" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 768, // mobile
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const RollingGallery = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-2">
            <div className="bg-[#f9b58cb0] dark:bg-[#f9b58cb0] text-white p-6 rounded-xl shadow-md text-center min-h-[200px] flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="mt-2 italic">{item.content}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RollingGallery;
