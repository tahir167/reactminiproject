import React from 'react'
import { Link } from 'react-router-dom'
const ClientHomeGradient = () => {
  return (
   <section className='w-[100%] h-[50vh] bg-gradient-to-r from-blue-800 to-fuchsia-600 flex flex-col justify-center items-center gap-8'>
<h1 className='text-white font-bold text-7xl'>Welcome to Bazarly</h1>
<p className='text-justify w-[56%] text-3xl text-white'>Your one-stop online marketplace for everyday essentials. From beverages to hygiene products, we've got everything you need.</p>
<div className='flex gap-3'>
    <button className='w-[100px] h-[40px] bg-white rounded'><Link to="/products" className='text-blue-800'>Shop Now</Link></button>
    <button className='w-[100px] h-[40px] border border-white rounded' ><Link to="/about">Learn More</Link></button>
</div>
   </section>
  )
}

export default ClientHomeGradient
