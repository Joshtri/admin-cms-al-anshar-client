import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Jika user belum login, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Jika peran user tidak diizinkan untuk mengakses halaman ini, arahkan ke dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  // Jika user login dan peran diizinkan, tampilkan komponen yang diminta
  return <Component />;
};

// Menambahkan propTypes untuk validasi
ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;