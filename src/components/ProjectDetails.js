import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import loader from '../assets/images/loader.gif';
import { Modal } from "react-bootstrap";

const ProjectDetails = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [projectName, setProjectName] = useState();
    const [clientName, setClientName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [projectDeadline, setProjectDeadline] = useState();
    const [status, setStatus] = useState();
    const [editModelShow, setEditModelShow] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const url = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/projects';

    const getProjectDetails = async () => {
        await axios.get(`${url}/${id}`)
        .then((response) => {
            console.log(response.data);
            setProjectData(response.data);
            setProjectName(response.data.projectName);
            setClientName(response.data.clientName);
            setProjectDescription(response.data.projectDescription);
            setProjectDeadline(response.data.projectDeadline);
            setStatus(response.data.status);
        })
    }

    const editProjectSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const updatedProject = {
            clientName: clientName,
            projectDeadline: projectDeadline,
            projectDescription: projectDescription,
            projectName: projectName,
            status: status
        }
        axios.put(`${url}/${id}`, updatedProject)
            .then(response => {
              console.log("updated res =", response);
              setShowLoader(false);
              setEditModelShow(false);
              setDisplaySuccess(true);
              setSuccessMsg('Project edited successfully !!!');
              setTimeout(() => {
                setDisplaySuccess(false);
                setSuccessMsg('');
                window.location.reload(false);
              }, 3000);
            }
        );
    }

    useEffect(() => {
        getProjectDetails();
    }, [])

  return (
    
    <div className='section'>
        {
          !projectData ? 
          <img src={loader} alt='loader' className='loader' /> : 
          <>
            {showLoader &&  <img src={loader} alt='loader' className='loader' />}
            {displaySuccess && <span id="success">{successMsg}</span>}
            <h1 className='page-detail-hd'>{projectData.projectName} details</h1>
            <button className="float-right btn btn-table" onClick={() => setEditModelShow(true)}>Edit Project</button>
            <p><span className='label'>Project Name:</span> {projectData.projectName}</p>
            <p><span className='label'>Client Name:</span> {projectData.clientName}</p>
            <p><span className='label'>Project Description:</span> {projectData.projectDescription}</p>
            <p><span className='label'>Project Deadline:</span> {projectData.projectDeadline}</p>
            <p><span className='label'>Project Status:</span> {projectData.status}</p>
          </>
        }
        <Modal show={editModelShow} onHide={() => setEditModelShow(false)}>
          <Modal.Header>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
                <form id='editProject' onSubmit={editProjectSubmit}>
                  <input type='text' className="form-control form-input" placeholder='Project Name' onChange={e => setProjectName(e.target.value)} required value={projectName} />
                  <input type='text' className="form-control form-input" placeholder='Client Name' onChange={e => setClientName(e.target.value)} required value={clientName} />
                  <input type='text' className="form-control form-input" placeholder='Project Description' onChange={e => setProjectDescription(e.target.value)} required value={projectDescription} />
                  <input type='date' className="form-control form-input" placeholder='Project Deadline' onChange={e => setProjectDeadline(e.target.value)} required value={projectDeadline} />
                  <select className="form-control form-input" onChange={e => setStatus(e.target.value)} required value={status}>
                      <option value="">Select Status</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select> 
                  <button type='submit' className='btn btn-table mt-2'>Submit</button>
                </form>
            </>
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default ProjectDetails