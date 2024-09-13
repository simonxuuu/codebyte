import React, { useContext, useEffect, useState } from 'react';
import './Alert.css'; // Import the CSS file
import { ChartBar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../../appContext';
const Alert = ({ changeAlert }) => {
  const [continuing, setContinuing] = useState(false);const router = useRouter();
  const appContext = useContext(AppContext);
  useEffect(() => {
    // Add the show class to the overlay after the component mounts
    const overlay = document.querySelector('.alert-overlay');
    
    overlay.classList.add('show');
    console.log("Showing Alert...")
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
    document.body.style.setProperty('--transitionAnim', 'fadeInOut 1.4s ease-in-out');

          setTimeout(()=>{
            
           
            router.push(`/dashboard/${appContext.currentCourseName}`);
          },570);
          setTimeout(()=>{document.body.style.setProperty('--transitionAnim', 'none');},1420)
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