import './App.css';
import Header from './components/Header';
import UserList from './components/UserList';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import UserDetails from './components/UserDetails';
import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';

function App() {  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/userlist" element={<UserList />} />
        <Route path="/userlist/:id" element={<UserDetails />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/projectlist" element={<ProjectList />} />
        <Route path="/projectlist/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}

export default App;
