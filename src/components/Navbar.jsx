import React from 'react'
import { Link } from 'react-router-dom'
import{Heart,ShoppingCart,User,Home,Package,ClipboardList,PawPrint,Search} from "lucide-react"
function Navbar() {
  return (
    
      <nav className='h-20 px-8 flex items-center justify-between bg-white'>
        <div className='flex items-center gap-7'> 
  <Link to="/" className='text-3xl font-bold text-[#2F5D50] flex items-center gap-2'>PETCO<PawPrint/></Link>

            <div className="flex items-center gap-2 border rounded-full px-4 py-2"> <Search size={20}/> <input type="text" placeholder='search products...' className='w-100 outline-none'/></div>
</div>
  <div className='flex gap-15'>
    <Link to="/" className='flex items-center gap-2'><Home size={18} />Home</Link>
    <Link to="/product" className='flex items-center gap-2'>< Package size={18}/>Products</Link>
    <Link to="/wishlist" className='flex items-center gap-2'><Heart/>Wishlist</Link>
    <Link to="/cart" className='flex items-center gap-2'><ShoppingCart/>Cart</Link>
    <Link to="/orders" className='flex items-center gap-2'><ClipboardList/>Orders</Link>
    <Link to="" className='flex items-center gap-2' ><User/>Profile</Link>
  </div>
      </nav>
  )
}

export default Navbar
