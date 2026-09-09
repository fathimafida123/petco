import React from 'react'
import {Heart} from "lucide-react"
import { useState } from 'react'
import {motion} from "motion/react"
import { Link } from 'react-router-dom'
function ProductCard({product}) {
  const [like,setLike]=useState(false)
  return (
    <Link  to={`/product/${product.id}`}>
    <motion.div initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    whileHover={{y:-8,scale:1.02}}
    transition={{duration:0.4}}
    className='border rounded-xl p-4 bg-white/50 text-center hover:shadow-2xl'>
      {/* hover:-translate-y-3 hover:shadow-2xl Card moves up when you hover */}

      <div className='relative'>
      <img src={product.image} alt={product.name} className='w-full h-60 object-cover rounded-lg'/>
               <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow' onClick={(e)=>{e.stopPropagation();e.preventDefault();setLike(!like)}}>
                <Heart size={20} className={like? "fill-red-500 text-red-500":"text-gray-400"}/></button>
               {/* stopPropagation is used to dont open productDetails when clicking image  */}

      </div>
      <h2 className='text-xl font-bold mt-4'>{product.name}</h2> 
           <div>
        <p className='text-lg font-bold text-[#2F5D50]'>₹{product.price}</p>
     
      </div>

    </motion.div>
    </Link>
  )
}

export default ProductCard
