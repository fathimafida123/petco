

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProducts,updateProductStock } from "../services/product services";
import {
  setLoading,
  setError,
  setOrders,
} from "../redux/adminSlice/AdminOrderSlice";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/order services";

function AdminOrders() {
  const[search,setSearch]=useState("")
  const[searchParams,setSearchParams]=useSearchParams()
  const dispatch = useDispatch();
   const navigate=useNavigate()
   const[statusFilter,setStatusFilter]=useState("all")
   const[paymentFilter,setPaymentFilter]=useState("all")
  const { order, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  // Load all orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        dispatch(setLoading(true));

        const orders = await getAllOrders();

        dispatch(setOrders(orders));
      } catch (error) {
        dispatch(setError("Failed to load orders"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadOrders();
  }, [dispatch]);

  // Change order status
  const handleStatusChange = async (id, status) => {
    try {
      const currentOrder=order.find((item)=>String(item.id)===String(id))
      const updatedOrder = await updateOrderStatus(id, status);
       if(status==="Cancelled" &&
          currentOrder?.status !=="Cancelled"
       ){
         const products=await getProducts()
        
         for(const item of currentOrder.items){
          const product=products.find((product)=>String(product.id)===String(item.productId));
          if(product){
            const newStock=Number(product.stock)+Number(item.quantity)

            await updateProductStock(product.id,
              newStock
            )
          }
         }
       }
      // Update Redux
      const updatedOrders = order.map((item) =>
        item.id === updatedOrder.id ? updatedOrder : item
      );

      dispatch(setOrders(updatedOrders));
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to update order status"));
    }
  };
 
  //pagination
const page=Number(searchParams.get("page"))||1
const perPage=Number(searchParams.get("per_page"))||5

const searchedOrders=order.filter((item)=>
  item.name.toLowerCase().includes(search.toLowerCase())||
item.email.toLowerCase().includes(search.toLowerCase())||
 String(item.id).toLowerCase().includes(search.toLowerCase())
);
const filterOrders=searchedOrders.filter((item)=>{
  const statusMatch= statusFilter==="all"||item.status===statusFilter;
  const paymentMatch=paymentFilter==="all"||item.paymentMethod===paymentFilter;
  return statusMatch && paymentMatch
})
const start=(page-1)*perPage;
const end=start+perPage
const currentOrders=filterOrders.slice(start,end);
const totalPages=Math.ceil(filterOrders.length/perPage)
   
//filter


  // Loading
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-red-500">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">

    {/* Heading + Search + Filters */}
    <div className="mb-6 flex items-center justify-between gap-6">

      {/* Left - Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer orders
        </p>
      </div>

      {/* Right - Search + Filters */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchParams({
              page: "1",
              per_page: String(perPage),
            });
          }}
          className="border border-gray-300 rounded-lg px-4 py-2
          w-72 outline-none
          focus:border-[#006A71]"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setSearchParams({
              page: "1",
              per_page: String(perPage),
            });
          }}
          className="border border-gray-300 rounded-lg px-4 py-2
          outline-none  bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]"
        >
          <option value="all">All Status</option>
          <option value="Placed">Placed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Payment Filter */}
        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value);
            setSearchParams({
              page: "1",
              per_page: String(perPage),
            });
          }}
          className="border border-gray-300 rounded-lg px-4 py-2
          outline-none  bg-[linear-gradient(135deg,#A8E0DE,#5FB7B5)]"
        >
          <option value="all" >All Payment</option>
          <option value="cod">COD</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>

      </div>

    </div>

      {/* Empty state */}
      {order.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            There are no orders yet.
          </p>
        </div>
      ) : (
<div className="bg-white rounded-2xl shadow-sm border border-gray-900 overflow-hidden mt-8">

  <div className="overflow-x-auto">

    <table className="w-full">

      {/* Header */}
      <thead className="bg-[#F2EFE7]">

        <tr className="border-b border-gray-900">

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            ID
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Customer
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Total
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Payment
          </th>

          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
            Status
          </th>

          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
            Action
          </th>

        </tr>

      </thead>


      {/* Body */}
      <tbody>

        {currentOrders.length > 0 ? (

          currentOrders.map((item) => (

            <tr
              key={item.id}
              className="border-b border-gray-500 last:border-b-0 hover:bg-gray-50 transition"
            >

              {/* ID */}
              <td className="px-6 py-5">

                <span className="font-semibold text-gray-700">
                  #{item.id}
                </span>

              </td>


              {/* Customer */}
              <td className="px-6 py-5">

                <div>

                  <p className="font-semibold text-gray-800">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {item.email}
                  </p>

                </div>

              </td>


              {/* Total */}
              <td className="px-6 py-5">

                <span className="font-semibold text-[#006A71]">
                  ₹{item.grandTotal}
                </span>

              </td>


              {/* Payment */}
              <td className="px-6 py-5">

                <span
                  className="inline-flex px-3 py-1 rounded-full
                  text-xs font-medium
                  bg-gray-100 text-gray-700 uppercase"
                >
                  {item.paymentMethod}
                </span>

              </td>


              {/* Status */}
              <td className="px-6 py-5">

                <select
                  onClick={(e) => e.stopPropagation()}
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(
                      item.id,
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-lg
                  px-3 py-2 text-sm outline-none
                  focus:border-[#006A71]
                  focus:ring-1 focus:ring-[#006A71]"
                >

                  <option value="Placed">
                    Placed
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </td>


              {/* Action */}
              <td className="px-6 py-5">

                <div className="flex justify-end">

                  <button
                    onClick={() =>
                      navigate(`/admin/orders/${item.id}`)
                    }
                    className="inline-flex items-center
                    px-4 py-2 rounded-lg
                    bg-gray-50 text-gray-700
                    border border-gray-200
                    hover:bg-gray-100
                    transition"
                  >
                    View
                  </button>

                </div>

              </td>

            </tr>

          ))

        ) : (

          <tr>

            <td
              colSpan="6"
              className="text-center py-16"
            >

              <div className="flex flex-col items-center">

                <h3 className="text-lg font-semibold text-gray-700">
                  No orders found
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Try changing your search or filters.
                </p>

              </div>

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>
      )}
   <div className="flex justify-center items-center gap-4 p-4">

            <button 
            disabled={page===1}
            onClick={()=>
              setSearchParams({
              page:String(page-1),
              per_page:String(perPage)
            })} 
            className="px-4 py-2  bg-[#006A71] hover:bg-[#48A6A7] text-white rounded-lg disabled:bg-gray-300"
            >
           Previous
            </button>
            <span>{page} of {totalPages}</span>
            <button disabled={page===totalPages}
            onClick={()=>setSearchParams({
              page:String(page+1),
              per_page:String(perPage)
            })}
                className="px-4 py-2 bg-[#006A71] hover:bg-[#48A6A7] text-white rounded-lg disabled:bg-gray-300"

            >Next</button>
          </div>
    </div>
  );
}

export default AdminOrders;