import { getwishlist } from "../services/wishlistservice";
import { getProducts } from "../services/product services";
import { setWishlist } from "../redux/slice/wishlistSlice";

export const loadUserWishlist= async(userId,dispatch)=>{
    if(!userId) return

    try{
        const products=await getProducts();
        const wishlistData=await getwishlist(userId)
        const completeWishlist=[]

        wishlistData.forEach((wishItem)=>{
            const product=products.find((
                product)=>String(product.id)===String(wishItem.productId))
                        if(!product) return;

        completeWishlist.push({
            ...product,
            wishlistId:wishItem.id
        })
        })
         dispatch(setWishlist(completeWishlist));
  } catch (error) {
    console.log("Failed to load wishlist:", error);
  }

    }
