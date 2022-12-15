import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from "react-bootstrap";
import loader from '../assets/images/loader.gif';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [active, setActive] = useState(false);
    const [editModelShow, setEditModelShow] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const url = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/users';


    const getUser = async () => {
        await axios.get(`${url}/${id}`)
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
            setFullname(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setWebsite(response.data.website);
            setActive(response.data.active);
        })
    }

    const editUserSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            name: fullname,
            email: email,
            phone: phone,
            website: website,
            active: active
        }
        axios.put(`${url}/${id}`, updatedUser)
            .then(response => {
              console.log("updated res =", response);
              setEditModelShow(false);
              setDisplaySuccess(true);
              setSuccessMsg('User edited successfully !!!');
              setTimeout(() => {
                setDisplaySuccess(false);
                setSuccessMsg('');
                window.location.reload(false);
              }, 3000);
            }
        );
    }

    const setActiveChange = (val) => {
      if(val === "true"){
        setActive(true);
      }else{
        setActive(false);
      }
    }

    useEffect(() => { 
        getUser();
    }, [])

  return (
    <div className='col-md-6'>
      <div className='section-details'>
          {!user && <img src={loader} alt='loader' className='loader' />}
          {displaySuccess && <span id="success">{successMsg}</span>}
          <h1 className='page-detail-hd'>{user.name} details</h1>
          <button className="float-right btn btn-table mr15" onClick={() => setEditModelShow(true)}>Edit details</button>
          <p><span className='label'>Name:</span> <span className='label-val'>{user.name}</span></p>
          <p><span className='label'>Email:</span>  <span className='label-val'>{user.email}</span></p>
          <p><span className='label'>Phone:</span>  <span className='label-val'>{user.phone}</span></p>
          <p><span className='label'>Website:</span>  <span className='label-val'>{user.website}</span></p>
          <p><span className='label'>Status:</span>  <span className='label-val'>{user.active ? "Active" : "Inactive"}</span></p>

          <Modal show={editModelShow} onHide={() => setEditModelShow(false)}>
            <Modal.Header>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
              <>
                  <form id='addUser' onSubmit={editUserSubmit}>
                    <label className='form-label'>Enter the full name</label>
                    <input type='text' className="form-control form-input" placeholder='Full Name' onChange={e => setFullname(e.target.value)} required value={fullname} />
                    <label className='form-label'>Enter the email id</label>
                    <input type='text' className="form-control form-input" placeholder='Email' onChange={e => setEmail(e.target.value)} required value={email} />
                    <label className='form-label'>Enter the phone number</label>
                    <input type='text' className="form-control form-input" placeholder='Phone' onChange={e => setPhone(e.target.value)} required value={phone} />
                    <label className='form-label'>Enter the website</label>
                    <input type='text' className="form-control form-input" placeholder='Website' onChange={e => setWebsite(e.target.value)} required value={website} />
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
      </div>
    </div>
  )
}

export default UserDetails