import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AdminRoute = () => {
    const {currentUser} = useSelector((state)=> state.user)
    const navigate = useNavigate()
    useEffect(()=>{
        const checkIsAdmin = async() => {
            try {
                const res = await fetch('/api/v1/auth/checkadmin')
                const data = await res.json()
                if(data.message === true){
                    return true
                }else{
                    return false
                }
            } catch (error) {
                console.log(error)
                return false
                navigate("/")
            }
        }
    },[])
    return confirmed ? <Outlet/> : <Navigate to='/'/>
}

export default AdminRoute