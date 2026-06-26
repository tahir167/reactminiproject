import React from 'react'
import { FaBoxOpen, FaGlobe, FaStar, FaUsers } from 'react-icons/fa'
import { HiOutlineTruck } from 'react-icons/hi'
import { LuShield } from 'react-icons/lu'
import { MdOutlineWatchLater } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ClientAbout = () => {
  return (
   <div className="w-full">

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-800 to-fuchsia-600 flex flex-col justify-center items-center gap-6 py-16 px-4 text-center">
        <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">About Us</span>
        <h1 className="text-white font-bold text-3xl sm:text-5xl lg:text-6xl max-w-3xl">
          We're Building the Future of Online Shopping
        </h1>
        <p className="text-white text-base sm:text-xl max-w-2xl opacity-90">
          Bazarly was founded with one mission: make everyday shopping simple, affordable, and enjoyable for everyone.
        </p>
        <Link to="/products">
          <button className="mt-2 w-[160px] h-[45px] bg-white rounded-lg text-blue-800 font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Stats */}
      <section className="w-full bg-white py-12">
        <div className="w-[90%] lg:w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <FaUsers className="text-blue-600 text-4xl" />
            <h2 className="text-3xl font-bold text-gray-900">10K+</h2>
            <p className="text-gray-500 text-sm">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaBoxOpen className="text-fuchsia-500 text-4xl" />
            <h2 className="text-3xl font-bold text-gray-900">500+</h2>
            <p className="text-gray-500 text-sm">Products Available</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaStar className="text-yellow-400 text-4xl" />
            <h2 className="text-3xl font-bold text-gray-900">4.9</h2>
            <p className="text-gray-500 text-sm">Average Rating</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaGlobe className="text-green-500 text-4xl" />
            <h2 className="text-3xl font-bold text-gray-900">30+</h2>
            <p className="text-gray-500 text-sm">Cities Covered</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full bg-gray-100 py-16 px-4">
        <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Quality products, delivered to your door</h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              At Bazarly, we believe everyone deserves access to quality everyday products at fair prices. From beverages to hygiene essentials, we carefully select each item in our catalog to make sure it meets our standards.
            </p>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              We're not just a marketplace — we're a team of people who care about making your daily life easier, one order at a time.
            </p>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
              <HiOutlineTruck className="text-blue-500 text-4xl" />
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-gray-500 text-sm">Same-day and next-day delivery options available in most areas.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
              <LuShield className="text-blue-500 text-4xl" />
              <h3 className="font-bold text-lg">Secure Payments</h3>
              <p className="text-gray-500 text-sm">Your payment and personal data are always protected.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
              <MdOutlineWatchLater className="text-blue-500 text-4xl" />
              <h3 className="font-bold text-lg">24/7 Support</h3>
              <p className="text-gray-500 text-sm">Our team is always ready to help you, any time of day.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
              <FaStar className="text-yellow-400 text-4xl" />
              <h3 className="font-bold text-lg">Top Quality</h3>
              <p className="text-gray-500 text-sm">Every product is reviewed and approved before listing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full bg-white py-16 px-4">
        <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">The people behind Bazarly</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl">A small but passionate team dedicated to improving your shopping experience every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 w-full">
            {[
              { name: 'Alex Turner', role: 'Founder & CEO', img: 'https://cdn-icons-png.flaticon.com/256/219/219969.png' },
              { name: 'Sara Williams', role: 'Head of Products', img: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png' },
              { name: 'James Lee', role: 'Lead Developer', img: 'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_female_user-512.png' },
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-4 bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-blue-600 flex flex-col justify-center items-center gap-6 py-16 px-4 text-center">
        <h2 className="text-white font-bold text-3xl sm:text-4xl">Ready to shop with us?</h2>
        <p className="text-white text-base sm:text-lg max-w-xl opacity-90">Join thousands of happy customers and experience the Bazarly difference today.</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button className="w-[160px] h-[45px] bg-white rounded-lg text-blue-800 font-semibold hover:bg-gray-100 transition">
            <Link to="/products">Browse Products</Link>
          </button>
          <button className="w-[160px] h-[45px] border border-white rounded-lg text-white hover:bg-blue-700 transition">
            <Link to="/contact" className="text-white">Contact Us</Link>
          </button>
        </div>
      </section>

    </div>
  )
}

export default ClientAbout
