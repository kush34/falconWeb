import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/Supabase';
import { useNavigate } from 'react-router-dom';
import PopUp from '../components/PopUp';

const Tickets = () => {
  const [tickets,setTickets] = useState([]);
  const [editableTickets,setEditableTickets] = useState([]);
  const [error,setError] = useState();
  const [selectedTicket,setSelectedTicket] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [editFlag,setEditFlag] = useState(false);
  const navigate = useNavigate();
  const getTickets = async ()=>{
    
    const {data , error} = await supabase
    .from("tickets")
    .select(`
      type,
      amount,
      ticket_status,
      transaction_id,
      account_number,
      account_name,
      ifsc_code,
      upi_id,
      is_upi,
      phone,
      id,
      profiles:user_id (
      id,
      username
    )
      `);

    if (error) {
        console.error('Error fetching tickets:', error)
      } else {
        setTickets(data)  
        setEditableTickets(data)
      }
  }
const updateRow = async (id, amount, ticket_status) => {
  const { data, error } = await supabase
    .from("tickets")
    .update({ amount, ticket_status })
    .eq("id", id);

  if (error) {
    console.error("Update failed:", error.message);
  } else {
    console.log("Updated:", data);
    setEditFlag(false);
    getTickets(); // Refresh list
  }
};

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
            <div className='w-1/7'>Username</div>
            <div className='w-1/7'>Id</div>
            <div className='w-1/7'>Type</div>
            <div className='w-1/7'>Amount</div>
            <div className='w-1/7'>Transaciton ID</div>
            <div className='w-1/7'>Status</div>
            <div className='w-1/7'>View</div>
          </div>
        {editableTickets.length>0 && editableTickets.map((ticket,index) => (
          <div key={ticket.id} className={`w-full flex justify-around ${index%2 == 0 && "bg-[#22324c]"} p-3 rounded`}>
            <div className="w-1/7">
              {ticket.profiles.username}
            </div>
            <div className="w-1/7 overflow-hidden">
              {ticket.profiles?.id.slice(0, 6)}
            </div>
            <div className='w-1/7'>
               
              <input 
              type="text" 
              className='text-center' 
              value={ticket.type} name="" id="" readOnly/>
            </div>
            <div className='w-1/7'>
             <input 
                type="text"
                className='text-center'
                value={ticket.amount}
                onChange={(e) => {
                  const updated = [...editableTickets];
                  updated[index].amount = e.target.value;
                  setEditableTickets(updated);
                  setEditFlag(true);
                }}
              />

            </div>
            <div className='flex justify-center w-1/7'>
              {ticket.transaction_id || "N/A"}
            </div>

            <div className={` w-1/7 font-bold flex justify-center`}>
              <div className={`${statusColor[ticket.ticket_status] || "bg-gray-500"} px-2 py-1 w-1/2 rounded text-white`}>
                <select
                className="text-center px-2 py-1 rounded text-black w-full"
                value={ticket.ticket_status}
                onChange={(e) => {
                  const updated = [...editableTickets];
                  updated[index].ticket_status = e.target.value;
                  setEditableTickets(updated);
                  setEditFlag(true);
                }}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              </div>
            </div>
            <div className="w-1/7 view-btn flex items-center justify-center">
              <button onClick={()=>{
                setSelectedTicket(ticket)
                setShowPopup(true); 
                }}>View</button>
            </div>
            <div className='ml-2'>
                  {editFlag && (
                    <button
                      onClick={() =>
                        updateRow(ticket.id, ticket.amount, ticket.ticket_status)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  )}
            </div>
          </div>
        ))}
      </div>
      </div>
      {showPopup &&
      <PopUp ticket={selectedTicket} setShowPopup ={setShowPopup} showPopup={showPopup}/>
      }
    </div>
  )
}

export default Tickets