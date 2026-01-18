import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/success-story")
      .then(res => setStories(res.data));
  }, []);

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
              Marriage Date: {story.marriageDate}
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
