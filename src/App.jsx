// import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import {store} from './app/store'
import Product from './Pages/Product'
import ProductCollection from './components/ProductCollection/ProductCollection'
// import authService from './appwrite/auth'

function App() {
 
  return (
    <>
        <Header/>
        {/* <ProductCollection/> */}
          <Outlet/>
        {/* <Footer/> */}
    </>
  )
}

export default App
