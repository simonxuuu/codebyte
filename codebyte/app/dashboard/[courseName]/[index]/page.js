"use client"
import { useRouter } from 'next/navigation';
import {useState, useEffect,useContext} from 'react';

import { AppContext } from '../../../AppContext';

export default function Page({ params }) {
  const router = useRouter();
  const appContext = useContext(AppContext);
  useEffect(() => {
    appContext.fetchCourse("Python Basics");
  }, [appContext.uid]);
  useEffect(()=>{
    
    console.log(appContext.currentCourseData)
  },[appContext.currentCourseData])
  return <main style={{color:"white",display:'flex',flexDirection:'column'}}>
    <h2>{appContext.currentCourseData.courseLessons && appContext.currentCourseData.courseLessons[params.index].Name}</h2>
    <h3>{appContext.currentCourseData.courseLessons && appContext.currentCourseData.courseLessons[params.index].LessonTeachings}</h3>
    <h3>{appContext.currentCourseData.courseLessons && appContext.currentCourseData.courseLessons[params.index].Questions.map(question => (
      <div key={question.Index}>
        <h3>{question.Question}</h3>
        <h3>{question.A}</h3>
      </div>
      
    ))}</h3>
    </main>;
}