"use client"
import { useRouter } from 'next/navigation';
import {useState, useEffect,useContext} from 'react';

import { AppContext } from '../../../appContext';
import Link from "next/link";
export default function Page({ params }) {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const [lessonTeachings,setLessonTeachings] = useState('');
  const [questions,setQuestions] = useState([]);
  const [isDone,setIsDone] = useState(false);
  const [isInfoLesson,setIsInfoLesson] = useState(false);
  const[score,setScore]= useState('');
  const[totalQs,updatetotalQs] = useState(7);
  const[curScore,updatecurScore] = useState(0);
  const[readyForTest,setReadyForTest] = useState(false);
  const[correctAnswerIndex,setcorrectAnswerIndex] = useState(0)
  const[showRight,setShowRight]= useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  window.onbeforeunload = function() {
    return "Leaving this page will reset your lesson progress.";
  };
  
  function sendAnswer(answerIndex){
    
    
   
    appContext.getNextQuestion(answerIndex).then(async response =>{
      //console.log([...questions, response]);
      if(response[0] == "Done"){
        setcorrectAnswerIndex(answerIndex);
        setShowRight(true);
        updatecurScore(curScore+1);
        console.log(response[1]);
        setScore(response[1]);
        setIsDone(true);
        return;
      }
      if(answerIndex==-1){
        setShowRight(false);
        if(response[0] != "InfoLesson"){
        setQuestions([...questions, response]);
        }else{
          setIsInfoLesson(true);
        }
       }
      else{
        setcorrectAnswerIndex(response[0]);
        setShowRight(true);
        if(response[0] == answerIndex){
         
          updatecurScore(curScore+1);
        }else{
         
          updatetotalQs(totalQs+1);
        }
        await delay(1300);
        setShowRight(false);
        setQuestions([...questions,response.slice(1)]);
      }
     
    })
    
  }
  
  useEffect(() => {
    
    if(appContext.currentLessonName == "") return;
    if(appContext.jwt == "") return;
    appContext.getLessonTeachings().then(result => {
      setLessonTeachings(result);
      sendAnswer(-1)
     
  })
   
   //' appContext.fetchCourse("Python Basics");
  }, []);
  
  return <main style={{color:"white",display:'flex',flexDirection:'column'}}>
    {!appContext.currentLessonName ? <h2 className='lessonTeachings'>Sorry, this session has expired. Head back to the dashboard to try again.</h2> : ''}
    <h2 className='lessonTitle'>{appContext.currentLessonName && appContext.currentLessonName}</h2>
    {readyForTest && <div className='outerProgressBar'> 
      <div style={{width:`calc(${Math.max(0.09,(curScore/totalQs))}*100%)`}}className="innerProgressBar"></div></div>}
    <h3 className='lessonTeachings'>{!readyForTest && lessonTeachings && lessonTeachings}</h3>
    {appContext.currentLessonName&& !isInfoLesson && !readyForTest && <button onClick={()=>{setReadyForTest(true);}} className='finishlessonbtn'>start review</button>}
    {readyForTest && questions && questions.map(question => {
      if(questions.indexOf(question) == questions.length-1) return (
      <div className='questionHolder'key={questions.indexOf(question)}>
        <h3 className='question'>{question[0]}</h3>
        <div style={{display:'flex',gap:'15px',justifyContent:'center'}}>
        {question[1].map(choice =>  (
          <button className={` ${(showRight && correctAnswerIndex == question[1].indexOf(choice)) ? 'gotRight' : showRight ? 'gotWrong' : ''} questionChoice `} onClick={()=>{ if(!isDone){sendAnswer(question[1].indexOf(choice))}}}  key={question[1].indexOf(choice)}>{choice}</button>
        ))
        }
        </div>
      </div>
      
    )})}
    {false && <h1>Your score:{score}%</h1>}
    {(isDone || isInfoLesson) && <Link className='finishlessonbtn'href={`/dashboard/${appContext.currentCourseName}`}>continue</Link>}
    </main>;
}