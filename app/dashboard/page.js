"use client";
import "./dashboard.css";
import { useState, useEffect, useContext } from "react";
import CourseComponent from "./courseComponent";
import { useRouter } from "next/navigation";
import { AppContext } from "../appContext";

const Dashboard = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    appContext.getCoursesInfo().then((result) => {
      setCourses(result);
    });
    //appContext.fetchCourse("Python Basics");
  }, []);

  const dashboardPages = [
    {
      name: "Courses",
    },
  ];

  return (
    <>
      <div className="h-[80px]" />
      <div className="xl:p-12 lg:p-8 md:p-6 p-4 xl:pb-2 lg:pb-2 md:pb-2 pb-2 text-left">
        <h1 className="text-left text-xl font-medium">
          Welcome back, {appContext.email.split("@")[0]}.
        </h1>
      </div>

      <div className="w-full p-1 xl:px-12 lg:px-8 md:px-6 px-4 pb-0 border-b border-b-zinc-800 flex items-center space-x-2 overflow-scroll shadow shadow-zinc-950">
        {dashboardPages.map((x, i) => {
          return (
            <button
              key={i}
              className="group pb-1.5 border-b-2 border-zinc-700 hover:border-green-300 transition"
            >
              <div className="px-1 py-0.5 rounded-lg group-hover:bg-zinc-800 transition font-medium text-zinc-300">
                {x.name}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-8 pt-2">
        <div className="mt-8 courseComponentHolder">
          {courses &&
            courses.map((course) => (
              <CourseComponent
              appContext={appContext}
                key={courses.indexOf(course)}
                index={courses.indexOf(course)}
                courseTitle={course[0]}
                courseDescription={course[1]}
                isLocked={course[2] != true}
                onclick={() => {
                  if (course[2] == true) {
                    appContext.setCurrentCourseName(course[0]);
                    appContext.setCurrentCourseDesc(course[1]);
                    router.push(`/dashboard/${course[0]}`);
                  }
                }}
              />
            ))}
        </div>
        <h2 id="wipText">
          We are currently adding more courses. Please let us know if there is
          anything you'd like to see.
        </h2>
      </div>
    </>
  );
};

export default Dashboard;
