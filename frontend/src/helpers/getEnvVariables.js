export const getEnvVariables = () => {
  return {
    VITE_API_AUTH_URL: import.meta.env.VITE_API_AUTH_URL,
    VITE_API_COMMENT_URL: import.meta.env.VITE_API_COMMENT_URL,
    VITE_API_POST_URL: import.meta.env.VITE_API_POST_URL,
    VITE_API_USER_URL: import.meta.env.VITE_API_USER_URL,
  };
};
