import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const dashboard = <FontAwesomeIcon icon={faChartArea} />
  const users = <FontAwesomeIcon icon={faUsers} />
  const projects = <FontAwesomeIcon icon={faFolderOpen} />
  const lists = <FontAwesomeIcon icon={faListCheck} />
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to='/' className="navbar-brand">Work Panel</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item"><NavLink to='/' className='nav-link'>{dashboard} Dashboard</NavLink></li>
          <li className="nav-item"><NavLink to='/userlist' className='nav-link'>{users} User List</NavLink></li>
          <li className="nav-item"><NavLink to='projectlist' className='nav-link'>{projects} Project List</NavLink></li>
          <li className="nav-item"><NavLink to='tasklist' className='nav-link'>{lists} Task List</NavLink></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header