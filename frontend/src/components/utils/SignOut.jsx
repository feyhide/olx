import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { addUsertoCart } from '../../redux/cart/cartSlice';

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      dispatch(addUsertoCart(data._id))
      console.log(data._id)
      navigate('/');
      setSignin(false); 
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };

  return (
    <div className="font-main relative w-full h-full bg-white bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center p-3">
      <IoClose onClick={()=>setSignin(false)} className='absolute top-5 left-5 h-[10%] w-[10%]' />
      <h1 className="text-5xl my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="font-text flex w-full flex-col gap-4 items-center">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Email"
          className="border tracking-tighter font-semibold text-lg p-3 rounded-lg w-[70%]"
          name="email"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="border tracking-tighter font-semibold text-lg p-3 rounded-lg w-[70%]"
          name="password"
        />
        <button
          disabled={loading}
          className="font-main text-2xl bg-black text-white border border-white h-10 transition-all ease uppercase w-[70%]"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
        <p className='text-xl'>Don't have an account ? <button className='text-blue-600' onClick={()=>{setSignin(false),setSignup(true)}}>Sign Up</button></p>
    </div>
  );
};

export default SignOut;
