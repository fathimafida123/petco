import React,{useState} from 'react'
import { getUsers } from '../services/user services'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slice/authSlices'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/user services'
import { saveUser } from '../utils/localStorege'
function Login() {
    const[formData,setFormData]=useState({name:"",password:""})
    const dispatch=useDispatch()
    const [errors,setErrors]=useState("")
    const navigate=useNavigate()
    function handler(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }
const submitHandler=async(e)=>{
    e.preventDefault()
    setErrors("") //remove previous error
    try{
        const response=await getUsers()
       const data=response.data
       const user=data.find((user)=>user.password===formData.password && user.name===formData.name)

       if(!user){
        setErrors("invalid username or email")
        return;
       }
       saveUser(user.id)
       dispatch(loginSuccess(user))
       const login=await loginUser(formData)
       navigate("/")
    }catch(error){
        console.log("something went wrong")
    }
}

  return (
    <div>
        <form onSubmit={submitHandler}>
        <p>userName</p>
 <input className='border' type='text' value={formData.name} name='name' onChange={handler}/>
 <p>password</p>
 <input className='border' type="password" value={formData.password} name='password' onChange={handler}/>
 {errors &&(<p className='text-red-500'>{errors}</p>)}
 <button type='submit' className='border'>submit</button>
 <p>Don't have an account?{" "} <Link to="/register" className='text-blue-500' >please register</Link> </p>
 </form>
    </div>
  )
}

export default Login
