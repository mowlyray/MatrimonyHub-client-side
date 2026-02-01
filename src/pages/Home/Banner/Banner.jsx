import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
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

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[400px] md:h-[550px]">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/30 z-10"></div>

            {/* Centered Animated Content */}
            <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-white max-w-2xl space-y-6"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="text-3xl md:text-6xl font-extrabold "
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="text-lg md:text-xl text-white/90"
                >
                  {slide.description}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mt-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
