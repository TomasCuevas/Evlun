import axios from "axios";

const postApi = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_POST_URL,
});

export default postApi;
