import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Biodatas = () => {
  const axiosSecure = useAxiosSecure();

  const [ageSelect, setAgeSelect] = useState("18-25");
  const [filtered, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const [filters, setFilters] = useState({
    ageRange: [18, 25],
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

  const applyFilterWith = (activeFilters) => {
    const result = biodatas.filter(
      (b) =>
        b.age >= activeFilters.ageRange[0] &&
        b.age <= activeFilters.ageRange[1] &&
        (!activeFilters.biodataType ||
          b.biodataType.toLowerCase() ===
            activeFilters.biodataType.toLowerCase()) &&
        (!activeFilters.permanentDivision ||
          b.permanentDivision === activeFilters.permanentDivision)
    );

    setFiltered(result);
    setCurrentPage(1); // reset page after filter
  };

  const handleFilter = () => {
    const [min, max] = ageSelect.split("-").map(Number);
    const updatedFilters = { ...filters, ageRange: [min, max] };
    setFilters(updatedFilters);
    setIsFiltered(true);
    applyFilterWith(updatedFilters);
  };

  if (isLoading) {
    return (
      <div className="py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-white text-center">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading biodatas...
        </p>
      </div>
    );
  }

  const dataSource = isFiltered ? filtered : biodatas;

  // 🔹 pagination logic
  const totalPages = Math.ceil(dataSource.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = dataSource.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex gap-8 p-8 bg-gradient-to-br from-rose-50 via-pink-50 to-white min-h-screen">
      {/* FILTER SIDEBAR */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-72 bg-white p-5 rounded-2xl shadow-lg border border-rose-200 h-fit"
      >
        <h2 className="text-xl font-bold mb-5 text-rose-600">
          Filter Biodatas
        </h2>

        <label className="block mb-1 font-medium">Age Range</label>
        <select
          value={ageSelect}
          onChange={(e) => setAgeSelect(e.target.value)}
          className="mb-4 w-full p-2 border rounded-lg"
        >
          <option value="18-25">18 - 25</option>
          <option value="26-35">26 - 35</option>
          <option value="36-45">36 - 45</option>
        </select>

        <label className="block mb-1 font-medium">Biodata Type</label>
        <select
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              biodataType: e.target.value,
            }))
          }
          className="mb-4 w-full p-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block mb-1 font-medium">Division</label>
        <select
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              permanentDivision: e.target.value,
            }))
          }
          className="mb-5 w-full p-2 border rounded-lg"
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
          className="bg-gradient-to-r from-rose-500 to-pink-500
                     text-white w-full py-2 rounded-lg font-semibold"
        >
          Apply Filter
        </button>
      </motion.div>

      {/*  BIODATA CARDS */}
      <div className="w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {displayData.map((b, index) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.04 }}
              className="bg-white p-5 rounded-2xl shadow-md border border-rose-200 text-center"
            >
              <img
                src={b.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-pink-300"
              />

              <h3 className="font-bold text-lg text-[#E91E63]">
                ID: {b.biodataId}
              </h3>
              <p className="text-gray-600">Age: {b.age}</p>
              <p className="text-gray-600">{b.permanentDivision}</p>

              <Link to={`/biodata/${b._id}`}>
                <button className="mt-3 bg-[#E91E63] text-white px-5 py-1.5 rounded-full">
                  View Profile
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/*  PAGINATION */}
        <div className="flex justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded bg-white shadow disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-4 py-2 rounded shadow ${
                currentPage === num + 1
                  ? "bg-pink-500 text-white"
                  : "bg-white"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-white shadow disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
