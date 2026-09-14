
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "../components/OrderItem";
import EmptyState from "../components/EmptyState";
import { Package } from "lucide-react";
import { getOrders } from "../services/order services";
function Orders() {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const data = await getOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.log("Failed to load orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return <p className="text-center py-20">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-[#F8F5EC] py-10 px-5">
      <h1 className="text-3xl font-bold text-[#2F5D50] mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <EmptyState
          icon={<Package size={64} />}
          title="No orders yet"
          message="When you place an order, it will show up here."
          actionLabel="Shop Now"
          actionLink="/product"
        />
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;