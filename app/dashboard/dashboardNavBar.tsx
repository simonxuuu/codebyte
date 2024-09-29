"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../appContext";
import {
  faAngleRight,
  faArrowTrendUp,
  faChalkboard,
  faHome,
  faQuestionCircle,
  faCircle,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pages = [
  {
    icon: faHome,
    name: "Home",
    link: "/dashboard",
  },
  {
    icon: faChalkboard,
    name: "Courses",
    link: "/dashboard/courses",
  },
  {
    icon: faArrowTrendUp,
    name: "Leaderboard",
    link: "/dashboard/leaderboard",
  },
];



export default function Sidebar() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const sidebar = useRef(null);

  
  
  return (
    <>
     <section ref={sidebar}className={`sidebar ${appContext.lessonOpen ? 'hidden' : ''} `}>
      
     <Link href={'/dashboard/profile'}  className="sidebarComponent">
        
        <FontAwesomeIcon icon={faCircle} className="fa-xl"/>
        <h1 className="sidebarText">{appContext.username}</h1>
           
      </Link>
      <div style={{ height: '10px',width:'140%',display:'flex',alignItems:'center',gap:'5px',marginBottom:'30px'}}>
        <h1 className="sidebarText" >Level {appContext.leveling[1]}</h1>
        <div className="xp-progress">
          
          <div className="xp-progress-bar" style={{ width: `${parseFloat(appContext.leveling[0])*100}%` }}></div>
        </div>
        <h1 className="sidebarText" style={{color:'#0ea04b',fontWeight:'700'}}>{appContext.leveling[2]}</h1>
      </div>
      {pages.map((x, i) => {
        return (
          <Link href={x.link} key={i}  className="sidebarComponent">
            
              <FontAwesomeIcon icon={x.icon} className="fa-xl"/>
              <h1 className="sidebarText">{x.name}</h1>
            
          </Link>
        );
      })}


      <Link
      style={{bottom:0,position:'fixed',marginBottom:'60px'}}
        href={'/positions'}
        className="sidebarComponent">
        <FontAwesomeIcon icon={faCode} className="fa-xl"/>
        <h1 className="sidebarText">Positions</h1>
      </Link>
      <Link
      style={{bottom:0,position:'fixed',marginBottom:'25px'}}
        href={'/feedback'}
        className="sidebarComponent">
        
        <FontAwesomeIcon icon={faQuestionCircle} className="fa-xl"/>
        <h1 className="sidebarText">Feedback</h1>
      </Link>
      

      
    
    </section>
    <section className={`${appContext.lessonOpen ? 'hidden' : ''} sidebarTopMobile`}>
      
    <Link href={'/dashboard/profile'}  className="sidebarComponent">
        
        <FontAwesomeIcon icon={faCircle} className="fa-xl"/>
        <h1 className="sidebarText">{appContext.username}</h1>
           
      </Link>
      <div style={{ height: '10px',width:'50%',display:'flex',alignItems:'center',gap:'5px'}}>
        <h1 className="sidebarText" >Level {appContext.leveling[1]}</h1>
        <div className="xp-progress" style={{width:'50%'}}>
          
          <div className="xp-progress-bar" style={{ width: `${parseFloat(appContext.leveling[0])*100}%` }}></div>
        </div>
        <h1 className="sidebarText" style={{color:'#0ea04b',fontWeight:'700'}}>{appContext.leveling[2]}</h1>
      </div>
      <Link
      
        href={'/feedback'}
        className="sidebarComponent">
        
        <FontAwesomeIcon icon={faQuestionCircle} className="fa-xl"/>
        
      </Link>

      

      
    
    </section>
    <section className={`${appContext.lessonOpen ? 'hidden' : ''} sidebarMobile`}>
      
      
        {pages.map((x, i) => {
          return (
            <Link href={x.link} key={i} legacyBehavior>
              <button
                key={i}
                className="sidebarComponent">
    
                <FontAwesomeIcon icon={x.icon} className="fa-2xl"/>

              </button>
            </Link>
          );
        })}

        

        
      
    </section>
    </>
  );
}
