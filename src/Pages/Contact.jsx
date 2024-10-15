import React from 'react'

export default function Contact() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center p-4 box-border">
        <div className="w-[90%] md:w-2/5 h-full border-blue-500">
            <img className='rounded-md' src="https://media.istockphoto.com/id/1458164457/photo/businessman-using-laptop-and-smartphone-with-contact-icons-on-virtual-screen-searching-web.webp?a=1&b=1&s=612x612&w=0&k=20&c=QBNMztJSx7_BIShHAmroLCR7CAff87m1JGd8KOONBY8=" height="100%" width="100%" alt="" />
        </div>
        <div className="w-full md:w-2/3 h-full border-blue-500">
            <div class="p-4 mx-auto max-w-xl bg-white font-[sans-serif]">
                <h1 class="text-3xl text-gray-700 font-extrabold text-center">Contact us</h1>
                <form class="mt-8 space-y-4">
                    <input type='text' placeholder='Name'
                        class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                    <input type='email' placeholder='Email'
                        class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                    <input type='text' placeholder='Subject'
                        class="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                    <textarea placeholder='Message' rows="6"
                        class="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"></textarea>
                    <button type='button'
                        class="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full">Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}
