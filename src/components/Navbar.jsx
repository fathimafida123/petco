

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlices";

import {
  Heart,
  ShoppingCart,
  User,
  ClipboardList,
  PawPrint,
  Menu,
  X,
  Search,
  CreditCard,
  LogOut,
} from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const icons = [
    { name: "wishlist", path: "/wishlist", icon: <Heart size={20} /> },
    { name: "cart", path: "/cart", icon: <ShoppingCart size={20} /> },
    { name: "checkout", path: "/checkout", icon: <CreditCard size={20} /> },
    { name: "orders", path: "/orders", icon: <ClipboardList size={20} /> },
  ];

  function handler(e) {
    setSearch(e.target.value);
    navigate(e.target.value.trim() !== "" ? `/product?search=${e.target.value}` : "/product");
  }

  const handleLogout = () => {
    dispatch(logout());
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="h-20 px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#2F5D50] flex items-center gap-2">
          PETCO
          <PawPrint />
        </Link>

        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-[#2F5D50]">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 border rounded-full px-4 py-2">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            onChange={handler}
            value={search}
            className="w-40 lg:w-64 xl:w-80 outline-none"
          />
        </div>

        <div className="hidden md:flex gap-5">
          {icons.map((item) => (
            <Link to={item.path} key={item.name} className="relative hover:text-[#2F5D50]">
              {item.icon}
              {item.name === "cart" && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </div>

        
<div className="relative">
  <button
    type="button"
    onClick={() => setShowProfile(!showProfile)}
    className="w-9 h-9 rounded-full bg-[#2F5D50] text-white text-sm font-semibold flex items-center justify-center hover:opacity-90"
  >
    {user?.name ? user.name.trim().charAt(0).toUpperCase() : <User size={18} />}
  </button>

  {showProfile && (
    <div className="absolute right-0 top-12 w-50 h-50 bg-white/50 border border-gray-100 rounded-xl shadow-lg p-4 flex flex-col items-center gap-3">
      {user ? (
        <>
          <p className="text-sm font-bold p-4 font-serif text-gray-800 truncate max-w-full ">
           Hi, { user.name}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 text-sm font-medium py-2 rounded-lg hover:bg-red-100 mt-15"
          >
            <LogOut size={16} />
            Logout
          </button>
        </>
      ) : (
        <>
        <h2 className="font-serif text-gray-900">Hi, please login</h2>
        <Link
          to="/login"
          onClick={() => setShowProfile(false)}
          className="w-full text-center bg-[#2F5D50] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#264c41] m-18 "
        >
          Login
        </Link>
        </>
      )}
    </div>
  )}
</div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-5 px-6 pb-6">
          {links.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
          {icons.map((item) => (
            <Link to={item.path} key={item.name} onClick={() => setOpen(false)} className="flex items-center gap-3">
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;