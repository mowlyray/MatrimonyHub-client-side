import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/biodatas");
      const alldata = res.data;

      const length1 = alldata.length;
      const ff = alldata.filter(f1 => f1.biodataType === "Male");
      const ff1 = alldata.filter(f1 => f1.isPremium === "true");

      const length2 = ff.length;
      const length3 = length1 - length2;
      const length4 = ff1.length;

      setTimeout(() => {
        const dummyData = {
          totalBiodata: length1,
          maleBiodata: length2,
          femaleBiodata: length3,
          premiumBiodata: length4,
          totalRevenue: 15000, // in BDT
        };
        setStats(dummyData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch biodatas:", error);
    }
  };

  fetchData();
}, []);


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Total Biodata</p>
          <p className="text-2xl font-bold">{stats.totalBiodata}</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Male Biodata</p>
          <p className="text-2xl font-bold">{stats.maleBiodata}</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Female Biodata</p>
          <p className="text-2xl font-bold">{stats.femaleBiodata}</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Premium Biodata</p>
          <p className="text-2xl font-bold">{stats.premiumBiodata}</p>
        </div>

        <div className="p-6 bg-white rounded shadow md:col-span-2">
          <p className="text-sm text-gray-500">Total Revenue (contact purchases)</p>
          <p className="text-2xl font-bold">৳ {stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}
