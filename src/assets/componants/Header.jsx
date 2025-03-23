import React, { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import { BsMenuButtonFill } from 'react-icons/bs'
import logo from '../images/logo.png'

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: false })
  }, [])

  return (
    <>
      <header
        
        className='rounded-[8px] text-white flex justify-between p-[10px_20px] items-center border'
      >
       
          <figure className='w-[80px]' data-aos='fade-right'>
            <img src={logo} className='w-full' alt='' />
          </figure>

          <div className='' data-aos='fade-down'>
            <i className='block md:hidden text-white text-[25px]'>
              <BsMenuButtonFill />
            </i>
            <nav className='hidden md:block'>
              <ul className='p-[10px_15px] flex gap-[40px] text-[15px] border-[1px] border-slate-400 rounded-[10px]'>
                <li className='cursor-pointer'>
                  Contact Us
                </li>
                <li className='cursor-pointer'>
                  Your Smile
                </li>
                <li className='cursor-pointer'>
                  Blog
                </li>
                <li className='cursor-pointer'>
                  Safety
                </li>
                <li className='cursor-pointer'>
                  Store
                </li>
              </ul>
            </nav>
          </div>
          <div>
          <button className='cursor-pointer hover:bg-[#FFB86A] bg-[#23F39C] text-[15px] p-[4px_15px] rounded-[8px]' data-aos='fade-left'>
              Sing Up
            </button>
          </div>
    
      </header>
    </>
  )
}

export default Header
