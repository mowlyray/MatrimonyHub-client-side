import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1400,
    arrows: false,
  };

  const slides = [
    {
      title: "Find Your Perfect Match",
      image: "/images/banner-image1.jpg",
      description:
        "Connect with genuine profiles and start your journey toward a beautiful relationship today.",
       
    },
    {
      title: "Begin Your Forever",
      image: "/images/banner-image2.jpg",
      description:
        "Start your journey toward a lifetime of love, trust, and companionship.",
        
    },
    {
      title: "Trusted Matrimony Platform",
      image: "/images/banner-image3.jpg",
      description:
        "We bring families together with transparency, trust, and tradition at heart.",
       
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[400px] md:h-[500px]">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0  z-10"></div>

            {/* Centered Content */}
            <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
              <div className="text-white max-w-2xl space-y-6">
                <h2 className="text-3xl md:text-6xl font-bold">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.description}</p>
                {/* <button className="mt-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300">
                  {slide.buttonText}
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;