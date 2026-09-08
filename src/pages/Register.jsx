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
    <div>
        <form onSubmit={handleSubmit}>
        <p>Name</p>
   <input className='border' type='text'name="name" value={formData.name} onChange={handler} />
   {errors.name &&<p className='text-red-500'>{errors.name}</p>}
   <p>Email</p>
   <input className='border' type="email" name="email" value={formData.email} onChange={handler}/>
   {errors.email  &&<p className='text-red-500'>{errors.email}</p>}
   <p>Password</p>
   <input className='border' type="password" name="password" value={formData.password} onChange={handler}/>
   {errors.password &&<p className='text-red-500'>{errors.password}</p>}
   <p>Confirm Password</p>
   <input className='border' type="password" name="cnfrmpass" value={formData.cnfrmpass} onChange={handler}/><br/>
   {errors.cnfrmpass && <p className='text-red-500'>{errors.cnfrmpass}</p>}

   <button className='border' type="submit">Register</button>
   </form>
    </div>
  )
}

export default Register
