"use client"
import '../dashboard.css';
import {useState, useEffect,useContext} from 'react';
import LessonComponent from './lessonComponent';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../appContext';

export default function Page({ params }) {

    const router = useRouter();
    const appContext = useContext(AppContext);
    const [courseComplete,setcourseComplete] = useState(false);
    const [lessons,setlessons] = useState([]);
    const [refresh,setRefresh] = useState(false);
    
    useEffect(() => {
      setRefresh(false);
      if(appContext.currentCourseName == "") {
        appContext.getCoursesInfo().then(result => {
          for (let i = 0; i < result.length;i++){
            if(result[i][0] == decodeURI(params.courseName)){
              appContext.setCurrentCourseName(result[i][0]);
              appContext.setCurrentCourseDesc(result[i][1]);
              //console.log(Object.keys(result[i])[0]); 
            }
          }
         
        })
      }
      else if(appContext.jwt){
        //console.log(appContext.currentCourseName);
         
      appContext.getLessonNames(appContext.currentCourseName).then(result => {
        let tempLessonInfo = [];
        appContext.getCourseProgressData().then(progressData => {
         
          if(appContext.returnCourseByName(appContext.currentCourseName,progressData["courses"]) == null) return; 
          let lessonprog = appContext.returnCourseByName(appContext.currentCourseName,progressData["courses"])['courseLessons'];  
          
          for(let i = 0; i < lessonprog.length; i++){
            tempLessonInfo.push(Object.assign({},{"Name":result[i]},lessonprog[i]));
            if(i == lessonprog.length-1){
              if(lessonprog[i].isDone){
                setcourseComplete(true);
              }
            }
          }      
          //console.log(tempLessonInfo);
          setlessons(tempLessonInfo);
        });
        //console.log(result);
      })

      } 
      //appContext.fetchCourse("Python Basics");
    }, [appContext.jwt,refresh]);

    function resetProgress(){
      
      appContext.purgeProgress().then(res => {
        if(res == "success"){
          setcourseComplete(false);
          setRefresh(true);
        }
      });

    
    }
    
   

    return (
        <main>
        <h1 className='lessonPageTitle'>{appContext.CamelCaseToNormal (appContext.currentCourseName)} <svg onClick={()=>{router.push('/dashboard')}} className='lessonPageClose'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></h1>
        <h2 className='lessonPageDescription'>{appContext.currentCourseDesc}</h2>
        {lessons &&
        lessons.map((lesson) => (
          <LessonComponent
            key={lessons.indexOf(lesson)}
            lessonIndex={lessons.indexOf(lesson)}
            appContext = {appContext}
            courseTitle={appContext.currentCourseName}
            data={lesson}
            allLessons={lessons}
            curEmail={appContext.email}
            onclick = {()=>{console.log('lesson clicked'); appContext.setCurrentLessonName(lesson.Name);router.push(`/dashboard/${appContext.currentCourseName}/${lessons.indexOf(lesson)}`);}}
          />
        ))}
        {courseComplete && <h2 id='wipText'>Congrats on completing this course! Let us know what we can improve by clicking the feedback button up top.</h2>}
         
        <button onClick={resetProgress}>Reset Progress (testingonly)</button>
        </main>
    );
}

