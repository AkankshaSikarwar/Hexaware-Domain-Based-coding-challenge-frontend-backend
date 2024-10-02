// src/components/LoginComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For handling login errors
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  const userLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading spinner
    setError(null); // Clear any previous errors

    const loginObj = { username, password }; // Create the login object

    AuthService.loginUser(loginObj, navigate).then((response) => {
      console.log('Logged in successfully:', response); // Log the response data
      navigate('/dashboard/display-tasks'); // Redirect to user dashboard
    }).catch((error) => {
      console.error('Login failed:', error); // Log the error

      // Handle different types of errors and set messages accordingly
      if (!error.response) {
        setError('No server response');
      } else if (error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
      }
    }).finally(() => {
      setLoading(false); // Stop the loading spinner
    });
  };

  return (
    <div className="container">
       <div className="card col-md-8 p-3 mt-5 form-control border-primary">
        <h2 className='text-center pt-2 mt-2'>Login</h2>

        <form className="form-group mb-2 p-2 m-5" onSubmit={userLogin}>
          <div className="form-group mb-2">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="inputUsername"
              placeholder='Enter Username or Email'
              required
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="inputPassword"
              placeholder='Enter Password'
              required
            />
          </div>

          <div className="form-group mb-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Registration link */}
          <p className="text-center">
            Don't have an account? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>Register here</span>
          </p>

          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default Login;
