import axios from "axios";

const postApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/post`,
});

export default postApi;
