import axios from "axios";

const authApi = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
});

export default authApi;
