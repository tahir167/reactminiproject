import React from 'react'
import { Link } from "react-router";
const Header = () => {
  return (
    <nav className='flex  items-center h-[9vh] bg-white shadow'>
        <div className='w-[80%] flex justify-between items-center mx-auto'>
        <h1 className='text-blue-700 font-bold text-xl'>Bazarly</h1>
        <ul className='flex gap-5'>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/adminlogin">Admin Panel</Link></li>
        </ul>
        <div className='flex gap-3'>
            <button className='w-[80px] h-[40px] bg-white flex items-center justify-center rounded'><Link to="/login">Login</Link></button>
             <button className='w-[80px] h-[40px] bg-black flex items-center justify-center rounded'><Link to="/register" className='text-white'>Register</Link></button>
        </div>
        </div>
    </nav>

  )
}

export default Header
