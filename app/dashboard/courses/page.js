"use client";
import "../dashboard.css";
import { useState, useEffect, useContext } from "react";
import CourseComponent from "../courseComponent";
import { useRouter } from "next/navigation";
import { AppContext } from "../../appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faFire,
  faSpaceShuttle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";


const Courses = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [curGems, setCurGems] = useState(0);
  useEffect(() => {
    appContext.getCoursesInfo().then((result) => {
      if (appContext.jwt) {
        appContext.getCourseProgressData().then((progressData) => {
          
          setCourses(result);

          setCurGems(parseInt(progressData.gems));
        });
      }
    });
  }, [appContext.jwt]);

  const dashboardPages = [
    {
      name: "Courses",
    },
  ];

  return (
   
      

      <div className="flex lg:flex-row flex-col">
        <div className="md:p-8 p-4 ">
          
          <h2 className="my-6 text-2xl font-medium text-zinc-200">
            Courses
          </h2>
          <div style={{marginBottom:'200px'}}className="flex flex-wrap gap-3">
            {courses &&
              courses.map((course,index) => (
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
              ))}
          </div>

          

          

           
        </div>
       
        
      </div>
    
  );
};

export default Courses;
