import React from 'react'
import { Link } from "react-router";
const Header = () => {
  return (
    <nav className='flex justify-between items-center'>
        <h1 className='text-blue-800'>Bazarly</h1>
        <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/adminlogin">Admin Panel</Link></li>
        </ul>
        <div>
            <button><Link to="/login">Login</Link></button>
             <button><Link to="/register">Register</Link></button>
        </div>
    </nav>

  )
}

export default Header
