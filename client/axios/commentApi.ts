import axios from "axios";

const commentApi = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_COMMENT_URL,
});

export default commentApi;
