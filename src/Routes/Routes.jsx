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
import MySelectedClasses from "../pages/DashBoard/MySelectedClasses/MySelectedClasses";
import Payment from "../pages/DashBoard/Payment/Payment";
import MyEnrolledClasses from "../pages/DashBoard/MyEnrolledClasses/MyEnrolledClasses";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

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
          element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
          children: [
            //admin routes
            {
              path: 'manageusers',
              element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
            },
            {
              path: 'manageclasses',
              element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>,
            },
            //instructors routes
            {
              path: 'addclass',
              element: <InstructorRoute><AddClass></AddClass></InstructorRoute>,
            },
            {
              path: 'myclasses',
              element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>,
            },
            //student routes
            {
              path: 'myselectedclasses',
              element: <MySelectedClasses></MySelectedClasses>,
            },
            {
              path: 'myenrolledclasses',
              element: <MyEnrolledClasses></MyEnrolledClasses>,
            },
            {
              path: 'paymenthistory',
              element: <PaymentHistory></PaymentHistory>,
            },
            {
              path: 'payment/:id',
              element: <Payment></Payment>,
              loader: ({params}) => fetch(`http://localhost:5000/carts/${params.id}`)
            },

          ],
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>,
        },
      ],
    },
    
  ]);