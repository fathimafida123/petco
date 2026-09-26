import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../adminComponents/AdminSidebar'
function AdminLayoute() {
  return (
    <div className="min-h-screen" >
      <AdminSidebar />
      <div className='ml-64'>
        <main className='p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayoute
