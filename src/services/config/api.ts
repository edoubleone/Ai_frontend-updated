import { BASE_URL } from "@/utils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("access_token")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      response.data.idToken &&
      response.data.accessToken &&
      response.data.refreshToken
    ) {
      localStorage.setItem("idToken", response.data.idToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
