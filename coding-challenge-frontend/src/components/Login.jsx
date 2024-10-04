// src/components/LoginComponent.jsx
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthProvider';
import { useAuth } from './useAuth';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext)
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";

  const userLogin = (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(null); 

    const loginObj = { username, password }; 

    AuthService.loginUser(loginObj, navigate).then((response) => {
      console.log('Logged in successfully:', response); 
      console.log('Logged in successfully:', JSON.stringify(response)); 

      setAuth({
        'username' : response.userDto.username,
        'token' : response.accessToken,
        'role' : response.userDto.role,
      });
      // setAuth({
      //   'username' : response.data.userDto.username,
      //   'token' : response.data.accessToken,
      //   'role' : response.data.userDto.role,
      // });
      
      
      //  console.log("setAuth after update : "+ auth);
      //  console.log("setAuth after update : "+ JSON.stringify(auth.response));

      navigate('/dashboard/display-tasks'); 
    }).catch((error) => {
      console.error('Login failed:', error); 

      if (!error.response) {
        setError('No server response');
      } else if (error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
      }
    }).finally(() => {
      setLoading(false); 
    });
  };

  return (
    <div className="container">
       {/* <div className="card col-md-8 p-3 mt-5 form-control border-primary">
        <h2 className='text-center pt-2 mt-2'>Login</h2> */}
        
        {/* <div className="card col-md-4 mx-auto p-4 mt-5 form-control border-primary"> Adjusted width here */}
        {/* <h2 className='text-center pt-2 mt-2'>Login</h2> */}

        <form className="form-group card col-md-7 mb-2 p-5 m-5 mx-auto border-primary" onSubmit={userLogin}>
        <h2 className='text-center pt-2 mt-2'>Login</h2>

          <div className="form-group mb-2">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="inputUsername"
              placeholder='Enter Username'
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

          <p className="text-center">
            Don't have an account? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>Register here</span>
          </p>

          {error && <p style={{ color: 'red' }}>{error}</p>} 
        </form>
      </div>
    // </div>
  );
};

export default Login;
