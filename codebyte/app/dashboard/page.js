"use client"
import './dashboard.css';
import {useState, useEffect,useContext} from 'react';
import LessonComponent from './lessonComponent';
import { useRouter } from 'next/navigation';
import { AppContext } from '../AppContext';
const Dashboard = () => {

    const router = useRouter();
    const appContext = useContext(AppContext);
   
  
    function resetProgress(){
      if(appContext.uid == ''){return;}

      fetch(`${appContext.apiRoute}/purge-progress`, {
        method: "POST",
        body: JSON.stringify({email:appContext.email,uid:appContext.uid }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(result => {return result.text()}).then((textResponse)=>{
        
        router.push(window.location.href);
          router.refresh();
        if(textResponse == 'success'){
          appContext.fetchCourse("Python Basics");
        }
      })
    
    }
    
    useEffect(() => {
      appContext.fetchCourse("Python Basics");
    }, [appContext.uid]);

    return (
        <main>
        <h1 className='lessonPageTitle'>{appContext.currentCourseData.courseTitle}</h1>
        
        {appContext.currentCourseData.courseLessons &&
        appContext.currentCourseData.courseLessons.map((lesson) => (
          <LessonComponent
            key={lesson.lessonIndex}
            courseTitle={appContext.currentCourseData.courseTitle}
            data={lesson}
            allLessons={appContext.currentCourseData.courseLessons}
            curEmail={appContext.email}
          />
        ))}
        
       <h2 id='wipText'>We are currently adding more lessons. Please let us know if there is anything you'd like to see.</h2>     
        <button onClick={resetProgress}>Reset Progress (testingonly)</button>
        </main>
    );
    };

export default Dashboard;