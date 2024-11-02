import React, { useState,useEffect } from 'react'
import service from '../appwrite/config'
import { useNavigate, useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function UpdatePlant() {
    const [loader,setLoader]=useState(false)
    const {state} = useLocation()
    const [imgId,setimgId]=useState("")
    const [data,setData]=useState({
        plant_name:"",
        type:[],
        price:null,
        description:"",
        featured_img:null
    })
    const navigate=useNavigate()
    useEffect(() => {
        service.getPlant(state.id)
        .then(res=>{ setData((prev)=>({...prev,plant_name:res.plant_name, type:(res.type) , price:res.price, description:res.description,featured_img:res.featured_img}))})
        .catch(err=>console.log(err))
    }, []);
    const handleChange=(e)=>{
        if(e.target.name!=="featured_img"){
            if(e.target.name!=="type"){
                setData((prev)=>({...prev,[e.target.name]:e.target.value}))
            }
            else{
                setData(prev=>({...prev,[e.target.name]:e.target.value}))
            }
        }
        else{
            if(e.target.files[0]){
                setimgId(data.featured_img)
                setData((prev)=>({...prev,[e.target.name]:e.target.files[0]}))
            }
        }
    }
    const handleUpdate=async(e)=>{
        e.preventDefault()
        if(data){
            // console.log(data)
            if(typeof(data.featured_img)!=="string"){
                setLoader(true)
                const img_res= await service.deleteFile(imgId)
                const fileId=await service.uploadFile(data)
                const res=await service.updatePlant(state.id,{...data,type:data.type,price:parseInt(data.price),featured_img:fileId?fileId.$id:undefined})
                setLoader(false)
                if(res){
                    navigate("/",{replace:true})
                }
            }
            else{
                setLoader(true)
                const res=await service.updatePlant(state.id,{...data,type:data.type,price:parseInt(data.price)})
                setLoader(false)
                if(res){
                    navigate("/",{replace:true})
                }
            }
        }
    }
    // console.log(typeof(data.type), data.type)
  if(loader){
    return <Spinner/>
  }
  else{
    return (
        <div className="w-full bg-gray-50 flex justify-center">       
            <form onSubmit={handleUpdate} className="mt-3 flex flex-col p-10 w-full md:w-auto bg-white border border-gray-300 sm:p-10 rounded-md shadow mb-3">
                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className="text-start">
                        <label className='block mb-1 font-bold' >Name :- </label>
                        <input type="text" value={data.plant_name} className='w-[90%] px-4 py-2 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' name="plant_name" placeholder='Enter Name of the Plant..' onChange={handleChange} required />
                    </div>
                    <div className="text-start">
                        <label className='block mb-1 font-bold' >Type :- </label>
                        <input type="text" value={data.type} className='w-[90%] px-4 py-2 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Type of the Plant..' name='type' onChange={handleChange} required/>
                    </div>
                </div>
                <div className="mt-3 text-start">
                    <label className='block mb-1 font-bold' >Price :- </label>
                    <input type="number" value={data.price} className='w-[90%] px-4 py-2 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Type of the Plant..' name='price' onChange={handleChange} required/>
                </div>
                <div className="mt-3 text-start">
                    <label className='block mb-1 font-bold' >description :- </label>
                    <textarea type="text" rows={3} value={data.description} className='w-[95%] px-4 py-3 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Description of the Plant..' name='description' onChange={handleChange} required />
                </div>
                <div className="mt-3 text-start">
                    {/* <label className='block mb-1 font-bold' >description :- </label> */}
                    <input type="file" className='w-[95%] px-4 py-3 rounded-md border-gray-300 bg-gray-50 outline-none border focus:ring-1 focus:border-blue-400' placeholder='Enter Description of the Plant..'name='featured_img' onChange={handleChange} />
                </div>
                <button type='submit' className='w-[96%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-5 rounded-md pointer'>Update Plant</button>
            </form>
        </div>
    )
  }
}
