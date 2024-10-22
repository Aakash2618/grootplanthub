import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';

export default function Product() {
  const navigateCart=useNavigate()
    const location=useLocation()
    const {userData}=useSelector(state=>state.authReducer)
    const {name,img_url,itemDetails}=location.state;
    const {$id,plant_name,type,price,description,featured_img}=itemDetails
    // console.log("sdgdf",itemDetails)
    const url=`https://cloud.appwrite.io/v1/storage/buckets/6703bb3a003aaa04726a/files/${img_url}/view?project=6702da740011a34f349f&project=6702da740011a34f349f&mode=admin`

    const addCart=async()=>{
      if(userData){
        if(userData.$id){
          await service.getCartItems(userData)
            .then(async res => {
                if (res) {
                    console.log(res.documents)
                    let itm=res.documents.filter((item)=>item.product_id===$id)
                    console.log(itm)
                    if(itm.length>0){
                      let {product_id,quantity,User_id,plant_name,description,type,price,featured_img}=itm[0]
                      await service.updateCartItems(itm[0].$id,{product_id,User_id,plant_name,description,type,price,featured_img,quantity:itm[0].quantity+1})
                      .then(res=>{navigateCart("cart")})
                      .catch(err=>console.log(err))
                    }
                    else{
                        await service.addCartItem({User_id:userData.$id,product_id:$id,plant_name,type,price,description,featured_img})
                        .then(res=>navigateCart("cart"))
                        .catch(err=>console.log(err))
                      }
            }})
        }
      }
      else{
        navigateCart("signIn",{state:{path:"/product"}})
      }
    }
  return (
    <section className="py-8 bg-white md:py-16 antialiased">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
          <img className="w-full hidden dark:block rounded-md" src={url} alt={name} />
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1
            className="text-xl font-semibold text-gray-900 sm:text-2xl"
          >
            {name}
          </h1>
          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p
              className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
            >
              Rs-{itemDetails.price} /-
            </p>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
              </div>
              <p
                className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
              >
                (5.0)
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
              >
                345 Reviews
              </a>
            </div>
          </div>
          <div className='w-1/2 pt-3'>
            {/* <div className="flex items-center justify-between pb-4"></div> */}
            <p className='font-bold'>Place your order by contacting us directly by giving us a call.</p>
            <p className='font-semibold mt-1 text-blue-700'>+91 8851641361</p>
          </div>
          {/* <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 " onClick={addCart}>
                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                Buy now
            </button>

            <a
              href="#"
              title=""
              className="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none  flex items-center justify-center"
              role="button"
            >
              <svg
                className="w-5 h-5 -ms-2 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>

              Add to cart
            </a>
          </div> */}

          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {itemDetails.description}
          </p>

          {/* <p className="text-gray-500 dark:text-gray-400">
            Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
            Magic Keyboard or Magic Keyboard with Touch ID.
          </p> */}
        </div>
      </div>
    </div>
    <Footer/>
  </section>
  )
}
