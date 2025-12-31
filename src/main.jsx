import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  
  RouterProvider,
} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
     
     <QueryClientProvider client={queryClient}>

      <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
     </AuthProvider>

     </QueryClientProvider>
     

     
  </StrictMode>,
)
