"use client"
import '../dashboard.css';
import {useState, useEffect,useContext} from 'react';
import LessonComponent from './lessonComponent';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../appContext';

export default function Page({ params }) {

    const router = useRouter();
    const appContext = useContext(AppContext);
   
    const [lessons,setlessons] = useState([]);
   
    
    useEffect(() => {
      if(appContext.currentCourseName == "") {
        appContext.getCoursesInfo().then(result => {
          for (let i = 0; i < result.length;i++){
            if(Object.keys(result[i])[0] == decodeURI(params.courseName)){
              appContext.setCurrentCourseName(Object.keys(result[i])[0]);
              appContext.setCurrentCourseDesc(Object.values(result[i])[0]);
              //console.log(Object.keys(result[i])[0]); 
            }
          }
         
        })
      }
      else if(appContext.email){
        //console.log(appContext.currentCourseName);
         
      appContext.getLessonNames(appContext.currentCourseName).then(result => {
        let tempLessonInfo = [];
        appContext.getCourseProgressData().then(progressData => {
          if(appContext.returnCourseByName(appContext.currentCourseName,progressData["courses"]) == null) return; 
          let lessonprog = appContext.returnCourseByName(appContext.currentCourseName,progressData["courses"])['courseLessons'];  
          
          for(let i = 0; i < lessonprog.length; i++){
            tempLessonInfo.push(Object.assign({},{"Name":result[i]},lessonprog[i]));
          }      
          //console.log(tempLessonInfo);
          setlessons(tempLessonInfo);
        });
        //console.log(result);
      })

      } 
      //appContext.fetchCourse("Python Basics");
    }, [appContext.email]);

    function resetProgress(){
      if(appContext.uid == ''){return;}

      fetch(`${appContext.apiRoute}/purge-progress`, {
        method: "POST",
        body: JSON.stringify({email:appContext.email,uid:appContext.uid }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(result => {return result.text()}).then((textResponse)=>{
        
        router.push(window.location.href);
          router.refresh();
        if(textResponse == 'success'){
          appContext.fetchCourse("Python Basics");
        }
      })
    
    }
    
   

    return (
        <main>
        <h1 className='lessonPageTitle'>{appContext.currentCourseName} <svg onClick={()=>{router.push('/dashboard')}} className='lessonPageClose'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></h1>
        <h2 className='lessonPageDescription'>{appContext.currentCourseDesc}</h2>
        {lessons &&
        lessons.map((lesson) => (
          <LessonComponent
            key={lesson.lessonIndex}
            courseTitle={appContext.currentCourseName}
            data={lesson}
            allLessons={lessons}
            curEmail={appContext.email}
            onclick ={()=>{appContext.setCurrentLessonName(lesson.Name)}}
          />
        ))}
        
       <h2 id='wipText'>We are currently adding more lessons. Please let us know if there is anything you'd like to see.</h2>     
        <button onClick={resetProgress}>Reset Progress (testingonly)</button>
        </main>
    );
}

