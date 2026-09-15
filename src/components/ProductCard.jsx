import React from 'react'
import {Heart} from "lucide-react"
import {motion} from "motion/react"
import { Link,useNavigate } from 'react-router-dom'
import {useSelector ,useDispatch} from "react-redux"
import { deletewishlist,addWishlist } from '../services/wishlistservice'
import { addToWishlist, removeFromWishlist } from '../redux/slice/wishlistSlice'
import { Star } from 'lucide-react'
import toast from "react-hot-toast"
function ProductCard({product}) {
const navigate=useNavigate()
const dispatch=useDispatch()
const user=useSelector((state)=>state.auth.user);
const wishlistItems=useSelector((state)=>state.wishlist.items)

const wishlistItem=wishlistItems.find((item)=>String(item.id)===String(product.id))
const isWishlisted=Boolean(wishlistItem)

const handleWishlistToggle=async(e)=>{
  e.stopPropagation();
  e.preventDefault()

  if(!user){
    navigate("/login")
      return
  }
  try{
    if(isWishlisted){
      await deletewishlist(wishlistItem.wishlistId);
      dispatch(removeFromWishlist(product.id))
      toast("Product removed from wishlist");
    }else{
      const saved=await addWishlist({userId:user.id,
        productId:String(product.id)
      });
      dispatch(addToWishlist({...product,wishlistId:saved.id}))
       toast.success("Product added to wishlist ❤️");
    }
  }catch(error){
    console.log("failed to update wishlist:",error)
  }
}
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
               <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow' onClick={handleWishlistToggle}>
                <Heart size={20} className={isWishlisted? "fill-red-500 text-red-500":"text-gray-400"}/></button>
               {/* stopPropagation is used to dont open productDetails when clicking image  */}

      </div>
    <h2 className="text-xl font-bold mt-4 truncate">{product.name}</h2>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
          <div className="flex items-center gap-1 text-sm text-gray-900">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
        </div>

        <p className="mt-1 text-sm text-gray-700 font-serif font-semibold line-clamp-2 text-left">
          {product.description}
        </p>

    </motion.div>
    </Link>
  )
}

export default ProductCard
