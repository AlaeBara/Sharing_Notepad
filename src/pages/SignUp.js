import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assest/Logo.svg';
import './SignUp.css';

const SignUp = () => {
  const [showPassword, setShowPasword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    profilePic: '',
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

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    console.log('file', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log('data login', data);
  return (
    <section id='signup'>
      <div className='container'>
        <div className='signup-box'>
          <div className='logo'>
            <img src={Logo} alt='Login icons' />
          </div>
          <form>
            <label>
              <input type='file' className='hidden' onChange={handleUploadPic} />
            </label>
          </form>

          <form className='form' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name :</label>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  className='input'
                />
              </div>
            </div>
            <div className='grid'>
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
                  onClick={() => setShowPasword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label> Confirm Password :</label>
              <div className='input-group password-group'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='confirm your password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  className='input'
                />
                <div
                  className='password-toggle'
                  onClick={() => setConfirmPassword((prev) => !prev)}
                >
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button className='signup-button'>SignUp</button>
          </form>
          <p className='login-text'>
            Already have account?
            <Link to='/login' className='login-link'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
