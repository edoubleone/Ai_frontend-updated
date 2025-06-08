import { BASE_URL } from "@/utils";
import axios from "axios";

export interface ErrorResponse {
  response: {
    data: {
      detail: string;
    };
  };
}

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
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("access_token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
