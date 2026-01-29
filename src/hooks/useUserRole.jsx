import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/biodatas`
      );

      const match = res.data.find(b => b.email === user.email);
      return match?.Role || "user";
    },
  });

  return { role: data, roleLoading: isLoading };
};

export default useUserRole;
