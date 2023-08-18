import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Error404 from '../components/pages/Error404'
import Layout from './Layout'
import Home from '../components/pages/Home'
import LayoutAdmin from '../components/admin/layout/LayoutAdmin'
import UsersListAdmin from '../components/admin/users/UsersListAdmin'
import LoginAdmin from '../components/admin/layout/LoginAdmin'
import CategoriesAdmin from '../components/admin/categories/CategoriesAdmin'
import ProductsAdmin from '../components/admin/products/ProductsAdmin'
import AddCategories from '../components/admin/categories/AddCategories'
import EditProduct from '../components/admin/products/EditProduct'
import AddProduct from '../components/admin/products/AddProduct'
import EditUsers from '../components/admin/users/EditUsers'
import ProductModal from '../components/pages/ProductModal'
import UserCart from '../components/pages/UserCart'
import UserEdit from '../components/pages/UserEdit'
import { SkeletonTheme } from 'react-loading-skeleton'
import ContactUs from '../components/pages/ContactUs'
import FAQ from '../components/pages/FAQ'
import { AppContext } from '../context/context'

const AppRoutes = () => {

    const {  darkMode } = useContext(AppContext);

    return (
        <div>
            <SkeletonTheme baseColor={darkMode?'#202020':'#ebe2e2'}  borderRadius={18} enableAnimation:true   >
                <Router>
                    <Routes>

                        <Route path='/' element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path='/cat/:category' element={<Home />} />
                            <Route path='/product/:id' element={<ProductModal />} />
                            <Route path='/userEdit' element={<UserEdit />} />
                            <Route path='/cart' element={<UserCart />} />
                            <Route path='/contact-us' element={<ContactUs />} />
                            <Route path='/FAQ' element={<FAQ />} />
                        </Route>

                        <Route path='/admin' element={<LayoutAdmin />}>
                            <Route path='/admin' element={<LoginAdmin />} />
                            <Route path='/admin/users' element={<UsersListAdmin />} />
                            <Route path='/admin/users/edit/:id/:role' element={<EditUsers />} />
                            <Route path='/admin/categories' element={<CategoriesAdmin />} />
                            <Route path='/admin/categories/add' element={<AddCategories />} />
                            <Route path='/admin/products' element={<ProductsAdmin />} />
                            <Route path='/admin/products/edit/:id' element={<EditProduct />} />
                            <Route path='/admin/products/add' element={<AddProduct />} />
                        </Route>

                        <Route path='*' element={<Error404 />} />

                    </Routes>
                </Router>
            </SkeletonTheme>
        </div>
    )
}

export default AppRoutes