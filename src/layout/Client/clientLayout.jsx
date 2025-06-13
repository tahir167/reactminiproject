import React from 'react'
import { Outlet } from "react-router"
import Header from '../../components/Client/header'
const ClientLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    
    </>
  )
}

export default ClientLayout