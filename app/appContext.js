"use client";
import React, { useEffect, createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebaseconfig";

const AppContext = createContext();
//w
const AppProvider = ({ children }) => {
  const [loggedIn,setLoggedIn]= useState(false);
  const [email,setEmail] = useState('');
  const [lessonOpen,setLessonOpen] = useState(false);
  const [jwt,setJwt]=useState('');
  //https://codebyte-1b9af19e473e.herokuapp.com
  //http://localhost:8080
  const apiRoute ='http://localhost:8080';
  const [currentCourseData,setCurrentCourseData] = useState({});
  const [currentLessonName,setCurrentLessonName] = useState('');
  const [currentCourseName,setCurrentCourseName] = useState('');
  const [currentCourseDesc,setCurrentCourseDesc] = useState('');
  const [lessons,setlessons] = useState([]);
  const [leveling,setleveling] = useState([]);
  const [username,setUsername] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`Logged In with: ${user.email}`);
        user.getIdToken(true).then((jwt) => {
          setJwt(jwt);  
        });
        setEmail(user.email);
        setLoggedIn(true);
      } else {
        console.log("Not logged in.");
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);
  function returnLevelingFromXp(xp){
     
    let initialXPNeeded = 5;
    let growthFactor = 10;
    let curLevel = Math.floor((xp - initialXPNeeded) / growthFactor) + 1;
    let nextLevelXP = initialXPNeeded + (curLevel) * growthFactor;
    setleveling([(xp/nextLevelXP).toFixed(2),curLevel,curLevel+1]);
  }
  function returnCourseByName(desiredCourse, allCourses) {
    for (let course of allCourses) {
      if (course.courseName == desiredCourse) {
        return course;
      }
    }
    return null;
  }

  function IsLessonCompleted(lessonProgress) {
    lessonProgress = lessonProgress.split("/");
    if (lessonProgress[0] == lessonProgress[1]) return true;
    return false;
  }
  function CamelCaseToNormal(camelCaseString) {
    let newString = [];
    for (let i = 0; i < camelCaseString.length; i++) {
      if (
        camelCaseString.charAt(i) == camelCaseString.charAt(i).toUpperCase()
      ) {
        //is capital, insert space.
        newString.push(" ");
      }
      if (i == 0) {
        newString.push(camelCaseString.charAt(i).toUpperCase());
      } else {
        newString.push(camelCaseString.charAt(i));
      }
    }
    return newString.join("");
  }

  function getHint() {
    if (!jwt) return "error";
    return fetch(`${apiRoute}/requestHint`, {
      method: "POST",
      body: JSON.stringify({ jwt: jwt }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((jsonOutput) => {
        //console.log(jsonOutput);
        return jsonOutput;
      });
  }
  function getCertificate() {
    if (!jwt) return "error";
    return fetch(`${apiRoute}/getCertificate`, {
      method: "POST",
      body: JSON.stringify({ jwt: jwt }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' }); // Create a Blob from the ArrayBuffer
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a'); // Create an anchor element
            a.style.display = 'none';
            a.href = url; // Set the href to the Blob URL
            a.download = 'edCode_Certificate.pdf'; // Set the desired file name
            document.body.appendChild(a);
            a.click(); // Programmatically click the anchor to trigger the download
            window.URL.revokeObjectURL(url); // Clean up the URL
            document.body.removeChild(a); 
        
      });
  }
  function getCourseProgressData() {
    if (!jwt) return "error";
    return fetch(`${apiRoute}/get-account-data`, {
      method: "POST",
      body: JSON.stringify({ jwt: jwt }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonOutput) => {
        returnLevelingFromXp(jsonOutput["_doc"].xp);
        setUsername(jsonOutput['_doc'].username);
        return jsonOutput["_doc"];
      });
  }
  function getInitialLessonInformation(signal) {
    if (!jwt) return "error";
    if (!currentCourseName) return "error";
    if (!currentLessonName) return "error";
    return fetch(`${apiRoute}/getLessonInitialInfo`, {
      method: "POST",
      body: JSON.stringify({
        jwt: jwt,
        courseName: currentCourseName,
        lessonName: currentLessonName,
      }),
      signal:signal,
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonOutput) => {
        return jsonOutput;
      });
  }
  function getNextQuestion(answerIndex) {
    return fetch(`${apiRoute}/getNextQuestion`, {
      method: "POST",
      body: JSON.stringify({ jwt: jwt, answerIndex: answerIndex }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonOutput) => {
        //console.log(jsonOutput);
        return jsonOutput;
      });
  }
  function getCoursesInfo() {
    return fetch(`${apiRoute}/getAllCoursesInfo`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonOutput) => {
        //console.log(jsonOutput);
        return jsonOutput;
      });
  }
  function getLeaderboard() {
    return fetch(`${apiRoute}/getLeaderboard`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonOutput) => {
        //console.log(jsonOutput);
        return jsonOutput;
      });
  }
  function getLessonNames(courseName) {
    if (!jwt) return;
    return fetch(`${apiRoute}/getAllLessonNamesForCourse`, {
      method: "POST",
      body: JSON.stringify({ jwt: jwt, courseName: courseName }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonOutput) => {
        console.log(jsonOutput);
        return jsonOutput;
      });
  }

  function purgeProgress() {
    if (!jwt) return "error";
    return fetch(`${apiRoute}/purge-progress`, {
      method: "POST",
      body: JSON.stringify({ jwt: jwt }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((jsonOutput) => {
        //console.log(jsonOutput);
        return jsonOutput;
      });
  }

  function registerAccount(form) {
    if (!form) return "error";
    form.preventDefault();
    const email = form.target.email.value;
    const password = form.target.password.value;
    if (!email || !password) return "error";

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        let tempJWT = await result.user.getIdToken(true);
        if (!jwt) setJwt(tempJWT);
        return fetch(`${apiRoute}/create-account`, {
          method: "POST",
          body: JSON.stringify({ email, jwt: tempJWT }),
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
  function loginAccount(form) {
    if (!form) return "error";
    form.preventDefault();
    const email = form.target.email.value;
    const password = form.target.password.value;
    if (!email || !password) return "error";

    return signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        let tempJWT = await result.user.getIdToken(true);
        if (!jwt) setJwt(tempJWT);
        return fetch(`${apiRoute}/get-account-data`, {
          method: "POST",
          body: JSON.stringify({ jwt: tempJWT }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
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
         getHint,
         setEmail,
         jwt,
         apiRoute,
         currentCourseData,
         getCoursesInfo,
         getLessonNames,
         currentCourseName,setCurrentCourseName,
         lessons,setlessons,
         currentCourseDesc,setCurrentCourseDesc,
         getCourseProgressData,returnCourseByName,
         currentLessonName,setCurrentLessonName,
         getInitialLessonInformation,
         getNextQuestion ,
         purgeProgress ,
         registerAccount,
         loginAccount,
         CamelCaseToNormal,
         lessonOpen,setLessonOpen,
         leveling,
         getCertificate,
         getLeaderboard,username
        }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
