import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import { supabase } from '../lib/Supabase';
import { useNavigate } from 'react-router-dom';

const Assests = () => {
  const [assests,setAssests] = useState([]);
  const [loading,setLoading] = useState();
  const navigate = useNavigate();
  const [error ,setError] = useState("");
  const [editableAssets, setEditableAssets] = useState([]);
  const [editFlag,setEditFlag] = useState(false);
  
  const getAssests = async () => {
    const { data, error } = await supabase.from("asset").select("*");
    if (error) {
      console.error('Error fetching assets:', error)
    } else {
      setAssests(data);
      setEditableAssets(data); // Create editable copy
    }
  };

  const updateRow = async (id, name, price) => {
    if (!name || !price) {
      setError("Please fill all fields");
      return;
    }
    const { data, error } = await supabase
      .from("asset")
      .update({ assest_name: name, assest_price: price })
      .eq("id", id);

    if (error) {
      console.error("Update failed:", error);
      setError("Update failed");
    } else {
      setEditFlag(false);
      getAssests(); // Refresh view
    }
  };
  const addAsset = async (name, price) => {
    if (!name || !price) {
      console.error("Name and price required");
      return;
    }

    const { data, error } = await supabase
      .from("asset")
      .insert([
        {
          assest_name: name,
          assest_price: price,
        },
      ]);

    if (error) {
      console.error("Insert failed:", error.message);
    } else {
      console.log("Asset added:", data);
    }
  };
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
            <div className='flex gap-5'>
               <button onClick={()=>navigate("/")} className='bg-green-500 px-3 py-1 rounded text-white cursor-pointer'>
                    Add
                </button>
               <button onClick={()=>navigate("/")} className='bg-[#22324c] px-3 py-1 rounded text-white cursor-pointer'>
                    Back
                </button>
            </div>
        </div>
        {
          error &&
          <div className='text-white bg-red-500 rounded mx-5 py-1 flex justify-center items-center gap-5 font-bold'>
            <div>
              {error}
            </div>
            <button onClick={()=>setError("")}> <X /></button>
          </div>
        }
        <div className='w-full p-5'>
            <div className='flex'>
              <div className='w-1/2'>Asset Name</div>
              <div className='w-1/2'>Asset Price</div>
            </div>
            {editableAssets.map((assest, index) => (
              <div key={assest.id} className={`flex justify-between mb-2 ${index%2 ==0 && "bg-[#22324c]"} rounded`}>
                <div className='w-1/2 flex justify-center border'>
                  <input
                    type="text"
                    value={assest.assest_name}
                    onChange={(e) => {
                      const updated = [...editableAssets];
                      updated[index].assest_name = e.target.value;
                      setEditableAssets(updated);
                      setEditFlag(true);
                    }}
                    className="w-full text-center px-2 py-1"
                  />
                </div>
                <div className='w-1/2'>
                  <input
                    type="text"
                    value={assest.assest_price}
                    onChange={(e) => {
                      const updated = [...editableAssets];
                      updated[index].assest_price = e.target.value;
                      setEditableAssets(updated);
                      setEditFlag(true);
                    }}
                    className="w-full px-2 py-1 text-center"
                  />
                </div>
                <div className='ml-2'>
                  {editFlag && (
                    <button
                      onClick={() =>
                        updateRow(assest.id, assest.assest_name, assest.assest_price)
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
  )
}

export default Assests