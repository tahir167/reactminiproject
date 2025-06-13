import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ROUTES from './routes';
const routes=createBrowserRouter(ROUTES)
const App = () => {
  return (
    <>
     <RouterProvider router={routes}/>
    </>
  )
}

export default App
