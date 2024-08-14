import { useEffect, useState } from "react";

const LessonComponent = ({data,updateLessonData,allLessons,updateCompleteLessons}) => {
   
    const sinAmplitude = 0.1;
    const sinPeriod = 0.5;
    const offset = sinAmplitude * Math.sin(((2*Math.PI)/sinPeriod)*(data.key/10));
    const bgcolor = data.isCompleted ? 'var(--lessonInComplete)' : 'var(--lessonLocked)';

    

    function testUnlockLesson(){
        console.log(data.key);
        const updatedLessons = allLessons.map(lesson => 
            lesson.key === data.key 
            ? { ...lesson, isCompleted: !lesson.isCompleted } 
            : lesson
        );
        updateLessonData(updatedLessons);
        updateCompleteLessons(data.key+1);
    }

    return (
       
        <button onClick={testUnlockLesson} className={`lessonComponent ${data.isCompleted ? 'lessonCompleted' : data.key > 0 && allLessons[data.key-1].isCompleted || data.key == 0 ? 'lessonUnlocked' : 'lessonLocked'}`} style={{
            marginLeft : `${offset*1000}px`
            
        }}>{
            data.isCompleted ? <svg  fill='rgba(0,0,0,0.2)' width='55px' height='55px' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M964.608 424.96L752.64 631.808l50.176 290.816c1.024 8.192-2.048 15.36-8.192 20.48-3.072 3.072-8.192 4.096-12.288 4.096-3.072 0-6.144-1.024-9.216-2.048L512 806.912 250.88 944.128c-7.168 4.096-15.36 3.072-21.504-2.048-6.144-4.096-9.216-12.288-8.192-20.48l50.176-290.816L59.392 424.96c-5.12-5.12-7.168-13.312-5.12-21.504 2.048-7.168 9.216-13.312 16.384-14.336l291.84-40.96L493.568 82.944c3.072-7.168 10.24-11.264 18.432-11.264s15.36 4.096 18.432 11.264L661.504 348.16l291.84 41.984c8.192 1.024 14.336 6.144 16.384 14.336s0 15.36-5.12 20.48z"  /></svg> :
            data.key > 0 && allLessons[data.key-1].isCompleted || data.key == 0 ? data.name : <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="rgba(0,0,0,0.5)"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
            </svg>
           }</button>
        
    );
};

export default LessonComponent;