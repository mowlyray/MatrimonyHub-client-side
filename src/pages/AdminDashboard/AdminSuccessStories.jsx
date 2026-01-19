import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminSuccessStories = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);

  // GET success stories
  const { data: stories = [] } = useQuery({
    queryKey: ["adminSuccessStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/success-stories");
      return res.data;
    },
  });

  // 🔒 Disable background scroll when modal open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedStory]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-rose-600 mb-6 text-center">
        Marriage Success Stories (Admin Panel)
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-rose-200 text-rose-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Male Biodata ID</th>
              <th className="p-3 text-left">Female Biodata ID</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {stories.map((story, index) => (
              <tr
                key={story._id}
                className="border-b hover:bg-rose-50 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium text-gray-700">
                  {story.selfBiodataId}
                </td>
                <td className="p-3 font-medium text-gray-700">
                  {story.partnerBiodataId}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="px-4 py-1.5 rounded-full text-white text-sm font-semibold
                               bg-pink-500 hover:bg-pink-700
                               transition"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold text-rose-600 mb-4 text-center">
              Marriage Success Story
            </h3>

            <div className="w-full h-60 bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
              <img
                src={selectedStory.image}
                alt="Couple"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <p className="text-gray-700 italic leading-relaxed text-center px-2">
              “{selectedStory.storyText}”
            </p>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Marriage Date:{" "}
                {new Date(
                  selectedStory.marriageDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuccessStories;
