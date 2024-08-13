import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../assest/Logo.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signIn', {
        email: data.email,
        password: data.password,
      }, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again later...");
      }
    }
  };

  return (
    <section className={styles.loginSection}>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.logo}>
            <img src={Logo} alt='Login icon' />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email:</label>
              <div className={styles.inputWrapper}>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Password:</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className={styles.loginButton}>Login</button>
          </form>
          <p className={styles.signupText}>
            Don't have an account?
            <Link to='/sign-up' className={styles.signupLink}> Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
