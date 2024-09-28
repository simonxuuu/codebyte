import { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { lightenHex } from "../../utils/lightenHex";
import { darkenHex } from "../../utils/darkenHex";
import Image from "next/image";

const CourseComponent = ({
  appContext,
  courseTitle,
  courseDescription,
  onClickGetStarted,
  isLocked,
  index,
  noGems
}) => {
  const butn = useRef(null);

  const courseHexCode = "#0d9c4d";
  const courseHexCodeLightened = courseHexCode;

  return (
    
      <div
        className="rounded-xl courseComponent"
        style={{
         background:'var(--charcoal)',
         position:'relative'
        }}
      >
        <div className="p-3">
          {(isLocked && !noGems) && (
            <h1
              className="courseComponentTitle"
              style={{
                position: "absolute",
                left: "17%",
                zIndex: "1",
                top: "35%",
              }}
            >
              Coming soon!
            </h1>
          )}
           {(noGems) && (
            <h1
              className="courseComponentTitle"
              style={{
                position: "absolute",
                left: "17%",
                zIndex: "1",
                top: "35%",
              }}
            >
              Out of gems!
            </h1>
          )}
          <span className={`text-left ${isLocked ? "courseLocked" : ""}`}>
            <div className="p-px bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-lg w-fit">
              <div className="p-2 size-10 rounded-md bg-zinc-800">
                <Image
                  src={"/languages/python.png"}
                  width={20}
                  height={20}
                  alt="python"
                />
              </div>
            </div>
            <p style={{fontWeight:'500',letterSpacing: '0.04em',color:'var(--white)'}} className="mt-4 text-xl">
              {appContext.CamelCaseToNormal(courseTitle)}
            </p>
            <p style={{fontWeight:'450',color:'var(--darkGrey)',maxWidth:'90%'}}className="mt-1 text-sm text-zinc-400">
              {courseDescription}
            </p>

            <button
              className="hover:scale-[.97] transition mt-4 px-2 py-1.5 rounded-lg w-full"
              onClick={() => onClickGetStarted()}
              style={{
                backgroundColor: 'var(--darkGreen)'
                ,fontWeight:'500',textShadow:'0px 2px 3px rgba(0,0,0,0.2)'
              }}
            >
              Get started
            </button>
            {courseTitle == "Python Basics" ? (
              <svg
                className="courseComponentBackgroundIcon"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454c.771 0 1.395.624 1.395 1.395s-.624 1.395-1.395 1.395a1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
                  fill="url(#a)"
                />
                <path
                  d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395c0-.77.624-1.394 1.395-1.394s1.395.623 1.395 1.394c0 .772-.624 1.395-1.395 1.395z"
                  fill="url(#b)"
                />
                <defs>
                  <linearGradient
                    id="a"
                    x1="19.075"
                    y1="18.782"
                    x2="34.898"
                    y2="34.658"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--backgroundIconColor)" />
                    <stop offset="1" stopColor="var(--backgroundIconColor)" />
                  </linearGradient>
                  <linearGradient
                    id="b"
                    x1="28.809"
                    y1="28.882"
                    x2="45.803"
                    y2="45.163"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--backgroundIconColor)" />
                    <stop offset="1" stopColor="var(--backgroundIconColor)" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    
  );
};

export default CourseComponent;
