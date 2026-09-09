// import React from 'react'
// import { Link } from 'react-router-dom'
// import{Heart,ShoppingCart,User,Home,Package,ClipboardList,PawPrint,Search} from "lucide-react"
// function Navbar() {
//   return (
    
// //       <nav className='h-20 lg:px-8 sm:px-6 px-4 flex items-center justify-between bg-white sticky top-0 z-50 '>
// //         <div className='flex items-center gap-7'> 
// //   <Link to="/" className='text-3xl font-bold text-[#2F5D50] flex items-center gap-2'>PETCO<PawPrint/></Link>

// //             <div className="flex items-center gap-2 border rounded-full px-4 py-2">
// //                <Search size={20}/> <input type="text" placeholder='search products...' className='w-40 lg:-64 xl:w-80 outline-none'/></div>
// // </div>
// //   <div className='flex items-center gap-6'>
// //     <Link to="/" className='flex items-center gap-2 hover:text-gray-500'><Home size={18} />Home</Link>
// //     <Link to="/product" className='flex items-center gap-2  hover:text-gray-500'>< Package size={18}/>Products</Link>
// //     <Link to="/wishlist" className='flex items-center gap-2  hover:text-gray-500'><Heart/></Link>
// //     <Link to="/cart" className='flex items-center gap-2  hover:text-gray-500'><ShoppingCart/></Link>
// //     <Link to="/orders" className='flex items-center gap-2  hover:text-gray-500'><ClipboardList/></Link>
// //     <Link to="/login" className='flex items-center gap-2  hover:text-gray-500' ><User/></Link>
// //   </div>
// //       </nav>
//    <nav className='h-20 lg:px-8 sm:px-6 px-4 flex items-center justify-between bg-white sticky top-0 z-50 '>
//         <div className='flex  items-center gap-50'> 
//           <div>
//   <Link to="/" className='text-3xl font-bold text-[#2F5D50] flex items-center gap-2'>PETCO<PawPrint/></Link></div>
//   <div className='flex items-center gap-5'>
//     <Link to="/" className='flex items-center gap-2 hover:text-gray-500'>Home</Link>
//     <Link to="/product" className='flex items-center gap-2  hover:text-gray-500'>Products</Link>
//     <Link to="/about"className='flex items-center gap-2  hover:text-gray-500'>About</Link>
//     <Link to="/contact" className='flex items-center gap-2  hover:text-gray-500'>Contact</Link>

//     </div>

            
// </div>
//   <div className='flex items-center gap-6'>
//      <div className="flex items-center gap-2 border rounded-full px-4 py-2">
//                <Search size={20}/> <input type="text" placeholder='search products...' className='w-40 lg:-64 xl:w-80 outline-none'/></div>

//                    <Link to="/wishlist" className='flex items-center gap-2  hover:text-gray-500'><Heart/></Link>
//     <Link to="/cart" className='flex items-center gap-2  hover:text-gray-500'><ShoppingCart/></Link>
//     <Link to="/orders" className='flex items-center gap-2  hover:text-gray-500'><ClipboardList/></Link>
//     <Link to="/login" className='flex items-center gap-2  hover:text-gray-500' ><User/></Link>
//   </div>
//       </nav>
//   )
// }

// export default Navbar

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  ClipboardList,
  PawPrint,
  Menu,
  X,
  Search
} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50">

      <div className="h-20 px-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#2F5D50] flex items-center gap-2"
        >
          PETCO
          <PawPrint />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link key={link.name} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
        {/* Search */}
<div className="flex items-center gap-2 border rounded-full px-4 py-2">
  <Search size={20} />

  <input
    type="text"
    placeholder="Search products..."
    className="w-40 lg:w-64 xl:w-80 outline-none"
  />
</div>

        {/* Icons */}
        <div className="hidden md:flex gap-5">
          <Link to="/wishlist"><Heart /></Link>
          <Link to="/cart"><ShoppingCart /></Link>
          <Link to="/orders"><ClipboardList /></Link>
          <Link to="/login"><User /></Link>
        </div>

        {/* 3 lines */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden flex flex-col gap-5 px-6 pb-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
    
      )}

    </nav>
  );
}

export default Navbar;