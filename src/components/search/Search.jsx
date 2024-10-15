import React from 'react'

export default function Search({functionSearch}) {
    // const onChange=(e)=>{
    //     console.log(e.target.value)
    // }
    return (
        <div className='w-screen flex justify-end pr-5'>
            <form className="w-[40%]">
                {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Select an option</label> */}
                <select id="countries" className="mt-3 mb-1 md:hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>functionSearch(e.target.value)}>
                    <option selected>Choose a Category</option>
                    <option value="indoor">INDOOR</option>
                    <option value="outdoor">OUTDOOR</option>
                    <option value="flower">FLOWER PLANT</option>
                    <option value="water">WATER PLANT</option>
                    <option value="herbal">HERBAL PLANT</option>
                </select>
            </form>
        </div>
    )
}
