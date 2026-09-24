import React,{useState} from 'react'
import { getUsers } from '../services/user services'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slice/authSlices'
import { Link, useNavigate } from 'react-router-dom'
import { saveUser } from '../utils/localStorege'
function Login() {
    const[formData,setFormData]=useState({name:"",password:"",email:""})
    const dispatch=useDispatch()
    const [errors,setErrors]=useState("")
    const navigate=useNavigate()
    function handler(e){
        setFormData({...formData,[e.target.name]:e.target.value})
setErrors("")    
}

const submitHandler=async(e)=>{
    e.preventDefault()

    setErrors("") 

    try{
        const data=await getUsers()
        
       const user=data.find((user)=>user.password===formData.password &&
        user.name===formData.name  && user.email===formData.email)

       if(!user){
        setErrors("invalid username or password")
        return;
       }
       if(user.blocked){
        setErrors("your account is blocked")
        return
       }

       saveUser(user.id)

       dispatch(loginSuccess(user))

      if(user.role==="admin"){
        navigate("/admin");
      }else{
       navigate("/")
      }
    }catch(error){
        console.log("something went wrong",error)
         setErrors("Something went wrong. Please try again")
    }
}

  return (
    <div className='relative min-h-screen overflow-hidden  '>
        <img src="/images/products/loginorg.png" alt="image" className='absolute h-full w-full object-cover'/>
    <div className='absolute  bg-white/50 shadow-3xl' ></div>
    <div className='relative min-h-screen flex items-center justify-center px-6 md:px-16 '>
        <div className='w-full max-w-md bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 '>

        <h1 className='text-3xl font-bold text-[#2F5D50] text-center'> Welcome Back 🐾</h1>
         <p className="text-gray-500 text-center mt-2 mb-6">
            Login to your PETCO account
          </p>
        <form onSubmit={submitHandler} className='space-y-3'>
        <p className='mb-1'>userName</p>
 <input className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]' 
 type='text' value={formData.name} name='name' onChange={handler}/>
 <p className='mb-1'>Email</p>
 <input className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]'
  type="email" value={formData.email} name="email" onChange={handler}/>
   <p className='mb-1'>password</p>
 <input className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F5D50]"
 type="password" value={formData.password} name='password' onChange={handler}/>
 {errors &&(<p className='text-red-500 text-sm'>{errors}</p>)}
 <button type='submit'  className="w-full bg-gray-950 hover:bg-gray-900 text-white py-3 rounded-lg transition"
 >Login</button>
 <p>Don't have an account? <Link to="/register" className='text-blue-500' >please register</Link> </p>
 </form>
    </div>
    </div>
    </div>
  )
}

export default Login
