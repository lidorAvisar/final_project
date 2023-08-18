import React, { useRef, useState, useContext } from 'react'
import { AppContext } from '../../context/context';
import { FaSearch, FaTruck } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import { BsFillPersonVcardFill, BsCart4 } from 'react-icons/bs';
import Hamburger from './Hamburger';
import Login from '../registration/Login';
import Register from '../registration/Register';
import { TOKEN_KEY } from '../../services/apiService';
import UserDeatails from '../pages/UserDeatails';
import AuthUserComp from '../pages/AuthUserComp';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import './navbars.css';
import ShippingModal from '../pages/ShippingModal';


const TopNavbar = () => {

  const [togleInput, setTogleInput] = useState(false);

  const Ref = useRef();

  const { doApiSearch, cartLength, setDarkMode, darkMode,setRegister,register,setLogin,login,shipper,setShipper } = useContext(AppContext);

  return (
    <div>

      {localStorage[TOKEN_KEY] && <AuthUserComp />}

      {/* screen-lg */}
      <div className='screen-lg d-none d-lg-flex align-items-center justify-content-between position-relative'>
        {darkMode && <span style={{ position: 'absolute', top: '0', right: '50px', boxShadow: '5px -15px 40px 15px  rgb(236,201,62)', width: '150px' }}></span>}
        {!darkMode && <span style={{ position: 'absolute', top: '0', right: '50px', boxShadow: '5px -15px 40px 15px  blue', width: '150px' }}></span>}
        <div className={`img-brand d-flex align-items-center${localStorage[TOKEN_KEY] ? '' : 'col-lg-3 col-xl-3 col-xxl-3 me-3 me-xxl-5'}`}>
          <Link to={"/"}> <img className='me-0' src="https://cdn.pixabay.com/photo/2014/04/03/10/00/shopping-cart-309592_960_720.png" height={"40px"} width={"50px"} alt="" /></Link>
          <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/"}> <h4 className='mx-1 pt-2'>Online Market</h4></Link>
        </div>

        <div className="d-flex mb-3 col-lg-5 col-xl-5 col-xxl-4 mt-3">
          <input
            ref={Ref} onKeyDown={(e) => {
              if (e.key == 'Enter') {
                doApiSearch(Ref.current.value);
              }
            }} style={{ backgroundColor: `${darkMode ? 'black' : 'white'}`, height: "45px", borderRadius: '0px 10px 10px 0px', outline: 'none', boxShadow: 'none' }} type="search" className={darkMode ? "dark-true form-control btn-outline-none text-white " : "dark-false form-control btn-outline-none"} placeholder="מה תרצה לחפש היום?" aria-label="Example text with button addon" aria-describedby="button-addon1" />

          <button onClick={() => {
            doApiSearch(Ref.current.value);
          }} style={{ height: "45px", borderRadius: '10px 0px 0px 10px' }} className={darkMode ? "btn btn-outline-warning" : "btn btn-outline-success"} type="button" id="button-addon1"><FaSearch /></button>

          {/* dark mode */}
          <div className='d-flex me-5'>
            {!darkMode && <span className='fs-2 ' style={{ cursor: 'pointer' }} onClick={() => { setDarkMode(true) }}><FontAwesomeIcon icon={faSun} style={{ color: "#edd00a", }} /></span>}
            {darkMode && <span className='fs-2 ' style={{ cursor: 'pointer' }} onClick={() => { setDarkMode(false) }}><FontAwesomeIcon icon={faMoon} style={{ color: "#ffffff", }} /></span>}
            <span className='fs-4 pt-2 pe-4'> <span style={{ cursor: 'pointer' }} onClick={() => { setShipper(true) }}><FaTruck className={darkMode ? "text-warning" : "text-danger"} /></span> </span>
          </div>
        </div>

        {!localStorage[TOKEN_KEY] && <div className="left_nav col-lg-4 col-xl-4 col-xxl-3  ms-3">
          <ul className='list-unstyled d-flex align-items-center'>
            <button className='btn text-decoration-none' style={{ border: 'none' }} > <li onClick={() => setLogin(true)} className='fs-5 pt-2 pe-xl-5 pe-xxl-5'><CiLogin className={darkMode ? 'text-warning' : 'text-primary'} /> <span onClick={() => setLogin(true)} style={{ fontSize: '20px' }} className={darkMode ? 'text-warning' : ''} >התחברות</span> </li></button>
            <button className='btn text-decoration-none' style={{ border: 'none' }} > <li onClick={() => setRegister(true)} className='fs-5 pt-2'><BsFillPersonVcardFill className={darkMode ? 'text-warning' : 'text-primary'} /><span onClick={() => setRegister(true)} className={darkMode ? 'text-warning pe-2' : 'pe-2'}>הרשמה</span></li></button>
          </ul>
        </div>}

        {localStorage[TOKEN_KEY] &&
          <div className='ms-5 ps-2'>
            <div>
              <UserDeatails />
            </div>
          </div>
        }
      </div>
   
      <Login
        show={login}
        onHide={() => setLogin(false)}
      />
      <Register
        show={register}
        onHide={() => setRegister(false)}
      />
      <ShippingModal
        show={shipper}
        onHide={() => setShipper(false)}
      />

      {/* screen-sm */}
      <div className='screen-sm d-flex d-lg-none align-items-center justify-content-between position-fixed top-0 start-0 end-0 z-3' style={{ backgroundColor: `${darkMode ? 'black' : 'rgba(192,192,192)'}` }}>
        <div className="right-nav d-flex col-3  align-items-center">

          <div className='hamburder d-flex align-items-center'>
            <Hamburger />
          </div>

          <Link to={"/cart"}><div className="position-relative">
            <div className={`position-absolute ${darkMode ? 'bg-info' : 'bg-danger text-white'}  px-2 `} style={{ borderRadius: '100px', left: '10px' }}>{cartLength}</div>
            <span className={`fs-1 ${darkMode ? 'text-warning' : 'text-dark'}`} style={{ textDecoration: 'rtl' }}><BsCart4 /></span>
          </div></Link>


        </div>

        <div className="search-nav mb-3  mt-3 rounded-5">
          <button onClick={() => { setTogleInput(!togleInput) }} style={{ border: 'none', padding: '9px', paddingBottom: '10px', borderRadius: '100%' }} className={`${darkMode ? 'bg-warning' : 'bg-primary'}`} type="button"><span className={`${darkMode ? 'text-dark' : 'text-white'} p-1`}><FaSearch /></span></button>
        </div>

        {/* dark mode */}
        <div className='col-1' style={{ position: 'fixed', left: '60px', bottom: '10px', zIndex: '999' }}>
          {!darkMode && <span className='fs-2 pe-5' style={{ cursor: 'pointer' }} onClick={() => { setDarkMode(!darkMode) }}><FontAwesomeIcon icon={faSun} style={{ color: "#edd00a", backgroundColor: 'lightskyblue', borderRadius: '20%', padding: '3px' }} /></span>}
          {darkMode && <span className='fs-2 pe-5' style={{ cursor: 'pointer' }} onClick={() => { setDarkMode(!darkMode) }}><FontAwesomeIcon icon={faMoon} style={{ color: "#ffffff", padding: '3px' }} /></span>}
        </div>

        {!localStorage[TOKEN_KEY] &&
          <div className="left_nav d-flex align-items-center col-5 col-sm-4 col-md-3 justify-content-around justify-content-md-center">

            <div>
              <span className='fs-4 pt-2' > <span style={{ cursor: 'pointer' }} onClick={() => { setShipper(true) }}><FaTruck className={darkMode ? "text-warning" : "text-danger"} /></span> </span>
            </div>

            <div className='mx-md-3 d-flex'>
              <button className={`btn text-decoration-none`} style={{ fontSize: '1.2em', border: 'none' }} onClick={() => setLogin(true)}> <span className='pt-2  text-center'><CiLogin className={` ${darkMode ? 'text-white' : 'text-primary'} text-primary`} /> </span></button>
              <button className={`btn text-decoration-none`} style={{ fontSize: '1.2em', border: 'none' }} onClick={() => setRegister(true)}> <span className=' pt-2  text-center'><BsFillPersonVcardFill className={` ${darkMode ? 'text-white' : 'text-primary'} text-primary`} /></span></button>
            </div>

          </div>
        }

        {/* login */}
        {localStorage[TOKEN_KEY] &&
          <div className='ms-5 d-flex'>
            <div>
              <UserDeatails />
            </div>
          </div>
        }
      </div>

      {/* see the input */}
      {togleInput &&
        <div className={`nav-bar-input container d-lg-none position-fixed top-25 start-0 end-0 z-3 mt-5`}>
          <input ref={Ref} onKeyDown={(e) => {
            if (e.key == 'Enter') {
              doApiSearch(Ref.current.value);
            }
          }} style={{ height: "45px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none' }} type="search" className={`form-control btn-outline-none ${darkMode ? 'dark-true' : 'dark-false'}`} placeholder="מה תרצה לחפש היום?" aria-label="Example text with button addon" aria-describedby="button-addon1" />
        </div>
      }
    </div>
  )
}

export default TopNavbar