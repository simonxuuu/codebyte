"use client"
import './dashboard.css';
import {useState, useEffect,useContext} from 'react';
import CourseComponent from './courseComponent';
import { useRouter } from 'next/navigation';
import { AppContext } from '../appContext';
const Dashboard = () => {

    const router = useRouter();
    const appContext = useContext(AppContext);
    const [courses,setCourses] = useState([]);
   
    
    useEffect(() => {
      
        appContext.getCoursesInfo().then(result => {
            setCourses(result);
        })
      //appContext.fetchCourse("Python Basics");
    }, []);

    return (
        <main>
        <h1 style={{marginBottom:'max(65px,4vw)'}}className='lessonPageTitle'>Welcome back, {appContext.email.split('@')[0]}.</h1>
        <div className="courseComponentHolder">
        {courses &&
        courses.map((course) => (
          <CourseComponent
            key={courses.indexOf(course)}
            courseTitle = {Object.keys(course)[0]}
            courseDescription = {Object.values(course)[0]}
            onclick={()=>{appContext.setCurrentCourseName(Object.keys(course)[0]);appContext.setCurrentCourseDesc(Object.values(course)[0])}}
          />
        ))}
        </div>
       <h2 id='wipText'>Course offerings are limited. </h2>     
      
        </main>
    );
    };

export default Dashboard;