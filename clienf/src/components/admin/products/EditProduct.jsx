import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import AuthAdminComp from '../layout/AuthAdminComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProduct = () => {

  const nav = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState({});


  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    const url = API_URL + "/categories"
    const data = await doApiGet(url);
    const url2 = API_URL + "/products/single/" + id;
    const dataInfo = await doApiGet(url2);
    setCategories(data);
    setInfo(dataInfo)
    console.log(info);
  }

  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApiEditForm(bodyData);
  }



  const doApiEditForm = async (bodyData) => {
    try {
      const url = API_URL + "/products/" + id;
      const data = await doApiMethod(url, "PUT", bodyData);
      console.log(data);
      if (data.modifiedCount) {
        toast.success('Product updated', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          nav(-1);
        }, 2500)
      }
    }
    catch (error) {
      toast.error('failed to update this product', {
        position: "top-center",
        autoClose: 1500,
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
    <div className='container py-3 d-flex justify-content-center mt-5'>
      <AuthAdminComp/>
       {categories.length > 0 && info.name ? <div className='card' style={{ width: '26rem' }}>
        <div className='card-img'><img className='h-100 w-100' src={info.image} alt="product image" /></div>

        <div className='card-body'>
          <div className='card-text'>
            <h2>Edit product form </h2>
             <form onSubmit={handleSubmit(onSubForm)} className=' p-2'>
              <label>Name</label>
              <input defaultValue={info&& info.name} {...register("name", { required: true, minLength: 3, maxLength: 100 })} className="form-control" type="text" />
              {errors.name && <div className="text-danger">* Enter valid name</div>}

              <label>Price</label>
              <input defaultValue={info.price} {...register("price", { required: true, min: 1, max: 9999 })} className="form-control" type="" />
              {errors.price && <div className="text-danger">* Enter valid price (1 to 9999)</div>}

              <label>Sale price</label>
              <input defaultValue={info.sale_price} {...register("sale_price", { required: true, min: -1, max: 9999 })} className="form-control" type="" />
              {errors.sale_price && <div className="text-danger">* Enter valid price (1 to 9999)</div>}


              <label>Category_url</label>
              <select defaultValue={info.category_url} {...register("category_url", { required: true, minLength: 3,maxLength:100 })} className="form-select" type="select" >
                {categories.map(item => {
                  return (
                    <option key={item._id} value={item.url_name}>{item.url_name}</option>
                  )
                })}
              </select>
              <label>Image url</label>
              <input defaultValue={info.image} {...register("image", { required: true, minLength: 2,maxLength:2000 })} className="form-control" type="" />
              {errors.image && <div className="text-danger">* Enter valid img_url</div>}
              <div className='mt-3'>
                <button className='btn btn-primary'>Update!</button>
                <button type='button' className='btn btn-dark float-end' onClick={()=>{
                nav(-1)
              }}>Back</button>
              </div>
            </form> 
          </div>
        </div >
      </div>: <h2>Loading...</h2>}
      <ToastContainer />
    </div>


  )
}

export default EditProduct