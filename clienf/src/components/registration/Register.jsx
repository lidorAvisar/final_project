import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, doApiMethod, } from '../../services/apiService';
import '../Navbars/navbars.css'
import { useContext } from 'react';
import { AppContext } from '../../context/context';


function Register(props) {

  const {darkMode,setRegister,setLogin } = useContext(AppContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApiRegister(bodyData)
  }

  const doApiRegister = async (bodyData) => {
    try {
      const url = API_URL + "/users";
      const data = await doApiMethod(url, "POST", bodyData);
      if (data._id) {
        toast.success(' נרשמת בהצלחה !', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setRegister(false);
          setLogin(true);
        }, 1800)
        
      }
    }
    catch (error) {
      toast.warn('אירעה שגיאה יש לנסות שוב', {
        position: "top-center",
        autoClose: 1100,
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
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{backdropFilter:'blur(7px)'}}
    >
      <Modal.Title id="contained-modal-title-vcenter" style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}`,borderRadius:'5px 5px 0px 0px'}}>
        <span className={darkMode?'text-white p-3':'text-dark p-3'}>הרשמה</span>
      </Modal.Title>
      <Modal.Body style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}`,borderRadius:'0px 0px 5px 5px'}}>
        <form onSubmit={handleSubmit(onSubForm)} className='p-2' id="id_form" >
          <label className={`${darkMode?'text-white fs-5':'text-dark fs-5'}`}>שם:</label>
          <input className={darkMode?"dark-true form-control bg-black text-white":"form-control dark-false bg-white "} {...register("name", { required: true, minLength: 3, maxLength: 100 })}  placeholder='הכנס שם . . .' type="text" />
          {errors.name && <div className="text-danger">* הכנס שם תקין</div>}

          <label className={`mt-3 ${darkMode?'text-white fs-5':'text-dark fs-5'}`}>אימייל:</label>
          <input className={darkMode?"dark-true bg-black text-white form-control":"form-control dark-false bg-white"} {...register("email", { required: true, minLength: 3, maxLength: 100, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}  placeholder='הכנס אימייל . . . ' type="email" />
          {errors.email && <div className="text-danger">* הכנס אימייל תקין</div>}

          <label className={`mt-3 ${darkMode?'text-white fs-5':'text-dark fs-5'}`}>סיסמא:</label>
          <input className={darkMode?"dark-true bg-black text-white form-control":"form-control  dark-false bg-white "} {...register("password", { required: true, minLength: 3, maxLength: 100 })}  placeholder='הכנס סיסמא . . .' type="password" />
          {errors.password && <div className="text-danger">* הכנס סיסמא תקינה</div>}

          <div className='mt-4'>
            <button className='btn btn-primary'>להרשם</button>
            <Button onClick={props.onHide} type='button' className='btn btn-danger float-start'>סגור</Button>
          </div>
        </form>
        {/* <GoogleRegister/> */}
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
}
export default Register