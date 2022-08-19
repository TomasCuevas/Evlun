import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//* slices *//
import {
  onCheckingCredentials,
  onClearErrorAndStatusCode,
  onLogin,
  onLogout,
  onSetErrorAndStatus,
} from '../store/auth/authSlice';

//* apis *//
import { userApi, authApi } from '../apis';

export const useAuthStore = () => {
  const { status, user, errorMessage, statusCode } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startChecking = async () => {
    try {
      dispatch(onCheckingCredentials());

      const token = localStorage.getItem('token');
      if (!token)
        return dispatch(onLogout({ error: undefined, statusCode: undefined }));

      const { data } = await authApi.get('/refresh');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      console.error(error);
      localStorage.clear();
      dispatch(
        onLogout({
          error: error.response.data.msg,
          statusCode: error.response.status,
        }),
      );
    }
  };

  const startLogin = async (email, password) => {
    try {
      const { data } = await authApi.post('/login', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      console.error(error);
      localStorage.clear();
      dispatch(
        onLogout({
          error: error.response.data.msg,
          statusCode: error.response.status,
        }),
      );
    }
  };

  const startSignup = async (name, username, email, password) => {
    try {
      const { data } = await userApi.post('/create', {
        name,
        username,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      console.error(error);
      localStorage.clear();
      dispatch(
        onSetErrorAndStatus({
          error: error.response.data.msg,
          statusCode: error.response.status,
        }),
      );
    }
  };

  const startLogout = async () => {
    try {
      dispatch(onLogout({ error: undefined, statusCode: undefined }));
      document.getElementById('body').classList.remove('hidden');
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const startDisabledAccount = async () => {
    try {
      await userApi.delete('/deactive');

      localStorage.clear();
      dispatch(onLogout());
    } catch (error) {
      startChecking();
    }
  };

  const startReactivateAccount = async (email, password) => {
    try {
      await userApi.put('/reactivate', { email, password });

      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      dispatch(
        onSetErrorAndStatus({
          error: error.response.data.msg,
          statusCode: error.response.status,
        }),
      );
    }
  };

  const startClearErrorAndStatusCode = () => {
    dispatch(onClearErrorAndStatusCode());
  };

  return {
    // properties
    ...user,
    errorMessage,
    status,
    statusCode,
    user,

    // methods
    startChecking,
    startClearErrorAndStatusCode,
    startDisabledAccount,
    startLogin,
    startLogout,
    startReactivateAccount,
    startSignup,
  };
};
