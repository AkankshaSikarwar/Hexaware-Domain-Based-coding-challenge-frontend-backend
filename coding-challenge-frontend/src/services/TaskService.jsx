import axios from "axios";

class TaskService {
    BASE_URL = "http://localhost:8080/api/tasks";

    //  getToken() {
    //     return localStorage.getItem('token'); 
    // }

    getAllTasks(token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/getall',
            responseType: 'json', 
            headers: { 
                'Access-Control-Allow-Origin': '*' ,
                // 'Authorization': `Bearer ${this.getToken()}`
                'Authorization': `Bearer ${token}`
            } 
        });
    }

    saveTask(taskObj,token) {
        return axios({
            method: 'post',
            url: this.BASE_URL + '/add',
            data: taskObj, 
            headers: { 'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' ,
            // 'Authorization': `Bearer ${this.getToken()}`
            'Authorization': `Bearer ${token}`
        }, 
            responseType: 'json' 
        });
    }

    updateTask(taskObj, id,token) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/update/' + id,
            data: taskObj, 
            headers: { 'Content-Type': 'application/json', 
                'X-Custom-Header': 'foobar',
                 'Access-Control-Allow-Origin': '*' ,
                // 'Authorization': `Bearer ${this.getToken()}`
                'Authorization': `Bearer ${token}`
            }, 
            responseType: 'json' 
        });
    }

    findById(id,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/getbyid/' + id,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*',
                // 'Authorization': `Bearer ${this.getToken()}`
                'Authorization': `Bearer ${token}`
             } 
        });
    }

    deleteById(id,token) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + '/deletebyid/' + id,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' ,
                // 'Authorization': `Bearer ${this.getToken()}`
                'Authorization': `Bearer ${token}`
            } 
        });
    }
}

export default new TaskService();
