import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../adminComponents/AdminSidebar'
import AdminHeader from '../adminComponents/AdminHeader'
function AdminLayoute() {
  return (
    <div className="min-h-screen bg-white">
   <AdminSidebar />
   <div className='ml-64'> 
   <AdminHeader/>
   <main className='p-6'>
      <Outlet/>
      </main>
    </div>
    </div>
  )
}

export default AdminLayoute
