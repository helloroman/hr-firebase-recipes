import React, {useEffect, useLayoutEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from "../providers/AuthProvider.jsx";

export const ProtectedRoute = () => {
  const {user} = useAuth();

  console.log(user);
  if (!user) return <Navigate to="/" replace/>
  return <Outlet/>;
};
