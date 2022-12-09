import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const projects = {
  labels: ['Ongoing', 'Completed'],
  datasets: [
    {
      label: '# of Votes',
      data: [44, 3],
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

export const users = {
  labels: ['Inactive', 'Active'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 10],
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

export const tasks = {
  labels: ['Completed', 'Pending'],
  datasets: [
    {
      label: '# of Votes',
      data: [6, 15],
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

const Dashboard = () => {
  return (
    <div className='section'>
     <div className='row'>
      <div className='col-md-4'>
        <h2 className='dashboard-hd'>Projects</h2>
        <Pie data={projects} />
      </div>
      <div className='col-md-4'>
        <h2 className='dashboard-hd'>Users</h2>
        <Pie data={users} />
      </div>
      <div className='col-md-4'>
        <h2 className='dashboard-hd'>Tasks</h2>
        <Pie data={tasks} />
      </div>
     </div>
     
     
    </div>
  )
}

export default Dashboard