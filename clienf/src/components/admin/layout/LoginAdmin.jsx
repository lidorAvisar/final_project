import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL, TOKEN_KEY, doApiMethod } from '../../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import './styleLoginAdmin.css'


const LoginAdmin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    doApiLogin(bodyData);
  }


  const doApiLogin = async (bodyData) => {
    try {
      const url = API_URL + "/users/login";
      const data = await doApiMethod(url, "POST", bodyData);
      if (data.role == "user") {
        toast.warn('you must be admin to be here!', {
          position: "top-center",
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          nav("/");
        }, 3100);
      }
      else if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        toast.success(`${data.name} ברוך הבא `, {
          position: "top-center",
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          nav("/admin/users");
        }, 3100);
        
      }
    }
    catch (error) {
      toast.warn('Password or user name wrong!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        limit: 1
      });
    }
  }

  return (
    <div className='pt-4 bg-LoginAdmin'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box shadow-lg">
            <div className="col-lg-12 login-key">
              <FontAwesomeIcon icon={faLock} style={{ color: "#53CAC6", fontSize: '100px', marginTop: '15px' }} />
            </div>

            <div className="col-lg-12 login-title mt-4">
              ADMIN LOGIN
            </div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit(onSubForm)}>

                  <div className="input-login-admin form-group">
                    <label className="form-control-label">EMAIL:</label>
                    <input  {...register("email", { required: true, minLength: 3, maxLength: 100, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="text" className="form-control" />
                    {errors.email && <div className="text-danger">* Enter valid email</div>}
                  </div>

                  <div className="input-login-admin form-group">
                    <label className="form-control-label">PASSWORD:</label>
                    <input {...register("password", { required: true, minLength: 3, maxLength: 100 })} type="password" className="form-control" />
                    {errors.password && <div className="text-danger">* Enter valid password</div>}
                  </div>

                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-text">
                    </div>
                    <div className="col-lg-6 login-btm login-button">
                      <button className="btn btn-outline-primary rounded-1">LOGIN</button>
                    </div>
                    <button onClick={() => { nav("/") }} type='button' className="btn btn-outline-primary rounded-1 float-end">GO TO HOME PAGE</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default LoginAdmin