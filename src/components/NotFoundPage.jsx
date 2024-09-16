import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div>
      404 not found
    </div>
  );
};

export default NotFoundPage;
