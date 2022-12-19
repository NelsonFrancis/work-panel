import React, {useState, useEffect} from 'react'
import Datatable from 'react-data-table-component'
import axios from 'axios'
import { Link } from 'react-router-dom';
import loader from '../assets/images/loader.gif';
import { Modal } from "react-bootstrap";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserList = () => {
  const [userdata, setUserData] = useState([]);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [active, setActive] = useState();
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [addModelShow, setAddModelShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const trashicon = <FontAwesomeIcon icon={faTrashCan} />;
  const url = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/users';

  const addUserSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const formData = {
      name: fullname,
      email: email,
      phone: phone,
      website: website,
      active: active
    }
    axios.post(`${url}`, formData)
      .then(response => {
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
    setDeleteId(id);
    setShowDeleteModal(true);
    
  }

  const confirmDeleteUser = (id) => {
    setShowDeleteModal(false);
    setShowLoader(true);
    axios.delete(`${url}/${id}`)
      .then(response => {
        setShowLoader(false);
        setDisplaySuccess(true);
        setSuccessMsg('User deleted successfully !!!');
        setTimeout(() => {
          setDisplaySuccess(false);
          setSuccessMsg('');
          window.location.reload(false);
        }, 3000);
      });
  }

  const getUsers = async () => {
    try{
      const response = await axios.get(`${url}`);
      setUserData(response.data);
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
      name: 'Status',
      selector: (row) => {
       if(row.active === true){
        return "Active"
       }else if(row.active === false){
        return "Inactive"
       }
        
      },
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => <><Link to={'/userlist/'+row.id} rowid={row.id} className='btn btn-table'>Details</Link> <a rowid={row.id} onClick={e => deleteUser(row.id)} className='btn btn-table-delete'>Delete</a></>
    }
  ]

  const setActiveChange = (val) => {
    if(val === "true"){
      setActive(true);
    }else{
      setActive(false);
    }
  }
  
  return (
    <>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='subpage-hd'>User List</h1>
          <p className='pageline'>Below are the list of all users registered in this portal.</p>
        </div>
        <div className='col-md-6'>
          <button className='btn btn-table mt45 float-right mr4p' onClick={() => setAddModelShow(true)}>Add User</button>
        </div>
      </div>
      
      <div className='section-list'>
        {showLoader &&  <img src={loader} alt='loader' className='loader' />}
        {displaySuccess && <span id="success">{successMsg}</span>}
        
        {
          userdata.length === 0 ? 
          <img src={loader} alt='loader' className='loader' /> : 
          <div>
            <Datatable data={userdata} columns={columns} pagination dense />
          </div> 
        }

          <Modal show={addModelShow} onHide={() => setAddModelShow(false)}>
            <Modal.Header>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
              <>
              <form onSubmit={addUserSubmit}>
                <label className='form-label'>Enter the full name</label>
                <input type='text' className="form-control form-input" placeholder='Full Name' onChange={e => setFullname(e.target.value)} required />
                <label className='form-label'>Enter the email id</label>
                <input type='text' className="form-control form-input" placeholder='Email' onChange={e => setEmail(e.target.value)} required />
                <label className='form-label'>Enter the phone number</label>
                <input type='text' className="form-control form-input" placeholder='Phone' onChange={e => setPhone(e.target.value)} required />
                <label className='form-label'>Enter the website</label>
                <input type='text' className="form-control form-input" placeholder='Website' onChange={e => setWebsite(e.target.value)} required />
                <label className='form-label'>Select the status</label>
                <select type='text' className="form-control form-input" onChange={e => setActiveChange(e.target.value)} required value={active}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <button type='submit' className='btn btn-table mt-2'>Submit</button>
              </form>
              </>
            </Modal.Body>
          </Modal>

          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} id="deleteUser">
            <Modal.Body className="bg-red">
              <>
                <p className="text-center">
                  <span className="trashicon">{trashicon}</span>
                  <span className="delete-qt">Are you sure you want to delete this user?</span>
                </p>
                <p className="text-center">
                <button className="yes-btn" onClick={e => confirmDeleteUser(deleteId)}>Yes</button>
                <button className="yes-btn" data-dismiss="modal">No</button>
                </p>
              </>
            </Modal.Body>
          </Modal>
      </div>
    </>
  )
}

export default UserList