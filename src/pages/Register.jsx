import React,{useState} from 'react'
import { registerUser } from '../services/user services'
import { validateRegister } from '../utils/validation'
import { useNavigate } from 'react-router-dom'
function Register() {
    const[formData,setFormData]=useState({name:"",email:"",password:"",cnfrmpass:""})
    const[errors,setErrors]=useState({})
    const navigate=useNavigate()
    function handler(e){
        setFormData({...formData,[e.target.name]:e.target.value})
setErrors("")
    }
   const handleSubmit=async(e)=>{
        e.preventDefault()

    const validationErrors=validateRegister(formData)
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length>0){
        return ;
    }
    try{
    const data= await registerUser(formData)
    setFormData({name:"",password:"",email:"",cnfrmpass:"" ,role:"user"})
    setErrors({})
navigate("/login")
    }catch(error){
        console.log(error.message)
    }
   }
  return (
    <div className='relative min-h-screen w-full  overflow-hidden '>
        <img src='/images/products/loginorg.png' alt="image" className='absolute h-full w-full object-cover '/>
            <div className='absolute  bg-white/50 shadow-3xl' ></div>

        <div className='relative z-10 min-h-screen flex items-center justify-center px-6 md:px-16'>
                    <div className='w-full max-w-md bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 '>

        <form onSubmit={handleSubmit} className='space-y-3'>
        <p>Name</p>
   <input className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]' type='text'name="name" value={formData.name} onChange={handler} />
   {errors.name &&<p className='text-red-500'>{errors.name}</p>}
   <p>Email</p>
   <input className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]' type="email" name="email" value={formData.email} onChange={handler}/>
   {errors.email  &&<p className='text-red-500'>{errors.email}</p>}
   <p>Password</p>
   <input className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]' type="password" name="password" value={formData.password} onChange={handler}/>
   {errors.password &&<p className='text-red-500'>{errors.password}</p>}
   <p>Confirm Password</p>
   <input className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]' type="password" name="cnfrmpass" value={formData.cnfrmpass} onChange={handler}/><br/>
   {errors.cnfrmpass && <p className='text-red-500 text-sm'>{errors.cnfrmpass}</p>}

   <button className="w-full bg-[#2F5D50] hover:bg-[#24493f] text-white py-3 rounded-lg transition" type="submit">Register</button>
   </form>
    </div>
    </div>
    </div>
  )
}

export default Register
