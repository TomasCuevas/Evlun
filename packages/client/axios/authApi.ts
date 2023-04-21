import axios from "axios";
import Cookies from "js-cookie";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/auth`,
});

authApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    evluntoken: Cookies.get("evluntoken") || "",
  };

  return config;
});

export default authApi;
