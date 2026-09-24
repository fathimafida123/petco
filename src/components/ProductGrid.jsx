import React from 'react'
import ProductCard from "./ProductCard"
function ProductGrid({products}) {
  return (
    <div className=" min-h-screen px-6 py-8">
       <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
      {products.map((product)=>(
        <ProductCard key={product.id} product={product}/>
  ))}
    </div>
    </div>
  )
}

export default ProductGrid
