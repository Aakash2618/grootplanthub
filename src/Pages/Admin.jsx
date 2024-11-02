import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PlantAddForm from "../Pages/PlantAddForm"
import Update from '../components/update/Update'

export default function Admin() {
  const sideNaveItem=["Add Plant","Remove Plant", "Update Plant"]
  return (
    <section className="border-blue-300 w-screen flex flex-col justify-center">
      {/* <div className="w-[19%] boder border-green-400 text-start bg-white p-2 h-[calc((h-screen)-h-8)]">
        <ul className=''>
         {sideNaveItem.map((item)=>{
          return <li className='px-14 py-4 text-start font-bold rounded bg-gray-50 hover:bg-green-700 border' key={item}>{item}</li>
         })}
        </ul>
      </div> */}
      <div className="m-auto w-[90%] md:w-[90%] boder border-purple-400 text-center">
        {/* <PlantAddForm/> */}
        <Update/>
      </div>
    </section>
  )
}
