import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FavouriteBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* =========================
     LOAD FAVOURITES
  ========================== */
  const {
    data: favourites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favourite-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/favouritebio/${user.email}`
      );
      return res.data;
    },
  });

  /* =========================
     DELETE FAVOURITE
  ========================== */
  const deleteMutation = useMutation({
    mutationFn: async (biodataId) => {
      return axiosSecure.delete(
        `/favouritebio/${user.email}/${biodataId}`
      );
    },
    onSuccess: () => {
      toast.success("Favourite removed");
      queryClient.invalidateQueries([
        "favourite-biodata",
        user.email,
      ]);
    },
    onError: () => {
      toast.error("Failed to delete favourite");
    },
  });

  const handleDelete = (biodataId) => {
    deleteMutation.mutate(biodataId);
  };

  if (isLoading) return <p>Loading favourites...</p>;

  if (isError)
    return <p className="text-center">Failed to load favourites</p>;

  if (favourites.length === 0)
    return (
      <p className="text-center">
        You have no favourite biodata saved...
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#E91E63]">
        ⭐ My Favourite Biodata
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-pink-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Biodata ID</th>
            <th className="border px-4 py-2">Permanent Address</th>
            <th className="border px-4 py-2">Occupation</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {favourites.map((f) => (
            <tr key={f.biodataId} className="hover:bg-pink-50">
              <td className="border px-4 py-2">{f.name}</td>
              <td className="border px-4 py-2">{f.biodataId}</td>
              <td className="border px-4 py-2">
                {f.permanentDivision}
              </td>
              <td className="border px-4 py-2">
                {f.occupation}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(f.biodataId)}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavouriteBiodata;
