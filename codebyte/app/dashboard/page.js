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
    const [lessons,setLessons] = useState([]);
    const [completeLessons,setCompleteLessons] = useState(0);
    

    useEffect(() => {
    
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail(user.email);
          fetch("https://codebyte-1b9af19e473e.herokuapp.com/login-account", {
            method: "POST",
            body: JSON.stringify({email:user.email,uid:user.uid }),
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
              console.log(lessons['_doc']['lessonSections'][0]['lessonSectionLessons']);
             
            }
          } );
          
  
        } else {
          console.log('failed fetch lessons');
        }
      });
  
      // Cleanup subscription on unmount
      
    }, []);

    useEffect(()=>{
      console.log(lessons);
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
        </main>
    );
    };

export default Dashboard;