import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

window.hljs = hljs;

const Login = React.lazy(() => import('./pages/Login'));
const Admin = React.lazy(() => import('./pages/Admin'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route
          path="login"
          element={
            <React.Suspense fallback={<>...</>}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path="admin/*"
          element={
            <React.Suspense fallback={<>...</>}>
              <Admin />
            </React.Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
