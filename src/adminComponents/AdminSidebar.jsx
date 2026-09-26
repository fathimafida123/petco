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
import { NavLink } from 'react-router-dom'
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
   <aside style={{
  background:
    "radial-gradient(circle at 70% 0%, rgb(218, 203, 246) 10%, rgb(192, 192, 245) 66.9%, rgb(186, 190, 245) 10%)"
}} className='fixed left-0 top-0 w-64 min-h-screen text-black p-5 '>
    <div className=" min-h-screen flex flex-col ">
    <h1 className='flex  items-center gap-2 text-2xl font-bold mb-10'>PETCO<PawPrint size={28}/></h1>

    <nav className="flex flex-col gap-3 text-xl font-serif flex-1">

  <NavLink
    to="/admin"
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${isActive
        ? "bg-white text-[#006A71] font-semibold shadow-sm"
        : "text-black hover:bg-white/10"
      }`
    }
  >
    <LayoutDashboard size={20} />
    Dashboard
  </NavLink>


  <NavLink
    to="/admin/products"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${isActive
        ? "bg-white text-[#006A71] font-semibold shadow-sm"
        : "text-black hover:bg-white/10"
      }`
    }
    
  >
    <Package size={20} />
    Products
  </NavLink>


  <NavLink
    to="/admin/users"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${isActive
        ? "bg-white text-[#006A71] font-semibold shadow-sm"
        : "text-black hover:bg-white/10"
      }`
    }
  >
    <Users size={20} />
    Users
  </NavLink>


  <NavLink
    to="/admin/orders"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${isActive
        ? "bg-white text-[#006A71] font-semibold shadow-sm"
        : "text-black hover:bg-white/10"
      }`
    }
  >
    <ShoppingBag size={20} />
    Orders
  </NavLink>
    
        <button  onClick={()=>setMessage(true)} className="mt-auto mb-10 flex items-center gap-3  px-4 py-3 w-[90%] 
         text-red-600 hover:bg-red-50 rounded-lg transition bg-white ">
            <LogOut size={20}/>LogOut</button>
</nav>
</div>
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
