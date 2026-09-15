import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product services";
import ProductCard from "../components/ProductCard";
import { ChevronLeft,ChevronRight } from "lucide-react";
import { useRef } from "react";
function Home() {

  const{data:products=[],isLoading}=useQuery({
    queryKey:["products"],
    queryFn:getProducts,
  });

  const featuredProducts=[...products].sort((a,b)=>b.rating-a.rating)
  .slice(0,8)

  const scrollRef=useRef(null)
  const scroll=(direction)=>{
    if(!scrollRef.current)return;
    const amount=direction==="left"? -320 :320;
    scrollRef.current.scrollBy({left:amount,behavior:"smooth"})
   }
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">

        {/* Hero Image */}
        <img
          src="/images/hero.png"
          alt="Cat and dog"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
         <h1
          className="
            absolute
            inset-0
            font-styl
            flex
            text-center pl-85 
            text-[18vw]
            font-black
            tracking-widest
            text-white/65
            select-none
            pointer-events-none
            z-10
          "
        >
          PETCO
        </h1>
        <img src="/images/hero-2.png" className="absolute inset-0 w-full h-full object-cover z-20  " />
        {/* Brown transparent overlay */}
        <div className="absolute inset-0 bg-[rgba(80,50,25,0.15)] z-20"></div>
        <div className="relative z-30  min-h-[calc(100vh-80px)] px-8">
        <h2 className="font-serif font-bold leading-relaxed tracking-wide size text-3xl pt-70 pl-15 text-white"><br/>Treat <br/>Your Pet <br/>Like Royalty</h2>
        {/* Big PETCO background text */}
       
         <Link
              to="/product"
              className="
                inline-block
                bg-white
                text-blue-500
                px-8
                py-4
                rounded-full
                font-semibold
                hover:bg-white/60
                transition  ml-40 
              "
            >
              Shop Now
            </Link>
            </div>
            </section>




<section className="bg-[#4e6070] min-h-[600px] py-16  sm:px-6">
  <div className="flex flex-col items-center justify-center pl-7">
    <h2 className="text-white font-bold text-5xl mt-6 ">Explore PETCO</h2><br/>
    <h2 className="text-gray-700 text-3xl font-serif">Shop by category</h2><br/>
    <p className="text-gray-200 text-2xl font-bold mb-7"> Find everything your pet needs in one place.</p>
  </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">

      <div className="w-60 h-70  bg-white/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-3
    hover:shadow-2xl">
      <Link to="/product?category=cats" >
<div className="w-[200px] h-[200px] overflow-hidden rounded-xl ">
<img src="/images/cat2.jpg "className="w-full h-full object-cover transition-transform duration-500  hover:scale-110"  />
</div><h1 className="text-xl font-bold text-gray-900 text-center">Cat</h1>
<p className="text-blue-950 font-serif" >Everything your cat need..</p>
</Link>
</div>

<div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<Link to="/product?category=dogs"><div className="w-[200px] h-[200px] overflow-hidden rounded-2xl  ">
<img src="/images/dog.jpg" alt="dog" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
</div><h2 className="text-xl font-bold text-gray-900 text-center">Dog</h2>
<p className="text-blue-950 font-serif text-center">for your furry friend</p>
</Link>
</div>

<div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<Link to="/product?category=food">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl">
<img src="/images/food2.jpg" alt="food" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /></div>
<h2 className="text-xl font-bold text-gray-900 text-center">Food</h2><p className="text-blue-950 font-serif text-center">Healthy meals for your pet</p>
 </Link> </div>

  <div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
      <Link to="/product?category=accessories">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl ">
<img src="/images/accessories.jpg" alt="accessories" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"/></div>
<h2 className="text-xl font-bold text-gray-900 text-center">Accessories</h2><p className="text-blue-950 font-serif text-center">Style,Comfort&fun</p>
</Link></div>

<div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
      <Link to="/product?category=grooming">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl">
<img src="/images/groom.jpg"className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"/></div>
<h2 className="text-xl font-bold text-gray-900 text-center">Grooming</h2>
<p className="text-blue-950 font-serif text-center">Fresh,Clean&Happy</p></Link>
</div>
</div>
</section>

  
         <section className="bg-gray-500/50 py-16 px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-5xl sm:text-4xl md:text-6xl font-extrabold tracking-wide font-serif">Featured Products</h2>
            <p className="text-2xl text-sm uppercase tracking-[4px] font-semibold">Our top picks for your pets</p>

   {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="relative m-6 ">
            {/* left arrow */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronLeft size={22} />
            </button>

            {/* scrollable row */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="snap-start shrink-0 w-64 sm:w-72">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* right arrow */}
            <button
              type="button"
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/product"
            className="inline-block bg-[#2F5D50] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#244a40] transition"
          >
            View All Products
          </Link>
        </div>
        </div>
      </section>
        

          
         <section className="bg-gray-400/50 py-20 px-9 sm:px-6 ">
             <div className="text-center">
            <p className="text-5xl sm:text-4xl md:text-6xl font-extrabold tracking-wide font-serif">HAPPY PET PARENTS</p>
            <p className="text-2xl text-sm uppercase tracking-[4px] font-semibold">What out Customer Say</p>
            <div className="max-w-5xlmx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-gray-200/50  rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full h-72 overflow-hidden" >
            <img src="\images\products\happy customer.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
            </div>
            <p className="text-yellow-500 text-3xl">★★★★★</p>
            <p className="text-xl  font-semibold font-serif text-gray-600" >my pet absolutely loves the products!</p>
            <p className="font-bold mt-3 text-[#26332F]">Happy pet parent</p>
           
            </div>
            <div className="bg-gray-200/50  rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-hidden w-full h-72">
            <img src="/images/products/happy-custo2.png" className="w-full h-full object-cover transition-transfrom duration-500 hover:scale-105 "/>
            </div>
            <div>
              <p className="text-yellow-500 text-3xl">★★★★★</p>
              <p className="text-xl font-semibold font-serif text-gray-600">Greate quality and my dog enjoys everything</p>
              <p className="font-bold mt-3 text-[#26332F]">happy pet parent </p>
            </div>
            </div>
                       
 <div className="bg-gray-200/50  rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-hidden w-full h-72">
            <img src="/images/products/happy-cust3.png" className="w-full h-full object-cover transition-transfrom duration-500 hover:scale-105 "/>
            </div>
            <div>
              <p className="text-yellow-500 text-3xl">★★★★★</p>
              <p className="text-xl font-semibold font-serif text-gray-600">PETCO has everything my pet needs!</p>
              <p className="font-bold mt-3 text-[#26332F]">happy pet parent </p>
            </div>
            </div>
             
            </div> 
             </div>
         </section>

</div>

  );
}

export default Home;