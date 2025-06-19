import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/features/userSlice';
import { enqueueSnackbar } from 'notistack';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    enqueueSnackbar('Admin panelindən çıxış edildi.', {
      variant: 'info',
      autoHideDuration: 2000,
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    });
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Users', path: '/admin/users', icon: FaUsers },
    { name: 'Products', path: '/admin/products', icon: FaBox },
    { name: 'Profile', path: '/admin/profile', icon: FaUserCircle },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-screen fixed">
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center p-3 rounded-md transition-colors duration-200 ${
              location.pathname === link.path
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <link.icon className="mr-3 text-lg" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-md text-red-400 hover:bg-gray-700 transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;