import React from 'react'
import { Outlet } from "react-router"
import HeaderTemp from '../../components/Client/HeaderTemp'
const ClientLayout = () => {
  
  return (
    <>
      <HeaderTemp/>
      <Outlet/>
    </>
  )
}

export default ClientLayout
