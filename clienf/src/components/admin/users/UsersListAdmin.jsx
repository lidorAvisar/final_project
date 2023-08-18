import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod, TOKEN_KEY } from '../../../services/apiService'
import AuthAdminComp from '../layout/AuthAdminComp';
import { useNavigate } from 'react-router-dom';
import '../layout/styleHeaderAdmin.css'
import UsersListPhone from './UsersListPhone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons'


const UsersListAdmin = () => {

  const [ar, setAr] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    try {
      const url = API_URL + "/users/usersList";
      const data = await doApiGet(url);
      setAr(data);
    }
    catch (error) {
      alert("")
      console.log(error);
    }
  }

  const deleteItem = async (id) => {
    try {
      if (window.confirm("Delete user?")) {
        const url = API_URL + "/users/" + id;
        const data = await doApiMethod(url, "DELETE", {});
        if (data.deletedCount) {
          doApi();
        }
      }
    }
    catch (error) {
      alert("you can't delete yourself")
      console.log(error);
    }
  }



  return (
    <div className='container'>
      <AuthAdminComp />
      <div className='d-none d-md-flex align-items-center justify-content-between'>
        <h1 className='mt-3'>Users list in the system</h1>
        <span className='fs-5 mt-3 bg-info rounded-2 p-1'>You have {ar.length} Users</span>
      </div>
      <div className='d-md-none'>
        <h3 className='mt-3'>Users list in the system</h3>
        <span className='fs-5 bg-info rounded-2 p-1 d-flex justify-content-center '>You have {ar.length} Users</span>
      </div>
      
      {/* screen dm+ */}
      <div className='d-none d-md-flex'>
        <table className='table table-striped'>
          {localStorage.getItem(TOKEN_KEY) ? <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th>Edit/Del</th>
            </tr>
          </thead> : ""}
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td><div style={{marginLeft:'14px',height:'15px', width:'15px',borderRadius:'50%',backgroundColor:`${item.isOnline?'green':'red'}`}}></div> </td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  {item.role == 'user' &&
                    <td style={{fontSize:'1.3em'}}>
                      <span onClick={() => {
                        nav("/admin/users/edit/" + item._id + "/" + item.role);
                      }}><FontAwesomeIcon icon={faPenToSquare} style={{color: "#467ddd",cursor:'pointer'}} /></span>
                      <span onClick={() => {
                        deleteItem(item._id);
                      }} className='ms-2'><FontAwesomeIcon icon={faTrashCan} style={{color: "#f03333",cursor:'pointer'}} /></span></td>}

                  {item.role == 'admin' && <td style={{fontSize:'1.3em'}}>
                    <span onClick={() => {
                      nav("/admin/users/edit/" + item._id + "/" + item.role);
                    }}><FontAwesomeIcon icon={faPenToSquare} style={{color: "#467ddd",cursor:'pointer'}} /></span>
                  </td>}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <span><UsersListPhone /></span>
    </div>

  )
}

export default UsersListAdmin