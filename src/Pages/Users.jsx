import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/Supabase';

const Users = () => {
    const [users,setUsers] = useState([]);
  const [error,setError] = useState();
  const navigate = useNavigate();
  const getUsers = async ()=>{
    
    const {data , error} = await supabase
    .from("profiles")
    .select("*");

    if (error) {
        console.error('Error fetching tickets:', error)
      } else {
        setUsers(data)  
      }
  }
  useEffect(()=>{
    getUsers();
  },[])
  return (
    <div className='w-full'>
      <div className="top p-10 font-semibold text-2xl flex justify-between">
        <div>
          Users
        </div>
        <div className=''>
          <button onClick={()=>navigate("/")} className='bg-[#22324c] px-3 py-1 rounded text-white cursor-pointer'>
            Back
          </button>
        </div>
      </div>
      <div className='w-full'>
            <div className={`mb-4 flex justify-between px-3 py-1 `}>
              <div className='w-1/4'>
                account_number
              </div>
              <div className='w-1/4'>
                username
              </div>
              <div className='w-1/4'>
                Balance
              </div>
              <div className='w-1/4'>
                Role
              </div>
            </div>
        {users && users.map((user,index)=>{
          return(
            <div className={`flex justify-between p-3 ${index%2 == 0 && "bg-[#22324c]"} `}>
              <div className='w-1/4'>
                {user?.account_number}
              </div>
              <div className='w-1/4'>
                {user?.username || "null"}
              </div>
              <div className='w-1/4'>
                {user?.balance}
              </div>
              <div className='w-1/4'>
                {user?.role ? "admin" : "user"}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users