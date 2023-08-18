import axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { API_CITIES, API_STREETS } from '../../services/url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../../context/context';
import '../Navbars/navbars.css'




const ShippingModal = (props) => {

  const [arrC, setArrC] = useState([]);
  const [arrS, setArrS] = useState([]);
  const [empty, setEmpty] = useState(false)
  const [cities, setCities] = useState('');
  const [streets, setStreets] = useState('');
  const refCities = useRef();
  const refStreets = useRef();

  const { darkMode,setShipper } = useContext(AppContext);


  const doApiSearchCities = async () => {
    const { data } = await axios.get(API_CITIES + cities);
    setEmpty(data.result.records ? false : true)
    setArrC(data.result.records);
    console.log(arrC);
  }

  const doApiSearchStreets = async () => {
    const { data } = await axios.get(API_STREETS + streets);
    setEmpty(data.result.records ? false : true)
    setArrS(data.result.records);
    console.log(arrS);
  }

  useEffect(() => {
    console.log(cities, streets);
    doApiSearchCities();
    doApiSearchStreets()
  }, [empty, cities, streets])
  const submit = () => {
    toast.success('המשלוח בדרך אליך', {
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
      setShipper(false);
    }, 2000);
  }


  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered=""
       style={{backdropFilter:'blur(7px)'}}
       
      >
        <Modal.Title id="contained-modal-title-vcenter"  style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}`,borderRadius:'4px 4px 0px 0px'}} >
          <span className={darkMode?'text-white p-3':'text-dark p-3'}>משלוח</span>
          <hr className={darkMode?'text-white':''}/>
        </Modal.Title>
        <Modal.Body  style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}` ,borderRadius:'0px 0px 4px 4px'}}>
          <div>
            <div className='d-sm-flex align-items-center justify-content-center gap-3'>
              <input className={`form-control ${darkMode?'dark-true text-white':'dark-false text-dark'}`} style={{height:'40px',backgroundColor:`${darkMode?'black':'white'}`}} ref={refCities} onChange={() => { setCities(refCities.current.value) }} type="search" placeholder='חפש שם עיר או ישוב . . .' />
              <input className={`form-control mt-3 mt-sm-0 ${darkMode?'dark-true text-white':'dark-false text-dark'}`} style={{height:'40px',backgroundColor:`${darkMode?'black':'white'}`}} ref={refStreets} onChange={() => { setStreets(refStreets.current.value) }} type="search" placeholder='חפש שם רחוב . . .' />
              <img className='d-none d-lg-flex' src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" height="100px" width="150px" />
            </div>
            <h5 className={`text-center mt-4 ${darkMode?'text-white':'text-dark'}`}>שם עיר וישוב</h5>
            <div className='search-cities d-sm-flex  gap-3'>
              <select className="form-select w-100" style={{backgroundColor:`${darkMode?'black':'white'}`}} aria-label="Default select example">
                {arrC ? arrC.map((item) => {
                  return (
                    <option className={`${darkMode?'dark-true text-white bg-black':'dark-false text-dark '}`} key={item._id}>{item.לשכה}</option>
                  )
                }) : ''}
              </select>
              <select className="form-select w-100 mt-3 mt-sm-0" style={{backgroundColor:`${darkMode?'black':'white'}`}} aria-label="Default select example">
                {arrC ? arrC.map((item) => {
                  return (
                    <option  className={`${darkMode?'dark-true text-white':'dark-false text-dark'}`} key={item._id}>{item.שם_ישוב}</option>
                  )
                }) : ''}
              </select>
            </div>
            <h5 className={`text-center mt-3 ${darkMode?'text-white':'text-dark'}`}>שם רחוב </h5>
            <div className="search-streets m-auto w-100">
              <select className="form-select" style={{backgroundColor:`${darkMode?'black':'white'}`}} aria-label="Default select example">
                {arrS ? arrS.map((item) => {
                  return (
                    <option className={`${darkMode?'dark-true text-white':'dark-false text-dark'}`} key={item._id}>{item.שם_רחוב}</option>
                  )
                }) : ''}
              </select>
            </div>
          </div>
          <button onClick={() => { submit() }} className='btn btn-success mt-4'>שלח</button>
          <Button onClick={props.onHide} type="button" className="btn btn-danger float-start mt-4">
            סגור
          </Button>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  )
}
export default ShippingModal