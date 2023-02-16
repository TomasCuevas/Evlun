import axios from "axios";

axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/auth`,
});

export default authApi;
