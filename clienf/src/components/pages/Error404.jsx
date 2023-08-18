import React from 'react'
import './error404.css'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {

  const nav = useNavigate();

  return (
    <div className='E404'>
      <div className=' d-flex justify-content-center align-items-center pt-5'>
        <h4 className='animate-charcter fs-1 text-white d-block text-center'>נראה שהגעת למחלקה לא נכונה</h4>
      </div>
      
      <div className='d-flex justify-content-center text-white d-block waviy' style={{fontSize:'100px'}}>404</div>

      <div className='d-flex justify-content-center mt-5 gap-3'>
        <button onClick={()=>{nav(-1)}} className='btn btn-info fw-bold'>חזרה</button>
        <button onClick={()=>{nav("/")}} className='btn btn-success fw-bold'>חזרה לדף הבית</button>
      </div>
    </div>
  )
}

export default Error404