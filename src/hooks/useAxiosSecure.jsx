import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://matrimony-hub-server-side.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(); // 🔥 Firebase JWT
          config.headers.authorization = `Bearer ${token}`;
          console.log("SENDING TOKEN:", user.accessToken);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
