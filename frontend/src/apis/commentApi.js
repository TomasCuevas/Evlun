import axios from 'axios';

//* helpers *//
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_COMMENT_URL } = getEnvVariables();

const commentApi = axios.create({
  baseURL: VITE_API_COMMENT_URL,
});

commentApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export default commentApi;
