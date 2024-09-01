import React, { useState } from "react";
import { X, Heart } from 'lucide-react';
import './QuizComponent.css';

export default function QuizComponent() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [progress, setProgress] = useState(1);
    const [questionSelected, setQuestionSelected] = useState(false);
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

    return (
        
        <div className="quiz-container">
            <div className="quiz-card">
                <div className="quiz-header">
                    <X className="text-gray-500" />
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
                    <button className={`quiz-button skip`}>Hint (3 left)</button>
                    <button className={`quiz-button check ${questionSelected ? '' : 'unavailable'}`} disabled={!selectedAnswer}>Check</button>
                </div>
            </div>
        </div>
        
    );
}