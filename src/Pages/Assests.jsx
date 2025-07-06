import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import { supabase } from '../lib/Supabase';
import { useNavigate } from 'react-router-dom';


/*
CHANGES TO BE MADE


  -------IMPORTANT------

  add row to edit   
    1) change_percent
    2) change_amount
    3) trend

**********IMPORTANT**********
  

Add a Way to add assest to the DB LATER
*/
const Assests = () => {
  const [assets,setAssets] = useState([]);
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
      setAssets(data);
      setEditableAssets(data); // Create editable copy
    }
  };

  const updateRow = async (id, name, price,price_change,change_percent,trend) => {
    if (!name || !price) {
      setError("Please fill all fields");
      return;
    }
    const { data, error } = await supabase
      .from("asset")
      .update({ asset_name: name, asset_price: price,price_change,change_percent,trend})
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
          asset_name: name,
          asset_price: price,
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
            <div className='flex mb-4'>
              <div className='w-1/5 text-center text-xl font-semibold '>Asset Name</div>
              <div className='w-1/5 text-center text-xl font-semibold '>Asset Price</div>
              <div className='w-1/5 text-center text-xl font-semibold '>Price Change</div>
              <div className='w-1/5 text-center text-xl font-semibold '>Change Percent</div>
              <div className='w-1/5 text-center text-xl font-semibold '>Trend</div>
            </div>
            {editableAssets.map((asset, index) => (
              <div key={asset.id} className={`flex justify-between mb-2 ${index%2 ==0 && "bg-[#22324c]"} rounded`}>
                <div className='w-1/6 flex justify-center'>
                  <input
                    type="text"
                    value={asset.asset_name}
                    onChange={(e) => {
                      const updated = [...editableAssets];
                      updated[index].asset_name = e.target.value;
                      setEditableAssets(updated);
                      setEditFlag(true);
                    }}
                    className="w-full text-center px-2 py-1"
                  />
                </div>
                <div className='w-1/6'>
                  <input
                    type="text"
                    value={asset.asset_price}
                    onChange={(e) => {
                      const updated = [...editableAssets];
                      updated[index].asset_price = e.target.value;
                      setEditableAssets(updated);
                      setEditFlag(true);
                    }}
                    className="w-full px-2 py-1 text-center"
                  />
                </div>
                <div className='w-1/6'>
                  <input
                    type="text"
                    value={asset.price_change}
                    onChange={(e) => {
                      const updated = [...editableAssets];
                      updated[index].price_change = e.target.value;
                      setEditableAssets(updated);
                      setEditFlag(true);
                    }}
                    className="w-full px-2 py-1 text-center"
                  />
                </div>
                <div className='w-1/6'>
                  <input
                    type="text"
                    value={asset.change_percent}
                    onChange={(e) => {
                      const updated = [...editableAssets];
                      updated[index].change_percent = e.target.value;
                      setEditableAssets(updated);
                      setEditFlag(true);
                    }}
                    className="w-full px-2 py-1 text-center"
                  />
                </div>
                <div className='w-1/6'>
                  <select
                className="text-center px-2 py-1 rounded w-full"
                value={asset.trend}
                onChange={(e) => {
                  const updated = [...editableAssets];
                  updated[index].trend = e.target.value;
                  setEditableAssets(updated);
                  setEditFlag(true);
                }}
              >
                <option className='text-black rounded' value="UP">Up</option>
                <option className='text-black rounded' value="DOWN">Down</option>
              </select>

                </div>
                <div className='ml-2'>
                  {editFlag && (
                    <button
                      onClick={() =>
                        updateRow(asset.id, asset.asset_name, asset.asset_price,asset.price_change,asset.change_percent,asset.trend)
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