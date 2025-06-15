import React from 'react'
import { FaTruck } from "react-icons/fa";
import { HiOutlineTruck } from "react-icons/hi";
import { LuShield } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
const HomeAvantage = () => {
  return (
    <section className='bg-gray-100 h-[70vh] flex flex-col items-center gap-15'>
       <div className='flex flex-col gap-3 items-center mt-12'>
        <h1 className='font-bold text-black text-4xl'>Why Choose Bazarly?</h1>
        <p className='text-xl text-gray-500'>We're committed to providing you with the best shopping experience possible.</p>
        </div>
        <div className="grid grid-cols-3 gap-7 w-[80%] mx-auto">
  <div className="w-[100%] h-[33vh] bg-white rounded-xl shadow flex flex-col items-center justify-center gap-3">
<HiOutlineTruck className="text-blue-500 text-6xl" />
<h1 className='font-bold text-xl'>Fast Delivery</h1>
<p className='text-gray-500 text-center w-[80%]'>Get your orders delivered quickly and safely to your doorstep.</p>
  </div>
  <div className="w-[100%] h-[33vh] bg-white rounded-xl shadow flex flex-col items-center justify-center gap-3">
<LuShield className="text-blue-500 text-6xl" />
<h1 className='font-bold text-xl'>Secure Shopping</h1>
<p className='text-gray-500 text-center w-[80%]'>Shop with confidence knowing your data and payments are secure.</p>
  </div>
   <div className="w-[100%] h-[33vh] bg-white rounded-xl shadow flex flex-col items-center justify-center gap-3">
<MdOutlineWatchLater className="text-blue-500 text-6xl" />
<h1 className='font-bold text-xl'>24/7 Support</h1>
<p className='text-gray-500 text-center w-[80%]'>Our customer support team is always here to help you.</p>
  </div>
</div>
    </section>
  )
}

export default HomeAvantage
