import axios from "axios";

const userApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/user`,
});

export default userApi;
