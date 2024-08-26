import React from 'react'

const firstdiv = () => {
  return (
    <div className='w-[100vw] h-[100vh] relative flex justify-center items-center'>
        <img src='/mainhomediv/1.jpg' className='absolute h-[60%] -left-[250px] bottom-0'/>
        <img src='/mainhomediv/2.webp' className='absolute h-[70%] -right-[150px] -rotate-[45deg] -top-20'/>
        <div className='z-10 font-main flex flex-col'>
            <p className='text-6xl'>Where Top Kicks Meet Your Pitch</p>
            <button className='bg-black text-3xl text-white'>Show Collections</button>
        </div>
    </div>
  )
}

export default firstdiv