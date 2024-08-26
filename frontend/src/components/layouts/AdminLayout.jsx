import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboardcomponents/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className='bg-white w-screen flex h-screen items-center justify-center'>
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
