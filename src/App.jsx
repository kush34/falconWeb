import { useEffect, useState } from 'react'
import './App.css'
import { useUser } from './context/UserContext'
import { useNavigate } from 'react-router-dom';
import {Tag} from 'lucide-react'
import {User} from 'lucide-react'
import { ChartCandlestick } from 'lucide-react';
import { Layers } from 'lucide-react';

function App() {
  const navigate = useNavigate();
const { user, loading, signOut } = useUser()

useEffect(() => {
  if (!loading && !user) {
    navigate("/login")
  }
}, [user, loading])
  if (loading) return <div>Loading...</div>

  return (
    <div className='flex flex-col w-full h-screen'>
    <div className="topbar flex justify-around p-5">
      <div className='text-3xl font-bold'>
        Admin Panel
      </div>
      <div className="logout bg-red-500 rounded p-2 text-white font-semibold hover:bg-red-600">
        <button className='cursor-pointer' onClick={()=>signOut()}>
          Logout
        </button>
      </div>
    </div>
    <div className="options flex gap-5 justify-center items-center m-5">
            <div className='text-xl bg-[#22324c] w-1/4 h-12 justify-center items-center font-medium flex gap-2 cursor-pointer' onClick={()=>navigate("/tickets")}>
              <div className="icon">
                <Tag size={20}/>
              </div>
              <div>
                  Tickets
              </div>
            </div>
            <div className='text-xl bg-[#22324c] rounded w-1/4 h-12 justify-center font-medium flex items-center gap-2 cursor-pointer' onClick={()=>navigate("/users")}>
              <div className="icon">
                <User/>
              </div>
              <div>
                  Users
              </div>
            </div>
            <div className='text-xl bg-[#22324c] rounded w-1/4 h-12 justify-center font-medium flex items-center gap-2 cursor-pointer' onClick={()=>navigate("/trade")}>
              <div className="icon">
                <ChartCandlestick />
              </div>
              <div>
                  Trade
              </div>
            </div>
            <div className='text-xl bg-[#22324c] rounded w-1/4 h-12 justify-center font-medium flex items-center gap-2 cursor-pointer' onClick={()=>navigate("/assests")}>
              <div className="icon">
                 <Layers />
              </div>
              <div>
                  Assests
              </div>
            </div>
    </div>
    </div>
  )
}

export default App
