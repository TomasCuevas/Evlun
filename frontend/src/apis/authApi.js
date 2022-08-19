import axios from 'axios';

//* helpers *//
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_AUTH_URL } = getEnvVariables();

const authApi = axios.create({
  baseURL: VITE_API_AUTH_URL,
});

authApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export default authApi;
