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
    const [currentSection,setCurrentSection] = useState('');
   
    
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
        
      ).then((lessonInfo) => {
        if (lessonInfo == "Server Error" || lessonInfo == "UID not found"){
          console.log('failed fetch lessons');
        }else{
          setCurrentSection(lessonInfo['_doc']['lessonSections'][0]['lessonSectionTitle']);
          //boom we have our lessons
          fetch("https://codebyte-1b9af19e473e.herokuapp.com/get-section-info", {
            method: "POST",
            body: JSON.stringify({email:email_,sectionTitle:lessonInfo['_doc']['lessonSections'][0]['lessonSectionTitle']}),
            headers: {
              "Content-type": "application/json"
            }
          }).then(response => {return response.json()}).then(res => { 
            res = res.sort((a, b) => a.LessonKey - b.LessonKey);
           
         
          for(let i = 0; i < lessonInfo['_doc']['lessonSections'][0]['lessonSectionLessons'].length; i++){

            //set name,lesson content, etc.
            if(lessonInfo['_doc']['lessonSections'][0]['lessonSectionLessons'][i]){
            if(i < res.length){lessonInfo['_doc']['lessonSections'][0]['lessonSectionLessons'][i].Name = res[i].Name;}
            
           
          }
          }

          setLessons(lessonInfo['_doc']['lessonSections'][0]['lessonSectionLessons']);
          
          
          

          });


          
         
          
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
        <h1 className='lessonPageTitle'>{currentSection}</h1>
        
        {lessons.map((lesson) => (
          <LessonComponent
            key={lesson.lessonKey}
            lessonSection={0}
            data={lesson}
            allLessons={lessons}
            updateLessonData={setLessons}

            curEmail={email}
          />
        ))}
       <h2 id='wipText'>We are currently adding more lessons. Please let us know if there is anything you'd like to see.</h2>     
        <button onClick={resetProgress}>Reset Progress (testingonly)</button>
        </main>
    );
    };

export default Dashboard;