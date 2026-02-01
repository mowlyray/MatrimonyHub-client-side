import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SuccessCounter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["success-counter"],
    queryFn: async () => {
      // 🔹 1. Get biodatas
      const biodataRes = await axiosSecure.get("/biodatas");
      const biodatas = biodataRes.data;

      const totalBiodatas = biodatas.length;
      const totalBoys = biodatas.filter(
        (item) => item.biodataType === "Male"
      ).length;
      const totalGirls = biodatas.filter(
        (item) => item.biodataType === "Female"
      ).length;

      // 🔹 2. Get success stories (marriage completed)
      const successRes = await axiosSecure.get("/api/success-story");
      const totalMarriages = successRes.data.length;

      return {
        totalBiodatas,
        totalBoys,
        totalGirls,
        totalMarriages, // ✅ REAL DATA
      };
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-pink-50 text-center">
        <p className="text-gray-500">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-pink-50 text-center">
      <h2 className="text-3xl font-bold text-pink-700 mb-10">
        Our Success in Numbers
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Total Biodatas</p>
          <h3 className="text-4xl text-pink-600 font-bold">
            <CountUp end={stats.totalBiodatas} duration={2} />
          </h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Boys Biodatas</p>
          <h3 className="text-4xl text-blue-600 font-bold">
            <CountUp end={stats.totalBoys} duration={2} />
          </h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Girls Biodatas</p>
          <h3 className="text-4xl text-pink-600 font-bold">
            <CountUp end={stats.totalGirls} duration={2} />
          </h3>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-xl font-semibold text-gray-700">Marriages Done</p>
          <h3 className="text-4xl text-green-600 font-bold">
            <CountUp end={stats.totalMarriages} duration={2} />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounter;
