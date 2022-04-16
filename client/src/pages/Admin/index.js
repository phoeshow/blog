import './index.css';
import { AppShell, Navbar, Header } from '@mantine/core';

import { Outlet, Routes, Route } from 'react-router-dom';

import RequireAuth from './RequireAuth';
import NavList from './NavList';

import EditPage from './EditPage';
import ProfilePage from './Profile';

const AdminPage = () => {
  return (
    <RequireAuth>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
            <NavList />
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            {/* Header content */}
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
        <Routes>
          <Route path="edit" element={<EditPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
        <Outlet />
      </AppShell>
    </RequireAuth>
  );
};

export default AdminPage;
