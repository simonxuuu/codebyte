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
  const[score,setScore]= useState('');
  function sendAnswer(answerIndex){
    appContext.getNextQuestion(answerIndex).then(response =>{
      //console.log([...questions, response]);
      if(response[0] == "Done"){
        console.log(response[1]);
        setScore(response[1]);
        setIsDone(true);
        return;
      }
      if(answerIndex==-1){setQuestions([...questions, response]);}
      else{
        
        
        setQuestions([...questions,response.slice(1)]);
      }
     
    })
  }

  useEffect(() => {
    
    if(appContext.currentLessonName == "") return;
      if(appContext.email == "") return;
    appContext.getLessonTeachings().then(result => {
      setLessonTeachings(result);
      sendAnswer(-1)
     
  })
   
   //' appContext.fetchCourse("Python Basics");
  }, [appContext.uid]);
  
  return <main style={{color:"white",display:'flex',flexDirection:'column'}}>
    {!appContext.currentLessonName ? <h2>Sorry, this session has expired. Head back to the dashboard to try again.</h2> : ''}
    <h2>{appContext.currentLessonName && appContext.currentLessonName}</h2>
    <h3>{lessonTeachings && lessonTeachings}</h3>
    {questions && questions.map(question => (
      <div key={questions.indexOf(question)}>
        <h3>{question[0]}</h3>
        {question[1].map(choice => (
          <button onClick={()=>{ if(!isDone){sendAnswer(question[1].indexOf(choice))}}}  key={question[1].indexOf(choice)}>{choice}</button>
        ))}
      </div>
      
    ))}
    {isDone && <div><h1>Your score:{score}%</h1>
    <Link href={`/dashboard/${appContext.currentCourseName}`}>return to course</Link></div>}
    </main>;
}