import React from 'react'
import { FaStar } from "react-icons/fa";
const HomeRewies = () => {
  return (
   <section className='bg-gray-100 h-[70vh] flex flex-col items-center gap-15'>
          <div className='flex flex-col gap-3 items-center mt-12'>
           <h1 className='font-bold text-black text-4xl'>What Our Customers Say</h1>
           <p className='text-xl text-gray-500'>Don't just take our word for it - hear from our satisfied customers.</p>
           </div>
           <div className="grid grid-cols-3 gap-7 w-[80%] mx-auto ">
     <div className='flex flex-col w-[100%] h-[35vh] shadow bg-white rounded-xl justify-center '>
<div className='w-[80%] flex flex-col mx-auto gap-5 '>
<div className='flex'><FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /></div>
<p className='text-gray-500'>"Bazarly has made my grocery shopping so much easier. Fast delivery and great quality products!"</p>
<div className='flex gap-3'>
<div className="w-12 h-12 rounded-full overflow-hidden">
  <img
    src="https://cdn-icons-png.flaticon.com/256/219/219969.png"
    alt=""
    className="w-full h-full object-cover"
  />
</div>
<div>
<h1 className='text-lg font-bold'>Sarah Johnson</h1>
<p>Verified Customer</p>
</div>
</div>
</div>

     </div>   <div className='flex flex-col w-[100%] h-[35vh] shadow bg-white rounded-xl justify-center '>
<div className='w-[80%] flex flex-col mx-auto gap-5 '>
<div className='flex'><FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /></div>
<p className='text-gray-500'>"Amazing customer service and the website is so easy to use. Highly recommend!"</p>
<div className='flex gap-3'>
<div className="w-12 h-12 rounded-full overflow-hidden">
  <img
    src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png"
    alt=""
    className="w-full h-full object-cover"
  />
</div>
<div>
<h1 className='text-lg font-bold'>Mike Chen</h1>
<p>Verified Customer</p>
</div>
</div>
</div>

     </div>   <div className='flex flex-col w-[100%] h-[35vh] shadow bg-white rounded-xl justify-center '>
<div className='w-[80%] flex flex-col mx-auto gap-5 '>
<div className='flex'><FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /> <FaStar className="text-yellow-400 text-xl" /></div>
<p className='text-gray-500'>"Great prices and excellent product quality. Bazarly is now my go-to online store."</p>
<div className='flex gap-3'>
<div className="w-12 h-12 rounded-full overflow-hidden">
  <img
    src="https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_female_user-512.png"
    alt=""
    className="w-full h-full object-cover"
  />
</div>
<div>
<h1 className='text-lg font-bold'>Emily Davis</h1>
<p>Verified Customer
</p>
</div>
</div>
</div>

     </div>
   </div>
       </section>
  )
}

export default HomeRewies
