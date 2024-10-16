import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import service from '../appwrite/config'
import Spinner from '../components/Spinner'

// import something from ''

export default function Cart() {
    const [loading,setLoading]=useState(false)
    const [data, setData] = useState([])
    const { userData } = useSelector(state => state.authReducer)
    const [qty,setQty]=useState(1)
    useEffect(() => {
        setLoading(true)
        service.getCartItems(userData)
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
    const deleteItem=async(id)=>{   
        const res=await service.deleteCartItem(id)
        if(res.message==""){
            alert("Item Delete Successfully..")
        }
        else{
            console.log(res)
        }
        service.getCartItems(userData)
            .then(res => {
                if (res) {
                    setData(res.documents)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleChangeQty=(e)=>{
        // console.log(e.target.value)
    }
    return (
        <>
            {loading?<Spinner/>:(<section>
            <div className='mt-5'>
                <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-700 sm:text-3xl">Your Cart</h1>
                </header>
            </div>
            <div className=" max-w-screen-xl mx-auto justify-center flex flex-col md:flex-row px-4 py-8 sm:px-6 sm:py-12 lg:px-8 gap-10">
                <div className="w-[90%] mx-auto md:w-[63%]">
                    <div className=" bg-gray-100 rounded-md p-5 box-border">
                        <ul className="space-y-4">
                            {data.map((item, index) => {
                                return <li className="flex items-center pb-1 border-b border-gray-300 last:border-none">
                                    <img
                                        src={`https://cloud.appwrite.io/v1/storage/buckets/6703bb3a003aaa04726a/files/${item.featured_img}/view?project=6702da740011a34f349f&project=6702da740011a34f349f&mode=admin`}
                                        alt={item.plant_name}
                                        className="size-16 rounded object-cover"
                                    />

                                    <div className="ml-5">
                                        <h3 className="text-sm text-gray-900">{item.plant_name}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Type:</dt>
                                                <dd className="inline">{item.type}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">desc:</dt>
                                                <dd className="inline">{item.description.slice(0,150)}..</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <form>
                                            <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                id="Line1Qty"
                                                className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                onChange={(e)=>handleChangeQty(e)}
                                            />
                                        </form>

                                        <button className="text-gray-600 transition hover:text-red-600" onClick={()=>{deleteItem(item.$id)}}>
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
                <div className="flex justify-end border-t h-44 w-[50%] ml-[45%] md:w-[23%] md:ml-0 border-gray-100 bg-gray-100 p-5 box-border rounded-md" >
                    <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd>Rs. {data?data.reduce((sum,item)=>{return (sum + item.price)},0):"0"}</dd>
                            </div>

                            {/* <div className="flex justify-between">
                                <dt>VAT</dt>
                                <dd>£25</dd>
                            </div> */}

                            <div className="flex justify-between">
                                <dt>Discount</dt>
                                <dd>% 10</dd>
                            </div>

                            <div className="flex justify-between !text-base font-medium">
                                <dt>Total</dt>
                                <dd>Rs.{data.reduce((sum,item)=>{return (sum + item.price)},0)-data.reduce((sum,item)=>{return (sum + item.price)},0)*10/100}</dd>
                            </div>
                        </dl>

                        {/* <div className="flex justify-end">
                            <span
                                className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="-ms-1 me-1.5 size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                    />
                                </svg>

                                <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
                            </span>
                        </div> */}

                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                            >
                                Checkout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>)}
        </>

    )
}
