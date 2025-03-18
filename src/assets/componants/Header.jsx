import React, { useEffect } from 'react'
import logo from '../images/new.png'
import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import { BsMenuButtonFill } from 'react-icons/bs'

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 500, easing: 'ease-in-out', once: true })
  }, [])

  return (
    <>
      <header
        data-aos='fade-down'
        className='rounded-[8px] text-white flex justify-between p-[10px_20px] items-center'
      >
        <figure className='rounded-[10px] border'>
          <img width={"100px"} className='rounded-[10px]' src={logo} alt='' />
        </figure>
        <div>
          <i className='block md:hidden text-white text-[25px]'>
            <BsMenuButtonFill />
          </i>
          <nav className='hidden md:block'>
            <ul className='p-[15px] flex gap-[40px] text-[18px] border-b-[1px] border-slate-400 rounded-[20px]'>
              <li className='cursor-pointer'>Contact Us</li>
              <li className='cursor-pointer'>Your Smile</li>
              <li className='cursor-pointer'>Blog</li>
              <li className='cursor-pointer'>Safety</li>
              <li className='cursor-pointer'>Store</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
