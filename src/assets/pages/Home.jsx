import React, { useEffect, useState } from 'react'
import Header from '../componants/Header'
import { IoIosFlash } from 'react-icons/io'
import { MdAddLocation, MdOutlinePinDrop } from 'react-icons/md'
import biketaxi from '../images/biketaxi.Webp'
import img from '../images/logo.Webp'

import Aos from 'aos'
import 'aos/dist/aos.css' // Import AOS styles

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [drop, setDrop] = useState('')
 
  

  // Initialize AOS on component mount
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  // Function to get the current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          setPickup(`Lat: ${latitude}, Long: ${longitude}`)
        },
        error => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  return (
    <>
      <section className=' sm:p-[20px] md:p-[30px] lg:p-[50px] text-white'>
        <Header />
        <div
          data-aos='fade-left'
          className='p-[20px_40px] rounded-[8px] text-center text-[20px] sm:text-[30px] md:text-[40px] font-semibold'
        >
          Ride <span className='text-orange-300 overline'>Fast</span>, Ride
          Smart{' '}
          <i className='inline-block text-amber-400'>
            <IoIosFlash />
          </i>
        </div>

        <div className='flex flex-col lg:flex-row justify-center  p-[10px_20px] gap-[20px]'>
          {/* Ride Booking Form */}
              
          <form className='flex flex-col  w-[100%] border-[1px] border-[#FFB86A] py-[20px] rounded-[20px] bg-slate-700' data-aos='fade-right' >
            {/* Pickup Location */}
            <div
              data-aos=''
              className='focus:shadow-md w-[90%] flex items-center gap-[10px] border border-slate-400 px-[15px] rounded-[8px] text-[20px] m-auto'
            >
              <i className='px-[10px]' onClick={getCurrentLocation}>
                <MdAddLocation className='cursor-pointer' />
              </i>
              <input
                type='text'
                className='w-full py-[4px] focus:outline-none'
                placeholder='Pickup Location'
                value={pickup}
                onChange={e => setPickup(e.target.value)}
              />
            </div>

            {/* Drop Location */}
            <div
              className='my-[20px] focus:shadow-md w-[90%] flex items-center gap-[10px] border border-slate-400 px-[15px] rounded-[8px] text-[20px] m-auto'
            >
              <i className='px-[10px]'>
                <MdOutlinePinDrop />
              </i>
              <input
                type='text'
                className='w-full py-[4px] focus:outline-none'
                placeholder='Drop Location'
                value={drop}
                onChange={e => setDrop(e.target.value)}
              />
            </div>

            {/* Book Now Button */}
            <button
              className='cursor-pointer hover:bg-[#FFB86A] bg-[#5B5EB6] text-[20px] block m-auto w-[90%] sm:w-[70%] py-[10px] rounded-[8px] md:w-[60%] lg:w-[40%]'
            >
              Book Now
            </button>
          </form>

          {/* Extra Info Section */}
          <div className='border-[1px] border-[#FFB86A] w-[100%] p-[20px]  py-[20px] rounded-[20px] bg-slate-700' data-aos='fade-left'>
            <div className='text-[20px] font-semibold text-center'>
              Our <span className='text-orange-300 overline'>Service</span>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-[20px] mt-[20px] gap-x-[50px]'>
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'><img width={"100%"} src={biketaxi} alt="" /></div>
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'><img width={"100%"} src={biketaxi} alt="" /></div>
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'></div>
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'></div>
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'></div>
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'></div>
            </div>
         
          </div>
        </div>

        <div className='flex flex-col-reverse items-center mt-[30px] p-[30px_10px] gap-[60px]'>
          <div className='grid grid-cols-2  border-[2px] border-red-500 gap-[20px]'>
            <div className='flex flex-col gap-[30px]'>
            <div className='border rounded-[15px] w-[160px] overflow-hidden'><img src={img} width={"100%"} alt="" /></div>
            <div className='border rounded-[15px] w-[160px] overflow-hidden'><img src={img} width={"100%"} alt="" /></div>
            </div>

            <div className='flex flex-col gap-[30px] mt-[30px]'>
            <div className='border rounded-[15px] w-[160px] overflow-hidden'><img src={img} width={"100%"} alt="" /></div>
            <div className='border rounded-[15px] w-[160px] overflow-hidden'><img src={img} width={"100%"} alt="" /></div>
            </div>
          </div>
          <div className='border'>
            <div className='text-[50px]'>
            Zoodrop – Fast Rides, Fair Prices
            </div>
          </div>
         
        </div>
      </section>
    </>
  )
}

export default Home
