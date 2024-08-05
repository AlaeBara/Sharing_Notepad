import React, { useState } from 'react';
import Logo from '../assest/Logo.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <section className={styles.signUpSection}>
      <div className={styles.container}>
        <div className={styles.signUpBox}>
          <div className={styles.logo}>
            <img src={Logo} alt='Sign Up icon' />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Name:</label>
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  placeholder='Enter name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>
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
                  name='password'
                  value={data.password}
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
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password:</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm password'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className={styles.signUpButton}>Sign Up</button>
          </form>
          <p className={styles.loginText}>
            Already have an account?
            <Link to='/login' className={styles.loginLink}> Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
