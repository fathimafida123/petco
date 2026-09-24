

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
        <>
       <div>
        <div className="mb-4 flex items-center justify-between ">
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
    className="border rounded-lg px-4 py-2 w-full md:w-80 outline-none"
  />


<div className="flex gap-3 mt-3">
  <select
  value={statusFilter}
  onChange={(e)=>{
    setStatusFilter(e.target.value)
    setSearchParams({
      page:"1",
      per_page:String(perPage)
    })
  }} className="border rounded-lg px-4 py-2 outline-none">
 <option value="all">All Status</option>
 <option value="Placed">Placed</option>
 <option value="Processing">Processing</option>
 <option value="Shipped">Shipped</option>
 <option value="Delivered">Delivered</option>
 <option value="Cancelled">Cancelled</option>
  </select>

  <select value={paymentFilter}
  onChange={(e)=>{
    setPaymentFilter(e.target.value)
    setSearchParams({
      page:"1",
      per_page:perPage
    })
  }} className="border rounded-lg px-4 py-2 outline-none">
    <option value="all">All paymnet</option>
   <option value="cod">COD</option>
   <option value="upi">UPI</option>
   <option value="card">Card</option>
  </select>
</div>
</div>
</div>
        <div className="bg-white rounded-xl  overflow-x-auto  mt-8">
   
          <table className="w-full border ">

            {/* Table Header */}
            <thead className="bg-white ">
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
              
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-gray-950 text-white ">

                   {currentOrders.map((item) => (
                <tr
                  key={item.id}
                  onClick={()=>navigate(`/admin/orders/${item.id}`)}
                  className="border-t hover:bg-gray-900 cursor-pointer "
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
                    onClick={(e)=>e.stopPropagation()}
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 text-sm outline-none bg-gray-800"
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
                </tr>
              ))}

            </tbody>

          </table>
       

        </div>
        </>
      )}
   <div className="flex justify-center items-center gap-4 p-4">

            <button 
            disabled={page===1}
            onClick={()=>
              setSearchParams({
              page:String(page-1),
              per_page:String(perPage)
            })} 
            className="px-4 py-2 bg-[#030712] bg-[#2F5D50] text-white rounded-lg disabled:bg-gray-300"
            >
           Previous
            </button>
            <span>{page} of {totalPages}</span>
            <button disabled={page===totalPages}
            onClick={()=>setSearchParams({
              page:String(page+1),
              per_page:String(perPage)
            })}
                className="px-4 py-2 bg-[#030712] text-white rounded-lg disabled:bg-gray-300"

            >Next</button>
          </div>
    </div>
  );
}

export default AdminOrders;