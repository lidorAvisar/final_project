import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, TOKEN_KEY, doApiGet } from '../../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthAdminComp = () => {

  const nav = useNavigate();

  useEffect(() => {
    doApiCheckToken();
  }, [])

  const doApiCheckToken = async () => {
    try {
      const url = API_URL + "/users/checkToken";
      const data = await doApiGet(url);
      if (data.role == "user") {
        nav('*');
      }
    }
    catch (err) {
      toast.info('session expired please login!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        localStorage.removeItem(TOKEN_KEY)
        nav("/admin");
      }, 2000);
    }
  }

  return (
    <React.Fragment><ToastContainer /></React.Fragment>
  )
}

export default AuthAdminComp