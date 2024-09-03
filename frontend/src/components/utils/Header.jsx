import React, { useEffect, useState } from 'react';
import { CiSearch, CiUser } from 'react-icons/ci';
import { IoCartOutline, IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
import Categories from '../../../../api/models/catagories.model';
import Cart from './Cart';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
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
            <IoCartOutline onClick={() => setcart(true)}  className='w-8 h-full' />
            {!currentUser && <CiUser onClick={() => setSignup(true)} className="w-8 h-full" />}
          </div>
        </div>
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
