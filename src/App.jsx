import React from 'react'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ROUTES from './routes';
const routes=createBrowserRouter(ROUTES)
const App = () => {
  return (
    <>
       <SnackbarProvider >
     <RouterProvider router={routes}/>
     </SnackbarProvider>
    </>
  )
}

export default App
