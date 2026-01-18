import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#E91E63", "#42A5F5", "#EC407A", "#FBC02D", "#66BB6A"];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stats")
      .then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

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
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
