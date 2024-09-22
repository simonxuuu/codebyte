"use client"
import { useRouter } from 'next/navigation';
import {useState, useEffect,useContext} from 'react';

import { AppContext } from '../../../appContext';
import Link from "next/link";

import Image from "next/image";
import CodeSnippetVisualizer from "./CodeSnippet.js";

import { X, Heart } from 'lucide-react';
import './QuizComponent.css';
import Response from './Response'; import Alert from './Alert';


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
    const [progress, setProgress] = useState(2);
    const [questionSelected, setQuestionSelected] = useState(false);
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);
    const [progressWarning, setProgressWarning] = useState(false);
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
        console.log(id);
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
        
        router.push(`/dashboard/${appContext.currentCourseName}`);
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

  //onClick={()=>{router.push('/dashboard');appContext.setLessonOpen(false);}}

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
  
  const TypedResponse = ({ question,correctAnswer }) => {
    const [isCorrect,setIsCorrect] = useState(null);
    function checkAnswer(ans){
      if(ans == correctAnswer){
        setIsCorrect(true);
      }else{
        setIsCorrect(false);
      }
    }
    return(
    <div className="my-4">
      <p style={{maxWidth:'100%'}}className="lessonSubHeading">{question}</p>
      <input onKeyUp={(e)=>{if(e.key == "Enter"){
        checkAnswer(e.target.value);
      }}} onBlur={(e)=>{checkAnswer(e.target.value)}}type="text"  className="typedResponse border p-2 w-full " />
      {isCorrect && <h2 className="lessonSubHeading" style={{color:'#0ea04b'}}>Correct</h2>}
      {isCorrect!= null && !isCorrect && <h2 className="lessonSubHeading" style={{color:'#f53d3d'}}>Wrong. Try again! Look through the lesson.</h2>}
    </div>
  )};
  
  const MultipleChoice = ({ question, answerChoices,correctAnswer }) => {
    const [selectedAns,setSelectedAns] = useState();
    const [checkedAns,setCheckedAns] = useState(false);
    
    return(
    <div className="my-4 flex flex-col">
      <p style={{maxWidth:'100%'}}className="lessonSubHeading">{question}</p>
      {answerChoices.map((choice, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="radio"
            id={`choice-${index}`}
            name="multipleChoice"
            value={choice}
            onChange={()=>{setSelectedAns(choice)}}
            className="mr-2"
          />
          <label htmlFor={`choice-${index}`}>{choice}</label>
          {(checkedAns && choice==correctAnswer) ? <svg style={{marginLeft:'25px'}}xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#0ea04b"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> : checkedAns ?
           <svg style={{marginLeft:'25px'}} xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#f53d3d"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> : ''}
        </div>
      ))}
      <button className="checkMultiQButton" onClick={()=>{if(!selectedAns)return;
        setCheckedAns(true);}}>check</button>
    </div>
  )};
  
  const ImageItem = ({ content }) => (
   
    <div className="my-4">
       {//<Image src={content} alt="Lesson image" width={500} height={300} />
      }
    </div> 
  );


  
  
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
    const controller = new AbortController();
    if(window){
      window.onbeforeunload = function() {
        return "Leaving this page will reset your lesson progress.";
      };
    }
    
    if(appContext.currentLessonName == "") return;
    if(appContext.jwt == "") return;
    appContext.getInitialLessonInformation(controller.signal).then(result => {
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
      console.log(result);
      setData(result);
     })
     return () => {
      // cancel the request before component unmounts
      controller.abort();
  };
   
  }, []);
  
  
  

  

  if (!data) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <main className={isQuiz ? "quiz-container" : "default-container"}>
      {!isQuiz && (
        <>
          <h2 className="lessonTitle">
            {appContext.currentLessonName &&
              appContext.CamelCaseToNormal(appContext.currentLessonName)}
            <svg
              onClick={() => {
                document.body.style.setProperty(
                  "--transitionAnim",
                  "fadeInOut 1.4s ease-in-out"
                );

                setTimeout(() => {
                  router.push(`/dashboard/${appContext.currentCourseName}`);
                }, 570);
                setTimeout(() => {
                  document.body.style.setProperty("--transitionAnim", "none");
                }, 1420);
              }}
              className="lessonPageClose"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
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

          <button
            className="checkMultiQButton"
            onClick={() => {
              
              if (parseInt(params.index)+1 <= appContext.lessons.length - 1) {
                appContext.setCurrentLessonName(
                  appContext.lessons[parseInt(params.index) + 1].Name
                );
                router.push(
                  `/dashboard/${appContext.currentCourseName}/${
                    parseInt(params.index) + 1
                  }`
                );
              } else {
                router.push("/dashboard/");
                appContext.setLessonOpen(false);
              }
            }}
          >
            Next lesson
          </button>
        </>
      )}
      {isQuiz && (
        <>
          {progressWarning ? <Alert changeAlert={setProgressWarning} /> : ""}
          <div className="quiz-header">
            <button
              onClick={() => {
                setProgressWarning(true);
              }}
            >
              <X className="text-gray-500" />
            </button>
            <div className="quiz-progress">
              <div
                className="quiz-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {false && (
              <>
                <Heart className="text-red-500" />
                <span className="text-gray-500 ml-1">{gems}</span>
              </>
            )}
          </div>

          <div className="quiz-body">
            <h2 className="quiz-title">{data.question}</h2>

            <div className="quiz-options">
              {data &&
                data.answerChoices.map((option, id) => (
                  <button
                    key={id}
                    className={`quiz-option ${
                      selectedAnswer == id ? "selected" : ""
                    }`}
                    onClick={() => {if(!questionAnswered){handleOptionClick(id)}}}
                  >
                    <span className="quiz-option-image">{option.image}</span>
                    <span className="quiz-option-label">{option}</span>
                  </button>
                ))}
            </div>
          </div>

          <div className="quiz-footer">
            {hintUsed || questionAnswered ? (
              
              <Response
                isHint={hintUsed}
                isCorrect={correct}
                feedback={feedback}
                onContinue={onContinue}
              />
            ) : (
              <></>
            )}
            <button className="quiz-button skip" onClick={getHint}>
              Hint ({hintCount} left)
            </button>
            <button
              className={`quiz-button check ${
                questionSelected ? "" : "unavailable"
              }`}
              disabled={selectedAnswer==null || questionAnswered}
              onClick={checkSubmit}
            >
              {loading ? "..." : "Check"}
            </button>
           
          </div>
         
        </>
      )}
    </main>
  );


}




