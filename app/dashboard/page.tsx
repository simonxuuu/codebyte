"use client";
import "./dashboard.css";
import "../../styles/globals.css";
import { useState, useEffect, useContext } from "react";
import CourseComponent from "./courseComponent";
import { useRouter } from "next/navigation";
import { AppContext } from "../appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faFire,
  faSpaceShuttle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import calendar from "../../utils/getCalendar";
import { Gradient } from "whatamesh";
const Dashboard = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [curGems, setCurGems] = useState(0);
  const [lastCourse,setlastCourse] = useState("");
  useEffect(() => {
    appContext.getCoursesInfo().then((result) => {
      if (appContext.jwt) {
        appContext.getCourseProgressData().then((progressData) => {
          setlastCourse(progressData.curCourse);
          setCourses(result);

          setCurGems(parseInt(progressData.gems));
        });
      }
    });
  }, [appContext.jwt]);
  useEffect(()=>{const gradient = new Gradient();gradient.initGradient("#gradient-canvas-dashboard");},[])
  const dashboardPages = [
    {
      name: "Courses",
    },
  ];

  return (
      <div className="flex lg:flex-row flex-col">
        <div className="md:p-8 p-4 ">
          
          <div style={{width:'min(450px,90vw)',height:'100%',alignItems:'start',padding:'20px'}} className="p-6 py-8 rounded-xl bg-zinc-900 relative overflow-hidden">
          <canvas id='gradient-canvas-dashboard'></canvas>
           

            <h1 style={{textShadow:'0px 4px 7px rgba(0,0,0,0.5)'}} className="text-4xl m-0 p-0 w-fit font-semibold">
              Welcome back!
            </h1>

            
            
          </div>
          <h2 style={{maxWidth:'100%'}}className="my-6 text-2xl font-medium ">
            {lastCourse != 'null' ? 'Continue Learning' : 'Recommended Course'}
          </h2>
          <div style={{marginBottom:'200px'}}className="flex flex-wrap gap-3">
            {courses &&
              courses.map((course,index) => { if(course[0] == lastCourse || (course[0] == 'pythonBasics') && lastCourse=='null'){ return (
                <CourseComponent
                  appContext={appContext}
                  key={index}
                  index={index}
                  courseTitle={course[0]}
                  courseDescription={course[1]}
                  noGems={curGems <= 0}
                  isLocked={course[2] != true || curGems <= 0}
                  onClickGetStarted={() => {
                    
                    if (course[2] == true && curGems > 0) {
                      
                      document.body.style.setProperty('--transitionAnim', 'fadeInOut 1.1s ease-in-out');

                      setTimeout(()=>{
                        appContext.setLessonOpen(true);
                       
                        
                        appContext.setCurrentCourseName(course[0]);
                        appContext.setCurrentCourseDesc(course[1]);
                        router.push(`/dashboard/${course[0]}`);
                        
                        
                      },455);
                      setTimeout(()=>{document.body.style.setProperty('--transitionAnim', 'none');},1120)
                    }
                  }}
                />
              )} })}
              
          </div>

          

          

           
        </div>
       
        
      </div> 
  );
};

export default Dashboard;
