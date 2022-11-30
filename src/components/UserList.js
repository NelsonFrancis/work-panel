import React, {useState, useEffect} from 'react'
import Datatable from 'react-data-table-component'
import axios from 'axios'
import { Link } from 'react-router-dom';
import loader from '../assets/images/loader.gif';
import { Modal } from "react-bootstrap";

const UserList = () => {
  const [userdata, setUserData] = useState([]);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [addModelShow, setAddModelShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const url = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/users';

  const addUserSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const formData = {
      name: fullname,
      email: email,
      phone: phone,
      website: website
    }
    axios.post(`${url}`, formData)
      .then(response => {
        console.log("response = ", response);
        setShowLoader(false);
        setAddModelShow(false);
        setDisplaySuccess(true);
        setSuccessMsg('User added successfully !!!');
        setTimeout(() => {
          setDisplaySuccess(false);
          setSuccessMsg('');
          window.location.reload(false);
        }, 3000);
      }
    )
  }

  const deleteUser = (id) => {
    console.log("deleted = ", id);
    axios.delete(`${url}/${id}`)
      .then(response => console.log("delete response =", response));
  }

  const getUsers = async () => {
    try{
      const response = await axios.get(`${url}`);
      setUserData(response.data);
      console.log(response.data);
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  const columns = [
    {
      name: 'Full Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => <><Link to={'/userlist/'+row.id} rowid={row.id} className='btn btn-table'>Details</Link> <a rowid={row.id} onClick={e => deleteUser(row.id)} className='btn btn-table-delete'>Delete</a></>
    }
  ]
  
  return (
    <div className='section'>
      {showLoader &&  <img src={loader} alt='loader' className='loader' />}
      {displaySuccess && <span id="success">{successMsg}</span>}
      {
        userdata.length == 0 ? 
        <img src={loader} alt='loader' className='loader' /> : 
        <div>
          <button className='btn btn-table mb-4' onClick={() => setAddModelShow(true)}>Add User</button>
          <Datatable data={userdata} columns={columns} pagination dense />
        </div> 
      }

        <Modal show={addModelShow} onHide={() => setAddModelShow(false)}>
          <Modal.Header>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
            <form onSubmit={addUserSubmit}>
                  <input type='text' className="form-control form-input" placeholder='Full Name' onChange={e => setFullname(e.target.value)} required />
                  <input type='text' className="form-control form-input" placeholder='Email' onChange={e => setEmail(e.target.value)} required />
                  <input type='text' className="form-control form-input" placeholder='Phone' onChange={e => setPhone(e.target.value)} required />
                  <input type='text' className="form-control form-input" placeholder='Website' onChange={e => setWebsite(e.target.value)} required />
                  <button type='submit' className='btn btn-table mt-2'>Submit</button>
                </form>
            </>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default UserList