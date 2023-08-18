import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import { Outlet } from 'react-router-dom'



const LayoutAdmin = () => {
  return (
    <div dir='ltr'>
      <HeaderAdmin />
      <Outlet />
    </div>
  )
}

export default LayoutAdmin