
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/features/userSlice';
import { FaRegHeart } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const favoritesCount = useSelector((state) => state.favorites.count);
  const basketTotalCount = useSelector((state) => state.basket.totalCount);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className='flex items-center h-[9vh] bg-white shadow relative'>
      <div className='w-[80%] flex justify-between items-center mx-auto'>
        <h1 className='text-blue-700 font-bold text-3xl'>Bazarly</h1>
        <ul className='flex gap-5'>
          <li><Link to="/home" className='text-base'>Home</Link></li>
          <li><Link to="/about" className='text-base'>About</Link></li>
          <li><Link to="/contact" className='text-base'>Contact</Link></li>
          <li><Link to="/products" className='text-base'>Products</Link></li>
          <li><Link to="/adminlogin" className='text-base'>Admin Panel</Link></li>
        </ul>

        <div className='flex gap-3'>
          {user ? (
            <div className='relative flex items-center gap-6'>
              <div className="relative cursor-pointer">
                <Link to="/basket">
                  <SlBasket className="text-xl" />
                  {basketTotalCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      {basketTotalCount > 99 ? '99+' : basketTotalCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="relative cursor-pointer">
                <Link to="/favorites">
                  <FaRegHeart className="text-xl" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      {favoritesCount > 99 ? '99+' : favoritesCount}
                    </span>
                  )}
                </Link>
              </div>

              <div
                onClick={toggleDropdown}
                className='w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-300'
              >
                <img
                  src={user?.profileImg || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {dropdownOpen && (
                <div className='absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50'>
                  <div className='py-1'>
                    <div className='px-4 py-2 border-b border-gray-100'>
                      <p className='text-sm font-medium text-gray-900'>
                        {user?.fullName || 'User'}
                      </p>
                      <p className='text-xs text-gray-500'>{user?.email || 'No email'}</p>
                      {user?.id && (
                        <p className='text-xs text-gray-400'>ID: {user.id}</p>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/favorites"
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between'
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>Favorites</span>
                      {favoritesCount > 0 && (
                        <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {favoritesCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/basket"
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between'
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>Basket</span>
                      {basketTotalCount > 0 && (
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {basketTotalCount}
                        </span>
                      )}
                    </Link>
                    <hr className='my-1' />
                    <button
                      onClick={handleLogout}
                      className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className='w-[80px] h-[40px] bg-white flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50'>
                <Link to="/login">Login</Link>
              </button>
              <button className='w-[80px] h-[40px] bg-black flex items-center justify-center rounded hover:bg-gray-800'>
                <Link to="/register" className='text-white'>Register</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;