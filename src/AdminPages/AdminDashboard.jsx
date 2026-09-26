
import React, { useState, useEffect } from "react";
import { getAllOrders } from "../services/order services";
import { getProducts } from "../services/product services";
import { getUsers } from "../services/user services";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState(0);
  const [user, setUser] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [revenueType, setRevenueType] = useState("weekly");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const dashboardData = async () => {
      try {
        const orders = await getAllOrders();
        setOrder(orders);

        const totalRevenue = orders.reduce(
          (total, item) => total + Number(item.grandTotal || 0),
          0
        );

        setRevenue(totalRevenue);

        const productData = await getProducts();
        setProduct(productData.length);

        const users = await getUsers();
        const user=users.filter((item)=>item.role !=="admin")
        setUser(user.length);
      } catch (error) {
        console.log(error);
      }
    };

    dashboardData();
  }, []);

  const statusCount = {
    Placed: order.filter((item) => item?.status === "Placed").length,
    Shipped: order.filter((item) => item?.status === "Shipped").length,
    Delivered: order.filter((item) => item?.status === "Delivered").length,
  };

  const recentOrders = order.slice(-5).reverse();

  // Monthly revenue
  const monthlyRevenue = {};

  order.forEach((item) => {
    const month = new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
    });

    if (!monthlyRevenue[month]) {
      monthlyRevenue[month] = 0;
    }

    monthlyRevenue[month] += Number(item.grandTotal || 0);
  });

  const monthlyData = Object.entries(monthlyRevenue).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );

  // Weekly revenue
  const weeklyRevenue = {};

  order.forEach((item) => {
    const date = new Date(item.createdAt);

    const week = Math.ceil(date.getDate() / 7);
    const weekName = `week ${week}`;

    if (!weeklyRevenue[weekName]) {
      weeklyRevenue[weekName] = 0;
    }

    weeklyRevenue[weekName] += Number(item.grandTotal || 0);
  });

  const weeklyData = Object.entries(weeklyRevenue).map(
    ([week, revenue]) => ({
      week,
      revenue,
    })
  );

  return (
    <div  className="min-h-screen">
      {/* Dashboard heading */}
      <h1 className="text-[#006A71] text-2xl p-2 font-bold mb-6 t">
        Dashboard
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }} className=" p-5 rounded-lg shadow text-black">
          <h2 className="text-lg font-serif">Products</h2>
          <p className="text-3xl font-bold mt-2">{product}</p>
        </div>

        <div
          style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }}
          className="p-5 rounded-lg shadow text-black"
        >
          <h2 className="text-lg font-serif">Users</h2>
          <p className="text-3xl font-bold mt-2">{user}</p>
        </div>

        <div
          style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }}
          className="p-5 rounded-lg shadow text-black"
        >
          <h2 className="text-lg font-serif">Orders</h2>
          <p className="text-3xl font-bold mt-2">{order.length}</p>
        </div>

        <div
          style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }}
          className="rounded-xl p-5 shadow text-black"
        >
          <h2 className="text-lg font-serif">Revenue</h2>
          <p className="text-3xl font-bold mt-2">{revenue}</p>
        </div>
      </div>

      {/* Order status */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#006A71] ">Order Status</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
          <div
            style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }}
            className="p-5 rounded-xl shadow text-black"
          >
            <h3 className="text-lg font-serif">Placed</h3>
            <p className="text-3xl font-bold mt-2">
              {statusCount.Placed}
            </p>
          </div>

          <div
            style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }}
            className="p-5 rounded-xl shadow text-black"
          >
            <h3 className="text-lg font-serif">Shipped</h3>
            <p className="text-3xl font-bold mt-2">
              {statusCount.Shipped}
            </p>
          </div>

          <div
            style={{ background: "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)" }}
            className="p-5 shadow rounded-xl text-black"
          >
            <h3 className="text-lg font-serif text-black">Delivered</h3>
            <p className="text-3xl font-bold mt-2 text-black">
              {statusCount.Delivered}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="bg-white shadow-[0_-6px_15px_rgba(0,0,0,0.08),0_6px_15px_rgba(0,0,0,0.08)] p-8 rounded-xl mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-950">
          Revenue Overview
        </h2>

        <div>
          <button
            onClick={() => setRevenueType("weekly")}
          className={`px-4 py-2 rounded-lg ${
    revenueType === "weekly"
      ? "bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]"
      : "bg-gray-100"
  }`}

          >
            Weekly
          </button>

          <button
            onClick={() => setRevenueType("monthly")}
          className={`px-4 py-2 rounded-lg ${
    revenueType === "monthly"
      ?  "bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]"
      : "bg-gray-100"
  }`}
          >
            Monthly
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={
              revenueType === "weekly" ? weeklyData : monthlyData
            }
          >
            <XAxis
              dataKey={
                revenueType === "weekly" ? "week" : "month"
              }
            />

            <YAxis /> 

            <Tooltip />
            <defs>
    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="rgb(186, 190, 245)" />
      <stop offset="33.1%" stopColor="rgb(192, 192, 245)" />
      <stop offset="90%" stopColor="rgb(218, 203, 246)" />
    </linearGradient>
  </defs>

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="url(#revenueGradient)"
              fill="url(#revenueGradient)"
              strokeWidth={3}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent orders */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4 text-[#006A71] ">
            Recent Orders
          </h2>

          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-[#006A71] p-2 text-white rounded-lg hover:bg-gray-800 font-bold mb-4 flex items-center gap-1"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">

    <table className="w-full min-w-[700px] border-collapse">

      {/* Table Header */}
      <thead className="bg-[#F2EFE7] border-b border-gray-200">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            ID
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Customer
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Total
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Payment
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Status
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
            Date
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="bg-white">

        {recentOrders.map((item) => (

          <tr
            key={item.id}
            onClick={() =>
              navigate(`/admin/orders/${item.id}`)
            }
            className="border-b border-gray-200
            hover:bg-gray-50 cursor-pointer transition"
          >

            {/* ID */}
            <td className="px-6 py-4">
              <span className="font-semibold text-gray-800">
                #{item.id}
              </span>
            </td>

            {/* Customer */}
            <td className="px-6 py-4">
              <p className="font-semibold text-gray-800">
                {item.name}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {item.email}
              </p>
            </td>

            {/* Total */}
            <td className="px-6 py-4">
              <span className="font-semibold text-gray-800">
                ₹{item.grandTotal}
              </span>
            </td>

            {/* Payment */}
            <td className="px-6 py-4">
              <span className="inline-flex px-3 py-1
                rounded-full text-xs font-semibold
                uppercase bg-gray-100 text-gray-700"
              >
                {item.paymentMethod}
              </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4">

              <span
                className={`inline-flex px-3 py-1
                rounded-full text-xs font-semibold
                ${
                  item.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : item.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>

            </td>

            {/* Date */}
            <td className="px-6 py-4 text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
</div>
      </div>
    </div>
  );
}

export default AdminDashboard;