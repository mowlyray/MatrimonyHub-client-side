import React from 'react';
import {
  createBrowserRouter,

} from "react-router";
import MainLayouts from '../layouts/MainLayouts';

import ErrorPage from '../pages/ErrorPage';
import Biodatas from '../pages/Biodatas';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import AuthLayout from '../layouts/AuthLayout';

import BiodataDetails from '../pages/BiodataDetails';
import DashboardLayout from '../layouts/DashboardLayout';
import Payment from '../pages/Paymnet';
import Payment1 from '../pages/Paymnet1';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import PrivateRoute from '../routes/PrivateRoute';
import EditBiodata from '../pages/userDashboard/EditBiodata';
import ViewBiodata from '../pages/userDashboard/ViewBioData';
import ContactRequest from '../pages/userDashboard/ContactRequest';
import FavouriteBiodata from '../pages/userDashboard/FavouriteBiodata';
import ManageUsers from '../pages/AdminDashboard/ManageUsers';
import ApprovedPremium from '../pages/AdminDashboard/ApprovedPremium';
import ApprovedContactRequest from '../pages/AdminDashboard/ApprovedContactRequest';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';


export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index:true,
            path:"/",
            Component:Home,
        },
        {
            path: '/biodatas',
            element:<Biodatas></Biodatas>
        },
        {
            path: '/checkout',
            element:<Payment></Payment>
        },
        {
            path: '/payment',
            element:<Payment1></Payment1>
        },
        {
            path: '/about',
            element:<AboutUs></AboutUs>
        },
        {
            path: '/contact',
            element:<ContactUs></ContactUs>
        },
        {
            path: '/biodata/:id',
            element:<BiodataDetails></BiodataDetails>
        },

    ]
  },
  {
    path: '/auth',
    element:<AuthLayout></AuthLayout>,
    children: [
      {
        path:'/auth/login',
        element:<Login></Login>,
      },
      {
        path:'/auth/register',
        element:<Register></Register>,
      },
    ]
  },

  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "edit-biodata",
        Component:EditBiodata,
      },
      {
        path: "view-biodata",
        Component:ViewBiodata,
      },
      {
        path: "contacts",
        Component:ContactRequest,
      },
      {
        path: "favourites",
        Component:FavouriteBiodata,
      },
      {
        path: "admindashboard",
        Component:AdminDashboard,
      },
      {
        path: "manageUsers",
        Component:ManageUsers,
      },
      
      {
        path: "approvedPremium",
        Component:ApprovedPremium,
      },
      
      {
        path: "approvedContactRequest",
        Component:ApprovedContactRequest,
      },
      
    ]
  },
  
  
]);