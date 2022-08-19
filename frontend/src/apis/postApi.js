import axios from 'axios';

//* helpers *//
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_POST_URL } = getEnvVariables();

const postApi = axios.create({
  baseURL: VITE_API_POST_URL,
});

postApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export default postApi;
