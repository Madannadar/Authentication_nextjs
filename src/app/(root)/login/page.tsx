'use client';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'; // suggestion is wrong not next/router
import axios from 'axios';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    // username: '',
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false);

  const onLoginIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('login success', response.data);
      toast.success('login success')
      router.push('/profile')

    } catch (error: any) {
      console.log('Login failed', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length === 0 || user.password.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>
        {loading ? "Loading" : "Login"}
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
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor="password">password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        onClick={onLoginIn}
        disabled={buttonDisabled} // ✅ Disable button when inputs are empty
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link href={'/signup'}>Visit SignUp</Link>
    </div>
  )
}

export default page
