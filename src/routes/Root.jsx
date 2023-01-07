import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useAuth} from "../providers/AuthProvider.jsx";
import {NavLink, Outlet} from "react-router-dom";
import './Root.styles.scss';

const Root = () => {
  const {user, handleSignIn, handleSignOut} = useAuth();

  return (
    <div className="layout">
      <nav className="layout__navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="posts">Posts</NavLink>
      </nav>
      <div className="layout__login">
        {user ? <Typography>Hello <strong>{user.displayName}!</strong></Typography> : null}
        <Button variant="contained" onClick={handleSignIn}>Sign in</Button>
        <Button variant="contained" onClick={handleSignOut}>Sign out</Button>
      </div>
      <Outlet />
    </div>
  )
}

export default Root
