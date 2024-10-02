// src/components/RegisterSimpleUser.jsx

import React, { useState } from 'react';

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
        e.preventDefault(); // Prevent form submission
        setLoading(true); // Show loading spinner
        setError(null); // Clear any previous errors

        console.log("registerUser function called...");

        // Validate that the password and confirm password match
        if (password !== confirmPassword) {
            setLoading(false); // Stop the loading spinner
            setError("Passwords do not match.");
            return;
        }

        // Create the user object from the form fields
        const userObj = { username, password };

        // Call the AuthService for user registration
        AuthService.registerUser(userObj).then(
            (response) => {
                console.log("Response received from register API: " + JSON.stringify(response.data));
                setLoading(false); // Stop the loading spinner
                navigate('/login'); // Redirect to login or dashboard
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

            setLoading(false); // Stop the loading spinner on error
        });
    };

    return (
        <div className="container">
            <div className="card col-md-8 mt-5 p-3 form-control border-primary">
                <h1 className='text-center'>Registration</h1>
                <form className="form-group mb-2">
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

                    {/* Login link */}
                    <p className="text-center">
                        Already have an account? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>Login here</span>
                    </p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Registration;
