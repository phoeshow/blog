import React, { useState } from 'react';
import {
  Pane,
  Button,
  TextInputField,
  Heading,
  majorScale,
  toaster,
} from 'evergreen-ui';

import useUser from '../../api/user';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { adminExist, login, register } = useUser(true);

  const handleBtnClick = async (e) => {
    try {
      if (adminExist === false) {
        await register(username, password);
        setUsername('');
        setPassword('');
        toaster.success('注册成功');
      }
      if (adminExist === true) {
        await login(username, password);
        toaster.success('登录成功');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page-view">
      <Pane width={400} margin="auto" paddingTop={majorScale(4)}>
        <Heading size={700} marginBottom={majorScale(4)}>
          Login
        </Heading>
        <TextInputField
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {adminExist !== 'pending' ? (
          <Pane marginTop={majorScale(2)}>
            <Button onClick={handleBtnClick} appearance="primary">
              {adminExist === false ? '注册' : '登录'}
            </Button>
          </Pane>
        ) : null}
      </Pane>
    </div>
  );
};

export default LoginPage;
