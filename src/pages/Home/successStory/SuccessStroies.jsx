import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
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
    <section className="py-16 bg-pink-50">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">
        💖 Marriage Success Stories
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {stories.map(story => (
          <div key={story._id} className="bg-white rounded-xl shadow-lg p-5">
            <img
              src={story.image}
              alt="Couple"
              className="h-48 w-full object-cover rounded-lg"
            />

            <p className="text-sm text-gray-500 mt-2">
              Marriage Date: {new Date(story.marriageDate).toLocaleDateString()}
            </p>

            <div className="flex text-yellow-500 mt-2">
              {[...Array(story.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="mt-3 text-gray-700 italic">
              "{story.storyText}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
