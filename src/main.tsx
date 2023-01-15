import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from '../pages/error/ErrorPage';
import NewNote from '../pages/create/NewNote';
import ViewNote from '../pages/view/ViewNote';
import EditNote from '../pages/view/edit/EditNote';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/new",
    element: <NewNote/>
  },
  {
    path: "/:noteID",
    element: <ViewNote/>
  },
  {
    path: "/:noteID/edit",
    element: <EditNote/>
  },
  // {
  //   path: '*',
  //   element: <Navigate to='/'/>
  // }

]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </ChakraProvider>
)
