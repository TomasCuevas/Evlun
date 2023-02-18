import axios from "axios";
import Cookies from "js-cookie";

const settingsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/settings`,
});

settingsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    evluntoken: Cookies.get("evluntoken") || "",
  };

  return config;
});

export default settingsApi;
