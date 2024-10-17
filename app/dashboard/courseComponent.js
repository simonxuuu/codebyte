import { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { lightenHex } from "../../utils/lightenHex";
import { darkenHex } from "../../utils/darkenHex";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CourseComponent = ({
  appContext,
  courseTitle,
  courseDescription,
  index,language,
  type
}) => {
  
  const router = useRouter();
  const courseImages = {
    "Python" : "/languages/python.png",
    "Javascript" : "/languages/js.png"
  }
  
  const onClickGetStarted= () => {
    if (true && appContext.curGems > 0) {
      document.body.style.setProperty(
        "--transitionAnim",
        "fadeInOut 1.1s ease-in-out"
      );

      setTimeout(() => {
        appContext.setLessonOpen(true);
        
          appContext.setCurrentCourseName(courseTitle);
          appContext.setCurrentCourseDesc(courseDescription);
          router.push(`/dashboard/${courseTitle}`);
        
       
      }, 455);
      setTimeout(() => {
        document.body.style.setProperty(
          "--transitionAnim",
          "none"
        );
      }, 1120);
    }
  }
  return (
    
      <div
        className="rounded-xl courseComponent"
        style={{
         background:'var(--charcoal)',
         position:'relative'
        }}
      >
        
          
          
        <div>
        {type != "custom" ? (<div className="p-px bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-lg w-fit">
            <div className="p-2 size-10 rounded-md bg-zinc-800">
                <Image
                  src={courseImages[language]}
                  width={25}
                  height={25}
                  alt={language}
                />
              </div>
            </div> ) : (null)}

            <p style={{fontWeight:'500',letterSpacing: '0.04em',color:'var(--white)'}} className="mt-4 text-xl">
              {appContext.CamelCaseToNormal(courseTitle)}
            </p>
            <p style={{fontWeight:'450',color:'var(--darkGrey)',maxWidth:'90%'}}className="mt-1 text-sm text-zinc-400">
              {courseDescription}
            </p>
            </div>
            <button
              className="hover:scale-[.97] transition mt-4 px-2 py-1.5 rounded-lg w-full"
              onClick={() => onClickGetStarted()}
              style={{
                backgroundColor: `${type=='custom'||(type == 'unavailable')?'rgb(35,35,35)' : 'var(--darkGreen)'}`
                ,fontWeight:'500',textShadow:'0px 2px 3px rgba(0,0,0,0.2)'
                
              }}
            >
              {!(type == 'unavailable') ? 'Get started' : 'Coming soon'}
            </button>
            
          
        </div>
      
    
  );
};

export default CourseComponent;
