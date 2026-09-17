
import React,{useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product services";
import ProductCard from "../components/ProductCard";
import {useDispatch,useSelector} from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import { addCart } from "../services/cartService";
import toast from "react-hot-toast"

function ProductDetails() {
  const [count,setCount]=useState(1)
  const { id } = useParams();
const dispatch=useDispatch()
const user=useSelector((state)=>state.auth.user)
console.log("logged",user)
const [isAdding,setIsAdding]=useState(false)

const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,

  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Failed to load product</h2>;
  }

  // Find clicked product
  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return <h2>Product not found</h2>;
  }

  // Find products from same category
  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      String(item.id) !== String(product.id)

      
  );

 
const handletocart = async () => {

  if (!user) {
    navigate("/login");
    return;
  }
 if(isAdding) return

 setIsAdding(true);
 try{
  const cartData = {
    userId: user.id,
    productId: String(product.id),
    quantity:Number(count)
  };

// Save to database and get the saved cart item
  const saveCart = await addCart(cartData);
  dispatch(addToCart({
    ...product,
    cartId:saveCart.id,
    quantity:Number(saveCart.quantity)
  }));
}finally{
  setIsAdding(false)
}
};

const handleBuyNow=()=>{
  if(!user){
    navigate("/login");
    return;
  }
  navigate("/checkout",{
    state:{
      buyNowItem:{
        ...product,
        quantity:Number(count),
      },
    },
  });

};

  return (
    <div className="min-h-screen bg-olive-500/50 py-12 px-4 sm:px-6">

      <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-6 md:p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#4e6070]/50 p-6 rounded-xl">

          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-75 h-90 object-cover rounded-2xl"
            />
          </div>

          <div className="flex flex-col justify-center">

            <p className="text-sm uppercase tracking-widest text-[#2F5D50] font-semibold">
              {product.category}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-[#2F5D50] mt-4">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            <div className="mt-4">
              <span className="text-yellow-500 text-xl">
                ★★★★★
              </span>

              <span className="ml-2 text-gray-700">
                {product.rating}
              </span>
            </div>

            {/* STOCK */}
            <p className="mt-3 font-semibold">
              {product.stock > 0 ? (
                <span>Stock: {product.stock}</span>
              ) : (
                <span className="text-red-500">
                  Out of stock
                </span>
              )}
            </p>

            {/* QUANTITY */}
            <div className="mt-5 flex items-center gap-4">

              <button className="w-9 h-9 border rounded-lg text-xl bg-[#2F5D50] text-white" 
              onClick={()=>setCount((prev)=>prev-1)} disabled={count===1}>
                -
              </button>

              <span className="font-semibold">
                {count}
              </span>

              <button className="w-9 h-9 border rounded-lg text-xl bg-[#2F5D50] text-white"
               onClick={()=>setCount((prev)=>prev+1)} disabled={count===product.stock}>
                +
              </button>

            </div>

            {/* ADD TO CART */}
            <button
            type="button"
              disabled={product.stock === 0||isAdding}
              className="
                mt-6
                bg-[#2F5D50]
                text-white
                py-3
                px-6
                rounded-xl
                font-semibold
                hover:bg-[#244a40]
                transition
                disabled:bg-gray-400
              "
              
              onClick={handletocart} 
            >
  {isAdding ? "Adding..." : "Add to Cart"}

            </button>
            <button
  type="button"
  disabled={product.stock === 0}
  className="
    mt-3
    border-2 border-[#2F5D50]
    text-[#2F5D50]
    py-3
    px-6
    rounded-xl
    font-semibold
    hover:bg-[#2F5D50] hover:text-white
    transition
  "
  onClick={handleBuyNow}
>
  Buy Now
</button>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 bg-[#4e6070]/50 rounded-2xl p-4">

            <div className="text-center mb-8">

              <p className="text-sm uppercase tracking-[4px] text-[#2F5D50] font-semibold">
                You May Also Like
              </p>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mt-2">
                Related Products
              </h2>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}

            </div>

          </section>
        )}

      </div>
    </div>
  );
}

export default ProductDetails;