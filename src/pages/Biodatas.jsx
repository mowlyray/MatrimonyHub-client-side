import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Biodatas = () => {
  const axiosSecure = useAxiosSecure();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    ageRange: [18, 40],
    biodataType: "",
    permanentDivision: "",
  });

  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      return res.data;
    },
  });

  const handleFilter = () => {
    const result = biodatas
      .filter(
        (b) =>
          b.age >= filters.ageRange[0] &&
          b.age <= filters.ageRange[1] &&
          (!filters.biodataType ||
            b.biodataType.toLowerCase() === filters.biodataType.toLowerCase()) &&
          (!filters.permanentDivision ||
            b.permanentDivision === filters.permanentDivision)
      )
      .slice(0, 20);

    setFiltered(result);
  };

  const handleAgeChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setFilters((prev) => ({ ...prev, ageRange: [min, max] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-pink-50 text-center w-full">
        <p className="text-gray-500">Loading biodatas...</p>
      </div>
    );
  }

  // Initially 20 data: filtered state empty hole, biodatas slice show korbe
  const displayData = filtered.length > 0 ? filtered : biodatas.slice(0, 20);

  return (
    <div className="flex gap-6 p-6 bg-pink-50 min-h-screen">
      {/* Filter Sidebar */}
      <div className="w-64 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Filter Biodatas</h2>

        <label className="block mb-1">Age Range:</label>
        <select
          onChange={handleAgeChange}
          className="mb-4 w-full p-1 border rounded"
        >
          <option value="18-25">18 - 25</option>
          <option value="26-35">26 - 35</option>
          <option value="36-45">36 - 45</option>
        </select>

        <label className="block mb-1">Biodata Type:</label>
        <select
          name="biodataType"
          onChange={handleChange}
          className="mb-4 w-full p-1 border rounded"
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block mb-1">Division:</label>
        <select
          name="permanentDivision"
          onChange={handleChange}
          className="mb-4 w-full p-1 border rounded"
        >
          <option value="">All</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattagram</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Mymensingh">Mymensingh</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 w-full rounded"
        >
          Apply Filter
        </button>
      </div>

      {/* Biodatas Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {displayData.map((b) => (
          <div
            key={b._id}
            className="bg-white p-4 rounded shadow flex flex-col items-center"
          >
            <img
              src={b.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">ID: {b.biodataId}</h3>
            <p className="capitalize">Type: {b.biodataType}</p>
            <p>Division: {b.permanentDivision}</p>
            <p>Age: {b.age}</p>
            <p>Occupation: {b.occupation}</p>
            <Link to={`/biodata/${b._id}`}>
              <button className="mt-3 bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biodatas;
