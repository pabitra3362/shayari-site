"use client";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

const items = [
  {
    title: "Love Shayari",
    content: "Tere bina adhura lagta hai har pal 💞",
    link: "/love",
    img: "https://t4.ftcdn.net/jpg/02/48/06/51/360_F_248065175_UKqGpkZFZG3mPBKKKpxseqS6VlIlmzq7.jpg",
  },
  {
    title: "Birthday Shayari",
    content:
      "Tere janamdin pe dua hai meri, khushiyo se bhara ho jeevan tera 🎂",
    link: "/birthday",
    img: "https://marketplace.canva.com/EAEe-aYUXFc/1/0/1600w/canva-yellow-blue-and-purple-buntings-illustrative-birthday-animated-virtual-background-Z7_xj4-dpuI.jpg",
  },
  {
    title: "Breakup Shayari",
    content: "Chhod gaye ho toh koi gham nahi, par yaadon ka kya karun? 💔",
    link: "/breakup",
    img: "https://media.istockphoto.com/id/1364289957/photo/two-hands-male-and-female-tear-red-heart-symbol-of-lovers-against-background-of-winter-forest.jpg?s=612x612&w=0&k=20&c=muxRG5tpH_ZY9JswLZswCZ-3mnbvXu_Sv_FcgZP4wPg=",
  },
  {
    title: "Cute Shayari",
    content: "Teri muskaan hai meri jaan, tu hi meri sabse pyari shaan 🐰",
    link: "/cute",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFRAzquu-yHtHPx62amc1Gap3-4OClKuIdQ&s",
  },
  {
    title: "Diwali Shayari",
    content:
      "Diye ki roshni se roshan ho tera jahaan, Diwali ho khushiyon ka samaan 🪔",
    link: "/diwali",
    img: "https://as1.ftcdn.net/v2/jpg/07/01/67/54/1000_F_701675453_s96AN7TlJOGF1VBxF8IVbUeK4hlgB26s.jpg",
  },
  {
    title: "Dosti Shayari",
    content:
      "Dost wahi jo har mod pe saath nibhaye, dard chhupaye aur khushi bataye 🤝",
    link: "/dosti",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjddeqtLvbIXfSjoK-L0jdTwSWyJAzEKKuHuaLhuKswFQJ8HJ3LeI62wSNbJKwC4vEZMAsNUv-_UVI7UwRy7Ssg7t9KiM-2H0HvyBb128OkPzvvxeTIzHrOtDJ4NH_g9AsWRLVgWOlagng4/s640/dosti+shayari+hindi.jpg",
  },
  {
    title: "Friendship Shayari",
    content:
      "Friendship ka bandhan sabse khaas, dil ke kareeb aur duniya se paas 👯",
    link: "/friendship",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHkAu42WSnFNHWUyJYad8kpoddfaYthc9dkgZ8rA8VXpGJ_pxO6xgxX3vpAJ6_czIqBg&usqp=CAU",
  },
  {
    title: "Funny Shayari",
    content: "Tu smart nahi funny hai, tujhpe toh hasi bhi sunny hai 😜",
    link: "/funny",
    img: "https://www.fnp.com/assets/images/custom/sayari/funny-shayari/funny-shayari-12.png",
  },
  {
    title: "Good Night Shayari",
    content:
      "Chand ke saath teri yaadon ka safar, good night jaan, sapno mein milna zarur 🌙",
    link: "/good-night",
    img: "https://img.freepik.com/free-vector/papercut-style-half-moon-star-background-with-clouds-design_1017-49993.jpg?semt=ais_hybrid&w=740",
  },
  {
    title: "Miss You Shayari",
    content:
      "Teri kami mehsoos hoti hai har lamha, tu paas nahi par dil ke kareeb hai sada 💭",
    link: "/miss-you",
    img: "https://img.freepik.com/free-vector/background-miss-you_1055-60.jpg",
  },
  {
    title: "Romantic Shayari",
    content:
      "Tujhme basi hai meri duniya, tu na ho toh zindagi adhoori si lage ❤️",
    link: "/romantic",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ATXQ42_TqrejRDzVQ9Uq4OuAUIJ0L4co3g&s",
  },
  {
    title: "Sad Shayari",
    content:
      "Tanhaayi mein bhi tera intezaar hai, dard mein bhi tera pyaar hai 😢",
    link: "/sad",
    img: "https://t3.ftcdn.net/jpg/03/29/68/90/360_F_329689093_3WHd7y5cD06Ln6rb2xBkvy9Gxxxk4vLy.jpg",
  },
  {
    title: "Sorry Shayari",
    content:
      "Galti ho gayi toh maaf kar dena, apne is apne ko ek mauka aur de dena 🙏",
    link: "/sorry",
    img: "https://media.istockphoto.com/id/1450971566/vector/sad-apologetic-cat.jpg?s=612x612&w=0&k=20&c=hCMSca1JFI28QGzrjXV7b5_n5C9ijBOW21qETZM0-s0=",
  },
  {
    title: "Anniversary Shayari",
    content: "Ek saal aur pyaar bhara, saath ho humesha yeh raabta 💍",
    link: "/anniversary",
    img: "https://t3.ftcdn.net/jpg/06/80/61/34/360_F_680613411_oJcUaQX7Zix78FlBFLMNz8mFmWj2rUUr.jpg",
  },
  {
    title: "Attitude Shayari",
    content:
      "Jalne wale jalte rahein, hum toh apne swag mein hi mast rahein 😎",
    link: "/attitude",
    img: "https://w0.peakpx.com/wallpaper/792/580/HD-wallpaper-bad-boy-attitude-attitude-boys-attitude-bad-boy-boys-fire-ghost-horror-love.jpg",
  },
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

  const router = useRouter();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-2" onClick={() => router.push(`/pages/shayari/${item.link}`)}>
            <div
              className="relative bg-[#f9b58cb0] dark:bg-[#f9b58cb0] text-white p-6 rounded-xl shadow-md text-center min-h-[200px] flex flex-col justify-center items-center overflow-hidden"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-[#f9b58cb0] dark:bg-[#f9b58cb0] backdrop-blur-xs z-0" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-2 italic">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RollingGallery;
