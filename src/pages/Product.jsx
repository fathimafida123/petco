import React from 'react'
import { getProducts } from '../services/product services'
import { useQuery } from '@tanstack/react-query'
import { PawPrint } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { useSearchParams } from 'react-router-dom';
function Product() {
const[searchParams]=useSearchParams();
const category=searchParams.get("category");
const search=searchParams.get("search")

  const {data:products=[],isLoading,error}=useQuery({
    queryKey:["products"],
    queryFn:getProducts
  });
  if(isLoading){
    return<h2>Loading products...</h2>
  }
  if(error){
    return<h2>failed to load products</h2>
  }
  const filteredProducts=products.filter((product)=>{const categoryMatch=
    !category|| 
    product.category.toLowerCase()===category.toLowerCase();
    const searchMatch=
     !search||
     product.name.toLowerCase().includes(search.toLowerCase())
    return categoryMatch && searchMatch
  })
  return (
    <div className='p-8 bg-gray-500/50' >
     <div className='flex  gap-2'> <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#26332F]">PETCO</span><PawPrint size={35}/></div>


     {filteredProducts.length===0?(<div className='text-center'>
      <h2 className='text-2xl font-bold text-gray-600'>No products found </h2></div>):
     (<ProductGrid  products={filteredProducts}/>
)}
     </div>
  )
}

export default Product
