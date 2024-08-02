import React, { useState } from 'react'
import Logo from '../assest/Logo.svg'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login =() => {
    const [showPassword,setShowPasword] = useState(false)  
    const[data,setData] = useState({
        email : "",
        password : ""
    })

    const handleOnChange = (e) =>{
        const{name,value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    console.log("data login",data)
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            
            <div className='bg-white  border  border-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto '>
                    <img src={Logo} alt='Login icons'/>
                </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div>
                        <label>Email : </label>
                        <div  className='bg-slate-100 border border-[#cfc6c6] rounded-full p-2 '>
                                <input 
                                type='text' 
                                placeholder='Enter email'  
                                name='email' 
                                value= {data.email} 
                                onChange={handleOnChange} 
                                className='w-full h-full outline-none bg-transparent'/> 
                        </div>
                    </div>
                    <div>
                        <label>Password :</label>
                        <div  className='bg-slate-100 border border-[#cfc6c6] rounded-full p-2 flex '>
                                <input 
                                type={showPassword ? "text" : "password"}   
                                placeholder='Enter password' 
                                value={data.password} 
                                name='password'
                                onChange={handleOnChange}   
                                className='w-full h-full outline-none bg-transparent border-black'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPasword((preve)=>!preve)}>
                            <span>
                                {
                                    showPassword ? (
                                        <FaEyeSlash/>
                                    )
                                    :
                                    (
                                        <FaEye/>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <Link to={'/forget-password'} className='block w-fit ml-auto hover:underline hover:text-[#1F6F78]'>
                        Forget password?
                    </Link>
                    </div>
                   <button className='bg-[#1F6F78]  hover:bg-[#14474d]  text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>Login</button>
                </form>
                <p className="my-5"> Don't have account?<Link to={'/sign-up'} className=' text-[#1F6F78]  hover:text-[#4a6264] hover:underline'> Sign up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login
