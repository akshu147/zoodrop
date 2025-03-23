import React, { useState } from 'react'
import Header from '../componants/Header'
import signupimg from '../images/signup.webp'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Login = () => {
  const [ifsignup, setifsignup] = useState(true)
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(null)

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = e => {
    const inputPassword = e.target.value
    setPassword(inputPassword)
    setIsValid(passwordRegex.test(inputPassword)) // Check if it matches the regex
  }
  return (
    <>
      <div className='text-white grid grid-cols-1 md:grid-cols-2 shadow-[2px_3px_10px_white] rounded-[30px] mx-[10px] my-[50px] overflow-hidden'>
        <form action='' className='p-[20px] flex flex-col gap-[10px]'>
          <div className='grid grid-cols-2 gap-[20px]'>
            <button className='rounded-[8px] border cursor-pointer border-slate-400 flex items-center gap-[20px] p-[8px_10px]'>
              <i className='text-[20px]'>
                <FcGoogle />
              </i>{' '}
              <span>Sign up with google</span>
            </button>
            <button className='rounded-[8px] border cursor-pointer border-slate-400 flex items-center gap-[20px] p-[8px_10px]'>
              <i className='text-white text-[20px]'>
                <FaApple />
              </i>
              <span>Sign up with apple</span>
            </button>
          </div>

          {ifsignup == true ? (
            <div className=''>
              <fieldset className='border border-slate-400 rounded-[10px]'>
                <legend className='ms-[20px]'>Email</legend>
                <input
                  type='text'
                  placeholder='User Email'
                  className='border-gray-300 focus:outline-none w-full p-[4px_10px] rounded-[8px]'
                />
              </fieldset>

              <div>
                <fieldset className='border border-slate-400 rounded-[10px]'>
                  <legend className='ms-[20px]'>Password</legend>
                  <input
                    type='text'
                    placeholder='User password'
                    className='border-gray-300 focus:outline-none w-full p-[4px_10px] rounded-[8px]'
                  />
                </fieldset>
                <div className='text-end text-[15px] text-blue-500 font-semibold'>
                  <Link>Forget password</Link>
                </div>
              </div>
              <div>
                <button className='w-full mt-3 rounded-[8px] border cursor-pointer border-slate-400 p-[10px_20px]'>
                  Login
                </button>
                <div className='text-end text-[15px] text-blue-500 font-semibold'>
                  <small
                    onClick={() => {
                      setifsignup(false)
                    }}
                  >
                    New user ?
                  </small>
                </div>
              </div>
            </div>
          ) : (
            <div className=''>
              <fieldset className='border border-slate-400 rounded-[10px]'>
                <legend className='ms-[20px]'>Name</legend>
                <input
                  type='text'
                  placeholder='Name'
                  className='border-gray-300 focus:outline-none w-full p-[4px_10px] rounded-[8px]'
                />
              </fieldset>
              <fieldset className='border border-slate-400 rounded-[10px]'>
                <legend className='ms-[20px]'>Email</legend>
                <input
                  type='text'
                  placeholder='User Email'
                  className='border-gray-300 focus:outline-none w-full p-[4px_10px] rounded-[8px]'
                />
              </fieldset>
              <fieldset className='border border-slate-400 rounded-[10px]'>
                <legend className='ms-[20px]'>
                  {isValid === null ? null : isValid ? (
                    <p className='text-green-500  text-end'>
                      Password is strong
                    </p>
                  ) : (
                    <p className='text-red-500 text-end'>
                      Password must be 8+ chars with a number and special charector
                    </p>
                  )}
                </legend>
                <input
                  type='text'
                  placeholder='User password'
                  value={password}
                  onChange={validatePassword}
                  className='border-gray-300 focus:outline-none w-full p-[4px_10px] rounded-[8px]'
                />
              </fieldset>
              <div>
                <button className='w-full mt-3 rounded-[8px] border cursor-pointer border-slate-400 p-[10px_20px]'>
                  Sign Up
                </button>
                <div className='text-end text-[15px] text-blue-500 font-semibold'>
                  <small
                    onClick={() => {
                      setifsignup(true)
                    }}
                  >
                    Already have a account ?
                  </small>
                </div>
              </div>
            </div>
          )}
        </form>
        <div className=''>
          <img width='100%' src={signupimg} alt='Signup Illustration' />
        </div>
      </div>
    </>
  )
}

export default Login
