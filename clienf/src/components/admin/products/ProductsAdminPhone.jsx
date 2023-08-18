import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import AuthAdminComp from '../layout/AuthAdminComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const ProductsAdminPhone = () => {

    const [ar, setAr] = useState([])
    const nav = useNavigate();
    const [query] = useSearchParams();
    const Ref = useRef();

    useEffect(() => {
        doApi("_id", "");
    }, [query])

    const doApi = async (sort, reverse) => {
        const page = query.get("page") || 1;
        const url = API_URL + "/products?page=" + page + "&sort=" + sort + "&reverse=" + reverse
        const data = await doApiGet(url);
        console.log(data);
        setAr(data);
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
            <div>
                <input ref={Ref} onChange={() => {
                    doApiSearch(Ref.current.value)
                }} dir='rtl' style={{ height: "42px", borderRadius: '10px 10px 10px 10px', outline: 'none', boxShadow: 'none', border: ' blue ' }} type="search" className=" mt-3 pe-3 w-100  d-md-none text-dark" placeholder="חפש מוצר . . ." />
            </div>
            <div className='text-center p-2 pt-3 d-md-none'>
                <button onClick={() => { doApi("price", "") }} className='btn btn-secondary rounded-end-0' style={{ cursor: 'pointer', fontSize: '20px' }}>  <AiOutlineCaretUp title='מחיר עולה' /></button>
                <button onClick={() => { doApi("_id", "") }} className='btn btn-dark rounded-0 px-5' style={{ cursor: 'pointer', fontSize: '20px' }}>Price</button>
                <button onClick={() => { doApi("price", "yes") }} className='btn btn-secondary rounded-start-0' style={{ cursor: 'pointer', fontSize: '20px' }}><AiOutlineCaretDown title='מחיר יורד' /></button>
            </div>
            <div className='d-flex flex-wrap justify-content-center d-md-none'>
                {ar.map((item, i) => {
                    const page = query.get("page") || 1;
                    return (
                        <div key={item._id} className='card m-3 bg-card-products shadow-lg' style={{ width: '12rem' }}>
                            <div className='card-img'><img className='' style={{ height: '190px', width: '190px' }} src={item.image} alt="user image" /></div>
                            <div className='card-body'>
                                <div className='card-text'>
                                    <h6>Name: {item.name}</h6>
                                    <h6>Price: ₪{item.price}</h6>
                                    <h6>Category_url: {item.category_url}</h6>
                                </div>
                            </div>
                            <div className='d-flex justify-content-around pb-2' style={{ fontSize: '1.5em' }}>
                                <span onClick={() => {
                                    nav("/admin/products/edit/" + item._id);
                                }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#467ddd", cursor: 'pointer' }} /></span>

                                <p className='text-center fw-bold fs-6'>#{((page - 1) * 15) + i + 1}</p>

                                <span onClick={() => {
                                    deleteItem(item._id);
                                }} className='float-end'><FontAwesomeIcon icon={faTrashCan} style={{ color: "#f03333", cursor: 'pointer' }} /></span>
                            </div>

                        </div>
                    )
                })}
            </div >
            <ToastContainer />
        </div >
    )
}

export default ProductsAdminPhone