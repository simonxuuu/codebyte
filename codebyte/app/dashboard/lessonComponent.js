import { useState } from "react";

const LessonComponent = ({id,name,isUnlockSet}) => {
    const [isUnlocked,setIsUnlocked] = useState(isUnlockSet);
    const sinAmplitude = 0.1;
    const sinPeriod = 0.5;
    const offset = sinAmplitude * Math.sin(((2*Math.PI)/sinPeriod)*(id/10));
    const bgcolor = isUnlocked ? 'var(--lessonInComplete)' : 'var(--lessonLocked)';
    return (
       
        <button className="lessonComponent" style={{
            marginLeft : `${offset*1000}px`,
            backgroundColor : `${bgcolor}`,
            border : `${isUnlocked ? '3px solid var(--accent1)' : '0'}`,
            filter : `${isUnlocked ? 'drop-shadow(0rem 0rem 1.5rem var(--lessonInComplete))' : 'drop-shadow(0.3rem 0.5rem 0 rgba(255, 255, 255, 0.034))'}`
        }}>{isUnlocked ? name : <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="rgba(0,0,0,0.5)"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>}</button>
        
    );
};

export default LessonComponent;