import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AppContext } from "../../context/context";
import '../Navbars/navbars.css'


function Login(props) {

  const {doApiLogin,darkMode} = useContext(AppContext);

  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApiLogin(bodyData);
  };


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{backdropFilter:'blur(7px)'}}
    >
      <Modal.Title id="contained-modal-title-vcenter" style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}`,borderRadius:'5px 5px 0px 0px'}}>
        <span className={darkMode?'text-white p-3':'text-dark p-3'}>התחברות</span>
      </Modal.Title>
      <Modal.Body style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}`,borderRadius:'0px 0px 5px 5px'}}>
        <form onSubmit={handleSubmit(onSubForm)} className="p-2" id="id_form">
          <label className={`${darkMode?'text-white fs-5':'text-dark fs-5'}`}>אימייל:</label>
          <input className={darkMode?"dark-true bg-black text-white form-control":"form-control bg-white dark-false text-dark"}  {...register("email", { required: true, minLength: 3, maxLength: 100, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="הכנס אימייל . . ."   type="email" />
          {errors.email && (<div className="text-danger">* הכנס אימייל תקין</div>)}

          <label className={`${darkMode?'text-white fs-5 mt-3':'text-dark fs-5 mt-3'}`}>סיסמא:</label>
          <input className={darkMode?"dark-true bg-black text-white form-control":"form-control bg-white dark-false text-dark"} {...register("password", { required: true, minLength: 3, maxLength: 100 })}  placeholder="הכנס סיסמא . . ." type="password" />
          {errors.password && (<div className="text-danger">* הכנס סיסמא תקינה</div>)}

          <div className="mt-4">
            <button className="btn btn-success">התחבר</button>
            <Button onClick={props.onHide} type="button" className="btn btn-danger float-start">
              סגור
            </Button>
          </div>
        </form>
        {/* <GoogleRegister /> */}
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
}
export default Login;
