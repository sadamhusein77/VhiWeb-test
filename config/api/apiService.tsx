import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const apiService = axios.create({
  baseURL: "",
});

apiService.interceptors.request.use((config) => {
  const token = Cookies.get("token-vhiweb");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.method === "post" || config.method === "put") {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

let displayModalFunction: (() => void) | null = null;

export const setDisplayModalFunction = (fn: () => void) => {
  displayModalFunction = fn;
};

const axiosInterceptor = (err: AxiosError) => {
  if (err.response?.status === 401 && displayModalFunction) {
    displayModalFunction();
  } else {
    const errMsg: any = err.response?.data
    toast.error(errMsg?.error || "Unknown Error")
  }

  return Promise.reject(err);
};

apiService.interceptors.response.use((response) => response, axiosInterceptor);

export default apiService;
