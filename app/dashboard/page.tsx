"use client";
import "./dashboard.css";
import { useState, useEffect, useContext } from "react";
import CourseComponent from "./courseComponent";
import { useRouter } from "next/navigation";
import { AppContext } from "../appContext";
import Navbar from "../components/app/dashboard/Navbar";
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
      <Navbar
        dashboardPages={[
          {
            name: "Continue Learning",
            link: "",
          },
          {
            name: "Your Calendar",
            link: "",
          },
        ]}
      />

      <div className="flex sticky top-0">
        <div className="p-8 pr-4 w-[75%]">
          <div className="p-6 py-8 rounded-xl bg-zinc-900 relative overflow-hidden">
            <div className="absolute left-[17%] -top-[30%] blur-3xl bg-green-400/20 w-[150px] h-[225px] rotate-[20deg] rounded-full" />
            <div className="absolute -right-[3%] -bottom-[50%] blur-3xl bg-sage-400/30 w-[175px] h-[250px] rotate-[20deg] rounded-full" />

            <h1 className="text-4xl m-0 p-0 w-fit font-semibold">
              Welcome back!
            </h1>

            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex flex-col text-left space-y-2">
                <p className="text-base m-0 p-0 text-zinc-500">Your points</p>
                <button className="px-1.5 py-1 rounded-lg bg-gradient-to-b from-green-400 to-teal-400 border-t-2 border-t-green-300 text-green-950 font-medium uppercase w-fit">
                  <FontAwesomeIcon icon={faStar} /> 370 pts
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
            Continue Learning
          </h2>
          <div className="flex flex-wrap gap-3">
            {courses &&
              courses.map((course) => (
                <CourseComponent
                  appContext={appContext}
                  key={courses.indexOf(course)}
                  index={courses.indexOf(course)}
                  courseTitle={course[0]}
                  courseDescription={course[1]}
                  isLocked={course[2] != true}
                  onClickGetStarted={() => {
                    if (course[2] == true) {
                      appContext.setCurrentCourseName(course[0]);
                      appContext.setCurrentCourseDesc(course[1]);
                      router.push(`/dashboard/${course[0]}`);
                    }
                  }}
                />
              ))}
          </div>

          <h2 className="my-6 text-2xl font-medium text-zinc-200">
            Your Calendar
          </h2>

          <div className="text-zinc-500 flex flex-col space-y-3 w-[350px] p-2 border border-zinc-800 py-6 rounded-lg">
            <div className="flex">
              {["S", "M", "T", "W", "T", "F", "S"].map(
                (day: any, i: number) => {
                  return (
                    <button
                      key={`foidsajfasdf-${i}`}
                      className={`text-sm flex-1 disabled:opacity-40 text-zinc-500 font-extralight`}
                    >
                      {day}
                    </button>
                  );
                }
              )}
            </div>

            <div className="h-2" />

            {calendar[7].map((week: any, i : number) => {
              return (
                <div className="flex" key={i}>
                  {week.map((day: any) => {
                    const daystr = day.toString();

                    const final = day
                      .toString()
                      .replace("beforeMonth_", "")
                      .replace("afterMonth_", "");

                    const disabled =
                      daystr.includes("beforeMonth_") ||
                      daystr.includes("afterMonth_");

                    return (
                      <button
                        key={i}
                        className={`text-sm flex-1 disabled:opacity-40 text-white`}
                        disabled={disabled}
                      >
                        {final}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-8 pl-4 flex-1">
          <div className="flex items-center space-x-2">
            <div
              className="flex-1 h-[1px] bg-gradient-to-r from-sage-600 to-green-400"
              style={{ boxShadow: "0px 0px 10px rgb(255, 255, 255)" }}
            />
            <FontAwesomeIcon
              icon={faSpaceShuttle}
              className="text-green-400 text-2xl"
            />
          </div>
          <h2 className="my-6 text-2xl font-medium text-zinc-200">
            Side quests
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="bg-gradient-to-b from-amber-950/30 to-amber-950/70 p-3 rounded-xl border border-amber-900">
              <h3 className="text-lg my-0 p-0 leading-none font-medium text-amber-500">
                Daily Question
              </h3>
              <p className="mt-1 m-0 p-0 text-sm font-light opacity-50">
                I am john. john is me. i am confused. you are also confused. who
                is the real mastemrind here? let&apos;s find out.
              </p>
              <button className="mt-2 text-sm px-2 py-1 rounded-lg bg-amber-600 text-white border-t border-t-amber-500 shadow shadow-amber-600/30 w-full">
                Get started
              </button>
            </div>
            <div className="bg-gradient-to-b from-indigo-950/30 to-indigo-950/70 p-3 rounded-xl border border-indigo-900">
              <h3 className="text-lg my-0 p-0 leading-none font-medium text-indigo-500">
                Make a model!
              </h3>
              <p className="mt-1 m-0 p-0 text-sm font-light opacity-50">
                Design a public interview situation using our AI chatbots, and
                get +50 points!
              </p>
              <button className="mt-2 text-sm px-2 py-1 rounded-lg bg-indigo-600 text-white border-t border-t-indigo-500 shadow shadow-indigo-600/30 w-full">
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
