import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/Supabase';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const [tickets,setTickets] = useState([]);
  const [error,setError] = useState();
  const navigate = useNavigate();
  const getTickets = async ()=>{
    
    const {data , error} = await supabase
    .from("tickets")
    .select("*");

    if (error) {
        console.error('Error fetching tickets:', error)
      } else {
        setTickets(data)  
      }
  }
const statusColor = {
  "pending": "bg-yellow-600",
  "approved": "bg-green-600",
  "rejected": "bg-red-600"
};

  useEffect(()=>{
    getTickets()
  },[])
  return ( 
    <div className='w-full h-screen'>
      <div className="flex justify-between top p-10 font-semibold text-2xl">
        <div>
          Tickets
        </div>
        <div className="bacck">
          <button className='bg-[#22324c] px-3 py-1 rounded text-white cursor-pointer' onClick={()=>navigate("/")}>Back</button>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='flex w-full flex-col'>
          <div className='flex mb-4'>
            <div className='w-1/3'>Type</div>
            <div className='w-1/3'>Amount</div>
            <div className='w-1/3'>Status</div>
          </div>
        {tickets.length>0 && tickets.map((ticket,index) => (
          <div key={ticket.id} className={`w-full flex justify-around ${index%2 == 0 && "bg-[#22324c]"} p-3 rounded`}>
            <div className='w-1/3'>
              {ticket.type} 
            </div>
            <div className='w-1/3'>
              {ticket.amount}
            </div>
            <div className={` w-1/3 font-bold flex justify-center`}>
              <div className={`${statusColor[ticket.ticket_status] || "bg-gray-500"} px-2 py-1 w-1/2 rounded text-white`}>
                {ticket.ticket_status}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Tickets