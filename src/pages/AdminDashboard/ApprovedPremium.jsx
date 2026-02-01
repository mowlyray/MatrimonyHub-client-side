import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

export default function ApprovedPremium() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // GET premium requests
  const { data: requests = [], isLoading: loading } = useQuery({
    queryKey: ["premiumRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/premium-requests");
      return res.data;
    },
  });

  // APPROVE premium
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/api/admin/approve-premium/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Approved!", "Biodata is now premium.", "success");
      queryClient.invalidateQueries(["premiumRequests"]);
    },
  });

  const approve = (id) => {
    Swal.fire({
      title: "Approve Premium?",
      text: "This biodata will be marked as premium",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Premium",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-[#AD1457] mb-8 relative"
      >
        Premium Approval Requests
        <span className="block w-28 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-2 rounded-full shadow-md"></span>
      </motion.h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-pink-500 font-semibold animate-pulse text-lg">
            Loading premium requests...
          </p>
        </div>
      )}

      {/* No Requests */}
      {!loading && requests.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white shadow-xl rounded-2xl p-10 text-center border border-pink-200"
        >
          <p className="text-xl text-gray-500 font-semibold">
            No premium approval requests found
          </p>
        </motion.div>
      )}

      {/* Requests Table */}
      {!loading && requests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-3xl overflow-x-auto border border-pink-200"
        >
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold border-b border-pink-300 border-r border-pink-300">
                  Name
                </th>
                <th className="px-6 py-4 text-left font-semibold border-b border-pink-300 border-r border-pink-300">
                  Email
                </th>
                <th className="px-6 py-4 text-center font-semibold border-b border-pink-300 border-r border-pink-300">
                  Biodata ID
                </th>
                <th className="px-6 py-4 text-center font-semibold border-b border-pink-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r, index) => (
                <motion.tr
                  key={r._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-pink-50 transition-all duration-300 border-b border-pink-200"
                >
                  <td className="px-6 py-4 text-gray-700 font-medium border-r border-pink-200">{r.name}</td>
                  <td className="px-6 py-4 text-gray-600 border-r border-pink-200">{r.email}</td>
                  <td className="px-6 py-4 text-center text-gray-600 border-r border-pink-200">{r.biodataId}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => approve(r._id)}
                      disabled={approveMutation.isPending}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Make Premium
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
