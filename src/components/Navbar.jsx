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
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlices";
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
const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const[search,setSearch]=useState("")
  const navigate=useNavigate()
 const [showProfile,setShowProfile]=useState(false)
const user=useSelector((state)=>state.auth.user)
  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const icons=[
    {name:"wishlist",path:"/wishlist",icon:<Heart size={20}/>},
    {name:"cart" ,path:"/cart",icon:<ShoppingCart size={20}/>},
    {name:"orders",path:"/orders",icon:<ClipboardList size={20}/>},
  ]
function handler(e){
  setSearch(e.target.value)
  if(e.target.value.trim()!==" "){
  navigate(`/product?search=${e.target.value}`)
  }else{
    navigate("/product")
  }

  }
    const handleLogout=()=>{
    dispatch(logout())
    setShowProfile(false)
    navigate("/login")
}
  return (
    <nav className="bg-white sticky top-0 z-50">

      <div className="h-20 px-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-[#2F5D50] flex items-center gap-2"
        >
          PETCO
          <PawPrint />
        </Link>

   
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link key={link.name} to={link.path}>
              {link.name}
            </Link>
          ))}
        </div>
<div className="flex items-center gap-2 border rounded-full px-4 py-2">
  <Search size={20} />

  <input
    type="text"
    placeholder="Search products..." onChange={handler} value={search}
    className="w-40 lg:w-64 xl:w-80 outline-none"
  />
</div>

        {/* Icons */}
        {/* <div className="hidden md:flex gap-5">
          <Link to="/wishlist"><Heart /></Link>
          <Link to="/cart"><ShoppingCart /></Link>
          <Link to="/orders"><ClipboardList /></Link>
          <Link to="/login"><User /></Link>
        </div> */} 
        <div className="hidden md:flex gap-5">
          {icons.map((item)=>(
            <Link to={item.path} key={item.name} className="hover:text-[#2F5D50]">
              {item.icon}
            </Link>
          ))}
        </div>
        
        <div className="relative">
         <button type="button" onClick={()=>setShowProfile(!showProfile)}
          className="hover:text-[#2F5D50]"><User size={20}/>
         </button>

         {showProfile && (<div className=" bg-white absolute right-0 top-8 w-44 border rounded-lg shadow-lg p-3"> 
          {user&&(<p className="text-sm text-gray-600 px-2 py-2">
            Hi,{user?.name}
          </p>)}
          <button type="button" onClick={handleLogout} className="w-full text-left px-2 py-2 rounded hover:bg-gray-100">Logout</button>
         </div>)}
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

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
          {icons.map((item)=>(
            <Link to={item.path} 
            key={item.name} onClick={()=>setOpen(false)}
            className="flex item-center gap-3">
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
    
      )}

    </nav>
  );
}

export default Navbar;