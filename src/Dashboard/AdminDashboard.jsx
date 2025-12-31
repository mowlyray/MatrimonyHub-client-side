import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
   const [stats, setStats] = useState({
    totalBiodatas: 0,
    maleCount: 0,
    femaleCount: 0,
    premiumCount: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard-stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Dashboard fetch error:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Biodatas" value={stats.totalBiodatas} />
        <StatCard title="Male Biodatas" value={stats.maleCount} />
        <StatCard title="Female Biodatas" value={stats.femaleCount} />
        <StatCard title="Premium Biodatas" value={stats.premiumCount} />
        <StatCard title="Total Revenue" value={`৳ ${stats.totalRevenue}`} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-2xl font-bold text-rose-500">{value}</p>
  </div>
);

export default AdminDashboard;