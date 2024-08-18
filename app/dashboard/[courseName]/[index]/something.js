"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// This is for a lesson. Not a course.
export default function Page({ params }) {
  // Expected initial response from server:
  /*
  { // Abstract schema
    "name": string
    "type": str,
    "length": int
    "id": int
  }
  */
  const [response, setResponse] = useState({
    name: "",
    type: "",
    length: 0

  });

  const [question, setQuestion] = useState({
    prompt: "",
    details: "",
    type: "",
    options: [],
    topic: "",
  })

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    setQuestion({
      prompt: "What is the output of the following code?",
      details: "This is a simple question to test your understanding of the code.",
      type: "multiple-choice",
      options: ["One option", "Second option", "The answer", "Not an answer"],
      topic: "Adding Numbers"
    });
  }, []);

  return (
    <main>
      <h1>Lesson Details</h1>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="lesson-details">
        <div className="prompt-container">
          <h2 className="prompt-topic">{question.topic}</h2>
          <p className="question-details">{question.details}</p>
        </div>
        <div className="prompt-container">
          <h2 className="prompt-topic">{question.prompt}</h2>
          {question.options.map((option, index) => (
          <div className="option" key={index}>
            <input type="button" name="option" value={option} />
            <label>{option}</label>
          </div>
        ))}
          
        </div>
        
      </div>
    </main>
  );
}