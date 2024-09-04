"use client"
import { useRouter } from 'next/navigation';
import {useState, useEffect,useContext} from 'react';

import { AppContext } from '../../../appContext';
import Link from "next/link";

import Image from "next/image";
import CodeSnippetVisualizer from "./CodeSnippet.js";

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

  const [data, setData] = useState([]);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const tempData = [
    {
        "type": "text",
        "style": "heading",
        "content": "Welcome to your first lesson! You will learn how inputs and outputs work in Python."
    },
    {
        "type": "text",
        "style": "subheading",
        "content": "Welcome to your first lesson! You will learn how inputs and outputs work in Python."
    },
    {
        "type": "text",
        "style": "paragraph",
        "content": "Welcome to your first lesson! You will learn how inputs and outputs work in Python."
    },
    {
        "type": "codeExample",
        "content": "/codeExamples/PythonBasics/HelloWorld/0"
    },
    {
        "type": "question",
        "questionType": "typedResponse",
        "question": "How do you print to the console in Python?"
    },
    {
        "type": "question",
        "questionType": "multipleChoice",
        "answerChoices": [
            "def functionName():",
            "function functionName():",
            "def functionName(){}",
            "func functionName(){}"
        ],
        "question": "What is the correct function declaration in Python"
    },
    {
        "type": "image",
        "content": "/images/PythonBasics/HelloWorld/0"
    },
    {
        "type": "text",
        "style": "paragraph",
        "content": "You can save their name into a variable, which stores it for later use."
    }
  ];

  const TextItem = ({ style, content }) => {
    switch (style) {
      case "heading":
        return <h1 className="text-2xl text-left font-bold mb-4">{content}</h1>;
      case "subheading":
        return <h2 className="text-xl text-left font-semibold mb-3">{content}</h2>;
      case "paragraph":
        return <p className="mb-2 text-left ">{content}</p>;
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
      <p className="mb-2">{question}</p>
      <input type="text" className="border p-2 w-full" />
    </div>
  );
  
  const MultipleChoice = ({ question, answerChoices }) => (
    <div className="my-4">
      <p className="mb-2">{question}</p>
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
      <Image src={content} alt="Lesson image" width={500} height={300} />
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
    
    const fetchData = async () => {
  
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(tempData);
    };

    fetchData();

    
    if(appContext.currentLessonName == "") return;
    if(appContext.jwt == "") return;
    appContext.getInitialLessonInformation().then(result => {
      //setLessonTeachings(result);
      //sendAnswer(-1)
      console.log(result);
      setData(result);
  })
   
   //' appContext.fetchCourse("Python Basics");
  }, []);
  

  

  

  if (!data) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <main className="container text-left mx-auto px-4 py-8">
      <h2 className="lessonTitle">
        {appContext.currentLessonName && appContext.currentLessonName}
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
    </main>
  );


}




