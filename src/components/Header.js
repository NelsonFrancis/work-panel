import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">Work Panel</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link to='/' className="nav-link">Dashboard</Link></li>
                <li className="nav-item"><Link to='userlist' className="nav-link">User List</Link></li>
                <li className="nav-item"><Link to='projectlist' className="nav-link">Project List</Link></li>
                <li className="nav-item"><Link to='tasklist' className="nav-link">Task List</Link></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Header