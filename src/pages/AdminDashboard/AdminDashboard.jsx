import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const COLORS = ["#E91E63", "#42A5F5", "#EC407A", "#FBC02D", "#66BB6A"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-[#E91E63]"></span>
      </div>
    );

  const data = [
    { name: "Total Biodata", value: stats.totalBiodata },
    { name: "Male Biodata", value: stats.maleBiodata },
    { name: "Female Biodata", value: stats.femaleBiodata },
    { name: "Premium Biodata", value: stats.premiumBiodata },
    { name: "Revenue ($)", value: stats.totalRevenue },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-5 text-center text-[#AD1457]"
      >
        Admin Dashboard
        <span className="block w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-2 rounded-full"></span>
      </motion.h1>

      {/* Chart Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-pink-200
                   focus-within:ring-4 focus-within:ring-pink-300/40"
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
          Biodata & Revenue Overview
        </h2>

        <div style={{ width: "100%", height: 420, outline: "none" }}>
          <ResponsiveContainer>
            <PieChart tabIndex={-1} style={{ outline: "none" }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={70}
                dataKey="value"
                paddingAngle={3}
                label
                tabIndex={-1}
                style={{ outline: "none" }}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    tabIndex={-1}
                    style={{ outline: "none" }}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #F8BBD0",
                  boxShadow: "0 10px 25px rgba(233, 30, 99, 0.15)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
