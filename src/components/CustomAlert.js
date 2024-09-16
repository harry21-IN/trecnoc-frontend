import React from 'react';
import './css/CustomAlert.css';
import { useNavigate } from 'react-router-dom';

const CustomAlertComponent = ({ isVisible, onClose, message, title }) => {
  const navigate = useNavigate();
  const handleOKClick = () => {
    onClose(); // Close the alert
    navigate(`/landing`, { replace: true }); // Navigate to the other page
  };

  return (
    <div className="center-content">
      {isVisible && (
        <div className="alert-overlay">
          <div className="alert-box">
            {title && <div className="alert-title">{title}</div>}
            <div className="alert-message">{message}</div>
            <button className="alert-button" onClick={handleOKClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomAlertComponent;
