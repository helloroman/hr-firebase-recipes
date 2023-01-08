import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root.jsx'
import {initializeApp} from 'firebase/app';
import {
  createBrowserRouter, createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import {AuthProvider} from "./providers/AuthProvider";
import {ProtectedRoute} from "./helpers/ProtectedRoute";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {Posts} from "./routes/Posts";
import './main.styles.scss';

const firebaseConfig = {
  apiKey: "AIzaSyAkTzHizvM7o06WLocggI5OKlhxxvCxd-w",
  authDomain: "roman-firebase-recipes-2.firebaseapp.com",
  projectId: "roman-firebase-recipes-2",
  storageBucket: "roman-firebase-recipes-2.appspot.com",
  messagingSenderId: "995100080969",
  appId: "1:995100080969:web:45c56c9af6a684cfe43898"
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<h1>Hello world</h1>}/>
      <Route path="posts" element={<ProtectedRoute/>}>
        <Route index element={<Posts/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);
