import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import AuthAdminComp from '../layout/AuthAdminComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../layout/styleHeaderAdmin.css'


const EditUsers = () => {

    const nav = useNavigate();
    const { id } = useParams()
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        const url = API_URL + "/users/single/" + id;
        const UserData = await doApiGet(url);
        setUser(UserData);
        setUserInfo(UserData)
    }
    const onSubForm = (roleData) => {
        doApiEditUser(roleData);
    };


    const doApiEditUser = async (roleData) => {
        try {
            const url = API_URL + "/users/changeRole/" + id + "/" + roleData.role;
            const data = await doApiMethod(url, "PATCH", roleData);
            if (data.modifiedCount) {
                toast.success('User role updated', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  setTimeout(() => {
                    nav(-1);
                  }, 3100)
            }
        }
        catch (error) {
            toast.error('failed to update this user role', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            console.log(error);
        }
    }

    return (
        <div className='container py-3 d-flex justify-content-center mt-5'>
            <AuthAdminComp />
            {userInfo.name?
            <div className='card shadow-lg bg-card' style={{ width: '22rem'}}>
                <div className='card-img'><img className='h-100 w-100' src={userInfo.profileImage} alt="user image" /></div>
                <div className='card-body '>
                    <div className='card-text'>
                        <h1 className='text-decoration-underline text-center'>Edit user role  </h1>
                        <h4 > <span className='fw-bold text-decoration-underline'>Name:</span>  {userInfo.name}</h4>
                        <h5 className='py-2'> <span className='fw-bold text-decoration-underline'>Email:</span> {userInfo.email}</h5>
                        <form onSubmit={handleSubmit(onSubForm)}>
                            <label><h5> <span className='fw-bold text-decoration-underline'>Role:</span> {userInfo.role}</h5></label>
                            <select {...register("role", { required: true, minLength: 4 ,maxLength:6})} className="form-select" type="select" >
                                        <option  value="user">user</option>
                                        <option  value="admin">admin</option>
                            </select>
                            <div className='mt-3'>
                                <button className='btn btn-primary'>Update!</button>
                                <button type='button' className='btn btn-dark float-end' onClick={() => {
                                    nav(-1)
                                }}>Back</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div>:<h1>loading . . .</h1>}
            <ToastContainer />
        </div>

    )
}

export default EditUsers