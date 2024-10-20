import React from 'react';
import './FeedbackComponent.css'; // Import the CSS file

const FeedbackComponent = ({ isHint, isCorrect, feedback, onContinue}) => {
  const feedbackTextClass = isCorrect ? 'feedback-text correct' : isHint ? 'feedback-text hint' : 'feedback-text';
  const continueButtonClass = isCorrect ? 'feedback-continue-button correct' : isHint ? 'feedback-continue-button hint' : 'feedback-continue-button';
  const getImageSrc = () => {
    if (isHint) {
      return 'https://assets.ccbp.in/frontend/react-js/light-bulb-img.png'; // Light Bulb image
    } else if (isCorrect) {
      return 'https://assets.ccbp.in/frontend/react-js/success-icon-img.png'; // Checkmark image
    } else {
      return 'https://assets.ccbp.in/frontend/react-js/error-icon-img.png'; // X image
    }
  };
  return (
    <div className="feedback-container">
      <div className="feedback-left-section">
      <img src={getImageSrc()} alt="feedback" className="feedback-image" />
        <div>
          <p className={feedbackTextClass}>{isHint ? 'Hint' : isCorrect ? 'Correct' : 'Incorrect'}</p>
          <p className="feedbackText">
            print() is used to display text in Python. The correct answer is display().
        </p>
        </div>
      </div>
      <div className="feedback-right-section">
        <button onClick={onContinue} className={continueButtonClass}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default FeedbackComponent;