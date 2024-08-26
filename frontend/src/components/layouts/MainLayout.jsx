import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../utils/Header'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
