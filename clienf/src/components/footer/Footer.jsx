import React, { useContext } from 'react'
import { AppContext } from '../../context/context';
import { BsFacebook } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../services/apiService';


const Footer = () => {

    const { darkMode, doApiAddToCart } = useContext(AppContext);
    const nav = useNavigate();


    return (
        <div>
            <div className={`top-footer mt-5 ${darkMode ? 'bg-black' : ''}`} style={{ height: '45px', backgroundColor: 'lightgray' }}></div>
            <div className=''>
                <div className="footer container-fluid mt-4 fw-bold fs-5">
                    <ul className='list-unstyled text-center d-sm-flex justify-content-center p-0' style={{ lineHeight: '25px', fontSize: '15px', wordSpacing: '0px' }}>
                        <li><Link to={'/'} className={`${darkMode ? 'text-white' : ''} nav-link px-2`}>בית</Link></li>
                        <li><Link to={'/contact-us'} className={`${darkMode ? 'text-white' : ''} nav-link px-2`}>צור קשר</Link></li>
                        <li><Link to={'/FAQ'} className={`${darkMode ? 'text-white' : ''} nav-link px-2`}>שאלות נפוצות</Link></li>
                        <li onClick={() => {
                            { localStorage[TOKEN_KEY] ? nav("/userEdit") : doApiAddToCart() }
                        }} className={`${darkMode ? 'text-white' : ''} nav-link px-2`} style={{cursor:'pointer'}} >איזור אישי</li>
                    </ul>
                    <ul className='d-flex justify-content-center list-unstyled p-0'>
                        <li className='px-3'><BsFacebook style={{ color: "#1977F2", fontSize: "30px " }} /></li>
                        <li className='px-3'><BsGithub style={{ color: "#000000", fontSize: "30px" }} /> </li>
                        <li className='px-3'><BsInstagram style={{ color: "#E1306C", fontSize: "30px" }} /></li>
                        <li className='px-3'><BsLinkedin style={{ color: "#0077b5", fontSize: "30px" }} /></li>
                    </ul>
                </div>
            </div>
            <div className="copyright-footer">
                <div style={{ borderBottom: '1px solid gray', width: '90%', margin: '0 auto' }}></div>
                <p className='text-center pt-4 pb-4' style={{ fontFamily: 'initial' }}>Copyright © 2023 - All right reserved by Lidor Avisar & Nadav Yonatanov</p>
            </div>
        </div>
    )
}

export default Footer
