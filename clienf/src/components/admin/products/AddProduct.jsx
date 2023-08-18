import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { useForm } from 'react-hook-form';
import AuthAdminComp from '../layout/AuthAdminComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {


  const nav = useNavigate();
  const [categories, setCategories] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    const url = API_URL + "/categories"
    const data = await doApiGet(url);
    setCategories(data);
  }

  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApiAdd  (bodyData);
  }


  const doApiAdd = async (bodyData) => {
    try {
      const url = API_URL + "/products";
      const data = await doApiMethod(url, "POST", bodyData);
      if (data) {
        toast.success('Product Created!', {
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
          nav(-1);
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
    }
  }



  return (
    <div className='container py-3'>
      <AuthAdminComp/>
        <h2>Add new product form</h2>
        {categories.length > 0 ? <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-2'>

          <label>Name</label>
          <input {...register("name", { required: true, minLength: 3,maxLength:100 })} className="form-control" type="text" />
          {errors.name && <div className="text-danger">* Enter valid name</div>}

          <label>Price</label>
          <input {...register("price", { required: true, min: 1, max: 9999 })} className="form-control" type="number" />
          {errors.price && <div className="text-danger">* Enter valid price (1 to 9999)</div>}

          <label>Category_url</label>
          <select {...register("category_url", { required: true, minLength: 3,maxLength:100 })} className="form-select" type="select" >
            {categories.map(item => {
              return (
                <option key={item._id} value={item.url_name}>{item.name}</option>
              )
            })}
          </select>
          <label>Image url</label>
          <input {...register("image", { required: false, minLength: 2,maxLength:2000 })} className="form-control" type="text" />
          {errors.image && <div className="text-danger">* Enter valid img_url</div>}
          <div>
            <button className='btn btn-success my-3'>Add new</button>
            <button onClick={()=>{nav(-1)}} type='button' className='btn btn-dark my-3 float-end'>Back</button>
          </div>
          
        </form> : <h2>Loading...</h2>}
        <ToastContainer />
      </div>
  )
}

export default AddProduct