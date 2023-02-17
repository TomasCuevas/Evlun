import axios from "axios";

const settingsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/settings`,
});

export default settingsApi;
