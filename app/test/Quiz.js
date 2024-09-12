import React, { useState } from "react";
import { X, Heart } from 'lucide-react';
import Alert from './Alert';
import './QuizComponent.css';
import Response from './Response';

export default function QuizComponent() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [progress, setProgress] = useState(5);
    const [questionSelected, setQuestionSelected] = useState(false);
    const [questionAnswered, setQuestionAnswered] = useState(true);
    const [hintUsed, setHintUsed] = useState(false);
    const [progressWarning, setProgressWarning] = useState(true);
    const [hintCount, setHintCount] = useState(3);
    const [correct, setCorrect] = useState(true);
    const [canContinue, setCanContinue] = useState(false);
    const [correctAnswerID, setCorrectAnswerID] = useState(3);
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('Correct!');

    const getNextQuestions = () => {
    }


    const checkSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            if (selectedAnswer === correctAnswerID) {
                setCorrect(true);
                setFeedbackMessage('Correct!');
            } else {
                setCorrect(false);
                setFeedbackMessage('Incorrect!');
            }
            setQuestionAnswered(true);
            setLoading(false);
        }, 1500);
    }
    const options = [
        { id: 1, label: 'print()'},
        { id: 2, label: 'show()'},
        { id: 3, label: 'display()'},
    ];

    const handleOptionClick = (id) => {
        setSelectedAnswer((prevSelected) => (prevSelected === id ? null : id));
        if (selectedAnswer !== id) {
            setQuestionSelected(true);
        }
        else {
            setQuestionSelected(false);
        }
    };

    const onContinue = () => {
        setQuestionAnswered(false);
        setHintUsed(false);
    }

    return (
        
        <div className="quiz-container">
            {progressWarning ? <Alert changeAlert={setProgressWarning}/> : null}
            <div className="quiz-card">
                <div className="quiz-header">
                    <button onClick={() => setProgressWarning(true)}>
                    <X className="text-gray-500" />
                    </button>
                    <div className="quiz-progress">
                        <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <Heart className="text-red-500" />
                    <span className="text-gray-500 ml-1">3</span>
                </div>

                <div className="quiz-body">
                    <div className="mb-6">
                    
                        <h2 className="quiz-title">What is used to display text?</h2>
                    </div>

                    <div className="quiz-options">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                className={`quiz-option ${selectedAnswer === option.id ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option.id)}
                            >
                                <span className="quiz-option-image">{option.image}</span>
                                <span className="quiz-option-label">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="quiz-footer">
                    {hintUsed || questionAnswered ? (
                        <Response isHint={hintUsed} isCorrect={correct} feedback={feedbackMessage} onContinue={onContinue}/>
                    ) : (
                        <>
                            
                        </>
                    )}
                    <button className="quiz-button skip">Hint (3 left)</button>
                    <button className={`quiz-button check ${questionSelected ? '' : 'unavailable'}`} disabled={!selectedAnswer} onClick={checkSubmit}> 
                        {loading ? '...' : 'Check'}
                    </button>
                </div>
            </div>
        </div>
        
    );
}