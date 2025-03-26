import axios from 'axios'
import React, { useState } from 'react'
import { FaMotorcycle, FaTruck, FaTaxi } from 'react-icons/fa'
import { FaLocationCrosshairs } from 'react-icons/fa6'

const Prises = () => {
  const [selectedService, setSelectedService] = useState('Bike')
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropLocation, setDropLocation] = useState('')

  const services = [
    { name: 'Bike', icon: <FaMotorcycle />, fare: '₹26 - ₹31' },
    { name: 'Auto', icon: <FaTruck />, fare: '₹45 - ₹55' },
    { name: 'Cab Economy', icon: <FaTaxi />, fare: '₹90 - ₹110' },
    { name: 'Cab Premium', icon: <FaTaxi />, fare: '₹108 - ₹132' }
  ]

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

          try {
            const API_KEY = 'AIzaSyB5jk1PqvooOy0lab0OaNWzN8dYgdOuBOY' // Replace with your key
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    
            const response = await axios.get(url)
            console.log(response)

            if (response.data.results.length > 0) {
              const addressComponents =
                response.data.results[0].address_components
              const city =
                addressComponents.find(component =>
                  component.types.includes('locality')
                )?.long_name || 'Unknown Location'

              console.log('City:', city)
              setPickupLocation(city)
            } else {
              console.error('No city found for this location.')
            }
          } catch (err) {
            console.error('Error fetching city:', err.message)
          }
        },
        error => {
          console.error('Error fetching location:', error)
          alert('Unable to fetch location. Please enable GPS.')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div className='p-4 text-white shadow-[0px_0px_10px_lightblue] rounded-xl m-[20px_10px] md:m-[20px_40px] lg:m-[40px_100px]'>
      <h2 className='text-xl font-bold mb-2'>Select Pickup & Drop Location</h2>
      <div className='bg-[#ffffff45] rounded-[10px]'>
        <input
          type='text'
          placeholder='Pickup Location'
          className='w-full py-2 px-[20px] rounded-md focus:outline-none'
          value={pickupLocation}
          onChange={e => setPickupLocation(e.target.value)}
        />
        <hr className='mx-[20px] opacity-65' />
        <input
          type='text'
          placeholder='Drop Location'
          className='w-full py-2 px-[20px] rounded-md focus:outline-none'
          value={dropLocation}
          onChange={e => setDropLocation(e.target.value)}
        />
      </div>
      <div className='flex justify-end'>
        <button
          className='flex gap-2 items-center mt-2 px-4 py-[2px] bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300'
          onClick={getCurrentLocation}
        >
          <i>
            <FaLocationCrosshairs />
          </i>
          <span>Use current location</span>
        </button>
      </div>

      <h3 className='text-lg font-semibold mb-2'>Select Service</h3>
      <div className='space-y-2'>
        {services.map(service => (
          <div
            key={service.name}
            className={`flex items-center justify-between p-3 bg-slate-700 rounded-lg cursor-pointer ${
              selectedService === service.name ? 'border border-blue-400' : ''
            }`}
            onClick={() => setSelectedService(service.name)}
          >
            <div className='flex items-center space-x-2'>
              <span className='text-xl'>{service.icon}</span>
              <span className='font-medium'>{service.name}</span>
            </div>
            <span className='text-white'>{service.fare}</span>
          </div>
        ))}
      </div>

      <div className='mt-4 text-gray-400 text-center'>💵 Cash</div>
      <button className='w-full text-center mt-2 px-4 py-1 text-[20px] bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300'>
        Book now
      </button>
    </div>
  )
}

export default Prises
