import React, { useEffect } from 'react'
import TaskService from '../services/TaskService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddTask = () => {

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [status, setStatus] = React.useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const changeTitle = () => {
        if(id) {
            return <h2 className='text-center'>Update Task Record</h2>
        }
        else {
            return <h2 className='text-center'>Add new Task Record</h2>
        }
    }

    useEffect(() => {
        console.log("useEffect fired...")

        if (id) {
            console.log("id received from url " + id)
            TaskService.findById(id).then((response) => {
                console.log("response from findById() api " + JSON.stringify(response))
                setTitle(response.data.title)
                setDescription(response.data.description)
                setDueDate(response.data.dueDate)
                setPriority(response.data.priority)
                setStatus(response.data.status)
            }).catch((error) => {
                console.log("Error from API findById " + error)
            })
        }

    }, [])

    const saveOrUpdateTask = (e) => {
        console.log("saveTask() fired...")
        e.preventDefault();
        const taskObj = { title, description, dueDate, priority, status }

        console.log("taskObj reverived from form "+taskObj)
        // const obj = {'title' : title,'description':description,'dueDate':dueDate,'priority':priority,'status':status}

        if (id) {
            console.log("id received from url " + id)
            TaskService.updateTask(taskObj,id).then(
                (response) => {
                    console.log("response from updateTask() api " + JSON.stringify(response))
                    navigate('/dashboard/display-tasks')
            }).catch((error) => {
                console.log("Error from API findById " + error)
            })
        }

        else {
            console.log("task obj received from the form : " + JSON.stringify(taskObj))
            TaskService.saveTask(taskObj).then(
                (response) => {
                    console.log("Data received form save Task : " + response.data)
                    navigate('/dashboard/display-tasks')
                }
            ).catch((error) => {
                console.log("Error from API from saveTask " + error)
            })
        }
    }

    return (
        <div className="container">

            {/* <div className="card col-md-6 offset-md-3"> */}
               
                <form className="form-group card col-md-7 mb-2 p-4  mx-auto border-primary">
                {changeTitle()}
                    <div className="orm-group mb-2">
                        <label for="inputTitle" className="form-label"> Title </label>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="inputTitle" placeholder='Enter Title for Task' />
                    </div>

                    <div className="form-group mb-2">
                        <label for="inputDescription" className="form-label"> Description </label>
                        <input type="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control" id="inputDescription" placeholder='Enter Description' />
                    </div>

                    <div className="form-group mb-2">
                        <label for="inputDueDate" className="form-label"> DueDate</label>
                        <input type="date" value={dueDate} onChange={(e) => { setDueDate(e.target.value) }}
                            className="form-control" id="inputDueDate" placeholder='Enter Due Date' />
                    </div>

                    <div className="form-group mb-2">
                        <label for="inputState" class="form-label">Priority</label>
                        <select id="inputState" class="form-select" value={priority} onChange={(e) => { setPriority(e.target.value) }} placeholder='Enter Priority'>
                            <option >Priority</option>
                            <option >LOW</option>
                            <option >MEDIUM</option>
                            <option >HIGH</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label for="inputStatus" class="form-label">Status</label>
                        <select id="inputStatus" class="form-select" value={status} onChange={(e) => { setStatus(e.target.value) }} placeholder='Enter Status'>
                            <option  >Status</option>
                            <option >PENDING</option>
                            <option >IN_PROGRESS</option>
                            <option >COMPLETED</option>
                        </select>
                    </div>

                    <div className="form-group mb-2">
                        <button onClick={(e) => saveOrUpdateTask(e)} className="btn btn-primary"> Save </button>
                        &nbsp;&nbsp;&nbsp;<Link to='/dashboard/display-tasks' className='btn btn-danger'>Cancel</Link>
                    </div>

                </form>

            </div>
        // </div>
    )
}