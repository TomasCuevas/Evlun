import axios from 'axios';

//* helpers *//
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_USER_URL } = getEnvVariables();

const userApi = axios.create({
  baseURL: VITE_API_USER_URL,
});

userApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export default userApi;
