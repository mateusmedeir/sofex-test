import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (typeof window === "undefined") return Promise.reject(error);
    if (
      error?.response?.status === 401 &&
      !!window?.location &&
      !window?.location?.pathname.includes("/login") &&
      !window?.location?.pathname.includes("/cadastro")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
