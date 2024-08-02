import React from 'react'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Logo from '../assest/Logo.svg'
const SignUp = () => {
  const [showPassword,setShowPasword] = useState(false)
  const [showConfirmPassword,setConfirmPassword] = useState(false)
  const[data,setData] = useState({
    email : "",
    password : "",
    name : "",
    confirmPassword : "",
    profilePic : ""
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
const handleUploadPic = (e)=>{
  const file = e.target.files[0]
  console.log('file',file)

}
const handleSubmit = (e)=>{
    e.preventDefault()
}
console.log("data login",data)
  return (
    <section id='signup'>
    <div className='mx-auto container p-4'>
        
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
            
            <div className='w-20 h-20 mx-auto '>
                    <img src={Logo} alt='Login icons'/>
                </div>
           <form>
            <label>
                
              <input type='file' className='hidden' onChange={handleUploadPic}/>
            </label>
           </form>
            
            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Name : </label>
                    <div  className='bg-slate-100 border border-[#cfc6c6] rounded-full p-2 '>
                            <input 
                            type='text' 
                            placeholder='Enter your name'  
                            name='name' 
                            value= {data.name} 
                            onChange={handleOnChange} 
                            className='w-full h-full outline-none bg-transparent'/> 
                    </div>
                </div>
                <div className='grid'>
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
                </div>

                <div>
                    <label> Confirm Password :</label>
                    <div  className='bg-slate-100 border border-[#cfc6c6] rounded-full p-2 flex '>
                            <input 
                            type={showConfirmPassword ? "text" : "password"}   
                            placeholder='confirm your password' 
                            value={data.confirmPassword} 
                            name='confirmPassword'
                            onChange={handleOnChange}   
                            className='w-full h-full outline-none bg-transparent border-black'/>
                            <div className='cursor-pointer text-xl' onClick={()=>setConfirmPassword((preve)=>!preve)}>
                        <span>
                            {
                                showConfirmPassword ? (
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
                </div>
               <button className='bg-[#1F6F78]  hover:bg-[#14474d] text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5'>SignUp</button>
            </form>
            <p className="my-5"> Already have account ?<Link to={'/login'} className=' text-[#1F6F78]  hover:text-[#4a6264] hover:underline'>Login</Link></p>
        </div>
    </div>
</section>
  )
}

export default SignUp
