import React, { useState,useEffect } from 'react'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function PlantAddForm() {
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState({
        plant_name:"",
        type:[],
        price:null,
        description:"",
        featured_img:null
    })
    const navigate=useNavigate()
    useEffect(() => {
        
        console.log(data)
    }, [data]);
    const handleChange=(e)=>{
        if(e.target.name!=="featured_img"){
            if(e.target.name!=="typ"){
                setData((prev)=>({...prev,[e.target.name]:e.target.value}))
            }
            else{
                console.log("else")
                setData(prev=>({...prev,[e.target.name]:e.target.value}))
            }
        }
        else{
            setData((prev)=>({...prev,[e.target.name]:e.target.files[0]}))
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(data){
            if(data.featured_img){
                setLoader(true)
                const fileId=await service.uploadFile(data)
            const res=await service.addPlant({...data,typ:data.typ.split(","),price:parseInt(data.price),featured_img:fileId?fileId.$id:undefined})
                setLoader(false)
                if(res){
                    navigate("/")
                }
            }
        }
    }

  if(loader){
    return <Spinner/>
  }
  else{
    return (
        <div className="w-full bg-gray-50 flex justify-center">       
            <form onSubmit={handleSubmit} className="mt-3 flex flex-col p-10 w-full md:w-auto bg-white border border-gray-300 sm:p-10 rounded-md shadow mb-3">
                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className="text-start">
                        <label className='block mb-1 font-bold' >Name :- </label>
                        <input type="text" className='w-[90%] px-4 py-2 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' name="plant_name" placeholder='Enter Name of the Plant..' onChange={handleChange} required />
                    </div>
                    <div className="text-start">
                        <label className='block mb-1 font-bold' >Type :- </label>
                        <input type="text" className='w-[90%] px-4 py-2 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Type of the Plant..' name='typ' onChange={handleChange} required/>
                    </div>
                </div>
                <div className="mt-3 text-start">
                    <label className='block mb-1 font-bold' >Price :- </label>
                    <input type="number" className='w-[90%] px-4 py-2 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Type of the Plant..' name='price' onChange={handleChange} required/>
                </div>
                <div className="mt-3 text-start">
                    <label className='block mb-1 font-bold' >description :- </label>
                    <textarea type="text" rows={3} className='w-[95%] px-4 py-3 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Description of the Plant..' name='description' onChange={handleChange} required />
                </div>
                <div className="mt-3 text-start">
                    {/* <label className='block mb-1 font-bold' >description :- </label> */}
                    <input type="file" className='w-[95%] px-4 py-3 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Description of the Plant..'name='featured_img' onChange={handleChange} required />
                </div>
                <button type='submit' className='w-[96%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-5 rounded-md pointer'>Add Plant</button>
            </form>
        </div>
    )
  }
}
