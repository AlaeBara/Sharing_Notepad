import React, { useState } from 'react';
import Logo from '../assest/Logo.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log('data login', data);
  return (
    <section id='login'>
      <div className='container'>
        <div className='login-box'>
          <div className='logo'>
            <img src={Logo} alt='Login icon' />
          </div>
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <label>Email :</label>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='input'
                />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className='input-group password-group'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='input'
                />
                <div
                  className='password-toggle'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button className='login-button'>Login</button>
          </form>
          <p className='signup-text'>
            Don't have an account?
            <Link to='/sign-up' className='signup-link'>
              {' '}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
