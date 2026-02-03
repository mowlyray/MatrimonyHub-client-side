import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";

const AdminSuccessStories = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);

  // GET success stories
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["adminSuccessStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/success-stories");
      return res.data;
    },
  });

  // Disable background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedStory ? "hidden" : "auto";
  }, [selectedStory]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <p className="text-pink-500 font-semibold animate-pulse">
          Loading success stories...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-white p-6 rounded-2xl shadow-xl">
      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#AD1457] mb-8 text-center"
      >
        Marriage Success Stories (Admin Panel)
        <span className="block w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-2 rounded-full"></span>
      </motion.h2>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto rounded-2xl border border-pink-200 shadow-lg"
      >
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
            <tr className="border-b border-pink-200">
              <th className="p-4 text-left border-r border-pink-200">#</th>
              <th className="p-4 text-left border-r border-pink-200">
                Male Biodata ID
              </th>
              <th className="p-4 text-left border-r border-pink-200">
                Female Biodata ID
              </th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {stories.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500 italic"
                >
                  No success stories found
                </td>
              </tr>
            )}

            {stories.map((story, index) => (
              <motion.tr
                key={story._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-pink-100 hover:bg-pink-50/50 transition-all duration-300"
              >
                <td className="p-4 font-medium border-r border-pink-100">
                  {index + 1}
                </td>
                <td className="p-4 font-medium text-gray-700 border-r border-pink-100">
                  {story.selfBiodataId}
                </td>
                <td className="p-4 font-medium text-gray-700 border-r border-pink-100">
                  {story.partnerBiodataId}
                </td>
                <td className="p-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStory(story)}
                    className="px-4 py-1.5 rounded-full text-white text-sm font-semibold
                               bg-gradient-to-r from-pink-500 to-rose-500
                               shadow-md hover:shadow-lg transition"
                  >
                    View Story
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-3 right-4 text-gray-500 hover:text-rose-600 text-xl"
              >
                ✖
              </button>

              <h3 className="text-2xl font-bold text-rose-600 mb-4 text-center">
                Marriage Success Story
              </h3>

              <div className="w-full h-60 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedStory.image}
                  alt="Couple"
                  className="max-h-full max-w-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <p className="text-gray-700 italic leading-relaxed text-center px-2">
                “{selectedStory.storyText}”
              </p>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Marriage Date:{" "}
                  {new Date(selectedStory.marriageDate).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSuccessStories;
