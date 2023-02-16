import axios from "axios";

axios.defaults.withCredentials = true;

const userApi = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/user`,
});

export default userApi;
