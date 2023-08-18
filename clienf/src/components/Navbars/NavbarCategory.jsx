import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleWhole, faCarrot, faSnowflake, faBreadSlice, faWineBottle, faMugHot, faBottleWater, faEgg, faBottleDroplet, faStar, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './navbars.css'

const NavbarCategory = () => {

  const { totalPayment, cartLength, darkMode} = useContext(AppContext);


  return (
    <div>
      <div className="categories d-none d-lg-flex align-items-center justify-content-lg-between justify-content-xl-center">
        <div className="rounded-4 me-2" style={{ height: '90px', backgroundColor: `${darkMode ? 'black' : 'white'}`, boxShadow: `${darkMode ? '0px 2px 15px 3px white' : '3px 5px 20px 5px gray'}` }} >
          <ul className='list-unstyled d-flex text-center pt-1  '>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/sale-prices"}> <li className='fw-bold ps-lg-1'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faStar} style={{ color: "#e8f34f" }} /></span> <span className='text-color-yellow'><br />מבצעים </span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/fruits"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faAppleWhole} style={{ color: "#c01b1b" }} /></span> <span className='text-color-red'><br />פירות</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/vegetables"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faCarrot} style={{ color: "#ff9500" }} /></span> <span className='text-color-orange'><br />ירקות</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/frozen"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faSnowflake} style={{ color: "#34c1cb" }} /></span> <span className='text-color-light_blue'><br />קפואים</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/breads"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faBreadSlice} style={{ color: "#c5b081" }} /></span> <span className='text-color-body'><br />לחמים ומאפים</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/wines"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faWineBottle} style={{ color: "#44179f" }} /></span> <span className='text-color-purple'><br />יינות</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/hot-drinks"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faMugHot} style={{ color: "#7F461B" }} /></span> <span className='text-color-brown'><br />משקאות חמים</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/soft-drinks"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faBottleDroplet} style={{ color: "#60d27c" }} /></span> <span className='text-color-green'><br />משקאות קרים</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/cat/dairy"}> <li className='fw-bold mx-lg-1 mx-xl-2 mx-xxl-3'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faEgg} size='sm' style={{ color: "#b5b5b5" }} /><FontAwesomeIcon className='iconHover' icon={faBottleWater} style={{ color: "#5077b9", marginRight: '-4px' }} /></span> <span className='text-color-blue'><br />מוצרי חלב</span> </li></Link>
            <Link className={`text-decoration-none ${darkMode ? 'text-white' : 'text-dark'}`} to={"/"}> <li className='fw-bold ps-lg-2 ps-xl-4 pe-lg-2'><span className='fs-3'><FontAwesomeIcon className='iconHover' icon={faBagShopping} style={{ color: "#d052e0" }} /></span> <span className='text-color-pink'><br /> דף הבית </span> </li></Link>
          </ul>
        </div>

        <div className="left ms-4 text-center rounded-4" style={{ height: '90px', width: '100px', position: 'absolute', left: '0px', backgroundColor: `${darkMode ? 'black' : 'white'}`, boxShadow: `${darkMode ? '0px 2px 15px 3px white' : '3px 5px 20px 5px gray'}` }}>
          <Link to={"/cart"}><div className={`position-absolute px-2 ${darkMode ? 'bg-info text-dark' : 'bg-danger text-white'} `} style={{ borderRadius: '100px', left: '50px' }}>{cartLength}</div>
            <BsCart4 style={{ fontSize: "45px", color: `${darkMode ? 'rgb(255, 193, 7)' : 'rgb(35, 76, 210)'} `, marginTop: '10px' }} /> <br /></Link>
          <h5 className={`mt-1 ${darkMode ? 'text-warning' : 'text-dark'}`}>{totalPayment} ₪</h5>
        </div>
      </div>


    </div>
  )
}

export default NavbarCategory