// src/services/AuthService.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const BASE_URL = 'http://localhost:8080/api/authenticate/';

class AuthService {

    getToken() {
        return localStorage.getItem('token'); 
    }

    registerUser(userObj) {
        return axios({
            method: 'post',
            url: BASE_URL + 'register',
            data: userObj,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            throw error.response.data;
        });
    }

    loginUser(userObj, navigate) {
        return axios({
            method: 'post',
            url: BASE_URL + 'login',
            data: userObj,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            // withCredentials: false
        }).then(response => {
            const token = response.data.accessToken; 
            if (token) {
                localStorage.setItem('token', token); 

               
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role; 

                const username = decodedToken.sub; 
                localStorage.setItem('username', username);

                navigate('/login')
            }
            return response.data; 
        }).catch(error => {
            throw error.response.data; 
        });
    }

    logoutUser() {
        localStorage.removeItem('token'); 
        localStorage.removeItem('username'); 
        console.log("Logout : token and username removed from local storage");
    }
}

export default new AuthService();
