import React from 'react'
import { HiOutlineTruck } from 'react-icons/hi';
import { LuShield } from 'react-icons/lu';
import { MdOutlineWatchLater } from 'react-icons/md';
import { SlBasket } from "react-icons/sl";
import { PiMedalLight } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";


const HomeServices = () => {
  return (
       <section className=' h-[60vh] flex flex-col items-center gap-15'>
           <div className='flex flex-col gap-3 items-center mt-12'>
            <h1 className='font-bold text-black text-4xl'>Our Services</h1>
            <p className='text-xl text-gray-500'>Comprehensive solutions for all your shopping needs.</p>
            </div>
            <div className="grid grid-cols-4 gap-7 w-[80%] mx-auto">
      <div className="w-[100%] h-[33vh] flex flex-col items-center justify-center gap-3">
   <div className='w-[60px] h-[60px] rounded-full bg-blue-200 flex items-center justify-center'> <SlBasket  className="text-blue-600 text-3xl" /></div>
    <h1 className='font-bold text-xl'>Easy Shopping</h1>
    <p className='text-gray-500 text-center w-[90%]'>Browse and shop with our user-friendly interface</p>
      </div>
      <div className="w-[100%] h-[33vh] flex flex-col items-center justify-center gap-3">
 <div className='w-[60px] h-[60px] rounded-full bg-green-200 flex items-center justify-center'> <HiOutlineTruck className="text-green-600 text-3xl" /></div>
    <h1 className='font-bold text-xl'>Quick Delivery</h1>
    <p className='text-gray-500 text-center w-[90%]'>Fast and reliable delivery to your location</p>
      </div>
       <div className="w-[100%] h-[33vh]   flex flex-col items-center justify-center gap-3">
    <div className='w-[60px] h-[60px] rounded-full bg-purple-200 flex items-center justify-center'> <PiMedalLight  className="text-purple-600 text-3xl" /></div>
    <h1 className='font-bold text-xl'>Quality Products</h1>
    <p className='text-gray-500 text-center w-[90%]'>Only the best quality products for our customers</p>
      </div>
       <div className="w-[100%] h-[33vh]   flex flex-col items-center justify-center gap-3">
 <div className='w-[60px] h-[60px] rounded-full bg-orange-200 flex items-center justify-center'> <TbUsers   className="text-orange-600 text-3xl" /></div>
    <h1 className='font-bold text-xl'>Customer Care</h1>
    <p className='text-gray-500 text-center w-[90%]'>Dedicated support for all your needs</p>
      </div>
    </div>
        </section>
  )
}

export default HomeServices

