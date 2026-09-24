import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingBag,PawPrint
} from "lucide-react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/authSlices'
import { LogOut } from 'lucide-react'
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
function AdminSidebar() {
    const dispatch=useDispatch()
    const navigate =useNavigate()
    const handleLogout=()=>{
        dispatch(logout())
            toast.success("Logged out successfully!");
        navigate("/login")
    }
    const [message,setMessage]=useState(false)
  return (
   <aside className='fixed left-0 top-0 w-64 min-h-screen bg-gray-900 text-white p-5 '>
    
    <h1 className='flex  items-center gap-2 text-2xl font-bold mb-10'>PETCO<PawPrint size={28}/></h1>
   
    <nav className='flex flex-col gap-3 text-xl font-mono'>
        <Link to="/admin" className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10'>
        <LayoutDashboard size={20} />Dashboard</Link>
        <Link to="/admin/products" className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10'>
        <Package size={20}/>Products</Link>
        <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10">
        <Users size={20}/>Users</Link>
        <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10">
        <ShoppingBag size={20}/>Orders</Link>
        <button  onClick={()=>setMessage(true)} className="flex items-center gap-3 w-full px-4 py-3
         text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut size={20}/>LogOut</button>

           
    </nav>
 <ConfirmationModal
  show={message}
  title="Are you sure?"
  message="Do you want to logout?"
  onCancel={() => setMessage(false)}
  onConfirm={handleLogout}
  confirmText="Logout"
/>
   </aside>
  )
}

export default AdminSidebar
