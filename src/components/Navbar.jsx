import React from 'react'
import { Link } from 'react-router-dom'
import{Heart,ShoppingCart,User,Home,Package,ClipboardList,PawPrint,Search} from "lucide-react"
function Navbar() {
  return (
    
      <nav className='h-20 lg:px-8 sm:px-6 px-4 flex items-center justify-between bg-white sticky top-0 z-50 '>
        <div className='flex items-center gap-7'> 
  <Link to="/" className='text-3xl font-bold text-[#2F5D50] flex items-center gap-2'>PETCO<PawPrint/></Link>

            <div className="hidden md:flex items-center gap-2 border rounded-full px-4 py-2">
               <Search size={20}/> <input type="text" placeholder='search products...' className='w-40 lg:-64 xl:w-80 outline-none'/></div>
</div>
  <div className='hidden lg:flex items-center gap-6'>
    <Link to="/" className='flex items-center gap-2 hover:text-gray-500'><Home size={18} />Home</Link>
    <Link to="/product" className='flex items-center gap-2  hover:text-gray-500'>< Package size={18}/>Products</Link>
    <Link to="/wishlist" className='flex items-center gap-2  hover:text-gray-500'><Heart/></Link>
    <Link to="/cart" className='flex items-center gap-2  hover:text-gray-500'><ShoppingCart/></Link>
    <Link to="/orders" className='flex items-center gap-2  hover:text-gray-500'><ClipboardList/></Link>
    <Link to="/login" className='flex items-center gap-2  hover:text-gray-500' ><User/></Link>
  </div>
      </nav>
  )
}

export default Navbar
