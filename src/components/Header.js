import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import {Link} from "react-router-dom";


const Header = () => {
  return (
    <header className='h-16 bg-white'>
      <div className=' h-full container mx-auto flex items-center px-4  justify-between'>
        <div className=''>
          <Link to={"/"}>
          <Logo w={100} h={60}/>
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='search here...' className='w-full outline-none'/>
                <div className='text-lg min-w-[50px] h-8 bg-[#1F6F78] flex items-center justify-center rounded-r-full text-white'>
                  <GrSearch />
                </div>
            </div>

      <div className='flex items-center gap-7'>
        <div>
          <Link to = {"/login"} className='text-3xl cursor-pointer'>
          <FaRegUserCircle/>
          </Link>
        </div>
        
        

        <div>
          <Link  to ={"/" }className='px-3 py-1 text-xl font-bold hover:underline'>Logout</Link>
        </div>
       </div>

      </div>
    </header>
  )
}

export default Header
