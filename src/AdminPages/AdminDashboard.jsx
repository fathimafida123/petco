import React,{useState,useEffect} from 'react'
import { getAllOrders } from '../services/order services'
import { getProducts } from '../services/product services'
import { getUsers } from '../services/user services'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts"
function AdminDashboard() {
    const navigate=useNavigate()
    const [order,setOrder]=useState([])
    const[product,setProduct]=useState(0)
    const[user,setUser]=useState(0)
    const[revenue,setRevenue]=useState(0)
    const[revenueType,setRevenueType]=useState("weekly")
    const[categoryData,setCategoryData]=useState([])
    useEffect(()=>{
       const dashboardData=async()=>{
        try{
      const orders=await getAllOrders()
      setOrder(orders)

      const totalRevenue=orders.reduce((total,item)=>
        total+Number(item.grandTotal || 0),0)
      setRevenue(totalRevenue)

      const productData=await getProducts()
       setProduct(productData.length)
      const users=await getUsers()
      setUser(users.length)
      }catch(error){
        console.log(error)
      }
    }
    dashboardData()
    },[])
  
    const statusCount={
        Placed:order.filter((item)=>item?.status==="Placed").length,
        Shipped:order.filter((item)=>item?.status==="Shipped").length,
        Delivered:order.filter((item)=>item?.status==="Delivered").length
    } 
      const recentOrders=order.slice(-5).reverse()

      const monthlyRevenue={};
      order.forEach((item)=>{
        const month=new Date(item.createdAt).toLocaleDateString("en-US",{
            month:"short"
        });
        if(!monthlyRevenue[month]){
            monthlyRevenue[month]=0;
        }
        monthlyRevenue[month]+=Number(item.grandTotal || 0)
      });
      const monthlyData= Object.entries(monthlyRevenue).map(([month,revenue])=>({
        month,
        revenue
      }))
 
      const weeklyRevenue={};
      order.forEach((item)=>{
        const date=new Date(item.createdAt);

        const week=Math.ceil(date.getDate()/7);
        const weekName=`week ${week}`;

        if(!weeklyRevenue[weekName]){
            weeklyRevenue[weekName]=0;
        }
        weeklyRevenue[weekName]+=Number(item.grandTotal || 0)
      })
      const weeklyData=Object.entries(weeklyRevenue).map(([week,revenue])=>({
        week,revenue
      }))

      
  return (
    <div>

      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
    <div className='bg-gray-900 p-5 routnded-lg shadow text-white rounded-lg'>
        <h2 className='text-lg font-serif'>products</h2>
        <p className='text-3xl font-bold mt-2'>{product}</p>
    </div>

    <div className='bg-gray-900  p-5 rounded-lg shadow text-white'>
        <h2 className='text-lg font-serif'>users</h2>
        <p className='text-3xl font-bold mt-2'>{user}</p>
    </div>
    <div className='bg-gray-900 bg-[#030712]  p-5 rounded-lg shadow text-white'>
        <h2 className='text-lg font-serif'>Orders</h2>
        <p className='text-3xl font-bold mt-2'>{order.length}</p>
    </div>
    <div className='bg-gray-900  rounded-xl p-5 shadow text-white'>
        <h2 className='text-lg font-serif'>Revenue</h2>
        <p className='text-3xl font-bold mt-2'>{revenue}</p>

    </div>
</div>

    <div className='mt-8'>
        <h2 className='text-2xl font-bold '>Order status</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4'>
        <div className='bg-gray-900 p-5 rounded-xl shadow text-white'>
            <h3 className='text-lg font-serif'>Placed</h3>
            <p className='text-3xl font-bold mt-2'>{statusCount.Placed}</p>
        </div>

        <div className='bg-gray-900 p-5 rounded-xl shadow text-white'>
            <h3 className='text-lg font-serif'>Shipped</h3>
            <p className='text-3xl font-bold mt-2'>{statusCount.Shipped}</p>
        </div>

        <div className='bg-gray-900  p-5 shadow rounded-xl text-white'>
            <h3 className='text-lg font-serif'>Delivered</h3>
            <p className='text-3xl font-bold mt-2'>{statusCount.Delivered}</p>
        </div>
        </div>

    </div>
   
    <div className="bg-gray-900 p-5 rounded-xl shadow mt-8">
  <h2 className="text-xl font-semibold mb-4 text-white">
    Revenue Overview
  </h2>
<div>
  <button onClick={()=>setRevenueType("weekly")}className={`px-4 py-2 rounded-md ${revenueType==='weekly'?"bg-white text-blue-950":" bg-white/90 shadow"}`}>Weekly</button>
  <button onClick={()=>setRevenueType("monthly")}className={`px-4 py-2 rounded-md ${revenueType==="monthly"? "bg-white text-blue-950" : "bg-white/90 shadow"}`}>Monthly</button>
</div>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={revenueType==="weekly"?weeklyData:monthlyData}>
      <XAxis dataKey={revenueType==="weekly"? "week":"month"}/>
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#ffff"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
    <div className='mt-8'>
        <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold mb-4'>Recent Orders</h2>
        <button onClick={()=>navigate("/admin/orders")} className='bg-gray-950 p-2 text-white rounded-lg hover:bg-blue-950 font-bold mb-4'>Other Orders  <ArrowRight size={18} />
</button>
        </div>
        <div className='bg-white rounded-2xl shadow overFlow-hidden '>
            <div className='overflow-x-auto' >
                <table  className='w-full min-w-[700px] bg-gray-950 text-white border-1 border-black '>
                    <thead className='bg-white text-gray-950 font-bold '>
                          <tr>
                            <th className="text-left p-4">Order ID</th>
                            <th  className="text-left p-4">Customer</th>
                            <th  className="text-left p-4">Amount</th>
                            <th  className="text-left p-4">Status</th>
                            <th  className="text-left p-4">Date</th>
                          </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((item)=>(
                            <tr key={item.id} onClick={()=>navigate(`/admin/orders/${item.id}`)} className='border-t cursor-pointer hover:bg-gray-900 font-semibold'>
                                <td className='p-4'>
                                    {item.id}
                                </td>
                                <td className='p-4'>
                                    {item.name}
                                </td>
                                <td className='p-4'>
                                    {item.grandTotal}
                                </td>
                                <td className='p-4'>
                                    {item.status}
                                </td>
                                <td className='p-4'>
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
  )
}

export default AdminDashboard
