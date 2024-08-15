"use client"
import './dashboard.css';
import React from 'react';
import {useState, useEffect} from 'react';
import LessonComponent from './lessonComponent';
import { auth,signOut } from '../firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [uid,setUid] = useState('');
    const [lessons,setLessons] = useState([]);
    const [completeLessons,setCompleteLessons] = useState(0);
    
    function fetchUpdatedLessons(email_=email,uid_=uid){
     
      if(uid_ != ''){
      fetch("https://codebyte-1b9af19e473e.herokuapp.com/login-account", {
        method: "POST",
        body: JSON.stringify({email:email_,uid:uid_ }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {
        if (response.headers.get('Content-Type').includes('text/plain')) {
          // If the content type is plain text, parse as text
          return response.text()}else{
            return response.json();
          }

        }
        
      ).then((lessons) => {
        if (lessons == "Server Error" || lessons == "UID not found"){
          console.log('failed fetch lessons');
        }else{
          //boom we have our lessons

          setLessons(lessons['_doc']['lessonSections'][0]['lessonSectionLessons']);
          let getCompletedLessons = 0;
          for(let i = 0; i < lessons['_doc']['lessonSections'][0]['lessonSectionLessons'].length; i++){
            if(lessons['_doc']['lessonSections'][0]['lessonSectionLessons'][i]['isComplete']==true){
              getCompletedLessons+=1;
            }
          }
          setCompleteLessons(getCompletedLessons);
          //console.log(lessons['_doc']['lessonSections'][0]['lessonSectionLessons']);
          
        }
      } );
    }
    }
    function resetProgress(){
      
      if(uid != ''){
      fetch("https://codebyte-1b9af19e473e.herokuapp.com/purge-progress", {
        method: "POST",
        body: JSON.stringify({email:email,uid:uid }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(result => {return result.text()}).then((textResponse)=>{
        
        router.push(window.location.href);
          router.refresh();
        if(textResponse == 'success'){
          fetchUpdatedLessons();
        }
      })
    }
    }

    useEffect(() => {
    
      onAuthStateChanged(auth, async(user) => {
        if (user) {
         
          //boom we have our lessons
          setUid(user.uid);
          setEmail(user.email);
          
          fetchUpdatedLessons(user.email,user.uid);
           
  
        } else {
          console.log('failed fetch lessons');
        }
      });
  
      // Cleanup subscription on unmount
      
    }, []);

    useEffect(()=>{
      console.log('updated lessons');
    },[lessons]);
    return (
        <main>
        <h1 className='lessonPageTitle'>The Basics</h1>
        <h2 id='percentageComplete'>{completeLessons}/{lessons.length}</h2>
        {lessons.map((lesson) => (
          <LessonComponent
            key={lesson.lessonKey}
            lessonSection={0}
            data={lesson}
            allLessons={lessons}
            updateLessonData={setLessons}
            updateCompleteLessons={setCompleteLessons}
            curEmail={email}
          />
        ))}
       <h2 id='wipText'>We are currently adding more lessons. Please let us know if there is anything you'd like to see.</h2>     
        <button onClick={resetProgress}>Reset Progress (testingonly)</button>
        </main>
    );
    };

export default Dashboard;