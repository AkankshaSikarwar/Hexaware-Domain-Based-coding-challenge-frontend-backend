import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import { Link, Route, Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import { DisplayTasks } from './components/DisplayTasks';
import { AddTask } from './components/AddTask';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">

      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />

        </Route>

        {/* Default Route */}
        <Route path="/" element={<Login />} /> {/* Redirect to login or home */}
      </Routes>

      <Link className="btn btn-danger" to="/logout">Logout</Link>


    </div>
  );
}

export default App;
