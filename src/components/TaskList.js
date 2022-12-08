import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import loader from '../assets/images/loader.gif';
import { Modal } from "react-bootstrap";

const TaskList = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskUser, setTaskUser] = useState("");
  const [projectName, setProjectName] = useState("");
  const [userdata, setUserData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [actProj, setActProj] = useState([]);
  const url = "https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/tasks";
  const completedTasksUrl = "https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/completedTasks";
  const userUrl = "https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/users";
  const projectUrl = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/projects';
  const deleteIcon = <FontAwesomeIcon icon={faXmark} />;
  const usericon = <FontAwesomeIcon icon={faUser} />;
  const calendaricon = <FontAwesomeIcon icon={faCalendarAlt} />;
  const trashicon = <FontAwesomeIcon icon={faTrashCan} />;
  const alaramicon = <FontAwesomeIcon icon={faClock} />

  const addTaskSubmit = async (e) => {
    e.preventDefault();
    setShowAddModal(false);
    setLoading(true);
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes(); 
    let currentDate = date + "/" + month + "/" + year;
    let currentTime = hours + ":" + minutes;
    
    const formData = {
      title: taskTitle,
      description: taskDescription,
      date: currentDate,
      time: currentTime,
      user: taskUser,
      projectName: projectName
    }
    axios.post(url, formData)
      .then(response => {
        console.log("response = ", response);
        setLoading(false);
        setDisplaySuccess(true);
        setSuccessMsg('Task added successfully !!!');
        setTimeout(() => {
          setDisplaySuccess(false);
          setSuccessMsg('');
          window.location.reload(false);
        }, 2000);
      });
  };

  const getUsers = async () => {
    try{
      const response = await axios.get(`${userUrl}`);
      setUserData(response.data);
      console.log("user res", response.data);
    }catch (error){
      console.log("user error", error);
    }
  }  

  const deleteTask = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  const confirmDelete = (data) => {
    setShowDeleteModal(false);
    setLoading(true);
    axios.delete(`${url}/${data}`)
    .then(res => {
      console.log(res);
      setLoading(false);
      setDisplaySuccess(true);
      setSuccessMsg('Task deleted successfully !!!');
      setTimeout(() => {
        setDisplaySuccess(false);
        setSuccessMsg('');
        window.location.reload(false);
      }, 2000);
    });
  }

  const taskCompleted = (data) => {
    const completedData = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      user: data.user,
      projectName: data.projectName
    }
    axios.post(completedTasksUrl, completedData)
      .then(response => console.log("response =# ", response));
    
    axios.delete(`${url}/${data.id}`)
      .then(res => {
        console.log(res)
        window.location.reload(false);
      });
  }

  const taskNotCompleted = (data) => {
    const notCompletedData = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      user: data.user,
      projectName: data.projectName
    }
    axios.post(url, notCompletedData)
      .then(response => console.log("response ", response));

    axios.delete(`${completedTasksUrl}/${data.id}`)
      .then(res => {
        console.log(res)
        window.location.reload(false);
      });
  }

  useEffect(() => {
    setLoading(true)
    axios.get(url).then((response) => {
      setTaskData(response.data);
      setTaskTitle(response.data.title);
      setTaskDescription(response.data.description);
      console.log("task data response = ", response.data);
      setLoading(false);
    });

    axios.get(completedTasksUrl).then(response => {
      console.log("Completed task data response = ", response.data);
      setCompletedTask(response.data);
    });

    axios.get(projectUrl).then(response => {
      console.log("project data response = ", response.data);
      let projectResponse = response.data;
      let activeProjects = projectResponse.filter(aProject => {return aProject.status === "Ongoing"});
      setActProj(activeProjects);
      console.log("active projects = ",activeProjects);
    });
    
    getUsers();
  }, []);

  return (
    
    <div className="container">
      <div className="row">
      {loading && <img src={loader} alt='loader' className='loader' />}
      {displaySuccess && <span id="success">{successMsg}</span>}
      <div className="col-md-6">
          <div className="section mb-4">
            <div className="width50">
              <h3 className="page-subhd">Pending Tasks</h3>
            </div>
            <div className="width50">
              <button
                className="btn btn-table mb-4 float-right"
                onClick={e => setShowAddModal(true)}
              >
                Add Task
              </button>
            </div>
            <div className="clear-both"></div>
            {taskData.length == 0 ? <p className="error-line">No pending tasks.</p> : <></>}
            <ul>
              {taskData.map((data) => {
                return (
                  <li key={data.id} className="task-item">
                    <span className="width90">
                      <span className="task-title">{data.title}</span>
                    </span>
                    <span className="width10">
                      <span className="close" onClick={e => deleteTask(data.id)}>{deleteIcon}</span>
                    </span>
                    <span className="width100">
                        <span className="project-title">{data.projectName}</span>
                      </span>
                    <span className="width100">
                      <span className="username">
                        {usericon} {data.user}
                      </span>
                      <span className="datetime">
                        {calendaricon} {data.date}
                      </span>
                      <span className="datetime">
                        {alaramicon} {data.time}
                      </span>
                    </span>
                    <div className="clear-both"></div>
                    <span className="width100">
                      <span className="task-description">
                        {data.description}
                      </span>
                    </span>
                    <div className="clear-both"></div>
                    <span className="width100">
                      <button className="btn btn-table mt-2 mb-2" onClick={e => taskCompleted(data)}>
                        Mark as Complete
                      </button>
                    </span>
                    <div className="clear-both"></div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
          <div className="col-md-6">
            <div className="section mb-4">
              <div className="width50">
                <h3 className="page-subhd">Completed Tasks</h3>
              </div>
              <div className="clear-both"></div>
              {completedTask.length == 0 ? <p className="error-line">No completed tasks.</p> : <></>}
              <ul>
                {completedTask.map((data) => {
                  return (
                    <li key={data.id} className="task-item">
                      <span className="width100">
                        <span className="task-title">{data.title}</span>
                      </span>
                      <span className="width100">
                        <span className="project-title">{data.projectName}</span>
                      </span>
                      <span className="width100">
                        <span className="username">
                          {usericon} {data.user}
                        </span>
                        <span className="datetime">
                          {calendaricon} {data.date}
                        </span>
                        <span className="datetime">
                          {alaramicon} {data.time}
                        </span>
                      </span>
                      <div className="clear-both"></div>
                      <span className="width100">
                        <span className="task-description">
                          {data.description}
                        </span>
                      </span>
                      <div className="clear-both"></div>
                      <span className="width100">
                        <button className="btn btn-table-delete mt-2 mb-2" onClick={e => taskNotCompleted(data)}>
                          Mark as Not Complete
                        </button>
                      </span>
                      <div className="clear-both"></div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} id="addTask">
          <Modal.Header>
            <Modal.Title>Add Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
            <form id="addUser" onSubmit={addTaskSubmit}>
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="Task Title"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                  <select 
                    className="form-control form-input"
                    onChange={(e) => setProjectName(e.target.value)}
                  >
                    <option value="">- select -</option>
                    {
                      actProj.map(aProj => {
                       return <option key={aProj.id} value={aProj.projectName}>{aProj.projectName}</option>
                      })
                    }
                  </select>
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="Task Description"
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                  />
                  <select 
                    className="form-control form-input"
                    onChange={(e) => setTaskUser(e.target.value)}
                  >
                    <option value="">- select -</option>
                    {
                      userdata.map(user => {
                       return <option key={user.id} value={user.name}>{user.name}</option>
                      })
                    }
                  </select>
                  <button type="submit" className="btn btn-table mt-2">
                    Submit
                  </button>
                </form>
            </>
          </Modal.Body>
        </Modal>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} id="deleteTask">
          <Modal.Body className="bg-red">
            <>
              <p className="text-center">
                <span className="trashicon">{trashicon}</span>
                <span className="delete-qt">Are you sure you want to delete this task?</span>
              </p>
              <p className="text-center">
              <button className="yes-btn" onClick={e => confirmDelete(deleteId)}>Yes</button>
              <button className="yes-btn" data-dismiss="modal">No</button>
              </p>
            </>
          </Modal.Body>
        </Modal>
        
      </div>
    </div>
  );
};

export default TaskList;
