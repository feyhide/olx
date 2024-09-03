import React, { useEffect, useState } from 'react';
import { CiSearch, CiUser } from 'react-icons/ci';
import { IoArrowBack, IoCartOutline, IoClose, IoExit } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import Categories from '../../../../api/models/catagories.model';
import Cart from './Cart';
import { reset } from '../../redux/cart/cartSlice';
import { signOutFailure, signOutUserStart, signOutUserSuccess } from '../../redux/user/userSlice';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [profilemenu, setprofilemenu] = useState(false);
  const [cart, setcart] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isdetailActive,setisdetailActive] = useState(false);
  const [activeDetails, setActiveDetails] = useState(null);
  
  const mendetails = {
    sex : "men",
    brands: ["nike", "adidas", "puma", "onitsuka"],
    type: ['football', 'sneaker', 'slip-on', 'runner']
  };

  const womendetails = {
    sex : "women",
    brands: ["nike", "adidas", "puma", "onitsuka"],
    type: ['football', 'sneaker', 'slip-on', 'runner']
  };

  const kidsdetails = {
    sex : "kids",
    brands: ["nike", "adidas"],
    type: ['football','runner']
  };

  useEffect(() => {
    switch (activeItem) {
      case 'men':
        setActiveDetails(mendetails);
        break;
      case 'women':
        setActiveDetails(womendetails);
        break;
      case 'kids':
        setActiveDetails(kidsdetails);
        break;
      default:
        setActiveDetails(null);
    }
  }, [activeItem]);

  useEffect(()=>{
    if(isdetailActive === false && activeItem === null){
      setActiveItem(null)
    }
  },[isdetailActive])

  const navigate = useNavigate()
  const gototype = ({sex,type}) => {
    const urlParams = new URLSearchParams()
    urlParams.set("type",type)
    urlParams.set("sex",sex)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const gotobrand = ({sex,brand}) => {
    console.log(sex,brand)
    const urlParams = new URLSearchParams()
    urlParams.set("brand",brand)
    urlParams.set("sex",sex)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`/api/v1/auth/signout`)
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message))
        console.log(data.message)
        return;
      }
      dispatch(reset());
      dispatch(signOutUserSuccess())
      navigate("/")
    } catch (error) {
      dispatch(signOutFailure(error.message))
      console.log(error.message)
    }
  }

  return (
    <>
      <div onMouseLeave={()=>setActiveItem(null)} className='w-full h-auto z-50 fixed flex flex-col'>
        <div className="w-full h-[10vh] bg-white flex overflow-hidden items-center justify-between px-20">
          <img src='/logo.png' alt='Logo' className='w-[10%] h-full object-cover' />
          <div className='flex font-main text-2xl w-auto h-full gap-5 items-center justify-center'>
            <p 
              className={`${activeItem === "men" ? "bg-black p-2 text-white":""} transition-all ease hover:text-3xl hover:bg-black hover:p-2 hover:text-white`}
              onMouseEnter={() => setActiveItem("men")} 
            >
              Men
            </p>
            <p 
              className={`${activeItem === "women" ? "bg-black p-2 text-white":""} transition-all ease hover:text-3xl hover:bg-black hover:p-2 hover:text-white`}
              onMouseEnter={() => setActiveItem("women")} 
            >
              Women
            </p>
            <p 
              className={`${activeItem === "kids" ? "bg-black p-2 text-white":""} transition-all ease hover:text-3xl hover:bg-black hover:p-2 hover:text-white`}
              onMouseEnter={() => setActiveItem("kids")} 
            >
              Kids
            </p>
          </div>
          <div className='flex w-[10%] gap-5 items-center justify-center'>
            <CiSearch className='w-8 h-full' />
            <IoCartOutline onClick={() => {setcart(!cart),setprofilemenu(false)}}  className='w-8 h-full' />
            {!currentUser && <CiUser onClick={() => setSignup(true)} className="w-8 h-full" />}
            {currentUser && currentUser.avatar && <img onClick={()=>{setcart(false),setprofilemenu(!profilemenu)}} src={currentUser.avatar} className='w-8 rounded-full h-full'/>}
            {currentUser && !currentUser.avatar && <CiUser onClick={()=>{setcart(false),setprofilemenu(!profilemenu)}} className='w-8 h-full'/>}
          </div>
        </div>
        {currentUser && profilemenu && (
          <div className='w-full relative h-[30vh]'>
            <div className='w-[20%] flex flex-col items-center justify-center h-full absolute top-2 right-5 rounded-xl bg-white'>
              <IoClose onClick={()=>setprofilemenu(false)} className='text-red-600 absolute top-5 right-5 w-10 h-10'/>
              <div className='w-full h-[70%] flex flex-col items-center justify-center'>
                {!currentUser.avatar ? <CiUser className='w-12 h-1/2'/> : <img src={currentUser.avatar} className='w-12 h-1/2 rounded-full'/>}
                <p className='font-text tracking-tighter font-semibold text-xl'>{currentUser.email}</p>
              </div>
              <div className='w-full h-[30%] flex p-2 gap-2 justify-between'>
                <div onClick={handleSignout} className='w-1/2 h-full rounded-xl gap-2 flex items-center justify-center text-white text-lg font-text tracking-tighter bg-red-600'>
                  <IoExit className='w-8 rotate-180 h-full text-white'/>
                  <p>Sign Out</p>
                </div>
                <div className='w-1/2 gap-2 h-full rounded-xl flex items-center justify-center text-white text-lg font-text tracking-tighter bg-blue-600'>
                  <p>Profile</p>
                  <IoExit className='w-8 h-full text-white'/>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeDetails && (
          <div onMouseEnter={()=>setisdetailActive(true)} onMouseLeave={()=>setisdetailActive(false)} className='w-full font-main relative min-h-[20vh] gap-20 flex items-center justify-center bg-white'>
            <div className='flex flex-col gap-2 p-5 text-center'>
              <p className='text-2xl'>Brands</p>
              <div className='font-text tracking-tighter font-semibold'>
                {activeDetails.brands.map((item, index) => (
                  <p key={index} onClick={()=>gotobrand({sex:activeDetails.sex,brand:item})} className='hover:bg-black hover:p-2 hover:text-white transition-all ease capitalize'>{item}</p>
                ))}
              </div>
            </div>
            <div className='flex flex-col p-5 gap-2 text-center'>
              <p className='text-2xl'>Type</p>
              <div className='font-text tracking-tighter font-semibold'>
                {activeDetails.type.map((item, index) => (
                  <p key={index} onClick={()=>gototype({sex:activeDetails.sex,type:item})} className='hover:bg-black hover:p-2 hover:text-white transition-all ease capitalize'>{item}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {signup && (
        <div className="w-full h-full z-50 fixed top-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="w-[50%] h-[80%] rounded-lg shadow-lg flex items-center justify-center">
            <SignUp setSignup={setSignup} setSignin={setSignin} />
          </div>
        </div>
      )}
      {signin && (
        <div className="w-full h-full z-50 fixed top-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="w-[50%] h-[80%] rounded-lg shadow-lg flex items-center justify-center">
            <SignIn setSignin={setSignin} setSignup={setSignup} />
          </div>
        </div>
      )}
      {cart && (
        <Cart setCart={setcart}/>
      )}
    </>
  );
};

export default Header;
