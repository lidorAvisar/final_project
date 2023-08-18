import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styleHeaderAdmin.css'
import { API_URL, TOKEN_KEY, doApiMethod } from '../../../services/apiService';
import AuthAdminComp from './AuthAdminComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import HamburgerAdmin from './HamburgerAdmin';
import { AppContext } from '../../../context/context';


const HeaderAdmin = () => {

  const { userInfo, doApiUserInfo } = useContext(AppContext);
  const nav = useNavigate();


  const isOffline = async () => {
    try {
      console.log(userInfo);
      const url = API_URL + "/users/logout";
      const data = await doApiMethod(url, "PATCH", userInfo);
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <header className='container-fluid admin_header'>
      <div className="container">
        <main className='row align-items-center'>
          <div className='col-auto'>
            {localStorage[TOKEN_KEY] ? <h4><Link className='logo text-white' to={"/admin"}>ADMIN PANEL</Link></h4> : <h1><Link className='logo text-white' to={"/admin"}>ADMIN PANEL</Link></h1>}
          </div>
          <nav className='col d-flex justify-content-between align-items-center'>
            {localStorage[TOKEN_KEY] && <AuthAdminComp />}

            {
              localStorage[TOKEN_KEY] &&
              <ul className='col-md-6 col-lg-4 d-none d-md-flex'>
                <li><Link className='text-white fw-lighter fw-bold fs-5' to="/admin/users">Users</Link></li>
                <li><Link className='text-white fw-lighter fw-bold fs-5' to="/admin/categories">Categories</Link></li>
                <li><Link className='text-white fw-lighter fw-bold fs-5' to="/admin/products">Products</Link></li>
              </ul>
            }
            {
              localStorage[TOKEN_KEY] &&
              <div className='d-flex align-items-center'>
                <span className='me-3 d-md-none'><HamburgerAdmin /></span>
                <span onClick={() => {
                  doApiUserInfo();
                  setTimeout(() => {
                    window.confirm("are you sure you want to go out?")
                    isOffline();
                    localStorage.removeItem(TOKEN_KEY);
                    nav("/admin")
                  }, 200)

                }}>
                  <FontAwesomeIcon icon={faRightFromBracket} size='xl' style={{ color: "#d6feff", cursor: 'pointer' }} />
                </span>
              </div>
            }
          </nav>
        </main>
      </div>
    </header>
  )
}

export default HeaderAdmin