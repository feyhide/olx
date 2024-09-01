import React from 'react'
import { MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AdminProductBox = ({product}) => {
    const navigate = useNavigate()
  return (
        <div
            className="relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:z-30 w-[250px] h-[400px] rounded-xl overflow-hidden flex flex-col bg-white shadow-lg"
        >
            <MdEdit onClick={() => navigate(`/admin/updateproduct/${product._id}`)} className='absolute top-5 right-5' />
            <div className='w-full h-2/3 overflow-hidden'>
                <img
                src={product.imagesUrl[0]}
                alt={product.title}
                className="object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col font-text p-4">
            <h2 className="text-2xl font-main truncate">{product.title}</h2>
            <p className="text-2xl font-main">${product.price}</p>
            <div className="text-sm text-gray-600 flex flex-col capitalize">
                <span>{product.brand}</span>
                <span>{product.sex}</span>
                <span>{product.type}</span>
            </div>
            </div>
        </div>
  )
}

export default AdminProductBox