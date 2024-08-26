import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewProducts = () => {
  const [error,seterror] = useState(null)
  const navigate = useNavigate()
  const [products,setproducts] = useState([])
  
  const fetchallproducts = async() => {
    try {
      const res = await fetch(`/api/v1/products/getproducts`)
      const data = await res.json()
      if(data.success === false){
        return
      }
      setproducts(data)
      console.log(products)
    } catch (error) {
      seterror(error.message)
    }
  }

  useEffect(()=>{
    fetchallproducts();
  },[])

  return (
    <div className='absolute right-0 top-0 flex w-[75vw]'>
      <div className='flex justify-between gap-2 p-2 mt-10 px-10 w-full font-main'>
        <p className='text-5xl'>View Products</p>
        <button onClick={()=>{navigate("/admin/createproducts")}} className='text-3xl bg-green-500 text-white p-2 rounded-xl'>Create Product</button>
      </div>
    </div>
  )
}

export default ViewProducts