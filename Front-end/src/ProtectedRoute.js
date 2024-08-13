import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; /* Full viewport height */
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/check_authenticateToken', {}, {
          withCredentials: true
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else if (isAuthenticated === true) {
      setShowSpinner(false);
    }
  }, [isAuthenticated, navigate]);

  if (showSpinner) {
    return (
      <SpinnerContainer>
        <RingLoader color="#000000" size={60} />
      </SpinnerContainer>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
