import React, { useEffect, useState, useId, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Cards } from '../components/card/Cards'
import Footer from '../components/footer/Footer'
import service from '../appwrite/config'
import Spinner from '../components/Spinner'
import Banner from '../components/Banner'
import Search from '../components/search/Search'
// import {data.json} from '../store/data.json'

export default function Home() {
    const [loader, setLoader] = useState(false)
    const [query,setQuery]=useState("")
    const ID = useId()
    const [all, setAll] = useState([])
    const categories = [{name:"INDOOR",query:"indoor"}, {name:"OUTDOOR",query:"outdoor"}, {name:"FLOWER PLANT",query:"flower"}, {name:"FRUIT PLANT",query:"fruit"}, {name:"HERBAL PLANT",query:"decorate"}, {name:"PLANT OF SEASON",query:"season"}]
    
    const getData=useCallback(async(query)=>{
        return await service.allPlant(query)
            
    },[])
    useEffect(() => {        
          getData()
            .then(data=>setAll(data.documents))
    }, []);
    const handleSearch=async (query)=>{
        setQuery(query)
    }
    if (all.length==0) {
        return <Spinner />
    }
    else {
        return (
        <>
            <Banner/>
            <Search functionSearch={handleSearch} />
            <div style={{ height: "67vh" }} className='lg:h-[95vh] w-screen flex justify-center itmes-center box-border overflow-x-hidden relative'>
            <div className="w-1/6 h-full hidden bg-gray-50 md:flex overflow-y-auto overflow-x-hidden pl-2  box-border sticky top-0 left-0">
                <div className=''>
                    <h1 className='mb-2 mt-5 font-bold'>Categories</h1>
                    <div className='w-full overflow-y-auto overflow-x-hidden'>
                        <ul className=''>
                            {categories.map((item, index) => {
                                return (
                                    <li key={item.name} className='hover:bg-green-700 block w-full py-3 px-5 border-gray-800' onClick={(e)=>handleSearch(item.query)}><Link to=""><span className='font-bold text-xl'>›&nbsp;</span>{item.name}</Link></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full h-full mt-3 md:w-5/6'>
                <div className="justify-center sm:grid-cols-3 sm:place-items-center bg-purpl-500 grid md:grid-cols-4 gap-2 overflow-x-hidden box-border">
                    {/* {all.map((item, index) => {
                        if(JSON.parse(item.type).filter((itm)=>{itm==query}).length>0){
                            console.log(item)
                            return <Cards key={index} name={item.plant_name} img_url={item.featured_img} item={item} />
                        }
                        return
                    })} */}
                    {all.filter((item)=>item.type.includes(query)).map((item,index)=>{
                        return <Cards key={index} name={item.plant_name} img_url={item.featured_img} item={item} />
                    })}

                </div>
                <div className="flex justify-between mt-5 pb-14 px-5 box-border">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        Prev
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                        Next
                    </button>
                </div>
            </div>
        </div>  
            <Footer />
        </>
        )
    }
}
