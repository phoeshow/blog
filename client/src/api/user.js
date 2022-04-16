import { useEffect, useState } from 'react';
import { fetcher, poster } from '../utils';
import { useNavigate, useLocation } from 'react-router-dom';
const useUser = (shouldCheckAdminExist = false) => {
  const [adminExist, setAdminExist] = useState('pending');
  const [allowAdminPage, setAllowAdminPage] = useState('pending');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/edit';

  useEffect(() => {
    const checkAdminExist = async () => {
      try {
        const { exist } = await fetcher('/api/auth/adminexist');
        setAdminExist(exist);
      } catch (error) {
        console.error(error);
      }
    };
    const checkAllowAdminPage = async () => {
      const token = localStorage.getItem('_token');
      if (!token) {
        setAllowAdminPage(false);
      } else {
        try {
          const { isLogin } = await fetcher('/api/auth/isLogin', {}, true);
          setAllowAdminPage(isLogin);
        } catch (error) {
          setAllowAdminPage(false);
          console.error(error);
        }
      }
    };

    if (shouldCheckAdminExist) {
      checkAdminExist();
    }
    checkAllowAdminPage();
  }, []);

  const login = async (username, password) => {
    try {
      const data = await poster('/api/auth/login', { username, password });
      const { token } = data;
      localStorage.setItem('_token', token);
      // 登录之后跳转逻辑
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 0);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const data = await poster('/api/auth/register', {
        username,
        password,
      });
      setAdminExist(true);
    } catch (error) {
      throw error;
    }
  };

  return { adminExist, login, register, allowAdminPage };
};

export default useUser;
