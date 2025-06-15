import React from 'react'
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white px-6 py-10 ">
        <div className='w-[80%] mx-auto'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-500">Bazarly</h2>
          <p className="mb-4">
            Your trusted online marketplace for everyday essentials. Quality products, great prices, fast delivery.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>Beverages</li>
             <li>Snacks</li>
              <li>Dairy Products</li>
               <li>Hygiene Products</li>
                <li>Candy</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center">
              <MdEmail className="text-blue-400 mr-3 text-lg" />
              <a href="mailto:info@bazarly.com" className="hover:text-white transition-colors">
                info@bazarly.com
              </a>
            </li>
            <li className="flex items-center">
              <MdPhone className="text-blue-400 mr-3 text-lg" />
              <a href="tel:+15551234567" className="hover:text-white transition-colors">
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center">
              <MdLocationOn className="text-blue-400 mr-3 text-lg" />
              <span>123 Commerce St, City, State 12345</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10 pt-6 border-t border-gray-700 w-[100%] mx-auto">
        © 2024 Bazarly. All rights reserved.
      </div>
      </div>
    </footer>
  )
}

export default Footer
