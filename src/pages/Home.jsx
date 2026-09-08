import React from "react";
import { Link } from "react-router-dom";

function Home() {
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
            items-center pl-60 pb-90
            text-[18vw]
            font-black
            tracking-widest
            text-white/30
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
<section className="bg-[#4e6070] h-[600px]">
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-white font-bold text-5xl mt-7 ">Explore PETCO</h2><br/>
    <h2 className="text-gray-700 text-3xl font-serif">Shop by category</h2><br/>
    <p className="text-gray-200 text-2xl font-bold"> Find everything your pet needs in one place.</p>
  </div>
    <div className="flex flex-row gap-13 m-10">
      <div className="w-60 h-70  bg-white/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-3
    hover:shadow-2xl">
<div className="w-[200px] h-[200px] overflow-hidden rounded-xl ">
<img src="/images/cat2.jpg "className="w-full h-full object-cover transition-transform duration-500  hover:scale-110"  />
</div><Link to="/product"><h1 className="text-xl font-bold text-gray-900 text-center">Cat</h1><p className="text-blue-950 font-serif" >Everything your cat need..</p></Link>
</div>
<div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl  ">
<img src="/images/dog.jpg" alt="dog" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
</div><Link to="/product"><h2 className="text-xl font-bold text-gray-900 text-center">Dog</h2><p className="text-blue-950 font-serif text-center">for your furry friend</p></Link></div>
<div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<img src="images/food2.jpg" alt="food" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /></div>
<Link to="/product"><h2 className="text-xl font-bold text-gray-900 text-center">Food</h2><p className="text-blue-950 font-serif text-center">Healthy meals for your pet</p></Link>
  </div>
  <div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl ">
<img src="/images/accessories.jpg" alt="accessories" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"/></div>
<Link><h2 className="text-xl font-bold text-gray-900 text-center">Accessories</h2><p className="text-blue-950 font-serif text-center">Style,Comfort&fun</p></Link>

</div>

<div className="w-60 h-70  bg-white/50 p-6 rounded-2xl  transition-all duration-300
    hover:-translate-y-3
    hover:shadow-2xl">
<div className="w-[200px] h-[200px] overflow-hidden rounded-2xl">
<img src="/images/groom.jpg"className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"/></div>
<Link><h2 className="text-xl font-bold text-gray-900 text-center">Grooming</h2><p className="text-blue-950 font-serif text-center">Fresh,Clean&Happy</p></Link>
</div></div>
</section>
            
</div>

  );
}

export default Home;