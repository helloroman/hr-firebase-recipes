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
import {Posts} from "./routes/Posts";

const firebaseConfig = {
  apiKey: "AIzaSyBbM3sRo8o08wsNzOEVuR9TOgJjfJecxsI",
  authDomain: "roman-auth-recipe.firebaseapp.com",
  projectId: "roman-auth-recipe",
  storageBucket: "roman-auth-recipe.appspot.com",
  messagingSenderId: "905047776324",
  appId: "1:905047776324:web:9120a1cff7e4e391e5b011"
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<h1>Hello world</h1>}/>
      <Route path="posts" element={<ProtectedRoute/>}>
        <Route index element={<Posts />}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);
