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

  if (isLoading) return <p>Loading dashboard...</p>;

  const data = [
    { name: "Total Biodata", value: stats.totalBiodata },
    { name: "Male Biodata", value: stats.maleBiodata },
    { name: "Female Biodata", value: stats.femaleBiodata },
    { name: "Premium Biodata", value: stats.premiumBiodata },
    { name: "Revenue ($)", value: stats.totalRevenue },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#AD1457]">
        Admin Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Biodata & Revenue Overview
        </h2>

        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
