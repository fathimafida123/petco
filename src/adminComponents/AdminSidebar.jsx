import React from 'react'
import {Link} from "react-router-dom"
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingBag,PawPrint
} from "lucide-react"
function AdminSidebar() {
  return (
   <aside className='fixed left-0 top-0 w-64 min-h-screen bg-[#2F5D50] text-white p-5 '>
    
    <h1 className='flex  items-center gap-2 text-2xl font-bold mb-10'>PETCO<PawPrint size={28}/></h1>
   
    <nav className='flex flex-col gap-3'>
        <Link to="/admin" className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10'>
        <LayoutDashboard size={20} />Dashboard</Link>
        <Link to="/admin/products" className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10'>
        <Package size={20}/>Products</Link>
        <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10">
        <Users size={20}/>Users</Link>
        <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10">
        <ShoppingBag size={20}/>Orders</Link>
    </nav>
   </aside>
  )
}

export default AdminSidebar
