import React from 'react'

function ProductGrid({products}) {
  return (
    <div>
       <div className='grid grid-cols-3 md:grid-cols-4 gap-4 mt-8'>
      {products.map((item)=>(
        <div key={item.id} className='border rounded-xl p-4 bg-white/50 text-center' >
          <img src={item.image} alt={item.name} className='w-full h-60 object-cover rounded-lg'/>
          <h2 className='text-xl font-bold mt-4'>{item.name}</h2>
          <p className= "text-lg font-bold text-[#161818]">₹{item.price}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default ProductGrid
