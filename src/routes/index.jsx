import { Children } from "react";
import AdminLayout from "../layout/Admin/adminLayout";
import Dashboard from "../pages/Admin/dashboard";
import Products from "../pages/Admin/products";
import ClientLayout from "../layout/Client/clientLayout";

import AdminLogin from "../pages/Client/adminLogin";
import NotFound from "../pages/common/notFound";
import ClientRegister from "../pages/Client/ClientRegister";
import ClientproductsDetail from "../pages/Client/ClientProductsDetail";
import ClientProducts from "../pages/Client/ClienetProducts";
import ClientFavorites from "../pages/Client/ClientFavorites";
import ClientContact from "../pages/Client/ClientContact";
import ClientBasket from "../pages/Client/ClientBasket";
import ClientAbout from "../pages/Client/ClientAbout";
import ClientLogin from "../pages/Client/ClientLogin";
import ClientHome from "../pages/Client/ClinetHome";
import ClinetHome from "../pages/Client/ClinetHome";
const ROUTES = [
  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Products />,
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
        path: "favorites",
        element: <ClientFavorites />,
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
