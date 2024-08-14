"use client"
import './dashboard.css';
import React from 'react';
import {useState, useEffect} from 'react';
import LessonComponent from './lessonComponent';
const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [lessons,setLessons] = useState([
        {'key':0,'name':'Hello World','isCompleted':false},
        {'key':1,'name':'1+1','isCompleted':false},
        {'key':2,'name':'Nice','isCompleted':false}
    ]);
    const [completeLessons,setCompleteLessons] = useState(0);
    useEffect(() => {
        setUserName('John Doe');
        
    }, []);
    useEffect(()=>{
      console.log(lessons);
    },[lessons]);
    return (
        <main>
        <h1 className='lessonPageTitle'>The Basics</h1>
        <h2 id='percentageComplete'>{completeLessons}/{lessons.length}</h2>
        {lessons.map((lesson) => (
          <LessonComponent
            key={lesson.key}
            data={lesson}
            allLessons={lessons}
            updateLessonData={setLessons}
            updateCompleteLessons={setCompleteLessons}
          />
        ))}
       <h2 id='wipText'>We are currently adding more lessons. Please let us know if there is anything you'd like to see.</h2>     
        </main>
    );
    };

export default Dashboard;