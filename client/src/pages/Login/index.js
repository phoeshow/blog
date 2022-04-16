import './index.css';
import React, { useEffect } from 'react';
import { Button, InputWrapper, Input, Container } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import useUser from '../../api/user';

const LoginPage = () => {
  const [username, setUsername] = useInputState('');
  const [password, setPassword] = useInputState('');

  const { adminExist, login, register, allowAdminPage } = useUser(true);

  const navigate = useNavigate();

  const handleBtnClick = async (e) => {
    try {
      if (adminExist === false) {
        await register(username, password);
        setUsername('');
        setPassword('');
      }
      if (adminExist === true) {
        await login(username, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (allowAdminPage === true) {
      navigate('/admin', { replace: true });
    }
  }, [allowAdminPage]);

  return (
    <Container size={400}>
      <h1>Login</h1>
      <InputWrapper label="Username">
        <Input placeholder="Username" value={username} onChange={setUsername} />
      </InputWrapper>
      <InputWrapper label="Password">
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={setPassword}
        />
      </InputWrapper>
      <div className="login-btn_wrap">
        {adminExist !== 'pending' ? (
          <Button onClick={handleBtnClick}>
            {adminExist === false ? '注册' : '登录'}
          </Button>
        ) : null}
      </div>
    </Container>
  );
};

export default LoginPage;
