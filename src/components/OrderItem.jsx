import React from "react";

function OrderItem({ order }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">
          Order #{order.id} — {new Date(order.createdAt).toLocaleDateString()}
        </span>
        <span className="text-sm font-semibold bg-[#2F5D50]/10 text-[#2F5D50] px-3 py-1 rounded-full">
          {order.status}
        </span>
      </div>

      <div className="space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-bold text-[#2F5D50]">
        <span>Total</span>
        <span>₹{order.grandTotal}</span>
      </div>
    </div>
  );
}

export default OrderItem;