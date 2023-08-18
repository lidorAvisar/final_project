import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/context';
import { useForm } from 'react-hook-form';
import { API_URL, TOKEN_KEY, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

const UserEdit = () => {

  const [cheaackPassword, setCheaackPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userInfo, darkMode, doApiEditUser, doApiEditUserPassword } = useContext(AppContext);
  const nav = useNavigate();
  const RefCheack = useRef();
  const RefChange = useRef();


  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApiEditUser(bodyData)
  }

  const cheackPassword = async () => {
    const url = API_URL + "/users/checkPassword";
    const data = await doApiMethod(url, "POST", { password: RefCheack.current.value })
    if (data) {
      setCheaackPassword(true);
    }
    else {
      toast.warning('הסיסמא לא נכונה', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  const changePassword = () => {
    doApiEditUserPassword({ password: RefChange.current.value })
  }

  const deleteUser = async () => {
    try {
      if (window.confirm("האם אתה בטוח?")) {
        const url = API_URL + "/users/deleteUser/" + userInfo._id;
        const data = await doApiMethod(url, "DELETE", {});
        if (data.deletedCount) {
          localStorage.removeItem(TOKEN_KEY);
          nav("/");
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
      {userInfo ?
        <div className='mt-5 pt-4'>
          <div className='text-center mt-4'>
            <h1 className='text-decoration-underline'>הגדרות החשבון</h1>
          </div>
          <div className='d-flex justify-content-center'>
            <div className='d-lg-flex justify-content-around align-items-center w-75 rounded-3' style={{ backgroundColor: `${userInfo.profileColor}` }}>
              <div>
                <h4 className='text-center text-lg-end'> <span className='text-decoration-underline'>שם:</span> {userInfo.name}</h4>
                <h4 className='text-center text-lg-end'> <span className='text-decoration-underline'>אימייל:</span> {userInfo.email}</h4>
                <h4 className='text-center text-lg-end'> <span className='text-decoration-underline'>נוצר ב:</span> {userInfo.createdAt.substring(0, 10)}</h4>
              </div>
              <div>
                <h4 className='d-flex justify-content-center'><img className='rounded-4 pt-2 p-1' src={userInfo.profileImage} alt="" height="200px" width="200px" /></h4>
              </div>
            </div>
          </div>
          <h5 className='fs-3 text-decoration-underline text-center mt-5'>שינוי פרטים</h5>
          <div className="edit-user container p-3 rounded-5 d-sm-flex  justify-content-sm-evenly">

            <form className='d-flex justify-content-center' onSubmit={handleSubmit(onSubForm)}>

              <div className='mt-1'>
                <div>
                  <label className='fs-5'>שינוי שם:</label>
                  <input {...register("name", { required: true, minLength: 3, maxLength: 100 })} defaultValue={userInfo.name} className='form-control' style={{ backgroundColor: `${darkMode ? 'black' : 'white'}`, height: "40px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', maxWidth: '210px' }} placeholder='הכנס שם חדש . . .' type="text" />
                  {errors.name && <div className="text-danger">* הכנס שם תקין</div>}
                </div>

                <div>
                  <label className='fs-5 mt-3'>שינוי תמונה:</label>
                  <input {...register("profileImage", { required: true, minLength: 3, maxLength: 300 })} defaultValue={userInfo.profileImage} className='form-control ' style={{ backgroundColor: `${darkMode ? 'black' : 'white'}`, height: "40px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', maxWidth: '210px' }} placeholder='הכנס קישור לתמונה . . .' type="text" />
                  {errors.profileImage && <div className="text-danger">* הכנס קישור תקין</div>}
                </div>

                <div>
                  <label className='fs-5 mt-3'>שינוי צבע פרופיל:</label><br />
                  <input {...register("profileColor", { required: true, minLength: 3, maxLength: 300 })} defaultValue={userInfo.profileColor} className='form-control' style={{ backgroundColor: `${darkMode ? 'black' : 'white'}`, height: "40px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', maxWidth: '210px' }} type="color" /><br />

                  <button className='btn btn-success'>עדכן</button>
                  <button onClick={() => { deleteUser() }} type='button' className='btn btn-danger mt-4 d-none d-sm-flex'>הסר חשבון</button>
                </div>
              </div>

            </form>

            <div className='d-flex justify-content-center'>
              <div>
                <h4 className='text-decoration-underline mt-4 mt-sm-0'>שינוי סיסמא</h4>
                <label className='fs-5'>בדיקת סיסמא:</label>
                <input ref={RefCheack} minLength={3} maxLength={100}  className='form-control' style={{ backgroundColor: `${darkMode ? 'black' : 'white'}`, height: "40px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', maxWidth: '210px' }} placeholder='הכנס סיסמא נוכחית . . .' type="password" />
                <button onClick={() => { cheackPassword() }} className='btn btn-warning mt-3 mb-2'>בדוק סיסמא</button>
                <br />
                <div className={`mt-4 ${cheaackPassword ? 'd-flex' : 'd-none'}`}>
                  <div>
                    <label className='fs-5'>שינוי סיסמא:</label>
                    <input ref={RefChange} minLength={3} maxLength={100} className='form-control' style={{ backgroundColor: `${darkMode ? 'black' : 'white'}`, height: "40px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', maxWidth: '210px' }} placeholder='הכנס סיסמא חדשה . . .' type="password" />
                    <button onClick={() => { changePassword() }} className={`btn btn-success mt-3`}>עדכן סיסמא</button><br />
                  </div>
                </div>
                <button onClick={() => { deleteUser() }} type='button' className='btn btn-danger mt-5 d-sm-none'>הסר חשבון</button>
              </div>
            </div>
            
          </div>
        </div>
        : <h4>loading . . . </h4>}
      <ToastContainer />
    </div>
  )
}
export default UserEdit