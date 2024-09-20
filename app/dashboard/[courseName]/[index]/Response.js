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
  const correctFeedback = [
    "Good job!",
    "Awesome work.",
    "Nice work.",
    "That's right!",
    "That's the right answer!",
    "Good work!",
    "Awesome!",
    "",
    "",
    "Great job!"
  ]
  const wrongFeedback = [
    "Nice try!",
    "Good try!",
    "",
    "",
    "The correct answer is: ",
    "",
    "Keep at it!"
  ]
  const GetRandomIntegerInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  //<img src={getImageSrc()} alt="feedback" className="feedback-image" />
  return (
    <div className="feedback-container">
      <div className="feedback-left-section">
      
        <div>
          <p className={feedbackTextClass}>{isHint ? 'Hint' : isCorrect ? 'Correct' : 'Incorrect'}</p>
          <p className="feedbackText">
            {isCorrect ? correctFeedback[GetRandomIntegerInclusive(0,correctFeedback.length-1)] : wrongFeedback[GetRandomIntegerInclusive(0,wrongFeedback.length-1)]} {feedback}
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