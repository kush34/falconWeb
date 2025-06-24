import React, { useState } from 'react'
import { supabase } from '../lib/Supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
      setError('')
      if (!email || !password) {
        setError('Please fill all the fields')
        return
      }

      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setLoading(false)

      if (error) {
        setError(error.message)
      } else {
        // Optional: Redirect or show a toast
        // console.log('Login success:', data)
        // navigate("/")
        setTimeout(() => navigate('/'), 500)

      }
    }
    if(loading){
      return <div> Loading.. </div>
    }
  return (
    <div className='w-full h-screen flex justify-center items-center gap-10'>
      <div className="left flex justify-center items-center flex-col gap-2 w-1/2 h-screen">
        <div className='font-bold text-3xl '>
          Log In
        </div>
        <div className='font-medim text-sm text-zinc-500'>
          Falcon Trading Admin
        </div>

      </div>
      <div className="right flex justify-center items-center flex-col w-1/2 h-screen">
        <div className="head text-3xl font-medium">
          Enter your Credentials
        </div>
        <div className="form flex flex-col gap-5 mt-5">
          <input className='bg-[#212a37] rounded px-2 py-1 outline-none' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your username' type="text" name="" id="" />
          <input className='bg-[#212a37] rounded px-2 py-1 outline-none'  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password' type="password" name="" id="" />
          {error && 
            <div className='text-red-300'>
              {error}
            </div>
          }
          <button onClick={handleSubmit} className='bg-[#4ADE80] rounded px-2 py-1 font-medium hover:bg-[#64b688] cursor-pointer'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login