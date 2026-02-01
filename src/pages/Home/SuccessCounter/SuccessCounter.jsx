import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SuccessCounter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["success-counter"],
    queryFn: async () => {
      const biodataRes = await axiosSecure.get("/biodatas");
      const biodatas = biodataRes.data;

      const totalBiodatas = biodatas.length;
      const totalBoys = biodatas.filter(item => item.biodataType === "Male").length;
      const totalGirls = biodatas.filter(item => item.biodataType === "Female").length;

      const successRes = await axiosSecure.get("/api/success-story");
      const totalMarriages = successRes.data.length;

      return { totalBiodatas, totalBoys, totalGirls, totalMarriages };
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-pink-50 text-center">
        <p className="text-gray-500">Loading statistics...</p>
      </div>
    );
  }

  const statsData = [
    { label: "Total Biodatas", value: stats.totalBiodatas, color: "text-pink-600" },
    { label: "Boys Biodatas", value: stats.totalBoys, color: "text-blue-600" },
    { label: "Girls Biodatas", value: stats.totalGirls, color: "text-pink-600" },
    { label: "Marriages Done", value: stats.totalMarriages, color: "text-green-600" },
  ];

  return (
    <div className="py-16 bg-pink-50 text-center">
      <h2 className="text-4xl font-extrabold text-pink-700 mb-12">
        Our Success in Numbers
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(233,30,99,0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative p-6 rounded-2xl flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Bottom animated border */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 animate-border-slide"></div>

            <p className="text-xl font-semibold text-gray-700 mb-2 relative z-10">{stat.label}</p>
            <h3 className={`text-4xl font-bold ${stat.color} relative z-10`}>
              <CountUp end={stat.value} duration={2.5} separator="," />
            </h3>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes border-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-border-slide {
          animation: border-slide 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessCounter;
