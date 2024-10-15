import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="fixed bottom-0 right-0 left-0 bg-white border-t w-full mx-auto mt-0 box-border max-w-container px-4 sm:px-6 lg:px-8" aria-labelledby="footer-heading">
            <div className="items-centers md:grid grid leading-2 sm:grid-cols-2 justify-around gap-1 md:gap-4 border-t border-gray-100 py-3 md:py-6 md:grid-cols-3">
                <div className='flex flex-col md:flex-row md:gap-3'>
                    <p className="text-sm/6 text-gray-600 max-md:text-center">
                        ©2024 &nbsp;&nbsp;&nbsp;
                        <a href="https://learnwithsumit.com/">Groot Plant Hub</a>
                        {/* &nbsp;&nbsp;&nbsp;All rights reserved. */}
                    </p>
                    <p className="text-sm/6 text-gray-600 max-md:text-center">All rights reserved.</p>
                </div>
                <div className='flex justify-center gap-2'>
                    <Link className='pointer' to="https://m.youtube.com/@GrootPlantHub">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>
                    </Link>
                    <Link to="https://www.facebook.com/profile.php?id=61566135583355" className='pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"/></svg>
                    </Link>
                    <Link to="https://www.instagram.com/grootplanthub/profilecard/?igsh=MWcyeGdyZmRub2JvZA==" className='pointer'> 
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"/></svg>
                    </Link>
                </div>
                <div className="hidden md:visible md:flex items-center justify-center space-x-4 text-sm/6 text-gray-500 md:justify-end">
                    <a href="https://learnwithsumit.com/privacy-policy">Privacy policy</a>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <a href="https://learnwithsumit.com/terms">Terms</a>
                </div>
            </div>
        </footer>
    )
}
