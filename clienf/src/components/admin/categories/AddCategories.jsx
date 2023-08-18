import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, doApiMethod } from '../../../services/apiService'
import { useForm } from 'react-hook-form';
import AuthAdminComp from '../layout/AuthAdminComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategories = () => {

  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApi(bodyData);
  }


  const doApi = async (bodyData) => {
    try {
      const url = API_URL + "/categories";
      const data = await doApiMethod(url, "POST", bodyData);
      console.log(data);
      if (data) {
        toast.success('category added successfully!', {
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
          nav("/admin/categories");
        }, 3100)
      }
    }
    catch (error) {
      toast.error('error has been occurred', {
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
    <div>
      <AuthAdminComp />
      <div className='container py-3'>
        <h2>Add new categories form</h2>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-2'>
          <label>Name</label>
          <input {...register("name", { required: true, minLength: 3, maxLength: 100 })} className="form-control" type="text" />
          {errors.name && <div className="text-danger">* Enter valid name</div>}
          <label>Url name</label>
          <input {...register("url_name", { required: true, minLength: 3, maxLength: 100 })} className="form-control" type="text" />
          {errors.url_name && <div className="text-danger">* Enter valid url_name</div>}
          <div>
            <button className='btn btn-success my-3'>Add new</button>
            <button onClick={() => { nav(-1) }} className='btn btn-dark my-3 float-end'>Back</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default AddCategories