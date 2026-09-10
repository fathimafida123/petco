import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartitems = useSelector((state) => state.cart.items);
  console.log("cart items:",cartitems)
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
                src={item?.image}
                alt={item?.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p>₹{item.price}</p>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Cart;