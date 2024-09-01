import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'

const Cart = ({setcart}) => {
  return (
    <div className="w-[20%] h-full z-50 fixed top-10 right-10 flex items-center justify-center">
        <div className='w-full relative h-[80%] flex items-center justify-center bg-white rounded-xl shadow-xl'>
        <IoClose onClick={()=>{setcart(false)}} className='w-12 h-12 absolute top-5 right-5 text-red-500'/>
        <p className='text-3xl font-main w-full text-center'>Your Cart</p>
        </div>
    </div>
  )
}

export default Cart