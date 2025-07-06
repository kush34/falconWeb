import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/Supabase';

const Users = () => {
  const [users,setUsers] = useState([]);
  const [editableUsers,setEditableUsers] = useState([]);
  const [error,setError] = useState();
  const [editFlag,setEditFlag] = useState(false);

  const navigate = useNavigate();
  const updateRow = async (id, balance) => {
    if (!id) {
      console.error("Invalid user ID for update");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ balance })
      .eq("id", id);

    if (error) {
      console.error("Failed to update balance:", error.message);
    } else {
      console.log("Updated:", data);
      setEditFlag(false);
    }
  };
  const getUsers = async ()=>{
    
    const {data , error} = await supabase
    .from("profiles")
    .select("*");

    if (error) {
        console.error('Error fetching tickets:', error)
      } else {
        setEditableUsers(data);
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
              <div className='w-1/5'>
                Account_number
              </div>
              <div className='w-1/5'>
                Username
              </div>
              <div className='w-1/5'>
                Balance
              </div>
              <div className='w-1/5'>
                Role
              </div>
              { editFlag &&
                <div className='w-1/5'>
                  Update
                </div>
              }  
            </div>
        {editableUsers && editableUsers.map((user,index)=>{
          return(
            <div className={`flex justify-between p-3 ${index%2 == 0 && "bg-[#22324c]"} `}>
              <div className='w-1/5'>
                {user?.account_number.slice(0,6)}
              </div>
              <div className='w-1/5'>
                {user?.username || "null"}
              </div>
              <div className='w-1/5'>
                <input 
                  type="text"
                  className='text-center'
                  value={user?.balance} 
                  onChange={(e)=>{
                    const updated = [...editableUsers]
                    updated[index].balance = e.target.value;
                    setEditableUsers(updated);
                    setEditFlag(true);
                  }}
                  name="" 
                  id="" 
                />
              </div>
              <div className='w-1/5'>
                {user?.role ? "admin" : "user"}
              </div>
              {
                editFlag &&
                <div className='w-1/5'>
                  <button onClick={()=>updateRow(user.id,user.balance)} className='bg-blue-500 rounded px-2 py-1'>Update</button>
                </div>
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users