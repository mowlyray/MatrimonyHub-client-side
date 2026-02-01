import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const PremiumMembers = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const axiosSecure = useAxiosSecure();

  const { data: biodatas = [], isLoading: loading } = useQuery({
    queryKey: ['premium-biodatas', sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/premium-biodatas?sort=${sortOrder}`
      );
      return res.data;
    },
  });

  return (
    <div className="bg-[#FCE4EC]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Title and Sorting */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl mb-8 font-extrabold text-[#E91E63] text-center animate-fade-up">
            Premium Members
          </h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-[#E91E63] px-10 py-2 mb-5 rounded text-gray-700 focus:outline-none hover:border-pink-500 transition duration-300"
          >
            <option value="asc">Sort by Age: Ascending</option>
            <option value="desc">Sort by Age: Descending</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading biodatas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biodatas.map((profile, index) => (
              <motion.div
                key={profile._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl cursor-pointer p-6 transform transition-all duration-300"
              >
                {/* Circular Image */}
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-300 shadow-md"
                  />
                </motion.div>

                {/* Card Content */}
                <div className="text-gray-800 space-y-3 text-center">
                  <h3 className="text-xl font-bold text-[#E91E63]">
                    Biodata ID: {profile.biodataId}
                  </h3>

                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-semibold text-gray-600">
                        Biodata Type:
                      </span>{' '}
                      <span className="text-[#333] capitalize">
                        {profile.biodataType}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Division:
                      </span>{' '}
                      <span className="text-[#333]">{profile.permanentDivision}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Age:</span>{' '}
                      <span className="text-[#333]">{profile.age} years</span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Occupation:</span>{' '}
                      <span className="italic text-[#555]">{profile.occupation}</span>
                    </p>
                  </div>

                  {/* Centered Button */}
                  <div className="pt-2">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Link
                        to={`/biodata/${profile._id}`}
                        className="bg-[#E91E63] hover:bg-[#AD1457] text-white px-5 py-2 rounded-full font-semibold shadow-md transition duration-300 inline-block"
                      >
                        View Profile
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default PremiumMembers;
