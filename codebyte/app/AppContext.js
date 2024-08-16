"use client"
import React,  {useEffect, createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedIn,setLoggedIn]= useState(false);
  const [email,setEmail] = useState('');
  const [uid,setUid]=useState('');
  const [apiRoute,setApiRoute]=useState('https://codebyte-1b9af19e473e.herokuapp.com');
  const [currentCourseData,setCurrentCourseData] = useState({});

  useEffect(() => {
    console.log(window.location.hostname)
    if ( ["localhost", "127.0.0.1", ""].includes(window.location.hostname) ) {
        setApiRoute("http://localhost:8080");
      }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`Logged In: ${user.email}`);
        setEmail(user.email);
        setUid(user.uid);
        setLoggedIn(true);
      } else {
        console.log("Not logged in.")
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  function returnCourseByName(desiredCourse,allCourses){
    for (let course of allCourses){
      if(course.courseTitle == desiredCourse){
        return course;
      }
    }
    return null;
  }
 
  function fetchCourse(courseName){
    if (uid == '') {return;}
    //first, login into account to get progress data
    fetch(`${apiRoute}/login-account`, {method: "POST", body: JSON.stringify({email:email,uid:uid}),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => {
      if (response.headers.get('Content-Type').includes('text/plain')) { return response.text()}else{return response.json();}}
    ).then((accountInfo) => {
      if (accountInfo == "Server Error" || accountInfo == "UID not found"){
        console.log('failed fetch info');
      }
      else{
        //load course info 
        fetch(`${apiRoute}/get-course-data`, {method: "POST",body: JSON.stringify({email:email,courseTitle:courseName}),
          headers: {
            "Content-type": "application/json"
          }
        }).then(response => {return response.json()}).then(courseDataInfo => { 
          //sorts the lessons by index so they match with the mongodb lesson indeces
          courseDataInfo = courseDataInfo.sort((a, b) => a.lessonIndex - b.lessonIndex);
          //gets the users course progress
          let courseProgress = returnCourseByName(courseName,accountInfo['_doc']['courses']);
          
          for(let i = 0; i < courseProgress.courseLessons.length; i++){
           //combines course questions and course progress data for easy access
           courseProgress.courseLessons[i] = Object.assign({},courseDataInfo[i] ,courseProgress.courseLessons[i]);
          }
          
          //console.log(courseProgress);
          setCurrentCourseData(courseProgress);
        }); 
      }
    } );
  }

  return (
    <AppContext.Provider value={
        { loggedIn,
         setLoggedIn,
         email,
         setEmail,
         uid,
         setUid,
         apiRoute,
         currentCourseData,
         fetchCourse }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };