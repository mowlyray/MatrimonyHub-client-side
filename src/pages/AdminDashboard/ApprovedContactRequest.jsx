import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // GET all contact requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/contact-requests");
      return res.data;
    },
  });

  // APPROVE mutation
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
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Approved Contact Requests
      </h2>

      <table className="w-full border">
        <thead className="bg-green-100">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Biodata ID</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="text-center border-t">
              <td>{r.name || "N/A"}</td>
              <td>{r.requesterEmail}</td>
              <td>{r.biodataId}</td>
              <td>
                {r.status === "approved" ? (
                  <span className="text-green-600 font-semibold">
                    Approved
                  </span>
                ) : (
                  <button
                    onClick={() => handleApprove(r._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    disabled={approveMutation.isPending}
                  >
                    Pending
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedContactRequest;
