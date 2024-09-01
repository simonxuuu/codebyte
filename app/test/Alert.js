import React, { useEffect, useState } from 'react';
import './Alert.css'; // Import the CSS file
import { ChartBar } from 'lucide-react';

const Alert = ({ changeAlert }) => {
  const [continuing, setContinuing] = useState(false);
  useEffect(() => {
    // Add the show class to the overlay after the component mounts
    const overlay = document.querySelector('.alert-overlay');
    
    overlay.classList.add('show');
  }, []);

  const handleContinue = () => {
    const overlay = document.querySelector('.alert-overlay');
    overlay.classList.remove('show');
    overlay.classList.add('hide');
    setContinuing(true);
    setTimeout(() => {
        changeAlert(false);
      }, 475); 
    };


  const handleLeave = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="alert-overlay">
      <div className="alert">
        <span className="alertWarning">Leaving so soon? Your progress will not be saved.</span>
        <button className="alert-button continue" onClick={handleContinue}>Continue</button>
        <button className="alert-button leave" disabled={continuing}onClick={handleLeave}>Leave</button>
      </div>
    </div>
  );
};

export default Alert;