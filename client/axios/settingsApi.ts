import axios from "axios";

const settingsApi = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_SETTINGS_URL,
});

export default settingsApi;
