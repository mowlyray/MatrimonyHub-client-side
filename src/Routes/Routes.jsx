import React from 'react';
import {
  createBrowserRouter,

} from "react-router";
import MainLayouts from '../layouts/MainLayouts';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Biodatas from '../pages/Biodatas';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BiodataDetails from '../pages/BiodataDetails';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from '../provider/PrivateRoute';
import EditBiodata from '../pages/EditBiodata';
import ViewBioData from '../pages/ViewBioData';
import ContactRequest from '../pages/ContactRequest';
import FavouriteBiodata from '../pages/FavouriteBiodata';
import AdminDashBoard from '../pages/AdminDashBoard';
import ManageUsers from '../pages/ManageUsers';
import ApprovedPremium from '../pages/ApprovedPremium';
import ApprovedContactRequest from '../pages/ApprovedContactRequest';
import Payment from '../pages/Paymnet';
import Payment1 from '../pages/Paymnet1';

// import AdminRoute from '../layouts/AdminRoute';
// import AdminDashboard from '../Dashboard/AdminDashboard';
// import ManageUsers from '../Dashboard/ManageUsers';


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
        // {
        //     path: '/dashboard',
        //     element:<Dashboard></Dashboard>
        // },
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
        Component:ViewBioData,
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
        Component:AdminDashBoard,
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
      
      // {
      //   path: "admin-dashboard",
      //   Component:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      // },
    ]
  },
  //  {
  //   path: '/dashboard',
  //   element: <AdminRoute><DashboardLayout /></AdminRoute>,
  //   children: [
  //     {
  //       path: "admin-dashboard",
  //       Component:<AdminDashboard></AdminDashboard>,
  //     },
  //     {
  //       path: "manage-users",
  //       Component:<ManageUsers></ManageUsers>,
  //     },
      
  //   ]
  // },
  
  
  
]);