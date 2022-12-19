import React, { useEffect, useState } from 'react';
import Datatable from 'react-data-table-component';
import loader from '../assets/images/loader.gif';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";

const ProjectList = () => {
  const [projectData, setProjectData] = useState([]);
  const [projectName, setProjectName] = useState();
  const [clientName, setClientName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [projectDeadline, setProjectDeadline] = useState();
  const [status, setStatus] = useState();
  const [deleteId, setDeleteId] = useState('');
  const [addModelShow, setAddModelShow] = useState(false);
  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const trashicon = <FontAwesomeIcon icon={faTrashCan} />;
  const [showLoader, setShowLoader] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const url = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/projects';

  const getProjects = async () => {
    try{
      const response = await axios.get(`${url}`);
      setProjectData(response.data);
    }catch (error){
      console.log(error);
    }
  }

  const addProjectSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    const formData = {
      projectName: projectName,
      projectDescription: projectDescription,
      clientName: clientName,
      projectDeadline: projectDeadline,
      status: status
    }
    axios.post(`${url}`, formData)
      .then(response => {
        setShowLoader(false);
        setAddModelShow(false);
        setDisplaySuccess(true);
        setSuccessMsg('Project added successfully !!!');
        setTimeout(() => {
          setDisplaySuccess(false);
          setSuccessMsg('');
          window.location.reload(false);
        }, 3000);
      });
  }

  const deleteProjectSet = (id) => {
    setDeleteId(id);
    setDeleteModelShow(true);
  }

  const deleteProject = (userId) => {
    setShowLoader(true);
    axios.delete(`${url}/${userId}`)
      .then(response => {
        setDeleteModelShow(false);
        setDisplaySuccess(true);
        setSuccessMsg('Project deleted successfully !!!');
        setShowLoader(false);
        setTimeout(() => {
          setDisplaySuccess(false);
          setSuccessMsg('');
          window.location.reload(false);
        }, 3000);
      }  
      );
  }

  useEffect(() => {
    getProjects();
  }, [])

  const columns = [
    {
      name: 'Project name',
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: 'Client name',
      selector: (row) => row.clientName,
      sortable: true,
    },
    {
      name: 'Project Description',
      selector: (row) => row.projectDescription,
      sortable: true,
    },
    {
      name: 'Project Deadline',
      selector: (row) => row.projectDeadline,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => 
      <>
        <Link to={'/projectlist/'+row.id} rowid={row.id} className='btn btn-table'>Details</Link>
        <a onClick={e => deleteProjectSet(row.id)} className='btn btn-table-delete'>Delete Project</a>
      </>
    }
  ]

  return (
    <>
        {showLoader &&  <img src={loader} alt='loader' className='loader' />}
        {displaySuccess && <span id="success">{successMsg}</span>}
        <div className='row'>
          <div className='col-md-6'>
            <h1 className='subpage-hd'>Project List</h1>
            <p className='pageline'>Below are the list of all projects registered in this portal. <br />You can create a new project, assign it to your employees, edit your project details or delete your project.</p>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-table mt45 float-right mr4p' onClick={() => setAddModelShow(true)}>Add Projects</button>
          </div>
        </div>
        <div className='section-list'>
          {
            projectData.length === 0 ? 
            <>
              <p className="error-line">No Projects added</p> 
            </> : 
            <div>
              <Datatable data={projectData} columns={columns} pagination dense />
            </div> 
          }

        <Modal show={addModelShow} onHide={() => setAddModelShow(false)}>
          <Modal.Header>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <form id='addProjectsForm' onSubmit={(e) => addProjectSubmit(e)}>
                <label className='form-label mt-0'>Enter the project name</label>
                <input type='text' className="form-control form-input" placeholder='Project Name' onChange={e => setProjectName(e.target.value)} value={projectName} required />
                <label className='form-label mt-0'>Enter the client name</label>
                <input type='text' className="form-control form-input" placeholder='Client Name' onChange={e => setClientName(e.target.value)} value={clientName} required />
                <label className='form-label mt-0'>Enter the project description</label>
                <input type='text' className="form-control form-input" placeholder='Project Description' onChange={e => setProjectDescription(e.target.value)} value={projectDescription} required />
                <label className='form-label mt-0'>Select the project deadline</label>
                <input type='date' className="form-control form-input" placeholder='Project Deadline' onChange={e => setProjectDeadline(e.target.value)} value={projectDeadline} required />
                <label className='form-label mt-0'>Select the status</label>
                <select className="form-control form-input" onChange={e => setStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <button type='submit' className='btn btn-table mt-2'>Submit</button>
              </form>
            </>
          </Modal.Body>
        </Modal>

        <Modal show={deleteModelShow} onHide={() => setDeleteModelShow(false)} id="deleteProject">
          <Modal.Body className="bg-red">
            <>
              <p className="text-center">
                <span className="trashicon">{trashicon}</span>
                <span className="delete-qt">Are you sure you want to delete this project2?</span>
              </p>
              <p className="text-center">
                <button className="yes-btn" onClick={e => deleteProject(deleteId)}>Yes</button>
                <button className="yes-btn" data-dismiss="modal">No</button>
              </p>
            </>
          </Modal.Body>
        </Modal>

        </div>
    </>
  )
}

export default ProjectList