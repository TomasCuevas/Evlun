import axios from "axios";
import Cookies from "js-cookie";

const userApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/user`,
});

userApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    evluntoken: Cookies.get("evluntoken") || "",
  };

  return config;
});

export default userApi;
