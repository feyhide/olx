import React, { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import OrderUserBox from '../utils/OrderUserBox';
import { updateAddress } from '../../redux/user/userSlice';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [address,setaddress] = useState("")
    const dispatch = useDispatch()
    useEffect(()=>{
        if(currentUser.address){   
            setaddress(currentUser.address)
        }
    },[])

    const handleAddress = async() => {
        dispatch(updateAddress(address))
    }
    return (
        <div className='w-screen gap-10 flex flex-col h-auto pt-20'>
            <div className='w-full flex flex-col px-10 justify-center gap-2 h-[30vh]'>
                {currentUser && !currentUser.avatar ? (
                    <CiUser className='w-20 h-20' />
                ) : (
                    <img src={currentUser.avatar} alt="User Avatar" className='w-12 h-12 rounded-full' />
                )}
                <p className='font-main text-5xl'>{currentUser.email}</p>
            </div>
            <div className='w-1/2  flex flex-col px-10 justify-center gap-2 h-[30vh]'>
                {!currentUser.address ? (<p className='text-4xl font-main'>Add Your Address</p>):
                (<p className='text-4xl font-main'>Change Your Address</p>)}
                <textarea type="" onChange={(e)=>{setaddress(e.target.value)}} value={address || ""} className='font-text tracking-tighter font-semibold w-full min-h-20 px-1 outline-dashed ' placeholder='Address'/>
                <div className='w-full bg-red-200'>
                    <button onClick={handleAddress} className='bg-black text-white font-main text-2xl p-1 w-full'>Save</button>
                </div>
            </div>
            <OrderUserBox/>
        </div>
    );
};

export default Profile;
