import { Children } from "react"
import AdminLayout from "../layout/Admin/adminLayout"
import Dashboard from "../pages/Admin/dashboard"
import Products from "../pages/Admin/products"
import ClientLayout from "../layout/Client/clientLayout"
import CHome from "../pages/Client/cHome"
import CAbout from "../pages/Client/cAbout"
import CLogin from "../pages/Client/cLogin"
import CBasket from "../pages/Client/cBasket"
import CContact from "../pages/Client/cContact"
import CFavorites from "../pages/Client/cFavorites"
import CProducts from "../pages/Client/cProducts"
import CproductsDetail from "../pages/Client/cproductsDetail"
import AdminLogin from "../pages/Client/adminLogin"
import Register from "../pages/Client/Register"
import NotFound from "../pages/common/notFound"
const ROUTES=[
    {
        element:<AdminLayout/>,
        children:[
{
    index:true,
    path:"/admin",
    element:<Dashboard/>
},
{
    path:"login",
    element:<Products/>
}
        ]
    },
    {
element:<ClientLayout/>,
path:"/",
children:[
{
    index:true,
    element:<CHome/>
},
{
   path:"about",
    element:<CAbout/>
},
{
  path:"login",
    element:<CLogin/>
},
{
    path:"adminlogin",
    element:<AdminLogin/>
},
{
    path:"basket",
    element:<CBasket/>
},
{
    path:"contact",
    element:<CContact/>
},
{
    path:"favorites",
    element:<CFavorites/>
},

{
    path:"products",
    element:<CProducts/>
},
{
    path:"products/:id",
    element:<CproductsDetail/>
},
{
    path:"register",
    element:<Register/>
},
{
    path:"*",
    element:<NotFound/>
}
]
    }
]

export default ROUTES