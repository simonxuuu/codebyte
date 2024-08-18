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
            index={courses.indexOf(course)}
            courseTitle = {course[0]}
            courseDescription = {course[1]}
            isLocked={(course[2] != "true")}
            onclick={()=>{
              if(course[2] == "true"){
              appContext.setCurrentCourseName(course[0]);
              appContext.setCurrentCourseDesc(course[1]);
              router.push(`/dashboard/${course[0]}`); }
            }}
          />
        ))}
        </div>
        <h2 id='wipText'>We are currently adding more courses. Please let us know if there is anything you'd like to see.</h2>  
      
        </main>
    );
    };

export default Dashboard;