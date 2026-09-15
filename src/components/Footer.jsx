import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* PETCO */}
          <div>
            <h2 className="text-2xl font-bold">PETCO</h2>

            <p className="mt-4 text-white/70 leading-6">
              Everything your pet needs, all in one place.
              Shop pet food, accessories and grooming products
              with love.
            </p>

            <div className="flex items-center gap-2 mt-5 text-white/80">
              <Heart size={18} />
              <span>Made with love for pets</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="space-y-3 text-white/70">
              <Link to="/"><p className=" hover:text-gray-50">Home</p></Link>
              <Link to="/products"><p className=" hover:text-gray-50">Products</p></Link>
             <Link to="/wishlist"><p className=" hover:text-gray-50">Wishlist</p></Link>
              <Link to="/cart"><p className=" hover:text-gray-50">Cart</p></Link>
            </div>
          </div>

          {/* Customer */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Customer
            </h3>

            <div className="space-y-3 text-white/70 ">
          <Link to="/orders"><p className=" hover:text-gray-50">My Orders</p></Link>
              <Link to="/checkout"><p className=" hover:text-gray-50">Checkout</p></Link>
           <Link to="/profile"><p className=" hover:text-gray-50">My profile</p></Link>
             <Link to="/contact"><p className=" hover:text-gray-50">Contact Us</p></Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-white/70">

              <div className="flex gap-3">
                <Mail size={18} />
                <span className=" hover:text-gray-50">fida@gmail.com</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <span className=" hover:text-gray-50">6282838529</span>
              </div>

              <div className="flex gap-3">
                <MapPin size={18} />
                <span className=" hover:text-gray-50">Kerala, India</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/60 text-sm">
          © 2026 PETCO. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;