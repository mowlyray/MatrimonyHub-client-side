import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const FavouriteBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: favourites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favourite-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favouritebio/${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (biodataId) => {
      return axiosSecure.delete(`/favouritebio/${user.email}/${biodataId}`);
    },
    onSuccess: () => {
      toast.success("Favourite removed");
      queryClient.invalidateQueries(["favourite-biodata", user.email]);
    },
    onError: () => {
      toast.error("Failed to delete favourite");
    },
  });

  const handleDelete = (biodataId) => {
    deleteMutation.mutate(biodataId);
  };

  if (isLoading)
    return (
    <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-pink-500 font-semibold animate-pulse">
          Loading Favouritebiodata...
        </p>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load favourites
      </p>
    );

  //  No favourites UI
  if (favourites.length === 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-pink-50 border border-pink-200 rounded-2xl p-10 shadow-lg text-center max-w-md"
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            No Favourite Biodata
          </h2>
          <p className="text-gray-600 italic">
            You have not saved any favourite biodata yet.
          </p>
          <div className="mt-4">
            <span className="inline-block w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></span>
          </div>
        </motion.div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[#E91E63] relative">
        My Favourite Biodata
        <span className="block w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-pink-200">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <tr>
              <th className="py-3 px-4 border-r border-pink-300">Name</th>
              <th className="py-3 px-4 border-r border-pink-300">Biodata ID</th>
              <th className="py-3 px-4 border-r border-pink-300">Permanent Address</th>
              <th className="py-3 px-4 border-r border-pink-300">Occupation</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {favourites.map((f) => (
              <tr
                key={f.biodataId}
                className="text-center border-t border-pink-200 hover:bg-pink-50 transition"
              >
                <td className="py-3 px-4 border-r border-pink-200 text-gray-700 font-medium">
                  {f.name}
                </td>
                <td className="py-3 px-4 border-r border-pink-200 text-gray-600">
                  {f.biodataId}
                </td>
                <td className="py-3 px-4 border-r border-pink-200 text-gray-600">
                  {f.permanentDivision}
                </td>
                <td className="py-3 px-4 border-r border-pink-200 text-gray-600">
                  {f.occupation}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(f.biodataId)}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-1.5 rounded-full shadow transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavouriteBiodata;
