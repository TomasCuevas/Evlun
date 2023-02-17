import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.common["evluntoken"] = Cookies.get("evluntoken") || "";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/auth`,
});

export default authApi;
