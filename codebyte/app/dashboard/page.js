"use client"
import './dashboard.css';
import React from 'react';
import {useState, useEffect} from 'react';
import LessonComponent from './lessonComponent';
const Dashboard = () => {
    const [userName, setUserName] = useState('');
    
    const lessons = [
        {'key':0,'name':'hello lil bro','unlocked':true},
        {'key':1,'name':'hello lil bro'},
        {'key':2,'name':'get ready'},
        {'key':3,'name':'get ready'},
        {'key':4,'name':'get ready'},
        {'key':5,'name':'get ready'},
        {'key':6,'name':'get ready'},
        {'key':7,'name':'get ready'}

    ]
    const [completeLessons,setCompleteLessons] = useState(0);
    useEffect(() => {
        setUserName('John Doe');
    }, []);
    
    return (
        <main>
        <h1 className='lessonPageTitle'>A beginners journey</h1>
        <h2 id='percentageComplete'>{completeLessons}/{lessons.length}</h2>
        {lessons.map((lesson) => (
          <LessonComponent
          key={lesson.key}
            id={lesson.key}
            name={lesson.name}
            isUnlockSet={lesson.unlocked}
          />
        ))}
            
        </main>
    );
    };

export default Dashboard;