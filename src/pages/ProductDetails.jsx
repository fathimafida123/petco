// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { getProducts } from '../services/product services'
// import ProductCard from '../components/ProductCard'

// function ProductDetails() {
//   const {id}=useParams()
//   const{data:products=[],isLoading,error}=useQuery({
//     queryKey:["products"],
//     queryFn:getProducts
//   })
//   if(isLoading){
//     return <h2>loading</h2>
//   }
//   if(error){
//    return <h2>failed to load product</h2>
//   }
// //find clicked product
//   const product=products.find((item)=>String(item.id)===String(id))
//   if(!product){
//    return <h2>oroduct not found</h2>
//   }

//   //find product from same category

//   const relatedProducts=products.filter((item)=>item.category===product.category && String(item.id)!==String(products.id))
//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
//       <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p- md:p-10'>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-2 bg-amber-200 p-8'>
//           <div className='flex items-center justify=center'>
//    <img src={product.image} alt={product.name} className=' max-w-lg h-[400px] object-cover rounded-xl' />
//    </div>
//    <div className='flex flex-col justify-center mr-9'>
//     <p className='text-sm uppercase tracking-widest text-[#2F5D50] font-semibold'>{product.category}</p>
//     <h1 className='text-4xl font-bold mt-3 text-gray-800'>{product.name}</h1>
//     <p className='text-3xl font-bold text-[#2F5D50] mt-5'>₹{product.price}</p>
//     <p className='text-gray-600 text-lg mt-5 leading-relaxed'>{product.description}</p>

//     <div className='mt-5'>
//       <span className='text-yellow-500 text-2xl' >★★★★★</span>
//       <span className='text-xl'>{product.rating}</span>

//       {/* stock */}
//       <p className='mt-4 font-semibold'>
//         {product.stock > 0 ?(<span> Stock ({product.stock})</span>):(<span className='text-red-500'>Out of stock</span>)}
//       </p>
//  <div className="mt-6 flex items-center gap-4">
//               <button className="w-10 h-10 border rounded-lg text-xl">
//                 -
//               </button>

//               <span className="text-xl font-semibold">
//                 1
//               </span>

//               <button className="w-10 h-10 border rounded-lg text-xl">
//                 +
//               </button>
//             </div>
//  <button
//               disabled={product.stock === 0}
//               className="mt-7 bg-[#2F5D50] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-[#244a40] transition disabled:bg-gray-400"
//             >
//               Add to Cart
//             </button>
//     </div>
//     </div>
// </div>
//   {/* RELATED PRODUCTS */}
//       {relatedProducts.length > 0 && (
//         <section className="max-w-7xl mx-auto mt-16 bg-gray-700/50">

//           <div className="text-center mb-10">
//             <p className="text-sm uppercase tracking-[4px] text-[#2F5D50] font-semibold">
//               You May Also Like
//             </p>

//             <h2 className="text-4xl font-serif font-bold text-gray-800 mt-3">
//               Related Products
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((item) => (
//               <ProductCard
//                 key={item.id}
//                 product={item}
//               />
//             ))}
//           </div>

//         </section>
//       )}


//       </div>
      
//     </div>
//   )
// }

// export default ProductDetails
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product services";
import ProductCard from "../components/ProductCard";
import {useDispatch,useSelector} from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

function ProductDetails() {
  const { id } = useParams();
const dispatch=useDispatch()
const cartitems=useSelector((state)=>state.cart.items)
console.log(cartitems)
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

  return (
    <div className="min-h-screen bg-olive-500/50 py-12 px-4 sm:px-6">

      {/* PRODUCT DETAILS */}
      <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-6 md:p-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#4e6070]/50 p-6 rounded-xl">

          {/* PRODUCT IMAGE */}
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

              <button className="w-9 h-9 border rounded-lg text-xl">
                -
              </button>

              <span className="font-semibold">
                1
              </span>

              <button className="w-9 h-9 border rounded-lg text-xl">
                +
              </button>

            </div>

            {/* ADD TO CART */}
            <button
              disabled={product.stock === 0}
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
              onClick={()=>dispatch(addToCart(product))}
            >
              Add to Cart
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