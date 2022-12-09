import axios from "axios";

const userApi = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_USER_URL,
});

export default userApi;
