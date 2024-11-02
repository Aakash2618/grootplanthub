import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import service from '../../appwrite/config'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'

// import something from ''

export default function Update() {
    const [loading,setLoading]=useState(false)
    const [data, setData] = useState([])
    const { userData } = useSelector(state => state.authReducer)
    const [qty,setQty]=useState(1)
    const navigate=useNavigate()
    useEffect(() => {
        setLoading(true)
        service.allPlant()
            .then(res => {
                if (res) {
                    setData(res.documents)
                }
            })
            .catch(err => {
                console.log(err)
    
            })
            setLoading(false)

    }, [userData])
    const deleteItem=async(id,fileId)=>{   
        const res=await service.deletePlant(id,fileId)
        if(res){
            alert("Item Delete Successfully..")
        }
        else{
            console.log(res)
        }
        await service.allPlant()
            .then(res => {
                if (res) {
                    setData(res.documents)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleUpdate=(id)=>{
        navigate("updatePlant",{state:{id}})
    }
    return (
        <>
            {loading?<Spinner/>:(<section className='relative'>
            <div className='mt-5'>
                <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-700 sm:text-3xl">All Plants</h1>
                </header>
            </div>
            <div className='w-10 mt-2 mx-auto rounded p-2 bg-gray-100 border border-2-gray-400 shadow-sm absolute right-[12.5%]' onClick={()=>navigate("/addplant")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <div className="mt-6 max-w-screen-xl mx-auto justify-center flex flex-col md:flex-row px-4 py-8 sm:px-6 sm:py-12 lg:px-8 gap-10">
                <div className="w-[90%] mx-auto md:w-[80%]">
                    <div className=" bg-gray-100 rounded-md p-5 box-border">
                        <ul className="space-y-4">
                            {data.map((item, index) => {
                                return <li key={index} className="flex items-start pb-1 border-b border-gray-300 last:border-none">
                                    <img
                                        src={`https://cloud.appwrite.io/v1/storage/buckets/6703bb3a003aaa04726a/files/${item.featured_img}/view?project=6702da740011a34f349f&project=6702da740011a34f349f&mode=admin`}
                                        alt={item.plant_name}
                                        className="size-16 rounded object-cover"
                                    />

                                    <div className="ml-8 pr-8 text-start">
                                        <h3 className="text-sm text-gray-900">{item.plant_name}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Type :- </dt>
                                                <dd className="inline"> {item.type}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">desc:</dt>
                                                <dd className="inline">{item.description.slice(0,150)}..</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end gap-3">
                                            <img src='icons8-update-file-24.png' className='size-5 cursor-pointer' onClick={()=>handleUpdate(item.$id)} alt='update-icon' />

                                        <button className="text-gray-600 transition hover:text-red-600" onClick={()=>{deleteItem(item.$id,item.featured_img)}}>
                                            <span className="sr-only">Remove item</span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            })}
                        </ul>

                    </div>
                </div>
                {/* <div className="flex justify-end border-t h-44 w-[50%] ml-[45%] md:w-[23%] md:ml-0 border-gray-100 bg-gray-100 p-5 box-border rounded-md" >
                    <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd>Rs. {data?data.reduce((sum,item)=>{return (sum + item.price)},0):"0"}</dd>
                            </div>

                            <div className="flex justify-between">
                                <dt>Discount</dt>
                                <dd>% 10</dd>
                            </div>

                            <div className="flex justify-between !text-base font-medium">
                                <dt>Total</dt>
                                <dd>Rs.{data.reduce((sum,item)=>{return (sum + item.price)},0)-data.reduce((sum,item)=>{return (sum + item.price)},0)*10/100}</dd>
                            </div>
                        </dl>

                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                            >
                                Checkout
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>)}
        </>

    )
}
