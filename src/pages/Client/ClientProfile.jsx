import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector } from 'react-redux';

const ClientProfile = () => {
      const user = useSelector((state) => state.user.user)
  return (
    <div className="grid grid-cols-2 gap-7 w-[80%] mx-auto mt-7 ">
      <div className='w-[45%] h-[300px] border border-gray-400 rounded-lg'>
        <div className='w-[90%] mx-auto my-5 '>
        <div className=' flex flex-col items-center gap-1 '> <img className='w-[90px] h-[90px] rounded-full border' src={user.profileImg} alt="" /> <h1 className='text-xl font-bold'>{user.fullName}</h1> <p className='text-lg text-gray-600'>{user.email}  </p> </div> <div className='flex justify-between mt-2 '>
    <div className='flex flex-col gap-1'>
    <p className='text-gray-600'>Member Since:</p> <p className='text-gray-600'>Balance</p> <p className='text-gray-600'>Total orders:</p>
    </div>
    <div className='flex flex-col gap-1 justify-end'> <p>{new Date(user.registeredAt).getFullYear()}</p> <p className='text-green-500'>${user.balance}</p> <p>1</p>
    </div>
</div>
      </div>
           </div>
    </div>
  )
}

export default ClientProfile