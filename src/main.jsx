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
import {getFirestore} from "firebase/firestore";
import {Posts} from "./routes/Posts";
import './main.styles.scss';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);

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
