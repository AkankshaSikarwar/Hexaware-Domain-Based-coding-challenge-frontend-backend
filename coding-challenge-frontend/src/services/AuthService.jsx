// src/services/AuthService.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const BASE_URL = 'http://localhost:8080/api/authenticate/';

class AuthService {
    // Method to get the token from localStorage
    getToken() {
        return localStorage.getItem('token'); // Change this to your token key
    }

    // Register a user
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


    // Login a user and store JWT token
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
            const token = response.data.accessToken; // Assuming the token comes in accessToken field
            if (token) {
                localStorage.setItem('token', token); // Store token in localStorage

                // Decode token to extract role
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role; // Assuming 'role' field is present in token
                const username = decodedToken.sub; // Assuming 'sub' field is present in token
                localStorage.setItem('username', username);

                // Redirect based on role
                // if (role === 'USER') {
                //     navigate('/user-dashboard');
                // } else if (role === 'OFFICER') {
                //     navigate('/officer-dashboard');
                // } else {
                //     navigate('/login'); // Default or error handling for unrecognized roles
                // }
                navigate('/login')
            }
            return response.data; // Return response to handle in the component
        }).catch(error => {
            throw error.response.data; // Handle error
        });
    }

    // Log out user by removing token from localStorage
    logoutUser() {
        localStorage.removeItem('token'); // Remove JWT token
        localStorage.removeItem('username'); // Remove username
        console.log("Logout: token and username removed from local storage");
    }
}

export default new AuthService();
