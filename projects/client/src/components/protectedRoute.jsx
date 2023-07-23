import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const AdminRoute = ({ children }) => {
    const user = useSelector((state) => state.userSlice);
    let location = useLocation();
    if (user.value.role !== 2) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return children

};

export default AdminRoute;
