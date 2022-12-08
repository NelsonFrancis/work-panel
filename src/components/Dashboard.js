import React, { useState } from 'react'

const Dashboard = () => {
  const [navActive] = useState(true);
  return (
    <div className='section'>
     <h1 className='page-hd'>Dashboard</h1>
    </div>
  )
}

export default Dashboard