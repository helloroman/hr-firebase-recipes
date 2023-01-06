import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {Root} from "./routes/Root.jsx";
import {AuthProvider} from "./providers/AuthProvider";
import {ProtectedRoute} from "./helpers/ProtectedRoute";
import {Posts} from "./routes/Posts";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<p>Hello React Router!</p>} />
    <Route path="posts" element={<ProtectedRoute />}>
      <Route index element={<Posts />} />
    </Route>
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
