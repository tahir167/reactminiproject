
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const user = useSelector((state) => state.user.user);

  if (!user || !user.role) {
    return <Navigate to={role === "admin" ? "/adminlogin" : "/login"} replace={true} />;
  }

  if (role === "client") {
    return (
      <>
        {user.role === "client" ? (
          <Outlet />
        ) : (
          <Navigate to={"/"} replace={true} />
        )}
      </>
    );
  } else if (role === "admin") {
    return (
      <>
        {user.role === "admin" ? (
          <Outlet />
        ) : (
          <Navigate to={"/"} replace={true} />
        )}
      </>
    );
  }

  return <Navigate to={"/login"} replace={true} />;
};

export default ProtectedRoute;