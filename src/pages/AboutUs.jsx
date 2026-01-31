import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-[#FCE4EC] py-16 px-6 md:px-20 text-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* White Content Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700">
              About MatrimonyHub
            </h2>

            <p className="text-lg leading-relaxed">
              MatrimonyHub is a trusted platform designed to bring people closer
              in their search for lifelong companionship. We value love, respect,
              and cultural traditions while embracing modern preferences.
            </p>

            <p className="text-lg leading-relaxed">
              With verified profiles, secure matchmaking, and personalized
              recommendations, MatrimonyHub helps individuals and families build
              meaningful connections that last a lifetime.
            </p>

            {/* Extra content */}
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
                className="space-y-4 text-lg leading-relaxed"
              >
                <p>
                  Our platform ensures complete privacy and security for every
                  user while maintaining transparency and trust.
                </p>
                <p>
                  Each profile is carefully reviewed to provide a safe and
                  reliable matchmaking experience.
                </p>
                <p>
                  We combine traditional values with modern technology to help
                  you find the right partner.
                </p>
                <p>
                  MatrimonyHub supports families as well as individuals
                  throughout the journey.
                </p>
                <p>
                  Your happiness and lifelong connection are at the heart of
                  everything we do.
                </p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMore(!showMore)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
            >
              {showMore ? "Learn Less" : "Learn More"}
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw="
              alt="Matrimony illustration"
              className="w-72 md:w-96 rounded-xl shadow-lg"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
