import axios from "axios";

class TaskService {
    BASE_URL = "http://localhost:8080/api/tasks";

     // Method to get the token from localStorage
     getToken() {
        return localStorage.getItem('token'); // Change this to your token key
    }

    getAllTasks() {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/getall',
            responseType: 'json', // Specify the expected response type
            headers: { 
                'Access-Control-Allow-Origin': '*' ,
                'Authorization': `Bearer ${this.getToken()}`
            } // Custom headers if needed
        });
    }

    saveTask(taskObj) {
        return axios({
            method: 'post',
            url: this.BASE_URL + '/add',
            data: taskObj, // Task object as payload
            headers: { 'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' ,
            'Authorization': `Bearer ${this.getToken()}`
        }, // Custom headers
            responseType: 'json' // Response type
        });
    }

    updateTask(taskObj, id) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/update/' + id,
            data: taskObj, // Task object as payload
            headers: { 'Content-Type': 'application/json', 'X-Custom-Header': 'foobar',
                 'Access-Control-Allow-Origin': '*' ,
                'Authorization': `Bearer ${this.getToken()}`
            }, 
                 // Custom headers
            responseType: 'json' // Response type
        });
    }

    findById(id) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/getbyid/' + id,
            responseType: 'json', // Specify the expected response type
            headers: { 'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this.getToken()}`
             } // Custom headers if needed
        });
    }

    deleteById(id) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + '/deletebyid/' + id,
            responseType: 'json', // Specify the expected response type
            headers: { 'Access-Control-Allow-Origin': '*' ,
                'Authorization': `Bearer ${this.getToken()}`
            } // Custom headers if needed
        });
    }
}

export default new TaskService();
