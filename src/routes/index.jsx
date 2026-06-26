import { Children } from "react";
import AdminLayout from "../layout/Admin/adminLayout"; 
import Dashboard from "../pages/Admin/dashboard";
import Products from "../pages/Admin/AdminProducts";
import ClientLayout from "../layout/Client/clientLayout";
import AdminLogin from "../pages/Client/adminLogin"; 
import NotFound from "../pages/common/notFound";
import ClientRegister from "../pages/Client/ClientRegister";
import ClientproductsDetail from "../pages/Client/ClientProductsDetail";
import ClientFavorites from "../pages/Client/ClientFavorites";
import ClientContact from "../pages/Client/ClientContact";
import ClientBasket from "../pages/Client/ClientBasket";
import ClientAbout from "../pages/Client/ClientAbout";
import ClientLogin from "../pages/Client/ClientLogin";
import ClinetHome from "../pages/Client/ClinetHome";
import ClientProfile from "../pages/Client/ClientProfile";
import ProtectedRoute from "../components/common/protectedroute";
import ClientProducts from "../pages/Client/ClientProducts";
import ClientFormforPay from "../pages/Client/ClientFormforPay";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminProfile from "../pages/Admin/AdminProfile";

const ROUTES = [
  {

    element: <AdminLayout />,
    children: [
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "/admin", 
            element: <Dashboard />,
          },
          {
            path: "/admin/products",
            element: <AdminProducts />,
          },
          {
            path: "/admin/users",
            element: <AdminUsers />,
          },
          {
            path: "/admin/profile",
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
  {
    element: <ClientLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <ClinetHome />,
      },
      {
        path: "home",
        element: <ClinetHome />,
      },
      {
        path: "about",
        element: <ClientAbout />,
      },
      {
        path: "login",
        element: <ClientLogin />,
      },
      {
        path: "adminlogin", 
        element: <AdminLogin />,
      },
      {
        path: "basket",
        element: <ClientBasket />,
      },
      {
        path: "contact",
        element: <ClientContact />,
      },
      {
        path: "clientformforpay",
        element: <ClientFormforPay />,
      },
      {
        element: <ProtectedRoute role="client" />,
        children: [
          {
            path: "favorites",
            element: <ClientFavorites />,
          },
          {
            path: "profile",
            element: <ClientProfile />,
          },
        ],
      },
      {
        path: "products",
        element: <ClientProducts />,
      },
      {
        path: "products/:id",
        element: <ClientproductsDetail />,
      },
      {
        path: "register",
        element: <ClientRegister />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default ROUTES;