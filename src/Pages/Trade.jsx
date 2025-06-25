import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/Supabase';

const Trade = () => {
    const [trades,setTrades] = useState([]);
    const [loading,setLoading] = useState();
    const navigate = useNavigate();
    const getTrades = async ()=>{
        const {data,error} = await supabase
            .from("trade")
            .select("*");
            if (error) {
                console.error('Error fetching tickets:', error)
            } else {
                setTrades(data)  
            }

    }
    useEffect(()=>{
        getTrades();
    },[])

  return (
    <div className='w-full'>
        <div className='p-10 text-2xl font-medium flex justify-between'>
            <div>
                Trade
            </div>
            <div>
               <button onClick={()=>navigate("/")} className='bg-[#22324c] px-3 py-1 rounded text-white cursor-pointer'>
                    Back
                </button>
            </div>
        </div>
        <div className='flex justify-center'>
        <div className='flex w-full flex-col'>

            <div>
                {trades.length == 0 && 
                <div className='font-semibold text-2xl'>
                    No trades to view
                </div>
                }
                {trades.length > 0 && 
                <div className='flex mb-4'>
                    <div className='w-1/4'>Type</div>
                    <div className='w-1/4'>Amount</div>
                    <div className='w-1/4'>Status</div>
                    <div className='w-1/4'>Quantity</div>
                </div>
                }
            </div>
        {trades.length>0 && trades.map((trade,index) => (
          <div key={trade.id} className={`w-full flex justify-around ${index%2 == 0 && "bg-[#22324c]"} p-3 rounded`}>
            <div className='w-1/4'>
              {trade.assest_name} 
            </div>
            <div className='w-1/4'>
              {trade.amount || "not available"}
            </div>
            <div className={` w-1/4 flex justify-center`}>
              <div className={` px-2 py-1 w-1/2 rounded text-white`}>
                {trade?.status || "not available"}
              </div>
            </div>
            <div className="w-1/4 quantity">
                {trade.quantity || "not available"}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Trade