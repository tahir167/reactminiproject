import React from 'react'
import { FaFacebookF, FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa'
import { MdAccessTime, MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

const ClientContact = () => {
  return (
    <div className="w-full">

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-800 to-fuchsia-600 flex flex-col justify-center items-center gap-6 py-16 px-4 text-center">
        <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Contact Us</span>
        <h1 className="text-white font-bold text-3xl sm:text-5xl lg:text-6xl max-w-3xl">
          We'd Love to Hear From You
        </h1>
        <p className="text-white text-base sm:text-xl max-w-2xl opacity-90">
          Have a question, suggestion, or just want to say hello? Our team is always here for you.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full bg-white py-16 px-4">
        <div className="w-[90%] lg:w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="flex flex-col items-center gap-4 bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <MdEmail className="text-blue-600 text-3xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Email Us</h3>
            <p className="text-gray-500 text-sm">We reply within 24 hours</p>
            <a href="mailto:info@bazarly.com" className="text-blue-600 font-medium hover:underline text-sm">
              info@bazarly.com
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-fuchsia-100 flex items-center justify-center">
              <MdPhone className="text-fuchsia-600 text-3xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Call Us</h3>
            <p className="text-gray-500 text-sm">Mon–Fri, 9am to 6pm</p>
            <a href="tel:+15551234567" className="text-fuchsia-600 font-medium hover:underline text-sm">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <MdLocationOn className="text-green-600 text-3xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Visit Us</h3>
            <p className="text-gray-500 text-sm">Come say hello in person</p>
            <span className="text-green-600 font-medium text-sm">
              123 Commerce St, City, State 12345
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <MdAccessTime className="text-orange-500 text-3xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Working Hours</h3>
            <p className="text-gray-500 text-sm">We're available</p>
            <span className="text-orange-500 font-medium text-sm">Mon–Sun: 9:00 – 21:00</span>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-gray-100 py-16 px-4">
        <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl">Quick answers to the questions we hear most often.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[
              { q: 'How long does delivery take?', a: 'Most orders are delivered within 1–3 business days depending on your location.' },
              { q: 'Can I return a product?', a: 'Yes, we accept returns within 14 days of delivery. The item must be unused and in its original packaging.' },
              { q: 'How do I track my order?', a: 'After your order ships, you will receive a tracking link via email to follow your package in real time.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and popular digital wallets.' },
              { q: 'Is my personal data safe?', a: 'Absolutely. We use industry-standard encryption to keep your data and payments secure at all times.' },
              { q: 'Do you offer discounts?', a: 'Yes! Subscribe to our newsletter or follow us on social media to be the first to know about deals and promotions.' },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">{item.q}</h3>
                <p className="text-gray-500 text-sm sm:text-base">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="w-full bg-white py-16 px-4">
        <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col items-center gap-8 text-center">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Follow Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Stay Connected</h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">Follow Bazarly on social media for the latest products, deals, and updates.</p>
          <div className="flex gap-5">
            <a href="https://www.facebook.com/" className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition">
              <FaFacebookF className="text-lg" />
            </a>
            <a href="https://x.com/" className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition">
              <FaTwitter className="text-lg" />
            </a>
            <a href="https://www.instagram.com/" className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-500 to-orange-400 flex items-center justify-center text-white hover:opacity-90 transition">
              <FaInstagram className="text-lg" />
            </a>
            <a href="https://web.telegram.org/k/" className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition">
              <FaTelegram className="text-lg" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-blue-600 flex flex-col justify-center items-center gap-6 py-16 px-4 text-center">
        <h2 className="text-white font-bold text-3xl sm:text-4xl">Still have questions?</h2>
        <p className="text-white text-base sm:text-lg max-w-xl opacity-90">Our support team is just one message away. Don't hesitate to reach out anytime.</p>
        <a href="mailto:info@bazarly.com">
          <button className="w-[180px] h-[45px] bg-white rounded-lg text-blue-800 font-semibold hover:bg-gray-100 transition">
            Send us an Email
          </button>
        </a>
      </section>

    </div>
  )
}

export default ClientContact
