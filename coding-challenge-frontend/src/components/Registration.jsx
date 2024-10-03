// src/components/RegisterSimpleUser.jsx

import React, { useState } from 'react';

import './background.css'

import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(null); 

        console.log("registerUser function called...");

        if (password !== confirmPassword) {
            setLoading(false); 
            setError("Passwords do not match.");
            return;
        }

        const userObj = { username, password };

        AuthService.registerUser(userObj).then(
            (response) => {
                console.log("Response received from register API: " + JSON.stringify(response.data));
                setLoading(false); 
                navigate('/login'); 
            }
        ).catch((error) => {
            console.log("Error from register API: " + error);

            if (!error?.response) {
                setError("No server response");
            } else if (error.response?.status === 409) {
                setError("Username already taken");
            } else {
                setError("Registration failed. Please check your inputs.");
            }
            setLoading(false); 
        });
    };

    return (
        // <div id='bg'>
        <div className="container">
            {/* <div className="card col-md-8 mt-5 p-3 form-control border-primary">
                <h1 className='text-center'>Registration</h1> */}
                {/* <form className="form-group mb-2"> */}
                <form className="form-group card col-md-7 mb-2 p-5 m-5 mx-auto border-primary">
                <h1 className='text-center'>Registration</h1>
                    <div className="form-group mb-2">
                        <label htmlFor="inputUsername" className="form-label">Username</label><br />
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="inputUsername" placeholder='Enter Username' required />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="inputPassword" className="form-label">Password</label><br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword" placeholder='Enter Password' required />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label><br />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="inputConfirmPassword" placeholder='Confirm Password' required />
                    </div>

                    <div className="form-group mb-2">
                        <button onClick={registerUser} className="btn btn-primary" disabled={loading}>
                            {loading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>

                    <p className="text-center">
                        Already have an account? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>Login here</span>
                    </p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        // </div>
      
    );
};

export default Registration;
