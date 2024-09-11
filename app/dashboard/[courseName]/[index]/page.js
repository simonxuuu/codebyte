"use client"
import { useRouter } from 'next/navigation';
import {useState, useEffect,useContext} from 'react';

import { AppContext } from '../../../appContext';
import Link from "next/link";

import Image from "next/image";
import CodeSnippetVisualizer from "./CodeSnippet.js";

import { X, Heart } from 'lucide-react';
import './QuizComponent.css';
import Response from './Response';


export default function Page({ params }) {

  const router = useRouter();
  const appContext = useContext(AppContext);

  const [isQuiz,setIsQuiz] = useState(false);
  //const[score,setScore]= useState('');
  //const[totalQs,updatetotalQs] = useState(7);
  //const[curScore,updatecurScore] = useState(0);
  //const[correctAnswerIndex,setcorrectAnswerIndex] = useState(0);
  
    //index of the selected answer
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [progress, setProgress] = useState(5);
    const [questionSelected, setQuestionSelected] = useState(false);
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);
    const [progressWarning, setProgressWarning] = useState(true);
    const [hintCount, setHintCount] = useState(3);
    const [correct, setCorrect] = useState(true);
    const [canContinue, setCanContinue] = useState(false);
    const [correctAnswerID, setCorrectAnswerID] = useState(3);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('Correct!');
    const [gems,setGems] = useState(0);
   
    const [loadedQ,setLoadedQ] = useState();


    const checkSubmit = () => {
        setLoading(true);
        //fetch correct answer and retrive next question

        appContext.getNextQuestion(selectedAnswer).then(async response =>{
          //console.log([...questions, response]);
          console.log(response);  
          
          setFeedback(response[1]);
          //load the next question
          setLoadedQ(response[2]);
          if(response[0] == selectedAnswer){
            setCorrect(true);
            
          }else{
            setCorrect(false);
            setGems(gems-1);
          }
          let progressSaved = response[3].split('/');
          
          setProgress((parseInt(progressSaved[0])/parseInt(progressSaved[1]))*100)
          setQuestionAnswered(true);
          console.log(progress);
          setLoading(false);

          
        })


        
    }
    const getHint = () => {
      appContext.getHint().then(response =>{
        //console.log([...questions, response]);
        console.log(response);  
        if(response =="out of hints"){
          setHintCount("none");
        }else{
          setHintCount(hintCount - 1);
          if(hintCount - 1 <= 0){
            setHintCount("none");
          }
        }
        

        
      })
    }

    const handleOptionClick = (id) => {
        setSelectedAnswer((prevSelected) => (prevSelected === id ? null : id));
        if (selectedAnswer !== id) {
            setQuestionSelected(true);
        }
        else {
            setQuestionSelected(false);
        }
    };

    const onContinue = () => {
      console.log(loadedQ);
      if(loadedQ == "Done"){

        //quiz completed
        console.log('yay you passee thq uiz')
        
        router.push('/dashboard');
        return;
      }
      if(loadedQ == "Failed"){

        //quiz completed
        console.log('no more gems')
        
        router.push('/dashboard');
        return;
      }
        setData(loadedQ);
        setQuestionAnswered(false);
        setHintUsed(false);
    }
  const [data, setData] = useState([]);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  

  const TextItem = ({ style, content }) => {
    switch (style) {
      case "heading":
        return <h1 className="lessonHeading">{content}</h1>;
      case "subheading":
        return <h2 className="lessonSubHeading">{content}</h2>;
      case "paragraph":
        return <p className="lessonParagraph">{content}</p>;
      default:
        return null;
    }
  };
  
  const CodeSnippet = ({ content }) => (
    <div className="my-4">
      <CodeSnippetVisualizer code={content} language="Python"/>
    </div>
  );
  
  const TypedResponse = ({ question }) => (
    <div className="my-4">
      <p style={{maxWidth:'100%'}}className="lessonSubHeading">{question}</p>
      <input type="text" style={{color:'black'}} className="border p-2 w-full" />
    </div>
  );
  
  const MultipleChoice = ({ question, answerChoices }) => (
    <div className="my-4">
      <p style={{maxWidth:'100%'}}className="lessonSubHeading">{question}</p>
      {answerChoices.map((choice, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="radio"
            id={`choice-${index}`}
            name="multipleChoice"
            value={choice}
            className="mr-2"
          />
          <label htmlFor={`choice-${index}`}>{choice}</label>
        </div>
      ))}
    </div>
  );
  
  const ImageItem = ({ content }) => (
   
    <div className="my-4">
       {//<Image src={content} alt="Lesson image" width={500} height={300} />
      }
    </div> 
  );


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
     appContext.getInitialLessonInformation().then(result => {
      if(result.question != null){
        console.log('this is a quiz');
        setIsQuiz(true);
        appContext.getCourseProgressData().then(result1 => {
          setGems(parseInt(result1.gems));
          setHintCount(parseInt(result1.hints));
        })
      }
      setQuestionAnswered(false);
      //console.log(result);
      setData(result);
     })
   
   
  }, []);
  
  
  

  

  if (!data) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return <main className={isQuiz ? "quiz-container":"default-container"}>
    
    {(!isQuiz) && <>
      <h2 className="lessonTitle">
        {appContext.currentLessonName && appContext.CamelCaseToNormal(appContext.currentLessonName)}
      </h2>
      {data.map((item, index) => {
        switch (item.type) {
          case "text":
            return <TextItem key={index} {...item} />;
          case "codeExample":
            return <CodeSnippet key={index} {...item} />;
          case "question":
            return item.questionType === "typedResponse" ? (
              <TypedResponse key={index} {...item} />
            ) : (
              <MultipleChoice key={index} {...item} />
            );
          case "image":
            return <ImageItem key={index} {...item} />;
          default:
            return null;
        }
      })}
     
      <button onClick={()=>{
        if(appContext.lessons.length-1 <= parseInt(params.index)+1){appContext.setCurrentLessonName(appContext.lessons[parseInt(params.index)+1].Name);router.push(`/dashboard/${appContext.currentCourseName}/${parseInt(params.index)+1}`);}else{router.push('/dashboard/');}}}>Next lesson</button>
      </>
}
    {isQuiz &&  
    <>
           
            <div className="quiz-card">
                <div className="quiz-header">
                    <button onClick={() => setProgressWarning(true)}>
                    <X className="text-gray-500" />
                    </button>
                    <div className="quiz-progress">
                        <div className="quiz-progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <Heart className="text-red-500" />
                    <span className="text-gray-500 ml-1">{gems}</span>
                </div>

                <div className="quiz-body">
                    <div className="mb-6">
                    
                        <h2 className="quiz-title">{data.question}</h2>
                    </div>

                    <div className="quiz-options">
                        {data && data.answerChoices.map((option,id) => (
                            <button
                                key={id}
                                className={`quiz-option ${selectedAnswer === id ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(id)}
                            >
                                <span className="quiz-option-image">{option.image}</span>
                                <span className="quiz-option-label">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="quiz-footer">
                    {hintUsed || questionAnswered ? (
                        <Response isHint={hintUsed} isCorrect={correct} feedback={feedback} onContinue={onContinue}/>
                    ) : (
                        <>
                            
                        </>
                    )}
                    <button className="quiz-button skip" onClick={getHint}>Hint ({hintCount} left)</button>
                    <button className={`quiz-button check ${questionSelected ? '' : 'unavailable'}`} disabled={!selectedAnswer} onClick={checkSubmit}> 
                        {loading ? '...' : 'Check'}
                    </button>
                </div>
            </div>
            </>
  }
  
  </main>;


}




