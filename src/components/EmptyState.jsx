import React from 'react'
import { Link } from 'react-router-dom'
function EmptyState({icon,title,message,actionLabel,actionLink}) {
  return (
    <div className='flex flex-col items-center justify-center text-center py-20 px-4'>
      <div className='text-gray-300 mb-4'>{icon}</div>
      <h2 className='text-2xl font-bold text-gray-700 mb-2'>{title}</h2>
      <h4 className='text-xl font-bold text-gray-900 mb-7 font-serif'>{message}</h4>
      <p>{actionLabel && actionLink && <Link to={actionLink} className='bg-[#2F5D50] t px-8 py-3 rounded-xl font-semibold hover:bg-[#244a40] transition'>
      {actionLabel}</Link>}</p>
      </div>

  )
}

export default EmptyState
