import axios from "axios";

class TaskService {
    BASE_URL = "http://localhost:8080/api/tasks";

     getToken() {
        return localStorage.getItem('token'); 
    }

    getAllTasks() {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/getall',
            responseType: 'json', 
            headers: { 
                'Access-Control-Allow-Origin': '*' ,
                'Authorization': `Bearer ${this.getToken()}`
            } 
        });
    }

    saveTask(taskObj) {
        return axios({
            method: 'post',
            url: this.BASE_URL + '/add',
            data: taskObj, 
            headers: { 'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' ,
            'Authorization': `Bearer ${this.getToken()}`
        }, 
            responseType: 'json' 
        });
    }

    updateTask(taskObj, id) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/update/' + id,
            data: taskObj, 
            headers: { 'Content-Type': 'application/json', 
                'X-Custom-Header': 'foobar',
                 'Access-Control-Allow-Origin': '*' ,
                'Authorization': `Bearer ${this.getToken()}`
            }, 
            responseType: 'json' 
        });
    }

    findById(id) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/getbyid/' + id,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this.getToken()}`
             } 
        });
    }

    deleteById(id) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + '/deletebyid/' + id,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' ,
                'Authorization': `Bearer ${this.getToken()}`
            } 
        });
    }
}

export default new TaskService();
