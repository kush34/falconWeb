import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/Supabase';
import { useNavigate } from 'react-router-dom';

const Assests = () => {
  const [assests,setAssests] = useState([]);
  const [loading,setLoading] = useState();
  const navigate = useNavigate();
  const getAssests = async ()=>{
    const {data,error} = await supabase
      .from("asset")
      .select("*")
      
      if (error) {
        console.error('Error fetching tickets:', error)
      } else {
        setAssests(data)  
      }
  }
  useEffect(()=>{
    getAssests();
  },[])
  if(loading){
    return(
      <div>
        loading...
      </div>

    )
  }
  return (
       <div className='w-full'>
        <div className='p-10 text-2xl font-medium flex justify-between'>
            <div>
                Assests
            </div>
            <div>
               <button onClick={()=>navigate("/")} className='bg-[#22324c] px-3 py-1 rounded text-white cursor-pointer'>
                    Back
                </button>
            </div>
        </div>
        <div>
            {assests.length > 0 ? 
              <div>
                      <div className='mb-4 flex font-semibold justify-between'>
                        <div className='w-1/2'>
                          Assest Name
                        </div>
                        <div className='w-1/2'>
                          Price
                        </div>
                      </div>
                {assests &&
                  assests.map((assest,index)=>{
                    return(
                      <div className='flex justify-between'>
                        <div className='w-1/2'>
                        {assest.assest_name}
                        </div>
                        <div className='w-1/2'>
                        {assest.assest_price}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            : <div>No Trade Live</div>}
        </div>
    </div>
  )
}

export default Assests