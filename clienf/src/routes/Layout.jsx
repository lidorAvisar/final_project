import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNavbar from '../components/Navbars/TopNavbar'
import NavbarCategory from '../components/Navbars/NavbarCategory'
import '../components/pages/style.css'
import Footer from '../components/footer/footer'

const Layout = () => {
  return (
    <div>
      <TopNavbar />
      <NavbarCategory />
      <Outlet />
      <Footer />

    </div>
  )
}

export default Layout