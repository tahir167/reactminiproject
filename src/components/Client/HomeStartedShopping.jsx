import React from 'react'
import { Link } from 'react-router-dom'

const HomeStartedShopping = () => {
  return (
    <section className='w-[100%] h-[50vh] bg-blue-600 flex flex-col justify-center items-center gap-8'>
<h1 className='text-white font-bold text-5xl'>Ready to Start Shopping?</h1>
<p className='text-center w-[56%] text-2xl text-white'>Join thousands of satisfied customers and discover the convenience of shopping with Bazarly.</p>
<div className='flex gap-3'>
    <button className='w-[185px] h-[45px] bg-white rounded-lg'><Link to="/register" className='text-blue-800'>Get Started Today</Link></button>
</div>
   </section>
  )
}

export default HomeStartedShopping
