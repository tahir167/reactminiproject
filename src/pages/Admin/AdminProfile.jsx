import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaIdBadge } from 'react-icons/fa';

const AdminProfile = () => {
  const user = useSelector((state) => state.user.user);

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-red-600">Access Denied</h2>
        <p className="text-gray-600">You must be logged in as an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.profileImg || 'https://via.placeholder.com/150'} 
          alt="Admin Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
        />
        <h3 className="text-2xl font-semibold text-gray-900">{user.fullName || 'Admin User'}</h3>
        <p className="text-md text-gray-600">{user.role}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-gray-700">
          <FaIdBadge className="mr-3 text-blue-500" />
          <strong>ID:</strong> <span className="ml-2">{user.id}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FaEnvelope className="mr-3 text-blue-500" />
          <strong>Email:</strong> <span className="ml-2">{user.email}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FaPhone className="mr-3 text-blue-500" />
          <strong>Phone:</strong> <span className="ml-2">{user.phone || 'N/A'}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FaCalendarAlt className="mr-3 text-blue-500" />
          <strong>Registered At:</strong> <span className="ml-2">{new Date(user.registeredAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FaIdBadge className="mr-3 text-blue-500" />
          <strong>Balance:</strong> <span className="ml-2">${user.balance ? user.balance.toFixed(2) : '0.00'}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;