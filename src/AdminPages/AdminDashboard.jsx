import React,{useState,useEffect} from 'react'
import { getAllOrders } from '../services/order services'
import { getProducts } from '../services/product services'
import { getUsers } from '../services/user services'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,Legend } from "recharts"
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


      const categorySales={};

      orders.forEach((order)=>{
        order.items?.forEach((item)=>{
            const product=productData.find((product)=>String(product.id)===String(item.productId));

            if(product){
                product.categories?.forEach((category)=>{
                    if(!categorySales[category]){
                        categorySales[category]=0
                    }
                    categorySales[category]+=Number(item.quantity || 0)
                })
            }
        })
      })

      const chartData=Object.entries(categorySales).map(
        ([category,sold])=>({category,sold,fill:categoryColors[index % categoryColors.length]}))

        setCategoryData(chartData)
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
    <div className='bg-white p-5 routnded-lg shadow'>
        <h2 className='text-gray-800'>products</h2>
        <p className='text-3xl font-bold mt-2'>{product}</p>
    </div>

    <div className='bg-white p-5 rounded-lg shadow'>
        <h2 className='text-gray-800'>users</h2>
        <p className='text-3xl font-bold mt-2'>{user}</p>
    </div>
    <div className='bg-white p-5 rounded-lg shadow'>
        <h2 className='text-gray-800'>Orders</h2>
        <p className='text-3xl font-bold mt-2'>{order.length}</p>
    </div>
    <div className='bg-white rounded-xl p-5 shadow'>
        <h2 className='text-gray-800'>Revenue</h2>
        <p className='text-3xl font-bold mt-2'>{revenue}</p>

    </div>
</div>

    <div className='mt-8'>
        <h2 className='text-2xl font-bold '>Order status</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4'>
        <div className='bg-white p-5 rounded-xl shadow'>
            <h3 className='text-gray-500'>Placed</h3>
            <p className='text-3xl font-bold mt-2'>{statusCount.Placed}</p>
        </div>

        <div className='bg-white p-5 rounded-xl shadow'>
            <h3 className='text-gray-500'>Shipped</h3>
            <p className='text-3xl font-bold mt-2'>{statusCount.Shipped}</p>
        </div>

        <div className='bg-white p-5 shadow rounded-xl'>
            <h3 className='text-gray-500'>Delivered</h3>
            <p className='text-3xl font-bold mt-2'>{statusCount.Delivered}</p>
        </div>
        </div>

    </div>
   
    <div className="bg-white p-5 rounded-xl shadow mt-8">
  <h2 className="text-xl font-semibold mb-4">
    Revenue Overview
  </h2>
<div>
  <button onClick={()=>setRevenueType("weekly")}className={`px-4 py-2 rounded-md ${revenueType==='weekly'?"bg-[#2F5D50] text-white":" bg-white/50 shadow"}`}>Weekly</button>
  <button onClick={()=>setRevenueType("monthly")}className={`px-4 py-2 rounded-md ${revenueType==="monthly"? "bg-[#2F5D50] text-white" : "bg-white/50 shadow"}`}>Monthly</button>
</div>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={revenueType==="weekly"?weeklyData:monthlyData}>
      <XAxis dataKey={revenueType==="weekly"? "week":"month"}/>
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#2F5D50"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="bg-white p-5 rounded-xl shadow mt-8">

  <h2 className="text-xl font-semibold mb-4">
    Category Sales
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >
    <PieChart>

      <Pie
        data={categoryData}
        dataKey="sold"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={60}
      >

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

    <div className='mt-8'>
        <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold mb-4'>Recent Orders</h2>
        <button onClick={()=>navigate("/admin/orders")} className='bg-[#2F5D50] p-2 text-white rounded-lg hover:bg-[#244A40] mb-4'>Other Orders  <ArrowRight size={18} />
</button>
        </div>
        <div className='bg-white rounded-xl shadow overFlow-hidden'>
            <div className='overflow-x-auto' >
                <table  className='w-full min-w-[700px]'>
                    <thead className='bg-[#E8F0ED]'>
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
                            <tr key={item.id} className='border-t'>
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
