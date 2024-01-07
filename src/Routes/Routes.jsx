import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import OurMenu from "../Pages/OurMenu/OurMenu";
import OurFoods from "../Pages/OurFoods/OurFoods";
import Login from "../Pages/Home/Login/Login";
import Registration from "../Pages/Home/Registration/Registration";
import Secret from "../Pages/Secret/Secret";
import PrivateRoute from "./PrivateRoute";

import DashBoard from "../Layout/DashBoard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Pages/Dashboard/ManageItem/ManageItem";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/paymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/ourMenu',
          element: <OurMenu></OurMenu>
        },
        {
          path: '/ourOrder/:category',
          element: <OurFoods></OurFoods>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/registration',
          element: <Registration></Registration>
        },
        {
          path: '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
        
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'myCart',
          element: <MyCart></MyCart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },

// admin routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'addItem',
          element: <AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path: 'manageItem',
          element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
        },
        {
          path: 'updateItem/:id',
          element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/menus/${params.id}`)
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }

      ]
    }
  ]);
  