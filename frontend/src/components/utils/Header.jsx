import React, { useState } from 'react';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);

  return (
    <>
      <div className="w-full z-50 h-[7vh] fixed top-5 flex justify-center">
        <div className="w-[90%] flex overflow-hidden h-full justify-evenly bg-white rounded-2xl">
          <div className="w-[17%] px-5 h-full relative flex flex-col overflow-hidden justify-center">
            <img className="w-full" src="/logo.png" alt="Logo" />
          </div>
          <div className="w-[50%] h-full flex items-center justify-center">
            <div className="w-[80%] flex items-center justify-center h-[70%] overflow-hidden bg-black rounded-xl text-white">
              <input className="w-[90%] px-5 outline-none h-full bg-black" placeholder="Search..." />
              <CiSearch className="h-[80%] w-[10%]" />
            </div>
          </div>
          <div className="w-[20%] h-full items-center justify-center gap-5 flex">
            <CiShoppingCart className="h-[50%] w-[20%]" />
            {!currentUser ? <CiUser onClick={() => setSignup(true)} className="h-[50%] w-[20%]" />
                : " " }
          </div>
        </div>
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
            <SignIn setSignin={setSignin} setSignup={setSignup}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
