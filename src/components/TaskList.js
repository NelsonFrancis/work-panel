import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import loader from '../assets/images/loader.gif';

const TaskList = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskUser, setTaskUser] = useState("");
  const [userdata, setUserData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [deleteNode, setDeleteNode] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/tasks";
  const completedTasksUrl = "https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/completedTasks";
  const deleteIcon = <FontAwesomeIcon icon={faXmark} />;
  const usericon = <FontAwesomeIcon icon={faUser} />;
  const calendaricon = <FontAwesomeIcon icon={faCalendarAlt} />;
  const trashicon = <FontAwesomeIcon icon={faTrashCan} />;
  const alaramicon = <FontAwesomeIcon icon={faClock} />

  const addTaskSubmit = async (e) => {
    e.preventDefault();
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
      user: taskUser
    }
    axios.post(url, formData)
      .then(response => console.log("response = ", response));
  };

  const getUsers = async () => {
    try{
      const response = await axios.get('https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/users');
      setUserData(response.data);
      console.log("user res", response.data);
    }catch (error){
      console.log("user error", error);
    }
  }  

  const deleteTask = (e, id) => {
    setDeleteNode(e.target);
    setDeleteId(id);
  }

  const confirmDelete = (data) => {
    axios.delete(`https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/tasks/${data}`)
    .then(res => console.log(res));
  }

  const taskCompleted = (data) => {
    const completedData = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      user: data.user
    }
    axios.post(completedTasksUrl, completedData)
      .then(response => console.log("response =# ", response));
    
    axios.delete(`https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/tasks/${data.id}`)
      .then(res => console.log(res));
  }

  const taskNotCompleted = (data) => {
    const notCompletedData = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      user: data.user
    }
    axios.post(url, notCompletedData)
      .then(response => console.log("response ", response));

    axios.delete(`https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/completedTasks/${data.id}`)
      .then(res => console.log(res));
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
    
    getUsers();
  }, []);

  return (
    
    <div className="container">
      <div className="row">
      {loading ? <img src={loader} alt='loader' className='loader' /> : <></>}
     
      <div className="col-md-6">
          <div className="section mb-4">
            <div className="width50">
              <h3 className="page-subhd">Pending Tasks</h3>
            </div>
            <div className="width50">
              <button
                className="btn btn-table mb-4 float-right"
                data-toggle="modal"
                data-target="#addTask"
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
                      <span className="close" data-toggle="modal" data-target="#deleteTask" data-id={data.id} onClick={e => deleteTask(e, data.id)}>{deleteIcon}</span>
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
        

        <div
          className="modal fade"
          id="addTask"
          role="dialog"
          aria-labelledby="addTaskLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addTaskLabel">
                  Add Task
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="addUser" onSubmit={addTaskSubmit}>
                  <input
                    type="text"
                    className="form-control form-input"
                    placeholder="Task Title"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
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
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteTask"
          role="dialog"
          aria-labelledby="deleteTask"
          aria-hidden="true"
          data-deleteid={deleteId}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body bg-red">
                    <p className="text-center">
                      <span className="trashicon">{trashicon}</span>
                      <span className="delete-qt">Are you sure you want to delete this task?</span>
                    </p>
                    <p className="text-center">
                    <button className="yes-btn" onClick={e => confirmDelete(deleteId)}>Yes</button>
                    <button className="yes-btn" data-dismiss="modal">No</button>
                    </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TaskList;
