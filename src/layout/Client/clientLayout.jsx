import React from 'react'
import header from '../../components/Client/header'
import { Outlet } from "react-router"
const ClientLayout = () => {
  return (
    <>
      <header/>
      <Outlet/>
    </>
  )
}

export default ClientLayout
