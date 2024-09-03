import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const Cart = ({ setCart }) => {
  const { items } = useSelector(state => state.cart);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setTotal(newTotal);
    };

    calculateTotal();
  }, [items]);

  return (
    <div className="w-[20%] h-full z-50 fixed top-10 right-10 flex items-center justify-center">
      <div className="w-full h-[80%] flex flex-col bg-white rounded-xl shadow-xl relative">
        <IoClose onClick={() => {setCart(false)}} className="w-12 h-12 absolute z-50 top-5 right-5 text-red-500 cursor-pointer" />
        <p className="text-3xl font-main w-full text-center mt-16 pb-3">Your Cart</p>
        <div className="w-full h-full flex-1 overflow-y-auto py-2">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} onClick={()=>navigate(`/product/${item.product._id}`)} className="w-full h-[15vh] flex relative mb-2">
                <img className="w-full object-cover h-full" src={item.product.imagesUrl[0]} alt={item.product.title} />
                <div className="w-full h-full flex absolute top-0 bg-white bg-opacity-40 backdrop-blur-sm">
                  <div className="w-1/2 h-full flex justify-center flex-col items-center px-2">
                    <p className="font-main truncate w-full text-xl">{item.product.title}</p>
                    <div className="w-full flex font-main text-xs gap-2">
                      <p>{item.product.sex}</p>
                      <p>{item.product.brand}</p>
                      <p>{item.product.type}</p>
                    </div>
                    <div className="flex flex-col w-full font-main text-xl ">
                      <p>Price: ${item.product.price.toFixed(2)}</p>
                      <div className='text-sm tracking-wide flex gap-2'>
                        <p>Qty: {item.quantity}</p>
                        <p className='bg-green-500 px-2 text-white'>{item.selectedSize.country} : {item.selectedSize.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 p-4 h-full">
                    <div className="w-full h-full bg-white">
                      <img className="w-full h-full object-cover" src={item.product.imagesUrl[1]} alt={item.product.title} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="w-full h-full flex items-center justify-center font-main text-2xl">Your cart is empty.</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 py-3 bg-white border-t border-gray-300">
          <p className="text-3xl font-main w-full text-center">Total: ${total.toFixed(2)}</p>
          <button className="w-full bg-black text-white font-main text-3xl py-2">Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
