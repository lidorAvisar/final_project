import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService'
import { Link } from 'react-router-dom'
import AuthAdminComp from '../layout/AuthAdminComp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const CategoriesAdmin = () => {


  const [ar, setAr] = useState([])

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    try {
      const url = API_URL + "/categories";
      const data = await doApiGet(url);
      setAr(data);
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


  const deleteItem = async (_idDel) => {
    try {
      if (window.confirm("Delete item?")) {
        const url = API_URL + "/categories/" + _idDel;
        const data = await doApiMethod(url, "DELETE", {});
        if (data.deletedCount) {
          doApi();
        }
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
    <div className='container'>
      <AuthAdminComp />
      <h1>Categories list in the system</h1>
      <div className='d-sm-flex align-items-center justify-content-between mt-4 mb-3'>
        <Link className='btn btn-dark mb-4 mb-sm-0' to="/admin/categories/add">Add new categories</Link><br />
        <span className='fs-5 bg-info rounded-2 p-1'>You have {ar.length} categories</span>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Url name</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody >
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.url_name}</td>
                <td><span onClick={() => {
                  deleteItem(item._id);
                }}><FontAwesomeIcon icon={faTrashCan} style={{color: "#f03333",cursor:'pointer',fontSize:'1.3em'}} /></span></td>
              </tr>
            )
          })}

        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}

export default CategoriesAdmin