import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService';

const AuthUserComp = () => {

    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [])
    

    const doApi = async () => {
        try {
            const url = API_URL + "/users/checkToken";
            await doApiGet(url);
        }
        catch (err) {
            toast.info('נותקת מהמערכת ,יש להתחבר מחדש ', {
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
                window.location.reload();
            }, 2000);
            console.log(err);
        }
    }
    return (
        <React.Fragment><ToastContainer /></React.Fragment>
    )
}

export default AuthUserComp