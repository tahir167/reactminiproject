import React from 'react'
import { Link } from 'react-router-dom'

const HomeStartedShopping = () => {
  return (
    <section className='w-[100%] h-auto lg:h-[50vh] bg-blue-600 flex flex-col justify-center items-center gap-8 py-10 lg:py-0 px-4 lg:px-0'>
      <h1 className='text-white font-bold text-3xl sm:text-5xl text-center'>Ready to Start Shopping?</h1>
      <p className='text-center w-[90%] sm:w-[70%] lg:w-[56%] text-lg sm:text-2xl text-white'>Join thousands of satisfied customers and discover the convenience of shopping with Bazarly.</p>
      <div className='flex gap-3'>
        <button className='w-[185px] h-[45px] bg-white rounded-lg'><Link to="/register" className='text-blue-800'>Get Started Today</Link></button>
      </div>
    </section>
  )
}

export default HomeStartedShopping