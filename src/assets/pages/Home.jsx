import React, { useEffect, useRef, useState } from 'react'
import { IoIosFlash } from 'react-icons/io'
import { MdAddLocation, MdHeight, MdOutlinePinDrop } from 'react-icons/md'
import img from '../images/new.png'

import Aos from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const inputRef = useRef(null)
  const [pickup, setPickup] = useState('')
  const [drop, setDrop] = useState('')
  const [suggestions, setSuggestions] = useState([])
  // const token = 'pk.6d16e37f4e7c843845e1a6faae12ddac'  // this is Locationiq autocomplete places suggestion api
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })
  const [bottombar, setbottombar] = useState()

  // Initialize AOS on component mount
  useEffect(() => {
    Aos.init({ duration: 500, once: false })
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

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded.')
      return
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['geocode'], // Change to ["(cities)"] for city suggestions
        componentRestrictions: { country: 'IN' } // Restrict to a specific country (optional)
      }
    )

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry) {
        console.error('No details available for this location.')
        return
      }

      setAddress(place.formatted_address)
      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })

      console.log('Selected Place:', place)
      console.log('Latitude:', place.geometry.location.lat())
      console.log('Longitude:', place.geometry.location.lng())
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollTop / scrollHeight) * 100
      setbottombar(scrollPercentage)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <section className=' sm:p-[20px] md:p-[30px] lg:p-[50px] text-white overflow-hidden'>
        <div
          data-aos='fade-left'
          className='p-[20px_40px] rounded-[8px] text-center text-[20px] sm:text-[30px] md:text-[30px] font-semibold'
        >
          Ride <span className='text-orange-300 overline'>Fast</span>, Ride
          Smart{' '}
          <i className='inline-block text-amber-400'>
            <IoIosFlash />
          </i>
        </div>

        <div className='flex flex-col lg:flex-row justify-center  p-[10px_20px] gap-[20px]'>
          {/* Ride Booking Form */}

          <form
            className='flex flex-col  w-[100%] border-[1px] border-[#FFB86A] py-[20px] rounded-[20px] bg-slate-700'
            data-aos='fade-right'
          >
            {/* Pickup Location */}
            <div
              data-aos=''
              className='focus:shadow-md w-[90%] flex items-center gap-[10px] border border-slate-400 px-[15px] rounded-[8px] text-[20px] m-auto'
            >
              <i className='px-[10px]' onClick={getCurrentLocation}>
                <MdAddLocation className='cursor-pointer' />
              </i>
              <input
                ref={inputRef}
                type='text'
                id='location'
                className='w-full py-[4px] focus:outline-none'
                placeholder='Pickup Location'
              />
              {address && (
                <div className='mt-2 text-sm border bg-amber-400'>
                  <p>
                    <strong>Selected Address:</strong> {address}
                  </p>
                  <p>
                    <strong>Latitude:</strong> {coordinates.lat}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {coordinates.lng}
                  </p>
                </div>
              )}
            </div>

            <ul
              style={{
                display: `${suggestions.length == 0 ? 'none' : 'block'}`
              }}
              className='bg-white text-black border-[1px] border-slate-400 w-[90%] m-auto mt-[10px] h-[200px] overflow-auto p-[10px] rounded-[10px]'
            >
              {suggestions.length > 0 &&
                suggestions.map((value, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(value.display_name)
                      setSuggestions([]) // Hide suggestions after selection
                    }}
                  >
                    {value.display_name}
                  </li>
                ))}
            </ul>

            {/* Drop Location */}
            <div className='my-[20px] focus:shadow-md w-[90%] flex items-center gap-[10px] border border-slate-400 px-[15px] rounded-[8px] text-[20px] m-auto'>
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
            <button className='cursor-pointer font-semibold hover:shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 text-[20px] block m-auto w-[90%] sm:w-[70%] py-[10px] rounded-[8px] md:w-[60%] lg:w-[40%] transition duration-300'>
            <Link to={"rent"}>Book Now</Link>

            </button>

          
          </form>

          {/* Extra Info Section */}
          <div
            className='border-[1px] border-[#FFB86A] w-[100%] p-[20px]  py-[20px] rounded-[20px] bg-slate-700'
            data-aos='fade-left'
          >
            <div className='text-[20px] font-semibold text-center'>
              Our <span className='text-orange-300 overline'>Service</span>
            </div>
            <div
              className='grid grid-cols-2 sm:grid-cols-3 gap-y-[20px] mt-[20px] gap-x-[20px]'
              data-aos='fade-right'
            >
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'>
                <img width={'100%'} src={img} alt='' />
              </div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-left'
              >
                <img width={'100%'} src={img} alt='' />
              </div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-right'
              ></div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-left'
              ></div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-right'
              ></div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-left'
              ></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row sm:p-[30px_100px] justify-evenly items-center mt-[30px] p-[30px_20px] gap-[30px] sm:gap-[50px] md:gap-[70px] lg:gap-[100px]'>
          <div className='grid grid-cols-2  gap-[20px]'>
            <div className='flex flex-col gap-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>

            <div className='flex flex-col gap-[30px] mt-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>
          </div>
          <div className=' space-y-[20px] md:space-y-[30px] lg:space-y-[40px]'>
            <div
              className='text-[25px] sm:text-[32px] md:text-[40px]'
              data-aos='fade-right'
            >
              Zoodrop – <span className='text-orange-300 overline'>Fast</span>{' '}
              Rides, Fair Prices
            </div>
            <p className='text-[18px] tracking-tight' data-aos='fade-left'>
              Zoodrop – The fastest way to ride, the smartest way to save! 🚀💨
              Get anywhere, anytime, at prices that make sense
            </p>
            <button className='border border-slate-500 p-[6px_20px] bg-[#5B5EB6] rounded-[10px] hover:bg-[#FFB86A]  text-[20px]'>
            Book Now
            </button>
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row-reverse sm:p-[30px_100px] justify-evenly items-center mt-[30px] p-[30px_20px] gap-[30px] sm:gap-[50px] md:gap-[70px] lg:gap-[100px]'>
          <div className='grid grid-cols-2  gap-[20px]'>
            <div className='flex flex-col gap-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>

            <div className='flex flex-col gap-[30px] mt-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>
          </div>
          <div className=' space-y-[20px] md:space-y-[30px] lg:space-y-[40px]'>
            <div
              className='text-[25px] sm:text-[32px] md:text-[40px]'
              data-aos='fade-right'
            >
              Zoodrop – <span className='text-orange-300 overline'>Fast</span>{' '}
              Rides, Fair Prices
            </div>
            <p className='text-[18px] tracking-tight' data-aos='fade-left'>
              Zoodrop – The fastest way to ride, the smartest way to save! 🚀💨
              Get anywhere, anytime, at prices that make sense
            </p>
            <button className='border border-slate-500 p-[6px_20px] bg-[#5B5EB6] rounded-[10px] hover:bg-[#FFB86A]  text-[20px]'>
              Earning
            </button>
          </div>
        </div>
      </section>
      <div
        style={{ width: `${bottombar}%` }}
        className='fixed bottom-0 left-0 bg-[#FFB86A] h-[5px] transition-all duration-150'
      ></div>
    </>
  )
}

export default Home
