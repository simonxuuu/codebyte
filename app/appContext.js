"use client"
import React,  {useEffect, createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedIn,setLoggedIn]= useState(false);
  const [email,setEmail] = useState('');
  const [jwt,setJwt]=useState('');
 //https://codebyte-1b9af19e473e.herokuapp.com
  //http://localhost:8080
  const apiRoute ='http://localhost:8080';
  const [currentCourseData,setCurrentCourseData] = useState({});
  const [currentLessonName,setCurrentLessonName] = useState('');
  const [currentCourseName,setCurrentCourseName] = useState('');
  const [currentCourseDesc,setCurrentCourseDesc] = useState('');

  useEffect(() => {
    
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`Logged In with: ${user.email}`);
        user.getIdToken(true).then(jwt => {
          setJwt(jwt);
        });
        setEmail(user.email);
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
  function getCourseProgressData(){
    if(!jwt) return 'error';
    return fetch(`${apiRoute}/login-account`, {method: "POST",
      body: JSON.stringify({jwt:jwt}),
       headers: {"Content-type": "application/json"}} )
    .then(response => {return response.json();}).then((jsonOutput)=>{//console.log(jsonOutput);
         return jsonOutput['_doc'];});
    }
    function getLessonTeachings(){
      if(!jwt) return 'error';
      if(!currentCourseName) return 'error';
      if(!currentLessonName) return 'error';
      return fetch(`${apiRoute}/getLessonTeachings`, {method: "POST",
        body: JSON.stringify({jwt:jwt,courseTitle:currentCourseName,lessonName:currentLessonName}),
         headers: {"Content-type": "application/json"}} )
      .then(response => {return response.text();}).then((jsonOutput)=>{//console.log(jsonOutput);
           return jsonOutput;});
      }
    function getNextQuestion(answerIndex){
      return fetch(`${apiRoute}/getNextQuestion`, {method: "POST",
        body: JSON.stringify({jwt:jwt,answerIndex:answerIndex}),
         headers: {"Content-type": "application/json"}} )
      .then(response => {return response.json();}).then((jsonOutput)=>{//console.log(jsonOutput);
           return jsonOutput;});
      
    }   
   function getCoursesInfo(){
    return fetch(`${apiRoute}/getAllCoursesInfo`, {method: "GET", headers: {"Content-type": "application/json"}} )
    .then(response => {return response.json();}).then((jsonOutput)=>{//console.log(jsonOutput);
         return jsonOutput;});
    }
  function getLessonNames(courseName){
    if(!jwt) return;
    return fetch(`${apiRoute}/getLessonNames`, {method: "POST",
        body: JSON.stringify({jwt:jwt,courseTitle:courseName}),
        headers: {"Content-type": "application/json"}} )
    .then(response => {return response.json();}).then((jsonOutput)=>{return jsonOutput;});
  }


  

  return (
    <AppContext.Provider value={
        { loggedIn,
         setLoggedIn,
         email,
         setEmail,
         jwt,
         apiRoute,
         currentCourseData,
         getCoursesInfo,
         getLessonNames,
         currentCourseName,setCurrentCourseName,
         currentCourseDesc,setCurrentCourseDesc,
         getCourseProgressData,returnCourseByName,
         currentLessonName,setCurrentLessonName,
         getLessonTeachings,
         getNextQuestion }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };