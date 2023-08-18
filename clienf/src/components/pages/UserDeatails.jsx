import React, { useContext, useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/context'
import './style.css'

const UserDeatails = () => {

    const { darkMode, userInfo } = useContext(AppContext);

    const nav = useNavigate();

    const isOffline = async () => {
        try {
            const url = API_URL + "/users/logout";
            const data = await doApiMethod(url, "PATCH", userInfo);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="dropdown initialism">
                <div className='mt-2' style={{ cursor: 'pointer', border: `${userInfo && userInfo.profileColor} 3px solid`, borderRadius: '50%', padding: '2px' }} data-bs-toggle="dropdown" aria-expanded="false" >
                    <img className='rounded-5' style={{ height: '35px', width: '35px' }} src={userInfo ? userInfo.profileImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="user img" />
                </div>
                <ul className="dropdown-menu" style={{ cursor: 'pointer', fontFamily: 'sans-serif', backgroundColor: `${darkMode ? 'rgb(20, 20, 20)' : 'white'}` }}>
                    <li className={`fw-bold text-decoration-underline text-center pb-2 ${darkMode ? 'text-warning' : 'text-dark'}`}>שלום {userInfo && userInfo.name}</li>
                    <Link to={"/userEdit"} className={`text-decoration-none `}> <li className={`dropdown-item fw-bold ${darkMode ? 'text-primary' : 'text-dark'}`}>פרטי משתמש <span className='pe-1'><FontAwesomeIcon icon={faCircleInfo} style={{ color: "#969696", }} /></span> </li></Link>
                    <Link to={"/cart"} className={`text-decoration-none`}> <li className={`dropdown-item fw-bold ${darkMode ? 'text-primary' : 'text-dark'}`}>העגלה שלי <span className='pe-1'><FontAwesomeIcon icon={faCartShopping} style={{ color: "#0275d8", }} /></span> </li></Link>
                    <li onClick={() => {
                        setTimeout(() => {
                            if (window.confirm('האם אתה בטוח?')) {
                                isOffline();
                                localStorage.removeItem(TOKEN_KEY);
                                window.location.reload();
                            }
                        }, 100)

                    }} className={`dropdown-item fw-bold ${darkMode ? 'text-primary' : 'text-dark'}`}>התנתק <span className='pe-1'><FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#d9534f", }} /></span> </li>
                </ul>
            </div>
        </div>
    )
}
export default UserDeatails