import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//* hooks *//
import { useAuthStore } from './useAuthStore';

//* apis *//
import userApi from '../apis/userApi';

export const useUpdateUser = () => {
  const navigate = useNavigate();

  const { startChecking } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const startUpdating = async (values) => {
    try {
      setLoading(true);

      await userApi.put('/update', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      navigate(-1);
      startChecking();
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  return {
    // properties
    errorMessage,
    isLoading,

    // methods
    startUpdating,
    setErrorMessage,
  };
};
