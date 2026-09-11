// import React, { useEffect } from "react";
// import { useSelector,useDispatch } from "react-redux";
// import { decreaseQuantity,icreaseQuantity,setCart } from "../redux/slice/cartSlice";
// import { getCart } from "../services/cartService";
// function Cart() {
//   const dispatch=useDispatch()
//   const cartitems = useSelector((state) => state.cart.items);
//   const user=useSelector((state)=>state.auth.user)
//   console.log("cart items:",cartitems)

// useEffect(()=>{
//   const loadCart=async ()=>{
//     if(!user) return

//     try{
//       const data=await getCart(user.id);
//       dispatch(setCart(data))
//     }catch(error){
//       console.log("failed to load cart:", error)
//     }
//   }
//   loadCart()
// },[user,dispatch])
//   return (
//     <div className="min-h-screen bg-[#F8F5EC] py-10 px-5">

//       <h1 className="text-3xl font-bold text-[#2F5D50] mb-8">
//         My Cart
//       </h1>

//       {cartitems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="space-y-4">

//           {cartitems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-5 rounded-xl shadow flex gap-5"
//             >
//               <img
//                 src={item?.image}
//                 alt={item?.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />

//               <div>
//                 <h2 className="text-xl font-bold">
//                   {item.name}
//                 </h2>

//                 <p>₹{item.price}</p>
//               <button className="border h-4 w-6 " onClick={()=>dispatch(decreaseQuantity(item.id)) }>-</button>
//                 <p>
//                   Quantity: {item.quantity}
//                 </p>
//                 <button className="border" onClick={()=>dispatch(icreaseQuantity(item.id))}>+</button>
//               </div>
//             </div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }

// export default Cart;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  icreaseQuantity,
  setCart,
} from "../redux/slice/cartSlice";

import { getCart } from "../services/cartService";
import { getProducts } from "../services/product services";

function Cart() {
  const dispatch = useDispatch();

  const cartitems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
  const loadCart = async () => {
    if (!user) return;

    const cartData = await getCart(user.id);
    const products = await getProducts();

    const completeCart = cartData
      .map((cartItem) => {
        const product = products.find(
          (product) =>
            String(product.id) === String(cartItem.productId)
        );

        if (!product) return null;

        return {
          ...product,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean);

    dispatch(setCart(completeCart));
  };

  loadCart();
}, [user, dispatch]);

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
              className="bg-white p-5 rounded-xl shadow flex gap-5"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p>₹{item.price}</p>

                <div className="flex items-center gap-3 mt-2">

                  <button
                    type="button"
                    className="border px-3 py-1"
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    -
                  </button>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <button
                    type="button"
                    className="border px-3 py-1"
                    onClick={() =>
                      dispatch(icreaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Cart;