import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageUsers from "../pages/DashBoard/ManageUsers/ManageUsers";
import AddClass from "../pages/DashBoard/AddClass/AddClass";
import MyClasses from "../pages/DashBoard/MyClasses/MyClasses";
import ManageClasses from "../pages/DashBoard/ManageClasses/ManageClasses";
import Classes from "../pages/Classes/Classes";
import Instructors from "../pages/Instructors/Instructors";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
        {
          path: 'login',
          element: <Login></Login>,
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>,
        },
        {
          path: 'classes',
          element: <Classes></Classes>,
        },
        {
          path: 'instructors',
          element: <Instructors></Instructors>,
        },
        {
          path: "dashboard",
          element: <DashboardLayout></DashboardLayout>,
          children: [
            //admin routes
            {
              path: 'manageusers',
              element: <ManageUsers></ManageUsers>,
            },
            {
              path: 'manageclasses',
              element: <ManageClasses></ManageClasses>,
            },
            //instructors routes
            {
              path: 'addclass',
              element: <AddClass></AddClass>,
            },
            {
              path: 'myclasses',
              element: <MyClasses></MyClasses>,
            },
            //student routes

          ],
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>,
        },
      ],
    },
    
  ]);