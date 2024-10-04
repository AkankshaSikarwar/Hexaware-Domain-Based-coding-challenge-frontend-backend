import React, { useEffect, useState } from 'react'
import TaskService from '../services/TaskService'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export const DisplayTasks = () => {

    const [tasks,setTasks] = useState([])
  
    const navigate = useNavigate()
    const [deleteStatus,setDeleteStatus] = useState([false])


    const {auth}=useAuth();
    const token=auth.token;
    console.log("token from useAuth : "+token)

    const deleteTask = (id) => {
        console.log("Task id received in event handler "+id)

        const confirmDelete = window.confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {
        TaskService.deleteById(id,token).then(
            (response) => {
                console.log("data received from deleteById() "+JSON.stringify(response))
                setDeleteStatus(!deleteStatus)
                navigate('/dashboard/display-tasks');
            }
        )}else {
            console.log("Deletion cancelled");
        }
    }

    useEffect(
        () => {
            console.log("useEffect fired...")
            TaskService.getAllTasks(token).then(
                (response) => {
                    console.log("data received from getAllTasks()"+JSON.stringify(response.data))
                    console.log("type of data received from getAllTasks()"+typeof response.data)
                    setTasks(response.data)
                }
            )
        },[deleteStatus]
    )
  return (
    <div className='container'>
        {console.log("Application rendered...")}
        <h2 className='text-center'>Task Data</h2>
   
        <table className='table table-bordered table-striped'>
            <thead>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>

            </thead>
            <tbody>
                {tasks.map((task,key) => 
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>
                            <Link className='btn btn-info' to={`/dashboard/update-task/`+task.id}>Update</Link>
                           
                            &nbsp;
                            &nbsp;
                            <button onClick={()=>{deleteTask(task.id)}} className='btn btn-danger' >Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}