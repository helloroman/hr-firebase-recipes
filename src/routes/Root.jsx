import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {useAuth} from "../providers/AuthProvider.jsx";

export const Root = () => {
  const {user, handleSignIn, handleSignOut} = useAuth();

  return (
    <>
      <h1>Hello {user ? user.displayName : 'World!'}</h1>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <Outlet />
    </>
  )
};