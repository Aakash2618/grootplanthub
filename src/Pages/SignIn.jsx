import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import authService from '../appwrite/auth'
import service from '../appwrite/config'
import { authSlice, login, logout } from '../features/auth'
import { useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'


export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            await authService.createAccount({ email, password })
                .then(data => {
                    if (data) {
                        setSpinner(true)
                        dispatch(login(data))
                        navigate("/")
                        setSpinner(false)
                    }
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                })
                .catch(err => {
                    throw err;
                    dispatch(logout())
                })
        }
        else {
            alert("The Password must be same")
            console.log("the password must be same")

        }
    }

    if(spinner){
        return(
            <Spinner/>
        )
    }
    else{
        return(<section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create an account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@google.com" onChange={(e)=>setEmail(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={(e)=>setPassword(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                            </div>
                            {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="terms" className="font-light text-gray-500">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-50" href="#">Terms and Conditions</Link></label>
                                </div>
                            </div> */}
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link to="/logIn" state={location.state} className="font-medium text-primary-600 hover:underline">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>)
    }
}
