import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* GET ALL CONTACT REQUESTS */
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/contact-requests");
      return res.data;
    },
  });

  /*  APPROVE REQUEST */
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/api/contact-request/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contactRequests"]);
      Swal.fire("Approved", "Contact request approved", "success");
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-pink-500 font-semibold animate-pulse">
          Loading contact requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-[#AD1457] mb-8"
      >
        Contact Requests
        <span className="block w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-2 rounded-full"></span>
      </motion.h2>

      {/* TABLE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl
                   border border-pink-200 overflow-hidden"
      >
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
            <tr className="border-b border-pink-200">
              <th className="p-4 text-left border-r border-pink-200">
                Name
              </th>
              <th className="p-4 text-left border-r border-pink-200">
                Email
              </th>
              <th className="p-4 text-center border-r border-pink-200">
                Biodata ID
              </th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No contact requests found
                </td>
              </tr>
            )}

            {requests.map((r, index) => (
              <motion.tr
                key={r._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-pink-100
                           hover:bg-pink-50/50
                           transition-all duration-300"
              >
                <td className="p-4 font-medium border-r border-pink-100">
                  {r.name || "N/A"}
                </td>

                <td className="p-4 text-gray-600 border-r border-pink-100">
                  {r.requesterEmail}
                </td>

                <td className="p-4 text-center border-r border-pink-100">
                  {r.biodataId}
                </td>

                <td className="p-4 text-center">
                  {r.status === "approved" ? (
                    <span
                      className="px-4 py-1.5 rounded-full text-xs
                                 bg-pink-100 text-[#E91E63] font-semibold"
                    >
                      Approved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(r._id)}
                      disabled={approveMutation.isPending}
                      className="px-5 py-1.5 rounded-full text-white text-xs
                                 bg-gradient-to-r from-pink-500 to-rose-500
                                 hover:scale-105 transition-transform
                                 shadow-md disabled:opacity-60"
                    >
                      Pending
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ApprovedContactRequest;
