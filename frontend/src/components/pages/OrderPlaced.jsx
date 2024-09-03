import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { reset } from '../../redux/cart/cartSlice';

const OrderPlaced = () => {
    const navigate = useNavigate()
    const { items, userRef, total } = useSelector(state => state.cart);
    const [formData, setFormData] = useState({
        userRef: '',
        items: [],
        total: 0,
        status: 'pending',
        trackingId: ''
    });
    const dispatch = useDispatch()

    useEffect(()=>{
        setFormData({
            userRef: userRef,
            items: items,
            total: total,
            status: 'pending',
            trackingId: ''
        });
    },[])

    useEffect(() => {
        const addOrder = async () => {
            try {
                const res = await fetch(`/api/v1/order/addorder/${userRef}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData) 
                });
                const data = await res.json(); 

                if (data.success === false) {
                    console.log(data.message);
                    return;
                }
                
                console.log('Order placed successfully:', data);
                dispatch(reset())
                navigate("/")
            } catch (error) {
                console.log(error);
            }
        };

        if (userRef) {
            addOrder();
        }
    }, [formData]); 

    return (
        <div>Order Placed</div>
    );
};

export default OrderPlaced;
