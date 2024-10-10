"use client"
import '../dashboard.css';
import "../../../styles/globals.css";
import {useState, useEffect,useContext} from 'react';
import LessonComponent from './lessonComponent';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../appContext';

export default function Page({ params }) {

    const router = useRouter();
    const appContext = useContext(AppContext);
    const [courseComplete,setcourseComplete] = useState(false);
    
    const [refresh,setRefresh] = useState(false);
    
    //custom course values
    
    const [customcourseName, setcustomCourseName] = useState(appContext.currentCourseName);
    const [customcourseDesc, setcustomCourseDesc] = useState(appContext.currentCourseDesc);
    const [editMode,setEditMode] = useState((params.courseName == "Custom Course" || Object.keys(appContext.hasCustomCourses[0]).includes(params.courseName)));
    
    //custom course updates (switch to websocket later)
    useEffect(() => {

      if(!editMode) return;
      const timer = setTimeout(() => {
        
        let json = {
          [customcourseName] : {
            "courseDescription" : customcourseDesc
          }
        }
        console.log('updated')
        appContext.updateCustomCourse(json);
        
      }, 1000);

      return () => clearTimeout(timer);
    }, [customcourseName,customcourseDesc]);

    //custom course init
    useEffect(() => {
      if(editMode){
        appContext.setCurrentCourseName(appContext.NormalToCamelCase(params.courseName));
        appContext.getLessonNames(appContext.NormalToCamelCase(params.courseName)).then(res => {
          
          setcustomCourseName(Object.keys(appContext.hasCustomCourses)[0]);
          setcustomCourseDesc(appContext.hasCustomCourses[0][Object.keys(appContext.hasCustomCourses)[0]].courseDescription);
        });
        setEditMode(true);
        if(appContext.hasCustomCourses.length <= 0){
          appContext.initializeCustomCourse();
        }
        return;
      } 
    }, []);

    //regular course init
    useEffect(() => {
      if(editMode){
        return;
      }
      
      setRefresh(false);
      if(appContext.currentCourseName == "") {
        appContext.getCoursesInfo().then(result => {
          for (let i = 0; i < result.length;i++){
            if(result[i][0] == decodeURI(params.courseName)){
              appContext.setCurrentCourseName(result[i][0]);
              appContext.setCurrentCourseDesc(result[i][1]);
            
            }
          }
         
        })
      }
      else if(appContext.jwt){
       
         
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
         
          appContext.setlessons(tempLessonInfo);
        });
        
      })

      } 
    }, [appContext.jwt,refresh]);

    function resetProgress(){ appContext.purgeProgress().then(res => { if(res == "success"){ setcourseComplete(false); setRefresh(true); } }); }
    
   

    return (
        <main>
          {!editMode && <>
            <h1 style={{pointerEvents:'auto'}}className='lessonPageTitle'>{appContext.CamelCaseToNormal (appContext.currentCourseName)} <svg onClick={()=>{
          

          document.body.style.setProperty('--transitionAnim', 'fadeInOut 1.1s ease-in-out');

                      setTimeout(()=>{
                        router.push(`/dashboard`);appContext.setLessonOpen(false);
                      
                        //setTimeout(()=>{document.body.style.setProperty('--transitionAnim', 'none');},20)
                      },455);
                      setTimeout(()=>{document.body.style.setProperty('--transitionAnim', 'none');},1120)
          }} className='lessonPageClose'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></h1>
        <h2  className='lessonPageDescription'>{appContext.currentCourseDesc}</h2>
        {appContext.lessons &&
        appContext.lessons.map((lesson) => ( <LessonComponent key={appContext.lessons.indexOf(lesson)} lessonIndex={appContext.lessons.indexOf(lesson)} appContext = {appContext}
            courseTitle={appContext.currentCourseName}
            data={lesson}
            allLessons={appContext.lessons}
            curEmail={appContext.email}
            onclick = {()=>{console.log('lesson clicked'); appContext.setCurrentLessonName(lesson.Name);router.push(`/dashboard/${appContext.currentCourseName}/${appContext.lessons.indexOf(lesson)}`);}}
          />
        ))} 
        {courseComplete && <h2 id='wipText'>Congrats on completing this course! Let us know what we can improve.</h2>}
        {courseComplete && <h2 style={{marginTop:'10px',opacity:1,color:'rgb(39, 196, 99)',cursor:'pointer'}}onClick={()=>{appContext.getCertificate();}}id='wipText'>Click here to claim your certificate</h2>}
        <button style={{display:'none'}}onClick={resetProgress}>Reset Progress (testingonly)</button>
          </>}
          {editMode && <>
            <div className='lessonPageTitle'> <input maxLength='22'type='text' className='seamlessInput' value={customcourseName} onChange={(e) => setcustomCourseName(e.target.value)}></input><svg style={{pointerEvents:'auto'}} onClick={()=>{
          

          document.body.style.setProperty('--transitionAnim', 'fadeInOut 1.1s ease-in-out');

                      setTimeout(()=>{
                        router.push(`/dashboard`);appContext.setLessonOpen(false);
                      
                        //setTimeout(()=>{document.body.style.setProperty('--transitionAnim', 'none');},20)
                      },455);
                      setTimeout(()=>{document.body.style.setProperty('--transitionAnim', 'none');},1120)
          }} className='lessonPageClose'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div>
          <textarea maxLength='150' className='lessonPageDescription seamlessInput' value={(customcourseDesc)} onChange={(e) => setcustomCourseDesc(e.target.value)}></textarea>

          <svg style={{pointerEvents:'auto'}} className='addLesson ' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="rgba(255,255,255,0.7)"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/></svg>


          </>}
        </main>
    );
}

