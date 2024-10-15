import React from 'react'
import { useState,useEffect } from 'react'
import authService from '../appwrite/auth'
import { login } from '../features/auth'
import { useDispatch } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner'



export default function LogIn() {
    const [loader,setLoader]=useState(false)
const [data,setData]=useState({
    email:"",
    password:""
})
//  const [email,setEmail]=useState("")
//  const [password,setPassword]=useState("")
 const dispatch=useDispatch()
 const navigate=useNavigate()
 const location = useLocation()

 const handleChange=(e)=>{
    setData((prev)=>({...prev,[e.target.name]:e.target.value}))
 }
 const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoader(true)
    const userData=await authService.logIn(data)
    if(userData.userId){
        dispatch(login({userData}))
        setLoader(false)
        console.log(location)
        if(location.state==null){
            navigate("/")
        }
        else{
            location.state.path=="/product"?navigate("/cart"):navigate("/")
        }
        navigate("/")
    }
    else{
        setLoader(false)
        alert(userData)

    }

 }
  return (
    <>
        {loader?(<Spinner/>):(<section style={{height:"80vh"}} className='bg-gray-50 w-screen pt-7 pb-16'>
        <form onSubmit={handleSubmit} className="max-w-sm m-auto bg-white shadow rounded-md border px-14 py-10">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@google.com" onChange={handleChange} required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required />
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">Remember me</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
       </section>)}
    </>
  )
}
