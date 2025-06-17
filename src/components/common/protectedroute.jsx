// src/components/common/protectedroute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const user = useSelector((state) => state.user.user);

  // Əgər istifadəçi yoxdursa və ya istifadəçi obyekti düzgün deyil, həmişə login səhifəsinə yönləndir
  if (!user || !user.role) {
    // Admin rolu üçün login yolu "/adminlogin" olmalıdır
    // Client rolu üçün login yolu "/login" olmalıdır
    return <Navigate to={role === "admin" ? "/adminlogin" : "/login"} replace={true} />;
  }

  // İstifadəçinin rolunu yoxla
  if (role === "client") {
    return (
      <>
        {user.role === "client" ? (
          <Outlet />
        ) : (
          // Əgər istifadəçi client deyil, lakin daxil olubsa (məsələn, admin olub), home səhifəsinə yönləndir
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
          // Əgər istifadəçi admin deyil, lakin daxil olubsa (məsələn, client olub), home səhifəsinə yönləndir
          <Navigate to={"/"} replace={true} />
        )}
      </>
    );
  }

  // Yuxarıdakı şərtlərin heç birinə düşmürsə (nadir hallarda), ümumi loginə yönləndir
  return <Navigate to={"/login"} replace={true} />;
};

export default ProtectedRoute;