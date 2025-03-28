'use client';
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation'; // suggestion is wrong not next/router
import { Axios } from 'axios';

const page = () => {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        // username: '',
    })
    const onLoginIn = async () => {

    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>
        Login
      </h1>
      <hr />
      {/* <label htmlFor="username">Username</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      type="text" 
      id="username"
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder='username'
      /> */}

      <label htmlFor="email">Email</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      type="text" 
      id="email"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      />
      <label htmlFor="password">password</label>
      <input 
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      type="text" 
      id="password"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      />
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' 
      onClick={onLoginIn}>
        Login here
      </button>
      <Link href={'/signup'}>Visit SignUp</Link>
    </div>
  )
}

export default page
