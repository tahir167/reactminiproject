import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({role}) => {
    const user = useSelector((state) => state.user.user)
    
    if (role === "client") {
        return (
            <>
                {user && user.role === "client" ? (
                    <Outlet />
                ) : (
                    <Navigate to={"/login"} replace={true} />
                )}
            </>
        )
    } else if (role === "admin") {
        return (
            <>
                {user && user.role === "admin" ? (
                    <Outlet />
                ) : (
                    <Navigate to={"/admin/login"} replace={true} />
                )}
            </>
        )
    }
    
    return <Navigate to={"/login"} replace={true} />
}

export default ProtectedRoute