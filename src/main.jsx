import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Services from './Pages/Services.jsx'
import Contact from './Pages/Contact.jsx'
import Cart from './Pages/Cart.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store.js'
import Product from './Pages/Product.jsx'
import SignIn from './Pages/SignIn.jsx'
import LogIn from './Pages/LogIn.jsx'
import PlantAddForm from './Pages/PlantAddForm.jsx'
import Admin from './Pages/Admin.jsx'
import Spinner from './components/Spinner.jsx'
import UpdatePlant from './Pages/UpdatePlant.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:'services',
        element:<Services/>
      },
      {
        path:'contact',
        element:<Contact/>
      },
      {
        path:"product",
        element:<Product/>
      },
      {
        path:"product/cart",
        element:<Cart/>
      },
      {
        path:"signIn",
        element:<SignIn/>
      },
      {
        path:"logIn",
        element:<LogIn/>
      },
      {
        path:"addPlant",
        element:<PlantAddForm/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"admin",
        element:<Admin/>
      },
      {
        path:"spinner",
        element:<Spinner/>
      },
      {
        path:"product/signIn",
        element:<SignIn/>
      },
      {
        path:"admin/updatePlant",
        element:<UpdatePlant/>
      }
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
