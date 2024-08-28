"use client"
import React,  {useEffect, createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseconfig';

const AppContext = createContext();
//w
const AppProvider = ({ children }) => {
  const [loggedIn,setLoggedIn]= useState(false);
  const [email,setEmail] = useState('');
  const [jwt,setJwt]=useState('');
 //https://codebyte-1b9af19e473e.herokuapp.com
  //http://localhost:8080
  const apiRoute ='https://codebyte-1b9af19e473e.herokuapp.com';
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
      .then(response => {return response.text();}).then((jsonOutput)=>{console.log(jsonOutput);
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

  function purgeProgress(){
    if(!jwt) return 'error';
    return fetch(`${apiRoute}/purge-progress`, {method: "POST",
      body: JSON.stringify({jwt:jwt}),
       headers: {"Content-type": "application/json"}} )
    .then(response => {return response.text();}).then((jsonOutput)=>{//console.log(jsonOutput);
         return jsonOutput;});
    }
  
  function registerAccount(form){
    if(!form) return 'error';
      form.preventDefault();
      const email = form.target.email.value;
      const password = form.target.password.value;
      if(!email || !password) return 'error';
      
      return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if(!jwt) setJwt(result.user.getIdToken(true));
       return fetch(`${apiRoute}/create-account`, {
          method: "POST",
          body: JSON.stringify({ email, jwt: jwt }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            if (text == "Success") {
              return "Success!";
            } else if (text == "Server Error" || text == "UID not found") {
              return "Whoops! There has been an error.";
            }
            return "Success!";
          });
      })
      .catch((error) => {
        
        if (
          error.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          return "Weak password! Make your password longer than 6 characters.";
        } else if (
          error.message == "Firebase: Error (auth/email-already-in-use)."
        ) {
          return "Error! Account already exists!";
        }
        return "Whoops! There has been an error.";
      });
  }
   function loginAccount(form){
  
      if(!form) return 'error';
      form.preventDefault();
      const email = form.target.email.value;
      const password = form.target.password.value;
      if(!email || !password) return 'error';
      
      return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if(!jwt) setJwt(result.user.getIdToken(true));
        return fetch(`${apiRoute}/login-account`, { 
        method: "POST",
        body: JSON.stringify({ jwt: jwt}),
        headers: {
            "Content-type": "application/json",
        },
        }).then((response) => {
            if (response.headers.get("Content-Type").includes("text/plain")) {
              return response.text();
            } else {
              return response.json();
            }
          })
          .then((text) => {
            
            if (text == "Server Error" || text == "UID not found") {
              return "Whoops! There has been an error.";
            } else {
              
              return "Success!";
            }
          });
      })
      .catch((error) => {
        return "Whoops! There has been an error.";
      });
      
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
         getNextQuestion ,
         purgeProgress ,
         registerAccount,
         loginAccount}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };