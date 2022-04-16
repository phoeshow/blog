import { useState } from 'react';
import { Button } from '@mantine/core';

const Home = () => {
  const [name, setName] = useState('');
  return (
    <div className="home-page-view">
      <h1>home</h1>
      <p>Hello React!!</p>
      <Button>Hello world!</Button>
      <p>my name is {name}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default Home;
