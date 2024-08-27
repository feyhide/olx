import React, { useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [page,setpage] = useState("analytics")
    const navigate = useNavigate()

    return (
        <div className='z-50 fixed flex items-center justify-center w-[25vw] h-[100vh] bg-black'>
            <div className='w-[90%] flex flex-col relative justify-center rounded-xl h-[95%] bg-white'>
                <img className='absolute top-0 left-1/2 w-[200px] transform -translate-x-1/2' src='/logo.png'/>
                <div className='w-full flex flex-col gap-2 font-text text-lg font-semibold'>
                <button onClick={()=>setpage("analytics")} className={classNames('w-full text-center bg-black text-white transition-all ease ',{"py-5": page === 'analytics',"py-2": page != 'analytics'})}>View Analytics</button>
                <button onClick={()=>{setpage("products"),navigate("/admin/viewproducts")}} className={classNames('w-full text-center bg-black text-white transition-all ease',{"py-5": page === 'products',"py-2": page != 'products'})}>Handle Products</button>
                <button onClick={()=>setpage("orders")} className={classNames('w-full text-center bg-black text-white transition-all ease',{"py-5": page === 'orders',"py-2": page != 'orders'})}>View Orders</button>
                <button onClick={()=>setpage("msgs")} className={classNames('w-full text-center bg-black text-white transition-all ease',{"py-5": page === 'msgs',"py-2": page != 'msgs'})}>Messages</button>
                </div>
                <div className='absolute w-full bottom-10'>
                <button className='w-full text-center py-2 font-text font-semibold bg-red-600 text-white transition-all ease hover:text-xl text-lg'>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar