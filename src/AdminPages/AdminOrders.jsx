// import React, { useEffect } from 'react'
// import { getAllOrders,updateOrderStatus } from '../services/order services'
// import { useDispatch,useSelector } from 'react-redux'
// import { setLoading,setError,setOrders } from '../redux/adminSlice/AdminOrderSlice'
// function AdminOrders() {
//   const dispatch=useDispatch()
//   const {order,loading,error}=useSelector((state)=>state.adminOrders)
//   useEffect(()=>{
//      const loadOrders=async()=>{
//     try{
//       dispatch(setLoading(true))
//   const orders=await getAllOrders()
//  dispatch(setOrders(orders))
//     }catch(error){
//      dispatch(setError("failed to load orders"))
//     }finally{
//       dispatch(setLoading(false))
//     }
//   }
//   loadOrders()
// },[dispatch])

// const handleStatusChange=async (id,status)=>{
//   try{
//     const updatedOrder=await updateOrderStatus(id,status);
//  const updatedOrders=order.map((item)=>item.id===updatedOrder.id?updatedOrder:item)
//     dispatch(setOrders(updatedOrders))
//   }catch(error){
//     dispatch(setError("failed to update order status"))
//   }
// }

// if(loading){
//   return <h2>Loding Orders... </h2>
// }
//  if(error){
//   return <h2 className="text-red-500">{error}</h2>
// }
//   return (
//     <div>
//       <table>
//         <thead >
//           <tr>
//           <th>ID</th>
//           <th>Customer</th>
//           <th>Total</th>
//           <th>Paymnet</th>
//           <th>Status</th>
//           <th>Action</th>
//             </tr>
//               </thead>
//             <tbody>
//               {order.map((item)=>(
//                 <tr key={item?.id}>
//                   <td>{item?.name}</td>
//                   <td>{item?.grandTotal}</td>
//                   <td>{item?.paymentMethod}</td>
//                   <td>{item?.status}</td>
//                   <td><select value={item.status} onChange={(e)=>handleStatusChange(item.id,e.target.value)}> </select></td>
//                    </tr>
//               ))}
//             </tbody>
      
//       </table>
      
//     </div>
//   )
// }

// export default AdminOrders

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const updatedOrder = await updateOrderStatus(id, status);

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

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Orders
        </h1>

        <p className="text-gray-500">
          Manage customer orders
        </p>
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
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            {/* Table Header */}
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-4 text-left">
                  ID
                </th>

                <th className="px-5 py-4 text-left">
                  Customer
                </th>

                <th className="px-5 py-4 text-left">
                  Total
                </th>

                <th className="px-5 py-4 text-left">
                  Payment
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {order.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  {/* ID */}
                  <td className="px-5 py-4 text-sm">
                    {item.id}
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.email}
                    </p>
                  </td>

                  {/* Total */}
                  <td className="px-5 py-4 font-medium">
                    ₹{item.grandTotal}
                  </td>

                  {/* Payment */}
                  <td className="px-5 py-4 uppercase text-sm">
                    {item.paymentMethod}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">

                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 text-sm outline-none"
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
                  <td className="px-5 py-4">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/orders/${item.id}`
                        )
                      }
                      className="px-4 py-2 bg-[#2F5D50] text-white rounded-lg hover:bg-[#244a40]"
                    >
                      View
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default AdminOrders;