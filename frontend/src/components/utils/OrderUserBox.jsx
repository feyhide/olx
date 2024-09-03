import React, { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';

const OrderUserBox = () => {
    const { currentUser } = useSelector(state => state.user)
    const [userOrder, setUserOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [focusedOrder, setFocusedOrder] = useState(null);

    const fetchUserOrders = async () => {
        try {
            const res = await fetch(`/api/v1/order/userorders/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }
            setUserOrder(data || []);
        } catch (error) {
            setError('An error occurred while fetching orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser._id) {
            fetchUserOrders();
        }
    }, [currentUser]);

    const handleOrderClick = (index) => {
        setFocusedOrder(focusedOrder === index ? null : index);
    };
  return (
    <div className='w-full flex flex-col px-10 gap-2 h-3/5'>
                <p className='text-6xl text-end px-10 font-main'>Your Orders</p>
                {loading ? (
                    <p className="w-full h-full flex items-center justify-end font-main text-2xl">Loading...</p>
                ) : error ? (
                    <p className="w-full h-full flex items-center justify-end font-main text-2xl">{error}</p>
                ) : (
                    <div className='w-full h-auto p-10 flex flex-col gap-10'>
                        {userOrder.length > 0 ? (
                            userOrder.map((order, index) => (
                                <div className="w-full items-end justify-center flex flex-col">
                                <div className='w-1/2 text-end text-2xl font-main'>
                                    <p>Order : {index+1}</p>
                                    <p>Total : ${order.total}</p>
                                    <p>Status : {order.status}</p>
                                </div>
                                <div
                                    key={index}
                                    className={`shadow-lg p-5 relative w-1/2 overflow-y-auto py-2 transition-all duration-300 ease-in-out cursor-pointer ${focusedOrder === index ? 'h-[500px]' : 'h-[150px]'}`}
                                    onClick={() => handleOrderClick(index)}
                                >  
                                    {order.items.length > 0 ? (
                                        order.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="w-full h-[15vh] flex relative mb-2">
                                                <img className="w-full object-cover h-full" src={item.product.imagesUrl[0]} alt={`Image of ${item.product.title}`} />
                                                <div className="w-full h-full flex justify-between absolute top-0 bg-white bg-opacity-40 backdrop-blur-sm">
                                                    <div className="w-1/2 h-full flex justify-center flex-col items-center px-2">
                                                        <p className="font-main truncate w-full text-xl">{item.product.title}</p>
                                                        <div className="w-full flex font-main text-sm gap-2">
                                                            <p>{item.product.sex}</p>
                                                            <p>{item.product.brand}</p>
                                                            <p>{item.product.type}</p>
                                                        </div>
                                                        <div className='flex flex-col w-full font-main text-xl'>
                                                            <p>Price: ${item.product.price.toFixed(2)}</p>
                                                            <div className='text-base tracking-wide flex gap-2'>
                                                                <p>Qty: {item.quantity}</p>
                                                                <p className='bg-green-500 px-2 text-white flex items-center'>{item.selectedSize.country} : {item.selectedSize.size}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-[20%] p-4 h-full">
                                                        <div className="w-full h-full bg-white">
                                                            <img className="w-full h-full object-cover" src={item.product.imagesUrl[1]} alt={`Alternate view of ${item.product.title}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="w-full h-full flex items-center justify-center font-main text-2xl">Your orders are empty.</p>
                                    )}
                                </div>
                                </div>
                            ))
                        ) : (
                            <p className="w-full h-full flex items-center justify-center font-main text-2xl">You have no orders.</p>
                        )}
                    </div>
                )}
            </div>

  )
}

export default OrderUserBox