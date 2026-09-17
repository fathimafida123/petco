

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,addToCart
} from "../redux/slice/cartSlice";
import  toast from "react-hot-toast";
import { updateCart,deleteCart } from "../services/cartService";
import{Trash2,ShoppingCart } from "lucide-react"
import { calculateTotal } from "../utils/priceCalculator";
import { loadUserCart } from "../utils/loadCart";
import { Link, useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { Heart } from "lucide-react";

import { addWishlist } from "../services/wishlistservice";
import { addToWishlist } from "../redux/slice/wishlistSlice";

function Cart() {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const cartitems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

const totalAmount=calculateTotal(cartitems);

const subTotal=totalAmount;
const deliveryFee=subTotal>500 ? 0 :40 
const discount=0;
const grandTotal=subTotal+deliveryFee-discount;

 const hasStockIssue=cartitems.some((item)=>item.stock===0 || item.quantity>item.stock); //array-ile oru item enkilum condition true aanenkil, muzhuvan expression true aavum
useEffect(()=>{
  if(!user) return;
  loadUserCart(user.id,dispatch);
},[user,dispatch])

const handleDelete = async(item) => {
  dispatch(removeFromCart(item.id));
   await deleteCart(item.cartId);
toast.success(`${item.name} removed from cart`);
 
};

const handleMoveToWishlist=async(item)=>{
  try{
    await deleteCart(item.cartId);
    dispatch(removeFromCart(item.id))

    const saved=await addWishlist({
      userId:user.id,
      productId:String(item.id)
    })
    dispatch(addToWishlist({...item,wishlistId:saved.id}));
    toast.success(`${item.name} moved to wishlist`)
  }catch(error){
    console.log("failed to move:",error)
  }
}

  return (
    <div className="min-h-screen bg-[#F8F5EC] py-10 px-5">

      <h1 className="text-3xl font-bold text-[#2F5D50] mb-8">
        My Cart
      </h1>

      {cartitems.length === 0 ? (
            <EmptyState
          icon={<ShoppingCart size={64} />}
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Start shopping to fill it up!"
          actionLabel="Shop Now"
          actionLink="/product"
        />
      ) : (
        <div className="space-y-4">

          {cartitems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5  rounded-xl shadow flex flex-col sm:flex-row gap-4 sm:gap=5 sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className=" w-full sm:w-24  h-40 sm:h-24  object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p>₹{item.price}</p>
<div className="flex items-center gap-4 mt-2">
  <button
    type="button"
    className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#2F5D50] text-white font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
    disabled={item.quantity === 1}
    onClick={async () => {
      if (item.quantity <= 1) return;
      const newQuantity = item.quantity - 1;
      await updateCart(item.cartId, newQuantity);
      dispatch(decreaseQuantity(item.id));
    }}
  >
    -
  </button>

  <p>Quantity: {item.quantity}</p>

  <button
    type="button"
    className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#2F5D50] text-white font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
    onClick={async () => {
      if (item.quantity >= item.stock) return;
      const newQuantity = item.quantity + 1;
      await updateCart(item.cartId, newQuantity);
      dispatch(increaseQuantity(item.id));
    }}
  >
    +
  </button>
</div>

                 {item.stock===0?(
                    <p className="text-red-500 text-sm font-semibold mt-1">Out of stock</p>
                   ):item.quantity>item.stock?(
                    <p className="text-red-500 text-sm font-semibold mt-1">Only {item.stock} left in stock</p>
                   ):null}
                
              </div>
              <div className="flex flex-col items-center gap-2 self-end sm:self-center">
                <button tyep="button" className="text-gray-400 hover:text-[#2F5D50] p-2 self-end" onClick={()=>handleMoveToWishlist(item)} title="move to wishlist"><Heart size={22}/></button>
                  <button type="button" className="text-red-500 hover:text-red-700 p-2 self-end sm:self-center" 
                  onClick={()=>handleDelete(item)}>
                  <Trash2 size={22} className="ml-90"/>
                  </button>
                  </div>
            </div>
          ))}

<div className="bg-white p-5 rounded-xl shadow space-y-2">
  <div className="flex justify-between text-gray-600">
    <span>Subtotal</span>
    <span>₹{subTotal}</span>
  </div>

  <div className="flex justify-between text-gray-600">
    <span>Delivery Fee</span>
    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
  </div>

  {discount > 0 && (
    <div className="flex justify-between text-green-600">
      <span>Discount</span>
      <span>-₹{discount}</span>
    </div>
  )}

  <hr className="my-2" />

  <div className="flex justify-between text-xl font-bold text-[#2F5D50]">
    <span>Total</span>
    <span>₹{grandTotal}</span>
  </div>
</div>

<div className="flex flex-col sm:flex-row gap-3 mt-2">
  <Link to="/product" className="flex-1 text-center border border-[#2F5D50] text-[#2F5D50] py-3
  rounded-xl font-semibold hover:bg-[#2F5D50]/10 transition">Continue Shopping</Link>

 <button type="button " disabled={hasStockIssue} onClick={() => navigate("/checkout")} className="flex-1 text-center bg-[#2F5D50] text-white py-3 rounded-xl font-semibold hover:bg-[#244a40] transition">
  Proceed to Checkout</button>
</div>
{hasStockIssue&&<p className="text-red-500 text-sm text-center mt-2">
   Please update quantities for out-of-stock items before checkout.</p>}
        </div>

  
      )}
    </div>
  );
}

export default Cart;