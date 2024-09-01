import React from 'react';
import './FeedbackComponent.css'; // Import the CSS file

const FeedbackComponent = ({ isHint, isCorrect, feedback, onContinue, onReport }) => {
  const feedbackTextClass = isCorrect ? 'feedback-text correct' : isHint ? 'feedback-text hint' : 'feedback-text';
  const continueButtonClass = isCorrect ? 'feedback-continue-button correct' : isHint ? 'feedback-continue-button hint' : 'feedback-continue-button';

  return (
    <div className="feedback-container">
      <div className="feedback-left-section">
        <div>
          <p className={feedbackTextClass}>Feedback:</p>
          <p>{feedback}</p>
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