import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chartImg from '../assets/images/chart.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {  
  const userIcon = <FontAwesomeIcon icon={faUsers} />
  const projectIcon = <FontAwesomeIcon icon={faFolderOpen} />
  const listIcon = <FontAwesomeIcon icon={faListCheck} />

  const projectsUrl = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/projects';
  const usersUrl = 'https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/users';
  const pendingTasksUrl = "https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/tasks";
  const completedTasksUrl = "https://637e5495cfdbfd9a63aea916.mockapi.io/workpanel/api/completedTasks";

  const [ongoingProjects, setOngoingProjects] = useState("0");
  const [completedProjects, setCompletedProjects] = useState("0");
  const [activeUsers, setActiveUsers] = useState("0");
  const [inactiveUsers, setInactiveUsers] = useState("0");
  const [completedTasks, setCompletedTasks] = useState("0");
  const [pendingTasks, setPendingTasks] = useState("0");

  const users = {
    labels: ['Inactive', 'Active'],
    datasets: [
      {
        label: '# of users',
        data: [inactiveUsers, activeUsers],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const projects = {
    labels: ['Ongoing', 'Completed'],
    datasets: [
      {
        label: '# of projects',
        data: [ongoingProjects, completedProjects],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tasks = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: '# of tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const getUsers = async () => {
    try{
      const response = await axios.get(`${usersUrl}`);
      console.log("res", response);
      setActiveUsers(response.data.filter(user => (user.active === true)).length);
      setInactiveUsers(response.data.filter(user => (user.active === false)).length);
      console.log("active users", activeUsers);
      console.log("in active users", inactiveUsers);
    }catch (error){
      console.log(error)
    }
  } 

  const getProjects = async () => {
    try{
      const response = await axios.get(`${projectsUrl}`);
      setOngoingProjects(response.data.filter(proj => (proj.status === "Ongoing")).length);
      setCompletedProjects(response.data.filter(proj => (proj.status === "Completed")).length);
      console.log("completedProjects", completedProjects);
      console.log("ongoingProjects", ongoingProjects);
    }catch (error){
      console.log(error);
    }
  }

  const getCompletedTasks = async () => {
    try{
      const response = await axios.get(`${completedTasksUrl}`);
      setCompletedTasks(response.data.length);
      console.log("getCompletedTasks", response.data);
    }catch (error){
      console.log(error);
    }
  }

  const getPendingTasks = async () => {
    try{
      const response = await axios.get(`${pendingTasksUrl}`);
      setPendingTasks(response.data.length);
      console.log("getPendingTasks", response.data);
    }catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
    getProjects();
    getCompletedTasks();
    getPendingTasks();
  }, [])

  return (
     <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='section-dashboard'>
          <div className='row'>
            <div className='col-md-4'>
                <h2 className='dashboard-stat-label'>Total Users</h2>
                <p className='dashboard-stat'>{activeUsers + inactiveUsers}</p>
                <img src={chartImg} className="chartimg" />
            </div>
            <div className='col-md-4'>
                <h2 className='dashboard-stat-label'>Total Projects</h2>
                <p className='dashboard-stat'>{ongoingProjects + completedProjects}</p>
                <img src={chartImg} className="chartimg" />
            </div>
            <div className='col-md-4'>
                <h2 className='dashboard-stat-label'>Total Tasks</h2>
                <p className='dashboard-stat'>{pendingTasks + completedTasks}</p>
                <img src={chartImg} className="chartimg" />
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <div className='section-dashboard'>
            <h2 className='dashboard-hd'>{userIcon} Users</h2>
            <div className='width80'>
              <Pie data={users} />
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='section-dashboard'>
            <h2 className='dashboard-hd'>{projectIcon} Projects</h2>
            <div className='width80'>
              <Pie data={projects} />
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='section-dashboard'>
            <h2 className='dashboard-hd'>{listIcon} Tasks</h2>
            <div className='width80'>
              <Pie data={tasks} />
            </div>
          </div>
        </div>
      </div>
     </div>
  )
}

export default Dashboard