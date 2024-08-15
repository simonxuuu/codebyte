import { useEffect, useState,useRef } from "react";

const LessonComponent = ({data,updateLessonData,lessonSection,allLessons,curEmail}) => {
   
    const sinAmplitude = 0.1;
    const sinPeriod = 0.5;
    const offset = sinAmplitude * Math.sin(((2*Math.PI)/sinPeriod)*(data.lessonKey/10));
    const bgColor = data.isComplete ? 'var(--lessonComplete)' : data.lessonKey > 0 && allLessons[data.lessonKey-1].isComplete || data.lessonKey == 0 ? 'var(--lessonInComplete)' : 'var(--lessonLocked)'
   
    const lessonRef = useRef(null);
    const [isFocused,setFocused] = useState(false);
    
    /*
  {
          
            data.isComplete ? <svg  fill='rgba(0,0,0,0.2)'  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M964.608 424.96L752.64 631.808l50.176 290.816c1.024 8.192-2.048 15.36-8.192 20.48-3.072 3.072-8.192 4.096-12.288 4.096-3.072 0-6.144-1.024-9.216-2.048L512 806.912 250.88 944.128c-7.168 4.096-15.36 3.072-21.504-2.048-6.144-4.096-9.216-12.288-8.192-20.48l50.176-290.816L59.392 424.96c-5.12-5.12-7.168-13.312-5.12-21.504 2.048-7.168 9.216-13.312 16.384-14.336l291.84-40.96L493.568 82.944c3.072-7.168 10.24-11.264 18.432-11.264s15.36 4.096 18.432 11.264L661.504 348.16l291.84 41.984c8.192 1.024 14.336 6.144 16.384 14.336s0 15.36-5.12 20.48z"  /></svg> :
            data.lessonKey > 0 && allLessons[data.lessonKey-1].isComplete || data.lessonKey == 0 ? <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="32px" fill="rgba(0,0,0,0.4)"><path d="M240-160h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Zm0 80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h280v-80q0-83 58.5-141.5T720-920q83 0 141.5 58.5T920-720h-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="rgba(0,0,0,0.5)"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
            </svg>
           }
  */
           useEffect(() => {
            const handleClickOutside = (event) => {
              if (lessonRef.current && !lessonRef.current.contains(event.target)) {
                setFocused(false);
              }
            };
        
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
          }, []);

    function testUnlockLesson(){
      console.log(allLessons[data.lessonKey-1].isComplete);
        if (allLessons[data.lessonKey-1].isComplete == false){return;}
        const updatedLessons = allLessons.map(lesson => 
            lesson.lessonKey === data.lessonKey 
            ? { ...lesson, isComplete: !lesson.isComplete } 
            : lesson
        );
        updateLessonData(updatedLessons);
       
        fetch("https://codebyte-1b9af19e473e.herokuapp.com/update-progress", {
            method: "POST",
            body: JSON.stringify({email:curEmail,sectionId:lessonSection,completedID:data.lessonKey}),
            headers: {
              "Content-type": "application/json"
            }
          }).then((response)=>{
            console.log(response);
          })
    }

    return (
       <>
        <button ref={lessonRef} onFocus={()=>{setFocused(true);}}className={`lessonComponent ${isFocused ? 'focused' : ''} ${data.isComplete ? 'lessonCompleted' : data.lessonKey > 0 && allLessons[data.lessonKey-1].isComplete || data.lessonKey == 0 ? 'lessonUnlocked' : 'lessonLocked'}`} style={{
            marginLeft : `${offset*1000}px`,
            backgroundColor: `${bgColor}`
            
        }}>{data.isComplete ? <svg  fill='rgba(0,0,0,0.2)'  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M964.608 424.96L752.64 631.808l50.176 290.816c1.024 8.192-2.048 15.36-8.192 20.48-3.072 3.072-8.192 4.096-12.288 4.096-3.072 0-6.144-1.024-9.216-2.048L512 806.912 250.88 944.128c-7.168 4.096-15.36 3.072-21.504-2.048-6.144-4.096-9.216-12.288-8.192-20.48l50.176-290.816L59.392 424.96c-5.12-5.12-7.168-13.312-5.12-21.504 2.048-7.168 9.216-13.312 16.384-14.336l291.84-40.96L493.568 82.944c3.072-7.168 10.24-11.264 18.432-11.264s15.36 4.096 18.432 11.264L661.504 348.16l291.84 41.984c8.192 1.024 14.336 6.144 16.384 14.336s0 15.36-5.12 20.48z"  /></svg> :
          data.lessonKey > 0 && allLessons[data.lessonKey-1].isComplete || data.lessonKey == 0 ? <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="32px" fill="rgba(0,0,0,0.4)"><path d="M240-160h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Zm0 80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h280v-80q0-83 58.5-141.5T720-920q83 0 141.5 58.5T920-720h-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80h120q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="rgba(0,0,0,0.5)"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
          </svg>
         }
         
        <div  style={{marginLeft : `${offset}px`,'--bgColor':`${bgColor}`}}className={`speech-bubble ${data.isComplete ? 'lessonCompleted' : data.lessonKey > 0 && allLessons[data.lessonKey-1].isComplete || data.lessonKey == 0 ? 'lessonUnlocked' : 'lessonLocked'}`}>{data.Name}

         <button onClick={()=>{testUnlockLesson(); setFocused(false);}}className="buttonBubbleSpeech">Start Lesson</button>
 
        </div>
         </button>
         
         </>
    );
};

export default LessonComponent;