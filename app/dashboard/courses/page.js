"use client";
import "../dashboard.css";
import { useState, useEffect, useContext } from "react";
import CourseComponent from "../courseComponent";
import { useRouter } from "next/navigation";
import { AppContext } from "../../appContext";
import Dropdown from './dropdown'
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
  const [appliedFilters,setAppliedFilters] = useState([]);
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

  const languages = ['Python','Javascript'];
  const experienceLevels = ['Beginner','Intermediate','Advanced'];
  
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="md:p-8 p-4 gap-2">
        <h2 className="my-6 text-2xl font-medium text-zinc-200">Courses</h2>
        <div className="dropdownHolderCourses">
        <Dropdown title="Language" options={languages} setFilters={setAppliedFilters} filters={appliedFilters}/>
        <Dropdown title="Difficulty" options={experienceLevels} setFilters={setAppliedFilters} filters={appliedFilters}/>
        </div>
       
        <div
        className="md:p-8 p-4 "
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1em",
            padding:0,
            marginBottom: "0.8em",
          }}
        >
          <h3
            style={{
              fontSize: "1em",
              margin: 0,
              padding: 0,
              color: "var(--darkGrey)",
              fontWeight: "500",
              flexShrink:0,
              paddingRight:'1em'
            }}
          >
            edCode Courses
          </h3>
          <hr
            style={{
              width: "82%",
              border: "1px solid var(--darkGrey)",
              opacity: "0.3",
            }}
          ></hr>
        </div>
        <div style={{ marginBottom: "50px" }} className="flex flex-wrap gap-3">
          {courses &&
            courses.filter(c => {
              return appliedFilters.length <= 0 ? true : (!appliedFilters.some(value => languages.includes(value)) ? true : appliedFilters.includes(c[3]) ? true : false )&& (!appliedFilters.some(value => experienceLevels.includes(value)) ? true : appliedFilters.includes(c[4]) ? true : false ) ? true : false;
            })
            .map((course, index) => (
              <CourseComponent
                appContext={appContext}
                key={index}
                index={index}
                courseTitle={course[0]}
                courseDescription={course[1]}
                noGems={curGems <= 0}
                type={course[2] != true ? "unavailable" : 'default'}
               
              />
            ))}
        </div>
        <div
        className="md:p-8 p-4 "
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1em",
            padding:0,
            marginBottom: "0.8em",
          }}
        >
          
        </div>
        
      </div>
    </div>
  );
};

export default Courses;
