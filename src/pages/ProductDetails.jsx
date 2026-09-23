
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
    (item) =>{
      if(String(item.id)===String(product.id)){
        return false
      }
      const productCategories=Array.isArray(product.category)
      ?product.category:[product.category];

      const itemCategories=Array.isArray(item.category)?
      item.category:[item.category]

      return productCategories.some((category)=>
      itemCategories.some((itemCategory)=>itemCategory && category &&
       itemCategory.toLowerCase()===category.toLowerCase()))
    }
     

      
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

return (
  <div className="min-h-screen bg-[#F8F5EC] py-10 px-4 sm:px-6 lg:px-8">

    {/* PRODUCT DETAILS */}
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* PRODUCT IMAGE */}
          <div className="bg-[#E8F0ED] flex items-center justify-center p-8 md:p-12">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-[380px] object-contain rounded-xl"
              />
            </div>

          </div>


          {/* PRODUCT INFORMATION */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* CATEGORY */}
            <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-[#E8F0ED] text-[#2F5D50] text-sm font-semibold uppercase tracking-wide">
              {product.category}
            </span>


            {/* NAME */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-5">
              {product.name}
            </h1>


            {/* RATING */}
            <div className="flex items-center gap-2 mt-4">

              <div className="text-yellow-400 text-lg">
                ★★★★★
              </div>

              <span className="text-gray-500 text-sm">
                {product.rating} rating
              </span>

            </div>


            {/* PRICE */}
            <div className="mt-6">

              <span className="text-3xl font-bold text-[#2F5D50]">
                ₹{product.price}
              </span>

            </div>


            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-7 mt-5">
              {product.description}
            </p>


            {/* STOCK */}
            <div className="mt-6">

              {product.stock > 0 ? (
                <div className="flex items-center gap-2">

                  <span className="w-3 h-3 rounded-full bg-green-500"></span>

                  <span className="text-green-700 font-semibold">
                    In Stock
                  </span>

                  <span className="text-gray-500 text-sm">
                    ({product.stock} available)
                  </span>

                </div>
              ) : (
                <div className="flex items-center gap-2">

                  <span className="w-3 h-3 rounded-full bg-red-500"></span>

                  <span className="text-red-500 font-semibold">
                    Out of Stock
                  </span>

                </div>
              )}

            </div>


            {/* QUANTITY */}
            {product.stock > 0 && (
              <div className="mt-7">

                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </p>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      setCount((prev) => prev - 1)
                    }
                    disabled={count === 1}
                    className="w-10 h-10 rounded-lg bg-[#2F5D50] text-white text-xl hover:bg-[#244A40] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    -
                  </button>

                  <span className="w-8 text-center text-lg font-semibold">
                    {count}
                  </span>

                  <button
                    onClick={() =>
                      setCount((prev) => prev + 1)
                    }
                    disabled={count === product.stock}
                    className="w-10 h-10 rounded-lg bg-[#2F5D50] text-white text-xl hover:bg-[#244A40] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    +
                  </button>

                </div>

              </div>
            )}


            {/* ADD TO CART */}
            <button
              type="button"
              disabled={product.stock === 0 || isAdding}
              onClick={handletocart}
              className="mt-8 w-full md:w-fit px-10 py-3.5 rounded-xl bg-[#2F5D50] text-white font-semibold hover:bg-[#244A40] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>

          </div>

        </div>

      </div>


      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">

          {/* SECTION HEADING */}
          <div className="text-center mb-10">

            <p className="text-sm uppercase tracking-[4px] text-[#2F5D50] font-semibold">
              You May Also Like
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Related Products
            </h2>

            <p className="text-gray-500 mt-2">
              More products you might love
            </p>

          </div>


          {/* PRODUCTS */}
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
export default ProductDetails 