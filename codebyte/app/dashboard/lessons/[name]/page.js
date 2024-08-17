"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../../AppContext';

export default function Page({ params }) {
  const router = useRouter();
  const appContext = useContext(AppContext);

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
  });

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    appContext.fetchCourse("Python Basics");
  }, [appContext.uid]);

  useEffect(() => {
    console.log("Current Course Data:", appContext.currentCourseData);
    if (appContext.currentCourseData.courseLessons && params.index < appContext.currentCourseData.courseLessons.length) {
      const lesson = appContext.currentCourseData.courseLessons[params.index];
      setQuestion({
        prompt: lesson.Questions[0].Question,
        details: lesson.LessonTeachings,
        type: "multiple-choice",
        options: lesson.Questions[0].Options,
        topic: lesson.Name
      });
    } else {
      console.log("Invalid index or no course lessons available");
    }
  }, [appContext.currentCourseData, params.index]);

  return (
    <main style={{ color: "white", display: 'flex', flexDirection: 'column' }}>
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