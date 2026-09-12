

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  setCart,removeFromCart
} from "../redux/slice/cartSlice";
import { updateCart,deleteCart } from "../services/cartService";
import{Trash2 } from "lucide-react"
import { calculateTotal } from "../utils/priceCalculator";
import { loadUserCart } from "../utils/loadCart";
function Cart() {
  const dispatch = useDispatch();

  const cartitems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

const totalAmount=calculateTotal(cartitems);
useEffect(()=>{
  if(!user) return;
  loadUserCart(user.id,dispatch);
},[user,dispatch])

  return (
    <div className="min-h-screen bg-[#F8F5EC] py-10 px-5">

      <h1 className="text-3xl font-bold text-[#2F5D50] mb-8">
        My Cart
      </h1>

      {cartitems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">

          {cartitems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5  rounded-xl shadow flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center"
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

                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    className="border px-3 py-1"
                    disabled={item.quantity===1}
                    onClick={async() =>{
                      if(item.quantity<=1) return ;
                      const newQuantity=item.quantity-1;
                      await updateCart(item.cartId,newQuantity);
                      dispatch(decreaseQuantity(item.id))
                    }}
                  >
                    -
                  </button>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <button
                    type="button"
                    className="border px-3 py-1"
                    onClick={async() =>{
                      if(item.quantity>=item.stock)return
                      const newQuantity=item.quantity+1
                      await updateCart(item.cartId,newQuantity)
                      dispatch(increaseQuantity(item.id))
                    }}
                  >
                    +
                  </button>
                 

                </div>

          
                
              </div>
                  <button type="button" className="text-red-500 hover:text-red-700 p-2 self-end sm:self-center" onClick={async ()=>{
                  try{
                    await deleteCart(item.cartId);
                    dispatch(removeFromCart(item.id))
                  }catch(error){
                    console.log("failed to remove item:",error)
                  }
                }}>
                  <Trash2 size={22} className="ml-90"/>
                  </button>
            </div>
          ))}
<div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
  <span className="text-xl font-bold">Total</span>
  <span className="text-xl font-bold text-[#2F5D50]">${totalAmount}</span>
</div>
        </div>

  
      )}
    </div>
  );
}

export default Cart;