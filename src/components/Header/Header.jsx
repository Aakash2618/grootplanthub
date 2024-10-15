import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import authService from '../../appwrite/auth'
import { authSlice, login, logout } from '../../features/auth'
import { useDispatch, useSelector } from 'react-redux'

const callsToAction = [
  { name: 'Watch demo', to: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', to: '#', icon: PhoneIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const { status, userData } = useSelector(state => state.authReducer)
  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .catch(err => console.log("error inside header component:- ", err))
  }, [status])

  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log("dlsfj")
      const res=authService.logOut()
      console.log(res)
      dispatch(logout())
      navigate("/")
  }
//  console.log(status)


  return (
    <>
    <header className="bg-green-700 border-b-2 border-gray-100 z-10 sticky top-0 text-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center relative z-0 justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 flex-col mix-blend-color-burn">
          <img className="mix-blend-color-burn h-10 w-12 ml-6 rounded-full" alt="" src="Logo.jpg" />
          <a to="#" className="-m-1.5 p-1.5">
            <span className="sr-nly font-bold">Groot Plant Hub</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <NavLink to='/' className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-gray-100 text-sm font-semibold leading-6" : "text-sm font-semibold leading-6 text-gray-900"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-gray-100 text-sm font-semibold leading-6" : "text-sm font-semibold leading-6 text-gray-900"}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white text-sm font-semibold leading-6" : "text-sm font-semibold leading-6 text-gray-900"}>
            Service
          </NavLink>
          <NavLink to="/contact" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white text-sm font-semibold leading-6" : "text-sm font-semibold leading-6 text-gray-900"}>
            Contact us
          </NavLink>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          <NavLink to={status ? "" : "signIn"} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white text-sm font-semibold leading-6" : "text-sm font-semibold leading-6 text-gray-900"}>
            <Menu as="div" className="relative inline-block text-center">
              <div>
                <MenuButton className="inline-flex w-full justify-center itmes-center gap-x-1.5 rounded-md bg-transparent border-none outline-none px-3 py-2 text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-100">
                  {status && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  }
                  {!status ?<>Sign In <span aria-hidden="true">&rarr;</span></>:userData?userData.name?userData.name[0].toUpperCase()+userData.name.slice(1):"User":"User"}
                  {status && <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />}
                </MenuButton>
              </div>

              {status && <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {userData?userData.email=="grootplanthub@gmail.com"?<MenuItem>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Account settings
                    </Link>
                  </MenuItem>:"":""}
                  
                  <form  >
                    <MenuItem>
                      <button
                        onClick={handleSubmit}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      > 
                        Log out
                      </button>
                    </MenuItem>
                  </form>
                </div>
              </MenuItems>}
            </Menu>
          </NavLink>
          <NavLink to="/cart" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white text-sm font-semibold leading-6" : "text-sm font-semibold leading-6 text-gray-900"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </NavLink>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="Logo.jpg"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >About
                  
                </Link>
                <Link
                  to="/services"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
              <div className="py-2">
              {/* {userData?userData.email=="grootplanthub@gmail.com"?:<p>bjb</p>} */}
              {userData?userData.email=="grootplanthub@gmail.com"?<Link
                  to="/admin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Account Setting
                </Link>:"":""}
                <Link
                  to="/signIn"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {!status ?<>Sign In <span aria-hidden="true">&rarr;</span></>:<button
                        onClick={handleSubmit}
                        className="block text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      > 
                        Log out
                      </button>}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    </>
  )
}
