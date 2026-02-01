import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SuccessStories = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stories = [] } = useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/success-story");
      return res.data;
    },
  });

  return (
    <section className="py-20 bg-pink-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center text-pink-600 mb-14"
      >
        💖 Marriage Success Stories
        <span className="block w-28 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-3 rounded-full shadow-md"></span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
        {stories.map((story, index) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transform transition-all duration-300 flex flex-col items-center p-6"
          >
            {/* FULL ROUNDED IMAGE */}
            <div className="h-64 w-64 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">
              <img
                src={story.image}
                alt="Couple"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="mt-5 text-center w-full">
              <p className="text-sm text-gray-500 font-medium">
                Marriage Date: {new Date(story.marriageDate).toLocaleDateString()}
              </p>

              {/* RATING */}
              <div className="flex justify-center items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < story.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* STORY TEXT */}
              <p className="mt-4 text-gray-700 italic leading-relaxed">
                "{story.storyText}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
