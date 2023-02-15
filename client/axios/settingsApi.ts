import axios from "axios";

const settingsApi = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/settings`,
});

export default settingsApi;
