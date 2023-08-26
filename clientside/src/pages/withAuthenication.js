import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (Component) => {
  return (props) => {
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate('/login');
      }
    }, [token, navigate]);
    
    return <Component {...props} />;
  };
};

export default withAuthentication;
