import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar'; 

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;