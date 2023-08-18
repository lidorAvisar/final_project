import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import './cartStyle.css'
import { AppContext } from '../../context/context';
import UserCartItem from './UserCartItem';

export default function UserCart() {

  const { totalPayment,
    userCart,
    doApiRemoveCart,
    cartLength,
    userInfo,
    totalIncShipper,
    darkMode,
    doApiCart,
    setShipper,
  } = useContext(AppContext);

  const nav = useNavigate()

  const { register, handleSubmit, formState: { errors }, } = useForm();

  // remove all items from cart
  const updateCartAll = () => {
    doApiRemoveCart()
    doApiCart(userInfo)
  }

  const onSubForm = (bodyData) => {
    bodyData&&toast.success("😊 תודה שקנית נשמח לראותך שוב", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    updateCartAll();
  };

  return (
    <div className={`container p-3 rounded cart ${darkMode ? 'bg-black' : 'bg-white'}`} style={{ marginTop: '75px' }}>
      <div className="row no-gutters">
        <div className="col-md-6 col-lg-7 col-xl-8">
          <div className="product-details mr-2">
            <div className="d-flex flex-row align-items-center">
              <div onClick={() => { nav(-1) }} style={{ cursor: 'pointer' }} className={`d-flex flex-row align-items-center fs-4 fw-bold ${darkMode ? 'text-warning' : 'text-dark'}`}><span className="ml-2">המשך בקנייה <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ color: "#3B71BA", }} className={darkMode ? 'text-warning' : 'text-dark'} /> </span></div>
              <div onClick={() => { userCart ? updateCartAll() : '' }} className={`${cartLength < 1 ? 'disabled' : ''} btn btn-danger me-auto`}>נקה עגלה</div>
            </div>

            <hr />

            <h5 className="mb-0">עגלת קניות</h5>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: '1.3em' }}>יש לך {cartLength} מוצרים בעגלה.</span>
            </div>

            {/* itemProducts */}
            {userCart.map((item, i) => (
              <UserCartItem item={item} key={i} />
            ))}

            <div dir='rtl' className='fs-3 mt-2'>סה"כ לתשלום: ₪{totalPayment}</div>
          </div>
        </div>

        {/* buying */}
        <div className="col-md-6 col-lg-5 col-xl-4">
          <div className={`${darkMode ? 'payment-info-true' : 'payment-info'} `}>
            <div className="d-flex justify-content-between align-items-center">
              <span className={`text-decoration-underline fs-4 mb-3 ${darkMode ? 'text-warning' : 'text-white'}`}>פרטי אשראי</span><img className="rounded mb-3" src={userInfo ? userInfo.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} width="35" height="32px" />
            </div>
            {/* <span className="type d-block mt-3 mb-1">Card type</span> */}
            <form onSubmit={handleSubmit(onSubForm)}>
              <div>
                <label className="credit-card-label">שם בעל הכרטיס</label>
                <input {...register("name", { required: true, minLength: 3, maxLength: 100 })} type="text" className={`${darkMode ? 'dark-true-cart' : ''} form-control credit-inputs`} placeholder="שם פרטי ומשפחה . . ." />
                {errors.name && <div className="text-warning fs-6">* הכנס שם תקין</div>}
              </div>

              <div>
                <label className="credit-card-label">מספר כרטיס</label>
                <input {...register("cardNumber", { required: true, minLength: 16, maxLength: 16, })} type="text" className={`${darkMode ? 'dark-true-cart' : ''} form-control credit-inputs`} placeholder="XXXX-XXXX-XXXX-XXXX . . ." />
                {errors.cardNumber && <div className="text-warning fs-6">* הכנס מספר כרטיס תקין</div>}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="credit-card-label">תוקף</label>
                  <input  {...register("date", { required: true })} type="date" className={`${darkMode ? 'dark-true-cart' : ''} form-control credit-inputs`} />
                  {errors.date && <div className="text-warning fs-6">* הכנס תאריך תקין</div>}
                </div>
                <div className="col-md-6">
                  <label className="credit-card-label">3 ספרות </label>
                  <input {...register("cvv", { required: true, minLength: 3, maxLength: 3, })} maxLength={3} type="text" className={`${darkMode ? 'dark-true-cart' : ''} form-control credit-inputs`} placeholder="●●●" />
                  {errors.cvv && <div className="text-warning fs-6">* הכנס קוד תקין</div>}
                </div>
              </div>

              <hr className="line" />

              <div className='text-center my-3'>
                <button onClick={() => { setShipper(true) }} className='btn btn-success border border-info  px-5 ' type='button'>משלוח</button>
              </div>
              <div className="d-flex justify-content-between information">
                <span>סה"כ</span><span>₪{totalPayment}</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>משלוח</span><span>₪20.00</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>סה"כ(סה"כ כולל משלח)</span><span>₪{totalPayment > 0 ? totalIncShipper : totalPayment}</span>
              </div>
              <button className={`btn btn-warning btn-block d-flex m-auto  mt-3 ${cartLength < 1 ? 'disabled' : ''}`} style={{ padding: '5px 24% 5px 24%' }}><span>לתשלום {totalPayment > 0 ? totalIncShipper : totalPayment} ₪</span></button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div >
    </div >
  )
}