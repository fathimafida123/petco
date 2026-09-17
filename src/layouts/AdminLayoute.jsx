import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../adminComponents/AdminSidebar'
import AdminHeader from '../adminComponents/AdminHeader'
function AdminLayoute() {
  return (
    <div className="flex min-h-screen bg-[#F8F5EC]">
   <AdminSidebar />
   <div className='flex-1'> 
     {/* flex 1 it use the existing width */}
   <AdminHeader/>
   <main className='p-6'>
      <Outlet/>
      </main>
    </div>
    </div>
  )
}

export default AdminLayoute
