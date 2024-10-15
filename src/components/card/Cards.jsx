import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
 
export function Cards({name,img_url,item}) {
    const navigate=useNavigate()
    const data = useSelector(state=>state.plant)
  return (
   <div className="mt-3 max-w-72 sm:max-w-48 p-2 box-border overflow-hidden shadow-md flex flex-col items-center justify-center bg-gray-50 rounded-md">
    <div className="sm:h-52 md:h-52 lg:h-56">
        <img className="rounded-md"  src={`https://cloud.appwrite.io/v1/storage/buckets/6703bb3a003aaa04726a/files/${img_url}/view?project=6702da740011a34f349f&project=6702da740011a34f349f&mode=admin`} height="100%" width="100%" alt={name} />
    </div>
    <div className="m-2 w-full text-center">
        <h2 className="font-bold">{name}</h2>
        <button className="mt-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>navigate('product',{state:{name:name,img_url:img_url,itemDetails:item}})} >View Product</button>
    </div>
   </div>


  );
}