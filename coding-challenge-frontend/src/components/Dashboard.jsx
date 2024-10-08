import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { DisplayTasks } from './DisplayTasks';
import { AddTask } from './AddTask';


const Dashboard = () => {
    return (
        <div>
            <div className="container-fluid">
                <h2>Dashboard</h2>
                <div className="row">

                    <div className="col-2">
                        <nav className="bg-light p-3 rounded">  
                        {/* <nav className="bg-dark text-white p-3"> */}
                            <ul className="list-unstyled"> 
                                <li className="mb-2"> 
                                    <Link className="btn btn-outline-primary w-100" to="display-tasks"> 
                                        Display Tasks
                                    </Link>
                                </li>
                                <li>
                                    <Link className="btn btn-outline-primary w-100" to="add-task">
                                        Add Task
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-10 p-0 m-0">
                        <Routes>
                            <Route path="/" element={<DisplayTasks />} /> 
                            <Route path="display-tasks" element={<DisplayTasks />} />
                            <Route path="add-task" element={<AddTask />} />
                            <Route path="update-task/:id" element={<AddTask />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
