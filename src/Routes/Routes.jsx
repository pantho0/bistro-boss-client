import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Dashboard/Cart/Cart";
import AllUsers from "../Dashboard/All Users/AllUsers";
import AddItems from "../Dashboard/Add Items/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Dashboard/Manage Items/ManageItems";
import UpdateItem from "../Dashboard/Update Items/UpdateItem";
import Payment from "../Dashboard/Payment/Payment";
import PaymentHistory from "../Dashboard/Payment History/PaymentHistory";
import UserHome from "../Dashboard/UserHome/UserHome";
import AdminHome from "../Dashboard/Admin/AdminHome";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children : [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path : '/menu',
            element : <Menu></Menu>
        },
        {
          path : '/order/:category',
          element : <Order></Order>
        },
        {
          path : '/login',
          element : <Login></Login>
        },
        {
          path : '/signup',
          element : <SignUp></SignUp>
        },
        {
          path : '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // Normal User's Route 
        {
          path: "cart",
          element: <Cart></Cart>
        },
        {
          path : "userHome",
          element : <UserHome></UserHome>
        },
        {
          path : "payment",
          element: <Payment></Payment>
        },
        {
          path : "paymentHistory",
          element : <PaymentHistory></PaymentHistory>
        },
        // Admin User's Route
        {
          path: "allUsers",
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: "adminHome",
          element : <AdminRoute><AdminHome></AdminHome></AdminRoute>
        }, 
        {
          path: "addItems",
          element: <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path : "manageItems",
          element : <AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path : 'update/:id',
          element : <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader : ({params}) => fetch(`http://localhost:5001/menu/${params.id}`)
        }
      ]
    }
  ]);