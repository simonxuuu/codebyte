"use client";
import "./dashboard.css";
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

  const dashboardPages = [
    {
      name: "Courses",
    },
  ];

  return (
      <div className="flex lg:flex-row flex-col">
        <div className="md:p-8 p-4 ">
          <div className="p-6 py-8 rounded-xl bg-zinc-900 relative overflow-hidden">
            <div className="absolute left-[17%] -top-[30%] blur-3xl bg-green-400/20 w-[150px] h-[225px] rotate-[20deg] rounded-full" />
            <div className="absolute -right-[3%] -bottom-[50%] blur-3xl bg-sage-400/30 w-[175px] h-[250px] rotate-[20deg] rounded-full" />

            <h1 className="text-4xl m-0 p-0 w-fit font-semibold">
              Welcome back!
            </h1>

            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex flex-col text-left space-y-2">
                <p className="text-base m-0 p-0 text-zinc-500">Your bytes</p>
                <button className="px-1.5 py-1 rounded-lg bg-gradient-to-b from-green-400 to-teal-400 border-t-2 border-t-green-300 text-green-950 font-medium uppercase w-fit">
                  <FontAwesomeIcon icon={faStar} /> 370 BYTES
                </button>
              </div>

              <div className="flex flex-col text-left space-y-2">
                <p className="text-base m-0 p-0 text-zinc-500">Your streak</p>
                <button className="px-1.5 py-1 rounded-lg bg-gradient-to-b from-orange-400 to-red-400 border-t-2 border-t-orange-300 text-orange-950 font-medium uppercase w-fit">
                  <FontAwesomeIcon icon={faFire} /> 3 days
                </button>
              </div>

              <div className="flex flex-col text-left space-y-2">
                <p className="text-base m-0 p-0 text-zinc-500">
                  Courses completed
                </p>
                <button className="px-1.5 py-1 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 border-t-2 border-t-zinc-600 text-zinc-300 font-medium uppercase w-fit">
                  <FontAwesomeIcon icon={faChalkboard} /> 2 courses
                </button>
              </div>
            </div>
          </div>
          <h2 className="my-6 text-2xl font-medium text-zinc-200">
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
