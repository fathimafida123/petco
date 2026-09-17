import React from 'react'

function AdminDashboard() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
    <div className='bg-white p-5 rounded-lg shadow'>
        <h2 className='text-gray-800'>products</h2>
        <p className='text-3xl font-bold mt-2'>0</p>
    </div>

    <div className='bg-white p-5 rounded-lg shadow'>
        <h2 className='text-gray-800'>users</h2>
        <p className='text-3xl font-bold mt-2'>0</p>
    </div>
    <div className='bg-white p-5 rounded-lg shadow'>
        <h2 className='text-gray-800'>Orders</h2>
        <p className='text-3xl font-bold mt-2'>0</p>
    </div>
    <div className='bg-white rounded-xl p-5 shadow'>
        <h2 className='text-gray-800'>Revenue</h2>
        <p className='text-3xl font-bold mt-2'>0</p>

    </div>
</div>
    </div>
  )
}

export default AdminDashboard
