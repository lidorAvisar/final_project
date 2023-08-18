import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import PagesComp from '../../pages/PagesComp';
import AuthAdminComp from '../layout/AuthAdminComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import ProductsAdminPhone from './ProductsAdminPhone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const ProductsAdmin = () => {

  const [ar, setAr] = useState([])
  const [arLength, setArLength] = useState([])
  const nav = useNavigate();
  const [query] = useSearchParams();
  const Ref = useRef();

  useEffect(() => {
    doApi("_id", "");
    doApiLength();
  }, [query])


  const doApi = async (sort, reverse) => {
    const page = query.get("page") || 1;
    const url = API_URL + "/products?page=" + page + "&sort=" + sort + "&reverse=" + reverse
    const data = await doApiGet(url);
    console.log(data);
    setAr(data);
  }

  const doApiLength = async () => {
    const url = API_URL + "/products/count"
    const data = await doApiGet(url);
    console.log(data);
    setArLength(data);
  }

  const doApiSearch = async () => {
    const s = Ref.current.value;
    const url = API_URL + "/products?s=" + s
    const data = await doApiGet(url);
    console.log(data);
    setAr(data);
  }

  const deleteItem = async (_idDel) => {
    try {
      if (window.confirm("Delete item?")) {
        const url = API_URL + "/products/" + _idDel;
        const data = await doApiMethod(url, "DELETE", {});
        if (data.deletedCount) {
          doApi();
          toast.success('Product deleted', {
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
    } catch (error) {
      toast.error('token has expired or there is an error', {
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
    <div className='container'>
      <AuthAdminComp />
      <div className='d-flex'>
        <h1 className='mt-1 me-5'>Products list in the system </h1>
        <input ref={Ref} onChange={() => {
          doApiSearch(Ref.current.value)
        }} dir='rtl' style={{ height: "42px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', border: 'blue' }} type="search" className=" mt-3 pe-3 w-50 d-none d-md-flex text-dark" placeholder="חפש מוצר . . ." />
      </div>
      <div className='d-sm-flex align-items-center justify-content-between'>
        <Link className='btn btn-dark mb-3 mt-3' to="/admin/products/add">Add new products</Link><br />
        <span className='fs-5 bg-info rounded-2 p-1'>You have {arLength.count} products</span>
      </div>
      <div className='d-none d-md-flex'>
        {ar.length > 0 ? <table className='table table-striped  mt-3'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>
                <span onClick={() => { doApi("price", "") }} style={{ cursor: 'pointer', fontSize: '20px' }}>  <AiOutlineCaretUp title='מחיר עולה' /></span>
                <span onClick={() => { doApi("_id", "") }} style={{ cursor: 'pointer' }}>Price</span>
                <span onClick={() => { doApi("price", "yes") }} style={{ cursor: 'pointer', fontSize: '20px' }}><AiOutlineCaretDown title='מחיר יורד' /></span>
              </th>
              <th>Url category</th>
              <th>Img url</th>
              <th>Edit/Del</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              const page = query.get("page") || 1;
              return (
                <tr key={item._id}>
                  <td>{((page - 1) * 15) + i + 1}</td>
                  <td>{item.name}</td>
                  <td>₪{item.price}</td>
                  <td>{item.category_url}</td>
                  <td><img src={item.image} alt="" height="100px" width="100px" /></td>
                  <td style={{ fontSize: '1.3em' }}>
                    <span onClick={() => {
                      nav("/admin/products/edit/" + item._id)
                    }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#467ddd", cursor: 'pointer' }} /></span>

                    <span onClick={() => {
                      deleteItem(item._id);
                    }} className='ms-2'><FontAwesomeIcon icon={faTrashCan} style={{ color: "#f03333", cursor: 'pointer' }} /></span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> : <h2 className='text-center mt-4'>No results . . .</h2>}
      </div>
      <ProductsAdminPhone />
      <span onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} className='display-6 text-center'><PagesComp apiPages={API_URL + "/products/count"} linkTo="/admin/products?page=" linkCss="btn btn-primary fw-bold ms-3 mt-4 mb-4" /></span>
      <ToastContainer />
    </div>
  )
}

export default ProductsAdmin