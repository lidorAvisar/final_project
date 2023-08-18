import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod, TOKEN_KEY } from '../../../services/apiService'
import AuthAdminComp from '../layout/AuthAdminComp';
import { useNavigate } from 'react-router-dom';
import '../layout/styleHeaderAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const UsersListPhone = () => {

    const [ar, setAr] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const url = API_URL + "/users/usersList";
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (error) {
            alert("")
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        try {
            if (window.confirm("Delete user?")) {
                const url = API_URL + "/users/" + id;
                const data = await doApiMethod(url, "DELETE", {});
                if (data.deletedCount) {
                    doApi();
                }
            }
        }
        catch (error) {
            alert("you can't delete yourself")
            console.log(error);
        }
    }


    return (
        <div className='container'>
            <AuthAdminComp />
            <div className='d-flex flex-wrap justify-content-center d-md-none'>
                {ar.length > 0 ?
                    ar.map((item, i) => {
                        return (
                            <div key={item._id} className='card m-2 my-4 bg-card-users shadow-lg' style={{ width: '14rem', height: '470px' }}>
                                <div className='card-img' style={{ height: '225px' }}><img className='h-100 w-100' style={{ borderRadius: '5px 5px 0px 0px' }} src={item.profileImage} alt="user image" /></div>
                                <div className='card-body'>
                                    <div className='card-text'>
                                        <h5>Name: {item.name}</h5>
                                        <h5>Email: {item.email}</h5>
                                        <h5>Role: {item.role}</h5>
                                        <h5>Date: {item.createdAt.substring(0, 10)}</h5>
                                        {item.role == 'user' &&
                                            <div style={{ fontSize: '1.5em' }} className='pt-4 d-flex justify-content-between align-items-center'>
                                                <span onClick={() => {
                                                    nav("/admin/users/edit/" + item._id + "/" + item.role);
                                                }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#467ddd", cursor: 'pointer' }} /></span>
                                                <span style={{ marginLeft: '14px', height: '15px', width: '15px', borderRadius: '50%', backgroundColor: `${item.isOnline ? 'green' : 'red'}` }}></span>
                                                <span onClick={() => {
                                                    deleteItem(item._id);
                                                }} className='ms-2'><FontAwesomeIcon icon={faTrashCan} style={{ color: "#f03333", cursor: 'pointer' }} /></span>
                                            </div>
                                        }
                                        {item.role == 'admin' &&
                                            <div className='pt-4 d-flex justify-content-between align-items-center pt-5'>
                                                <span style={{ fontSize: '1.5em' }} onClick={() => {
                                                    nav("/admin/users/edit/" + item._id + "/" + item.role);
                                                }} ><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#467ddd", cursor: 'pointer' }} /></span>
                                                <span style={{marginLeft:'14px',height:'15px', width:'15px',borderRadius:'50%',backgroundColor:`${item.isOnline?'green':'red'}`}}></span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <h1>loading . . .</h1>}
            </div>
        </div>
    )
}

export default UsersListPhone